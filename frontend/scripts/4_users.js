/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
token = localStorage.getItem('token');
let divCreateUser = document.getElementById('divCreateUser');
let divGetUsers = document.getElementById('divGetUsers');
let btnUsersMenu = document.getElementById('btnUsers');
let tableUsers = document.getElementById('tableUsers'); //BODY DE LA TABLA
let btnCreateUser = document.getElementById('btnCreateUser');

/* Campos formulario */
let inputIdUser = document.getElementById('inputIdUser');
let inputNameUser = document.getElementById('inputNameUser');
let inputLastnameUser = document.getElementById('inputLastnameUser');
let inputEmailUser = document.getElementById('inputEmailUser');
let btnAdminTrue = document.getElementById('btnAdminTrue');
let btnAdminFalse = document.getElementById('btnAdminFalse');
let inputUsernameUser = document.getElementById('inputUsernameUser');
let inputPasswordUser = document.getElementById('inputPasswordUser');
let dropdownMenu2 = document.getElementById('dropdownMenu2');

let btnCreateUsersForm = document.getElementById('btnCreateUsersForm');
let divSearchUser = document.getElementById('searchUser');
let divPageUser = document.getElementById('pageUser');

/* Paginas */
let pageSelectUsers = document.getElementById('quantityUsers');
let backUsers = document.getElementById('backUsers');
let nextUsers = document.getElementById('nextUsers');
let pagInitUsers = 0;
let pagFinalUsers = parseInt(pageSelectUsers.value);

/* Busqueda */
let inputSearchUsers = document.getElementById('inputSearchUsers');
let tableUsersList = document.getElementById('userList');

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

btnUsersMenu.addEventListener('click', btnGetUsers);
btnCreateUser.addEventListener('click', btnAddUsers);
btnCreateUsersForm.addEventListener('click', showCreateUser);

pageSelectUsers.addEventListener('change', changeQuantityUsers);
/* ------------------------------------FUNCIONES DE CRUD ------------------------- */

async function btnAddUsers(event) {
    event.preventDefault();

    let valueAdmin = dropdownMenu2.innerText == "Si" ? true : false;

    let url = `http://localhost:3000/v1/createUsers`;
    await fetch(url, {
            method: 'POST',
            body: `{"user_id": "${inputIdUser.value}","username": "${inputUsernameUser.value}","password": "${inputPasswordUser.value}","name": "${inputNameUser.value}","lastName": "${inputLastnameUser.value}","email": "${inputEmailUser.value}","profileAdmin": "${valueAdmin}"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            res.json().then((data) => {
                if (res.status == 201) {
                    alert(data.body);
                } else {
                    alert(data.error);
                }
            });
        })
        .catch(err => console.log(err));

    showCreateUser();
    btnGetUsers();
}

async function btnGetUsers() {
    let arrData;
    let tok = localStorage.getItem("token");
    let url = `http://localhost:3000/v1/readUsers`;
    await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
            }
        })
        .then((resp) => resp.json())
        .then(async function(data) {

            arrData = data.body.readUsers;
            arrAux = data.body.readUsers;

            createRowUsers(arrData);

        })
        .catch(err => console.log(err));

}

