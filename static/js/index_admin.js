document.addEventListener('DOMContentLoaded', () => {
    const btnButtonUser = document.querySelector('#btnButtonUser');
    const btnButtonCollapse = document.querySelector('#btnButtonCollapse');
    const navBar = document.querySelector('#navBar');
    const mnuUser = document.querySelector('#mnuUser');
    const stateUserMenuActive = "admin-header__user-menu--active";
    const stateNavBarActive = "admin-nav--active";

    btnButtonUser.addEventListener('click', () => {
        mnuUser.classList.toggle(stateUserMenuActive);
    });

    btnButtonCollapse.addEventListener('click', () => {
        navBar.classList.toggle(stateNavBarActive);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const btnUser = document.getElementById('btnButtonUser');
  const userMenu = document.getElementById('mnuUser');

  btnUser.addEventListener('click', (e) => {
    e.stopPropagation();

    const isShown = userMenu.classList.toggle('show');
    btnUser.setAttribute('aria-expanded', isShown ? 'true' : 'false');
  });

  // Cerrar menú si haces click fuera
  document.addEventListener('click', () => {
    if (userMenu.classList.contains('show')) {
      userMenu.classList.remove('show');
      btnUser.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar menú con Escape (accesibilidad)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && userMenu.classList.contains('show')) {
      userMenu.classList.remove('show');
      btnUser.setAttribute('aria-expanded', 'false');
      btnUser.focus();
    }
  });
});
