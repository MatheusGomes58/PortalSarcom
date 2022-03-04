const db = firebase.firestore()
let anuncios = []
let currentUser = {}

function getUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser.uid = user.uid
      let userLabel = document.getElementById("navbarDropdown")
      userLabel.innerHTML = user.email
    } else {
      swal
        .fire({
          icon: "success",
          title: "Redirecionando para a tela de autenticação",
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace("https://www.clientestarcom.com/")
          }, 1000)
        })
    }
  })
}


function renderInfos() {
  let infoList = document.getElementById("anuncio")
  infoList.innerHTML = ""
  for (let anuncio of anuncios) {
    const newInfo = document.createElement("h4")
    newInfo.setAttribute("class","text-justify")
    newInfo.appendChild(document.createTextNode(anuncio.title))
    infoList.appendChild(newInfo)
  }
}

async function readInfos() {
  anuncios = []
    const logAnuncio = await db.collection("informacao").get()
    for (doc of logAnuncio.docs){
        anuncios.push({
            id: doc.data().id,
            title: doc.data().info,
        })
    }
    renderInfos()
}


window.onload = function () {
  getUser()
  readInfos()
  readUsers()
  readClientes()
}
