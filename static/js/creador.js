document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.sidebar-btn');
    const contentArea = document.getElementById('contentArea');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');

            switch (section) {
                case 'producto':
                    contentArea.innerHTML = `
                            <div class="producto-info" style="text-align: left; max-width: 30rem; margin: 0 auto;">
                            <h4 style="font-size: 1.5rem; font-weight: bold;">Sudadera eco unisex | Stanley/Stella STSU178</h4>
                            <div style="display: flex; align-items: center; margin-top: 0.5rem;">
                                <span style="color: #ffc107; font-size: 1.2rem;">★ 4.5</span>
                                <a href="#" style="margin-left: 0.5rem; font-size: 0.9rem; text-decoration: underline;">123 Reseñas</a>
                                <span style="margin-left: 1rem; font-size: 0.9rem; color: gray;">| Precios y guías de archivo</span>
                            </div>

                            <hr style="margin: 1rem 0;">

                            <div class="tecnica">
                                <p style="font-weight: bold;">Técnica</p>
                                <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                                    <button class="btn btn-outline-dark" style="flex: 1;">Impresión DTG</button>
                                    <button class="btn btn-light" style="flex: 1; border: 1px solid #ccc; position: relative;">
                                        Bordado
                                        <span style="background: red; color: white; font-size: 0.7rem; padding: 0.2rem 0.4rem; border-radius: 0.5rem; position: absolute; top: -0.5rem; right: -0.5rem;">Nuevo</span>
                                    </button>
                                </div>
                            </div>

                            <div class="color" style="margin-top: 1.5rem;">
                                <p style="font-weight: bold;">Color</p>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button style="width: 2rem; height: 2rem; background: #000; border: 1px solid #ccc; border-radius: 0.25rem;"></button>
                                    <button style="width: 2rem; height: 2rem; background: #111827; border: 1px solid #ccc; border-radius: 0.25rem;"></button>
                                    <button style="width: 2rem; height: 2rem; background: white; border: 2px solid black; border-radius: 0.25rem;"></button>
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
                    break;

                case 'subidas':
                    const modal = new bootstrap.Modal(document.getElementById('subidasModal'));
                    modal.show();
                    break;

                case 'texto':
                    contentArea.innerHTML = `
                            <div class="editor-texto" style="max-width: 25rem; margin: auto; text-align: left;">

                            <h5 style="font-weight: bold;">Edit Text</h5>

                            <!-- Texto -->
                            <input type="text" id="textInputEditor" class="form-control mb-3" placeholder="Escribe aquí">

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

                            <!-- Rotación -->
                            <div class="mb-3">
                                <label style="font-weight: bold;">Rotation</label>
                                <div class="d-flex align-items-center">
                                    <input type="range" id="rotationSlider" class="form-range me-2" min="0" max="360" value="0">
                                    <input type="number" id="rotationValue" class="form-control" style="width: 4rem;" value="0">
                                </div>
                            </div>

                            <!-- Outline -->
                            <div class="mb-3">
                                <label style="font-weight: bold;">Outline</label>
                                <div class="d-flex align-items-center gap-2">
                                    <input type="color" id="outlineColor" class="form-control form-control-color" value="#00a86b">
                                    <select id="outlineThickness" class="form-select" style="width: 8rem;">
                                        <option value="small">Small</option>
                                        <option value="medium" selected>Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Tamaño del texto -->
                            <div class="mb-3">
                                <label style="font-weight: bold;">Text Size</label>
                                <input type="number" id="textSize" class="form-control" min="1" value="20">
                            </div>

                            <!-- Alineación -->
                            <div class="d-flex justify-content-around mt-3">
                                <button class="btn btn-light" id="alignLeft">🔙 Left</button>
                                <button class="btn btn-light" id="alignCenter">➖ Center</button>
                                <button class="btn btn-light" id="alignRight">🔜 Right</button>
                            </div>

                        </div>
                        `;
                    activarCanvas();
                    break;

                case 'disenos':
                    contentArea.innerHTML = `
                            <div class="artwork-categories" style="max-width: 25rem; margin: auto; text-align: left;">
    
                            <h5 style="font-weight: bold; text-align: center;">Artwork Categories</h5>

                            <!-- Buscador -->
                            <div class="input-group mb-4 mt-2">
                                <span class="input-group-text"><i class="fas fa-search"></i></span>
                                <input type="text" class="form-control" placeholder="Search For Artwork" id="searchArtwork">
                            </div>

                            <!-- Categorías -->
                            <div class="row row-cols-2 g-3">

                                <div class="col">
                                    <button class="btn btn-light w-100 p-3 d-flex flex-column align-items-center justify-content-center" style="height: 8rem;">
                                        <i class="fas fa-laugh-beam fa-2x"></i>
                                        <small>Emojis</small>
                                    </button>
                                </div>

                                <div class="col">
                                    <button class="btn btn-light w-100 p-3 d-flex flex-column align-items-center justify-content-center" style="height: 8rem;">
                                        <i class="fas fa-star fa-2x"></i>
                                        <small>Shapes & Symbols</small>
                                    </button>
                                </div>

                                <div class="col">
                                    <button class="btn btn-light w-100 p-3 d-flex flex-column align-items-center justify-content-center" style="height: 8rem;">
                                        <i class="fas fa-basketball-ball fa-2x"></i>
                                        <small>Sports & Games</small>
                                    </button>
                                </div>

                                <div class="col">
                                    <button class="btn btn-light w-100 p-3 d-flex flex-column align-items-center justify-content-center" style="height: 8rem;">
                                        <i class="fas fa-font fa-2x"></i>
                                        <small>Letters & Numbers</small>
                                    </button>
                                </div>

                                <div class="col">
                                    <button class="btn btn-light w-100 p-3 d-flex flex-column align-items-center justify-content-center" style="height: 8rem;">
                                        <i class="fas fa-dog fa-2x"></i>
                                        <small>Animals</small>
                                    </button>
                                </div>

                                <div class="col">
                                    <button class="btn btn-light w-100 p-3 d-flex flex-column align-items-center justify-content-center" style="height: 8rem;">
                                        <i class="fas fa-paw fa-2x"></i>
                                        <small>Mascots</small>
                                    </button>
                                </div>

                                <div class="col">
                                    <button class="btn btn-light w-100 p-3 d-flex flex-column align-items-center justify-content-center" style="height: 8rem;">
                                        <i class="fas fa-mountain fa-2x"></i>
                                        <small>Nature</small>
                                    </button>
                                </div>

                                <div class="col">
                                    <button class="btn btn-light w-100 p-3 d-flex flex-column align-items-center justify-content-center" style="height: 8rem;">
                                        <i class="fas fa-flag-usa fa-2x"></i>
                                        <small>America</small>
                                    </button>
                                </div>

                            </div>

                        </div>
                        `;
                    break;

                case 'capas':
                    contentArea.innerHTML = `
                            <h3 style="font-size: 2rem;">Administra Capas</h3>
                            <p>Organiza los elementos de tu diseño fácilmente.</p>
                        `;
                    break;
            }
        });
    });

    function activarCanvas() {
        const uploadImage = document.getElementById('uploadImage');
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        let img = new Image();

        if (uploadImage) {
            uploadImage.addEventListener('change', function (e) {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onload = function (event) {
                    img.onload = function () {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 50, 150, 200, 200);
                    };
                    img.src = event.target.result;
                };

                reader.readAsDataURL(file);
            });
        }
    }

    window.agregarTexto = function () {
        const textInput = document.getElementById('textInput');
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        const texto = textInput.value;
        if (texto.trim() !== '') {
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(texto, 50, 50);
        }
    }
});