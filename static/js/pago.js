document.addEventListener('DOMContentLoaded', () => {
    const lblNombreCliente = document.querySelector('#lblNombreCliente');
    const slcTipoPersona = document.querySelector('#slcTipoPersona');
    const slcTipoDocumento = document.querySelector('#slcTipoDocumento');
    const slcMedioPago = document.querySelector('#slcMedioPago');
    const sectionTarjeta = document.querySelector('.pago__field-group[data-type-inputs = "tarjeta"]')
    const sectionBilleteraEletronica = document.querySelector('.pago__field-group[data-type-inputs = "billeteraElectronica"]')
    const selects = document.querySelectorAll('.pago__select');
    const selectStateSelected = 'pago__select--selected';

    slcTipoPersona.addEventListener('change', () => {
        if (slcTipoPersona.value === '2') {
            lblNombreCliente.textContent = 'Razón social';
            slcTipoDocumento.value = '2';
            slcTipoDocumento.classList.add(selectStateSelected);
            return slcTipoDocumento.disabled = true;
        }

        lblNombreCliente.textContent = 'Nombres completos';
        slcTipoDocumento.classList.remove(selectStateSelected);
        return slcTipoDocumento.disabled = false;
    });

    slcMedioPago.addEventListener('change', () => {
        if (slcMedioPago.value === '1') {
            sectionTarjeta.classList.remove('pago__field-group--hidden');
            sectionBilleteraEletronica.classList.add('pago__field-group--hidden');

        } else {
            sectionTarjeta.classList.add('pago__field-group--hidden');
            sectionBilleteraEletronica.classList.remove('pago__field-group--hidden');
        }
    });

    selects.forEach(select => {
        select.addEventListener('change', () => {
            if (select.value !== '0') {
                select.classList.add(selectStateSelected);
            } else {
                select.classList.remove(selectStateSelected);
            }
        })
    });

    selects.forEach(select => {
        select.addEventListener('focus', () => {
            if (select.nextElementSibling.classList.contains('pago__label') && select.value === '0') {
                select.classList.add(selectStateSelected);
                select.value = '1';
            }
        })
    });
});