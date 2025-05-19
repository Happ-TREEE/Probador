document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector('.cart');
    const cart_body = document.querySelector('.cart__body');
    const headerBadge = document.querySelector('.header__button-badge');
    const btnMostrarCarrito = document.querySelector('#btnMostrarCarrito');
    const btnCerrarCarrito = document.querySelector('#btnCerrarCarrito');
    const btnVaciarCarrito = document.querySelector('#btnVaciarCarrito');
    const precioSubtotal = document.querySelector('.cart__subtotal-price');
    const stateCartVisible = 'cart--visible';

    try {
        const toggleCartVisibility = (action) => {
            if (action === 'show') cart.classList.add(stateCartVisible);
            else cart.classList.remove(stateCartVisible);
        };

        btnMostrarCarrito?.addEventListener('click', () => toggleCartVisibility('show'));
        btnCerrarCarrito?.addEventListener('click', () => toggleCartVisibility('hide'));

        const updateBadge = (amount) => {
            headerBadge.textContent = amount;
        };

        const updateSubtotal = () => {
            const sumaPrecios = Array.from(cart.querySelectorAll('.cart__item-price'))
                .reduce((acc, precioItem) => acc + parseFloat(precioItem.textContent), 0);
            precioSubtotal.textContent = sumaPrecios.toFixed(2);
        };

        const handleQuantityChange = (btn) => {
            const itemCarrito = btn.closest('.cart__item');
            const inputItem = itemCarrito.querySelector('.cart__input');
            const precioItem = itemCarrito.querySelector('.cart__item-price--static');
            const precioItemModificado = itemCarrito.querySelector('.cart__item-price');

            let cantidadItem = parseInt(inputItem.value);
            if (btn.dataset.action === 'sumar') cantidadItem += 1;
            else cantidadItem -= 1;

            inputItem.value = cantidadItem;
            precioItemModificado.textContent = (parseFloat(precioItem.textContent) * cantidadItem).toFixed(2);

            if (cantidadItem === 0) {
                itemCarrito.remove();
                updateBadge(parseInt(headerBadge.textContent) - 1);
            }

            updateSubtotal();
        };

        const removeItemFromCart = (btn) => {
            btn.closest('.cart__item').remove();
            updateBadge(parseInt(headerBadge.textContent) - 1);
            updateSubtotal();
        };

        const emptyCart = () => {
            cart.querySelectorAll('.cart__item').forEach(item => item.remove());
            updateBadge(0);
            updateSubtotal();
        };

        const addItemToCart = (nombre, imagen, precio) => {
            const itemCarrito = `
                <div class="cart__item">
                    <img class="cart__item-img" src="/static/img/catalogo/${imagen}" alt="Imagen producto carrito">
                    <div class="cart__item-body">
                        <span class="cart__item-title">${nombre}</span>
                        <div class="cart__item-details-price">
                            <div class="cart__item-actions">
                                <button class="cart__button-quantify" data-action="restar">-</button>
                                <input class="cart__input" type="number" name="quantify-products" value="1">
                                <button class="cart__button-quantify" data-action="sumar">+</button>
                            </div>
                            <span class="cart__item-price">${precio}</span>
                            <span class="cart__item-price--static">${precio}</span>
                        </div>
                    </div>
                    <button class="cart__button-remove">X</button>
                </div>
            `;
            cart_body.innerHTML += itemCarrito;
            updateBadge(parseInt(headerBadge.textContent) + 1);
            bindCartItemEvents();
        };

        const bindCartItemEvents = () => {
            cart.querySelectorAll('.cart__button-quantify').forEach(btn => {
                btn.removeEventListener('click', () => handleQuantityChange(btn));
                btn.addEventListener('click', () => handleQuantityChange(btn));
            });

            cart.querySelectorAll('.cart__button-remove').forEach(btn => {
                btn.removeEventListener('click', () => removeItemFromCart(btn));
                btn.addEventListener('click', () => removeItemFromCart(btn));
            });

            cart.querySelectorAll('.cart__input').forEach(input => {
                input.removeEventListener('input', handleInputQuantityChange);
                input.addEventListener('input', handleInputQuantityChange);
            });
        };

        const handleInputQuantityChange = (e) => {
            const input = e.target;
            const itemCarrito = input.closest('.cart__item');
            const precioItem = itemCarrito.querySelector('.cart__item-price--static');
            const precioItemModificado = itemCarrito.querySelector('.cart__item-price');

            if (parseInt(input.value) === 0) {
                itemCarrito.remove();
                updateBadge(parseInt(headerBadge.textContent) - 1);
            } else {
                precioItemModificado.textContent = (parseFloat(precioItem.textContent) * input.value).toFixed(2);
            }

            updateSubtotal();
        };

        btnVaciarCarrito.addEventListener('click', emptyCart);

        addItemToCart('Polo blanco clásico', '16_frente.webp', '30.00');
        
    } catch (error) {
        alert('Ocurrió un error al ejecutar la acción en el carrito');
        console.error('Ocurrió un error en el carrito: ', error);
    }
});
