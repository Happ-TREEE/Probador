// app.js
let categoriaSeleccionada = null;
let coloresSeleccionados = [];

window.addEventListener('load', function () {
    var productoModal = new bootstrap.Modal(document.getElementById('productoModal'));
    productoModal.show();
});

document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/productos_con_colores')
        .then(res => res.json())
        .then(productos => {
            const contenedor = document.querySelector('.row-cols-md-4');

            // Función: convierte HEX a HSL
            function hexToHsl(hex) {
                hex = hex.replace('#', '');
                let r = parseInt(hex.substring(0, 2), 16) / 255;
                let g = parseInt(hex.substring(2, 4), 16) / 255;
                let b = parseInt(hex.substring(4, 6), 16) / 255;

                const max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;

                if (max === min) {
                    h = s = 0; // achromatic
                } else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
                        case g: h = ((b - r) / d + 2); break;
                        case b: h = ((r - g) / d + 4); break;
                    }
                    h = h * 60;
                }
                return { h, s, l };
            }

            productos.forEach(p => {
                const col = document.createElement("div");
                col.className = "col";

                // Ordenar colores por tono (HSL hue)
                const coloresOrdenados = [...p.colores].sort((a, b) => {
                    const hslA = hexToHsl(a.color_hex);
                    const hslB = hexToHsl(b.color_hex);

                    // Primero por luminosidad, luego por tono
                    return hslA.l - hslB.l || hslA.h - hslB.h;
                });

                const badges = coloresOrdenados.map(c => {
                    const nombreColor = c.nombre.replace(/_/g, ' ');
                    return `<div title="${nombreColor}" style="
                    background-color: ${c.color_hex};
                    width: 20px;
                    height: 20px;
                    border-radius: 6px;
                    border: 1px solid #ccc;
                    margin: 4px;
                    display: inline-block;
                "></div>`;
                }).join("");

                const nombreCategoria = p.categoria.replace(/_/g, ' ');

                col.innerHTML = `
                    <button class="card h-100 text-center">
                    <img src="${p.imagen_blanco}" class="card-img-top" alt="${nombreCategoria}">
                    <div class="card-body">
                        <div class="d-flex flex-wrap justify-content-center">
                        ${badges}
                        </div>
                        <div class="text-muted small mt-2">${nombreCategoria}</div>
                    </div>
                    </button>
                `;
                col.querySelector('.card').addEventListener('click', () => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('productoModal'));
                    if (modal) modal.hide();

                    // ✅ Guardamos solo los colores
                    categoriaSeleccionada = p.categoria;
                    coloresSeleccionados = coloresOrdenados;

                    const contentimg = document.getElementById('contentimg');
                    contentimg.innerHTML = `
                    <img src="${p.imagen_blanco}" alt="${nombreCategoria}" style="max-height: 100%; max-width: 100%;">
                    <div id="fixedBox" class="flex-grow-1 text-center"
                        style="margin-left: rem; padding-right: 0; height: 400px; position: relative;">
                        <!-- Aquí van los textos añadidos -->
                    </div>
                `;
                });

                contenedor.appendChild(col);
            });
        })
        .catch(err => console.error("❌ Error cargando productos:", err));
});

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.sidebar-btn');
    const contentArea = document.getElementById('contentArea');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            loadSection(section);
        });
    });

    function loadSection(section) {
        switch (section) {
            case 'producto':
                import('./producto.js').then(module => {
                    module.loadProducto({
                        categoria: categoriaSeleccionada,
                        colores: coloresSeleccionados
                    });
                });
                break;            
            case 'subidas':
                import('./subidas.js').then(module => module.loadSubidas());
                break;
            case 'texto':
                import('./texto.js').then(module => module.loadTexto());
                break;
            case 'disenos':
                import('./disenos.js').then(module => module.loadDisenos());
                break;
            case 'capas':
                import('./capas.js').then(module => module.loadCapas());
                break;
        }
    }
});
