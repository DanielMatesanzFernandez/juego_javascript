function irAJuego(){
    segundos = document.getElementById("segundos")
    if(segundos.value <= 0){
        alert("pon una cantidad de segundos válida")
    } else{
    localStorage.setItem("segundos", JSON.stringify(segundos.value))
    window.location.replace("juego.html")}
}