document.addEventListener('DOMContentLoaded', function () {
    var addButton = document.querySelector('.inputs-container button');
    var numeroContainer = document.querySelector('.container-numero');
    var detallesBody = document.getElementById('detalles-body');
    var deleteButtonContainer = document.getElementById('delete-button-container');



    var numeros = JSON.parse(localStorage.getItem('numeros')) || [];

    renderizarNumeros();

    addButton.addEventListener('click', function () {
        var nombre = document.getElementById('name').value;
        var instagram = document.getElementById('insta').value;
        var numero = document.getElementById('num').value;

        if (nombre && instagram && numero) {
            numeros.push({
                nombre: nombre,
                instagram: instagram,
                numero: numero
            });

            localStorage.setItem('numeros', JSON.stringify(numeros));
            console.log(JSON.stringify(numeros));
            renderizarNumeros();

            document.getElementById('name').value = '';
            document.getElementById('insta').value = '';
            document.getElementById('num').value = '';
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

 

    function renderizarNumeros() {
        numeroContainer.innerHTML = '';

        numeros.forEach(function (numero, index) {
            var div = document.createElement('div');
            div.classList.add('numero');
            div.textContent = numero.numero;
            div.setAttribute('data-index', index);

            div.addEventListener('click', function (e) {
                mostrarDetalle(e.target);
            });

            numeroContainer.appendChild(div);
            cerrarModal();

        });
    }

    if(numeros == ""){
        console.log("VACIO");
        var div = document.createElement('div');

        div.classList.add('vacio');
        div.textContent = "No hay numeros";
            numeroContainer.appendChild(div);

    }else{
        console.log("LLENO");
    };

    function mostrarDetalle(elemento) {
        var index = elemento.getAttribute('data-index');
        var numero = numeros[index];

        detallesBody.innerHTML = '';

        if (numero) {
         
            var fila = document.createElement('tr');
            var celdaNombre = document.createElement('td');
            var celdaInstagram = document.createElement('td');
            var celdaNumero = document.createElement('td');

            celdaNombre.textContent = numero.nombre;
            celdaInstagram.textContent = numero.instagram;
            celdaNumero.textContent = numero.numero;

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaInstagram);
            fila.appendChild(celdaNumero);

            detallesBody.appendChild(fila);

            // Mostrar el contenedor con el botón de eliminar
            deleteButtonContainer.style.display = 'block';

            // Configurar el botón de eliminar
            var deleteButton = document.getElementById('delete-button');
            deleteButton.onclick = function () {
                eliminarNumero(index);
            };
            mostrarDatos();
        }
    }

    function eliminarNumero(index) {
        numeros.splice(index, 1);
        localStorage.setItem('numeros', JSON.stringify(numeros));
        renderizarNumeros();
        ocultarDetalle();
        if(numeros == ""){
            console.log("VACIO");
            var div = document.createElement('div');
    
            div.classList.add('vacio');
            div.textContent = "No hay numeros";
                numeroContainer.appendChild(div);
    
        }else{
            console.log("LLENO");
        };
    }

    function ocultarDetalle() {
        detallesBody.innerHTML = '';
        deleteButtonContainer.style.display = 'none';
    }
});
var datos = document.getElementById('detalles-container');
var agregarNumeros = document.getElementById('agregar-numero');
var cuerpo = document.getElementById('cuerpo');

function mostrarDatos(){
    datos.classList.add('mostrar-modal');
}
function mostrarModal(){
    agregarNumeros.classList.add('mostrar-modal');
    cuerpo.classList.add('mostrar-modal-activo');
};
function cerrarModal(){
    agregarNumeros.classList.remove('mostrar-modal');

}