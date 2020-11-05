//EVENTO PARA QUE SE MANTENGAN LOS DATOS DEL DOM EN PANTALLA
document.addEventListener('DOMContentLoaded', pintarDatos);

//CONTENEDOR DE LOS CARDS
const cardsContainer = document.getElementById('cardsContainer');

//MODAL AGREGAR
const modalADD = document.getElementById('modalAdd');

//MODAL EDIT
const modalEdit = document.getElementById('modalEdit');

//ABRIR MODAL AGREGAR
const botonAgregar = document.getElementById('addCrud');

botonAgregar.addEventListener('click', (e)=>{
    e.preventDefault();
    modalADD.style.display = 'block';
    modalEdit.style.display = 'none';
});

//CERRAR MODAL AGREGAR
const botonCerrarModalAdd = document.getElementById('btnCerrar');

botonCerrarModalAdd.addEventListener('click', (e) =>{
    e.preventDefault();
    modalADD.style.display = 'none';
});

//AGREGAR CARDS
const formAdd = document.getElementById('formAdd');

let arrayDatos = [];

formAdd.addEventListener('submit', (e) =>{
    e.preventDefault();
    let pais = document.getElementById('inputPais').value;
    let capital = document.getElementById('inputCapital').value;
    
    if(pais == '' || capital == ''){
        alert ('Llenar todos los campos vacíos');
    }
    else {
        obtenerDatos(pais,capital);
        guardarDatosLocalStorage()
        pintarDatos()
        formAdd.reset();
        modalADD.style.display = 'none';
    }
});

function obtenerDatos(pais,capital){
    let Datos = {
        pais: pais,
        capital: capital
    }

    arrayDatos.push(Datos);
}

function guardarDatosLocalStorage(){
    localStorage.setItem('Datos',JSON.stringify(arrayDatos))
}

function pintarDatos(){
    cardsContainer.innerHTML = '';
    arrayDatos = JSON.parse(localStorage.getItem('Datos'));
 
    if(arrayDatos == null){
        arrayDatos = [];
    }
    else {
        arrayDatos.forEach(Dato =>{
            cardsContainer.innerHTML += `
                <div class="card">
                    <h2 class="uppercase">${Dato.pais}</h2>
                    <h3 class="uppercase">${Dato.capital}</h3>
                <div id="btn-container" class="btn-container">
                    <button id="btnEdit" class="btn edit">Editar</button>
                    <button id="btnDelete" class="btn delete">Eliminar</button>
                </div>
                </div>
            `
        })
    }
}

//CERRAR MODAL EDIT
const btnClose = document.getElementById('btnClose');

btnClose.addEventListener('click',cerrarModalEdit);

function cerrarModalEdit(e){
    e.preventDefault();
    modalEdit.style.display = 'none';
}

//EDITAR Y ELIMINAR CARDS
const formEdit = document.getElementById('formEdit');
const dataPais = document.getElementById('datapais');
const dataCapital = document.getElementById('datacapital');

let selectedIndex = -1;
cardsContainer.addEventListener('click', (e)=>{
    e.preventDefault();
    let textoPais = e.path[2].children[0].innerHTML; 
    let textoCapital = e.path[2].children[1].innerHTML;    
    //EDITAR 
    if(e.target.innerHTML === 'Editar'){
        modalEdit.style.display = 'block';
        modalADD.style.display = 'none';
        dataPais.value = textoPais;
        dataCapital.value = textoCapital;
        findIndex(textoPais);
    }
    //ELIMINAR
    if(e.target.innerHTML === 'Eliminar'){
        index = findIndex(textoPais);
        eliminarCard(index);  
    }
})

function findIndex(texto){
    let indexArray = arrayDatos.findIndex((datos)=>datos.pais == texto);
    selectedIndex = indexArray;
    return selectedIndex;
}


function eliminarCard(index){
    arrayDatos.splice(index,1);
    guardarDatosLocalStorage();
    pintarDatos();
}


formEdit.addEventListener('submit',(e)=>{
    e.preventDefault();
    const pais = dataPais.value;
    const capital = dataCapital.value;

    let dataUpdate = {pais: pais, capital: capital};
    console.log(selectedIndex);
    arrayDatos.splice(selectedIndex,1,dataUpdate);
    guardarDatosLocalStorage();
    pintarDatos();
    cerrarModalEdit(e)
})

