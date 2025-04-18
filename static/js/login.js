const btnSignIn = document.getElementById("sign-in"),
btnSignUp = document.getElementById("sign-up"),
containerFormRegister = document.querySelector(".register"),
containerFormLogin = document.querySelector(".login"),
loginButton = document.getElementById("ingr"); // Botón de inicio de sesión

const MAX_INTENTOS = 5;
const TIEMPO_BLOQUEO = 1 * 60 * 1000; // 1 minuto en milisegundos

btnSignIn.addEventListener("click", e => {
e.preventDefault();
containerFormRegister.classList.add("hide");
containerFormLogin.classList.remove("hide");
containerFormLogin.reset();
});

btnSignUp.addEventListener("click", e => {
e.preventDefault();
containerFormLogin.classList.add("hide");
containerFormRegister.classList.remove("hide");
ver_password('ps', 'icon_ps','cerrar');
limpiar_campos();
});

window.addEventListener('load', () => {
verificarBloqueo(); // Verificar si el usuario está bloqueado
limpiar_campos();
});

function iniciar_sesion(event) {
let intentosFallidos = parseInt(localStorage.getItem("intentosFallidos")) || 0;

if (estaBloqueado()) {
  event.preventDefault();
  mostrarMensajeBloqueo();
  return;
}

let formulario_sesion = document.getElementById('formulario_uno');
let formulario_1 = new FormData(formulario_sesion);

if (formulario_sesion.checkValidity() == false) {
  return;
}
event.preventDefault();

fetch('/login', {
  method: 'POST',
  body: formulario_1
})
.then(response => response.json())
.then(data => {
  if (data.estado === "error") {
      intentosFallidos++;
      localStorage.setItem("intentosFallidos", intentosFallidos);

      if (intentosFallidos >= MAX_INTENTOS) {
          localStorage.setItem("bloqueoInicio", Date.now());
          mostrarMensajeBloqueo();
          bloquearBoton();
      } else {
          alert("Verifique su contraseña o correo. Intentos restantes: " + (MAX_INTENTOS - intentosFallidos));
      }
  } else {
      localStorage.setItem("intentosFallidos", 0);
      window.location.href = data.redirect;
  }
});
}

function estaBloqueado() {
let bloqueoInicio = localStorage.getItem("bloqueoInicio");
if (bloqueoInicio) {
  let tiempoRestante = TIEMPO_BLOQUEO - (Date.now() - bloqueoInicio);
  return tiempoRestante > 0;
}
return false;
}

function mostrarMensajeBloqueo() {
let bloqueoInicio = localStorage.getItem("bloqueoInicio");

if (bloqueoInicio) {
  let tiempoRestante = TIEMPO_BLOQUEO - (Date.now() - bloqueoInicio);
  if (tiempoRestante > 0) {
      iniciarContadorBloqueo(Math.ceil(tiempoRestante / 1000));
  }
}
}

function bloquearBoton() {
loginButton.disabled = true;
mostrarMensajeBloqueo();
}

function ver_password(input , icon, accion){
const password = document.getElementById(input);
const icono = document.getElementById(icon);
if (accion == "cerrar"){
  if (icono.classList.contains("bi-eye-slash-fill")){
      icono.classList.remove("bi-eye-slash-fill");
      icono.classList.add("bi-eye-fill");
      password.type = "password";
  }
}else{
  if (icono.classList.contains("bi-eye-fill")){
      icono.classList.remove("bi-eye-fill");
      icono.classList.add("bi-eye-slash-fill");
      password.type = "text";
  }else{
      password.type = "password";
      icono.classList.add("bi-eye-fill");
      icono.classList.remove("bi-eye-slash-fill");
  }
}
}

function desbloquearBoton() {
loginButton.disabled = false;
}

function verificarBloqueo() {
if (estaBloqueado()) {
  bloquearBoton();
  setTimeout(() => {
      localStorage.removeItem("bloqueoInicio");
      localStorage.setItem("intentosFallidos", 0);
      desbloquearBoton();
  }, TIEMPO_BLOQUEO);
}
}


function limpiar_campos() {
let items = document.querySelectorAll('input');
const ids = ["ingr", "sign-in", "reg"];
Array.from(items).forEach(element => {
  if (!ids.includes(element.id)) {
      element.value = "";
  }
});
}

function ver_password(inputId, iconId) {
var input = document.getElementById(inputId);
var icon = document.getElementById(iconId);

// Cambiar tipo de input entre password y text
if (input.type === "password") {
  input.type = "text";  // Muestra la contraseña
  icon.classList.remove("bi-eye-fill");
  icon.classList.add("bi-eye-slash-fill"); // Cambia el ícono
} else {
  input.type = "password";  // Oculta la contraseña
  icon.classList.remove("bi-eye-slash-fill");
  icon.classList.add("bi-eye-fill"); // Vuelve al ícono original
}
}


function crear_cuenta(event){
let contraseña = document.getElementsByName('contraseña')[0].value;

const tieneMayuscula = /[A-Z]/.test(contraseña);
const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>/]/.test(contraseña);
const tieneNumero = /[0-9]/.test(contraseña);
const tieneMinuscula = /[a-z]/.test(contraseña);

if (!tieneMayuscula || !tieneSimbolo || !tieneNumero || !tieneMinuscula) {
  alert("La contraseña debe contener al menos una letra mayúscula, un símbolo, un número y una letra minúscula.");
  event.preventDefault();
}else{
  let frm_crearcuenta = document.getElementById('frm_crearcuenta');
  let frm_envio = new FormData(frm_crearcuenta);

  if (frm_crearcuenta.checkValidity() == false){
      return ;
  }
  event.preventDefault();

  fetch('/registro', {
      method: 'POST',
      body: frm_envio
  })
  .then(response => response.json())
  .then(data => {
      if (data.estado == "error") {
          alert("no se pudo crear la cuenta");
      }else  if(data.estado == "existe"){
          alert("Ese usuario ya existe");
      }else{
          window.location.href = data.redirect;
      }
  })
}


}



//Lo mas importante seguridad
window.addEventListener( "pageshow", function ( event ) {
if ( event.persisted ) {
     window.location.reload();
   }
});
