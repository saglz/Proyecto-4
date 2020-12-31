/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
let arrAux = [];

let addCompany = document.getElementById('addCompany'); //btn de Registro    C
let btnComp = document.getElementById('btnCompanies'); //                    R
/* let editCompany = document.getElementById('editCompany'); //                 U
let deleteCompany = document.getElementById('deleteCompany'); //             D */

let searchCompany = document.getElementById('searchCompany');
let tableCompanies = document.getElementById('tableCompanies'); //BODY DE LA TABLA
let tableCompany = document.getElementById('tableCompany');
let pageCompany = document.getElementById('pageCompany');
let btnCreateCompany = document.getElementById('btnCreateCompany');
let divCreateCompany = document.getElementById('divCreateCompany');
let btnUpdateCompany = document.getElementById('btnUpdateCompany');


/* Campos formulario */
let inputNit = document.getElementById('inputNit');
let inputName = document.getElementById('inputName');
let inputPhone = document.getElementById('inputPhone');
let inputEmail = document.getElementById('inputEmail');
let inputAddress = document.getElementById('inputAddress');

inputNit.value = "";
inputName.value = "";
inputPhone.value = "";
inputEmail.value = "";
inputAddress.value = "";

/* Paginas */
let pageSelectCompanies = document.getElementById('quantityCompanies');
let backCompanies = document.getElementById('backCompanies');
let nextCompanies = document.getElementById('nextCompanies');
let pagInitCompanies = 0;
let pagFinalCompanies = parseInt(pageSelectCompanies.value);

/* Busqueda */
let inputSearchCompanies = document.getElementById('inputSearchCompanies');
let tableCompaniesList = document.getElementById('companiesList');

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

/* CRUD */
addCompany.addEventListener('click', btnAddCompanies);
btnComp.addEventListener('click', btnGetCompanies);
/* editCompany.addEventListener('click', btnEditCompany);
deleteCompany.addEventListener('click', btnDeleteCompany); */
/* Otros */
btnCreateCompany.addEventListener('click', showCreateCompany);
btnUpdateCompany.addEventListener('click', btnEditCompany);

pageSelectCompanies.addEventListener('change', changeQuantityCompanies);

/* ------------------------------------FUNCIONES DE CRUD ------------------------- */

async function btnAddCompanies(event) {
    event.preventDefault();

    let url = `http://localhost:3000/v1/createCompany`;
    await fetch(url, {
            method: 'POST',
            body: `{"nit":"${inputNit.value}","name":"${inputName.value}","phone":"${inputPhone.value}","email":"${inputEmail.value}","address":"${inputAddress.value}","cities_id":"18"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            res.json().then((data) => {
                if (res.status == 201) {
                    alert(data.body);
                    normalizeForm();
                    showCreateCompany();
                } else {
                    alert(data.error);
                }
            });
        })
        .catch(err => console.log(err));

}

async function btnGetCompanies() {
    let arrData;
    let tok = localStorage.getItem("token");
    let url = `http://localhost:3000/v1/readCompany`;
    await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
            }
        })
        .then((resp) => resp.json())
        .then(async function(data) {
            arrData = data.body.readComp;
            arrAux = data.body.readComp;

            createRowCompanies(arrData);

        })
        .catch(err => console.log(err));

}

