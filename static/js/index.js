import { filtrarProductoPorNombre } from './catalogo.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const slider = document.querySelector('.slider');

    const btnUsuarioHeader = document.querySelector('#btnUsuarioHeader');
    const menuUsuarioHeader = document.querySelector('#menuUsuarioHeader');
    const navHeader = document.querySelector('.header__list');
    const btnMostrarBarraBusqueda = document.querySelector('#btnMostrarBarraBusqueda');
    const btnCerrarBarraBusqueda = document.querySelector('#btnCerrarBarraBusqueda');
    const btnMostrarHeader = document.querySelector('#btnMostrarHeader');
    const btnBuscarRopa = document.querySelector('#btnBuscarRopa');
    const txtBuscarRopa = document.querySelector('#txtBuscarRopa');
    const barraBusqueda = document.querySelector('#barraBusqueda');
    const stateUsuarioHeaderVisible = 'header__button-menu--visible';
    const isSearchBarVisible = 'header__search-bar--visible';
    const isHeaderPrimary = "header--primary";
    const isNavVisible = 'header__list--visible';

    const changeStyleHeader = slider ? false : true;

    let ultimaPosicionScroll = 0;
    const alturaPantalla = window.innerHeight;
    const anchoPantalla = window.innerWidth;
    const anchuraMinimaPantallaScroll = 480;
    const alturaMinimaPantallaScroll = 700;

    const cambiarEstiloHeader = () => { header.classList.toggle(isHeaderPrimary, changeStyleHeader) };
    const mostrarBarraBusqueda = () => { barraBusqueda.classList.add(isSearchBarVisible); txtBuscarRopa.focus(); };
    const cerrarBarraBusqueda = () => { barraBusqueda.classList.remove(isSearchBarVisible); };
    const switchNav = () => { navHeader.classList.add(isNavVisible); };
    const switchMenuUsuario = () => { menuUsuarioHeader?.classList.toggle(stateUsuarioHeaderVisible) };
    const buscarProducto = () => {
        var query = txtBuscarRopa.value.toLowerCase().trim();

        var search_query = document.querySelector('#search_query');

        if (!search_query) {
            return window.location.href = `/catalogo?search=${encodeURIComponent(query)}`;
        }

        return filtrarProductoPorNombre(query);
    }
    const agregarScrollHeader = () => {
        if (anchoPantalla > anchuraMinimaPantallaScroll && alturaPantalla > alturaMinimaPantallaScroll) {
            const scrollActual = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollActual > ultimaPosicionScroll && scrollActual > 0) {
                header.classList.toggle(isHeaderScrollVisible, false);
                header.classList.toggle(isHeaderPrimary, false);
            }

            if (scrollActual < ultimaPosicionScroll) {
                header.classList.toggle(isHeaderScrollVisible, true);
                header.classList.toggle(isHeaderPrimary, true);
            }

            if (scrollActual < (alturaPantalla / 2)) {
                header.classList.toggle(isHeaderScrollVisible, false);
                header.classList.toggle(isHeaderPrimary, false);
            }

            ultimaPosicionScroll = scrollActual <= 0 ? 0 : scrollActual;
        }
    };

    cambiarEstiloHeader();
    btnMostrarHeader?.addEventListener('click', switchNav);
    btnMostrarBarraBusqueda?.addEventListener('click', mostrarBarraBusqueda);
    btnCerrarBarraBusqueda?.addEventListener('click', cerrarBarraBusqueda);
    btnUsuarioHeader?.addEventListener('click', switchMenuUsuario);
    btnBuscarRopa?.addEventListener('click', buscarProducto);
    txtBuscarRopa?.addEventListener('keydown', (e) => { if (e.key === 'Enter') buscarProducto() });

    window.addEventListener('scroll', agregarScrollHeader);
    window.addEventListener('orientationchange', agregarScrollHeader);
});

const header = document.querySelector('.header');
const isHeaderScrollVisible = 'header--scroll-visible';
const isHeaderPrimary = 'header--primary';

let ultimaPosicionScroll = 0;
const alturaPantalla = window.innerHeight;
const anchoPantalla = window.innerWidth;
const anchuraMinimaPantallaScroll = 480;
const alturaMinimaPantallaScroll = 700;

const agregarScrollHeader = () => {
    if (anchoPantalla > anchuraMinimaPantallaScroll && alturaPantalla > alturaMinimaPantallaScroll) {
        const scrollActual = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollActual > ultimaPosicionScroll && scrollActual > 0) {
            header.classList.toggle(isHeaderScrollVisible, false);
            header.classList.toggle(isHeaderPrimary, false);
        }

        if (scrollActual < ultimaPosicionScroll) {
            header.classList.toggle(isHeaderScrollVisible, true);
            header.classList.toggle(isHeaderPrimary, true);
        }

        if (scrollActual < (alturaPantalla / 2)) {
            header.classList.toggle(isHeaderScrollVisible, false);
            header.classList.toggle(isHeaderPrimary, false);
        }

        ultimaPosicionScroll = scrollActual <= 0 ? 0 : scrollActual;
    }
};

window.addEventListener('scroll', agregarScrollHeader);
window.addEventListener('orientationchange', agregarScrollHeader);
