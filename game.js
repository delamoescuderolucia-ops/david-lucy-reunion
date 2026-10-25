
console.log("Night City cargada");

// ===== ELEMENTOS DEL JUEGO =====
const david = document.getElementById("david");
const escenario = document.getElementById("game");

const botonIzquierda = document.getElementById("left-button");
const botonDerecha = document.getElementById("right-button");
const botonSaltar = document.getElementById("jump-button");

// ===== MOVIMIENTO HORIZONTAL =====
let posicionDavid = 30;
let direccionDavid = 0;

const velocidadDavid = 5;

// ===== SISTEMA DE SALTO =====
let posicionVertical = 0;
let velocidadVertical = 0;
let estaEnElSuelo = true;

const fuerzaSalto = 12;
const gravedad = 0.6;

// Distancia entre el borde inferior de David
// y el borde inferior del escenario.
const margenSuelo = 15;

// ===== COLOCAR A DAVID =====
function colocarDavid() {
    const alturaSuelo =
        escenario.clientHeight - david.offsetHeight - margenSuelo;

    posicionVertical = alturaSuelo;

    david.style.left = posicionDavid + "px";
    david.style.top = posicionVertical + "px";
    david.style.bottom = "auto";
}

// ===== MOVER A DAVID =====
function moverDavid(direccion) {
    const limiteDerecho =
        escenario.clientWidth - david.offsetWidth;

    posicionDavid += velocidadDavid * direccion;

    if (posicionDavid < 0) {
        posicionDavid = 0;
    }

    if (posicionDavid > limiteDerecho) {
        posicionDavid = limiteDerecho;
    }

    david.style.left = posicionDavid + "px";
}

// ===== SALTO =====
function saltar() {
    if (estaEnElSuelo) {
        velocidadVertical = -fuerzaSalto;
        estaEnElSuelo = false;
    }
}

// ===== BUCLE PRINCIPAL =====
function actualizarJuego() {
    // Movimiento horizontal
    if (direccionDavid !== 0) {
        moverDavid(direccionDavid);
    }

    // Movimiento vertical y gravedad
    if (!estaEnElSuelo) {
        velocidadVertical += gravedad;
        posicionVertical += velocidadVertical;

        const alturaSuelo =
            escenario.clientHeight - david.offsetHeight - margenSuelo;

      
        // Comprobar aterrizaje en el suelo
        const alturaSuelo =
            escenario.clientHeight - david.offsetHeight - margenSuelo;

        if (posicionVertical >= alturaSuelo) {
            posicionVertical = alturaSuelo;
            velocidadVertical = 0;
            estaEnElSuelo = true;
        } else {
            // Comprobar aterrizaje sobre las plataformas
            const plataformas = document.querySelectorAll(".platform");

            for (const plataforma of plataformas) {
                const davidIzquierda = posicionDavid;
                const davidDerecha = posicionDavid + david.offsetWidth;

                const plataformaIzquierda = plataforma.offsetLeft;
                const plataformaDerecha =
                    plataforma.offsetLeft + plataforma.offsetWidth;

                const davidAntesDeCaer =
                    posicionVertical - velocidadVertical;

                const davidAbajoAntes =
                    davidAntesDeCaer + david.offsetHeight;

                const davidAbajoAhora =
                    posicionVertical + david.offsetHeight;

                const plataformaArriba = plataforma.offsetTop;

                if (
                    velocidadVertical > 0 &&
                    davidAbajoAntes <= plataformaArriba &&
                    davidAbajoAhora >= plataformaArriba &&
                    davidDerecha > plataformaIzquierda &&
                    davidIzquierda < plataformaDerecha
                ) {
                    posicionVertical =
                        plataformaArriba - david.offsetHeight;

                    velocidadVertical = 0;
                    estaEnElSuelo = true;
                    break;
                }
            }
        }

        david.style.top = posicionVertical + "px";


        david.style.top = posicionVertical + "px";
    }

    requestAnimationFrame(actualizarJuego);
}

// ===== CONTROLES DEL TECLADO =====
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
    }

    if (event.key === "ArrowRight") {
        direccionDavid = 1;
    }

    if (event.key === "ArrowLeft") {
        direccionDavid = -1;
    }

    if (event.code === "Space" || event.key === "ArrowUp") {
        event.preventDefault();
        saltar();
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

// Evita que David siga moviéndose si se pierde el foco
// de la página mientras se pulsa una tecla.
window.addEventListener("blur", function() {
    direccionDavid = 0;
});

// ===== CONTROLES TÁCTILES =====
function configurarMovimiento(boton, direccion) {
    if (!boton) return;

    boton.addEventListener("pointerdown", function(event) {
        event.preventDefault();
        direccionDavid = direccion;

        if (boton.setPointerCapture) {
            boton.setPointerCapture(event.pointerId);
        }
    });

    boton.addEventListener("pointerup", function(event) {
        event.preventDefault();
        direccionDavid = 0;
    });

    boton.addEventListener("pointercancel", function() {
        direccionDavid = 0;
    });

    boton.addEventListener("lostpointercapture", function() {
        direccionDavid = 0;
    });
}

configurarMovimiento(botonIzquierda, -1);
configurarMovimiento(botonDerecha, 1);

if (botonSaltar) {
    botonSaltar.addEventListener("pointerdown", function(event) {
        event.preventDefault();
        saltar();
    });
}

// ===== INICIAR JUEGO =====
colocarDavid();
actualizarJuego();