function btnEditUsers() {

    let url = `http://localhost:3000/v1/updateUsers`;
    fetch(url, {
            method: 'PUT',
            body: `{"user_id": "${inputIdUser.value}","username": "${inputUsernameUser.value}","password": "${inputPasswordUser.value}","name": "${inputNameUser.value}","lastName": "${inputLastnameUser.value}","email": "${inputEmailUser.value}","profileAdmin": "0}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((resp) => resp.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

async function btnDeleteUser(iconDelete) {
    let user_id = iconDelete.id;
    user_id = user_id.slice(7, user_id.length);
    let url = `http://localhost:3000/v1/deleteUsers`;
    await fetch(url, {
            method: 'DELETE',
            body: `{"user_id":"${user_id}"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((resp) => resp.json())
        .then(res => alert(res.body))
        .catch(err => console.log(err));

    btnGetUsers();
}

async function deleteUsersSelect() {
    let elements = document.getElementsByName(`checkUsers`);

    for (i = 1; i < elements.length; i++) {
        let user_id = elements[i].id;
        user_id = user_id.slice(6, user_id.length);
        let url = `http://localhost:3000/v1/deleteUsers`;

        if (elements[i].checked) {
            await fetch(url, {
                    method: 'DELETE',
                    body: `{"user_id":"${user_id}"}`,
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((resp) => resp.json())
                .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
                .catch(err => console.log(err));
        }
    }
    btnGetUsers();
}
/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

function normalizeForm() {
    inputIdUser.value = "";
    inputNameUser.value = "";
    inputLastnameUser.value = "";
    inputEmailUser.value = "";
    inputUsernameUser.value = "";
    inputPasswordUser.value = "";
    dropdownMenu2.value = "Seleccione Perfil Administrador";
}

function showCreateUser() {
    /* ShowForm */
    divCreateUser.classList.toggle('card');
    divCreateUser.classList.toggle('card-3');
    divCreateUser.classList.toggle('hidden');
    divGetUsers.classList.toggle('card');
    divGetUsers.classList.toggle('table-responsive');
    divGetUsers.classList.toggle('hidden');
    divSearchUser.classList.toggle('hidden');
    divPageUser.classList.toggle('row');
    divPageUser.classList.toggle('hidden');
    normalizeForm();

    btnCreateUsersForm.innerText = btnCreateUsersForm.innerText == "Crear nuevo usuario" ? btnCreateUsersForm.innerText = "Lista de usuarios" : btnCreateUsersForm.innerText = "Crear nuevo usuario";
}

function searchValue(id) {
    let dataToEdit;
    arrAux.forEach(element => {

        if (element.user_id == id) {
            dataToEdit = element;
        }
    });
    return dataToEdit;
}

function updateUser(iconEdit) {

    let user_id = iconEdit.id;
    user_id = user_id.slice(7, user_id.length);
    let dataToEdit = searchValue(user_id);

    showCreateUser();

    inputIdUser.value = dataToEdit.user_id;
    inputIdUser.disabled = true;
    inputNameUser.value = dataToEdit.name;
    inputLastnameUser.value = dataToEdit.lastName;
    inputEmailUser.value = dataToEdit.email;
    inputUsernameUser.value = dataToEdit.username;
    inputPasswordUser.value = dataToEdit.password;
}

function optClickAdmin(clicked) {

    let answerAdmin = clicked.id;

    if (answerAdmin == "btnAdminTrue") {
        dropdownMenu2.innerText = "Si"
    } else if (answerAdmin == "btnAdminFalse") {
        dropdownMenu2.innerText = "No"
    }

}

function createRowUsers(arrayResult) {
    /* pagFinalContacts = parseInt(pageSelectContacts.value); */

    if (pagFinalUsers >= arrayResult.length) {

        tableUsers.innerText = "";
        for (var index = pagInitUsers; index < arrayResult.length; index++) {

            let is_admin = (arrayResult[index].profileAdmin == 1) ? true : false;
            var tr = document.createElement('tr');
            tr.innerHTML = `<td><div class="form-check"><input class="form-check-input" type="checkbox" onclick="countCheck(this)" id="ckCont${arrayResult[index].user_id}" name="checkUsers"></div></td>
                <td>${arrayResult[index].user_id}</td><td>${arrayResult[index].name}</td><td>${arrayResult[index].lastName}</td><td>${arrayResult[index].email}</td><td>${is_admin}</td><td class="centerContent"><a id="updUser${arrayResult[index].user_id}" onclick="updateUser(this)" href="#" title="Modificar"><i class="fas fa-edit"></i></a> | <a id="delUser${arrayResult[index].user_id}" onclick="btnDeleteUser(this)" href="#" title="Eliminar"><i class="fas fa-user-times"></i></a></td>`
            tableUsers.appendChild(tr);
        }

    } else if (pagFinalUsers < arrayResult.length) {

        tableUsers.innerText = "";
        for (var index = pagInitUsers; index < pagFinalUsers; index++) {

            let is_admin = (arrayResult[index].profileAdmin == 1) ? true : false;
            var tr = document.createElement('tr');
            tr.innerHTML = `<td><div class="form-check"><input class="form-check-input" type="checkbox" onclick="countCheck(this)" id="ckCont${arrayResult[index].user_id}" name="checkUsers"></div></td>
                <td>${arrayResult[index].user_id}</td><td>${arrayResult[index].name}</td><td>${arrayResult[index].lastName}</td><td>${arrayResult[index].email}</td><td>${is_admin}</td><td class="centerContent"><a id="updUser${arrayResult[index].user_id}" onclick="updateUser(this)" href="#" title="Modificar"><i class="fas fa-edit"></i></a> | <a id="delUser${arrayResult[index].user_id}" onclick="btnDeleteUser(this)" href="#" title="Eliminar"><i class="fas fa-user-times"></i></a></td>`
            tableUsers.appendChild(tr);
        }

    }

}

function changeQuantityUsers() {
    pagFinalUsers = parseInt(pageSelectUsers.value);
    createRowUsers(arrAux);
}

backUsers.addEventListener('click', () => {
    validate = pagInitUsers - parseInt(pageSelectUsers.value)
    if (validate >= 0) {
        pagInitUsers = pagInitUsers - parseInt(pageSelectUsers.value)
        pagFinalUsers = pagFinalUsers - parseInt(pageSelectUsers.value)
        createRowUsers(arrAux);
    }
})

nextUsers.addEventListener('click', () => {
    if (parseInt(pagFinalUsers) <= arrAux.length) {
        pagInitUsers = parseInt(pagInitUsers) + parseInt(pageSelectUsers.value);
        pagFinalUsers = parseInt(pagFinalUsers) + parseInt(pageSelectUsers.value);
        createRowUsers(arrAux);
    }
})


/* Busqueda */
inputSearchUsers.addEventListener('keypress', (event) => {
    if (event.key == "Enter") {
        doSearchUsers();
    }
});

function doSearchUsers() {
    const searchText = inputSearchUsers.value.toLowerCase();
    let total = 0;
    for (let i = 1; i < tableUsersList.rows.length; i++) {
        if (tableUsersList.rows[i].classList.contains("noSearch")) {
            continue;
        }
        let found = false;
        const cellsOfRow = tableUsersList.rows[i].getElementsByTagName('td');
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableUsersList.rows[i].style.display = '';
        } else {
            tableUsersList.rows[i].style.display = 'none';
        }
    }
    const lastTR = tableUsersList.rows[tableUsersList.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide");
    if (searchText == "") {
        lastTR.classList.add("hide");
    }
}