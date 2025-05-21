document.addEventListener('DOMContentLoaded', () => {
    const lblNombreCliente = document.querySelector('#lblNombreCliente');
    const slcTipoPersona = document.querySelector('#slcTipoPersona');
    const slcTipoDocumento = document.querySelector('#slcTipoDocumento');
    const slcMedioPago = document.querySelector('#slcMedioPago');
    const sectionTarjeta = document.querySelector('.pago__field-group[data-type-inputs = "tarjeta"]')
    const sectionBilleteraEletronica = document.querySelector('.pago__field-group[data-type-inputs = "billeteraElectronica"]')
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
});