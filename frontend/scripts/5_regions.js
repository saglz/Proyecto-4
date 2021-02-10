/* ------------------------------------VARIABLES GLOBALES---------------------------------- */

let idUpdateRegion;

let addButtonRegion = document.getElementById("addButtonRegion");
let inputUpdateRegions = document.getElementById("inputUpdateRegions");
let btnSaveChanges = document.getElementById("btnSaveChanges");
let staticBackdropLabel = document.getElementById("staticBackdropLabel");

//Table
let table = document.querySelector('#regionsTable tbody');
let regionsSection = document.getElementById('citySection');
let sectionCountries = document.getElementById('countries');
let sectionCities = document.getElementById('cities');
/* let tableContacts = document.getElementById('tableContacts'); */
/* let bodyTableContacts = document.getElementById('bodyTableContacts'); */

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

btnRegion.addEventListener('click', btnGetRegion);

btnSaveChanges.addEventListener('click', identifyDateToUpdate);

/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

async function btnAddRegion() {

    let tok = localStorage.getItem("token");
    let url = `http://localhost:3000/v1/createRegion`;
    await fetch(url, {
            method: 'POST',
            body: `{"name": "${inputUpdateRegions.value}"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
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
    btnGetRegion();

}

function btnGetRegion() {
    table.innerHTML = "";
    let tok = localStorage.getItem("token");
    let url = `http://localhost:3000/v1/readRegion`;
    fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
            }
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then(async function(data) {
            let arrData = data.body.readRegionQuery;
            for (let i = 0; i < arrData.length; i++) {
                const row = document.createElement('li');
                row.setAttribute('id', `rowRegion${arrData[i].region_id}`)
                row.innerHTML += `
                <div class="row m-3">
                <div class="col"><h2> <span class="pointer" onclick="getCountries(this)" id ="${arrData[i].region_id}"><i class="fas fa-arrow-right"></i> ${arrData[i].name} </span>
                <i class="fas fa-trash pointer" id= "${arrData[i].region_id}" onclick="deleteRegion(this)"></i>
                <i class="fas fa-pencil-alt pointer" id="reg${arrData[i].region_id}" onclick = "updateId(this)" data-toggle="modal" data-target="#staticBackdrop"></i></div>
                <div class="col"><button class="btn btn-secondary" id="adp${arrData[i].region_id}" onclick="updateId(this)" data-toggle="modal" data-target="#staticBackdrop">Agregar País</button> <h2></div>
                </div>
      `;
                table.appendChild(row);
            }
        })
        .catch(err => console.log(err));
}

async function btnUpdateRegion() {
    let idRegion = idUpdateRegion.slice(3, idUpdateRegion.length);
    let tok = localStorage.getItem("token");
    let url = `http://localhost:3000/v1/updateRegion`;
    await fetch(url, {
            method: 'PUT',
            body: `{"region_id":${idRegion},"name": "${inputUpdateRegions.value}"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
            }
        })
        .then((resp) => resp.json())
        .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
        .catch(err => console.log(err));
    btnGetRegion();

}

async function deleteRegion(element) {
    let tokenReg = localStorage.getItem("token");
    let region_id = element.id;
    console.log(region_id);
    await fetch(`http://localhost:3000/v1/deleteRegion`, {
            method: 'DELETE',
            body: `{"region_id":${region_id}}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tokenReg}`
            }
        })
        .then((resp) => resp.json())
        .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
        .catch(err => console.log(err));
    btnGetRegion();
}
/* ------------------------------------ COUNTRIES------------------------- */

