console.log("Night City cargada");

const david = document.getElementById("david");

let posicionDavid = 30;

console.log("David está preparado para la misión");

const velocidadDavid = 5;

function moverDavid(direccion) {
    posicionDavid += velocidadDavid * direccion;

    david.style.left = posicionDavid + "px";
}
