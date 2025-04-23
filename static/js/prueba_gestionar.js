import { inicializarDataTableConFiltros } from "./utilities.js";

document.addEventListener('DOMContentLoaded', () => {
    const btnShowModal = document.querySelector('#btnShowModal');
    const btnCloseModal = document.querySelector('#btnCloseModal');
    const mdlProductos = document.querySelector('#mdlProductos');
    const tblProductos = document.querySelector('#tblProductos');
    const listBtnsEdit = document.querySelectorAll('.form__button--edit');

    inicializarDataTableConFiltros(tblProductos);

    btnShowModal.addEventListener('click', (e) => {
        e.preventDefault();
        mdlProductos.showModal();
    });

    btnCloseModal.addEventListener('click', (e) => {
        e.preventDefault();
        mdlProductos.close();
    });

    listBtnsEdit.forEach(btnEdit =>{
        btnEdit.addEventListener('click', (e)=>{
            e.preventDefault();
            mdlProductos.showModal();
        });
    });
});