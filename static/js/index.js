import { filtrarProductoPorNombre } from './catalogo.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const btnUsuarioHeader = document.querySelector('#btnUsuarioHeader');
    const menuUsuarioHeader = document.querySelector('#menuUsuarioHeader');
    const navHeader = document.querySelector('.header__list');
    const btnMostrarBarraBusqueda = document.querySelector('#btnMostrarBarraBusqueda');
    const btnCerrarBarraBusqueda = document.querySelector('#btnCerrarBarraBusqueda');
    const btnMostrarHeader = document.querySelector('#btnMostrarHeader');
    const btnOcultarHeader = document.querySelector('#btnOcultarHeader');
    const btnBuscarRopa = document.querySelector('#btnBuscarRopa');
    const txtBuscarRopa = document.querySelector('#txtBuscarRopa');
    const barraBusqueda = document.querySelector('#barraBusqueda');
    const badge = document.querySelector('.header__cart-badge');

    const stateUsuarioHeaderVisible = 'header__button-menu--visible';
    const stateSearchBarVisible = 'header__search-bar--visible';
    const stateHeaderPrimary = 'header--primary';
    const stateNavVisible = 'header__list--visible';
    const stateHeaderScrollVisible = 'header--scroll-visible';

    const slider = document.querySelector('.slider');
    const changeStyleHeader = slider ? false : true;

    let ultimaPosicionScroll = 0;
    const alturaPantalla = window.innerHeight;
    const anchoPantalla = window.innerWidth;
    const anchuraMinimaPantallaScroll = 480;
    const alturaMinimaPantallaScroll = 700;

    const cambiarEstiloHeader = () => {
        header.classList.toggle(stateHeaderPrimary, changeStyleHeader);
    };

    const mostrarBarraBusqueda = () => {
        barraBusqueda.classList.add(stateSearchBarVisible);
        txtBuscarRopa.focus();
    };

    const cerrarBarraBusqueda = () => {
        barraBusqueda.classList.remove(stateSearchBarVisible);
    };

    const switchNav = () => {
        navHeader.classList.toggle(stateNavVisible);
    };

    const switchMenuUsuario = () => {
        menuUsuarioHeader?.classList.toggle(stateUsuarioHeaderVisible);
    };

    const buscarProducto = () => {
        const query = txtBuscarRopa.value.toLowerCase().trim();
        const search_query = document.querySelector('#search_query');

        if (!search_query) {
            return window.location.href = `/catalogo?search=${encodeURIComponent(query)}`;
        }

        filtrarProductoPorNombre(query);
    };

    const agregarScrollHeader = () => {
        if (anchoPantalla > anchuraMinimaPantallaScroll && alturaPantalla > alturaMinimaPantallaScroll) {
            const scrollActual = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollActual > ultimaPosicionScroll && scrollActual > 0) {
                // header.classList.remove(stateHeaderScrollVisible);
                header.classList.add(stateHeaderPrimary);
            }

            // if (scrollActual < ultimaPosicionScroll) {
            //     header.classList.add(stateHeaderScrollVisible, stateHeaderPrimary);
            // }

            if (scrollActual < (alturaPantalla / 2)) {
                // header.classList.remove(stateHeaderScrollVisible);
                // header.classList.toggle(stateHeaderPrimary, changeStyleHeader);
                header.classList.toggle(stateHeaderPrimary, changeStyleHeader);
            }

            ultimaPosicionScroll = Math.max(scrollActual, 0);
        }
    };

    const actualizarBadge = () => {
        let cantidadItemsCarrito = 0;
        for (let key in sessionStorage) {
            if (key.includes('item_')) {
                cantidadItemsCarrito++;
            }
        }
        badge.textContent = cantidadItemsCarrito;
    }

    cambiarEstiloHeader();
    actualizarBadge();

    btnMostrarHeader?.addEventListener('click', switchNav);
    btnOcultarHeader?.addEventListener('click', switchNav);
    btnMostrarBarraBusqueda?.addEventListener('click', mostrarBarraBusqueda);
    btnCerrarBarraBusqueda?.addEventListener('click', cerrarBarraBusqueda);
    btnUsuarioHeader?.addEventListener('click', switchMenuUsuario);
    btnBuscarRopa?.addEventListener('click', buscarProducto);
    txtBuscarRopa?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') buscarProducto();
    });

    window.addEventListener('scroll', agregarScrollHeader);
    window.addEventListener('orientationchange', agregarScrollHeader);
});
