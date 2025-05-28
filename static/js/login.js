document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.querySelector('.auth__form--login');
  const formRegister = document.querySelector('.auth__form--register');
  const linkToRegister = document.querySelector('#linkToRegister');
  const linkToLogin = document.querySelector('#linkToLogin');
  const modalCodigo = document.getElementById('modalCodigo'); // se mantendrá oculto
  const btnRegister = document.querySelector('#btnRegister');

  // Mostrar formulario de registro
  linkToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    formLogin.classList.remove('active');
    formRegister.classList.add('active');
  });

  // Mostrar formulario de login
  linkToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    formRegister.classList.remove('active');
    formLogin.classList.add('active');
  });

  // Botón fuera del formulario para ir a registro
  if (btnRegister) {
    btnRegister.addEventListener('click', () => {
      formLogin.classList.remove('active');
      formRegister.classList.add('active');
    });
  }

  // Enviar formulario registro con validación captcha personalizado
  formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userCaptchaInput = formRegister.querySelector('input[name="captcha_input"]').value.trim();
    const expectedCaptcha = sessionStorage.getItem('captcha_text');

    if (!userCaptchaInput || userCaptchaInput.toUpperCase() !== expectedCaptcha) {
      alert('Por favor, ingresa correctamente el código captcha mostrado.');
      return;
    }

    const formData = new FormData(formRegister);

    try {
      const res = await fetch(formRegister.action, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Registro exitoso. Ya puedes iniciar sesión.');
        formRegister.reset();
        sessionStorage.removeItem('captcha_text'); // limpia captcha almacenado
        formRegister.classList.remove('active');
        formLogin.classList.add('active');
      } else {
        const data = await res.text();
        alert('Error al registrar: ' + data);
      }
    } catch (error) {
      alert('Error en la conexión, intenta nuevamente.');
    }
  });

  // Mantengo el modal oculto porque ya no es necesario
  if (modalCodigo) {
    modalCodigo.style.display = 'none';
  }
});
