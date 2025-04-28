// disenos.js
export function loadDisenos() {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
                        <div class="artwork-categories" style="max-width: 25rem; margin: auto; text-align: left;">
                            <h5 style="font-weight: bold; text-align: center;">Artwork Categories</h5>
                            <div class="input-group mb-4 mt-2">
                                <span class="input-group-text"><i class="fas fa-search"></i></span>
                                <input type="text" class="form-control" placeholder="Search For Artwork" id="searchArtwork">
                            </div>
                            <!-- Categorías -->
                            <div class="row row-cols-2 g-3">
                                <!-- Artículos aquí -->
                            </div>
                        </div>
                    `;
}
