/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
let token = localStorage.getItem('token');

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
let pagContacts = document.getElementById('pagContacts');

let dropdownRegion = document.getElementById('dropdownRegion');
let dropdownCountry = document.getElementById('dropdownCountry');
let btnDropdownCompany = document.getElementById('dropdownCompany');

/* Campos formulario */
let inputIdCont = document.getElementById('inputIdCont');
let inputNameCont = document.getElementById('inputNameCont');
let inputlastName = document.getElementById('inputlastName');
let inputEmailCont = document.getElementById('inputEmailCont');
let inputPositionCont = document.getElementById('inputPositionCont');
let inputChannelCont = document.getElementById('inputChannelCont');
let inputInterestCont = document.getElementById('inputInterestCont');

/* Paginas */
let pageSelectContacts = document.getElementById('quantityContact');
let backContacts = document.getElementById('backContacts');
let nextContacts = document.getElementById('nextContacts');
let pagInitContacts = 0;
let pagFinalContacts = parseInt(pageSelectContacts.value);

/* Busqueda */
let inputSearchContacts = document.getElementById('inputSearchContacts');
let tableContactList = document.getElementById('contactList');
/* ------------------------------------EVENTOS LISTENER----------------------------------- */

/* CRUD */
addContact.addEventListener('click', btnAddContact);
getContact.addEventListener('click', btnGetContacts);
/* editContact.addEventListener('click', btnEditContact);
deleteContact.addEventListener('click', btnDeleteContact); */
/* Otros */
btnCreateContact.addEventListener('click', showCreateContact);
btnUpdateContact.addEventListener('click', btnEditContact);

dropdownCountry.addEventListener('click', btnGetCountryOptions);
dropdownRegion.addEventListener('click', btnGetRegionOptions);
btnDropdownCompany.addEventListener('click', btnGetCompaniesOptions);
inputInterestCont.addEventListener('change', setValueInterest);

pageSelectContacts.addEventListener('change', changeQuantityContacts);


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
    let tok = localStorage.getItem("token");
    let url = `http://localhost:3000/v1/readContacts`;
    await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
            }
        })
        .then((resp) => resp.json())
        .then(async function(data) {
            arrData = data.body.readCont;
            arrAux = data.body.readCont;

            createRowContacts(arrData);
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
async function btnGetRegionOptions() {
    let arrData;
    let url = `http://localhost:3000/v1/readRegion`;
    await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            arrData = data.body.readRegionQuery;
            createOptionsDropdown(arrData);

        })
        .catch(err => console.log(err));
}
async function btnGetCountryOptions() {
    let arrData;
    if (dpdId) {
        let url = `http://localhost:3000/v1/readCountries/${dpdId}`;
        await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                arrData = data.body.readCountriesQuery;
                createOptionsDropdown(arrData);

            })
            .catch(err => console.log(err));
    }

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
    /* inputCountry.value = dataToEdit.country; */
    /* inputRegion.value = dataToEdit.region; */
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

function createRowContacts(arrayResult) {
    /* pagFinalContacts = parseInt(pageSelectContacts.value); */

    if (pagFinalContacts >= arrayResult.length) {

        tableContact.innerText = "";
        for (var index = pagInitContacts; index < arrayResult.length; index++) {

            var tr = document.createElement('tr');
            tr.innerHTML = `<td><div class="form-check"><input class="form-check-input" type="checkbox" onclick="countCheck(this)"  name="checkContacts" id="ckCont${arrayResult[index].id}"></div></td>
        <td>${arrayResult[index].name} ${arrayResult[index].lastName}<br>${arrayResult[index].email}</td><td>${arrayResult[index].country}<br>${arrayResult[index].region}</td><td>${arrayResult[index].company}</td><td>${arrayResult[index].position}</td><td>${arrayResult[index].channel}</td><td>${arrayResult[index].interest}%</td><td class="centerContent"><a id="u${arrayResult[index].id}" onclick="updateContact(this)" href="#" title="Modificar"><i class="fas fa-edit"></i></a> | <a id="d${arrayResult[index].id}" onclick="btnDeleteContact(this)" href="#" title="Eliminar"><i class="fas fa-user-times"></i></a></td>`
            tableContact.appendChild(tr);
        }

    } else if (pagFinalContacts < arrayResult.length) {

        tableContact.innerText = "";
        for (var index = pagInitContacts; index < pagFinalContacts; index++) {

            var tr = document.createElement('tr');
            tr.innerHTML = `<td><div class="form-check"><input class="form-check-input" type="checkbox" onclick="countCheck(this)"  name="checkContacts" id="ckCont${arrayResult[index].id}"></div></td>
        <td>${arrayResult[index].name} ${arrayResult[index].lastName}<br>${arrayResult[index].email}</td><td>${arrayResult[index].country}<br>${arrayResult[index].region}</td><td>${arrayResult[index].company}</td><td>${arrayResult[index].position}</td><td>${arrayResult[index].channel}</td><td>${arrayResult[index].interest}%</td><td class="centerContent"><a id="u${arrayResult[index].id}" onclick="updateContact(this)" href="#" title="Modificar"><i class="fas fa-edit"></i></a> | <a id="d${arrayResult[index].id}" onclick="btnDeleteContact(this)" href="#" title="Eliminar"><i class="fas fa-user-times"></i></a></td>`
            tableContact.appendChild(tr);
        }

    }

}

function changeQuantityContacts() {
    pagFinalContacts = parseInt(pageSelectContacts.value);
    createRowContacts(arrAux);
}

backContacts.addEventListener('click', () => {
    validate = pagInitContacts - parseInt(pageSelectContacts.value)
    if (validate >= 0) {
        if (pagContacts.innerText >= 1) {
            let valInit = pagContacts.innerText;
            pagContacts.innerText = --valInit;
        }
        pagInitContacts = pagInitContacts - parseInt(pageSelectContacts.value)
        pagFinalContacts = pagFinalContacts - parseInt(pageSelectContacts.value)
        createRowContacts(arrAux);
    }
})

nextContacts.addEventListener('click', () => {
    if (parseInt(pagFinalContacts) <= arrAux.length) {
        if (pagContacts.innerText >= 1) {
            let valInit = pagContacts.innerText;
            pagContacts.innerText = ++valInit;
        }
        pagInitContacts = parseInt(pagInitContacts) + parseInt(pageSelectContacts.value);
        pagFinalContacts = parseInt(pagFinalContacts) + parseInt(pageSelectContacts.value);
        createRowContacts(arrAux);
    }
})


inputSearchContacts.addEventListener('keypress', (event) => {
    if (event.key == "Enter") {
        doSearch();
    }
});

function doSearch() {
    const searchText = inputSearchContacts.value.toLowerCase();
    let total = 0;
    for (let i = 1; i < tableContactList.rows.length; i++) {
        if (tableContactList.rows[i].classList.contains("noSearch")) {
            continue;
        }
        let found = false;
        const cellsOfRow = tableContactList.rows[i].getElementsByTagName('td');
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableContactList.rows[i].style.display = '';
        } else {
            tableContactList.rows[i].style.display = 'none';
        }
    }
    const lastTR = tableContactList.rows[tableContactList.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide");
    if (searchText == "") {
        lastTR.classList.add("hide");
    }
}