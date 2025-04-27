// import { activarUnoDelGrupo, alternarClasePorEvento } from './utilities.js';

// document.addEventListener('DOMContentLoaded', () => {
//     const headerLogo = document.querySelector('#header_logo');
//     const headerNavMain = document.querySelector('#header_nav_main');
//     const headerNavUser = document.querySelector('#header_nav_user');
//     const btn_headerNavMain = document.querySelector('#btn_header_nav_main');
//     const btn_headerNavUser = document.querySelector('#btn_header_nav_user');
//     const linksHeader = document.querySelectorAll('.header__nav--main>.header__link');
//     const stateHeaderNav = "header__nav--active";
//     const stateHeaderLink = "header__link--active";

<<<<<<< HEAD
    // // Mostrar el menú de usuario cuando esté autenticado
    // const mostrarMenuUsuario = () => {
    //     headerNavUser.classList.add(stateHeaderNav);
    //     btn_headerNavUser.style.display = 'none';  // Oculta el botón de "Iniciar sesión"
    // }

    // // Ocultar el menú de usuario cuando cierre sesión
    // const ocultarMenuUsuario = () => {
    //     headerNavUser.classList.remove(stateHeaderNav);
    //     btn_headerNavUser.style.display = 'inline-block';  // Muestra el botón de "Iniciar sesión"
    // }

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

    // Manejando cierre de sesión (suponiendo que en el backend gestionas esta ruta)
    // const logoutButton = document.querySelector('.logout_button');  // Cambia el selector si es necesario

    // if (logoutButton) {
    //     logoutButton.addEventListener('click', () => {
    //         // Eliminar los datos de sesión en el frontend
    //         sessionStorage.removeItem('usuario_autenticado');  // Elimina el estado de sesión
    //         ocultarMenuUsuario();  // Oculta el menú de usuario

    //         // Enviar solicitud al backend para limpiar la sesión
    //         fetch('/logout', { method: 'GET' })
    //             .then(() => {
    //                 window.location.href = '/inicio';  // Redirige al inicio después de que el servidor limpie la sesión
    //             })
    //             .catch((error) => {
    //                 console.error('Error al cerrar sesión:', error);
    //                 window.location.href = '/inicio';  // Redirige al inicio en caso de error
    //             });
    //     });
    // }
});
=======
//     // headerLogo.addEventListener('click', () => {
//     //     if (sessionStorage.getItem('activeLink')) {
//     //         sessionStorage.removeItem('activeLink');
//     //     }
//     // });

//     // alternarClasePorEvento(
//     //     btn_headerNavUser,
//     //     headerNavUser,
//     //     stateHeaderNav,
//     //     'click');

//     // Mostrar el menú de usuario cuando esté autenticado
//     const mostrarMenuUsuario = () => {
//         headerNavUser.classList.add(stateHeaderNav);
//         btn_headerNavUser.style.display = 'none';  // Oculta el botón de "Iniciar sesión"
//     }

//     // Ocultar el menú de usuario cuando cierre sesión
//     const ocultarMenuUsuario = () => {
//         headerNavUser.classList.remove(stateHeaderNav);
//         btn_headerNavUser.style.display = 'inline-block';  // Muestra el botón de "Iniciar sesión"
//     }

//     // Cambia el estado cuando se cierra sesión
//     if (sessionStorage.getItem('usuario_autenticado')) {
//         mostrarMenuUsuario();  // Si ya está autenticado, muestra el menú
//     } else {
//         ocultarMenuUsuario();  // Si no está autenticado, oculta el menú
//     }

//     // Llamada para el menú principal
//     alternarClasePorEvento(
//         btn_headerNavMain,
//         headerNavMain,
//         stateHeaderNav,
//         'click'
//     );

//     // Cambia el estado de los links del menú
//     activarUnoDelGrupo(linksHeader, stateHeaderLink, 'click');
    
//     // Manejando cierre de sesión (suponiendo que en el backend gestionas esta ruta)
//     const logoutButton = document.querySelector('.logout_button');  // Cambia el selector si es necesario

//     if (logoutButton) {
//         logoutButton.addEventListener('click', () => {
//             // Eliminar los datos de sesión en el frontend
//             sessionStorage.removeItem('usuario_autenticado');  // Elimina el estado de sesión
//             ocultarMenuUsuario();  // Oculta el menú de usuario
            
//             // Enviar solicitud al backend para limpiar la sesión
//             fetch('/logout', { method: 'GET' })
//                 .then(() => {
//                     window.location.href = '/inicio';  // Redirige al inicio después de que el servidor limpie la sesión
//                 })
//                 .catch((error) => {
//                     console.error('Error al cerrar sesión:', error);
//                     window.location.href = '/inicio';  // Redirige al inicio en caso de error
//                 });
//         });
//     }
// });
>>>>>>> 9e5392c4f94dabffa5e6f27ed2ae25ca75abf9c2
