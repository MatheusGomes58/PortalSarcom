function getUser() {
  if (currentUser.username == "STARCOM"){
    $('#admstarcomcontrol').show();
    $('#admstarcom').show();
    $('#randonUser').hide();
    $('#dateFile').hide();
    $('#card').hide();
  }else{
    $('#admstarcomcontrol').hide();
    $('#admstarcom').hide();
    $('#randonUser').show();
    $('#dateFile').hide();
    $('#card').hide();
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser.uid = user.uid
      getUserInfo(user.email)
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

async function getUserInfo(email) {
  const logUsers = await db.collection("profile").where("email", "==", email).get()
  if (logUsers.docs.length == 0) {
    
  } else {
    profile = true
    const userData = logUsers.docs[0]
    currentUser.id = userData.id
    currentUser.username = userData.data().username
    currentUser.name = userData.data().name
    currentUser.adress = userData.data().adress
    currentUser.neigh = userData.data().neigh
    currentUser.city = userData.data().city
    currentUser.state = userData.data().state
    currentUser.email = userData.data().email
    document.getElementById("OutputEmail").value = currentUser.email
    document.getElementById("OutputUsername").value = currentUser.username
    document.getElementById("OutputName").value = currentUser.name
    document.getElementById("OutputAdress").value = currentUser.adress
    document.getElementById("OutputNeigh").value = currentUser.neigh
    document.getElementById("OutputCity").value = currentUser.city
    document.getElementById("OutputState").value = currentUser.state
    document.getElementById("inputEmail").value = currentUser.email
    document.getElementById("inputUsername").value = currentUser.username
    document.getElementById("inputName").value = currentUser.name
    document.getElementById("inputAdress").value = currentUser.adress
    document.getElementById("inputNeigh").value = currentUser.neigh
    document.getElementById("inputCity").value = currentUser.city
    document.getElementById("inputState").value = currentUser.state
  }

  if (currentUser.username == "STARCOM"){
    $('#admstarcomcontrol').show();
    $('#admstarcom').show();
    $('#randonUser').hide();
    $('#dateFile').hide();
  }else{
    $('#admstarcomcontrol').hide();
    $('#admstarcom').hide();
    $('#randonUser').show();
    $('#dateFile').hide();
    $('#headingOne').hide();
    $('#collapseOne').hide();
    $('#headingTwo').hide();
    $('#collapseTwo').hide();
    $('#headingThree').hide();
    $('#collapseThree').hide();
    $('#headingFour').hide();
    $('#collapseFour').hide();
  }
}


async function saveProfile() {
  const email = document.getElementById("inputEmail").value
  const username = document.getElementById("inputUsername").value
  const name = document.getElementById("inputName").value
  const adress = document.getElementById("inputAdress").value
  const neigh = document.getElementById("inputNeigh").value
  const city = document.getElementById("inputCity").value
  const state = document.getElementById("inputState").value
  if (!profile) {
    getUserInfo(currentUser.uid)
    await db.collection("profile").add({
      uid: currentUser.uid,
      email: email,
      username: username,
      name: name,
      adress: adress,
      neigh: neigh,
      city: city,
      state: state,
    })
    swal.fire({
      icon: "success",
      title: "Perfil salvo com sucesso",
    })
  } else {
    await db.collection("profile").doc(currentUser.id).update({
      uid: currentUser.uid,
      email: email,
      username: username,
      name: name,
      adress: adress,
      neigh: neigh,
      city: city,
      state: state,
    })
    swal.fire({
      icon: "success",
      title: "Atualizado com sucesso",
    })
  }

  setTimeout(() => {
    window.location.replace("profile.html")
  }, 1000)
}

function colapseOne(){
  $('.collapse').collapse()
  $('#headingOne').show();
  $('#collapseOne').show();
  $('#headingTwo').hide();
  $('#collapseTwo').hide();
  $('#headingThree').hide();
  $('#collapseThree').hide();
  $('#headingFour').hide();
  $('#collapseFour').hide();
}
function colapseTwo(){
  $('.collapse').collapse()
  $('#headingOne').hide();
  $('#collapseOne').hide();
  $('#headingTwo').show();
  $('#collapseTwo').show();
  $('#headingThree').hide();
  $('#collapseThree').hide();
  $('#headingFour').hide();
  $('#collapseFour').hide();
}
function colapseThree(){
  $('.collapse').collapse()
  $('#headingOne').hide();
  $('#collapseOne').hide();
  $('#headingTwo').hide();
  $('#collapseTwo').hide();
  $('#headingThree').show();
  $('#collapseThree').show();
  $('#headingFour').hide();
  $('#collapseFour').hide();
}
function colapseFour(){
  $('.collapse').collapse()
  $('#headingOne').hide();
  $('#collapseOne').hide();
  $('#headingTwo').hide();
  $('#collapseTwo').hide();
  $('#headingThree').hide();
  $('#collapseThree').hide();
  $('#headingFour').show();
  $('#collapseFour').show();
}
function colapseUSER(){
  $('#card').show();
  $('#admstarcom').show();
  $('.collapse').collapse()
  $('#headingOne').hide();
  $('#collapseOne').hide();
  $('#headingTwo').show();
  $('#collapseTwo').show();
  $('#headingThree').hide();
  $('#collapseThree').hide();
  $('#dateFile').hide();
}

