const modal = document.querySelector('#dlgProducto');
    const nav = document.querySelector('.admin-nav');
    const btnNavHeader = document.querySelector('#btnNavHeader');
    const txtCodigoProducto = document.querySelector('#txtCodigoProducto');
    const btnBuscarModal = document.querySelector('#btnBuscarModal');
    const btnAñadir = document.querySelector('#btnAñadir');
    const btnCerrarModal = document.querySelector('#btnCerrarModal');
    const chkColumna = document.querySelector('#chkColumna');
    const chksFilas = document.querySelectorAll('#tblTabla .admin-table__tbody .admin-form__input--checkbox');
    const btnsEdits = document.querySelectorAll('.admin-table__tbody .admin-form__button--edit');
    const htmlFilasTabla = document.querySelectorAll(".admin-table__tbody .admin-table__row");
    const stateNavCollapse = "admin-nav--collapse";

    btnNavHeader.addEventListener('click', () => {
        if (!nav.classList.contains(stateNavCollapse)) {
            return nav.classList.add(stateNavCollapse);
        }
        return nav.classList.remove(stateNavCollapse);
    });

    btnAñadir.addEventListener('click', () => {
        modal.showModal();
    })

    btnCerrarModal.addEventListener('click', () => {
        modal.close();
    })

    chkColumna.addEventListener('click', () => {
        var isChecked = chkColumna.checked;

        chksFilas.forEach(chkFila => {
            chkFila.checked = isChecked;
        })
    });

    btnsEdits.forEach(btnEdit => {
        var codFila = btnEdit.dataset.id;

        btnEdit.addEventListener('click', () => {
            añadirDatosModal(modal, codFila, txtCodigoProducto, btnEdit);
        });
    });

    function añadirDatosModal(modal, codigo, input, button) {
        modal.showModal();
        input.value = codigo;
        btnBuscarModal.click();
    }