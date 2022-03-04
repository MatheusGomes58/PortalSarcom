const db = firebase.firestore()
const storage = firebase.storage()
const input = document.querySelector('input[type=file]')
let link = []
let Valor = []
let currentUser = {}
let currentValor = {}
let currentLink = {}
let currentuser = ""

function getUser() {
  if (currentUser.username == "STARCOM"){
    $('#Atualizar').show();
    $('#Atualizarcontrato').show();
    $('#collapseTwo').hide();
  }else{
    $('#Atualizar').hide();
    $('#Atualizarcontrato').hide();
    $('#collapseTwo').hide();
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser.uid = user.uid
      let userLabel = document.getElementById("navbarDropdown")
      let email = user.email
      userLabel.innerHTML = user.email
      obterusername(email)
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

async function obterusername(Valor){
    const Info = await db.collection("profile").where("email", "==", Valor).get()
    if (Info.docs.length == 0) {     
    } else {
      profile = true
      const userData = Info.docs[0]
      currentUser.username = userData.data().username
    }    
  
    const dates = await db.collection("plans").where("usename", "==", currentUser.username).get()
    if (dates.docs.length == 0) {     
    } else {
      profile = true
      const idplans = dates.docs[0]
      currentUser.id = idplans.id
    }    
  
    if (currentUser.username == "STARCOM"){
      $('#Atualizar').show();
      $('#Atualizarcontrato').show();
      $('#collapseTwo').hide();
    }else{
      $('#Atualizar').hide();
      $('#Atualizarcontrato').hide();
      $('#collapseTwo').hide();
    }
  
    serchContract(currentUser.username)
}

async function readValors() {
    users = []
    const logUsersValor = await db.collection("clientes").get()
    for (doc of logUsersValor.docs){
        Valor.push({
            id: doc.data().id,
            title: doc.data().cliente,
        })
    }
    renderValors()
}

function renderValors() {
    let ValorList = document.getElementById("inputUserUsernameValor")
    ValorList.innerHTML = ""
    for (let valore of Valor) {
      const newValor = document.createElement("option")
      newValor.setAttribute("class","form-group")
      newValor.appendChild(document.createTextNode(valore.title))
      ValorList.appendChild(newValor)
    }
}

async function serchContract(VALOR){
  currentuser = VALOR 
  const selectLink = await db.collection("contract").where("username", "==", VALOR).get()
  for (doc of selectLink.docs){
    link.push({
        id: doc.data().id,
        title: doc.data().link,
    })
  }
  let linklist = document.getElementById("doctype")
  linklist.innerHTML = ""
  for (let links of link) {
    const newFile = document.createElement("embed")
    newFile.setAttribute("id","contractitem")
    newFile.setAttribute("class","justify-content-md-center")
    newFile.setAttribute("width","100%")
    newFile.setAttribute("height","600")
    newFile.setAttribute("type","application/pdf")
    newFile.setAttribute("src",links.title)
    linklist.appendChild(newFile)
  }
}


input.addEventListener('change',(e)=>{
  let file = e.target.files[0]
  swal
  .fire({
    icon: "warning",
    title: "Processo de atualização",
    text: "Deseja mesmo atualizar o contrato atual?",
    showCancelButton: true,
    cancelButtonText: "Não",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim",
    confirmButtonColor: "#3085d6",
  })
  .then((result) => {
    if (result.value) {
      const uploadTask = storage.ref("Contract").child(file.name)
      .put(file)
      uploadTask.on("state_changed",function(snapshot){
      let progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 1
        document.querySelector('progress').value = progress
      },function (error){}, function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url_image){
          console.log('upload realizado com sucesso')
          console.log("Url: "+ url_image)
          addContract(url_image)
        })
      })
    }
  })
})

async function addContract(url_image) {
  const user = document.getElementById("inputUserUsernameValor").value
  const selectLink = await db.collection("contract").where("username", "==", user).get()
  const userDataLink = selectLink.docs[0]
  link.id = userDataLink.id
  await db.collection("contract").doc(link.id).update({username: user, link: url_image,})
  swal.fire({
    icon: "success",
    title: "Contrato alterado com sucesso",
  })
  setTimeout(() => {
    window.location.replace("contract.html")
  }, 1000)
}

window.onload = function () {
    getUser()
    readValors()
    $('#collapseTwo').hide();
  }

  $(document).ready(function(){
    $('#inputUserUsernameValor').on('change',function(){
        for (let i = link.length; i > 0; i--) {
          link.pop();
        }
        var userSelected = $(this).val();
        serchContract(userSelected)
      })
  })