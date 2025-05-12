export function loadProducto({ categoria, colores }) {
    const contentArea = document.getElementById('contentArea');
    const contentimg = document.getElementById('contentimg'); // contenedor donde está la imagen

    const colorButtons = colores.map(c => `
      <button
        data-color="${c.nombre}"
        class="color-btn"
        style="
          width: 2rem;
          height: 2rem;
          background: ${c.color_hex};
          border: 1px solid #ccc;
          border-radius: 0.25rem;"
        title="${c.nombre.replace(/_/g, ' ')}"
      ></button>
    `).join('');

    const nombreCategoria = categoria.replace(/_/g, ' ');

    contentArea.innerHTML = `
            <div class="producto-info" style="text-align: left; max-width: 30rem; margin: 0 auto;">
                <h4 style="font-size: 1.5rem; font-weight: bold;">${nombreCategoria}</h4>
                <hr style="margin: 1rem 0;">
                <div class="color" style="margin-top: 1.5rem;">
                    <p style="font-weight: bold;">Color</p>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        ${colorButtons}
                    </div>
                </div>
            </div>
            <div class="talla" style="margin-top: 1.5rem;">
                <p style="font-weight: bold;">Talla</p>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                    <input type="checkbox" id="selectAll" />
                    <label for="selectAll" style="margin-right: 1rem;">Seleccionar todos</label>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 0.5rem;">
                    <label><input type="checkbox" checked> S</label>
                    <label><input type="checkbox"> M</label>
                    <label><input type="checkbox"> L</label>
                    <label><input type="checkbox"> XL</label>
                    <label><input type="checkbox"> 2XL</label>
                </div>
            </div>
        </div>
    `;


    // EVENTOS PARA CAMBIAR IMAGEN SEGÚN COLOR
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.getAttribute('data-color');
            const encodedCategoria = encodeURIComponent(categoria);
            const encodedColor = encodeURIComponent(color);
            const ruta = `/static/img/creador/${encodedCategoria}/${encodedColor}/${encodedColor}_frente.png`;

            // Reemplaza solo la imagen en contentimg
            contentimg.innerHTML = `
          <img src="${ruta}" alt="${color.replace(/_/g, ' ')}" style="max-height: 100%; max-width: 100%;">
          <div id="fixedBox" class="flex-grow-1 text-center"
            style="margin-left: rem; padding-right: 0; height: 400px; position: relative;">
          </div>
        `;
        });
    });

    // Marcar/deseleccionar todos los checkboxes de talla
    const selectAll = document.getElementById('selectAll');
    const tallaCheckboxes = contentArea.querySelectorAll('.talla input[type="checkbox"]:not(#selectAll)');

    selectAll.addEventListener('change', () => {
        tallaCheckboxes.forEach(cb => {
            cb.checked = selectAll.checked;
        });
    });

}
