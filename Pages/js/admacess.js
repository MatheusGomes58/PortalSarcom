let users = []
let clientes = []

function verificarUserPassword() {
    let email = document.getElementById("inputNewEmail").value
    let password = document.getElementById("inputNewPassword").value
    let password2 = document.getElementById("inputNewPassword2").value
    if(email !== "" || email !== " "){
        if(password2 === password){
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
            swal
                .fire({
                icon: "success",
                title: "Usuário já cadastrado",
                })
                .then(() => {
                    addUser()
                    setTimeout(() => {
                        window.location.replace("https://www.clientestarcom.com/")
                    }, 1000)
                })
            })
            .catch((error) => {
            const errorCode = error.code
            switch (errorCode) {
                case "auth/user-not-found":
                swal
                    .fire({
                    icon: "warning",
                    title: "Usuário não encontrado",
                    text: "Deseja criar esse usuário?",
                    showCancelButton: true,
                    cancelButtonText: "Não",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sim",
                    confirmButtonColor: "#3085d6",
                    })
                    .then((result) => {
                    if (result.value) {
                        signUp()
                    }
                    })
                break
                default:
                swal.fire({
                    icon: "error",
                    title: error.message,
                })
            }
            })
        }else{
            swal.fire({
                icon: "error",
                title: "As senhas não correspondem",
            })
        }
    }else{
        swal.fire({
            icon: "error",
            title: "Por favor insira um email",
        })
    }
}

function signUp() {
    addUser()
    let newemail = document.getElementById("inputNewEmail").value
    let newpassword = document.getElementById("inputNewPassword").value
    firebase
        .auth()
        .createUserWithEmailAndPassword(newemail, newpassword)
        .then(() => {
        swal
            .fire({ icon: "success", title: "Usuário foi criado com sucesso" })
            .then(() => {
            setTimeout(() => {
                window.location.replace("profile.html")
            }, 1000)
            })
        })
        .catch((error) => {
        const errorCode = error.code
        switch (errorCode) {
            case "auth/weak-password":
            swal.fire({
                icon: "error",
                title: "Senha muito fraca",
            })
            break
            default:
            swal.fire({
                icon: "error",
                title: error.message,
            })
        }
        })
    
}

function renderUsers() {
    let userList = document.getElementById("userList")
    userList.innerHTML = ""
    for (let user of users) {
      const newItem = document.createElement("option")
      newItem.setAttribute("class","form-group")
      newItem.appendChild(document.createTextNode(user.title))
      userList.appendChild(newItem)
    }
}
  
async function readUsers() {
    users = []
    const logUsers = await db.collection("users").get()
    for (doc of logUsers.docs){
        users.push({
            id: doc.data().id,
            title: doc.data().user,
        })
    }
    renderUsers()
}

function renderClientes() {
    let clienteList = document.getElementById("inputUserUsername")
    clienteList.innerHTML = ""
    for (let cliente of clientes) {
      const newCliente = document.createElement("option")
      newCliente.setAttribute("class","form-group")
      newCliente.appendChild(document.createTextNode(cliente.title))
      clienteList.appendChild(newCliente)
    }
}

async function readClientes() {
    clientes = []
    const logCliente = await db.collection("clientes").get()
    for (doc of logCliente.docs){
        clientes.push({
            id: doc.data().id,
            title: doc.data().cliente,
        })
    }
    renderClientes()
}
  
async function addUser() {
    const userList = document.getElementById("userList")
    const newUser = document.createElement("option")
    const user = document.getElementById("inputNewEmail").value
    newUser.setAttribute("class", "form-group")
    newUser.appendChild(document.createTextNode("Adicionando na nuvem..."))
    userList.appendChild(newUser)

    if (!profile) {
        await db.collection("users").add({user: user,})
        await db.collection("profile").add({user: user,})
    } else {
        getUserInfo(currentUser.uid)
        await db.collection("users").add({user: user,})
        await db.collection("profile").add({user: user,})
    }
    readUsers()
}

