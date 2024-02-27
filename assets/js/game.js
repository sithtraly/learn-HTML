import { Rectangle } from './components/rectangle.js'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 400
  canvas.height = 400
  canvas.style.background = '#000000'

  const blockSize = 40
  let currentRow = 0

  function getX(col) {
    return col * blockSize + blockSize / 2
  }

  function getY(row) {
    return row * blockSize + blockSize / 2
  }

  const squareBlockArr = [[0, 0], [0, 1], [1, 0], [1, 1]]
  

  let time = Date.now()

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let currentTime = Date.now()
    if (currentTime > time + 1000) {
      const y = getY(currentRow)
      currentRow++
      if (y >= canvas.height + blockSize / 2) currentRow = 0
      time = currentTime
    }

    requestAnimationFrame(loop)
  }

  // loop()
})