import { activarUnoDelGrupo, alternarClasePorEvento } from './utilities.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const main = document.querySelector('.main');
    const btnUsuarioHeader = document.querySelector('#btnUsuarioHeader');
    const menuUsuarioHeader = document.querySelector('#menuUsuarioHeader');
    const stateUsuarioHeaderVisible = 'header__button-menu--visible';
    let ultimaPosicionScroll = 0;
    const alturaPantalla = window.innerHeight;
    const anchoPantalla = window.innerWidth;
    const anchuraMinimaPantallaScroll = 480;
    const alturaMinimaPantallaScroll = 700;

    if (btnUsuarioHeader && menuUsuarioHeader) {
        btnUsuarioHeader.addEventListener('click', () => {
            menuUsuarioHeader.classList.toggle(stateUsuarioHeaderVisible);
        })
    }

    window.addEventListener('scroll', () => {
        if (anchoPantalla > anchuraMinimaPantallaScroll && alturaPantalla > alturaMinimaPantallaScroll) {
            const scrollActual = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollActual > ultimaPosicionScroll && scrollActual > 0) {
                header.style.position = "relative";
                main.style.marginTop = "0";
            }

            if (scrollActual < ultimaPosicionScroll) {
                header.style.position = "fixed";
                main.style.marginTop = "6.4rem";

            }

            ultimaPosicionScroll = scrollActual <= 0 ? 0 : scrollActual;
        }
    });
});
