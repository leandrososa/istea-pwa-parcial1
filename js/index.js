const endpoint = "https://6508d64056db83a34d9cb726.mockapi.io/reelgram-galeria"
const currentGalleryElement = document.querySelector("#current-gallery")
const cameraBtn = document.querySelector("#camera-btn")
let camera

fetch(endpoint)
  .then((response) => response.json())
  .then((json) => (currentGalleryElement.innerHTML = renderGallery(json)))

/**
 * Retorna el codigo HTML de una card de imagen
 * @param {number} id Id de la imagen
 * @param {string} image Base64 de la imagen
 * @param {string} title Titulo de la imagen
 * @param {string} date Fecha formateada
 * @returns {string} HTML del card
 */
const renderPicture = (id, image, title, date) => `
    <div class="card mb-5" data-image-id="${id}">
        <header class="card-header">
            <p class="card-header-title">
                ${title}
            </p>
        </header>
        <div class="card-image">
            <figure class="image">
                <img src="${image}" alt="${title}">
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <p>${date}</p>
            </div>
        </div>
    </div>
`

/**
 * Retorna el codigo HTML de la galeria de imgenes.
 * @param {Array} json Conjunto de imagenes desde api
 */
const renderGallery = (json) => {
  let html = ""
  json.forEach((element) => {
    html += renderPicture(
      element.id,
      element.imagen,
      element.titulo,
      element.fecha,
    )
  })
  return html
}
