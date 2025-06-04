const stateCatalogCategory = "catalog__category--active";
const stateProductInvisible = "catalog_product--invisible";

document.addEventListener('DOMContentLoaded', () => {
    const listCategorias = document.querySelectorAll('.catalog__category');
    const productos = document.querySelectorAll('.catalog__product');

    listCategorias.forEach((categoria, index) => {
        categoria.addEventListener('click', () => {
            const nombre_categoria = categoria.textContent.trim();
            
            listCategorias.forEach(c => c.classList.toggle(stateCatalogCategory, c === categoria));
            
            productos.forEach(producto => {
                const categoria_producto = producto.dataset.categoria.trim();
                const isMatchingCategory = nombre_categoria === categoria_producto || index === 0;
                producto.classList.toggle(stateProductInvisible, !isMatchingCategory);
            });
        });
    });
});

export function filtrarProductoPorNombre(nombreProducto = '') {
    const productos = document.querySelectorAll('.catalog__product');
    const query = nombreProducto.toLowerCase();

    productos.forEach(producto => {
        const productName = producto.querySelector('.catalog__product-name').textContent.toLowerCase();
        const isMatch = productName.includes(query);
        producto.classList.toggle(stateProductInvisible, !isMatch);
    });
}
