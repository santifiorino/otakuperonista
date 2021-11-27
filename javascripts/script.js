// Modal de cuando perdes
var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
  keyboard: false
})

var botonOutaku = document.getElementById("botonOtaku");
var botonPeronista = document.getElementById("botonPeronista");
// En foto1 pongo las previews, en foto2 pongo las fotos enteras
var foto1 = document.getElementById("foto1");
var foto2 = document.getElementById("foto2");
// listaTodos tiene tuplas con un 0 o un 1 en la primer posicion
// 0: otaku, 1: peronista, y el id de la foto en la segunda posicion
var listaTodos = [];
var puntaje = 0;
var maxPuntaje = 0;
init();

function init(){
  // Cantidad de fotos en la base de datos
  var cantOtakus = 60;
  var cantPeronistas = 60;
  // Inicializo listaTodos
  var listaOtakus = [];
  var listaPeronistas = [];
  for(var i = 0; i < cantOtakus; i++){
    var id = getID(i);
    listaOtakus.push([0, id]);
  }
  for(var i = 0; i < cantPeronistas; i++){
    var id = getID(i);
    listaPeronistas.push([1, id]);
  }
  listaTodos = listaOtakus.concat(listaPeronistas);
  randomizar();
  // Cargo la primer foto y la muestro
  siguienteFoto();
}
// Mezcla la listaTodos
function randomizar(){
  listaTodos = listaTodos.sort((a, b) => 0.5 - Math.random());
}
// Funcion que llama cuando tocas el boton Otaku o Peronista
function guessed(guess){
  // Muestro la foto entera
  foto1.style.display = "none";
  foto2.style.display = "block";
  // Inhabilito los botones para evitar que lo toquen antes de que cargue la siguiente imagen
  botonOtaku.setAttribute('onclick','');
  botonPeronista.setAttribute('onclick','');
  // Coloreo los botones de verde y rojo dependiendo si acertó o erró
  if (listaTodos[puntaje][0] == 0) {
    botonOtaku.className = "btn boton btn-lg botonAcierto";
    botonPeronista.className = "btn boton btn-lg botonError";
  } else {
    botonOtaku.className = "btn boton btn-lg botonError";
    botonPeronista.className = "btn boton btn-lg botonAcierto";
  }
  // Chequeo si adivinaste
  if (guess == listaTodos[puntaje][0]){
    // Sumo 1 al puntaje, chequeo maxScore y actualizo la interfaz
    puntaje++;
    if (puntaje > maxPuntaje){
      maxPuntaje = puntaje;
    }
    actualizarScores();
    // Si el puntaje es igual a la cantidad total de fotos, ganaste
    if (puntaje == listaTodos.length) {
      // Escribo en el modal que ganaste y lo muestro
      var p = document.getElementById("textoPerdiste");
      textoPerdiste.innerHTML = "SCORE: " + puntaje;
      var perdiste = document.getElementById("ganasteperdiste");
      perdiste.innerHTML = "GANASTE";
      myModal.toggle();
    } else {
      setTimeout("siguienteFoto()", 1750);
    }
  } else {
    // Escribo en el modal que perdiste y lo muestro
    var p = document.getElementById("textoPerdiste");
    textoPerdiste.innerHTML = "SCORE: " + puntaje;
    var perdiste = document.getElementById("ganasteperdiste");
    perdiste.innerHTML = "PERDISTE";
    setTimeout("myModal.toggle()", 750);
  }
}

function actualizarScores(){
  var p = document.getElementById("puntaje");
  p.innerHTML = "SCORE: " + puntaje;
  var p2 = document.getElementById("maxScore");
  p2.innerHTML = "MAX SCORE: " + maxPuntaje;
}
// Reiniciar: randomiza la lista de nuevo, pone el puntaje en 0 y arranca
function reiniciar(){
  randomizar();
  puntaje = 0;
  actualizarScores();
  myModal.toggle();
  siguienteFoto();
}

function siguienteFoto(){
  // cargo las fotos y muestro el preview
  foto1.src = getLink(listaTodos[puntaje], 1);
  foto2.src = getLink(listaTodos[puntaje], 0);
  foto1.style.display = "block";
  foto2.style.display = "none";
  // Pongo los botones en blanco de nuevo y los habilito
  botonOtaku.className = "btn boton btn-lg";
  botonPeronista.className = "btn boton btn-lg";
  botonOtaku.setAttribute('onclick','guessed(0)');
  botonPeronista.setAttribute('onclick','guessed(1)');
}

function getLink(tupla, prev){
  if (tupla[0] == 0){
    if (prev == 1){
      return otaku_links[tupla[1]][0];
    } else {
      return otaku_links[tupla[1]][1];
    }
  } else {
    if (prev == 1){
      return peronista_links[tupla[1]][0];
    } else {
      return peronista_links[tupla[1]][1];
    }
  }
}

function getID(i){
  var id = "";
  if (i < 10) {
    id += "00";
  } else if (i < 100){
    id += "0";
  }
  id += i;
  return id;
}
