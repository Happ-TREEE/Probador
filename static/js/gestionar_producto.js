import { mostrarModal } from './utilities.js';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('#dlgProducto');
    const txtCodigoProducto = document.querySelector('#txtCodigoProducto');
    const txtNombreProducto = document.querySelector('#txtNombreProducto');
    const cboCategoriaProducto = document.querySelector('#cboCategoriaProducto');
    const chkVigenciaProducto = document.querySelector('#chkVigenciaProducto');

    const btnBuscar = document.querySelector('#btnBuscar');
    const btnAñadir = document.querySelector('#btnAñadir');
    const btnVer = document.querySelectorAll(".admin__button--view");
    const btnEditar = document.querySelectorAll(".admin__button--edit");
    const btnEliminar = document.querySelectorAll(".admin__button--delete");
    const btnCerrarModal = document.querySelector('#btnCerrarModal');
    const btnRegistrar = modal.querySelector("#btnRegistrar");
    const btnModificar = modal.querySelector("#btnModificar");
    const btnLimpiar = modal.querySelector("#btnLimpiar");

    const stateButtonHidden = "admin__button--hidden";

    function fillModalData(row) {
        const codigo = row.querySelector('td[data-title="Código"]').textContent.trim();
        const nombre = row.querySelector('td[data-title="Nombre"]').textContent.trim();
        const categoria = row.querySelector('td[data-title="Categoria"]').textContent.trim();
        const vigencia = row.querySelector('td[data-title="Vigencia"] .admin-table__state').classList.contains('admin-table__state--active');


        txtCodigoProducto.value = codigo;
        txtNombreProducto.value = nombre;


        Array.from(cboCategoriaProducto.options).forEach(option => {
            if (option.text === categoria) {
                option.selected = true;
            }
        });


        chkVigenciaProducto.checked = vigencia;
    }


    btnEditar.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.dataset.id;
            const row = document.querySelector(`tr[data-id-row='${productId}']`);
            fillModalData(row);

            modal.showModal();
            setModalState("edit");
        });
    });


    btnVer.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.dataset.id;
            const row = document.querySelector(`tr[data-id-row='${productId}']`);
            fillModalData(row);

            modal.showModal();
            setModalState("view");
        });
    });


    btnAñadir.addEventListener("click", () => {
        modal.showModal();
        setModalState("add");
    });


    btnCerrarModal.addEventListener("click", () => {
        modal.close();
    });


    function setModalState(state) {
        [btnRegistrar, btnModificar, btnBuscar, btnLimpiar].forEach(button => {
            button.classList.add(stateButtonHidden);
        });

        switch (state) {
            case "add":
                btnBuscar.classList.remove(stateButtonHidden);
                btnRegistrar.classList.remove(stateButtonHidden);
                btnLimpiar.classList.remove(stateButtonHidden);
                btnLimpiar.click();
                break;
            case "view":
                btnCerrarModal.classList.remove(stateButtonHidden);
                break;
            case "edit":
                btnModificar.classList.remove(stateButtonHidden);
                btnLimpiar.classList.remove(stateButtonHidden);
                break;
        }
    }

    btnEliminar.forEach(button => {
        button.addEventListener('click', async () => {
            const respuesta = await mostrarModal('question', '¿Está seguro de eliminar este producto?');

            if (respuesta.confirmado) {
                const id = button.dataset.id;
                console.log(`El usuario confirmó la eliminación del item con ID = ${id}`);
            } else {
                console.log('El usuario canceló la acción');
            }
        });
    });

});