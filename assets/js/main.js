function togglePassword() {
  const txtPassword = document.getElementById('password')
  const eyeOn = document.getElementById('eye-on')
  const eyeOff = document.getElementById('eye-off')
  if (txtPassword.type == 'password') {
    txtPassword.type = 'text'
    eyeOn.classList.add('none')
    eyeOff.classList.remove('none')
  } else {
    txtPassword.type = 'password'
    eyeOn.classList.remove('none')
    eyeOff.classList.add('none')
  }
}


function toggleDropdown() {
  const el = document.getElementById('dropdown-menu')
  if (el.classList.contains('show')) el.classList.remove('show')
  else el.classList.add('show')
}


function showAlert() {
  const el = document.getElementById('bs-alert')
  if (el.classList.contains('d-none')) {
    el.classList.remove('d-none')
    setTimeout(() => {
      el.classList.add('d-none')
    }, 3000)
  }
  else el.classList.add('d-none')
}


function toggleSidebar() {
  const sidebar = document.getElementById('sidebar')
  if (sidebar.classList.contains('hide')) {
    sidebar.classList.remove('hide')
  } else {
    sidebar.classList.add('hide')
  }
}

function toggleDialog() {
  const dialog = document.getElementById('dialog')
  if (dialog.classList.contains('d-none')) {
    dialog.classList.remove('d-none')
  } else {
    dialog.classList.add('d-none')
  }
}

const userData = []

const userTable = document.getElementById('user-table')

function addData2Table(name, gender, dob, email) {
  const row = "<tr>\
  <td>"+ name + "</td>\
  <td>"+ gender + "</td>\
  <td>"+ dob + "</td>\
  <td>"+ email + "</td>\
  <td>\
    <span class=\"material-symbols-outlined\">edit</span>\
    <span class=\"material-symbols-outlined text-danger\">delete</span>\
  </td>\</tr>"
  userTable.innerHTML += row
}

function onSaveUser() {
  const name = document.getElementById('name')
  const gender = document.getElementById('gender')
  const dob = document.getElementById('dob')
  const email = document.getElementById('email')
  addData2Table(name.value, gender.value, dob.value, email.value)
  toggleDialog()

  const obj = {
    name: name.value,
    gender: gender.value,
    dob: dob.value,
    email: email.value
  }
  userData.push(obj)
  const str = JSON.stringify(userData)
  localStorage.setItem('userData', str)
}

function loadData() {
  const users = JSON.parse(localStorage.getItem('userData'))
  for (const user of users) {
    userData.push(user)
    addData2Table(user.name, user.gender, user.dob, user.email)
  }
}

loadData()