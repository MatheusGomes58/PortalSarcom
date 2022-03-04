const db = firebase.firestore()
let Valor = []
let currentUser = {}
let currentValor = {}
let currentuser = ""

function getUser() {
  if (currentUser.username == "STARCOM"){
    $('#Atualizar').show();
    $('#collapseTwo').hide();
  }else{
    $('#Atualizar').hide();
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
    $('#collapseTwo').hide();
  }else{
    $('#Atualizar').hide();
    $('#collapseTwo').hide();
  }

  dateOtherValor(currentUser.username)
}

async function dateOtherValor(VALOR){
    currentuser = VALOR 
    const selectValorui = await db.collection("plans").where("username", "==", VALOR).get()
    if (selectValorui.docs.length == 0) {
    
    } else {
        profile = true
        const OtherValorData = selectValorui.docs[0]
        currentValor.id = OtherValorData.id
        currentValor.valor1 = OtherValorData.data().valor1
        currentValor.valor2 = OtherValorData.data().valor2
        currentValor.valor3 = OtherValorData.data().valor3
        currentValor.valor4 = OtherValorData.data().valor4
        currentValor.valor5 = OtherValorData.data().valor5
        currentValor.valor6 = OtherValorData.data().valor6
        currentValor.valor7 = OtherValorData.data().valor7
        currentValor.valor8 = OtherValorData.data().valor8
        currentValor.valor9 = OtherValorData.data().valor9
        currentValor.valor10 = OtherValorData.data().valor10
        currentValor.valor11 = OtherValorData.data().valor11
        currentValor.valor12 = OtherValorData.data().valor12
        currentValor.valor13 = OtherValorData.data().valor13
        currentValor.valor14 = OtherValorData.data().valor14
        currentValor.valor15 = OtherValorData.data().valor15
        currentValor.valor16 = OtherValorData.data().valor16
        currentValor.valor17 = OtherValorData.data().valor17
        currentValor.valor18 = OtherValorData.data().valor18
        currentValor.valor19 = OtherValorData.data().valor19
        currentValor.valor20 = OtherValorData.data().valor20
        currentValor.valor21 = OtherValorData.data().valor21
        currentValor.valor22 = OtherValorData.data().valor22
        currentValor.valor23 = OtherValorData.data().valor23
        currentValor.valor24 = OtherValorData.data().valor24
        document.getElementById("inputValor1").value += currentValor.valor1
        document.getElementById("inputValor2").value += currentValor.valor2
        document.getElementById("inputValor3").value += currentValor.valor3
        document.getElementById("inputValor4").value += currentValor.valor4
        document.getElementById("inputValor5").value += currentValor.valor5
        document.getElementById("inputValor6").value += currentValor.valor6
        document.getElementById("inputValor7").value += currentValor.valor7
        document.getElementById("inputValor8").value += currentValor.valor8
        document.getElementById("inputValor9").value += currentValor.valor9
        document.getElementById("inputValor10").value += currentValor.valor10
        document.getElementById("inputValor11").value += currentValor.valor11
        document.getElementById("inputValor12").value += currentValor.valor12
        document.getElementById("inputValor13").value += currentValor.valor13
        document.getElementById("inputValor14").value += currentValor.valor14
        document.getElementById("inputValor15").value += currentValor.valor15
        document.getElementById("inputValor16").value += currentValor.valor16
        document.getElementById("inputValor17").value += currentValor.valor17
        document.getElementById("inputValor18").value += currentValor.valor18
        document.getElementById("inputValor19").value += currentValor.valor19
        document.getElementById("inputValor20").value += currentValor.valor20
        document.getElementById("inputValor21").value += currentValor.valor21
        document.getElementById("inputValor22").value += currentValor.valor22
        document.getElementById("inputValor23").value += currentValor.valor23
        document.getElementById("inputValor24").value += currentValor.valor24
        document.getElementById("OutputValor1").value += currentValor.valor1
        document.getElementById("OutputValor2").value += currentValor.valor2
        document.getElementById("OutputValor3").value += currentValor.valor3
        document.getElementById("OutputValor4").value += currentValor.valor4
        document.getElementById("OutputValor5").value += currentValor.valor5
        document.getElementById("OutputValor6").value += currentValor.valor6
        document.getElementById("OutputValor7").value += currentValor.valor7
        document.getElementById("OutputValor8").value += currentValor.valor8
        document.getElementById("OutputValor9").value += currentValor.valor9
        document.getElementById("OutputValor10").value += currentValor.valor10
        document.getElementById("OutputValor11").value += currentValor.valor11
        document.getElementById("OutputValor12").value += currentValor.valor12
        document.getElementById("OutputValor13").value += currentValor.valor13
        document.getElementById("OutputValor14").value += currentValor.valor14
        document.getElementById("OutputValor15").value += currentValor.valor15
        document.getElementById("OutputValor16").value += currentValor.valor16
        document.getElementById("OutputValor17").value += currentValor.valor17
        document.getElementById("OutputValor18").value += currentValor.valor18
        document.getElementById("OutputValor19").value += currentValor.valor19
        document.getElementById("OutputValor20").value += currentValor.valor20
        document.getElementById("OutputValor21").value += currentValor.valor21
        document.getElementById("OutputValor22").value += currentValor.valor22
        document.getElementById("OutputValor23").value += currentValor.valor23
        document.getElementById("OutputValor24").value += currentValor.valor24
    }
}

