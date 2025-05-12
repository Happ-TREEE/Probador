import { activarUnoDelGrupo } from './utilities.js';

const stateCatalogCategory = "catalog__category--active";
const stateProductInvisible = "catalog_product--invisible";

document.addEventListener('DOMContentLoaded', () => {
    const listCategorias = document.querySelectorAll('.catalog__category');
    const productos = document.querySelectorAll('.catalog__product');
    const search_query = document.querySelector('#search_query');

    if (search_query) { filtrarProductoPorNombre(search_query.textContent) };

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
                let categoria_producto = producto.dataset.categoria.trim();

                if (nombre_categoria !== categoria_producto) {
                    producto.classList.add(stateProductInvisible);

                } else {
                    producto.classList.remove(stateProductInvisible);
                }
            });
        });
    });
});

export function filtrarProductoPorNombre(nombreProducto) {
    const productos = document.querySelectorAll('.catalog__product');

    if (nombreProducto.length === 0) {
        return productos.forEach(producto => { producto.classList.remove(stateProductInvisible) });
    }

    return productos.forEach(producto => {
        if (!producto.querySelector('.catalog__product-name').textContent.toLocaleLowerCase().includes(nombreProducto.toLocaleLowerCase())) {
            producto.classList.add(stateProductInvisible);

        } else {
            producto.classList.remove(stateProductInvisible);
        }
    });
}