function btnEditCompany() {

    let url = `http://localhost:3000/v1/updateCompany`;
    fetch(url, {
            method: 'PUT',
            body: `{"nit":"${inputNit.value}","name":"${inputName.value}","phone":"${inputPhone.value}","email":"${inputEmail.value}","address":"${inputAddress.value}","cities_id":"17"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((resp) => resp.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

async function btnDeleteCompany(iconDelete) {
    let nit = iconDelete.id;
    nit = nit.slice(1, nit.length);
    let url = `http://localhost:3000/v1/deleteCompany`;
    await fetch(url, {
            method: 'DELETE',
            body: `{"nit":"${nit}"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((resp) => resp.json())
        .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
        .catch(err => console.log(err));

    btnGetCompanies();
}

async function deleteCompanySelect() {
    let elements = document.getElementsByName(`check`);

    for (i = 1; i < elements.length; i++) {
        let nit = elements[i].id;
        nit = nit.slice(6, nit.length);
        let url = `http://localhost:3000/v1/deleteCompany`;

        if (elements[i].checked) {
            await fetch(url, {
                    method: 'DELETE',
                    body: `{"nit":"${nit}"}`,
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((resp) => resp.json())
                .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
                .catch(err => console.log(err));
        }
        btnGetCompanies();
    }
}
/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

function showCreateCompany() {
    normalizeFormCompany();
    searchCompany.classList.toggle('hidden');
    tableCompany.classList.toggle('hidden');
    pageCompany.classList.toggle('hidden');
    divCreateCompany.classList.toggle('hidden');
    divCreateCompany.classList.toggle('card');
    divCreateCompany.classList.toggle('card-3');
    pageCompany.classList.toggle('row');

    btnCreateCompany.innerText === "Crear nueva compañía" ? btnCreateCompany.innerText = "Lista de compañías" : btnCreateCompany.innerText = "Crear nueva compañía";

    btnUpdateCompany.classList.remove('btn1', 'btn--pill', 'btn--blue');
    btnUpdateCompany.classList.add('hidden');
    addCompany.classList.add('btn1', 'btn--pill', 'btn--green');
    addCompany.classList.remove('hidden');

    btnGetCompanies();
}

function showUpdateCompany() {
    btnUpdateCompany.classList.toggle('btn1');
    btnUpdateCompany.classList.toggle('btn--pill');
    btnUpdateCompany.classList.toggle('btn--blue');
    btnUpdateCompany.classList.toggle('hidden');
    addCompany.classList.toggle('btn1');
    addCompany.classList.toggle('btn--pill');
    addCompany.classList.toggle('btn--green');
    addCompany.classList.toggle('hidden');
}

function searchValue(nit) {

    return { dataToEdit };
}

async function updateCompany(iconEdit) {

    let nit = iconEdit.id;
    nit = nit.slice(1, nit.length);
    let dataToEdit;
    arrAux.forEach(element => {
        if (element.nit == nit) {
            dataToEdit = element;
        }
    });

    showCreateCompany();

    inputNit.value = dataToEdit.nit;
    inputName.value = dataToEdit.name;
    inputPhone.value = dataToEdit.phone;
    inputEmail.value = dataToEdit.email;
    inputAddress.value = dataToEdit.address;
    showUpdateCompany();
}

function normalizeFormCompany() {
    inputNit.value = "";
    inputName.value = "";
    inputPhone.value = "";
    inputEmail.value = "";
    inputAddress.value = "";
}

function createRowCompanies(arrayResult) {
    /* pagFinalContacts = parseInt(pageSelectContacts.value); */

    if (pagFinalCompanies >= arrayResult.length) {

        tableCompanies.innerText = "";
        for (var index = pagInitCompanies; index < arrayResult.length; index++) {

            var tr = document.createElement('tr');
            tr.innerHTML = `<td><div class="form-check"><input class="form-check-input" onclick="countCheck(this)" type="checkbox" value="" id="ckCont${arrayResult[index].nit}" name="check"></div></td>
                <td>${arrayResult[index].nit}</td><td>${arrayResult[index].name}</td><td>${arrayResult[index].phone}</td><td>${arrayResult[index].email}</td><td>${arrayResult[index].address}</td><td>${arrayResult[index].city}</td><td class="centerContent"><a id="u${arrayResult[index].nit}" onclick="updateCompany(this)" href="#" title="Modificar"><i class="fas fa-edit"></i></a> | <a id="d${arrayResult[index].nit}" onclick="btnDeleteCompany(this)" href="#" title="Eliminar"><i class="fas fa-user-times"></i></a></td>`
            tableCompanies.appendChild(tr);
        }

    } else if (pagFinalCompanies < arrayResult.length) {

        tableCompanies.innerText = "";
        for (var index = pagInitCompanies; index < pagFinalCompanies; index++) {

            var tr = document.createElement('tr');
            tr.innerHTML = `<td><div class="form-check"><input class="form-check-input" onclick="countCheck(this)" type="checkbox" value="" id="ckCont${arrayResult[index].nit}" name="check"></div></td>
                <td>${arrayResult[index].nit}</td><td>${arrayResult[index].name}</td><td>${arrayResult[index].phone}</td><td>${arrayResult[index].email}</td><td>${arrayResult[index].address}</td><td>${arrayResult[index].city}</td><td class="centerContent"><a id="u${arrayResult[index].nit}" onclick="updateCompany(this)" href="#" title="Modificar"><i class="fas fa-edit"></i></a> | <a id="d${arrayResult[index].nit}" onclick="btnDeleteCompany(this)" href="#" title="Eliminar"><i class="fas fa-user-times"></i></a></td>`
            tableCompanies.appendChild(tr);
        }

    }

}

function changeQuantityCompanies() {
    pagFinalCompanies = parseInt(pageSelectCompanies.value);
    createRowCompanies(arrAux);
}

backCompanies.addEventListener('click', () => {
    validate = pagInitCompanies - parseInt(pageSelectCompanies.value)
    if (validate >= 0) {
        pagInitCompanies = pagInitCompanies - parseInt(pageSelectCompanies.value)
        pagFinalCompanies = pagFinalCompanies - parseInt(pageSelectCompanies.value)
        createRowCompanies(arrAux);
    }
})

nextCompanies.addEventListener('click', () => {
    if (parseInt(pagFinalCompanies) <= arrAux.length) {
        pagInitCompanies = parseInt(pagInitCompanies) + parseInt(pageSelectCompanies.value);
        pagFinalCompanies = parseInt(pagFinalCompanies) + parseInt(pageSelectCompanies.value);
        createRowCompanies(arrAux);
    }
})

/* Busqueda */
inputSearchCompanies.addEventListener('keypress', (event) => {
    if (event.key == "Enter") {
        doSearchComp();
    }
});

function doSearchComp() {
    const searchText = inputSearchCompanies.value.toLowerCase();
    let total = 0;
    for (let i = 1; i < tableCompaniesList.rows.length; i++) {
        if (tableCompaniesList.rows[i].classList.contains("noSearch")) {
            continue;
        }
        let found = false;
        const cellsOfRow = tableCompaniesList.rows[i].getElementsByTagName('td');
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableCompaniesList.rows[i].style.display = '';
        } else {
            tableCompaniesList.rows[i].style.display = 'none';
        }
    }
    const lastTR = tableCompaniesList.rows[tableCompaniesList.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide");
    if (searchText == "") {
        lastTR.classList.add("hide");
    }
}