async function btnAddCountries(region_id) {

    let tok = localStorage.getItem("token");
    let url = `http://localhost:3000/v1/createCountries`;
    await fetch(url, {
            method: 'POST',
            body: `{"name": "${inputUpdateRegions.value}","region_id": ${region_id}}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
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
    btnGetRegion();

}

function getCountries(i) {
    let idCountry
    if (idUpdateRegion) {
        idCountry = idUpdateRegion.slice(3, idUpdateRegion.length);
    }
    let tok = localStorage.getItem("token");
    region_id = i.id ? i.id : idCountry;
    let url = `http://localhost:3000/v1/readCountries/${region_id}`;
    fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
            }
        })
        .then((resp) => resp.json())
        .then(data => {
            let arrData = data.body.readCountriesQuery;
            let validateSearchCountry = document.getElementById(`liCountry${arrData[0].countries_id}`);
            if (arrData && validateSearchCountry == null) {
                const ul = document.createElement('ul');
                ul.setAttribute('id', `sectionCountries${region_id}`)
                sectionCountries.appendChild(ul)
                for (let i = 0; i < arrData.length; i++) {
                    const liCountry = document.createElement('li');
                    liCountry.setAttribute('id', `liCountry${arrData[i].countries_id}`)
                    liCountry.innerHTML += `
                    <div class="row m-3  pl-2 pr-2">
                    <div class="col"><h3> <span class="pointer bg-color-h3" onclick = "getCities(this)" id ="${arrData[i].countries_id}"><i class="fas fa-arrow-right"></i> ${arrData[i].name}  </span> 
                     <i class="fas fa-trash pointer" id= "${arrData[i].countries_id}" onclick="deleteCountry(this)"></i>
                     <i class="fas fa-pencil-alt pointer" id="cou${arrData[i].countries_id}" onclick="updateId(this)" data-toggle="modal" data-target="#staticBackdrop"></i></div>
                     <div class="col"><button class="btn btn-outline-secondary" id="adc${arrData[i].countries_id}" onclick="updateId(this)" data-toggle="modal" data-target="#staticBackdrop">Agregar Ciudad</button><h3></div>
                     </div>
            `;
                    document.getElementById(`rowRegion${region_id}`).appendChild(liCountry);
                }
            } else {
                for (let i = 0; i < arrData.length; i++) {
                    rowDelete = document.getElementById(`liCountry${arrData[i].countries_id}`)
                    rowDelete.classList.toggle('hidden')
                }
            }
        })
}

async function btnUpdateCountry() {

    let idCountry = idUpdateRegion.slice(3, idUpdateRegion.length);
    let tok = localStorage.getItem("token");
    let url = `http://localhost:3000/v1/updateCountries`;
    await fetch(url, {
            method: 'PUT',
            body: `{"countries_id":${idCountry},"name": "${inputUpdateRegions.value}"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
            }
        })
        .then((resp) => resp.json())
        .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
        .catch(err => console.log(err));
    btnGetRegion();

}

async function deleteCountry(element) {
    let tokenReg = localStorage.getItem("token");
    let region_id = element.id;
    console.log(region_id);
    await fetch(`http://localhost:3000/v1/deleteCountries`, {
            method: 'DELETE',
            body: `{"countries_id":${region_id}}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tokenReg}`
            }
        })
        .then((resp) => resp.json())
        .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
        .catch(err => console.log(err));
    btnGetRegion();
}

/* ----------------------------CITIES--------------------------------- */

