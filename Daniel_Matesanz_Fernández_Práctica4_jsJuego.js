//variables que se van a usar globalmente
juegoTerminadoCont = document.getElementById("juegoTerminadoCont")
let posicionJugador = { x: 100, y: 100 };
juego = document.getElementById("juego")
puntuacion = document.getElementById("puntos")
contador = document.getElementById("contador")
puntos = 0;
puntosFinales = 0;

//función para crear elementos y darles movimiento
function crearElemento() {
    const elemento = document.createElement('div');
    elemento.classList.add('elemento');
    elemento.borrado = false;
    elemento.style.position = 'absolute';
    elemento.style.top = `${Math.random() * (juego.offsetHeight - 30)}px`;
    elemento.style.left = `${juego.offsetWidth - 30}px`;
    juego.appendChild(elemento);
    //se le da movimiento
    movimientoCuadrado = setInterval(() => {
        const left = parseFloat(elemento.style.left);
        if (elemento.offsetLeft == 0 && !elemento.borrado) {
            elemento.remove()
            puntos -= 1
            puntuacion.textContent = puntos
            elemento.borrado = true
        } else {
            elemento.style.left = `${left - 1}px`;
        }
    }, 1)
}


moviendoW = false
moviendoS = false
moviendoA = false
moviendoD = false

document.addEventListener('keydown', (evento) => {
    switch (evento.key) {
        case 'w':
            if (!moviendoW) {
                moviendoW = true
                intervaloW = setInterval(() => {
                    if (posicionJugador.y == 0) {
                        clearInterval(intervaloW)
                        moviendoW = false;
                        return
                    }
                    posicionJugador.y -= 1;
                }, 2);
            }
            break;
        case 's':
            if (!moviendoS) {
                moviendoS = true
                intervaloS = setInterval(() => {
                    if (posicionJugador.y == juego.offsetHeight - 14) {
                        clearInterval(intervaloS)
                        moviendoS = false;
                        return
                    }
                    posicionJugador.y += 1;
                }, 2);
            }
            break;
        case 'a':
            if (!moviendoA) {
                moviendoA = true
                intervaloA = setInterval(() => {
                    if (posicionJugador.x == 0) {
                        clearInterval(intervaloA)
                        moviendoA = false;
                        return
                    }
                    posicionJugador.x -= 1;
                }, 2);
            }
            break;
        case 'd':
            if (!moviendoD) {
                moviendoD = true
                intervaloD = setInterval(() => {
                    if (posicionJugador.x == juego.offsetWidth - 14) {
                        clearInterval(intervaloD)
                        moviendoD = false;
                        return
                    }
                    posicionJugador.x += 1;
                }, 2);
            }
            break;
    }
});

document.addEventListener('keyup', (evento) => {
    switch (evento.key) {
        case 'w':
            clearInterval(intervaloW);
            moviendoW = false
            break;
        case 's':
            clearInterval(intervaloS);
            moviendoS = false
            break;
        case 'a':
            clearInterval(intervaloA);
            moviendoA = false
            break;
        case 'd':
            clearInterval(intervaloD);
            moviendoD = false
            break;


    }
})

//funcion para darle los valores de posición al elemento html del jugador
function actualizarJugador() {
    const jugador = document.getElementById('jugador');
    jugador.style.left = `${posicionJugador.x}px`;
    jugador.style.top = `${posicionJugador.y}px`;
}

//función para que se vaya actulizando la posición del jugador y se trate cuando haya colisiones hasta que se cancele el animationFrame
function animar() {
    actualizarJugador();
    detectarColisiones().then(elemento => {
        puntos += 1
        puntuacion.textContent = puntos
        elemento.borrado = true
        elemento.remove();
    });
    animacion = requestAnimationFrame(animar);
}

