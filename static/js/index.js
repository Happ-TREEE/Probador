import { activarUnoDelGrupo, alternarClasePorEvento} from './utilities.js';

document.addEventListener('DOMContentLoaded', () => {
    const headerLogo = document.querySelector('#header_logo');
    const headerNavMain = document.querySelector('#header_nav_main');
    const headerNavUser = document.querySelector('#header_nav_user');
    const btn_headerNavMain = document.querySelector('#btn_header_nav_main');
    const btn_headerNavUser = document.querySelector('#btn_header_nav_user');
    const linksHeader = document.querySelectorAll('.header__nav--main>.header__link');
    const stateHeaderNav = "header__nav--active";
    const stateHeaderLink = "header__link--active";

    headerLogo.addEventListener('click', () => {
        if (sessionStorage.getItem('activeLink')) {
            sessionStorage.removeItem('activeLink');
        }
    });

    alternarClasePorEvento(
        btn_headerNavUser,
        headerNavUser,
        stateHeaderNav,
        'click');

    alternarClasePorEvento(
        btn_headerNavMain,
        headerNavMain,
        stateHeaderNav,
        'click');

    activarUnoDelGrupo(linksHeader, stateHeaderLink, 'click');

});