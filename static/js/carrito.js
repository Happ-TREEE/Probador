export class Carrito {
    static #contenedor = document.querySelector('.cart__body');
    static #badge = document.querySelector('.header__cart-badge');
    static #ultimoID = 0;

    constructor(nombre = '', precioUnitario = 0, imagen = '', dictTallas = '') {
        this.ID = this.#generarID();
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.imagen = imagen;
        this.tallas = dictTallas;
        this.cantidad = this.#calcularCantidad(dictTallas);
        this.precioTotal = this.precioUnitario * this.cantidad;
    }

    #calcularCantidad(dictTallas) {
        return Object.values(dictTallas).reduce((acc, value) => acc + value, 0);
    }

    #generarID() {
        Carrito.#ultimoID += 1;
        return Carrito.#ultimoID;
    }

    insertar() {
        let detalle = {
            'ID': this.ID,
            'nombre': this.nombre,
            'imagen': this.imagen,
            'precioUnitario': this.precioUnitario,
            'cantidad': this.cantidad,
            'precioTotal': this.precioTotal,
            'tallas': this.tallas
        }
        sessionStorage.setItem(`item_${this.ID}`, JSON.stringify(detalle));
        Carrito.#badge.textContent++;
    }

    static eliminarItem(id) {
        sessionStorage.removeItem(`item_${id}`);
        Carrito.#badge.textContent--
    }

    static #generarScriptHTML(ID, imagen, nombre, cantidad, precioUnitario, precioTotal, tallas) {
        let ScriptHTML =
            `
            <div class="cart__item" id =${ID}>
                <img class="cart__img" src="/static/img/catalogo/${imagen}" alt="Foto producto">
                <div class="cart__product-field">
                    <span class="cart__name" data-title = '${nombre}'>${nombre}</span>
                    <span class="cart__price">${precioUnitario}</span>
                </div>
                <details class="cart__size-details">
                    <summary class="cart__size-title">Tallas</summary>
                    <ul class="cart__size-list">
                        ${Object.entries(tallas).map(([talla, cantidad]) => `
                            <li class="cart__size-item">
                                <span class="cart__size-name">${talla}</span>
                                <input class="cart__size-input" type="number" min="0" value="${cantidad}">
                            </li>
                        `).join('')}
                    </ul>
                </details>
                <span class="cart__quantify">${cantidad}</span>
                <span class="cart__subtotal">${precioTotal}</span>
                <button data-id = ${ID} class="cart__button-delete">
                    <img src="/static/img/iconos/icon_delete_black_solid.svg" alt="Eliminar">
                </button>
            </div>
        `;

        return new DOMParser().parseFromString(ScriptHTML, 'text/html').body.firstElementChild;
    }

    static eliminarTodo() {
        for (let key in sessionStorage) {
            if (key.includes('item_')) {
                sessionStorage.removeItem(key);
            }
        }
        Carrito.#badge.textContent = 0;
        Carrito.actualizarCarrito();
    }

    static #obtenerCarrito() {
        let carrito = [];
        for (let key in sessionStorage) {
            if (key.includes('item_')) {
                carrito.push(sessionStorage.getItem(key));
            }
        }
        return carrito;

    }

    static actualizarCarrito() {
        let carrito = Carrito.#obtenerCarrito();

        if (carrito.length > 0) {
            Carrito.#badge.textContent = carrito.length;
            Carrito.#contenedor.innerHTML = '';
            carrito.forEach(item => {
                let itemJSON = JSON.parse(item);
                let nuevoItem = Carrito.#generarScriptHTML(
                    itemJSON.ID,
                    itemJSON.imagen,
                    itemJSON.nombre,
                    itemJSON.cantidad,
                    itemJSON.precioUnitario,
                    itemJSON.precioTotal,
                    itemJSON.tallas);
                Carrito.#contenedor.appendChild(nuevoItem);
            });
        } else {
            Carrito.#contenedor.innerHTML = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnVaciarCarrito = document.querySelector('#btnVaciarCarrito');

    function actualizarCarrito() { Carrito.actualizarCarrito() }
    function vaciarCarrito() { Carrito.eliminarTodo() }
    function eliminarItemCarrito(id) { Carrito.eliminarItem(id) }

    actualizarCarrito();
    const botonesEliminar = document.querySelectorAll('.cart__button-delete');


    btnVaciarCarrito?.addEventListener('click', () => vaciarCarrito());
    botonesEliminar?.forEach(boton => {
        boton.addEventListener('click', () => {
            boton.closest('.cart__item').remove();
            eliminarItemCarrito(boton.dataset.id);
        });
    });

    let tallas = { 'XS': 5, 'S': 10, 'M': 5, 'L': 10, 'XL': 5, 'XXL': 10 };

    // var itemcarrito01 = new Carrito('Polo blanco básico', 20, '16_frente.webp', tallas);
    // var itemcarrito02 = new Carrito('Polo básico de Túcume', 20, '18_frente.webp', tallas);
    // var itemcarrito03 = new Carrito('Camisa de equipo técnico SIEM', 20, '19_frente.webp', tallas);

    // itemcarrito01.insertar();
    // itemcarrito02.insertar();
    // itemcarrito03.insertar();
});