export class ItemCarrito {

    static #contenedor = document.querySelector('.cart__body');
    static #badge = document.querySelector('.header__button-badge');
    #itemHTML;
    #puedeInsertarse = false;

    constructor(nombre = '', cantidad = 0, imagen = '') {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.imagen = imagen;
        this.#verificarParametros();
    }

    #verificarParametros() {
        this.#puedeInsertarse = this.nombre && this.cantidad && this.imagen;
        if (this.#puedeInsertarse) { this.#crearItem() };
    }

    #crearItem() {
        this.#itemHTML =
            `
        <div class="cart__item" id = ${this.id}>
                <img class="cart__item-img" src="/static/img/catalogo/${this.imagen}" alt="Imagen producto carrito">
                <div class="cart__item-product-details">
                    <span class="cart__item-title" data-title = '${this.nombre}' >${this.nombre}</span>
                    <span class="cart__item-quantify">${this.cantidad}</span>
                </div>
                <div class="cart__item-button-group">
                    <button class="cart__item-button" data-action='editar' popovertarget="modalCarrito">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="cart__item-button" data-action='eliminar'>
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    insertarEnCarrito() {
        if (this.#puedeInsertarse) {
            const nuevoItem = (new DOMParser()).parseFromString(this.#itemHTML, 'text/html').body.firstElementChild;
            ItemCarrito.#contenedor.appendChild(nuevoItem);

            this.#agregarEventosEliminar(nuevoItem);
            ItemCarrito.#modificarValorBadge(1);
        }
    }

    #agregarEventosEliminar(itemCarrito) {
        itemCarrito.querySelector('.cart__item-button[data-action="eliminar"]')?.addEventListener('click', () => {
            this.#eliminarDelCarrito(itemCarrito);
        });
    }

    #eliminarDelCarrito(itemCarrito) {
        itemCarrito.remove();
        ItemCarrito.#modificarValorBadge(-1);
    }

    static eliminarTodo() {
        ItemCarrito.#contenedor.querySelectorAll('.cart__item').forEach(item => item.remove());
        ItemCarrito.#modificarValorBadge(0);
    }

    static #modificarValorBadge(valor) {
        ItemCarrito.#badge.textContent = valor === 0 ? 0 : parseInt(ItemCarrito.#badge.textContent) + valor;
    }

    cambiarCantidad(nuevaCantidad) {
        this.cantidad = nuevaCantidad;
        let cantidadElemento = ItemCarrito.#contenedor.querySelector(`.cart__item-title[data-title="${this.nombre}"] + .cart__item-quantify`);
        if (cantidadElemento) { cantidadElemento.textContent = nuevaCantidad };
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.querySelector('.cart');
    const btnMostrarCarrito = document.querySelector('#btnMostrarCarrito');
    const btnCerrarCarrito = document.querySelector('#btnCerrarCarrito');
    const btnVaciarCarrito = document.querySelector('#btnVaciarCarrito');
    const carritoVisible = 'cart--visible';

    function mostrarCarrito(mostrar) { carrito.classList.toggle(carritoVisible, mostrar) }
    function vaciarCarrito() { ItemCarrito.eliminarTodo(); btnCerrarCarrito.click() }

    btnMostrarCarrito?.addEventListener('click', () => mostrarCarrito(true));
    btnCerrarCarrito?.addEventListener('click', () => mostrarCarrito(false));
    btnVaciarCarrito?.addEventListener('click', () => vaciarCarrito());

    var itemcarrito01 = new ItemCarrito('Producto 01', 5, '16_frente.webp');
    var itemcarrito02 = new ItemCarrito('Producto 02', 7, '16_frente.webp');
    var itemcarrito03 = new ItemCarrito('Producto 03', 8, '16_frente.webp');
    var itemcarrito04 = new ItemCarrito('Producto 04', 4, '16_frente.webp');
    var itemcarrito05 = new ItemCarrito();

    itemcarrito01.insertarEnCarrito();
    itemcarrito02.insertarEnCarrito();
    itemcarrito03.insertarEnCarrito();
    itemcarrito04.insertarEnCarrito();
    itemcarrito05.insertarEnCarrito();
});



