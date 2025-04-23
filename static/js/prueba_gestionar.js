import { inicializarDataTableConFiltros } from "./utilities.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log('Script cargado correctamente');
    const form__table = document.querySelector('#form__table');
    console.log(form__table);  // Asegúrate de que la tabla esté siendo seleccionada correctamente
    inicializarDataTableConFiltros(form__table);
});