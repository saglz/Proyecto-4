/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
let arrAux = [];

let addCompany = document.getElementById('addCompany'); //btn de Registro    C
let btnComp = document.getElementById('btnCompanies'); //                    R
let editCompany = document.getElementById('editCompany'); //                 U
let deleteCompany = document.getElementById('deleteCompany'); //             D

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
/* let inputCiudad = document.getElementById('btnCompanies'); */

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

/* CRUD */
addCompany.addEventListener('click', btnAddCompanies);
btnComp.addEventListener('click', btnGetCompanies);
editCompany.addEventListener('click', btnEditCompany);
deleteCompany.addEventListener('click', btnDeleteCompany);
/* Otros */
btnCreateCompany.addEventListener('click', showCreateCompany);
btnUpdateCompany.addEventListener('click', btnEditCompany);


/* ------------------------------------FUNCIONES DE CRUD ------------------------- */

function btnAddCompanies() {

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

async function btnGetCompanies() {
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
                tr.innerHTML = `<td>${arrData[index].nit}</td><td>${arrData[index].name}</td><td>${arrData[index].phone}</td><td>${arrData[index].email}</td><td>${arrData[index].address}</td><td>${arrData[index].city}</td><td><a id="u${arrData[index].nit}" onclick="updateCompany(this)" href="#"><i class="fas fa-edit"></i></a> | <a id="d${arrData[index].nit}" onclick="btnDeleteCompany(this)" href="#"><i class="fas fa-user-times"></i></a></td>`
                tableCompanies.appendChild(tr);
            }
            return arrData;
        })
        .catch(err => console.log(err));

}

function btnEditCompany() {

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

async function btnDeleteCompany(iconDelete) {
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


/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

function showCreateCompany() {
    normalizeForm();
    searchCompany.classList.toggle('hidden');
    tableCompany.classList.toggle('hidden');
    pageCompany.classList.toggle('hidden');
    divCreateCompany.classList.toggle('hidden');
    divCreateCompany.classList.toggle('card');
    divCreateCompany.classList.toggle('card-3');
    pageCompany.classList.toggle('row');

    btnCreateCompany.innerText === "Crear nueva compañía" ? btnCreateCompany.innerText = "Lista de compañías" : btnCreateCompany.innerText = "Crear nueva compañía";

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
    let dataToEdit;
    arrAux.forEach(element => {

        if (element.nit == nit) {
            dataToEdit = element;
        }
    });
    return dataToEdit;
}

function updateCompany(iconEdit) {

    let nit = iconEdit.id;
    nit = nit.slice(1, nit.length);
    let dataToEdit = searchValue(nit);

    showCreateCompany();

    inputNit.value = dataToEdit.nit;
    inputName.value = dataToEdit.name;
    inputPhone.value = dataToEdit.phone;
    inputEmail.value = dataToEdit.email;
    inputAddress.value = dataToEdit.address;
    showUpdateCompany();
}

function normalizeForm() {
    inputNit.value = "";
    inputName.value = "";
    inputPhone.value = "";
    inputEmail.value = "";
    inputAddress.value = "";
}