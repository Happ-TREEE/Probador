
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.sidebar-btn');
    const contentArea = document.getElementById('contentArea');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');

            switch (section) {
                case 'producto':
                    contentArea.innerHTML = `
                            <h3 style="font-size: 2rem;">Selecciona tu Producto</h3>
                            <p>Elige entre camisetas, sudaderas, gorras y más.</p>
                        `;
                    break;

                case 'subidas':
                    contentArea.innerHTML = `
                            <h3 style="font-size: 2rem;">Sube tu Diseño</h3>
                            <input type="file" id="uploadImage" accept="image/*" class="form-control mb-3" style="max-width: 18rem; margin:auto;">
                            <div id="canvas-container" style="position: relative; width: 18rem; height: 24rem; margin:auto;">
                                <canvas id="myCanvas" width="300" height="400" style="position: absolute; border: 0.05rem solid #ccc;"></canvas>
                            </div>
                        `;
                    activarCanvas();
                    break;

                case 'texto':
                    contentArea.innerHTML = `
                            <h3 style="font-size: 2rem;">Agrega Texto</h3>
                            <input type="text" id="textInput" class="form-control mb-3" style="max-width: 18rem; margin:auto;" placeholder="Escribe tu texto">
                            <button class="btn btn-primary mb-3" onclick="agregarTexto()">Agregar al Canvas</button>
                            <div id="canvas-container" style="position: relative; width: 18rem; height: 24rem; margin:auto;">
                                <canvas id="myCanvas" width="300" height="400" style="position: absolute; border: 0.05rem solid #ccc;"></canvas>
                            </div>
                        `;
                    activarCanvas();
                    break;

                case 'disenos':
                    contentArea.innerHTML = `
                            <h3 style="font-size: 2rem;">Explora Diseños</h3>
                            <p>Aquí podrás ver plantillas y diseños prediseñados.</p>
                        `;
                    break;

                case 'clipart':
                    contentArea.innerHTML = `
                            <h3 style="font-size: 2rem;">Clipart y Gráficos</h3>
                            <p>Explora miles de íconos, stickers y gráficos gratuitos.</p>
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