async function btnAddCities(countries_id) {

    let tok = localStorage.getItem("token");
    let url = `http://localhost:3000/v1/createCities`;
    await fetch(url, {
            method: 'POST',
            body: `{"name": "${inputUpdateRegions.value}","countries_id": ${countries_id}}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
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
    btnGetRegion();

}

function getCities(i) {
    let tok = localStorage.getItem("token");
    country_id = i.id;
    let url = `http://localhost:3000/v1/readCities/${country_id}`;
    fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
            }
        })
        .then((resp) => resp.json())
        .then(data => {
            let arrData = data.body.readCont;
            let validateSearchCity = document.getElementById(`liCity${arrData[0].cities_id}`);
            if (arrData && validateSearchCity == null) {
                const ulCity = document.createElement('ul');
                ulCity.setAttribute('id', `sectionCities${country_id}`)
                ulCity.setAttribute('class', '')
                sectionCities.appendChild(ulCity)
                for (let i = 0; i < arrData.length; i++) {
                    const liCity = document.createElement('li');
                    liCity.setAttribute('id', `liCity${arrData[i].cities_id}`)
                    liCity.innerHTML += `
                    <div class="row m-3 pl-5 pr-5">
                    <h4><span class="bg-color-h4"><i class="fas fa-arrow-down"></i> ${arrData[i].name} </span>
                    <i class="fas fa-trash pointer" id= "${arrData[i].cities_id}" onclick="deleteCity(this)"> </i>
                    <i class="fas fa-pencil-alt pointer" id="cit${arrData[i].cities_id}" onclick="updateId(this)" data-toggle="modal" data-target="#staticBackdrop"></i><h4>
                    </div>`;
                    document.getElementById(`liCountry${country_id}`).appendChild(liCity);
                }
            } else {
                for (let i = 0; i < arrData.length; i++) {
                    rowDelete = document.getElementById(`liCity${arrData[i].cities_id}`);
                    rowDelete.classList.toggle('hidden');
                }
            }
        })
}

async function btnUpdateCity() {

    let idCity = idUpdateRegion.slice(3, idUpdateRegion.length);
    let tok = localStorage.getItem("token");
    let url = `http://localhost:3000/v1/updateCities`;
    await fetch(url, {
            method: 'PUT',
            body: `{"cities_id":${idCity},"name": "${inputUpdateRegions.value}"}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tok}`
            }
        })
        .then((resp) => resp.json())
        .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
        .catch(err => console.log(err));
    btnGetRegion();

}

async function deleteCity(element) {
    let tokenReg = localStorage.getItem("token");
    let region_id = element.id;
    console.log(region_id);
    await fetch(`http://localhost:3000/v1/deleteCities`, {
            method: 'DELETE',
            body: `{"cities_id":${region_id}}`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${tokenReg}`
            }
        })
        .then((resp) => resp.json())
        .then(res => res.body !== "" ? alert(res.body) : alert(res.error))
        .catch(err => console.log(err));
    btnGetRegion();
}


/* ------------------------------------EVENTOS LISTENER----------------------------------- */

function updateId(element) {
    inputUpdateRegions.value = "";

    idUpdateRegion = "";
    idUpdateRegion = element.id;

    let name = idUpdateRegion;
    name = name.slice(0, 3);
    let idUpdate = idUpdateRegion;
    idUpdate = idUpdate.slice(3, idUpdateRegion.length)

    if (idUpdateRegion == "addButtonRegion") {
        staticBackdropLabel.innerHTML = "Agregar nueva región";
    } else if (name == "reg") {
        staticBackdropLabel.innerHTML = "Actualizar nombre de la Región";
    } else if (name == "cou") {
        staticBackdropLabel.innerHTML = "Actualizar nombre de la Pais";
    } else if (name == "cit") {
        staticBackdropLabel.innerHTML = "Actualizar nombre de la Ciudad";
    } else if (name == "adp") {
        staticBackdropLabel.innerHTML = "Agregar Pais";
    } else if (name == "adc") {
        staticBackdropLabel.innerHTML = "Agregar Ciudad";
    }
}

function identifyDateToUpdate() {
    let name = idUpdateRegion;
    name = name.slice(0, 3);
    let idUpdate = idUpdateRegion;
    idUpdate = idUpdate.slice(3, idUpdateRegion.length)

    if (idUpdateRegion == "addButtonRegion") {
        btnAddRegion();
    } else if (name == "reg") {
        btnUpdateRegion();
    } else if (name == "cou") {
        btnUpdateCountry();
    } else if (name == "cit") {
        btnUpdateCity();
    } else if (name == "adp") {
        btnAddCountries(idUpdate);
    } else if (name == "adc") {
        btnAddCities(idUpdate);
    }
}