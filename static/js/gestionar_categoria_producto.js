import { mostrarModal } from './utilities.js';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('#dlgCategoria');
    const form = document.querySelector('#formCategoria');
    const modalAction = document.querySelector('#modalAction');

    const txtID = document.querySelector('#txtID');
    const txtNombre = document.querySelector('#txtNombreCategoria');
    const chkVigencia = document.querySelector('#chkVigenciaCategoria');

    const btnRegistrar = document.querySelector('#btnRegistrar');
    const btnModificar = document.querySelector('#btnModificar');
    const btnLimpiar = document.querySelector('#btnLimpiar');
    const btnCerrar = document.querySelector('#btnCerrarModal');
    const btnAnadir = document.querySelector('#btnAnadir');

    const botonesEliminar = document.querySelectorAll('.admin__button--delete');
    const botonesEditar = document.querySelectorAll('.admin__button--edit');
    const botonesVer = document.querySelectorAll('.admin__button--view');

    function limpiarFormulario() {
        form.reset();
    }

    function llenarFormulario(row) {
        txtID.value = row.dataset.id;
        txtNombre.value = row.children[0].textContent.trim();
        chkVigencia.checked = row.children[1].querySelector('.admin-table__state').classList.contains('admin-table__state--active');
    }

    function setEstadoModal(estado) {
        [btnRegistrar, btnModificar, btnLimpiar].forEach(btn => btn.classList.add('hidden'));

        switch (estado) {
            case 'add':
                modalAction.value = 'Registrar';
                btnRegistrar.classList.remove('hidden');
                btnLimpiar.classList.remove('hidden');
                limpiarFormulario();
                break;
            case 'edit':
                modalAction.value = 'Modificar';
                btnModificar.classList.remove('hidden');
                btnLimpiar.classList.remove('hidden');
                break;
            case 'view':
                break;
        }
    }

    // Función para manejar el envío del formulario (registrar y modificar)
    async function enviarFormulario() {
        const accion = modalAction.value;
        const formData = new FormData(form);
        formData.append('accion', accion);
        formData.append('vigencia', chkVigencia.checked ? 'vigente' : 'no_vigente');
        if (txtID.value) {
            formData.append('id', txtID.value);
        }

        try {
            const response = await fetch('/accion_categoria', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error();

            const data = await response.json();
            await mostrarModal('success', data.mensaje);
            location.reload();
            
        } catch (error) {
            await mostrarModal('error', 'Ocurrió un error al ' + accion.toLowerCase() + ' la categoría.');
        }
    }

    // Abrir modal para añadir
    btnAnadir.addEventListener('click', () => {
        setEstadoModal('add');
        modal.showModal();
    });

    // Editar
    botonesEditar.forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            llenarFormulario(row);
            setEstadoModal('edit');
            modal.showModal();
        });
    });

    // Ver
    botonesVer.forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            llenarFormulario(row);
            setEstadoModal('view');
            modal.showModal();
        });
    });

    // Cerrar modal
    btnCerrar.addEventListener('click', () => modal.close());

    // Enviar formulario al registrar
    btnRegistrar.addEventListener('click', enviarFormulario);

    // Enviar formulario al modificar
    btnModificar.addEventListener('click', enviarFormulario);

    // Eliminar con confirmación
    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const confirmacion = await mostrarModal('question', '¿Está seguro de eliminar esta categoría?');
            if (!confirmacion.confirmado) return;

            const formData = new FormData();
            formData.append('id', id);

            try {
                const response = await fetch('/eliminar_categoria', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) throw new Error();

                const data = await response.json(); // Espera una respuesta JSON del servidor
                await mostrarModal('success', data.mensaje);
                location.reload();
            } catch (err) {
                await mostrarModal('error', 'Ocurrió un error al eliminar la categoría.');
            }
        });
    });
});