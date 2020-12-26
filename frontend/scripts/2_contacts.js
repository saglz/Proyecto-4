/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
let token = localStorage.token;

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
let btnExportContact = document.getElementById('btnExportContact');

let btnDropdownCompany = document.getElementById('dropdownCompany')
    /* Campos formulario */
let inputIdCont = document.getElementById('inputIdCont');
let inputNameCont = document.getElementById('inputNameCont');
let inputlastName = document.getElementById('inputlastName');
let inputEmailCont = document.getElementById('inputEmailCont');
let inputPositionCont = document.getElementById('inputPositionCont');
let inputChannelCont = document.getElementById('inputChannelCont');
let inputInterestCont = document.getElementById('inputInterestCont');

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

/* CRUD */
addContact.addEventListener('click', btnAddContact);
getContact.addEventListener('click', btnGetContacts);
/* editContact.addEventListener('click', btnEditContact);
deleteContact.addEventListener('click', btnDeleteContact); */
/* Otros */
btnCreateContact.addEventListener('click', showCreateContact);
btnUpdateContact.addEventListener('click', btnEditContact);

btnDropdownCompany.addEventListener('click', btnGetCompaniesOptions);
inputInterestCont.addEventListener('change', setValueInterest);


/* ------------------------------------FUNCIONES DE CRUD ------------------------- */

function btnAddContact(event) {
    event.preventDefault();

    let url = `http://localhost:3000/v1/createContacts`;
    fetch(url, {
            method: 'POST',
            body: `{"id":"${inputIdCont.value}","name":"${inputNameCont.value}","lastName":"${inputlastName.value}","email":"${inputEmailCont.value}","position":"${inputPositionCont.value}","channel":"${inputChannelCont.value}","interest":"${inputInterestCont.value}","companies_id":"${dpdId}"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            res.json().then((data) => {
                if (res.status == 201) {
                    alert(data.body);
                    showCreateContact();

                } else {
                    alert(data.error);
                }
            });
        })
        .catch(err => console.log(err));
}

async function btnGetContacts() {
    let arrData;
    let url = `http://localhost:3000/v1/readContacts`;
    await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((resp) => resp.json())
        .then(async function(data) {
            arrData = data.body.readCont;
            arrAux = data.body.readCont;
            tableContact.innerText = "";
            for (var index = 0; index < arrData.length; index++) {

                var tr = document.createElement('tr');
                tr.innerHTML = `<td><div class="form-check"><input class="form-check-input" type="checkbox" onclick="countCheck(this)"  name="checkContacts" id="ckCont${arrData[index].id}"></div></td>
            <td>${arrData[index].name} ${arrData[index].lastName}<br>${arrData[index].email}</td><td>${arrData[index].country}<br>${arrData[index].region}</td><td>${arrData[index].company}</td><td>${arrData[index].position}</td><td>${arrData[index].channel}</td><td>${arrData[index].interest}%</td><td class="centerContent"><a id="u${arrData[index].id}" onclick="updateContact(this)" href="#" title="Modificar"><i class="fas fa-edit"></i></a> | <a id="d${arrData[index].id}" onclick="btnDeleteContact(this)" href="#" title="Eliminar"><i class="fas fa-user-times"></i></a></td>`
                tableContact.appendChild(tr);
            }
            return arrData;
        })
        .catch(err => console.log(err));
}

async function btnGetCompaniesOptions() {
    let arrData;
    let url = `http://localhost:3000/v1/readCompany`;
    await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            arrData = data.body.readComp;
            createOptionsDropdown(arrData);

        })
        .catch(err => console.log(err));
}

function btnEditContact(event) {
    event.preventDefault();

    let url = `http://localhost:3000/v1/updateContacts`;
    fetch(url, {
            method: 'PUT',
            body: `{"id":"${inputIdCont.value}","name":"${inputNameCont.value}","lastName":"${inputlastName.value}","email":"${inputEmailCont.value}","position":"${inputPositionCont.value}","channel":"${inputChannelCont.value}","interest":"${inputInterestCont.value}","companies_id":"${dpdId}"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((resp) => resp.json())
        .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
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
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((resp) => resp.json())
        .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
        .catch(err => console.log(err));

    btnGetContacts();
}

async function deleteContactSelect() {
    let elements = document.getElementsByName(`checkContacts`);

    for (i = 1; i < elements.length; i++) {

        if (elements[i].checked) {

            let id = elements[i].id;
            id = id.slice(6, id.length);

            let url = `http://localhost:3000/v1/deleteContacts`;
            await fetch(url, {
                    method: 'DELETE',
                    body: `{"id":"${id}"}`,
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
    btnGetContacts();
}

/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

function showCreateContact() {
    normalizeFormContact();
    searchContact.classList.toggle('hidden');
    tableContacts.classList.toggle('hidden');
    pageContact.classList.toggle('hidden');
    divCreateContact.classList.toggle('hidden');
    btnExportContact.classList.toggle('hidden');
    divCreateContact.classList.toggle('card');
    divCreateContact.classList.toggle('card-3');
    pageContact.classList.toggle('row');

    btnCreateContact.innerText == "Agregar contacto" ? btnCreateContact.innerText = "Lista de contactos" : btnCreateContact.innerText = "Agregar contacto";

    btnGetContacts();
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

/* function searchValue(id) {
    let dataToEdit;
    arrAux.forEach(element => {

        if (element.id == id) {
            dataToEdit = element;
        }
    });
    return dataToEdit;
} */

function updateContact(iconEdit) {

    let id = iconEdit.id;
    id = id.slice(1, id.length);

    let dataToEdit;
    arrAux.forEach(element => {

        if (element.id == id) {
            dataToEdit = element;
        }
    });
    showCreateContact();

    inputIdCont.value = dataToEdit.id;
    inputNameCont.value = dataToEdit.name;
    inputlastName.value = dataToEdit.lastName;
    inputEmailCont.value = dataToEdit.email;
    btnDropdownCompany.innerText = dataToEdit.company;
    inputPositionCont.value = dataToEdit.position;
    inputCountry.value = dataToEdit.country;
    inputRegion.value = dataToEdit.region;
    inputChannelCont.value = dataToEdit.channel;
    inputInterestCont.value = dataToEdit.interest;
    spanValueInterest.innerText = dataToEdit.interest;
    showUpdateContact();

    addContact.classList.remove("btn1", "btn--pill", "btn--green");
    addContact.classList.add("hidden");
    btnUpdateContact.classList.remove('hidden');
    btnUpdateContact.classList.add("btn1", "btn--pill", "btn--green");

}

function normalizeFormContact() {
    inputIdCont.value = "";
    inputNameCont.value = "";
    inputlastName.value = "";
    inputEmailCont.value = "";
    inputPositionCont.value = "";
    inputChannelCont.value = "";
    inputInterestCont.value = 0;
    spanValueInterest.innerText = 0;
    btnDropdownCompany.innerText = "Seleccione una compañía";
}

function setValueInterest() {
    let spanValueInterest = document.getElementById('spanValueInterest');
    spanValueInterest.innerText = inputInterestCont.value;
}