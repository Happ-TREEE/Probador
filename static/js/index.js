import { filtrarProductoPorNombre } from './catalogo.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const main = document.querySelector('.main');

    const btnUsuarioHeader = document.querySelector('#btnUsuarioHeader');
    const menuUsuarioHeader = document.querySelector('#menuUsuarioHeader');
    const btnMostrarBarraBusqueda = document.querySelector('#btnMostrarBarraBusqueda');
    const btnCerrarBarraBusqueda = document.querySelector('#btnCerrarBarraBusqueda');
    const btnBuscarRopa = document.querySelector('#btnBuscarRopa');
    const txtBuscarRopa = document.querySelector('#txtBuscarRopa');
    const stateUsuarioHeaderVisible = 'header__button-menu--visible';
    const stateHeaderSearchBarVisible = 'header--search-visible';

    let ultimaPosicionScroll = 0;
    const alturaPantalla = window.innerHeight;
    const anchoPantalla = window.innerWidth;
    const anchuraMinimaPantallaScroll = 480;
    const alturaMinimaPantallaScroll = 700;

    const mostrarBarraBusqueda = () => { header.classList.add(stateHeaderSearchBarVisible); txtBuscarRopa.focus(); };
    const cerrarBarraBusqueda = () => { header.classList.remove(stateHeaderSearchBarVisible); };
    const switchMenuUsuario = () => { menuUsuarioHeader?.classList.toggle(stateUsuarioHeaderVisible) };
    const buscarProducto = () => {
        var query = txtBuscarRopa.value.toLowerCase().trim();

        var search_query = document.querySelector('#search_query');

        if (!search_query) {
            return window.location.href = `/catalogo?search=${encodeURIComponent(query)}`;
        }

        return filtrarProductoPorNombre(query);
    }

    btnMostrarBarraBusqueda?.addEventListener('click', mostrarBarraBusqueda);
    btnCerrarBarraBusqueda?.addEventListener('click', cerrarBarraBusqueda);
    btnUsuarioHeader?.addEventListener('click', switchMenuUsuario);
    btnBuscarRopa?.addEventListener('click', buscarProducto);
    txtBuscarRopa?.addEventListener('keydown', (e) => { if (e.key === 'Enter') buscarProducto() });

    window.addEventListener('scroll', () => {
        if (anchoPantalla > anchuraMinimaPantallaScroll && alturaPantalla > alturaMinimaPantallaScroll) {
            const scrollActual = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollActual > ultimaPosicionScroll && scrollActual > 0) {
                header.style.position = "relative";
                main.style.marginTop = "0";
            }

            if (scrollActual < ultimaPosicionScroll) {
                header.style.position = "fixed";
                main.style.marginTop = "3.65rem";

            }

            ultimaPosicionScroll = scrollActual <= 0 ? 0 : scrollActual;
        }
    });
});
