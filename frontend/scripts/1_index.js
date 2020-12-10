/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
const secContacts = document.getElementById('contacts');
const secCompanies = document.getElementById('companies');
const secUsers = document.getElementById('users');
const secRegion = document.getElementById('regionCity');

const btnContacts = document.getElementById('btnContacts');
const btnCompanies = document.getElementById('btnCompanies');
const btnUsers = document.getElementById('btnUsers');
const btnRegion = document.getElementById('btnRegion');

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

btnContacts.addEventListener('click', btnContactsChange);
btnCompanies.addEventListener('click', btnCompaniesChange);
btnUsers.addEventListener('click', btnUsersChange);
btnRegion.addEventListener('click', btnRegionChange);

/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

function btnContactsChange() {
    resetActive()
    btnContacts.classList.add('active');

    secContacts.classList.add('secContacts');
    secContacts.classList.remove('hidden');
    secCompanies.classList.add('hidden');
    secCompanies.classList.remove('secCompanies');
    secUsers.classList.add('hidden');
    secUsers.classList.remove('secUsers');
    secRegion.classList.add('hidden');
    secRegion.classList.remove('secRegion');
}

function btnCompaniesChange() {
    resetActive()
    btnCompanies.classList.add('active');

    secContacts.classList.add('hidden');
    secContacts.classList.remove('secContacts');
    secCompanies.classList.add('secCompanies');
    secCompanies.classList.remove('hidden');
    secUsers.classList.add('hidden');
    secUsers.classList.remove('secUsers');
    secRegion.classList.add('hidden');
    secRegion.classList.remove('secRegion');
}

function btnUsersChange() {
    resetActive()
    btnUsers.classList.add('active');

    secContacts.classList.add('hidden');
    secContacts.classList.remove('secContacts');
    secCompanies.classList.add('hidden');
    secCompanies.classList.remove('secCompanies');
    secUsers.classList.add('secUsers');
    secUsers.classList.remove('hidden');
    secRegion.classList.add('hidden');
    secRegion.classList.remove('secRegion');
}

function btnRegionChange() {
    resetActive()
    btnRegion.classList.add('active');

    secContacts.classList.add('hidden');
    secContacts.classList.remove('secContacts');
    secCompanies.classList.add('hidden');
    secCompanies.classList.remove('secCompanies');
    secUsers.classList.add('hidden');
    secUsers.classList.remove('secUsers');
    secRegion.classList.add('secRegion');
    secRegion.classList.remove('hidden');
}

/* RESET MENU ACTIVE */
function resetActive() {
    btnContacts.classList.remove('active');
    btnCompanies.classList.remove('active');
    btnUsers.classList.remove('active');
    btnRegion.classList.remove('active');
}

/* CUANDO LA PAGINA CARGUE */
window.onload = function() {
    btnGetContacts();
};