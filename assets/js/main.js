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