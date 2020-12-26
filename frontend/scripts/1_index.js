/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
const secContacts = document.getElementById('contacts');
const secCompanies = document.getElementById('companies');
const secUsers = document.getElementById('users');
const secRegion = document.getElementById('regionCity');
const secLogin = document.getElementById('login');

const btnContacts = document.getElementById('btnContacts');
const btnCompanies = document.getElementById('btnCompanies');
const btnUsers = document.getElementById('btnUsers');
const btnRegion = document.getElementById('btnRegion');
const btnLogin = document.getElementById('btnLogin');

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

btnContacts.addEventListener('click', btnContactsChange);
btnCompanies.addEventListener('click', btnCompaniesChange);
btnUsers.addEventListener('click', btnUsersChange);
btnRegion.addEventListener('click', btnRegionChange);
btnLogin.addEventListener('click', btnLoginChange);

/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

/* Botones de secciones */
function btnContactsChange() {
    resetActive()
    btnContacts.classList.add('active');
    secHidden();
    secContacts.classList.remove('hidden');
}

function btnCompaniesChange() {
    resetActive()
    btnCompanies.classList.add('active');
    secHidden();
    secCompanies.classList.remove('hidden');
}

function btnUsersChange() {
    resetActive()
    btnUsers.classList.add('active');
    secHidden();
    secUsers.classList.remove('hidden');
}

function btnRegionChange() {
    resetActive()
    btnRegion.classList.add('active');
    secHidden();
    secRegion.classList.remove('hidden');
}

function btnLoginChange() {
    resetActive();
    btnLogin.classList.add('active');
    secHidden();
    secLogin.classList.remove('hidden');
}

function secHidden() {
    secContacts.classList.add('hidden');
    secCompanies.classList.add('hidden');
    secUsers.classList.add('hidden');
    secRegion.classList.add('hidden');
    secLogin.classList.add('hidden');
}

/* RESET MENU ACTIVE */
function resetActive() {
    btnContacts.classList.remove('active');
    btnCompanies.classList.remove('active');
    btnUsers.classList.remove('active');
    btnRegion.classList.remove('active');
    btnLogin.classList.remove('active');

    deleteCheck.classList.add('hidden');
    deleteCheckComp.classList.add('hidden');
    deleteCheckUser.classList.add('hidden');

    totalCheckContacts.innerText = "";
    textCheck.innerText = "";
    totalCheckUsers.innerText = "";
}

/* CUANDO LA PAGINA CARGUE */
window.onload = function() {
    /* btnGetContacts(); */
    btnLoginChange();
    localStorage.clear();
};

/* SELECT ALL CHECKBOX */
let textCheck = document.getElementById('totalCheck');
let totalCheckContacts = document.getElementById('totalCheckContacts');
let totalCheckUsers = document.getElementById('totalCheckUsers');
let deleteCheck = document.getElementById('deleteCheck');
let deleteCheckComp = document.getElementById('deleteCheckComp');
let deleteCheckUser = document.getElementById('deleteCheckUser');
/* 
let listSelect = [];
 */

function countCheck(ckbox) {
    let elements = document.getElementsByName(`${ckbox.name}`);
    var cont = 0;
    for (x = 0; x < elements.length; x++) {
        if (elements[x].type == "checkbox" && elements[x].checked) {
            cont += 1;
        }
    }
    if (ckbox.name == "checkContacts") { //Contacts
        totalCheckContacts.innerText = `Se seleccionó: ${cont} filas`;
        deleteCheck.classList.remove('hidden');
    } else if (ckbox.name == "check") { //Company
        textCheck.innerText = `Se seleccionó: ${cont} filas`;
        deleteCheckComp.classList.remove('hidden');
    } else if (ckbox.name == "checkUsers") { //User
        totalCheckUsers.innerText = `Se seleccionó: ${cont} filas`;
        deleteCheckUser.classList.remove('hidden');
    }
}

function selectAll(ckbox) {
    textCheck.innerText = "";
    totalCheckContacts.innerText = "";
    totalCheckUsers.innerText = "";
    let elements = document.getElementsByName(`${ckbox.name}`);
    if (ckbox.checked) {
        for (i = 0; i < elements.length; i++) {
            elements[i].checked = true;
            if (ckbox.name == "checkContacts") { //Contacts
                deleteCheck.classList.remove('hidden');
                totalCheckContacts.innerText = `${elements.length-1} seleccionados`;
            } else if (ckbox.name == "check") { //Company
                deleteCheckComp.classList.remove('hidden');
                textCheck.innerText = `${elements.length-1} seleccionados`;
            } else if (ckbox.name == "checkUsers") { //User
                deleteCheckUser.classList.remove('hidden');
                totalCheckUsers.innerText = `${elements.length-1} seleccionados`;
            }
        }
    } else {
        for (i = 0; i < elements.length; i++) {
            elements[i].checked = false;
            deleteCheck.classList.add('hidden');
            deleteCheckComp.classList.add('hidden');
            deleteCheckUser.classList.add('hidden');
        }
    }
}

let divOptionsCompany = document.getElementById('dpdOptionsCompany');
let firtsOptions = 0;

function createOptionsDropdown(arr) {

    if (firtsOptions == 0) {
        arr.forEach(element => {
            let name = element.name;
            name = name.slice(0, 3);
            let createTagA = document.createElement('a');
            createTagA.classList.add('dropdown-item');
            createTagA.classList.add('pointer');
            createTagA.setAttribute('id', `btn${name}${element.id}`);
            createTagA.setAttribute('name', `dpdOptions`);
            createTagA.innerText = element.name;
            createTagA.setAttribute('onclick', 'optClick(this)');
            divOptionsCompany.appendChild(createTagA);
        });
        firtsOptions = 1;
    }

}
let dpdId;

function optClick(clicked) {

    let btnClicked = clicked.id;
    dpdId = btnClicked.slice(6, btnClicked.length);
    btnDropdownCompany.innerText = clicked.innerText;
}