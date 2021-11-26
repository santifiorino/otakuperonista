var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
  keyboard: false
})
var botonOutaku = document.getElementById("botonOtaku");
var botonPeronista = document.getElementById("botonPeronista");

var listaTodos = [];
var puntaje = 0;
var maxPuntaje = 0;
init();

function init(){
  var cantOtakus = 6;
  var cantPeronistas = 5;

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
  var img = document.getElementById("foto");
  img.src = getLink(listaTodos[0], 1);
}

function getLink(tupla, prev){
  var url = "./images"
  if (tupla[0] == 0){
    if (prev == 1){
      url += "/otk_preview/";
    } else {
      url += "/otk_full/";
    }
  } else {
    if (prev == 1){
      url += "/per_preview/";
    } else {
      url += "/per_full/";
    }
  }
  url += tupla[1] + ".png";
  return url;
}

function randomizar(){
  listaTodos = listaTodos.sort((a, b) => 0.5 - Math.random());
}

function guessed(guess){
  botonOtaku.setAttribute('onclick','');
  botonPeronista.setAttribute('onclick','');
  var img = document.getElementById("foto");
  img.src = getLink(listaTodos[puntaje], 0);
  if (listaTodos[puntaje][0] == 0) {
    botonOtaku.className = "btn boton btn-lg botonAcierto";
    botonPeronista.className = "btn boton btn-lg botonError";
  } else {
    botonOtaku.className = "btn boton btn-lg botonError";
    botonPeronista.className = "btn boton btn-lg botonAcierto";
  }
  if (guess == listaTodos[puntaje][0]){
    puntaje++;
    if (puntaje > maxPuntaje){
      maxPuntaje = puntaje;
    }
    actualizarScores();
    if (puntaje == listaTodos.length) {
      var p = document.getElementById("textoPerdiste");
      textoPerdiste.innerHTML = "SCORE: " + puntaje;
      var perdiste = document.getElementById("ganasteperdiste");
      perdiste.innerHTML = "GANASTE";
      myModal.toggle();
    } else {
      setTimeout("siguienteFoto()", 1750);
    }
  } else {
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

function reiniciar(){
  randomizar();
  puntaje = 0;
  actualizarScores();
  myModal.toggle();
  siguienteFoto();
}

function siguienteFoto(){
  var img = document.getElementById("foto");
  img.src = getLink(listaTodos[puntaje], 1);
  botonOtaku.className = "btn boton btn-lg";
  botonPeronista.className = "btn boton btn-lg";
  botonOtaku.setAttribute('onclick','guessed(0)');
  botonPeronista.setAttribute('onclick','guessed(1)');
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
