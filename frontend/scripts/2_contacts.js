/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
/* let arrAux = []; */

let addContact = document.getElementById('addContact'); //btn de Registro    C
let getContact = document.getElementById('btnContacts'); //                     R
/* let editContact = document.getElementById('editContact'); //                 U
let deleteContact = document.getElementById('deleteContact'); //             D */

let searchContact = document.getElementById('searchContact');
let tableContacts = document.getElementById('tableContacts'); //BODY DE LA TABLA
let tableContact = document.getElementById('tableContact');
let pageContact = document.getElementById('pageContact');
let btnCreateContact = document.getElementById('btnCreateContact');
let divCreateContact = document.getElementById('divCreateContact');
let btnUpdateContact = document.getElementById('btnUpdateContact');


/* Campos formulario */
/* let inputNit = document.getElementById('inputNit');
let inputName = document.getElementById('inputName');
let inputPhone = document.getElementById('inputPhone');
let inputEmail = document.getElementById('inputEmail');
let inputAddress = document.getElementById('inputAddress'); */
/* let inputCiudad = document.getElementById('btnCompanies'); */

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

/* CRUD */
addContact.addEventListener('click', btnAddContact);
getContact.addEventListener('click', btnGetContacts);
/* editContact.addEventListener('click', btnEditContact);
deleteContact.addEventListener('click', btnDeleteContact); */
/* Otros */
btnCreateContact.addEventListener('click', showCreateContact);
btnUpdateContact.addEventListener('click', btnEditContact);


/* ------------------------------------FUNCIONES DE CRUD ------------------------- */

function btnAddContact() {

    let url = `http://localhost:3000/v1/createContacts`;
    fetch(url, {
            method: 'POST',
            body: `{"id":"${inputIdCont.value}","name":"${inputNameCont.value}","lastName":"${inputName.value}","email":"${inputEmailCont.value}","position":"${inputPositionCont.value}","channel":"${inputChannelCont.value}","companies_id":"1"}`,
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
                tr.innerHTML = `<td>${arrData[index].name} ${arrData[index].lastName}<br>${arrData[index].email}</td><td>${arrData[index].country}<br>${arrData[index].region}</td><td>${arrData[index].company}</td><td>${arrData[index].position}</td><td>${arrData[index].channel}</td><td>${arrData[index].interest}%</td><td class="centerContent"><a id="u${arrData[index].id}" onclick="updateContact(this)" href="#" title="Modificar"><i class="fas fa-edit"></i></a> | <a id="d${arrData[index].id}" onclick="btnDeleteContact(this)" href="#" title="Eliminar"><i class="fas fa-user-times"></i></a></td>`
                tableContact.appendChild(tr);
            }
            return arrData;
        })
        .catch(err => console.log(err));

}

function btnEditContact() {

    let url = `http://localhost:3000/v1/updateContacts`;
    fetch(url, {
            method: 'PUT',
            body: `{"nit":"${inputNit.value}","name":"${inputName.value}","phone":"${inputPhone.value}","email":"${inputEmail.value}","address":"${inputAddress.value}","cities_id":"17"}`,
            headers: { "Content-Type": "application/json" }
        })
        .then((resp) => resp.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

async function btnDeleteContact(iconDelete) {
    let id = iconDelete.id;
    id = id.slice(1, id.length);
    let url = `http://localhost:3000/v1/deleteContacts`;
    await fetch(url, {
            method: 'DELETE',
            body: `{"id":"${id}"}`,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp) => resp.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));

    btnGetContacts();
}


/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

function showCreateContact() {
    normalizeFormContact();
    searchContact.classList.toggle('hidden');
    tableContact.classList.toggle('hidden');
    pageContact.classList.toggle('hidden');
    divCreateContact.classList.toggle('hidden');
    divCreateContact.classList.toggle('card');
    divCreateContact.classList.toggle('card-3');
    pageContact.classList.toggle('row');

    btnCreateCompany.innerText === "Crear nueva compañía" ? btnCreateCompany.innerText = "Lista de compañías" : btnCreateCompany.innerText = "Crear nueva compañía";

    btnGetCompanies();
}

function showUpdateContact() {
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

function updateContact(iconEdit) {

    let nit = iconEdit.id;
    nit = nit.slice(1, nit.length);
    let dataToEdit = searchValue(nit);

    showCreateContact();

    inputNit.value = dataToEdit.nit;
    inputName.value = dataToEdit.name;
    inputPhone.value = dataToEdit.phone;
    inputEmail.value = dataToEdit.email;
    inputAddress.value = dataToEdit.address;
    showUpdateContact();
}

function normalizeFormContact() {
    inputIdCont.value = "";
    inputNameCont.value = "";
    inputName.value = "";
    inputEmailCont.value = "";
    inputPositionCont.value = "";
    inputChannelCont.value = "";
}