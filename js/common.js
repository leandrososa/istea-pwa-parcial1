/**
 * Mostrar mensaje de notificacion en el tope de pagina
 * @param {string} msg Mensaje a mostrar en la notificacion
 * @param {string} color Clase de color de Bulma
 * @param {object} adjElement Elemento hermano a ser insertado previamente
 */
const showNotification = (msg, color, adjElement) => {
  clearNotification()
  adjElement.insertAdjacentHTML(
    "beforebegin",
    `
      <div id="current-notif" class="notification is-${color}">
        ${msg}
      </div>
    `,
  )
}

/**
 * Limpiar notificacion si existe
 */
const clearNotification = () => {
  const notif = document.querySelector("#current-notif")
  if (notif) notif.remove()
}
