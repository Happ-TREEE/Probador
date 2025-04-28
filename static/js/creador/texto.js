export function loadTexto() {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
        <h3>Agregar o Modificar Texto</h3>
        <div class="input-container" style="display: flex; align-items: center;">
            <input type="text" id="textInputEditor" class="form-control mb-3" placeholder="Escribe aquí" style="flex-grow: 1;">
            <button id="addTextButton" class="btn btn-primary mb-3" style="margin-left: 10px;">+</button>
        </div>
        <!-- Cambiar fuente -->
        <div class="mb-3">
            <label style="font-weight: bold;">Change Font</label>
            <select id="fontSelector" class="form-select">
                <option value="Arial" selected>Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
                <option value="Avenir Bold Condensed">Avenir Bold Condensed</option>
            </select>
        </div>
        <!-- Color -->
        <div class="mb-3">
            <label style="font-weight: bold;">Edit Color</label>
            <input type="color" id="colorPicker" class="form-control form-control-color" value="#000000">
        </div>
        <!-- Tamaño del texto -->
        <div class="mb-3">
            <label style="font-weight: bold;">Text Size</label>
            <input type="number" id="textSize" class="form-control" min="1" value="20">
        </div>
    `;

    const addTextButton = document.getElementById('addTextButton');
    const textInput = document.getElementById('textInputEditor');
    const fontSelector = document.getElementById('fontSelector');
    const colorPicker = document.getElementById('colorPicker');
    const textSize = document.getElementById('textSize');
    const fixedBox = document.getElementById('fixedBox');

    // Al hacer clic en "Agregar al Canvas"
    addTextButton.addEventListener('click', function () {
        const textContent = textInput.value;
        const selectedFont = fontSelector.value;
        const selectedColor = colorPicker.value;
        const selectedSize = textSize.value;

        if (textContent) {
            addTextToFixedBox(fixedBox, textContent, selectedFont, selectedColor, selectedSize);
        }
    });

    // Función para agregar el texto dentro de fixedBox
    function addTextToFixedBox(fixedBox, text, font, color, size) {
        const newText = document.createElement('div');
        newText.classList.add('text-box');
        newText.textContent = text;
        newText.style.fontFamily = font;
        newText.style.color = color;
        newText.style.fontSize = `${size}px`;
        newText.style.position = 'absolute'; // Permite moverlo libremente
        newText.style.cursor = 'move'; // Cambia el cursor a mano cuando se mueve

        // Crear el botón de eliminación
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.classList.add('remove-text-btn');
        newText.appendChild(removeButton);

        // Hacerlo movible
        newText.setAttribute('draggable', true);
        fixedBox.appendChild(newText);

        makeTextMovable(newText); // Permitir mover el texto
        enableTextEditing(newText, removeButton); // Habilitar la edición y eliminación
    }

    // Función para habilitar el movimiento de los textos
    function makeTextMovable(textElement) {
        let offsetX, offsetY, isDragging = false;

        textElement.addEventListener('mousedown', function (e) {
            isDragging = true;
            offsetX = e.clientX - textElement.offsetLeft;
            offsetY = e.clientY - textElement.offsetTop;
            textElement.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                textElement.style.left = `${e.clientX - offsetX}px`;
                textElement.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
            textElement.style.cursor = 'move';
        });
    }

    // Función para habilitar la edición y eliminación de texto
    function enableTextEditing(textElement, removeButton) {
        // Al hacer doble clic sobre el texto, seleccionamos y mostramos el botón de eliminación
        textElement.addEventListener('dblclick', function () {
            // Marcar el contorno del div de texto
            textElement.style.border = '2px dashed #000'; // Contorno alrededor del texto
            removeButton.style.display = 'block'; // Mostrar el botón de eliminar
        });

        // Eliminar el texto cuando se hace clic en el botón de eliminación
        removeButton.addEventListener('click', function () {
            textElement.remove(); // Eliminar el texto
        });

        // Ocultar el botón de eliminar cuando el texto no está seleccionado
        textElement.addEventListener('mouseleave', function () {
            textElement.style.border = 'none'; // Quitar el borde
            removeButton.style.display = 'none'; // Ocultar el botón de eliminar
        });
    }
}
