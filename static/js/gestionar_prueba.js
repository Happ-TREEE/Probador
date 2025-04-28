document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('#dlgProducto');
    const txtCodigoProducto = document.querySelector('#txtCodigoProducto');
    const btnBuscarModal = document.querySelector('#btnBuscarModal');
    const btnAñadir = document.querySelector('#btnAñadir');
    const btnCerrarModal = document.querySelector('#btnCerrarModal');
    const chkColumna = document.querySelector('#chkColumna');
    const chksFilas = document.querySelectorAll('#tblTabla .admin-table__tbody .admin-form__input--checkbox');
    const btnsEdits = document.querySelectorAll('.admin-table__tbody .admin-form__button--edit');
    const htmlFilasTabla = document.querySelectorAll(".admin-table__tbody .admin-table__row");

    if (btnAñadir) {
        btnAñadir.addEventListener('click', () => {
            modal.showModal();
        })
    }

    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', () => {
            modal.close();
        })
    }

    if (chkColumna) {
        chkColumna.addEventListener('change', () => {
            var isChecked = chkColumna.checked;
            chksFilas.forEach(chk => chk.checked = isChecked)
        });
    }

    if (btnsEdits.length > 0) {
        btnsEdits.forEach(btnEdit => {
            var codFila = btnEdit.dataset.id;
            btnEdit.addEventListener('click', (e) => {
                e.preventDefault();
                añadirDatosModal(modal, codFila, txtCodigoProducto, btnBuscarModal);
            });
        });
    }


    function añadirDatosModal(modal, codigo, input, button) {
        if (modal && codigo && input && button) {
            modal.showModal();
            input.value = codigo;
            button.click();
        }
    }
});