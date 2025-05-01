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
