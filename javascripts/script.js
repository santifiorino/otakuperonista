var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
  keyboard: false
});
var botonOutaku = document.getElementById("botonOtaku");
var botonPeronista = document.getElementById("botonPeronista");

var listaTodos = [];
var puntaje = 0;
var maxPuntaje = 0;
init();

function init(){
  var cantOtakus = 27;
  var cantPeronistas = 28;

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

function randomizar(){
  listaTodos = listaTodos.sort((a, b) => 0.5 - Math.random());
}

function guessed(guess){
  var img = document.getElementById("foto");
  img.src = getLink(listaTodos[puntaje], 0);
  botonOtaku.setAttribute('onclick','');
  botonPeronista.setAttribute('onclick','');
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
    setTimeout("myModal.toggle()", 1750);
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

var otaku_links = {
    "000": ["https://i.imgur.com/ESKluJL.png", "https://i.imgur.com/dvhWfGl.png"],
    "001": ["https://i.imgur.com/x08Q6HC.png", "https://i.imgur.com/uCOpsbu.png"],
    "002": ["https://i.imgur.com/8uU3lGk.png", "https://i.imgur.com/0m3Zrd2.png"],
    "003": ["https://i.imgur.com/gaNKySj.png", "https://i.imgur.com/Eeh19GQ.png"],
    "004": ["https://i.imgur.com/rlgbqAL.png", "https://i.imgur.com/GgLhEbE.png"],
    "005": ["https://i.imgur.com/RjIz3Ai.png", "https://i.imgur.com/olC3c1d.png"],
    "006": ["https://i.imgur.com/TKquqEN.png", "https://i.imgur.com/RvpK6XG.png"],
    "007": ["https://i.imgur.com/MHcsGtq.png", "https://i.imgur.com/BiBhxKW.png"],
    "008": ["https://i.imgur.com/AkkQGPY.png", "https://i.imgur.com/EBXVC3r.png"],
    "009": ["https://i.imgur.com/Hv3PQky.png", "https://i.imgur.com/B3L3Ga0.png"],
    "010": ["https://i.imgur.com/XHb4bZD.png", "https://i.imgur.com/uVmrgwi.png"],
    "011": ["https://i.imgur.com/9MaORLW.png", "https://i.imgur.com/mUhWJhd.png"],
    "012": ["https://i.imgur.com/4uS9TF7.png", "https://i.imgur.com/Q6BInvQ.png"],
    "013": ["https://i.imgur.com/Te9DnQK.png", "https://i.imgur.com/L9a4Kxx.png"],
    "014": ["https://i.imgur.com/2fXXW8c.png", "https://i.imgur.com/2Mo8laa.png"],
    "015": ["https://i.imgur.com/oBrd0II.png", "https://i.imgur.com/uhEnRsz.png"],
    "016": ["https://i.imgur.com/Grl5CI8.png", "https://i.imgur.com/LJEmvtA.png"],
    "017": ["https://i.imgur.com/x9bbmc3.png", "https://i.imgur.com/1FJMvdO.png"],
    "018": ["https://i.imgur.com/B9xIOlo.png", "https://i.imgur.com/efLMOI3.png"],
    "019": ["https://i.imgur.com/rPhElEz.png", "https://i.imgur.com/oihf6HJ.png"],
    "020": ["https://i.imgur.com/7tegHvj.png", "https://i.imgur.com/JBbv7fD.png"],
    "021": ["https://i.imgur.com/QEiP3OX.png", "https://i.imgur.com/myV2qt6.png"],
    "022": ["https://i.imgur.com/9IgLPS6.png", "https://i.imgur.com/CdsW4er.png"],
    "023": ["https://i.imgur.com/kbtqxMl.png", "https://i.imgur.com/ZRFVka9.png"],
    "024": ["https://i.imgur.com/GdiGm9a.png", "https://i.imgur.com/REXf1g3.png"],
    "025": ["https://i.imgur.com/QFcOMBM.png", "https://i.imgur.com/P59MiPv.png"],
    "026": ["https://i.imgur.com/mrUFQNV.png", "https://i.imgur.com/Meod0qE.png"],
    "027": ["https://i.imgur.com/sk4AwWg.png", "https://i.imgur.com/2j2d8bj.png"],
    "028": ["https://i.imgur.com/nqepjli.png", "https://i.imgur.com/YrpJaTP.png"],
    "029": ["https://i.imgur.com/DSJFb0O.png", "https://i.imgur.com/py9zahq.png"],
    "030": ["https://i.imgur.com/I0M4PW2.png", "https://i.imgur.com/RS2KjEC.png"],
    "031": ["https://i.imgur.com/cllIwg6.png", "https://i.imgur.com/RjoPWDY.png"],
    "032": ["https://i.imgur.com/1GmGHwR.png", "https://i.imgur.com/YJErbEQ.png"]
};

var peronista_links = {
    "000": ["https://i.imgur.com/Io2xP5s.png", "https://i.imgur.com/54RgEUY.png"],
    "001": ["https://i.imgur.com/tuJz9JR.png", "https://i.imgur.com/KSm54TS.png"],
    "002": ["https://i.imgur.com/RXwubbC.png", "https://i.imgur.com/w0pmoPK.png"],
    "003": ["https://i.imgur.com/Cjtja5S.png", "https://i.imgur.com/QvNK3Dw.png"],
    "004": ["https://i.imgur.com/v3CrMBw.png", "https://i.imgur.com/J5JFlUG.png"],
    "005": ["https://i.imgur.com/Oy6OV1p.png", "https://i.imgur.com/a6yI0yA.png"],
    "006": ["https://i.imgur.com/bTzvZZc.png", "https://i.imgur.com/KfHaZS3.png"],
    "007": ["https://i.imgur.com/GO8Q61Z.png", "https://i.imgur.com/tCaju2L.png"],
    "008": ["https://i.imgur.com/w8dgJjL.png", "https://i.imgur.com/StIpuit.png"],
    "009": ["https://i.imgur.com/vpoK52l.png", "https://i.imgur.com/3LHfLaY.png"],
    "010": ["https://i.imgur.com/MMnY464.png", "https://i.imgur.com/M2O3b5o.png"],
    "011": ["https://i.imgur.com/MyHXsrY.png", "https://i.imgur.com/2DFzdtO.png"],
    "012": ["https://i.imgur.com/Bl0uZCR.png", "https://i.imgur.com/mcS3OJs.png"],
    "013": ["https://i.imgur.com/oy9nZrW.png", "https://i.imgur.com/P5AO8lf.png"],
    "014": ["https://i.imgur.com/QFch33B.png", "https://i.imgur.com/xVIZh9h.png"],
    "015": ["https://i.imgur.com/T1W67NZ.png", "https://i.imgur.com/Ekrqp9P.png"],
    "016": ["https://i.imgur.com/SmnUbAy.png", "https://i.imgur.com/6nLme4F.png"],
    "017": ["https://i.imgur.com/tSosuvz.png", "https://i.imgur.com/9okfRUC.png"],
    "018": ["https://i.imgur.com/Lm4ZbT7.png", "https://i.imgur.com/Iy0hDYd.png"],
    "019": ["https://i.imgur.com/MAtxyU9.png", "https://i.imgur.com/5rPmExe.png"],
    "020": ["https://i.imgur.com/PV31YL2.png", "https://i.imgur.com/j2Uo6s7.png"],
    "021": ["https://i.imgur.com/x5wld2q.png", "https://i.imgur.com/xRlPLk8.png"],
    "022": ["https://i.imgur.com/zIu0rfj.png", "https://i.imgur.com/guYy3O4.png"],
    "023": ["https://i.imgur.com/sc8wKkx.png", "https://i.imgur.com/g59R0MR.png"],
    "024": ["https://i.imgur.com/aTTtoah.png", "https://i.imgur.com/0oFMnKA.png"],
    "025": ["https://i.imgur.com/2RhGFyo.png", "https://i.imgur.com/4byDNkv.png"],
    "026": ["https://i.imgur.com/911ezxf.png", "https://i.imgur.com/nzu6jHr.png"],
    "027": ["https://i.imgur.com/PMzmrde.png", "https://i.imgur.com/88dcA7H.png"],
    "028": ["https://i.imgur.com/Vv9OeV8.png", "https://i.imgur.com/PrwqQCk.png"],
    "029": ["https://i.imgur.com/cGFPmju.png", "https://i.imgur.com/DeQqwuB.png"],
    "030": ["https://i.imgur.com/8YKaCBP.png", "https://i.imgur.com/ixDI3sI.png"],
    "031": ["https://i.imgur.com/N3KusGR.png", "https://i.imgur.com/9Hi7SbK.png"],
    "032": ["https://i.imgur.com/SobdclW.png", "https://i.imgur.com/UOMr4Mt.png"]
};
