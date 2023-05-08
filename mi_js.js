let posicionJugador = { x: 100, y: 100 };
        juego = document.getElementById("juego")
        puntuacion = document.getElementById("puntos")
        puntos = 0;
        puntosFinales = 0;
        iniciar()

        function crearElemento() {
            const elemento = document.createElement('div');
            elemento.classList.add('elemento');
            elemento.borrado = false;
            elemento.style.position = 'absolute';
            elemento.style.top = `${Math.random() * (juego.offsetHeight - 30)}px`;
            elemento.style.left = `${juego.offsetWidth - 30}px`;
            juego.appendChild(elemento);
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
                            if (posicionJugador.y == juego.offsetHeight - 10) {
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
                            if (posicionJugador.x == juego.offsetWidth - 10) {
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
        function actualizarJugador() {
            const jugador = document.getElementById('jugador');
            jugador.style.left = `${posicionJugador.x}px`;
            jugador.style.top = `${posicionJugador.y}px`;
        }
        function animar() {
            // ...
            actualizarJugador();
            detectarColisiones();
            animacion = requestAnimationFrame(animar);
        }
        function detectarColisiones() {
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
                    puntos += 1
                    puntuacion.textContent = puntos
                    elemento.borrado = true
                    elemento.remove();
                }
            });
        }

        function iniciar(){
            animar()
            creandoElementos = setInterval(crearElemento, 1000)
        }

        function parar(){
            puntosFinales = puntos
            clearInterval(creandoElementos)
            cancelAnimationFrame(animar)
        }