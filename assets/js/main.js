function togglePassword() {
  const txtPassword = document.getElementById('password')
  if (txtPassword.type == 'password') {
    txtPassword.type = 'text'
  } else {
    txtPassword.type = 'password'
  }
}