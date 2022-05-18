let actualDisplay = '';
let numero1 = null;
let numero2 = null;
let operador = '';
const LIMITE_NUMEROS = 25;

//LOGICA DE LA CALCULADORA

function leerNumero (elemento) {
  if (actualDisplay.length < LIMITE_NUMEROS){
    actualDisplay += elemento.getAttribute('data-valor')
    actualizarDisplay(actualDisplay);
  }
}

function dispararAccion (elemento) {
  if (elemento.getAttribute('data-valor') === 'AC') {
    limpiarDisplay()
  }
}

function operarNumeros () {
  if (operador === 'sum') {
    return numero1 + numero2
  }
  if (operador === 'rest') {
    return numero1 - numero2
  }
  if (operador === 'div') {
    return numero1 / numero2
  }
  if (operador === 'mod') {
    return numero1 % numero2
  }
  if (operador === 'exp') {
    return numero1 ** numero2
  }
  if (operador === 'mult') {
    return numero1 * numero2
  }
}

function dispararOperacion (elemento) {
  if (numero1 === null) {
    numero1 = parseFloat(actualDisplay)
  } else {
    numero2 = parseFloat(actualDisplay)
  }
  limpiarDisplay();
  if (elemento.getAttribute('data-valor') === 'igual') {
    if (numero2 === null) {
      alert('Debes escribir los numeros para operar')
    }
    let resultado = operarNumeros();
    actualizarDisplay(resultado);
    numero1 = null;
    numero2 = null;
    operador = '';
  } else {
    operador = elemento.getAttribute('data-valor');
  }
}

// FUNCIONES SOBRE EL DOM
function actualizarDisplay (valor) {
  const display = document.getElementById('display_numbers');
  display.value = valor;
}

function limpiarDisplay () {
  actualDisplay= '';
  actualizarDisplay('');
}

function cargarAcciones () {
  const botones = document.getElementsByClassName('acciones');
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => dispararAccion(botones[i]));
  }
}

function cargarNumeros () {
  const botones = document.getElementsByClassName('numero');
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => leerNumero(botones[i]));
  }
}

function cargarOperaciones () {
  const botones = document.getElementsByClassName('operador');
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => dispararOperacion(botones[i]));
  }
}

function cargarCalculadora () {
  cargarNumeros();
  cargarAcciones();
  cargarOperaciones();
}

window.onload = cargarCalculadora;