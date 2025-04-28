// producto.js
export function loadProducto() {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
                        <div class="producto-info" style="text-align: left; max-width: 30rem; margin: 0 auto;">
                            <h4 style="font-size: 1.5rem; font-weight: bold;">Sudadera eco unisex | Stanley/Stella STSU178</h4>
                            <div style="display: flex; align-items: center; margin-top: 0.5rem;">
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
}