const db = firebase.firestore()
const storage = firebase.storage()
const input = document.querySelector('input[type=file]')
const fileToUpload = ""
let Valor = []
let Pays = []
let currentUser = {}
let currentValor = {}
let currentuser = ""

function getUser() {
  if (currentUser.username == "STARCOM"){
    $('#criarnovoregistro').show();
    $('#registrar').show();
  }else{
    $('#criarnovoregistro').hide();
    $('#registrar').hide();
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
      $('#criarnovoregistro').show();
      $('#registrar').show();
    }else{
      $('#criarnovoregistro').hide();
      $('#registrar').hide();
    }

    readPay(currentUser.username)
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

window.onload = function () {
  getUser()
  readValors()
}


/* 
* administração da tabela de pagamentos
*/

function renderPays() {
  let PayList = document.getElementById("tablePay")
  PayList.innerHTML = ""
  for (let pay of Pays) {
    const newPay = document.createElement("tr")
    const status = document.createElement("th")
    const username = document.createElement("th")
    const valor = document.createElement("th")
    const date = document.createElement("th")
    const file = document.createElement("th")
    const fileDow = document.createElement("a")
    const filets = document.createElement("button")
    status.appendChild(document.createTextNode(pay.status))
    status.setAttribute("class","text-center")
    username.appendChild(document.createTextNode(pay.username))
    username.setAttribute("class","text-center")
    valor.appendChild(document.createTextNode(pay.valor))
    valor.setAttribute("class","text-center")
    date.appendChild(document.createTextNode(pay.date))
    date.setAttribute("class","text-center")
    filets.setAttribute("class","btn btn-outline-secondary justify-content-md-center")
    filets.appendChild(document.createTextNode("Link para download"))
    fileDow.setAttribute("href", pay.file)
    fileDow.appendChild(filets)
    file.appendChild(fileDow)
    newPay.appendChild(status)
    newPay.appendChild(username)
    newPay.appendChild(valor)
    newPay.appendChild(date)
    newPay.appendChild(file)
    PayList.appendChild(newPay)
  }
}

async function readPay(VALOR) {
  Pays = []
  const logPays = await db
    .collection("payments")
    .where("username", "==", VALOR)
    .get()
  for (doc of logPays.docs) {
    Pays.push({
      status: doc.data().status,
      username: doc.data().username,
      valor: doc.data().valor,
      date: doc.data().date,
      file: doc.data().file,
      id: doc.id,
    })
  }
  renderPays()
}

$(document).ready(function(){
  $('#inputUserUsernameValor').on('change',function(){
    var userSelected = $(this).val();
    readPay(userSelected)
  })

  $('#ValorCash').mask('#.##0,00', {reverse: true});

  $('#dateLaunch').on('change',function(){
    console.log(document.getElementById("dateLaunch").value)
  })
})


async function addPay(VALOR) {
  const status = document.getElementById("inputStatus").value
  const username = document.getElementById("inputUserUsernameValor").value
  const valor = document.getElementById("ValorCash").value
  const date = document.getElementById("dateLaunch").value
  const logPayments = await db.collection("payments").where("date", "==", date).get()
  let currentPay = {}

  if (logPayments.docs.length == 0) {
    salvar(VALOR , status, username, valor, date)
  } else {
    const DataPay = logPayments.docs[0]
    currentPay.id = DataPay.id
    atualizar(VALOR , status, username, valor, date, currentPay.id)
  }

  readPay(username)
}

async function salvar(VALOR , status, username, valor, date){
  await db.collection("payments").add({
    status: status,
    username: username,
    valor: valor,
    date: date,
    file: VALOR,
  })  
}

async function atualizar(VALOR , status, username, valor, date, id){
  await db.collection("payments").doc(id).update({
    status: status,
    username: username,
    valor: valor,
    date: date,
    file: VALOR,
  }) 
}


document.getElementById("FormControlFile").addEventListener('change',(e)=>{
  let file = e.target.files[0]
  swal
  .fire({
    icon: "warning",
    title: "Lançando nova nota/boleto",
    text: "Deseja mesmo lançar uma nova nota/boleto?",
    showCancelButton: true,
    cancelButtonText: "Não",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim",
    confirmButtonColor: "#3085d6",
  })


  .then((result) => {
    if (result.value) {
      const uploadTask = storage.ref("payments").child(file.name)
      .put(file)
      uploadTask.on("state_changed",function(snapshot){
      let progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 1
        document.querySelector('progress').value = progress
      },function (error){}, function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url_image){
          console.log('upload realizado com sucesso')
          console.log("Url: "+ url_image)
          addPay(url_image)
        })
      })
    }
  })
})