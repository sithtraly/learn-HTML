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