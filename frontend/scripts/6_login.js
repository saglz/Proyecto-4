/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
const usernameLogin = document.getElementById('usernameLogin');
const passwordLogin = document.getElementById('passwordLogin');

const btnLoginUsers = document.getElementById('btnLoginUsers');

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

btnLoginUsers.addEventListener('click', btnLoginUsers);

/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

function btnLoginUsers(event) {
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
                if (res.status == 201) {
                    alert(data.body);
                } else {
                    alert(data.error);
                }
            });
        })
        .catch(err => console.log(err));
}