// Probador Virtual - Script simplificado
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let shirtType = 'Polo manga corta';
    let currentColor = 'Blanco';
    let currentView = 'frente';
    let logoCounter = 0;
    let textCounter = 0;
    
    // Elementos del DOM
    const shirtImage = document.getElementById('shirt-image');
    const logoContainer = document.getElementById('logo-container');
    const logoGallery = document.getElementById('logo-gallery');
    const logoUpload = document.getElementById('logo-upload');
    const colorOptions = document.querySelectorAll('.color-option');
    const viewOptions = document.querySelectorAll('.view-option');
    const productCards = document.querySelectorAll('.product-card');
    const currentProductNameEl = document.getElementById('current-product-name');
    const selectedProductTypeInput = document.getElementById('selectedProductType');
    const productSelectionModal = document.getElementById('productSelectionModal');
    const modalInstance = productSelectionModal ? new bootstrap.Modal(productSelectionModal) : null;
    
    // Almacenamiento de elementos por vista
    const viewElements = {
        'frente': { texts: [], logos: [] },
        'espalda': { texts: [], logos: [] },
        'izquierda': { texts: [], logos: [] },
        'derecha': { texts: [], logos: [] }
    };
    
    // Función para actualizar la imagen de la camisa
    function updateShirtImage() {
        console.log('Actualizando imagen:', { shirtType, currentColor, currentView });
        
        // Mapeo de nombres de vista al formato de archivo
        const viewMap = {
            'frente': 'front',
            'espalda': 'back',
            'izquierda': 'left',
            'derecha': 'right'
        };
        
        // Determinar el tipo de manga o producto
        let mangaType = '';
        
        // Manejar diferentes tipos de productos
        if (shirtType.includes('manga corta')) {
            mangaType = 'corta';
        } else if (shirtType.includes('manga larga')) {
            mangaType = 'larga';
        } else {
            // Para otros productos como casaca, chompa, mameluco, pantalon
            mangaType = shirtType; // El tipo es el mismo nombre del producto
        }
        
        // Construir la ruta de la imagen según el tipo de producto
        let imagePath;
        
        if (shirtType.includes('manga')) {
            // Formato para polos (manga corta/larga)
            imagePath = `/static/img/creador/${shirtType}/${currentColor}/camiseta_${currentColor}_manga-${mangaType}_${viewMap[currentView]}.webp`;
        } else if (shirtType === 'casaca') {
            // Formato para casacas
            const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView]; // 'back' se llama 'black' en los archivos
            imagePath = `/static/img/creador/${shirtType}/casaca_parka_blanca_lisa_${viewSuffix}.webp`;
        } else if (shirtType === 'chompa') {
            // Formato para chompas
            const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView]; // 'back' se llama 'black' en los archivos
            imagePath = `/static/img/creador/${shirtType}/chompa_blanca_${viewSuffix}.webp`;
        } else if (shirtType === 'mameluco') {
            // Formato para mamelucos
            const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView]; // 'back' se llama 'black' en los archivos
            imagePath = `/static/img/creador/${shirtType}/mameluco_blanco_${viewSuffix}.webp`;
        } else if (shirtType === 'pantalon') {
            // Formato para pantalones
            const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView]; // 'back' se llama 'black' en los archivos
            imagePath = `/static/img/creador/${shirtType}/pantalon_jean_blanco_${viewSuffix}.webp`;
        }
        
        console.log('Cargando imagen:', imagePath);
        
        // Establecer la imagen
        shirtImage.src = imagePath;
        
        // Manejar errores
        shirtImage.onerror = function() {
            console.error(`Error al cargar la imagen: ${imagePath}`);
            
            // Intentar con una imagen alternativa según el tipo de producto
            let defaultPath;
            
            if (shirtType.includes('manga')) {
                // Intentar con imagen blanca para polos
                defaultPath = `/static/img/creador/${shirtType}/Blanco/camiseta_Blanco_manga-${mangaType}_${viewMap[currentView]}.webp`;
            } else {
                // Para otros productos, intentar con vista frontal
                defaultPath = `/static/img/creador/${shirtType}/${shirtType}_front.webp`;
            }
            
            console.log('Intentando con imagen por defecto:', defaultPath);
            this.src = defaultPath;
            
            // Si también falla, intentar con una imagen genérica
            this.onerror = function() {
                console.error(`Error al cargar imagen por defecto: ${defaultPath}`);
                const frontPath = `/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_front.webp`;
                console.log('Último intento con imagen genérica:', frontPath);
                this.src = frontPath;
                this.onerror = null;
            };
        };
    }
    
    // Función para actualizar las opciones de color según el tipo de producto
    function updateColorOptions() {
        console.log('Actualizando opciones de color para:', shirtType);
        
        // Determinar qué colores mostrar según el tipo de producto
        if (shirtType.includes('manga')) {
            // Para polos (manga corta/larga)
            const isCorta = shirtType.includes('corta');
            
            // Mostrar/ocultar opciones de color según disponibilidad
            colorOptions.forEach(option => {
                const availability = option.getAttribute('data-available-in');
                
                if (availability === 'both' || (isCorta && availability === 'corta')) {
                    option.style.display = 'inline-block';
                } else {
                    option.style.display = 'none';
                    
                    // Si el color actual no está disponible, quitar la clase active
                    if (option.classList.contains('active') && option.getAttribute('data-color') === currentColor) {
                        option.classList.remove('active');
                        currentColor = 'Blanco';
                        document.querySelector('.color-option[data-color="Blanco"]').classList.add('active');
                    }
                }
            });
        } else {
            // Para otros productos (casaca, chompa, mameluco, pantalon)
            // Por ahora, estos productos solo tienen una opción de color (blanco/predeterminado)
            colorOptions.forEach(option => {
                // Solo mostrar la opción de color blanco para estos productos
                if (option.getAttribute('data-color') === 'Blanco') {
                    option.style.display = 'inline-block';
                    
                    // Asegurarse de que el color blanco esté seleccionado
                    if (!option.classList.contains('active')) {
                        colorOptions.forEach(opt => opt.classList.remove('active'));
                        option.classList.add('active');
                        currentColor = 'Blanco';
                    }
                } else {
                    option.style.display = 'none';
                    
                    // Si otro color estaba activo, quitarle la clase active
                    if (option.classList.contains('active')) {
                        option.classList.remove('active');
                        currentColor = 'Blanco';
                        document.querySelector('.color-option[data-color="Blanco"]').classList.add('active');
                    }
                }
            });
        }
    }
    
    // Función para cambiar el tipo de producto
    function changeProductType(newType) {
        if (newType === shirtType) return;
        
        console.log(`Cambiando de ${shirtType} a ${newType}`);
        shirtType = newType;
        
        // Limpiar el contenedor de logos
        logoContainer.innerHTML = '';
        
        // Cambiar a vista frontal
        currentView = 'frente';
        viewOptions.forEach(opt => opt.classList.remove('active'));
        document.getElementById('view-frente').classList.add('active');
        
        // Cambiar a color blanco
        currentColor = 'Blanco';
        colorOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector('.color-option[data-color="Blanco"]').classList.add('active');
        
        // Actualizar opciones de color
        updateColorOptions();
        
        // Actualizar imagen
        updateShirtImage();
    }
    
    // Función para ocultar elementos de una vista específica
    function hideElementsForView(viewName) {
        const elements = logoContainer.querySelectorAll(`[data-view="${viewName}"]`);
        elements.forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Función para mostrar elementos de una vista específica
    function showElementsForView(viewName) {
        const elements = logoContainer.querySelectorAll(`[data-view="${viewName}"]`);
        elements.forEach(el => {
            el.style.display = 'block';
        });
    }
    
    // Función para manejar la carga de archivos
    function handleFileUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            alert('Por favor selecciona una imagen válida');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const logoId = 'logo-' + logoCounter++;
            const logoData = {
                id: logoId,
                src: e.target.result,
                filename: file.name,
                view: currentView
            };
            
            addLogoToGallery(logoData);
            addLogoToShirt(logoData);
        };
        reader.readAsDataURL(file);
    }
    
    // Función para agregar logo a la galería
    function addLogoToGallery(logoData) {
        const logoPreviewContainer = document.createElement('div');
        logoPreviewContainer.className = 'logo-preview-container';
        logoPreviewContainer.setAttribute('data-logo-id', logoData.id);
        
        const logoPreview = document.createElement('img');
        logoPreview.className = 'logo-preview';
        logoPreview.src = logoData.src;
        logoPreview.alt = logoData.filename;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger delete-logo-btn';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        deleteBtn.onclick = function() {
            // Eliminar de la galería
            logoPreviewContainer.remove();
            
            // Eliminar del polo
            const logoElement = document.getElementById(logoData.id);
            if (logoElement) logoElement.remove();
            
            // Eliminar del array de la vista correspondiente
            const viewLogos = viewElements[logoData.view].logos;
            const index = viewLogos.indexOf(logoData.id);
            if (index !== -1) {
                viewLogos.splice(index, 1);
            }
        };
        
        logoPreviewContainer.appendChild(logoPreview);
        logoPreviewContainer.appendChild(deleteBtn);
        logoGallery.appendChild(logoPreviewContainer);
        
        // Evento para agregar el logo al polo al hacer clic en la miniatura
        logoPreview.addEventListener('click', function() {
            addLogoToShirt(logoData);
        });
    }
    
    // Función para agregar logo a la camisa
    function addLogoToShirt(logoData) {
        // Crear contenedor del logo
        const logoItem = document.createElement('div');
        logoItem.className = 'logo-item';
        logoItem.id = logoData.id;
        logoItem.setAttribute('data-view', currentView);
        
        // Crear imagen del logo
        const logoImg = document.createElement('img');
        logoImg.src = logoData.src;
        logoImg.alt = logoData.filename;
        
        // Crear controles del logo
        const logoControls = document.createElement('div');
        logoControls.className = 'logo-controls';
        
        // Botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger btn-logo-control';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        deleteBtn.onclick = function() {
            // Eliminar del polo
            logoItem.remove();
            
            // Eliminar de la galería
            const galleryItem = document.querySelector(`.logo-preview-container[data-logo-id="${logoData.id}"]`);
            if (galleryItem) galleryItem.remove();
            
            // Eliminar del array de la vista correspondiente
            const viewLogos = viewElements[logoData.view].logos;
            const index = viewLogos.indexOf(logoData.id);
            if (index !== -1) {
                viewLogos.splice(index, 1);
            }
        };
        
        // Agregar controles al logo
        logoControls.appendChild(deleteBtn);
        logoItem.appendChild(logoImg);
        logoItem.appendChild(logoControls);
        
        // Agregar logo al contenedor
        logoContainer.appendChild(logoItem);
        
        // Hacer el logo arrastrable
        makeDraggable(logoItem);
        
        // Agregar el ID del logo al array de la vista correspondiente
        viewElements[currentView].logos.push(logoData.id);
    }
    
    // Función para hacer un elemento arrastrable
    function makeDraggable(element) {
        interact(element)
            .draggable({
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],
                autoScroll: true,
                listeners: {
                    move: dragMoveListener,
                }
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                listeners: {
                    move: resizeMoveListener
                },
                modifiers: [
                    interact.modifiers.restrictSize({
                        min: { width: 20, height: 20 }
                    })
                ],
            });
    }
    
    function dragMoveListener(event) {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        
        target.style.transform = `translate(${x}px, ${y}px)`;
        
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
    
    function resizeMoveListener(event) {
        const target = event.target;
        let x = (parseFloat(target.getAttribute('data-x')) || 0);
        let y = (parseFloat(target.getAttribute('data-y')) || 0);
        
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
        
        x += event.deltaRect.left;
        y += event.deltaRect.top;
        
        target.style.transform = `translate(${x}px, ${y}px)`;
        
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
    
    // Función para agregar texto a la camisa
    function addTextToShirt() {
        const textInput = document.getElementById('text-input');
        const fontFamily = document.getElementById('font-family').value;
        const fontSize = document.getElementById('font-size').value;
        const fontColor = document.getElementById('font-color').value;
        const fontBold = document.getElementById('font-bold').checked;
        const fontItalic = document.getElementById('font-italic').checked;
        const fontUnderline = document.getElementById('font-underline').checked;
        
        if (!textInput.value.trim()) {
            alert('Por favor ingresa un texto');
            return;
        }
        
        // Crear elemento de texto
        const textId = 'text-' + textCounter++;
        const textItem = document.createElement('div');
        textItem.className = 'logo-item';
        textItem.id = textId;
        textItem.setAttribute('data-view', currentView);
        textItem.style.color = fontColor;
        textItem.style.fontFamily = fontFamily;
        textItem.style.fontSize = fontSize + 'px';
        textItem.style.fontWeight = fontBold ? 'bold' : 'normal';
        textItem.style.fontStyle = fontItalic ? 'italic' : 'normal';
        textItem.style.textDecoration = fontUnderline ? 'underline' : 'none';
        textItem.textContent = textInput.value;
        
        // Crear controles del texto
        const textControls = document.createElement('div');
        textControls.className = 'logo-controls';
        
        // Botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger btn-logo-control';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        deleteBtn.onclick = function() {
            // Eliminar del polo
            textItem.remove();
            
            // Eliminar del array de la vista correspondiente
            const viewTexts = viewElements[currentView].texts;
            const index = viewTexts.indexOf(textId);
            if (index !== -1) {
                viewTexts.splice(index, 1);
            }
        };
        
        // Agregar controles al texto
        textControls.appendChild(deleteBtn);
        textItem.appendChild(textControls);
        
        // Agregar texto al contenedor
        logoContainer.appendChild(textItem);
        
        // Hacer el texto arrastrable
        makeDraggable(textItem);
        
        // Agregar el ID del texto al array de la vista correspondiente
        viewElements[currentView].texts.push(textId);
        
        // Limpiar el input
        textInput.value = '';
    }
    
    // Event Listeners
    
    // Inicializar el modal con el producto actual seleccionado
    if (productSelectionModal) {
        productSelectionModal.addEventListener('shown.bs.modal', function() {
            // Marcar como seleccionada la tarjeta del producto actual
            productCards.forEach(card => {
                if (card.getAttribute('data-product-type') === shirtType) {
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
            });
        });
    }
    
    // Manejar clic en las tarjetas de productos
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const newProductType = this.getAttribute('data-product-type');
            const productTitle = this.querySelector('.card-title').textContent;
            const hasElements = logoContainer.children.length > 0 || textCounter > 0;
            
            // Marcar esta tarjeta como seleccionada y desmarcar las demás
            productCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            if (hasElements && newProductType !== shirtType) {
                // Si hay elementos, mostrar modal de confirmación
                const confirmModal = new bootstrap.Modal(document.getElementById('confirmChangeModal'));
                confirmModal.show();
                
                // Guardar el tipo seleccionado para usarlo si se confirma
                document.getElementById('confirm-change-btn').onclick = function() {
                    changeProductType(newProductType);
                    currentProductNameEl.textContent = productTitle;
                    selectedProductTypeInput.value = newProductType;
                    modalInstance.hide();
                    confirmModal.hide();
                };
            } else if (newProductType !== shirtType) {
                // Si no hay elementos o es el mismo producto, cambiar directamente
                changeProductType(newProductType);
                currentProductNameEl.textContent = productTitle;
                selectedProductTypeInput.value = newProductType;
                modalInstance.hide();
            } else {
                // Si es el mismo producto, solo cerrar el modal
                modalInstance.hide();
            }
        });
    });
    
    // Cambio de vista
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Quitar clase active de todas las opciones
            viewOptions.forEach(opt => opt.classList.remove('active'));
            // Agregar clase active a la opción seleccionada
            this.classList.add('active');
            
            // Actualizar vista actual
            const newView = this.id.replace('view-', '');
            
            // Ocultar elementos de todas las vistas
            hideElementsForView('frente');
            hideElementsForView('espalda');
            hideElementsForView('izquierda');
            hideElementsForView('derecha');
            
            // Cambiar vista actual
            currentView = newView;
            
            // Mostrar elementos de la vista actual
            showElementsForView(currentView);
            
            // Actualizar imagen
            updateShirtImage();
        });
    });
    
    // Selección de color
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Quitar clase active de todas las opciones
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // Agregar clase active a la opción seleccionada
            this.classList.add('active');
            
            // Actualizar color actual
            currentColor = this.getAttribute('data-color');
            
            // Actualizar imagen
            updateShirtImage();
        });
    });
    
    // Carga de archivos
    if (logoUpload) {
        logoUpload.addEventListener('change', function(event) {
            const files = event.target.files;
            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    handleFileUpload(files[i]);
                }
                // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
                this.value = '';
            }
        });
    }
    
    // Agregar texto
    const addTextBtn = document.getElementById('add-text-btn');
    if (addTextBtn) {
        addTextBtn.addEventListener('click', addTextToShirt);
    }
    
    // Previsualización del texto
    const textInput = document.getElementById('text-input');
    const fontFamily = document.getElementById('font-family');
    const fontSize = document.getElementById('font-size');
    const fontColor = document.getElementById('font-color');
    const fontBold = document.getElementById('font-bold');
    const fontItalic = document.getElementById('font-italic');
    const fontUnderline = document.getElementById('font-underline');
    const textPreview = document.getElementById('text-preview');
    
    function updateTextPreview() {
        if (textPreview) {
            textPreview.style.fontFamily = fontFamily.value;
            textPreview.style.fontSize = fontSize.value + 'px';
            textPreview.style.color = fontColor.value;
            textPreview.style.fontWeight = fontBold.checked ? 'bold' : 'normal';
            textPreview.style.fontStyle = fontItalic.checked ? 'italic' : 'normal';
            textPreview.style.textDecoration = fontUnderline.checked ? 'underline' : 'none';
            
            if (textInput.value.trim()) {
                textPreview.textContent = textInput.value;
            } else {
                textPreview.textContent = 'Vista previa del texto';
            }
        }
    }
    
    if (textInput) textInput.addEventListener('input', updateTextPreview);
    if (fontFamily) fontFamily.addEventListener('change', updateTextPreview);
    if (fontSize) fontSize.addEventListener('input', updateTextPreview);
    if (fontColor) fontColor.addEventListener('input', updateTextPreview);
    if (fontBold) fontBold.addEventListener('change', updateTextPreview);
    if (fontItalic) fontItalic.addEventListener('change', updateTextPreview);
    if (fontUnderline) fontUnderline.addEventListener('change', updateTextPreview);
    
    // Color personalizado
    const customColorPicker = document.getElementById('custom-color-picker');
    const colorPreview = document.getElementById('color-preview');
    const addCustomColorBtn = document.getElementById('add-custom-color-btn');
    
    if (customColorPicker && colorPreview) {
        customColorPicker.addEventListener('input', function() {
            colorPreview.style.backgroundColor = this.value;
        });
    }
    
    if (addCustomColorBtn) {
        addCustomColorBtn.addEventListener('click', function() {
            const colorValue = customColorPicker.value;
            const colorName = document.getElementById('custom-color-name').value || 'Personalizado';
            
            // Crear nueva opción de color
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';
            colorOption.setAttribute('data-color', colorName);
            colorOption.setAttribute('data-available-in', 'both');
            colorOption.style.backgroundColor = colorValue;
            
            // Agregar evento de clic
            colorOption.addEventListener('click', function() {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                currentColor = this.getAttribute('data-color');
                updateShirtImage();
            });
            
            // Agregar al contenedor de colores
            document.getElementById('color-options').appendChild(colorOption);
            
            // Cerrar modal
            const colorPickerModal = bootstrap.Modal.getInstance(document.getElementById('colorPickerModal'));
            if (colorPickerModal) colorPickerModal.hide();
        });
    }
    
    // Inicializar
    updateColorOptions();
    updateShirtImage();
});
