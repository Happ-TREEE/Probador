import { añadir_quitar_clase_por_evento } from './utilities.js';

document.addEventListener('DOMContentLoaded', () => {
    const header_nav_main = document.querySelector('#header_nav_main');
    const header_nav_user = document.querySelector('#header_nav_user');
    const btn_header_nav_main = document.querySelector('#btn_header_nav_main');
    const btn_header_nav_user = document.querySelector('#btn_header_nav_user');
    const state_header_nav = "header__nav--active";

    añadir_quitar_clase_por_evento(
        btn_header_nav_user,
        header_nav_user,
        state_header_nav,
        'click');

    añadir_quitar_clase_por_evento(
        btn_header_nav_main,
        header_nav_main,
        state_header_nav,
        'click');
});