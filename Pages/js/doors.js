const db = firebase.firestore()
const storage = firebase.storage()
const database = firebase.database()
let Valor = []
let Door = []
let item = []
let Equipament = []
let currentUser = {}

window.onload = function () {
    getUser()
    readValors()
    readEquipament()
}

function getUser() {
    if (currentUser.username == "STARCOM"){
        $('#ADMACESS').show();
        $('#ADMINPUTDOOR').show();
        $('#ADMINPUTREPORT').show();
        $('#confidencial').show();
        $('#ADM').show();
        $('#ADMM').show();
        const ssd = document.getElementById('firstDate').removeAttribute("readonly")
        const sata = document.getElementById('Observacoes').removeAttribute("readonly")
      }else{
        $('#ADMACESS').hide();
        $('#ADMINPUTDOOR').hide();
        $('#ADMINPUTREPORT').hide();
        $('#confidencial').hide();
        $('#ADM').hide();
        $('#ADMM').hide();
        const ssd = document.getElementById('firstDate').setAttribute("readonly","true")
        const sata = document.getElementById('Observacoes').setAttribute("readonly","true")
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

    readDoors(currentUser.username)
    

    if (currentUser.username == "STARCOM"){
      $('#ADMACESS').show();
      $('#ADMINPUTDOOR').show();
      $('#ADMINPUTREPORT').show();
      $('#confidencial').show();
      $('#ADM').show();
      $('#ADMM').show();
      const ssd = document.getElementById('firstDate').removeAttribute("readonly")
      const sata = document.getElementById('Observacoes').removeAttribute("readonly")
    }else{
      $('#ADMACESS').hide();
      $('#ADMINPUTDOOR').hide();
      $('#ADMINPUTREPORT').hide();
      $('#confidencial').hide();
      $('#ADM').hide();
      $('#ADMM').hide();
      const ssd = document.getElementById('firstDate').setAttribute("readonly","true")
      const sata = document.getElementById('Observacoes').setAttribute("readonly","true")
    }
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
      newValor.setAttribute("value",valore.title)
      newValor.appendChild(document.createTextNode(valore.title))
      ValorList.appendChild(newValor)
    }
}


$(document).ready(function(){

    $('#inputUserUsernameValor').on('change',function(){
        for (let i = Door.length; i > 0; i--) {
            Door.pop();
        }
        var userSelected = $(this).val();
        readDoors(userSelected)
    })

    document.getElementById("client").textContent = document.getElementById("inputUserUsernameValor").value
    document.getElementById("door").textContent = document.getElementById("inputDoors").value
    document.getElementById("document").textContent = document.getElementById("inputReport").value
    

    $('#inputUserUsernameValor').on('change',function(){
      var doorSelected = $(this).val();
      document.getElementById("client").textContent = doorSelected
    })
    $('#inputDoors').on('change',function(){
        var doorSelected = $(this).val();
        document.getElementById("door").textContent = doorSelected
    })
    $('#inputReport').on('change',function(){
      var reportSelected = $(this).val();
      document.getElementById("document").textContent = "Registro " + reportSelected
  })
})

async function readDoors(VALOR) {
    Door = []
    const logDoors = await db.collection("doors")
        .where("username","==",VALOR)
        .get()
    for (doc of logDoors.docs){
        Door.push({
            id: doc.data().id,
            title: doc.data().door,
        })
    }
    Door.sort(function (a, b) {
      return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
    });

    renderDoors()
}

function renderDoors() {
    let DoorList = document.getElementById("inputDoors")
    DoorList.innerHTML = ""
    for (let Doors of Door) {
      const newDoor = document.createElement("option")
      newDoor.setAttribute("class","form-group")
      newDoor.appendChild(document.createTextNode(Doors.title))
      DoorList.appendChild(newDoor)
    }
}


async function salvarDoor(){
  const Door = document.getElementById("doorId").value
  const DoorList = document.getElementById("inputDoors").value
  const username = document.getElementById("inputUserUsernameValor").value
  const docuid = username + " " + Door 
  const doorLocation = await db.collection("doors")
        .where("username", "==", username)
        .where("door", "==", Door)
        .get()
  let currentDoor = {}
  if(Door == ""){
    swal.fire({
      icon: "error",
      title: "Por favor insira valores válidos!",
    }) 
  }else{
    if (doorLocation.docs.length == 0) {
      const door = await db.collection("doors").add({id: username+Door, door: Door, username: username})
      swal.fire({
        icon: "success",
        title: "Porta salva com sucesso!",
      }) 
    }else{
      const doorLocationData = doorLocation.docs[0]
      currentDoor.id = doorLocationData.id
      if(DoorList != Door){
        const door = await db.collection("doors").doc(currentDoor.id).update({id: username+Door, door: Door, username: username})
        swal.fire({
          icon: "sucess",
          title: "Porta Arualizada com sucesso",
        }) 
      }else{
        swal.fire({
          icon: "error",
          title: "Essa porta Já existe no registro de dados",
        })
      }
    }
    document.getElementById("doorId").value = ""
    readDoors(username)
  }
}

