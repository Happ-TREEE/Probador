export class Carrito {
    static #contenedor = document.querySelector('.cart__body');
    static #badge = document.querySelector('.header__cart-badge');
    static #ultimoID = 0;

    constructor(nombre = '', precioUnitario = 0, cantidad = 0, talla = '', imagen = '') {
        this.ID = this.#generarID();
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.cantidad = cantidad;
        this.talla = talla;
        this.imagen = imagen;
        this.precioTotal = this.precioUnitario * this.cantidad;
    }

    #generarID() {
        return ++Carrito.#ultimoID;
    }

    insertar() {
        let detalle = {
            'ID': this.ID,
            'nombre': this.nombre,
            'imagen': this.imagen,
            'precioUnitario': this.precioUnitario,
            'cantidad': this.cantidad,
            'precioTotal': this.precioTotal,
            'talla': this.talla
        }
        sessionStorage.setItem(`item_${this.ID}`, JSON.stringify(detalle));
        Carrito.#badge.textContent++;
    }

    static eliminarItem(id) {
        sessionStorage.removeItem(`item_${id}`);
        Carrito.#badge.textContent--
    }

    static eliminarTodo() {
        for (let key in sessionStorage) {
            if (key.includes('item_')) {
                sessionStorage.removeItem(key);
            }
        }
        Carrito.#badge.textContent = 0;
        Carrito.#contenedor.innerHTML = '';
    }


    static modificarCantidad(id, nuevaCantidad) {
        let item = JSON.parse(sessionStorage.getItem(`item_${id}`));
        item.cantidad = nuevaCantidad;
        item.precioTotal = item.precioUnitario * nuevaCantidad;
        sessionStorage.setItem(`item_${id}`, JSON.stringify(item));
    }

    static #generarScriptHTML(ID, imagen, nombre, cantidad, precioUnitario, precioTotal, talla) {
        let ScriptHTML =
            `
            <div class="cart__item" id =${ID}>
                <img class="cart__img" src="/static/img/catalogo/${imagen}" alt="Foto producto">
                <div class="cart__product-field">
                    <span class="cart__name" data-title = '${nombre}'>${nombre}</span>
                    <span class="cart__price">${precioUnitario}</span>
                </div>
                <span class="cart__size">${talla}</span>
                <div class="cart__quantify">
                    <button class="cart__quantify-button cart__quantify-button--subtract">-</button>
                    <input class="cart__quantify-input" type="number" min="0" value=${cantidad}>
                    <button class="cart__quantify-button cart__quantify-button--add">+</button>
                </div>
                <span class="cart__subtotal">${precioTotal}</span>
                <button data-id = ${ID} class="cart__button-delete">
                    <img src="/static/img/iconos/icon_delete_black_solid.svg" alt="Eliminar">
                </button>
            </div>
        `;

        return new DOMParser().parseFromString(ScriptHTML, 'text/html').body.firstElementChild;
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
                    itemJSON.talla);
                Carrito.#contenedor.appendChild(nuevoItem);
            });
        } else {
            Carrito.#contenedor.innerHTML = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();

    const lblSubtotalCarrito = document.querySelector('#lblSubtotal');
    const btnVaciarCarrito = document.querySelector('#btnVaciarCarrito');
    const inputsCantidad = document.querySelectorAll('.cart__quantify-input');
    const botonesSumar = document.querySelectorAll('.cart__quantify-button--add');
    const botonesRestar = document.querySelectorAll('.cart__quantify-button--subtract');
    const botonesEliminar = document.querySelectorAll('.cart__button-delete');

    function actualizarCarrito() { Carrito.actualizarCarrito() }

    function vaciarCarrito() {
        Carrito.eliminarTodo();
        lblSubtotalCarrito.textContent = '0'
    }

    function eliminarItemCarrito(elemento) {
        let item = elemento.closest('.cart__item');
        let id = item.id;
        item.remove();
        Carrito.eliminarItem(id);
    }

    const actualizarSubtotalItem = (elemento) => {
        let item = elemento.closest('.cart__item');
        let id = item.id;
        let cantidad = parseInt(item.querySelector('.cart__quantify-input').value);
        let precio = parseFloat(item.querySelector('.cart__price').textContent);
        let precioTotal = item.querySelector('.cart__subtotal');
        precioTotal.textContent = cantidad * precio;
        Carrito.modificarCantidad(id, cantidad);
    };

    function actualizarSubtotalCarrito() {
        let lblsItemSubtotal = document.querySelectorAll('.cart__subtotal');
        lblSubtotalCarrito.textContent = !lblsItemSubtotal ? 0 : Array.from(lblsItemSubtotal).map(itemSubtotal => parseFloat(itemSubtotal.textContent) || 0).reduce((acumulado, valor) => acumulado + valor || 0, 0);
    };

    actualizarSubtotalCarrito();

    btnVaciarCarrito?.addEventListener('click', () => { vaciarCarrito() });

    inputsCantidad.forEach(input => {
        input.addEventListener('change', () => {
            actualizarSubtotalItem(input);
            actualizarSubtotalCarrito();

            if (input.value === '0' || input.value === '') {
                eliminarItemCarrito(input);
            }
        })
    });

    botonesEliminar?.forEach(boton => {
        boton.addEventListener('click', () => {
            eliminarItemCarrito(boton);
            actualizarSubtotalCarrito();
        });
    })

    botonesSumar?.forEach(boton => {
        boton.addEventListener('click', () => {
            boton.parentNode.querySelector('.cart__quantify-input').value++;
            actualizarSubtotalItem(boton);
            actualizarSubtotalCarrito();
        });
    });

    botonesRestar?.forEach(boton => {
        boton.addEventListener('click', () => {
            let input = boton.parentNode.querySelector('.cart__quantify-input');
            input.value--;
            actualizarSubtotalItem(boton);
            actualizarSubtotalCarrito();

            if (input.value === '0' || input.value === '') {
                eliminarItemCarrito(input);
            }
        });
    });

    const insertarItemPrueba = () => {
        var itemcarrito01 = new Carrito('Polo blanco básico', 20, 5, 'X', '16_frente.webp');
        var itemcarrito02 = new Carrito('Polo básico de Túcume', 20, 8, 'X', '18_frente.webp');
        var itemcarrito03 = new Carrito('Camisa de equipo técnico SIEM', 20, 10, 'X', '19_frente.webp');

        itemcarrito01.insertar();
        itemcarrito02.insertar();
        itemcarrito03.insertar();
    };

    insertarItemPrueba();
});