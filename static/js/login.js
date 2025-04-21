document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.querySelector('.auth__form--login');
  const formRegister = document.querySelector('.auth__form--register');
  const linkToRegister = document.querySelector('#linkToRegister');
  const linkToLogin = document.querySelector('#linkToLogin');

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

  // También puedes conectar los botones que están fuera del formulario si los tienes
  const btnRegister = document.querySelector('#btnRegister');
  if (btnRegister) {
    btnRegister.addEventListener('click', () => {
      formLogin.classList.remove('active');
      formRegister.classList.add('active');
    });
  }
});
