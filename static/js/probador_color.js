// Probador Virtual - Script con soporte para colores personalizados
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let shirtType = 'Polo manga corta';
    let currentColor = 'Blanco';
    let currentView = 'frente';
    let logoCounter = 0;
    let textCounter = 0;
    let isCustomColor = false;
    let customColorOpacity = 0.8;
    
    // Variables para controlar modificaciones
    let hasCustomColors = false;
    let hasLogos = false;
    let hasTexts = false;
    let hasChangedPrintType = false;
    
    // Elementos del DOM
    const shirtImageBase = document.getElementById('shirt-image-base');
    const shirtColorOverlay = document.getElementById('shirt-color-overlay');
    const shirtImageOverlay = document.getElementById('shirt-image-overlay');
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
    
    // Mapeo de nombres de vista al formato de archivo
    const viewMap = {
        'frente': 'front',
        'espalda': 'back',
        'izquierda': 'left',
        'derecha': 'right'
    };
    
    // Función para actualizar la imagen de la camisa
    function updateShirtImage() {
        console.log('Actualizando imagen:', { shirtType, currentColor, currentView, isCustomColor });
        
        // Limpiar primero cualquier superposición anterior
        if (shirtColorOverlay) {
            shirtColorOverlay.style.display = 'none';
        }
        if (shirtImageOverlay) {
            shirtImageOverlay.style.display = 'none';
        }
        
        // Guardar el tipo de producto actual para mantenerlo
        const currentProductType = shirtType;
        
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
        
        // Pequeño retraso para asegurar que las capas anteriores se hayan ocultado
        setTimeout(() => {
            if (isCustomColor) {
                // Usar la técnica de superposición para colores personalizados
                updateCustomColorImage();
            } else {
                // Usar imágenes normales para colores predefinidos
                updateStandardImage(mangaType);
            }
            
            // Asegurarnos de que se mantenga el tipo de producto
            shirtType = currentProductType;
        }, 50);
    }
    
    // Función para actualizar la imagen con color personalizado
    function updateCustomColorImage() {
        // Ocultar la capa de superposición mientras se cargan las nuevas imágenes
        shirtColorOverlay.style.display = 'none';
        shirtImageOverlay.style.display = 'none';
        
        // Determinar las rutas de las imágenes según el tipo de producto y vista
        let basePath, overlayPath, transparentPath;
        let viewSuffix = viewMap[currentView];
        
        // En Mas_colores, SIEMPRE usamos 'back' para la vista de espalda, nunca 'black'
        // El 'black' solo se usa en las imágenes estándar, no en las de color personalizado
        console.log('Vista actual:', viewSuffix, 'para producto:', shirtType);
        
        console.log('Actualizando imagen con color personalizado para:', shirtType, currentView);
        
        // Construir las rutas de las imágenes según el tipo de producto
        if (shirtType.includes('manga')) {
            // Para polos (manga corta/larga)
            const folderName = shirtType.includes('corta') ? 'polos_manga_corta' : 'polos_manga_larga';
            basePath = `/static/img/creador/Mas_colores/${folderName}/Blanco_${viewSuffix}/camiseta_blanca_manga-${shirtType.includes('corta') ? 'corta' : 'larga'}_${viewSuffix}.png`;
            transparentPath = `/static/img/creador/Mas_colores/${folderName}/Blanco_${viewSuffix}/camiseta_blanca_manga-${shirtType.includes('corta') ? 'corta' : 'larga'}_${viewSuffix}_sin_fondo.png`;
            overlayPath = `/static/img/creador/Mas_colores/${folderName}/Blanco_${viewSuffix}/camiseta_blanca_manga-${shirtType.includes('corta') ? 'corta' : 'larga'}_${viewSuffix}_con_hueco.png`;
        } else if (shirtType === 'casaca') {
            basePath = `/static/img/creador/Mas_colores/casaca/Blanco_${viewSuffix}/casaca_parka_blanca_lisa_${viewSuffix}.png`;
            transparentPath = `/static/img/creador/Mas_colores/casaca/Blanco_${viewSuffix}/casaca_parka_blanca_lisa_${viewSuffix}_sin_fondo.png`;
            overlayPath = `/static/img/creador/Mas_colores/casaca/Blanco_${viewSuffix}/casaca_parka_blanca_lisa_${viewSuffix}_con_hueco.png`;
        } else if (shirtType === 'chompa') {
            basePath = `/static/img/creador/Mas_colores/chompa/Blanco_${viewSuffix}/chompa_blanca_${viewSuffix}.png`;
            transparentPath = `/static/img/creador/Mas_colores/chompa/Blanco_${viewSuffix}/chompa_blanca_${viewSuffix}_sin_fondo.png`;
            overlayPath = `/static/img/creador/Mas_colores/chompa/Blanco_${viewSuffix}/chompa_blanca_${viewSuffix}_con_hueco.png`;
        } else if (shirtType === 'mameluco') {
            basePath = `/static/img/creador/Mas_colores/mameluco/Blanco_${viewSuffix}/mameluco_blanca_${viewSuffix}.png`;
            transparentPath = `/static/img/creador/Mas_colores/mameluco/Blanco_${viewSuffix}/mameluco_blanca_${viewSuffix}_sin_fondo.png`;
            overlayPath = `/static/img/creador/Mas_colores/mameluco/Blanco_${viewSuffix}/mameluco_blanca_${viewSuffix}_con_hueco.png`;
        } else if (shirtType === 'pantalon') {
            basePath = `/static/img/creador/Mas_colores/pantalon/Blanco_${viewSuffix}/pantalon_jean_blanca_${viewSuffix}.png`;
            transparentPath = `/static/img/creador/Mas_colores/pantalon/Blanco_${viewSuffix}/pantalon_jean_blanca_${viewSuffix}_sin_fondo.png`;
            overlayPath = `/static/img/creador/Mas_colores/pantalon/Blanco_${viewSuffix}/pantalon_jean_blanca_${viewSuffix}_con_hueco.png`;
        }
        
        console.log('Cargando imágenes para color personalizado:', { basePath, transparentPath, overlayPath });
        
        // Establecer la imagen base (fondo blanco)
        shirtImageBase.src = basePath;
        
        // Configurar la capa de color (solo se aplicará a la prenda, no al fondo)
        shirtColorOverlay.style.backgroundColor = currentColor;
        shirtColorOverlay.style.opacity = customColorOpacity;
        shirtColorOverlay.style.webkitMaskImage = `url('${transparentPath}')`;
        shirtColorOverlay.style.maskImage = `url('${transparentPath}')`;
        
        // Cargar la imagen de superposición
        shirtImageOverlay.src = overlayPath;
        
        // Mostrar las capas cuando las imágenes estén cargadas
        shirtImageBase.onload = function() {
            // Primero cargar la imagen transparente para la máscara
            const tempImg = new Image();
            tempImg.src = transparentPath;
            tempImg.onload = function() {
                // Una vez cargada la imagen transparente, mostrar la capa de color
                shirtColorOverlay.style.display = 'block';
                
                // Cargar la imagen de superposición
                shirtImageOverlay.onload = function() {
                    shirtImageOverlay.style.display = 'block';
                };
                
                shirtImageOverlay.onerror = function() {
                    console.error(`Error al cargar la imagen de superposición: ${overlayPath}`);
                    shirtImageOverlay.style.display = 'none';
                };
            };
            
            tempImg.onerror = function() {
                console.error(`Error al cargar la imagen transparente: ${transparentPath}`);
                shirtColorOverlay.style.display = 'none';
            };
        };
        
        shirtImageBase.onerror = function() {
            console.error(`Error al cargar la imagen base: ${basePath}`);
            // Intentar con una imagen por defecto
            this.src = `/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_front.webp`;
            shirtColorOverlay.style.display = 'none';
            shirtImageOverlay.style.display = 'none';
            
            // Si también falla, intentar con la imagen de Mas_colores
            this.onerror = function() {
                console.error(`Error al cargar imagen por defecto, intentando con Mas_colores`);
                this.src = `/static/img/creador/Mas_colores/polos_manga_corta/Blanco_front/camiseta_blanca_manga-corta_front.png`;
                this.onerror = null;
            };
        };
    }
    
    // Función para actualizar la imagen con color estándar
    function updateStandardImage(mangaType) {
        // Ocultar las capas de superposición
        shirtColorOverlay.style.display = 'none';
        shirtImageOverlay.style.display = 'none';
        
        // Construir la ruta de la imagen según el tipo de producto
        let imagePath;
        
        if (shirtType.includes('manga')) {
            // Formato para polos (manga corta/larga)
            imagePath = `/static/img/creador/${shirtType}/${currentColor}/camiseta_${currentColor}_manga-${mangaType}_${viewMap[currentView]}.webp`;
        } else if (shirtType === 'casaca') {
            // Formato para casacas - En las imágenes estándar sí usamos 'black' para la vista de espalda
            const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView];
            imagePath = `/static/img/creador/${shirtType}/casaca_parka_blanca_lisa_${viewSuffix}.webp`;
        } else if (shirtType === 'chompa') {
            // Formato para chompas - En las imágenes estándar sí usamos 'black' para la vista de espalda
            const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView];
            imagePath = `/static/img/creador/${shirtType}/chompa_blanca_${viewSuffix}.webp`;
        } else if (shirtType === 'mameluco') {
            // Formato para mamelucos - En las imágenes estándar sí usamos 'black' para la vista de espalda
            const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView];
            imagePath = `/static/img/creador/${shirtType}/mameluco_blanca_${viewSuffix}.webp`;
        } else if (shirtType === 'pantalon') {
            // Formato para pantalones - En las imágenes estándar sí usamos 'black' para la vista de espalda
            const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView];
            imagePath = `/static/img/creador/${shirtType}/pantalon_jean_blanca_${viewSuffix}.webp`;
        }
        
        console.log('Cargando imagen estándar:', imagePath);
        
        // Establecer la imagen
        shirtImageBase.src = imagePath;
        
        // Manejar errores
        shirtImageBase.onerror = function() {
            console.error(`Error al cargar la imagen: ${imagePath}`);
            
            // Intentar con una imagen alternativa según el tipo de producto
            let defaultPath;
            
            if (shirtType.includes('manga')) {
                // Intentar con imagen blanca para polos
                defaultPath = `/static/img/creador/${shirtType}/Blanco/camiseta_Blanco_manga-${mangaType}_${viewMap[currentView]}.webp`;
            } else if (shirtType === 'mameluco') {
                // Para mameluco, usar el nombre correcto
                const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView];
                defaultPath = `/static/img/creador/${shirtType}/mameluco_blanca_${viewSuffix}.webp`;
            } else if (shirtType === 'pantalon') {
                // Para pantalones, usar el nombre correcto
                const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView];
                defaultPath = `/static/img/creador/${shirtType}/pantalon_jean_blanca_${viewSuffix}.webp`;
            } else {
                // Para otros productos, intentar con vista frontal
                defaultPath = `/static/img/creador/${shirtType}/${shirtType}_front.webp`;
            }
            
            console.log('Intentando con imagen por defecto:', defaultPath);
            this.src = defaultPath;
            
            // Si también falla, intentar con una imagen de Mas_colores
            this.onerror = function() {
                console.error(`Error al cargar imagen por defecto: ${defaultPath}`);
                
                // Determinar la ruta en Mas_colores según el tipo de producto
                let masColoresPath;
                const viewSuffix = viewMap[currentView] === 'back' ? 'black' : viewMap[currentView];
                
                if (shirtType.includes('manga')) {
                    const folderName = shirtType.includes('corta') ? 'polos_manga_corta' : 'polos_manga_larga';
                    masColoresPath = `/static/img/creador/Mas_colores/${folderName}/Blanco_${viewSuffix}/camiseta_blanca_manga-${shirtType.includes('corta') ? 'corta' : 'larga'}_${viewSuffix}.png`;
                } else if (shirtType === 'casaca') {
                    masColoresPath = `/static/img/creador/Mas_colores/casaca/Blanco_${viewSuffix}/casaca_parka_blanca_lisa_${viewSuffix}.png`;
                } else if (shirtType === 'chompa') {
                    masColoresPath = `/static/img/creador/Mas_colores/chompa/Blanco_${viewSuffix}/chompa_blanca_${viewSuffix}.png`;
                } else if (shirtType === 'mameluco') {
                    masColoresPath = `/static/img/creador/Mas_colores/mameluco/Blanco_${viewSuffix}/mameluco_blanca_${viewSuffix}.png`;
                } else if (shirtType === 'pantalon') {
                    masColoresPath = `/static/img/creador/Mas_colores/pantalon/Blanco_${viewSuffix}/pantalon_jean_blanca_${viewSuffix}.png`;
                }
                
                console.log('Intentando con imagen de Mas_colores:', masColoresPath);
                this.src = masColoresPath;
                
                // Si todo falla, usar una imagen genérica
                this.onerror = function() {
                    console.error(`Error al cargar imagen de Mas_colores: ${masColoresPath}`);
                    const frontPath = `/static/img/creador/Polo manga corta/Blanco/camiseta_Blanco_manga-corta_front.webp`;
                    console.log('Último intento con imagen genérica:', frontPath);
                    this.src = frontPath;
                    this.onerror = null;
                };
            };
        };
    }
    
    // Función para actualizar las opciones de color según el tipo de producto
    function updateColorOptions() {
        console.log('Actualizando opciones de color para:', shirtType);
        
        // Elemento para mostrar el mensaje de disponibilidad de colores
        const colorAvailabilityMessage = document.getElementById('color-availability-message');
        let availableColors = [];
        let transitionDuration = 300; // Duración de la transición en ms
        
        // Aplicar transición a todas las opciones de color
        colorOptions.forEach(option => {
            option.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
            option.style.opacity = '0.3';
        });
        
        // Esperar un poco para que la transición sea visible
        setTimeout(() => {
            // Determinar qué colores mostrar según el tipo de producto
            if (shirtType.includes('manga')) {
                // Para polos (manga corta/larga)
                const isCorta = shirtType.includes('corta');
                
                // Mostrar/ocultar opciones de color según disponibilidad
                colorOptions.forEach(option => {
                    const availability = option.getAttribute('data-available-in');
                    const colorName = option.getAttribute('data-color').replace('_', ' ');
                    
                    if (availability === 'both' || (isCorta && availability === 'corta')) {
                        option.style.display = 'inline-block';
                        option.style.opacity = '1';
                        availableColors.push(colorName);
                    } else {
                        option.style.display = 'none';
                        option.style.opacity = '0.3';
                        
                        // Si el color actual no está disponible, quitar la clase active
                        if (option.classList.contains('active') && option.getAttribute('data-color') === currentColor) {
                            option.classList.remove('active');
                            currentColor = 'Blanco';
                            isCustomColor = false;
                            document.querySelector('.color-option[data-color="Blanco"]').classList.add('active');
                        }
                    }
                });
                
                // Mostrar mensaje informativo
                if (isCorta) {
                    colorAvailabilityMessage.textContent = `Colores disponibles para Polo manga corta: todos los colores mostrados.`;
                } else {
                    colorAvailabilityMessage.textContent = `Colores disponibles para Polo manga larga: solo colores básicos.`;
                }
            } else {
                // Para otros productos (casaca, chompa, mameluco, pantalon)
                colorOptions.forEach(option => {
                    // Solo mostrar la opción de color blanco para estos productos
                    if (option.getAttribute('data-color') === 'Blanco') {
                        option.style.display = 'inline-block';
                        option.style.opacity = '1';
                        
                        // Asegurarse de que el color blanco esté seleccionado
                        if (!option.classList.contains('active')) {
                            colorOptions.forEach(opt => opt.classList.remove('active'));
                            option.classList.add('active');
                            currentColor = 'Blanco';
                            isCustomColor = false;
                        }
                    } else {
                        option.style.display = 'none';
                        option.style.opacity = '0.3';
                        
                        // Si otro color estaba activo, quitarle la clase active
                        if (option.classList.contains('active')) {
                            option.classList.remove('active');
                            currentColor = 'Blanco';
                            isCustomColor = false;
                            document.querySelector('.color-option[data-color="Blanco"]').classList.add('active');
                        }
                    }
                });
                
                // Mostrar mensaje informativo
                colorAvailabilityMessage.textContent = `Para ${shirtType}, solo está disponible el color blanco. Puedes usar colores personalizados.`;
            }
        }, transitionDuration / 2);
    }
    
    // Función para verificar si hay modificaciones
    function hasModifications() {
        return hasCustomColors || hasLogos || hasTexts || hasChangedPrintType;
    }
    
    // Función para resetear todas las modificaciones
    function resetAllModifications() {
        // Resetear variables de control
        hasCustomColors = false;
        hasLogos = false;
        hasTexts = false;
        hasChangedPrintType = false;
        
        // Limpiar el contenedor de logos
        logoContainer.innerHTML = '';
        
        // Eliminar colores personalizados
        const customColorOptions = document.querySelectorAll('.custom-color-option');
        customColorOptions.forEach(option => option.remove());
        
        // Resetear textos
        for (const view in viewElements) {
            viewElements[view].texts = [];
            viewElements[view].logos = [];
        }
    }
    
    // Función para cambiar el tipo de producto
    function changeProductType(newType) {
        if (newType === shirtType) return;
        
        console.log(`Cambiando de ${shirtType} a ${newType}`);
        shirtType = newType;
        
        // Limpiar completamente el estado visual
        
        // 1. Ocultar todas las capas de color y superposición
        if (shirtColorOverlay) {
            shirtColorOverlay.style.display = 'none';
            shirtColorOverlay.style.backgroundColor = '';
            shirtColorOverlay.style.opacity = '0';
            shirtColorOverlay.style.webkitMaskImage = '';
            shirtColorOverlay.style.maskImage = '';
        }
        
        if (shirtImageOverlay) {
            shirtImageOverlay.style.display = 'none';
            shirtImageOverlay.src = '';
        }
        
        // 2. Limpiar el contenedor de logos y textos
        logoContainer.innerHTML = '';
        
        // 3. Limpiar la galería de logos
        if (logoGallery) logoGallery.innerHTML = '';
        
        // 4. Reiniciar contadores
        logoCounter = 0;
        textCounter = 0;
        
        // 5. Cambiar a vista frontal
        currentView = 'frente';
        viewOptions.forEach(opt => opt.classList.remove('active'));
        document.getElementById('view-frente').classList.add('active');
        
        // 6. Cambiar a color blanco
        currentColor = 'Blanco';
        isCustomColor = false;
        colorOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector('.color-option[data-color="Blanco"]').classList.add('active');
        
        // 7. Eliminar colores personalizados
        const customColorOptions = document.querySelectorAll('.custom-color-option');
        customColorOptions.forEach(option => option.remove());
        
        // 8. Resetear todas las modificaciones
        resetAllModifications();
        
        // 9. Resetear los elementos por vista
        for (const view in viewElements) {
            viewElements[view].texts = [];
            viewElements[view].logos = [];
        }
        
        // 10. Resetear campos de formulario
        const textInput = document.getElementById('text-input');
        if (textInput) textInput.value = '';
        
        // 11. Actualizar opciones de color
        updateColorOptions();
        
        // 12. Actualizar imagen con un pequeño retraso para asegurar que todo se haya limpiado
        setTimeout(() => {
            updateShirtImage();
        }, 50);
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
        // Verificar que el archivo sea un PNG
        if (!file || file.type !== 'image/png') {
            console.error('Tipo de archivo no soportado:', file.type);
            return;
        }
        
        // Verificar el tamaño máximo (opcional: 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('El archivo es demasiado grande. El tamaño máximo permitido es de 5MB.');
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
            
            // Marcar que se han agregado logos
            hasLogos = true;
            
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
    
    // Variable para rastrear el texto seleccionado actualmente
    let currentlyEditingTextId = null;
    
    // Función para limpiar el formulario de texto
    function clearTextForm() {
        const textInput = document.getElementById('text-input');
        const fontFamily = document.getElementById('font-family');
        const fontSize = document.getElementById('font-size');
        const fontColor = document.getElementById('font-color');
        const fontBold = document.getElementById('font-bold');
        const fontItalic = document.getElementById('font-italic');
        const fontUnderline = document.getElementById('font-underline');
        const textPreview = document.getElementById('text-preview');
        
        // Limpiar campos
        if (textInput) textInput.value = '';
        if (fontFamily) fontFamily.value = 'Arial';
        if (fontSize) fontSize.value = '24';
        if (fontColor) fontColor.value = '#000000';
        if (fontBold) fontBold.checked = false;
        if (fontItalic) fontItalic.checked = false;
        if (fontUnderline) fontUnderline.checked = false;
        
        // Limpiar vista previa
        if (textPreview) textPreview.textContent = 'Vista previa del texto';
        
        // Resetear el texto en edición
        currentlyEditingTextId = null;
        
        // Cambiar el texto del botón
        const addTextBtn = document.getElementById('add-text-btn');
        if (addTextBtn) addTextBtn.textContent = 'Agregar texto al polo';
    }
    
    // Función para agregar o actualizar texto en la camisa
    function addTextToShirt() {
        const textInput = document.getElementById('text-input');
        const fontFamily = document.getElementById('font-family').value;
        const fontSize = document.getElementById('font-size').value;
        const fontColor = document.getElementById('font-color').value;
        const fontBold = document.getElementById('font-bold').checked;
        const fontItalic = document.getElementById('font-italic').checked;
        const fontUnderline = document.getElementById('font-underline').checked;
        const addTextBtn = document.getElementById('add-text-btn');
        
        if (!textInput.value.trim()) {
            alert('Por favor ingresa un texto');
            return;
        }
        
        // Marcar que se han agregado textos
        hasTexts = true;
        
        // Verificar si estamos editando un texto existente o creando uno nuevo
        if (currentlyEditingTextId) {
            // Estamos editando un texto existente
            const textItem = document.getElementById(currentlyEditingTextId);
            if (textItem) {
                // Actualizar propiedades del texto
                textItem.style.color = fontColor;
                textItem.style.fontFamily = fontFamily;
                textItem.style.fontSize = fontSize + 'px';
                textItem.style.fontWeight = fontBold ? 'bold' : 'normal';
                textItem.style.fontStyle = fontItalic ? 'italic' : 'normal';
                textItem.style.textDecoration = fontUnderline ? 'underline' : 'none';
                textItem.textContent = textInput.value;
                
                // Volver a agregar los controles que se eliminaron al cambiar el textContent
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
                    const index = viewTexts.indexOf(currentlyEditingTextId);
                    if (index !== -1) {
                        viewTexts.splice(index, 1);
                    }
                    
                    // Limpiar el formulario
                    clearTextForm();
                };
                
                // Agregar controles al texto
                textControls.appendChild(deleteBtn);
                textItem.appendChild(textControls);
            }
            
            // Resetear el texto en edición
            currentlyEditingTextId = null;
            
            // Cambiar el texto del botón de vuelta a "Agregar"
            if (addTextBtn) addTextBtn.textContent = 'Agregar texto al polo';
        } else {
            // Estamos creando un nuevo texto
            const textId = 'text-' + textCounter++;
            const textItem = document.createElement('div');
            textItem.className = 'logo-item text-item';
            textItem.id = textId;
            textItem.setAttribute('data-view', currentView);
            textItem.style.color = fontColor;
            textItem.style.fontFamily = fontFamily;
            textItem.style.fontSize = fontSize + 'px';
            textItem.style.fontWeight = fontBold ? 'bold' : 'normal';
            textItem.style.fontStyle = fontItalic ? 'italic' : 'normal';
            textItem.style.textDecoration = fontUnderline ? 'underline' : 'none';
            textItem.textContent = textInput.value;
            
            // Centrar el texto inicialmente
            textItem.style.position = 'absolute';
            textItem.style.left = '50%';
            textItem.style.top = '50%';
            textItem.style.transform = 'translate(-50%, -50%)';
            textItem.setAttribute('data-x', 0);
            textItem.setAttribute('data-y', 0);
            
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
                
                // Limpiar el formulario si estamos editando este texto
                if (currentlyEditingTextId === textId) {
                    clearTextForm();
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
            
            // Agregar evento de clic para editar el texto
            textItem.addEventListener('click', function(e) {
                // Evitar que el clic se propague si fue en los controles
                if (e.target.closest('.logo-controls')) return;
                
                // Establecer este texto como el texto en edición
                currentlyEditingTextId = textId;
                
                // Llenar el formulario con los valores de este texto
                textInput.value = this.textContent;
                document.getElementById('font-family').value = this.style.fontFamily || 'Arial';
                document.getElementById('font-size').value = parseInt(this.style.fontSize) || 24;
                document.getElementById('font-color').value = this.style.color || '#000000';
                document.getElementById('font-bold').checked = this.style.fontWeight === 'bold';
                document.getElementById('font-italic').checked = this.style.fontStyle === 'italic';
                document.getElementById('font-underline').checked = this.style.textDecoration === 'underline';
                
                // Actualizar la vista previa
                updateTextPreview();
                
                // Cambiar el texto del botón a "Actualizar"
                if (addTextBtn) addTextBtn.textContent = 'Actualizar texto';
            });
        }
        
        // Limpiar el input si no estamos editando
        if (!currentlyEditingTextId) {
            clearTextForm();
        }
    }
    
    // Event Listeners
    
    // Inicializar el modal de confirmación
    const confirmChangeModal = document.getElementById('confirmChangeModal');
    const confirmChangeBtn = document.getElementById('confirmChangeBtn');
    let pendingProductChange = null;
    
    // Inicializar el modal con el producto actual seleccionado
    if (productSelectionModal) {
        productSelectionModal.addEventListener('show.bs.modal', function() {
            // Marcar el producto actual como seleccionado
            productCards.forEach(card => {
                const cardType = card.getAttribute('data-product-type');
                if (cardType === shirtType) {
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
            });
        });
    }
    
    // Configurar el botón de confirmación de cambio
    if (confirmChangeBtn) {
        confirmChangeBtn.addEventListener('click', function() {
            if (pendingProductChange) {
                const newProductType = pendingProductChange.type;
                const productTitle = pendingProductChange.title;
                
                // Primero cerrar los modales para evitar problemas visuales
                // Cerrar el modal de confirmación
                const confirmModalInstance = bootstrap.Modal.getInstance(confirmChangeModal);
                if (confirmModalInstance) {
                    confirmModalInstance.hide();
                }
                
                // Cerrar el modal de selección de producto
                if (modalInstance) {
                    modalInstance.hide();
                }
                
                // Esperar un momento para que se cierren los modales antes de cambiar el producto
                setTimeout(() => {
                    // Cambiar el tipo de producto con la función mejorada que limpia todo
                    changeProductType(newProductType);
                    
                    // Actualizar el nombre del producto en la interfaz
                    if (currentProductNameEl) {
                        currentProductNameEl.textContent = productTitle;
                    }
                    
                    // Actualizar el input oculto si existe
                    if (selectedProductTypeInput) {
                        selectedProductTypeInput.value = newProductType;
                    }
                    
                    // Resetear la variable pendiente
                    pendingProductChange = null;
                }, 300); // Esperar 300ms para que se complete la animación de cierre de los modales
            }
        });
    }
    
    // Manejar clic en las tarjetas de productos
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const newProductType = this.getAttribute('data-product-type');
            const productTitle = this.querySelector('.card-title').textContent;
            
            // Marcar esta tarjeta como seleccionada y desmarcar las demás
            productCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Verificar si hay modificaciones que podrían perderse
            if (hasModifications() && newProductType !== shirtType) {
                // Si hay modificaciones, guardar el cambio pendiente
                pendingProductChange = {
                    type: newProductType,
                    title: productTitle
                };
                
                // No cerrar el modal de selección de producto, solo mostrar el de confirmación encima
                // Esto permite que el modal de confirmación aparezca encima del modal de selección
                const confirmModal = new bootstrap.Modal(confirmChangeModal);
                confirmModal.show();
            } else if (newProductType !== shirtType) {
                // Si no hay modificaciones o es el mismo producto, cambiar directamente
                changeProductType(newProductType);
                if (currentProductNameEl) {
                    currentProductNameEl.textContent = productTitle;
                }
                if (selectedProductTypeInput) {
                    selectedProductTypeInput.value = newProductType;
                }
                if (modalInstance) {
                    modalInstance.hide();
                }
            } else {
                // Si es el mismo producto, solo cerrar el modal
                if (modalInstance) {
                    modalInstance.hide();
                }
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
            isCustomColor = this.hasAttribute('data-custom-color');
            
            if (isCustomColor) {
                customColorOpacity = parseFloat(this.getAttribute('data-opacity') || 0.8);
            }
            
            // Actualizar imagen
            updateShirtImage();
        });
    });
    
    // Carga de archivos
    if (logoUpload) {
        logoUpload.addEventListener('change', function(event) {
            const files = event.target.files;
            if (files && files.length > 0) {
                let hasInvalidFiles = false;
                
                // Verificar cada archivo
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    // Verificar extensión y tipo MIME
                    if (!file.name.toLowerCase().endsWith('.png') || file.type !== 'image/png') {
                        hasInvalidFiles = true;
                        continue; // Saltar este archivo
                    }
                    handleFileUpload(file);
                }
                
                if (hasInvalidFiles) {
                    alert('Solo se permiten archivos en formato PNG.');
                }
                
                // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
                this.value = '';
            }
        });
    }
    
    // Agregar texto
    const addTextBtn = document.getElementById('add-text-btn');
    const clearTextBtn = document.getElementById('clear-text-btn');
    
    if (addTextBtn) {
        addTextBtn.addEventListener('click', addTextToShirt);
    }
    
    // Limpiar campos de texto
    if (clearTextBtn) {
        clearTextBtn.addEventListener('click', function() {
            clearTextForm();
            
            // Efecto visual para indicar que se han limpiado los campos
            this.classList.add('btn-success');
            this.textContent = 'Campos limpiados';
            
            setTimeout(() => {
                this.classList.remove('btn-success');
                this.classList.add('btn-outline-secondary');
                this.textContent = 'Limpiar campos';
            }, 1000);
        });
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
    
    // Manejo del tipo de impresión
    const printTypeOptions = document.querySelectorAll('.print-type-option');
    const printTypeButton = document.getElementById('select-print-type');
    const currentPrintType = document.getElementById('current-print-type');
    const printTypeDisplay = document.getElementById('print-type-display');
    const printTypeDescription = document.getElementById('print-type-description');
    
    // Descripciones para cada tipo de impresión
    const printTypeDescriptions = {
        'Estampado': 'El estampado es ideal para diseños con muchos colores y detalles. Ofrece buena durabilidad y es perfecto para logos complejos.',
        'Bordado': 'El bordado proporciona un acabado elegante y de alta calidad. Es muy duradero y da un aspecto profesional, ideal para logos corporativos.',
        'Sublimado': 'El sublimado permite impresión de alta definición que no se desvanece. Perfecto para imágenes fotográficas y diseños con degradados.'
    };
    
    // Colores de alerta para cada tipo de impresión
    const printTypeColors = {
        'Estampado': 'primary',
        'Bordado': 'success',
        'Sublimado': 'info'
    };
    
    // Iconos para cada tipo de impresión
    const printTypeIcons = {
        'Estampado': 'bi-palette-fill',
        'Bordado': 'bi-threads',
        'Sublimado': 'bi-printer-fill'
    };
    
    // Función para actualizar la información del tipo de impresión
    function updatePrintTypeInfo(printType) {
        // Actualizar el texto que muestra el tipo de impresión seleccionado
        if (currentPrintType) {
            currentPrintType.textContent = printType;
        }
        
        // Actualizar la descripción del tipo de impresión
        if (printTypeDescription) {
            printTypeDescription.textContent = printTypeDescriptions[printType] || 
                'Selecciona el tipo de impresión que mejor se adapte a tus necesidades.';
        }
        
        // Cambiar el color del alert y el icono según el tipo de impresión
        if (printTypeDisplay) {
            // Remover clases de alerta anteriores
            printTypeDisplay.classList.remove('alert-primary', 'alert-success', 'alert-info');
            // Agregar la clase de alerta correspondiente
            printTypeDisplay.classList.add(`alert-${printTypeColors[printType] || 'primary'}`);
            
            // Actualizar el icono
            const iconElement = printTypeDisplay.querySelector('i');
            if (iconElement) {
                // Remover todas las clases de iconos posibles
                iconElement.classList.remove('bi-info-circle-fill', 'bi-palette-fill', 'bi-threads', 'bi-printer-fill');
                // Agregar la clase de icono correspondiente
                iconElement.classList.add(printTypeIcons[printType] || 'bi-info-circle-fill');
            }
        }
    }
    
    // Inicializar con el tipo de impresión predeterminado
    if (printTypeButton) {
        const initialPrintType = printTypeButton.textContent.trim();
        updatePrintTypeInfo(initialPrintType);
    }
    
    if (printTypeOptions.length > 0 && printTypeButton) {
        printTypeOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const printType = this.getAttribute('data-print-type');
                
                // Actualizar el botón del dropdown
                printTypeButton.textContent = printType;
                
                // Actualizar toda la información del tipo de impresión
                updatePrintTypeInfo(printType);
                
                // Aplicar una animación de destello
                if (printTypeDisplay) {
                    printTypeDisplay.style.transition = 'transform 0.3s ease';
                    printTypeDisplay.style.transform = 'scale(1.03)';
                    
                    setTimeout(() => {
                        printTypeDisplay.style.transform = 'scale(1)';
                    }, 300);
                }
                
                // Marcar que se ha cambiado el tipo de impresión
                hasChangedPrintType = true;
            });
        });
    }
    
    function updateTextPreview() {
        if (textPreview) {
            // Aplicar estilos a la vista previa
            textPreview.style.fontFamily = fontFamily.value;
            textPreview.style.fontSize = fontSize.value + 'px';
            textPreview.style.color = fontColor.value;
            textPreview.style.fontWeight = fontBold.checked ? 'bold' : 'normal';
            textPreview.style.fontStyle = fontItalic.checked ? 'italic' : 'normal';
            textPreview.style.textDecoration = fontUnderline.checked ? 'underline' : 'none';
            textPreview.style.textAlign = 'center'; // Centrar el texto en la vista previa
            
            // Mostrar el texto ingresado o un mensaje predeterminado
            if (textInput.value.trim()) {
                textPreview.textContent = textInput.value;
            } else {
                textPreview.textContent = 'Vista previa del texto';
            }
            
            // Aplicar un efecto de destello para indicar la actualización
            textPreview.style.transition = 'background-color 0.3s ease';
            textPreview.style.backgroundColor = '#f8f9fa';
            
            setTimeout(() => {
                textPreview.style.backgroundColor = 'transparent';
            }, 300);
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
    const customColorOpacitySlider = document.getElementById('custom-color-opacity');
    const opacityValueDisplay = document.getElementById('opacity-value');
    
    if (customColorOpacitySlider && opacityValueDisplay) {
        customColorOpacitySlider.addEventListener('input', function() {
            const opacityPercent = this.value;
            opacityValueDisplay.textContent = opacityPercent + '%';
            
            if (colorPreview) {
                colorPreview.style.opacity = opacityPercent / 100;
            }
        });
    }
    
    if (customColorPicker && colorPreview) {
        customColorPicker.addEventListener('input', function() {
            colorPreview.style.backgroundColor = this.value;
        });
    }
    
    if (addCustomColorBtn) {
        addCustomColorBtn.addEventListener('click', function() {
            const colorValue = customColorPicker.value;
            const colorName = document.getElementById('custom-color-name').value || 'Personalizado';
            const opacityValue = customColorOpacitySlider ? customColorOpacitySlider.value / 100 : 0.8;
            

            
            // Guardar el tipo de producto actual para mantenerlo
            const currentProductType = shirtType;
            
            // Crear nueva opción de color
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option custom-color-option';
            colorOption.dataset.color = colorValue;
            colorOption.dataset.name = colorName;
            colorOption.dataset.custom = 'true';
            colorOption.dataset.opacity = opacityValue;
            colorOption.title = colorName;
            colorOption.style.backgroundColor = colorValue;
            
            // Agregar botón de eliminación
            const deleteBtn = document.createElement('div');
            deleteBtn.className = 'delete-color-btn';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.title = 'Eliminar color';
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Evitar que el clic se propague al color
                colorOption.remove();
                
                // Si era el color activo, cambiar a blanco
                if (currentColor === colorValue) {
                    currentColor = 'Blanco';
                    isCustomColor = false;
                    document.querySelector('.color-option[data-color="Blanco"]').classList.add('active');
                    updateShirtImage();
                }
            });
            colorOption.appendChild(deleteBtn);
            
            // Agregar al contenedor de colores
            const colorsContainer = document.getElementById('color-options');
            colorsContainer.appendChild(colorOption);
            
            // Marcar que se ha agregado un color personalizado
            hasCustomColors = true;
            
            // Seleccionar el nuevo color automáticamente
            colorOptions.forEach(opt => opt.classList.remove('active'));
            colorOption.classList.add('active');
            currentColor = colorValue;
            isCustomColor = true;
            customColorOpacity = opacityValue;
            
            // Asegurarnos de que se mantenga el tipo de producto actual
            console.log('Manteniendo el tipo de producto:', currentProductType);
            shirtType = currentProductType;
            
            // Actualizar imagen
            updateShirtImage();
            
            // Cerrar modal
            const colorPickerModal = bootstrap.Modal.getInstance(document.getElementById('colorPickerModal'));
            if (colorPickerModal) colorPickerModal.hide();
            
            // Actualizar la lista de opciones de color
            colorOptions = document.querySelectorAll('.color-option');
            
            // Agregar event listener al nuevo color
            colorOption.addEventListener('click', function() {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                currentColor = this.dataset.color;
                isCustomColor = this.dataset.custom === 'true';
                if (isCustomColor) {
                    customColorOpacity = parseFloat(this.dataset.opacity) || 0.8;
                }
                updateShirtImage();
            });
        });
    }
    
    // Inicializar
    updateColorOptions();
    updateShirtImage();
});
