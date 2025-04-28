document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.admin-nav');
    const btnNavHeader = document.querySelector('#btnNavHeader');
    const stateNavCollapse = "admin-nav--collapse";

    if (btnNavHeader) {
        btnNavHeader.addEventListener('click', () => {
            nav.classList.toggle(stateNavCollapse);
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const btnHamburguesa = document.getElementById('btnHamburguesa');
    const nav = document.getElementById('adminNav');
    const btnUserMenu = document.getElementById('btnUserMenu');
    const userMenu = document.getElementById('userMenu');

    if (btnHamburguesa) {
        btnHamburguesa.addEventListener('click', function () {
            nav.classList.toggle('admin-nav--active');
        });
    }

    btnUserMenu.addEventListener('click', function () {
        userMenu.classList.toggle('admin-header__user-menu--active');
    });

    document.addEventListener('click', function(e) {
        if (!btnUserMenu.contains(e.target) && !userMenu.contains(e.target)) {
            userMenu.classList.remove('admin-header__user-menu--active');
        }
    });
});
