class Imagen {
  constructor(id, tipo, link) {
    this.id = id; // Id de la foto
    this.tipo = tipo; // Otaku o Peronista
  }
}
// Variables globales
var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
  keyboard: false
})
var listaImagenes = [];
var puntaje = 0;
var maxPuntaje = 0;
init();

function init(){
  // Inicializo listaImagenes
  const fotosPorCategoria = 60;
  for(let i = 0; i < fotosPorCategoria; i++){
    listaImagenes.push(new Imagen(getID(i), "otaku"));
    listaImagenes.push(new Imagen(getID(i), "peronista"));
  }
  randomizar();
  // Cargo la primer foto
  siguienteFoto();
}

// Mezcla la listaImagenes
function randomizar(){
  listaImagenes = listaImagenes.sort((a, b) => 0.5 - Math.random());
}

function siguienteFoto(){
  // Cargo la foto de la mano sola
  let foto = document.getElementById("foto");
  let botonOutaku = document.getElementById("botonOtaku");
  let botonPeronista = document.getElementById("botonPeronista");
  foto.src = getLink(listaImagenes[puntaje], 1);
  // Pongo los botones en blanco y los habilito
  botonOtaku.className = "btn boton btn-lg";
  botonPeronista.className = "btn boton btn-lg";
  botonOtaku.setAttribute('onclick','guessed("otaku")');
  botonPeronista.setAttribute('onclick','guessed("peronista")');
}

// Funcion que llama cuando tocas el boton de adivinar
function guessed(guess){
  // Muestro la foto entera
  let botonOutaku = document.getElementById("botonOtaku");
  let botonPeronista = document.getElementById("botonPeronista");
  let foto = document.getElementById("foto");
  foto.src = getLink(listaImagenes[puntaje], 0);
  // Coloreo los botones y los inhabilito hasta mostrar la siguiente foto
  botonOtaku.setAttribute('onclick','');
  botonPeronista.setAttribute('onclick','');
  if (listaImagenes[puntaje].tipo == "otaku") {
    botonOtaku.className = "btn boton btn-lg botonAcierto";
    botonPeronista.className = "btn boton btn-lg botonError";
  } else {
    botonOtaku.className = "btn boton btn-lg botonError";
    botonPeronista.className = "btn boton btn-lg botonAcierto";
  }
  // Chequeo si adivinaste
  if (guess == listaImagenes[puntaje].tipo){
    // Sumo 1 al puntaje, chequeo maxScore y actualizo la interfaz
    puntaje++;
    if (puntaje > maxPuntaje){
      maxPuntaje = puntaje;
    }
    actualizarScores();
    // Si el puntaje es igual a la cantidad total de fotos, ganaste
    if (puntaje == listaImagenes.length) {
      // Escribo en el modal que ganaste y lo muestro
      let p = document.getElementById("textoPerdiste");
      textoPerdiste.innerHTML = "SCORE: " + puntaje;
      let perdiste = document.getElementById("ganasteperdiste");
      perdiste.innerHTML = "GANASTE";
      myModal.toggle();
    } else {
      setTimeout("siguienteFoto()", 1750);
    }
  } else {
    // Escribo en el modal que perdiste y lo muestro
    let p = document.getElementById("textoPerdiste");
    textoPerdiste.innerHTML = "SCORE: " + puntaje;
    let perdiste = document.getElementById("ganasteperdiste");
    perdiste.innerHTML = "PERDISTE";
    setTimeout("myModal.toggle()", 1750);
  }
}

function actualizarScores(){
  let p = document.getElementById("puntaje");
  p.innerHTML = "SCORE: " + puntaje;
  let p2 = document.getElementById("maxScore");
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
// Le das el id y si prev esta en 0 te da la foto de la mano sola, y si está en 1 la foto completa
function getLink(img, prev){
  if (img.tipo == "otaku"){
    if (prev == 1){
      return otaku_links[img.id][0];
    } else {
      return otaku_links[img.id][1];
    }
  } else {
    if (prev == 1){
      return peronista_links[img.id][0];
    } else {
      return peronista_links[img.id][1];
    }
  }
}
// Formato de ids
function getID(i){
  let id = "";
  if (i < 10) {
    id += "00";
  } else if (i < 100){
    id += "0";
  }
  id += i;
  return id;
}
