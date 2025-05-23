document.addEventListener('DOMContentLoaded', () => {
  const btnUser = document.getElementById('btnButtonUser');
  const userMenu = document.getElementById('mnuUser');
  const btnCollapse = document.getElementById('btnButtonCollapse');
  const navBar = document.getElementById('navBar');
  const userMenuActiveClass = 'show';  // Usa esta clase en CSS
  const navBarActiveClass = 'admin-nav--active';

  btnUser.addEventListener('click', (e) => {
    e.stopPropagation();
    const isShown = userMenu.classList.toggle(userMenuActiveClass);
    btnUser.setAttribute('aria-expanded', isShown ? 'true' : 'false');
  });

  btnCollapse.addEventListener('click', () => {
    navBar.classList.toggle(navBarActiveClass);
  });

  // Cerrar menú usuario si haces click fuera
  document.addEventListener('click', () => {
    if (userMenu.classList.contains(userMenuActiveClass)) {
      userMenu.classList.remove(userMenuActiveClass);
      btnUser.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar menú con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && userMenu.classList.contains(userMenuActiveClass)) {
      userMenu.classList.remove(userMenuActiveClass);
      btnUser.setAttribute('aria-expanded', 'false');
      btnUser.focus();
    }
  });
});
