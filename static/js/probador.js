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
        
        // Crear controles
        const controls = document.createElement('div');
        controls.className = 'logo-controls';
        
        // Botón para eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger btn-logo-control';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        deleteBtn.onclick = function(e) {
            e.stopPropagation();
            logoItem.remove();
            
            // Eliminar del array de la vista
            const viewLogos = viewElements[currentView].logos;
            const index = viewLogos.indexOf(logoData.id);
            if (index !== -1) {
                viewLogos.splice(index, 1);
            }
        };
        
        // Agregar elementos al DOM
        controls.appendChild(deleteBtn);
        logoItem.appendChild(logoImg);
        logoItem.appendChild(controls);
        logoContainer.appendChild(logoItem);
        
        // Posicionar el logo en el centro inicialmente
        logoItem.style.left = '50%';
        logoItem.style.top = '50%';
        logoItem.style.transform = 'translate(-50%, -50%)';
        logoItem.style.width = '100px';
        logoItem.style.height = 'auto';
        
        // Hacer el logo arrastrable
        makeDraggable(logoItem);
        
        // Agregar al array de la vista actual
        viewElements[currentView].logos.push(logoData.id);
    }
    
    // Función para hacer un elemento arrastrable
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        element.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e.preventDefault();
            // Obtener la posición del cursor al inicio
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // Llamar a función cada vez que el cursor se mueva
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e.preventDefault();
            // Calcular la nueva posición
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Establecer la nueva posición
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
        
        function closeDragElement() {
            // Detener movimiento cuando se suelta el mouse
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    // Función para agregar texto a la camisa
    function addTextToShirt() {
        const textInput = document.getElementById('text-input');
        const fontFamily = document.getElementById('font-family');
        const fontSize = document.getElementById('font-size');
        const fontColor = document.getElementById('font-color');
        const fontBold = document.getElementById('font-bold');
        const fontItalic = document.getElementById('font-italic');
        const fontUnderline = document.getElementById('font-underline');
        
        if (textInput.value.trim() === '') return;
        
        // Crear elemento de texto
        const textId = 'text-' + textCounter++;
        const textElement = document.createElement('div');
        textElement.id = textId;
        textElement.className = 'logo-item text-item';
        textElement.setAttribute('data-view', currentView);
        textElement.style.fontFamily = fontFamily.value;
        textElement.style.fontSize = fontSize.value + 'px';
        textElement.style.color = fontColor.value;
        textElement.style.fontWeight = fontBold.checked ? 'bold' : 'normal';
        textElement.style.fontStyle = fontItalic.checked ? 'italic' : 'normal';
        textElement.style.textDecoration = fontUnderline.checked ? 'underline' : 'none';
        textElement.innerText = textInput.value;
        
        // Crear controles
        const controls = document.createElement('div');
        controls.className = 'logo-controls';
        
        // Botón para eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger btn-logo-control';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        deleteBtn.onclick = function(e) {
            e.stopPropagation();
            textElement.remove();
            
            // Eliminar del array de la vista
            const viewTexts = viewElements[currentView].texts;
            const index = viewTexts.indexOf(textId);
            if (index !== -1) {
                viewTexts.splice(index, 1);
            }
        };
        
        // Agregar elementos al DOM
        controls.appendChild(deleteBtn);
        textElement.appendChild(controls);
        logoContainer.appendChild(textElement);
        
        // Posicionar el texto en el centro inicialmente
        textElement.style.left = '50%';
        textElement.style.top = '50%';
        textElement.style.transform = 'translate(-50%, -50%)';
        textElement.style.position = 'absolute';
        textElement.style.cursor = 'move';
        textElement.style.zIndex = '100';
        textElement.style.padding = '5px';
        
        // Hacer el texto arrastrable
        makeDraggable(textElement);
        
        // Agregar al array de la vista actual
        viewElements[currentView].texts.push(textId);
        
        // Limpiar el input
    
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
    
    // Subida de imágenes
    logoUpload.addEventListener('change', function(e) {
        if (this.files && this.files.length > 0) {
            // Procesar todos los archivos seleccionados
            Array.from(this.files).forEach(file => {
                handleFileUpload(file);
            });
        }
    });
    
    // Agregar texto
    document.getElementById('add-text-btn').addEventListener('click', function() {
        addTextToShirt();
    });
    
    // Inicialización
    
    // Establecer tipo de producto inicial
    document.getElementById('productTypeCorta').checked = true;
    
    // Establecer color inicial
    document.querySelector('.color-option[data-color="Blanco"]').classList.add('active');
    
    // Establecer vista inicial
    document.getElementById('view-frente').classList.add('active');
    
    // Actualizar opciones de color
    updateColorOptions();
    
    // Cargar imagen inicial
    updateShirtImage();
});