async function saveOtherValor() {
  const valor1 = document.getElementById("inputValor1").value 
  const valor2 = document.getElementById("inputValor2").value 
  const valor3 = document.getElementById("inputValor3").value 
  const valor4 = document.getElementById("inputValor4").value 
  const valor5 = document.getElementById("inputValor5").value
  const valor6 = document.getElementById("inputValor6").value 
  const valor7 = document.getElementById("inputValor7").value 
  const valor8 = document.getElementById("inputValor8").value
  const valor9 = document.getElementById("inputValor9").value
  const valor10 = document.getElementById("inputValor10").value
  const valor11 = document.getElementById("inputValor11").value
  const valor12 = document.getElementById("inputValor12").value
  const valor13 = document.getElementById("inputValor13").value
  const valor14 = document.getElementById("inputValor14").value
  const valor15 = document.getElementById("inputValor15").value
  const valor16 = document.getElementById("inputValor16").value
  const valor17 = document.getElementById("inputValor17").value
  const valor18 = document.getElementById("inputValor18").value
  const valor19 = document.getElementById("inputValor19").value
  const valor20 = document.getElementById("inputValor20").value
  const valor21 = document.getElementById("inputValor21").value
  const valor22 = document.getElementById("inputValor22").value
  const valor23 = document.getElementById("inputValor23").value
  const valor24 = document.getElementById("inputValor24").value
  await db.collection("plans").doc(currentValor.id).update({
    username: currentuser,  
    valor1: valor1,
    valor2: valor2,
    valor3: valor3,
    valor4: valor4,
    valor5: valor5,
    valor6: valor6,
    valor7: valor7,
    valor8: valor8,
    valor9: valor9,
    valor10: valor10,
    valor11: valor11,
    valor12: valor12,
    valor13: valor13,
    valor14: valor14,
    valor15: valor15,
    valor16: valor16,
    valor17: valor17,
    valor18: valor18,
    valor19: valor19,
    valor20: valor20,
    valor21: valor21,
    valor22: valor22,
    valor23: valor23,
    valor24: valor24,
  })
  swal.fire({
    icon: "success",
    title: "Valores atualizados com sucesso",
  })
  setTimeout(() => {
    window.location.replace("plans.html")
  }, 1000)
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
    $('#collapseTwo').hide();
  }

  $(document).ready(function(){
    $('#inputUserUsernameValor').on('change',function(){
        var userSelected = $(this).val();
        dateOtherValor(userSelected)
        document.getElementById("inputValor1").value = ""
        document.getElementById("inputValor2").value = ""
        document.getElementById("inputValor3").value = ""
        document.getElementById("inputValor4").value = ""
        document.getElementById("inputValor5").value = ""
        document.getElementById("inputValor6").value = ""
        document.getElementById("inputValor7").value = ""
        document.getElementById("inputValor8").value = ""
        document.getElementById("inputValor9").value = ""
        document.getElementById("inputValor10").value = ""
        document.getElementById("inputValor11").value = ""
        document.getElementById("inputValor12").value = ""
        document.getElementById("inputValor13").value = ""
        document.getElementById("inputValor14").value = ""
        document.getElementById("inputValor15").value = ""
        document.getElementById("inputValor16").value = ""
        document.getElementById("inputValor17").value = ""
        document.getElementById("inputValor18").value = ""
        document.getElementById("inputValor19").value = ""
        document.getElementById("inputValor20").value = ""
        document.getElementById("inputValor21").value = ""
        document.getElementById("OutputValor1").value = ""
        document.getElementById("OutputValor2").value = ""
        document.getElementById("OutputValor3").value = ""
        document.getElementById("OutputValor4").value = ""
        document.getElementById("OutputValor5").value = ""
        document.getElementById("OutputValor6").value = ""
        document.getElementById("OutputValor7").value = ""
        document.getElementById("OutputValor8").value = ""
        document.getElementById("OutputValor9").value = ""
        document.getElementById("OutputValor10").value = ""
        document.getElementById("OutputValor11").value = ""
        document.getElementById("OutputValor12").value = ""
        document.getElementById("OutputValor13").value = ""
        document.getElementById("OutputValor14").value = ""
        document.getElementById("OutputValor15").value = ""
        document.getElementById("OutputValor16").value = ""
        document.getElementById("OutputValor17").value = ""
        document.getElementById("OutputValor18").value = ""
        document.getElementById("OutputValor19").value = ""
        document.getElementById("OutputValor20").value = ""
        document.getElementById("OutputValor21").value = ""
        document.getElementById("OutputValor22").value = ""
        document.getElementById("OutputValor23").value = ""
        document.getElementById("OutputValor24").value = ""
    })
  })

  
function USER(){
  $('#collapseTwo').show();
}

