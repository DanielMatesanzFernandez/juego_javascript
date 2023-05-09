function irAJuego(){
    segundos = document.getElementById("segundos")
    if(segundos.value <= 0){
        alert("pon una cantidad de segundos válida")
    } else{
    localStorage.setItem("segundos", JSON.stringify(segundos.value))
    window.location.replace("Daniel_Matesanz_Fernández_Práctica4_juego.html")}
}