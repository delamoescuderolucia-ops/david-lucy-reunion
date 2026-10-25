
console.log("Night City cargada");

// Buscamos a David en el HTML
const david = document.getElementById("david");

// Posición inicial de David
let posicionDavid = 30;

// Velocidad de movimiento
const velocidadDavid = 5;

// Función para mover a David
function moverDavid(direccion) {
    posicionDavid += velocidadDavid * direccion;

    david.style.left = posicionDavid + "px";
}