//función que detecta las colisiones calculando tamaños y posición
function detectarColisiones() {
    return new Promise((resolve, reject) => {
        const jugador = document.getElementById('jugador');
        const radioJugador = jugador.offsetWidth / 2;
        const centroJugador = {
            x: posicionJugador.x + radioJugador,
            y: posicionJugador.y + radioJugador,
        };

        const elementos = document.querySelectorAll('.elemento');
        elementos.forEach((elemento) => {
            const radioElemento = elemento.offsetWidth / 2;
            const centroElemento = {
                x: elemento.offsetLeft + radioElemento,
                y: elemento.offsetTop + radioElemento,
            };

            const distancia = Math.sqrt(
                Math.pow(centroJugador.x - centroElemento.x, 2) +
                Math.pow(centroJugador.y - centroElemento.y, 2)
            );

            if (distancia < radioJugador + radioElemento) {
                resolve(elemento);
            }
        });
    })
}

//funcion para empezar el juego
function iniciar() {
    segundosInt = JSON.parse(localStorage.getItem("segundos"))
    contador.textContent = segundosInt
    puntuacion.textContent = 0
    posicionJugador = { x: 100, y: 100 }
    contadorFunc()
    animar()
    creandoElementos = setInterval(crearElemento, 1000)
}

//iniciamos el juego
iniciar()

//funcion para parar el juego
function parar() {
    puntosFinales = puntos
    clearInterval(creandoElementos)
    cancelAnimationFrame(animar)
    pantallaAcabado()
}

//funcion para controlar el contador
function contadorFunc() {
    contInt = setInterval(() => {
        tiempoRest = contador.textContent
        if (tiempoRest <= 0) {
            clearInterval(contInt)
            parar();
        } else
            contador.textContent = tiempoRest - 1
    }, 1000)
}

//funcion para ver las puntuaciones más altas
function puntuacionesAltas() {
    if(!localStorage.getItem("puntuaciones")){
        localStorage.setItem("puntuaciones", JSON.stringify([]))
    }        

    puntuaciones = JSON.parse(localStorage.getItem("puntuaciones"))
    puntuacionActual = { puntos: puntosFinales, tiempo: segundosInt }
    puntuaciones.push(puntuacionActual)
    puntuaciones.sort((a, b) => {
        return a.puntos / a.tiempo - b.puntos / b.tiempo;
    })
    if (puntuaciones.length > 5)
        puntuaciones.shift()
    localStorage.setItem("puntuaciones", JSON.stringify(puntuaciones))
    mejoresPunt = document.getElementById("mejoresPuntuaciones")
}

//boton para mostrar las puntuaciones
 ver = document.getElementById("verPuntuaciones")
 ver.addEventListener("click", event =>{
    mejoresPunt.innerHTML = ""
    puntuaciones.reverse().forEach(element => {
        let p = document.createElement("p")
        p.textContent = `${element.puntos} puntos en ${element.tiempo} segundos`
        mejoresPunt.appendChild(p)
    });
    event.stopPropagation()
    ver.style.display = "none"
})

//mostrar el contenedor con la información después de la partida
function pantallaAcabado() {
    puntuacionesAltas()
    juegoTerminadoCont.style.display = "flex"
    let puntosActual = document.getElementById("puntosActual")
    let segundosActual = document.getElementById("segundosActual")
    puntosActual.textContent = puntosFinales
    segundosActual.textContent = segundosInt
}

//funcion para volver a jugar
document.getElementById("volverJugar").addEventListener("click", event => {
    event.stopPropagation()
    window.location.replace("Daniel_Matesanz_Fernández_Práctica4_inicio.html")
})

//quitar y poner opacidad el el contenedor del final
op = true
juegoTerminadoCont.addEventListener("click", event => {
    if (op) {
        juegoTerminadoCont.style.backgroundColor = "rgba(109, 109, 109, 1)"
        op = false
    } else {
        juegoTerminadoCont.style.backgroundColor = "rgba(109, 109, 109, 0.68)"
        op = true
    }
})