async function dateOtherUser(USER){
    const selectUser = await db.collection("profile").where("email", "==", USER).get()
    if (selectUser.docs.length == 0) {
    
    } else {
        profile = true
        const OtherUserData = selectUser.docs[0]
        currentUser.id = OtherUserData.id
        currentUser.uid = OtherUserData.data().uid
        currentUser.username = OtherUserData.data().username
        currentUser.name = OtherUserData.data().name
        currentUser.adress = OtherUserData.data().adress
        currentUser.neigh = OtherUserData.data().neigh
        currentUser.city = OtherUserData.data().city
        currentUser.state = OtherUserData.data().state
        currentUser.email = OtherUserData.data().email
        document.getElementById("inputUserUserID").value = currentUser.id
        document.getElementById("inputUserUserUID").value = currentUser.uid
        document.getElementById("inputUserUsername").value = currentUser.username
        document.getElementById("inputUserName").value = currentUser.name
        document.getElementById("inputUserAdress").value = currentUser.adress
        document.getElementById("inputUserNeigh").value = currentUser.neigh
        document.getElementById("inputUserCity").value = currentUser.city
        document.getElementById("inputUserState").value = currentUser.state
    }
}

async function saveOtherUser() {
    const otheruid = document.getElementById("inputUserUserUID").value 
    const otheremail = document.getElementById("userList").value
    const otherusername = document.getElementById("inputUserUsername").value
    const othername = document.getElementById("inputUserName").value 
    const otheradress = document.getElementById("inputUserAdress").value 
    const otherneigh = document.getElementById("inputUserNeigh").value
    const othercity = document.getElementById("inputUserCity").value 
    const otherstate = document.getElementById("inputUserState").value 
    if(otheruid == "" || currentUser.id == ""){
        getUserInfo(currentUser.uid)
        await db.collection("profile").add({
            email: otheremail,
            username: otherusername,
            name: othername,
            adress: otheradress,
            neigh: otherneigh,
            city: othercity,
            state: otherstate,
        })
        swal.fire({
        icon: "success",
        title: "Dados salvos com sucesso",
        })
    }else if (otheruid == "") {
        getUserInfo(currentUser.uid)
        await db.collection("profile").add({
            email: otheremail,
            username: otherusername,
            name: othername,
            adress: otheradress,
            neigh: otherneigh,
            city: othercity,
            state: otherstate,
        })
        swal.fire({
        icon: "success",
        title: "Dados salvos com sucesso",
        })
    }else if (currentUser.id == "") {
        getUserInfo(currentUser.uid)
        await db.collection("profile").add({
            email: otheremail,
            username: otherusername,
            name: othername,
            adress: otheradress,
            neigh: otherneigh,
            city: othercity,
            state: otherstate,
        })
        swal.fire({
        icon: "success",
        title: "Dados salvos com sucesso",
        })
    }else{
        if (!profile) {
        } else {
          await db.collection("profile").doc(currentUser.id).update({
              uid: otheruid,
              email: otheremail,
              username: otherusername,
              name: othername,
              adress: otheradress,
              neigh: otherneigh,
              city: othercity,
              state: otherstate,
          })
          swal.fire({
            icon: "success",
            title: "Atualizado com sucesso",
          })
      }
    }
  
    setTimeout(() => {
      window.location.replace("profile.html")
    }, 1000)
}

async function cadastrarCliente(){
    const cliente = document.getElementById("inputNewCliente").value 
    await db.collection("clientes").add({cliente: cliente,})
    swal.fire({
        icon: "success",
        title: "Cliente cadastrado com sucesso",
      })
    setTimeout(() => {
        window.location.replace("profile.html")
      }, 1000)
}

$(document).ready(function(){
    $('#userList').on('change',function(){
        var userSelected = $(this).val();
        document.getElementById("inputUserUserUID").value = ""
        document.getElementById("inputUserUsername").value = ""
        document.getElementById("inputUserName").value = ""
        document.getElementById("inputUserAdress").value = ""
        document.getElementById("inputUserNeigh").value = ""
        document.getElementById("inputUserCity").value = ""
        document.getElementById("inputUserState").value = ""
        dateOtherUser(userSelected)
    })
    $('#inputUserUsernameValor').on('change',function(){
        var userSelected = $(this).val();
        dateOtherValor(userSelected)
    })
  })

  
 