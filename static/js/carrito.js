export class ItemCarrito {
    static #contenedor = document.querySelector('.cart__body');
    static #badge = document.querySelector('.header__button-badge');
    static #ultimoID = 0;
    ID = 0;
    #itemHTML;
    #puedeInsertarse = false;

    constructor(nombre = '', cantidad = 0, precio = 0, imagen = '', tallas) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;
        this.tallas = tallas;
        this.#verificarParametros();
    }

    #verificarParametros() {
        this.#puedeInsertarse = this.nombre && this.cantidad && this.imagen && this.tallas;
        if (this.#puedeInsertarse) { this.#crearItem() };
    }

    #crearItem() {
        ItemCarrito.#ultimoID += 1;
        this.ID = ItemCarrito.#ultimoID;
        this.#itemHTML =
            `
        <div class="cart__item" id =${ItemCarrito.#ultimoID}>
                <img class="cart__item-img" src="/static/img/catalogo/${this.imagen}" alt="Imagen producto carrito">
                <div class="cart__item-product-details">
                    <span class="cart__item-title" data-title = '${this.nombre}' >${this.nombre}</span>
                    <span class="cart__item-quantify">${this.cantidad}</span>
                    <span class="cart__item-price">${this.precio}</span>
                    <details class="cart__details">
                        <summary class="cart__summary">Tallas</summary>
                        <ul class="cart__list-sizes">
                            <li class="cart__size">1</li>
                            <li class="cart__size">2</li>
                            <li class="cart__size">3</li>
                            <li class="cart__size">4</li>
                            <li class="cart__size">5</li>
                        </ul>
                    </details>
                </div>
                <div class="cart__item-button-group">
                    <button class="cart__item-button" data-action='eliminar'>
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                <div style='>
            </div>
        `;
    }

    insertar() {
        if (this.#puedeInsertarse) {
            const nuevoItem = (new DOMParser()).parseFromString(this.#itemHTML, 'text/html').body.firstElementChild;

            ItemCarrito.#contenedor.appendChild(nuevoItem);
            sessionStorage.setItem(`item_${this.ID}`, JSON.stringify(this.tallas));

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
        sessionStorage.removeItem(`item_${this.ID}`);
        ItemCarrito.#modificarValorBadge(-1);
    }

    static eliminarTodo() {
        ItemCarrito.#contenedor.querySelectorAll('.cart__item').forEach(item => item.remove());
        for (let key in sessionStorage) {
            if (key.includes('item_')) {
                sessionStorage.removeItem(key);
            }
        }
        ItemCarrito.#modificarValorBadge(0);
    }

    static #modificarValorBadge(valor) {
        ItemCarrito.#badge.textContent = valor === 0 ? 0 : parseInt(ItemCarrito.#badge.textContent) + valor;
    }

    modificarCantidad(nuevaCantidad) {
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
    const bodyModalCarrito = document.querySelector('#modalCarrito tbody');
    const carritoVisible = 'cart--visible';
    const scriptHTMLTalla = (talla) => {
        return
        `
    <tr>
        <td>
            <label for="quantify_2" class="mdlcart__talla">GA</label>
        </td>
        <td>
            <div class="mdlcart__button-quantify-group">
                <button class="mdlcart__button-quantify">-</button>
                <input class="mdlcart__input" type="number" id="quantify_2"
                    data-talla="2" min="0" value="0">
                <button class="mdlcart__button-quantify">+</button>
            </div>
        </td>
    </tr>
    `};

    function mostrarCarrito(mostrar) { carrito.classList.toggle(carritoVisible, mostrar) }
    function vaciarCarrito() { ItemCarrito.eliminarTodo(); btnCerrarCarrito.click() }
    function mostrarModalDetallesItem(tallas_item) {
        tallas_item.forEach(talla => {
            const nuevaTalla = (new DOMParser()).parseFromString(scriptHTMLTalla, 'text/html').body.firstElementChild;
            bodyModalCarrito.appendChild(nuevaTalla);
        });
    }

    btnMostrarCarrito?.addEventListener('click', () => mostrarCarrito(true));
    btnCerrarCarrito?.addEventListener('click', () => mostrarCarrito(false));
    btnVaciarCarrito?.addEventListener('click', () => vaciarCarrito());

    let tallas = {'S':5, 'X':10};

    var itemcarrito01 = new ItemCarrito('Polo blanco básico', 5, 20, '16_frente.webp', tallas);
    var itemcarrito02 = new ItemCarrito('Polo básico de Túcume', 7, 20, '18_frente.webp', tallas);
    var itemcarrito03 = new ItemCarrito('Camisa de equipo técnico SIEM', 8, 20, '19_frente.webp', tallas);

    itemcarrito01.insertar();
    itemcarrito02.insertar();
    itemcarrito03.insertar();
});