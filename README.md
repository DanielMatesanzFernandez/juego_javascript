# juego_javascript
El juego consta de que el usuario controla una pelota con wasd y va racogiendo cuadrados que vienen del lado derecho de la pantalla dándole 1 punto al recoger uno y restándole uno por cada cuadrado que llegue el final, teniendo un tiempo límite

elementos rúbrica:
    Animaciones:
        setInterval y clearInterval--> para la creación y el movimiento de los cuadrados, para el movimiento del jugador y para gestionar el contador
        requestAnimationFrame y cancelAnimationFrame--> para que las comprobaciones de colisión y para actualizar la posición del jugador sin necesidad de bucle infinito, así está más optimizado

    Promesas:
        para avisar cuando se detecta una colisión

    Almacenamiento:
        para enviar la cantidad de segundos de la página de inicio a la del juego y para guardar las 5 mejores puntuaciones

    Eventos:
        con keyDown y keyUp para el movimiento del jugador, para que sea más fluido y en la pantalla del final con click para cambiar la opacidad del fondo y para mostrar las 5 mejores puntuaciones, en este último está             implementado el stopPropagation para que al pulsarlo no se cambie la opacidad al igual que pasa con el boton de volver a jugar