document.getElementById("range").addEventListener('input', function() {
    let ragnge = this.value/100
    console.log(ragnge)
    document.getElementById("rangeValue").textContent = this.value + "%"
})

async function readEquipament() {
    Equipament = []
    const logequipament = await db.collection("equipment").get()
    for (doc of logequipament.docs){
        Equipament.push({
            id: doc.data().id,
            title: doc.data().Equipamento,
        })
    }
    
    Equipament.sort(function (a, b) {
      return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
    });
    renderEquipament()
}

function renderEquipament() {
    let EquipamentList = document.getElementById("equipament")
    EquipamentList.innerHTML = ""
    for (let Equipaments of Equipament) {
      const newEquipament = document.createElement("option")
      newEquipament.setAttribute("class","form-group")
      newEquipament.appendChild(document.createTextNode(Equipaments.title))
      EquipamentList.appendChild(newEquipament)
    }
}

async function pesquisar(){
  const username = document.getElementById("inputUserUsernameValor").value
  const door = document.getElementById("inputDoors").value
  const report = document.getElementById("inputReport").value

  const logdateconst = await db.collection("date")
    .where("username", "==", username)
    .where("door", "==", door)
    .where("report", "==", report)
    .get()
  for (doc of logdateconst.docs) {
    console.log(doc.data().firstDate)
    document.getElementById("firstDate").value = doc.data().firstDate
  }

  const logOBSconst = await db.collection("advertisment")
    .where("username", "==", username)
    .where("door", "==", door)
    .where("report", "==", report)
    .get()
  for (doc of logOBSconst.docs) {
    console.log(doc.data().observacoes)
    document.getElementById("Observacoes").value = doc.data().observacoes
  }

  if (currentUser.username == "STARCOM"){
    readitem(username, door, report)
  }else{
    readitem(currentUser.username, door, report)
  }
}


function renderitem() {
  let ITEMList = document.getElementById("tableItem")
  ITEMList.innerHTML = ""
  var count = 0
  for (let items of item) {
    count++
    const oeequipment = document.createElement("tr")
    const item = document.createElement("th")
    const model = document.createElement("th")
    const fabricant = document.createElement("th")
    const calc = document.createElement("th")
    const life = document.createElement("br")
    const live = document.createElement("div")
    const date = document.createElement("th")
    const data = document.createElement("input")
    item.appendChild(document.createTextNode(items.item))
    item.setAttribute("class","text-center")
    model.appendChild(document.createTextNode(items.model))
    model.setAttribute("class","text-center")
    fabricant.appendChild(document.createTextNode(items.fabricant))
    fabricant.setAttribute("class","text-center")
    live.setAttribute("class",ClassProgress(count))
    calc.appendChild(document.createTextNode(items.life+"%"))
    calc.appendChild(life)
    calc.appendChild(live)
    calc.setAttribute("class","text-center")
    data.setAttribute("type","date")
    data.setAttribute("value",items.date)
    data.setAttribute("class","form-control-plaintext text-center")
    data.setAttribute("readonly","readonly")
    date.appendChild(data)
    oeequipment.appendChild(item)
    oeequipment.appendChild(model)
    oeequipment.appendChild(fabricant)
    oeequipment.appendChild(calc)
    oeequipment.appendChild(date)
    ITEMList.appendChild(oeequipment)
    const progressbar = document.querySelector("."+ClassProgress(count));
    progressbar.style.setProperty('--progress', items.life)
  }
}

