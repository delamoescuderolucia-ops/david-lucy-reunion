
console.log("Night City cargada");

// Buscamos a David en el HTML
const david = document.getElementById("david");

// Posición inicial de David
let posicionDavid = 30;

// Velocidad de movimiento
const velocidadDavid = 5;

// ===== SISTEMA DE SALTO =====
let velocidadVertical = 0;
let estaEnElSuelo = true;

const fuerzaSalto = 12;
const gravedad = 0.6;

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


let direccionDavid = 0;

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        direccionDavid = 1;
    }

    if (event.key === "ArrowLeft") {
        direccionDavid = -1;
    }
});

document.addEventListener("keyup", function(event) {
    if (
        event.key === "ArrowRight" ||
        event.key === "ArrowLeft"
    ) {
        direccionDavid = 0;
    }
});

function actualizarJuego() {
    // Movimiento horizontal
    if (direccionDavid !== 0) {
        moverDavid(direccionDavid);
    }

// ===== MOVIMIENTO VERTICAL =====
if (!estaEnElSuelo) {
    velocidadVertical += gravedad;

    const escenario = document.getElementById("game");
    const alturaSuelo =
        escenario.clientHeight - david.offsetHeight - 20;

    const posicionActual = david.offsetTop;
    const nuevaPosicion = posicionActual + velocidadVertical;

    if (nuevaPosicion >= alturaSuelo) {
        david.style.top = alturaSuelo + "px";
        velocidadVertical = 0;
        estaEnElSuelo = true;
    } else {
        david.style.top = nuevaPosicion + "px";
    }
}

    requestAnimationFrame(actualizarJuego);
}

// ===== HACER SALTAR A DAVID =====
function saltar() {
    if (estaEnElSuelo) {
        velocidadVertical = -fuerzaSalto;
        estaEnElSuelo = false;
    }
}

actualizarJuego();

const botonIzquierda = document.getElementById("left-button");
const botonDerecha = document.getElementById("right-button");

function iniciarMovimiento(direccion) {
    direccionDavid = direccion;
}

function detenerMovimiento() {
    direccionDavid = 0;
}

botonIzquierda.addEventListener("pointerdown", function(event) {
    event.preventDefault();
    iniciarMovimiento(-1);
});

botonDerecha.addEventListener("pointerdown", function(event) {
    event.preventDefault();
    iniciarMovimiento(1);
});

botonIzquierda.addEventListener("pointerup", detenerMovimiento);
botonDerecha.addEventListener("pointerup", detenerMovimiento);

botonIzquierda.addEventListener("pointerleave", detenerMovimiento);
botonDerecha.addEventListener("pointerleave", detenerMovimiento);

botonIzquierda.addEventListener("pointercancel", detenerMovimiento);
botonDerecha.addEventListener("pointercancel", detenerMovimiento);
// ===== BOTÓN DE SALTO =====
const botonSaltar = document.getElementById("jump-button");

botonSaltar.addEventListener("pointerdown", function(event) {
    event.preventDefault();
    saltar();
});