const camara = document.createElement("input")
const picture = document.querySelector("#picture")

const startCamera = () => {
  camera = document.createElement("input")
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
    }
  })
}

picture.addEventListener("dblclick", startCamera)
