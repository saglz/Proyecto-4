/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
const usernameLogin = document.getElementById('usernameLogin');
const passwordLogin = document.getElementById('passwordLogin');

const btnLoginUsers = document.getElementById('btnLoginUsers');

const liUsersAdmin = document.getElementById('usersAdmin');

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

btnLoginUsers.addEventListener('click', validateLogin);

/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

async function validateLogin(event) {
    event.preventDefault();

    let url = `http://localhost:3000/v1/login`;
    await fetch(url, {
            method: 'POST',
            body: `{"username": "${usernameLogin.value}","password": "${passwordLogin.value}"}`,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            res.json().then((data) => {
                if (res.status == 200) {
                    localStorage.setItem("token", data.body.token);
                    localStorage.setItem("user", data.body.is_admin);

                    if (localStorage.user == 1) {
                        liUsersAdmin.classList.remove('hidden');
                    } else {
                        liUsersAdmin.classList.add('hidden');
                    }
                    clearFormLogin();
                    btnContactsChange();
                    btnGetContacts();
                } else {
                    alert(data.error);
                }
            });
        })
        .catch(err => console.log(err));
}

function clearFormLogin() {
    usernameLogin.value = "";
    passwordLogin.value = "";
}