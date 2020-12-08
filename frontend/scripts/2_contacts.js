/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
/* let arrAux = []; 

let addCompany = document.getElementById('addCompany'); //btn de Registro    C*/
let btnCont = document.getElementById('btnContacts'); //                    R
/* let editCompany = document.getElementById('editCompany'); //                 U
let deleteCompany = document.getElementById('deleteCompany'); //             D

let searchCompany = document.getElementById('searchCompany'); */
let tableContacts = document.getElementById('tableContacts'); //BODY DE LA TABLA
let tableContact = document.getElementById('tableContact');
/* let pageCompany = document.getElementById('pageCompany');
let btnCreateCompany = document.getElementById('btnCreateCompany');
let divCreateCompany = document.getElementById('divCreateCompany');
let btnUpdateCompany = document.getElementById('btnUpdateCompany'); */


/* Campos formulario */
/* let inputNit = document.getElementById('inputNit');
let inputName = document.getElementById('inputName');
let inputPhone = document.getElementById('inputPhone');
let inputEmail = document.getElementById('inputEmail');
let inputAddress = document.getElementById('inputAddress'); */
/* let inputCiudad = document.getElementById('btnCompanies'); */

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

/* CRUD */
/* addCompany.addEventListener('click', btnAddCompanies); */
btnCont.addEventListener('click', btnGetContacts);
/* editCompany.addEventListener('click', btnEditCompany);
deleteCompany.addEventListener('click', btnDeleteCompany); */
/* Otros */
/* btnCreateCompany.addEventListener('click', showCreateCompany);
btnUpdateCompany.addEventListener('click', btnEditCompany); */


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

async function btnGetContacts() {
    let arrData;
    let url = `http://localhost:3000/v1/readContacts`;
    await fetch(url)
        .then((resp) => resp.json())
        .then(async function(data) {
            arrData = data.body.readCont;
            /* arrAux = data.body.readCont; */
            tableContact.innerText = "";
            for (var index = 0; index < arrData.length; index++) {

                var tr = document.createElement('tr');
                tr.innerHTML = `<td>${arrData[index].name} ${arrData[index].lastName}<br>${arrData[index].email}</td><td>${arrData[index].country}<br>${arrData[index].region}</td><td>${arrData[index].company}</td><td>${arrData[index].position}</td><td>${arrData[index].channel}</td><td>${arrData[index].interest}%</td><td><a id="u${arrData[index].name}" onclick="updateCompany(this)" href="#" title="Modificar"><i class="fas fa-edit"></i></a> | <a id="d${arrData[index].name}" onclick="btnDeleteCompany(this)" href="#" title="Eliminar"><i class="fas fa-user-times"></i></a></td>`
                tableContact.appendChild(tr);
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