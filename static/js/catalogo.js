const stateProductInvisible = "ctg__product--invisible";

document.addEventListener('DOMContentLoaded', () => {
    const listCategorias = document.querySelectorAll('.ctg__filters-value input[type="checkbox"]');
    const productos = document.querySelectorAll('.ctg__product');
    var search_query = document.querySelector('#search_query');

    function obtenerCategoriasSeleccionadas() {
        return Array.from(listCategorias).filter(categoria => categoria.checked).map(categoria => categoria.value);
    }

    function switchVisibilidadProductos() {
        listCategorias.forEach((categoria, index) => {
            categoria.addEventListener('change', () => {
                if (index === 0) {
                    Array.from(listCategorias).map(categoria => categoria.checked = false);
                    Array.from(productos).map(producto => producto.classList.remove(stateProductInvisible));
                    return categoria.checked = true;
                }

                let categoriasSeleccionadas = obtenerCategoriasSeleccionadas();

                productos.forEach(producto => {
                    let categoriaProducto = producto.dataset.categoria.trim();
                    let estaSeleccionada = categoriasSeleccionadas.includes(categoriaProducto);
                    producto.classList.toggle(stateProductInvisible, !estaSeleccionada);
                });
            });
        });
    }

    if (search_query) filtrarProductoPorNombre(search_query.textContent);
    switchVisibilidadProductos();
});

export function filtrarProductoPorNombre(nombreProducto = '') {
    const productos = document.querySelectorAll('.ctg__product');
    const query = nombreProducto.toLowerCase();

    productos.forEach(producto => {
        const productName = producto.querySelector('.ctg__product-name').textContent.toLowerCase();
        const isMatch = productName.includes(query);
        producto.classList.toggle(stateProductInvisible, !isMatch);
    });
}
