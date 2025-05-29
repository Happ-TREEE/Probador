const canvas = document.getElementById('captchaCanvas');
const ctx = canvas.getContext('2d');
let captchaText = '';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChar() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sin caracteres confusos
  return chars.charAt(randomInt(0, chars.length - 1));
}

function enviarCaptchaAlBackend(captcha) {
  fetch('/guardar_captcha', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ captcha: captcha }),
  });
}

function drawCaptcha() {
  captchaText = '';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo claro
  ctx.fillStyle = '#f0f8ff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Texto semi borroso con rotación y distorsión
  for (let i = 0; i < 6; i++) {
    const char = randomChar();
    captchaText += char;

    const fontSize = randomInt(20, 30);
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = `rgb(${randomInt(0,100)},${randomInt(0,100)},${randomInt(0,100)})`;
    ctx.textBaseline = 'middle';

    const x = 20 + i * 20;
    const y = canvas.height / 2;

    const angle = (Math.random() - 0.5) * 0.6; // Rotación +- ~30 grados

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }

  // Líneas para ruido
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(${randomInt(0,150)},${randomInt(0,150)},${randomInt(0,150)},0.7)`;
    ctx.beginPath();
    ctx.moveTo(randomInt(0, canvas.width), randomInt(0, canvas.height));
    ctx.lineTo(randomInt(0, canvas.width), randomInt(0, canvas.height));
    ctx.stroke();
  }

  // Puntos para ruido
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(${randomInt(0,150)},${randomInt(0,150)},${randomInt(0,150)},0.3)`;
    ctx.beginPath();
    ctx.arc(randomInt(0, canvas.width), randomInt(0, canvas.height), 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Guardar el texto en sessionStorage para validación
  sessionStorage.setItem('captcha_text', captchaText);

  // Enviar captcha generado al backend para guardarlo en sesión
  enviarCaptchaAlBackend(captchaText);
}

drawCaptcha();

document.getElementById('refreshCaptcha').addEventListener('click', () => {
  drawCaptcha();
  document.getElementById('captchaInput').value = '';
  updateCaptchaFeedback();
});

canvas.addEventListener('click', () => {
  drawCaptcha();
  document.getElementById('captchaInput').value = '';
  updateCaptchaFeedback();
});

const captchaInput = document.getElementById('captchaInput');
const captchaFeedback = document.getElementById('captchaFeedback');

function updateCaptchaFeedback() {
  const valorIngresado = captchaInput.value.trim().toUpperCase();
  const captchaCorrecto = sessionStorage.getItem('captcha_text');

  if (valorIngresado.length === 6 && valorIngresado === captchaCorrecto) {
    captchaInput.style.borderColor = 'green';
    captchaFeedback.textContent = 'Captcha correcto ✔️';
    captchaFeedback.style.color = 'green';
  } else {
    captchaInput.style.borderColor = 'red';
    captchaFeedback.textContent = 'Captcha incorrecto ❌';
    captchaFeedback.style.color = 'red';
  }

  if (valorIngresado.length === 0) {
    captchaInput.style.borderColor = '#ccc';
    captchaFeedback.textContent = '';
  }
}

captchaInput.addEventListener('input', updateCaptchaFeedback);

const formLogin = document.querySelector('.auth__form--login');
const formRegister = document.querySelector('.auth__form--register');
const linkToRegister = document.querySelector('#linkToRegister');
const linkToLogin = document.querySelector('#linkToLogin');
const btnRegister = document.querySelector('#btnRegister');

linkToRegister.addEventListener('click', (e) => {
  e.preventDefault();
  formLogin.classList.remove('active');
  formRegister.classList.add('active');
});

linkToLogin.addEventListener('click', (e) => {
  e.preventDefault();
  formRegister.classList.remove('active');
  formLogin.classList.add('active');
});

if (btnRegister) {
  btnRegister.addEventListener('click', () => {
    formLogin.classList.remove('active');
    formRegister.classList.add('active');
  });
}

const modalElement = document.getElementById('modalCodigoVerificacion');
const modalBootstrap = new bootstrap.Modal(modalElement);
const formCodigo = document.getElementById('formCodigoVerificacion');
const emailUsuarioInput = document.getElementById('emailUsuario');

formRegister.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userCaptchaInput = formRegister.querySelector('input[name="captcha_input"]').value.trim();
  const expectedCaptcha = sessionStorage.getItem('captcha_text');

  if (!userCaptchaInput || userCaptchaInput.toUpperCase() !== expectedCaptcha) {
    Swal.fire({
      icon: 'warning',
      title: 'Captcha incorrecto',
      text: 'Por favor, ingresa correctamente el código captcha mostrado.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const formData = new FormData(formRegister);

  try {
    const res = await fetch(formRegister.action, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      emailUsuarioInput.value = formData.get('correo');
      modalBootstrap.show();
    } else {
      const data = await res.text();
      Swal.fire('Error al registrar', data, 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'Error en la conexión, intenta nuevamente.', 'error');
  }
});

formCodigo.addEventListener('submit', async (e) => {
  e.preventDefault();

  const codigo = document.getElementById('inputCodigo').value.trim();
  const email = emailUsuarioInput.value;

  if (codigo.length !== 6) {
    Swal.fire('Código inválido', 'El código debe tener 6 dígitos.', 'warning');
    return;
  }

  try {
    const res = await fetch('/verificar_codigo', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email, codigo: codigo}),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      Swal.fire('Verificado', 'Tu correo ha sido verificado exitosamente.', 'success').then(() => {
        modalBootstrap.hide();
        location.href = '/login'; // Cambia a la URL que prefieras
      });
    } else {
      Swal.fire('Error', data.message || 'Código incorrecto.', 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'Error en la conexión, intenta nuevamente.', 'error');
  }
});
