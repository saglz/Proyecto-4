/* ------------------------------------VARIABLES GLOBALES---------------------------------- */
let firts = 0,
    firtsCountry = 0,
    firtsCity = 0;
let extractLastDigit;
let containerRegion = document.getElementById('containerRegion');
let divDropdownRegion = document.getElementById('listOptionsRegion');
let divAddCountry = document.getElementById('divAddCountry');

/* ------------------------------------EVENTOS LISTENER----------------------------------- */

document.getElementById('btnAddRegion').addEventListener('click', btnAddRegion);
document.getElementById('btnAddCountry').addEventListener('click', btnAddCountry);

/* ------------------------------------FUNCIONES DE NORMALIZACIÓN------------------------- */

function createOptions(arr, nameRegCouCit) {

    arr.forEach(element => {
        let createTagA = document.createElement('a');
        createTagA.classList.add('dropdown-item');
        createTagA.setAttribute('id', `btn${nameRegCouCit}${element.region_id}`);
        createTagA.innerText = element.name;
        createTagA.setAttribute('onclick', 'identifyClick(this)');
        if (nameRegCouCit == 'Reg') {
            divDropdownRegion.appendChild(createTagA);
        } else if (nameRegCouCit == 'Cou') {
            divAddCountry.appendChild(createTagA);
        } else if (nameRegCouCit == 'Cit') {
            divDropdownRegion.appendChild(createTagA);
        }
    });
}

function identifyClick(clicked) {

    let btnClicked = clicked.id;
    extractLastDigit = btnClicked.slice(6, btnClicked.length);
    /* return extractLastDigit; */
}

function btnAddRegion() {

    let url = `http://localhost:3000/v1/readRegion`;
    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(async function(data) {
            let arrData = data.body.readCont;
            if (firts == 0) {
                createOptions(arrData, 'Reg');
                firts = 1;
            }
        })
        .catch(err => console.log(err));
}

function btnAddCountry() {
    console.log(extractLastDigit);
    /* let region_id = identifyClick(); */
    let url = `http://localhost:3000/v1/readCountries/${extractLastDigit}`;
    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(async function(data) {
            let arrData = data.body.readCont;
            /* if (firtsCountry == 0) { */
            /* createRegion(arrData); */
            divAddCountry.innerHTML = "";
            createOptions(arrData, 'Cou');
            firtsCountry = 1;
            /* } */
        })
        .catch(err => console.log(err));
}

function btnAddCity() {

    let url = `http://localhost:3000/v1/readCities/${country_id}`;
    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(async function(data) {
            let arrData = data.body.readCont;
            if (firtsCity == 0) {
                createOptions(arrData, 'Cit');
                firtsCity = 1;
            }
        })
        .catch(err => console.log(err));
}
/* <div class="col" style="border-top: 1px solid #000000;">
                        <div class="row">

                            <div class="col">
                                <h2>Suramerica</h2>
                            </div>

                            <div class="col">
                                <div class="btn-group dropleft">
                                    <button type="button" class="btn btn-secondary dropdown-toggle mt-1" 
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        REGION
                                    </button>
                                    <div class="dropdown-menu">
                                        <!-- Dropdown menu links -->
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Separated link</a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- pais -->
                        <div class="col" style="border-top: 1px solid #000000;">
                        </div>
                    </div> */

function createRegion(arr) {
    /* col1 */
    let divRegion = document.createElement('div');
    divRegion.classList.add('col');
    divRegion.setAttribute('id', arr.region_id);
    let h2Region = document.createElement('h2');
    h2Region.innerText = arr.name;

    divRegion.appendChild(h2Region);

    /* col2 */
    let divButton = document.createElement('div');
    divButton.classList.add('col');
    let divButtonInterno = document.createElement('div');
    divButtonInterno.classList.add('btn-group dropleft');
    let btnDropdown = document.createElement('button');
    btnDropdown.classList.add('btn btn-secondary dropdown-toggle mt-1');
    btnDropdown.setAttribute('type', 'button');
    let divOptions = document.createElement('div');
    divOptions.classList.add('dropdown-menu');

    createOptions(arr, 'Cou');

    divButton.appendChild(btnDropdown);
    divButton.appendChild(divOptions);


    let divRowRegion = document.createElement('div');
    divRowRegion.classList.add('row');

    divRowRegion.appendChild(divRegion);
    divRowRegion.appendChild(divButton);

    containerRegion.appendChild(divRowRegion);
}