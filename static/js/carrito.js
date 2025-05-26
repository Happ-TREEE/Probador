export class ItemCarrito {
    static #contenedor = document.querySelector('.cart__body');
    static #badge = document.querySelector('.header__button-badge');
    static #ultimoID = 0;
    ID = 0;
    #itemHTML;
    #precioTotalItem = null;
    #puedeInsertarse = false;

    constructor(nombre = '', cantidad = 0, precio = 0, imagen = '', tallas = '') {
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

    #calcularTotalItem() {
        let totalTallas = Object.values(this.tallas).reduce((acc, cantidad) => acc + cantidad, 0);
        let precioTotal = totalTallas * this.precio;
        return precioTotal;
    }

    #crearItem() {
        ItemCarrito.#ultimoID += 1;
        this.ID = ItemCarrito.#ultimoID;
        let precioTotal = this.#calcularTotalItem();
        this.#itemHTML =
            `
        <div class="cart__item" id =${ItemCarrito.#ultimoID}>
                <img class="cart__item-img" src="/static/img/catalogo/${this.imagen}" alt="Imagen producto carrito">
                <div class="cart__item-product-details">
                    <span class="cart__item-title" data-title = '${this.nombre}' >${this.nombre}</span>
                    <span class="cart__item-quantify">${this.cantidad}</span>
                    <span class="cart__item-price">${precioTotal}</span>
                    <details class="cart__details">
                    <summary class="cart__summary">Tallas</summary>
                        <ul class="cart__list-sizes">
                        ${Object.entries(this.tallas).map(([talla, cantidad]) => `
                        <li class="cart__item-size">
                            <span class="cart__size">${talla}</span> 
                            <div class="cart__size-button-group">
                                <button class="cart__size-button" data-action = 'restar'>-</button>
                                <input class="cart__size-input"  type="number" value="${cantidad}">
                                <button class="cart__size-button" data-action = 'sumar'>+</button>
                            </div>
                        </li>
                    `).join('')}
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
            <hr>
        `;
    }

    insertar() {
        if (this.#puedeInsertarse) {
            const nuevoItem = (new DOMParser()).parseFromString(this.#itemHTML, 'text/html').body.firstElementChild;
            this.#precioTotalItem = nuevoItem.querySelector('.cart__item-price');

            ItemCarrito.#contenedor.appendChild(nuevoItem);
            let detalle = { 'precio': this.precio, 'cantidad': this.cantidad, 'tallas': this.tallas }
            sessionStorage.setItem(`item_${this.ID}`, JSON.stringify(detalle));

            this.#agregarEventosEliminar(nuevoItem);
            this.#agregarEventosModificar(nuevoItem);
            ItemCarrito.#modificarValorBadge(1);
        }
    }

    #agregarEventosEliminar(itemCarrito) {
        itemCarrito.querySelector('.cart__item-button[data-action="eliminar"]')?.addEventListener('click', () => {
            this.#eliminarDelCarrito(itemCarrito);
        });
    }

    #agregarEventosModificar(itemCarrito) {
        itemCarrito.querySelectorAll('.cart__size-input')?.forEach(input => {

            input.addEventListener('input', () => {
                if (input.value <= 0) input.value = 0;
                else input.value = parseInt(input.value);
                this.#precioTotalItem.textContent = this.#calcularTotalItem();
                ItemCarrito.#calcularTotal();
            });

            let botones = input.parentNode.querySelectorAll('.cart__size-button');

            botones?.forEach(boton => {
                boton.addEventListener('click', () => {
                    let accionBoton = boton.dataset.action;
                    let factor = accionBoton === 'sumar' ? 1 : -1;
                    let nuevoValor = parseInt(input.value) + factor;

                    if (nuevoValor >= 0) {
                        input.value = nuevoValor;
                        this.modificarCantidad(factor);
                        this.#calcularTotalItem();

                        if (this.cantidad === 0) this.#eliminarDelCarrito(itemCarrito);
                    }

                    ItemCarrito.#calcularTotal();
                });
            });
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

    static #calcularTotal() {
        let preciosItems = this.#contenedor.querySelectorAll('.cart__item-price');
        let subtotal = this.#contenedor.closest('.cart').querySelector('.cart__subtotal-price');
        let suma = preciosItems.reduce((acc, precio) => acc + precio, 0);
        subtotal.textContent = suma;
        alert(suma);
    }

    modificarCantidad(nuevaCantidad) {
        this.cantidad = nuevaCantidad === 0 ? 0 : parseInt(this.cantidad) + nuevaCantidad;
        let cantidadElemento = ItemCarrito.#contenedor.querySelector(`.cart__item-title[data-title="${this.nombre}"] + .cart__item-quantify`);
        if (cantidadElemento) { cantidadElemento.textContent = nuevaCantidad === 0 ? 0 : this.cantidad }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.querySelector('.cart');
    const btnMostrarCarrito = document.querySelector('#btnMostrarCarrito');
    const btnCerrarCarrito = document.querySelector('#btnCerrarCarrito');
    const btnVaciarCarrito = document.querySelector('#btnVaciarCarrito');
    const itemsCarrito = document.querySelectorAll('.cart__item');
    const carritoVisible = 'cart--visible';

    function mostrarCarrito(mostrar) { carrito.classList.toggle(carritoVisible, mostrar) }
    function vaciarCarrito() { ItemCarrito.eliminarTodo(); btnCerrarCarrito.click() }

    btnMostrarCarrito?.addEventListener('click', () => mostrarCarrito(true));
    btnCerrarCarrito?.addEventListener('click', () => mostrarCarrito(false));
    btnVaciarCarrito?.addEventListener('click', () => vaciarCarrito());

    let tallas = { 'XS': 5, 'S': 10, 'M': 5, 'L': 10, 'XL': 5, 'XXL': 10 };

    var itemcarrito01 = new ItemCarrito('Polo blanco básico', 45, 20, '16_frente.webp', tallas);
    var itemcarrito02 = new ItemCarrito('Polo básico de Túcume', 45, 20, '18_frente.webp', tallas);
    var itemcarrito03 = new ItemCarrito('Camisa de equipo técnico SIEM', 45, 20, '19_frente.webp', tallas);

    itemcarrito01.insertar();
    itemcarrito02.insertar();
    itemcarrito03.insertar();
});