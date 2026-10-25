
console.log("Night City cargada");

// Buscamos a David en el HTML
const david = document.getElementById("david");

// Posición inicial de David
let posicionDavid = 30;

// Velocidad de movimiento
const velocidadDavid = 5;

// Función para mover a David

function moverDavid(direccion) {
    const escenario = document.getElementById("game");
    const anchoDavid = david.offsetWidth;
    const limiteDerecho = escenario.clientWidth - anchoDavid;

    posicionDavid += velocidadDavid * direccion;

    if (posicionDavid < 0) {
        posicionDavid = 0;
    }

    if (posicionDavid > limiteDerecho) {
        posicionDavid = limiteDerecho;
    }

    david.style.left = posicionDavid + "px";
}


document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        moverDavid(1);
    }

    if (event.key === "ArrowLeft") {
        moverDavid(-1);
    }
});

const botonIzquierda = document.getElementById("left-button");
const botonDerecha = document.getElementById("right-button");

botonIzquierda.addEventListener("click", function() {
    moverDavid(-1);
});

botonDerecha.addEventListener("click", function() {
    moverDavid(1);
});