function ClassProgress(LEITOR){
  if(LEITOR == 1){
    return "progress-math"
  }else if (LEITOR == 2){
    return "progress-one"
  }else if (LEITOR == 3){
    return "progress-two"
  }else if (LEITOR == 4){
    return "progress-three"
  }else if (LEITOR == 5){
    return "progress-four"
  }else if (LEITOR == 6){
    return "progress-five"
  }else if (LEITOR == 7){
    return "progress-six"
  }else if (LEITOR == 8){
    return "progress-seven"
  }else if (LEITOR == 9){
    return "progress-eight"
  }else if (LEITOR == 10){
    return "progress-nine"
  }else if (LEITOR == 11){
    return "progress-ten"
  }else if (LEITOR == 12){
    return "progress-eleven"
  }else if (LEITOR == 13){
    return "progress-twelve"
  }else if (LEITOR == 14){
    return "progress-tirteen"
  }else if (LEITOR == 15){
    return "progress-fourteen"
  }else if (LEITOR == 16){
    return "progress-fifteen"
  }else if (LEITOR == 17){
    return "progress-sixteen"
  }else if (LEITOR == 18){
    return "progress-seventeen"
  }else if (LEITOR == 19){
    return "progress-eighteen"
  }else if (LEITOR == 20){
    return "progress-nineteen"
  }else if (LEITOR == 21){
    return "progress-twenty"
  }

}
  
async function readitem(USER, DOOR, REPORT) {
  item = []
  const logItem = await db
    .collection("report")
    .where("username", "==", USER)
    .where("door", "==", DOOR)
    .where("report", "==", REPORT)
    .get()
  for (doc of logItem.docs) {
    item.push({
      item: doc.data().item,
      model: doc.data().model,
      fabricant: doc.data().fabricant,
      life: doc.data().life,
      date: doc.data().date,
    })
  }
  item.sort(function (a, b) {
    return (a.item > b.item) ? 1 : ((b.item > a.item) ? -1 : 0);
  });
  renderitem()
}

async function addReport() {
  const username = document.getElementById("inputUserUsernameValor").value
  const door = document.getElementById("inputDoors").value
  const report = document.getElementById("inputReport").value
  const firstDate = document.getElementById("firstDate").value
  const item = document.getElementById("equipament").value
  const model = document.getElementById("model").value
  const fabricant = document.getElementById("fabricant").value
  const life = document.getElementById("range").value
  const date = document.getElementById("date").value
  const observacoes = document.getElementById("Observacoes").value
  
  const logdate = await db.collection("date")
      .where("username", "==", username)
      .where("door", "==", door)
      .where("report", "==", report)
      .get()
  let currentDate = {}
  if (logdate.docs.length == 0) {
    const dateadde = await db.collection("date").add({username: username, door: door, report: report, firstDate: firstDate})
  } else {
    const date = logdate.docs[0]
    currentDate.id = date.id
    const dateupate = await db.collection("date").doc(currentDate.id).update({username: username, door: door, report: report, firstDate: firstDate}) 
  }


  const logadvertisment = await db.collection("advertisment")
      .where("username", "==", username)
      .where("door", "==", door)
      .where("report", "==", report)
      .get()
  let currentadvertisment = {}
  if (logadvertisment.docs.length == 0) {
    const dateobservacoesadve = await db.collection("advertisment").add({username: username, door: door, report: report, observacoes: observacoes})
  } else {
    const advertisment = logadvertisment.docs[0]
    currentadvertisment.id = advertisment.id
    const dateobservacoesupate = await db.collection("advertisment").doc(currentadvertisment.id).update({username: username, door: door, report: report, observacoes: observacoes}) 
  }

  
  const logItem = await db.collection("report")
      .where("item", "==", item)
      .where("username", "==", username)
      .where("door", "==", door)
      .where("report", "==", report)
      .get()
  let currentReport = {}

  if (logItem.docs.length == 0) {
    salvar(username , door, report, firstDate, item, model, fabricant, life, date)
  } else {
    const DataItem = logItem.docs[0]
    currentReport.id = DataItem.id
    atualizar(username , door, report, firstDate, item, model, fabricant, life, date, currentReport.id)
  }

  readitem(username, door, report)
}
  
async function salvar(username , door, report, firstDate, item, model, fabricant, life, date){
  await db.collection("report").add({
      username: username,
      door: door,
      report: report,
      firstDate: firstDate,
      item: item,
      model: model,
      fabricant: fabricant,
      life: life,
      date: date,
  }) 
  swal
      .fire({
        icon: "success",
        title: "Arquivo salvo com sucesso!",
      }) 
}
  
async function atualizar(username , door, report, firstDate, item, model, fabricant, life, date, id){
  await db.collection("report").doc(id).update({
      username: username,
      door: door,
      report: report,
      firstDate: firstDate,
      item: item,
      model: model,
      fabricant: fabricant,
      life: life,
      date: date,
  }) 
  swal
      .fire({
      icon: "success",
      title: "Arquivo atualizado com sucesso!",
      })
  
}

function printPDF(){
  
  $('#imprimir').hide();
  $('#criarnovoregistro').hide();
}

