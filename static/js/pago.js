document.addEventListener('DOMContentLoaded', () => {
    const lblNombreCliente = document.querySelector('#lblNombreCliente');
    const slcTipoPersona = document.querySelector('#slcTipoPersona');
    const slcTipoDocumento = document.querySelector('#slcTipoDocumento');
    const slcMedioPago = document.querySelector('#slcMedioPago');
    const sectionTarjeta = document.querySelector('.pago__field-group[data-type-inputs = "tarjeta"]')
    const sectionBilleteraEletronica = document.querySelector('.pago__field-group[data-type-inputs = "billeteraElectronica"]');
    const btnCancelarCompra = document.querySelector('#btnCancelarCompra');
    const selects = document.querySelectorAll('.pago__select');
    const selectStateSelected = 'pago__select--selected';

    function switchInputsTipoPersona() {
        if (slcTipoPersona.value === '2') {
            lblNombreCliente.textContent = 'Razón social';
            slcTipoDocumento.value = '2';
            slcTipoDocumento.classList.add(selectStateSelected);
            return slcTipoDocumento.disabled = true;
        }

        lblNombreCliente.textContent = 'Nombres completos';
        slcTipoDocumento.value = '0';
        slcTipoDocumento.classList.remove(selectStateSelected);
        return slcTipoDocumento.disabled = false;
    }

    function switchPantallaMedioPago() {
        let ocultarPantalla = 'pago__field-group--hidden';
        let pagaraConTarjeta = slcMedioPago.value === '1';

        sectionTarjeta.classList.toggle(ocultarPantalla, !pagaraConTarjeta);
        sectionBilleteraEletronica.classList.toggle(ocultarPantalla, pagaraConTarjeta);
    }

    function switchSelectSeleccionados(select) {
        let tieneUnLabel = select.nextElementSibling.classList.contains('pago__label');
        let esOpcionValida = select.value !== '0';

        if (tieneUnLabel && !esOpcionValida) {
            select.classList.add(selectStateSelected);
            return select.value = '1';
        }

        return select.classList.toggle(selectStateSelected, esOpcionValida);
    }

    slcTipoPersona.addEventListener('change', () => { switchInputsTipoPersona() });
    slcMedioPago.addEventListener('change', () => { switchPantallaMedioPago() });

    selects.forEach(select => { select.addEventListener('focus', () => { switchSelectSeleccionados(select) }) });
    selects.forEach(select => { select.addEventListener('change', () => { switchSelectSeleccionados(select) }) });

    btnCancelarCompra.addEventListener('click', () => { window.history.back() });

    /* ----------------------------- LÓGICA DE PAGO ----------------------------- */
    const frmPago = document.querySelector('.pago__form');
    const modalBilletera = document.querySelector('.pago__modal');
    const inpCodigoVerificacion = modalBilletera?.querySelector('#inpCodigoVerificacion');
    const btnModalPagar = modalBilletera?.querySelector('#btnModalPagar');
    const btnModalCancelar = modalBilletera?.querySelector('#btnModalCancelar');

    function obtenerProductosDelCarrito() {
        const productos = [];
        for (let key in sessionStorage) {
            if (key.startsWith('item_')) {
                try {
                    const item = JSON.parse(sessionStorage.getItem(key));
                    if (item?.idCategoria) {
                        productos.push(item.idCategoria); // supondremos idCategoria == id_producto
                    }
                } catch (e) {
                    console.warn('Error leyendo item carrito', e);
                }
            }
        }
        return productos;
    }

    async function enviarPago(codigoVerificacion = null) {
        try {
            const payload = {
                numero_documento: document.querySelector('#inpTipoDocumento').value,
                tipo_documento: parseInt(slcTipoDocumento.value),
                tipo_persona: parseInt(slcTipoPersona.value),
                nombre_cliente: document.querySelector('#inpNombreCliente').value,
                email: document.querySelector('#inpCorreo').value,
                monto: parseFloat(document.querySelector('#lblMontoTotal').textContent) || 0,
                id_tipo_pago: slcMedioPago.value === '1' ? 2 : 4,
                medio: slcMedioPago.value === '1' ? 'TARJETA' :
                    (document.querySelector('input[name="billetera_electronica"]:checked')?.value === '1' ? 'YAPE' : 'PLIN'),
                productos: obtenerProductosDelCarrito(),
                codigo_verificacion: codigoVerificacion
            };

            const respuesta = await fetch('/pago/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await respuesta.json();
            if (data.success) {
                alert('¡Compra realizada con éxito!');
                sessionStorage.clear();
                window.location.href = '/';
            } else {
                alert('No se pudo procesar el pago. Intente nuevamente.');
            }
        } catch (error) {
            console.error(error);
            alert('Error de conexión.');
        }
    }

    frmPago.addEventListener('submit', (e) => {
        e.preventDefault();
        if (slcMedioPago.value === '1') { // Tarjeta
            enviarPago();
        } else { // Billetera
            modalBilletera.showModal();
        }
    });

    btnModalPagar?.addEventListener('click', () => {
        enviarPago(inpCodigoVerificacion.value);
        modalBilletera.close();
    });

    btnModalCancelar?.addEventListener('click', () => {
        modalBilletera.close();
    });

    // fin
});