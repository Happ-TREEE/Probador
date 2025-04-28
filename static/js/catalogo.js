import { activarUnoDelGrupo } from './utilities.js';

document.addEventListener('DOMContentLoaded', () => {
    const listCategorias = document.querySelectorAll('.catalog__category');
    const productos = document.querySelectorAll('.catalog__product');
    const stateCatalogCategory = "catalog__category--active";
    const stateProductInvisible = "catalog_product--invisible";

    activarUnoDelGrupo(listCategorias, stateCatalogCategory, 'click');

    listCategorias.forEach((categoria, index) => {
        categoria.addEventListener('click', () => {
            let nombre_categoria = categoria.textContent.trim();

            if (index === 0) {
                return productos.forEach(producto => {
                    producto.classList.remove(stateProductInvisible);
                });
            }

            productos.forEach(producto => {
                let categoria_producto = producto.dataset.categoria;

                if (nombre_categoria !== categoria_producto) {
                    producto.classList.add(stateProductInvisible);

                } else {
                    producto.classList.remove(stateProductInvisible);
                }
            });
        });
    });
});