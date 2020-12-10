/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
let divCreateUser = document.getElementById('divCreateUser');
let divGetUsers = document.getElementById('divGetUsers');

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

document.getElementById('optUser1').addEventListener('click', showCreateUser);
document.getElementById('optUser2').addEventListener('click', showGetUsers);

/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */
function showCreateUser() {
    divCreateUser.classList.add('class', 'card');
    divCreateUser.classList.add('class', 'card-3');
    divCreateUser.classList.remove('hidden');
    divGetUsers.classList.remove('card');
    divGetUsers.classList.add('hidden');
}

function showGetUsers() {
    divGetUsers.classList.remove('hidden');
    divGetUsers.classList.add('card');
    divCreateUser.classList.remove('card');
    divCreateUser.classList.remove('card-3');
    divCreateUser.classList.add('hidden');
}


/* ------------------------------------FUNCIONES DE CRUD ------------------------- */

function btnAddUsers() {

    let url = `http://localhost:3000/v1/createCompany`;
    fetch(url, {
            method: 'POST',
            body: `{"nit":"${inputNit.value}","name":"${inputName.value}","phone":"${inputPhone.value}","email":"${inputEmail.value}","address":"${inputAddress.value}","cities_id":"18"}`,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            console.log(res);
            if (res.status == 201) {
                res.json().then((data) => {
                    console.log(data);
                });
            } else {
                alert("Fallo la creación de la compañía");
            }
        })
        .catch(err => console.log(err));
}

async function btnGetUsers() {
    let arrData;
    let url = `http://localhost:3000/v1/readCompany`;
    await fetch(url)
        .then((resp) => resp.json())
        .then(async function(data) {
            arrData = data.body.readComp;
            arrAux = data.body.readComp;
            tableCompanies.innerText = "";
            for (var index = 0; index < arrData.length; index++) {

                var tr = document.createElement('tr');
                tr.innerHTML = `<td>${arrData[index].nit}</td><td>${arrData[index].name}</td><td>${arrData[index].phone}</td><td>${arrData[index].email}</td><td>${arrData[index].address}</td><td>${arrData[index].city}</td><td class="centerContent"><a id="u${arrData[index].nit}" onclick="updateCompany(this)" href="#" title="Modificar"><i class="fas fa-edit"></i></a> | <a id="d${arrData[index].nit}" onclick="btnDeleteCompany(this)" href="#" title="Eliminar"><i class="fas fa-user-times"></i></a></td>`
                tableCompanies.appendChild(tr);
            }
            return arrData;
        })
        .catch(err => console.log(err));

}

function btnEditUsers() {

    let url = `http://localhost:3000/v1/updateCompany`;
    fetch(url, {
            method: 'PUT',
            body: `{"nit":"${inputNit.value}","name":"${inputName.value}","phone":"${inputPhone.value}","email":"${inputEmail.value}","address":"${inputAddress.value}","cities_id":"17"}`,
            headers: { "Content-Type": "application/json" }
        })
        .then((resp) => resp.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

async function btnDeleteUsers(iconDelete) {
    let nit = iconDelete.id;
    nit = nit.slice(1, nit.length);
    let url = `http://localhost:3000/v1/deleteCompany`;
    await fetch(url, {
            method: 'DELETE',
            body: `{"nit":"${nit}"}`,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp) => resp.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));

    btnGetCompanies();
}