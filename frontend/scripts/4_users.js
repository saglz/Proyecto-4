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