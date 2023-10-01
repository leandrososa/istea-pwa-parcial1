const endpoint = "https://6508d64056db83a34d9cb726.mockapi.io/reelgram-galeria"
const camara = document.createElement("input")
const picture = document.querySelector("#picture")
const publishBtn = document.querySelector("#publish-btn")
const title = document.querySelector("#title")
let hasPicture = false // Controlamos si se cargó la foto

/**
 * Inicia la cámara
 */
const startCamera = () => {
  const camera = document.createElement("input")
  camera.type = "file"
  camera.accept = "image/*"
  camera.capture = "environment"
  camera.click()

  camera.addEventListener("change", (evt) => {
    const selectedFile = evt.target.files[0]
    if (selectedFile) {
      const blob = URL.createObjectURL(selectedFile)
      localStorage.setItem("imageBlob", blob)
      console.log(blob)
      picture.src = blob
      hasPicture = true
    }
  })
}

picture.addEventListener("dblclick", startCamera)

// Opcion de cancelar
document.getElementById("cancel-btn").addEventListener("click", function () {
  if (confirm("¿Desea cancelar? Todo lo ingresado se perderá.")) {
    window.location.href = "index.html"
  }
})

// (Des)activamos el boton de publicar si esta completo el título y hay foto
title.addEventListener(
  "input",
  () => (publishBtn.disabled = !!!title.value && hasPicture),
)

/**
 * Obtiene el base64 de la foto capturada
 * @returns {string} Base64 de la foto
 */
const getImageCode = () => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  canvas.width = picture.width
  canvas.height = picture.height
  ctx.drawImage(picture, 0, 0, picture.width, picture.height)
  // document.querySelector("body").appendChild(canvas)
  return canvas.toDataURL("image/png") //formato base64
}

/**
 * Obtiene la fecha hora actual en el formato solicitado
 * @returns {string} Fecha formateada
 */
function getFormattedDate() {
  const now = new Date()
  const year = now.getFullYear().toString().slice(-2) // 2 digitos del año
  const month = (now.getMonth() + 1).toString().padStart(2, "0") // 2 digitos del mes
  const day = now.getDate().toString().padStart(2, "0") // Dia
  const hours = now.getHours().toString().padStart(2, "0") // Hora
  const minutes = now.getMinutes().toString().padStart(2, "0") // Minutos
  const seconds = now.getSeconds().toString().padStart(2, "0") // Segundos

  const formattedTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`
  return formattedTime
}

const submitPicToGallery = () => {
  const newPic = {
    imagen: getImageCode(),
    titulo: title.value,
    fecha: getFormattedDate(),
  }
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPic),
  })
    .then((response) => {
      console.log(response)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("No se pudo crear el recurso.")
      }
    })
    .then((datos) => {
      //inputId.value = datos.id
      console.log("Producto agregado con éxito")
      //notificarOperacion("El producto fue agregado con éxito.", "noti-ok")
    })
    .catch(
      (error) => console.log(error),
      //notificarOperacion("No se pudo crear el recurso", "noti-ko"),
    )
}
publishBtn.addEventListener("click", submitPicToGallery)
