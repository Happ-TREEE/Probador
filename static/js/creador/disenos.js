export function loadDisenos() {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
      <div style="max-width: 600px; margin: auto; font-family: sans-serif;">
        <!-- Buscador y favoritos -->
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="text" placeholder="Buscar en diseños rápidos" class="form-control" style="flex: 1;">
          <i class="fas fa-heart"></i>
        </div>
  
        <hr>
  
        <!-- Usado recientemente -->
        <h6 class="mt-3" style="font-weight: bold;">Usado recientemente</h6>
        <div style="padding: 1rem 0;">
          <img src="https://via.placeholder.com/100x60?text=Your+text+here" alt="Usado recientemente">
        </div>
  
        <!-- Contenedor dinámico de categorías -->
        <div class="row-categorias mt-4"></div>
      </div>
    `;

    fetch('/api/diseno_categorias')
        .then(res => res.json())
        .then(categorias => {
            const contenedor = document.querySelector('.row-categorias');

            categorias.forEach(cat => {
                const bloque = document.createElement('div');
                bloque.className = 'mb-4';

                const imagenesHTML = cat.imagenes.map(src => `
                <div class="col">
                    <img src="${src}" class="img-fluid rounded diseño-img" alt="" style="width: 100%; max-width: 100px; cursor: pointer;">
                </div>
            `).join('');

                bloque.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h6 style="font-weight: bold;">${cat.nombre}</h6>
              <a href="#" style="font-size: 0.9rem;">Ver más</a>
            </div>
            <div class="row row-cols-3 g-2">
              ${imagenesHTML}
            </div>
          `;
                contenedor.appendChild(bloque);

                bloque.querySelectorAll('.diseño-img').forEach(img => {
                    img.addEventListener('dblclick', () => {
                        const fixedBox = document.getElementById('fixedBox');
                        if (fixedBox) {
                            addImageToFixedBox(fixedBox, img.src);
                        }
                    });
                });
            });
        });
}

// ✅ FUNCIONES DE MANIPULACIÓN DE IMÁGENES EN EL CANVAS
function addImageToFixedBox(fixedBox, imageUrl) {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-box');
    imageWrapper.style.position = 'absolute';
    imageWrapper.style.cursor = 'move';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '150px';
    img.style.maxHeight = '150px';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.classList.add('remove-image-btn');
    removeButton.style.position = 'absolute';
    removeButton.style.top = '0';
    removeButton.style.right = '0';
    removeButton.style.background = 'red';
    removeButton.style.color = 'white';
    removeButton.style.border = 'none';
    removeButton.style.borderRadius = '50%';
    removeButton.style.width = '20px';
    removeButton.style.height = '20px';
    removeButton.style.display = 'none';

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(removeButton);
    fixedBox.appendChild(imageWrapper);

    makeImageMovable(imageWrapper);
    enableImageEditing(imageWrapper, removeButton);
}

function makeImageMovable(element) {
    let offsetX, offsetY, isDragging = false;

    element.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        element.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
        element.style.cursor = 'move';
    });
}

function enableImageEditing(imageElement, removeButton) {
    imageElement.addEventListener('dblclick', function () {
        imageElement.style.border = '2px dashed #000';
        removeButton.style.display = 'block';
    });

    removeButton.addEventListener('click', function () {
        imageElement.remove();
    });

    imageElement.addEventListener('mouseleave', function () {
        imageElement.style.border = 'none';
        removeButton.style.display = 'none';
    });
}
