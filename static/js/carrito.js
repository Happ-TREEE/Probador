document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector('.cart');
    const cart_body = document.querySelector('.cart__body');
    const headerBadge = document.querySelector('.header__button-badge');

    const btnMostrarCarrito = document.querySelector('#btnMostrarCarrito');
    const btnCerrarCarrito = document.querySelector('#btnCerrarCarrito');
    const btnVaciarCarrito = document.querySelector('#btnVaciarCarrito');
    const stateCartVisible = 'cart--visible';

    try {
        if (btnMostrarCarrito && btnCerrarCarrito) {
            btnMostrarCarrito.addEventListener('click', () => { cart.classList.add(stateCartVisible) });
            btnCerrarCarrito.addEventListener('click', () => { cart.classList.remove(stateCartVisible) });
        };

        function subirContadorBadgeHeader() {
            headerBadge.textContent = parseInt(headerBadge.textContent) + 1;
        }

        function bajarContadorBadgeHeader() {
            headerBadge.textContent = parseInt(headerBadge.textContent) - 1;
        }

        function modificarContadorBadgeHeader(cantidad) {
            headerBadge.textContent = cantidad;
        }

        function añadirFuncionalidadElementosItemCarrito() {
            var itemsCarrito = document.querySelectorAll('.cart__item');
            var btnsCambiarPrecioItemCarrito = document.querySelectorAll('.cart .cart__button-quantify');
            var btnsQuitarItemCarrito = document.querySelectorAll('.cart .cart__button-remove');
            var inputsCantidadItemCarrito = document.querySelectorAll('.cart .cart__input');

            btnVaciarCarrito.addEventListener('click', () => {
                itemsCarrito.forEach(item => { item.remove(); btnCerrarCarrito.click() });
                modificarContadorBadgeHeader(0);
            });

            btnsQuitarItemCarrito.forEach(btn => {
                btn.addEventListener('click', () => { btn.parentNode.remove(); bajarContadorBadgeHeader(); });
            });

            btnsCambiarPrecioItemCarrito.forEach(btn => {
                var itemCarrito = btn.closest('.cart__item');
                var inputItem = itemCarrito.querySelector('.cart__input');

                btn.addEventListener('click', () => {
                    var precioItem = parseInt(inputItem.value);

                    if (btn.dataset.action === 'sumar') {
                        inputItem.value = precioItem + 1;

                    } else {
                        inputItem.value = precioItem - 1;
                    }

                    if (parseInt(inputItem.value) === 0) {
                        itemCarrito.remove();
                        bajarContadorBadgeHeader();
                    }
                });
            });

            inputsCantidadItemCarrito.forEach(input => {
                input.addEventListener('input', () => { if (parseInt(input.value) === 0) { input.closest('.cart__item').remove() }; bajarContadorBadgeHeader() })
            });
        }

        function agregarItemCarrito(nombre, imagen, precio) {
            const itemCarrito =
                `
            <div class="cart__item">
                <img class="cart__item-img" src="/static/img/catalogo/${imagen}"
                    alt="Imagen producto carrito">
                <div class="cart__item-body">
                    <span class="cart__item-title">${nombre}</span>
                    <div class="cart__item-details-price">
                        <div class="cart__item-actions">
                            <button class="cart__button-quantify" data-action="restar">-</button>
                            <input class="cart__input" type="number" name="quantify-products" value="1">
                            <button class="cart__button-quantify" data-action="sumar">+</button>
                        </div>
                        <span class="cart__item-price">S/ ${precio}</span>
                    </div>
                </div>
                <button class="cart__button-remove">X</button>
            </div>
            `;

            cart_body.innerHTML += itemCarrito;
            subirContadorBadgeHeader();
            añadirFuncionalidadElementosItemCarrito();
        };

        agregarItemCarrito('Camisa blanca clásica', 'camisa_blanca_manga-larga_back.webp', '50.00');
        agregarItemCarrito('Camisa verde botella manga corta', 'camiseta_Verde_botella_manga-corta_back.webp', '30.00');

    } catch (error) {
        alert('Ocurrió un error al ejecutar la acción en el carrito');
        console.error('Ocurrió un error en el carrito: ', error)
        console.log(error);
    }
});