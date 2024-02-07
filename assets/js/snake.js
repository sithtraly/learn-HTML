import { Rectangle } from './components/rectangle.js'
import { Circle } from './components/circle.js'

const width = 400, hegiht = 400
const gridSize = width / 10
const gridTotal = width / gridSize
const cv = document.getElementById('canvas')
const ctx = cv.getContext('2d')
let direction = 'down'

const eyeSize = 5
const eyeSpaceFromCenter = 8
const snakeArray = []
for (let i = 0; i < 3; i++) {
  const snake = new Rectangle(ctx, getX(0), getY(i), gridSize, gridSize, 'white')
  snake.col = 0
  snake.row = i
  snakeArray.push(snake)
}
const snakeEyes = [
  new Circle(ctx, getX(snakeArray[0].col - eyeSpaceFromCenter), getY(snakeArray[0].row) + 5, eyeSize, 'green'),
  new Circle(ctx, getX(snakeArray[0].col + eyeSpaceFromCenter), getY(snakeArray[0].row) + 5, eyeSize, 'green')
]

// set game width and height
cv.width = width
cv.height = hegiht
cv.style.backgroundColor = 'black'

function drawGrid() {
  ctx.beginPath()
  ctx.strokeStyle = 'gray'
  for (let i = 0; i < gridTotal; i++) {
    const x = gridSize * i
    const y = gridSize * i
    // draw column
    ctx.moveTo(x, 0)
    ctx.lineTo(x, hegiht)
    // draw row
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }
  ctx.stroke()
  ctx.closePath()
}

function drawSnack() {
  for (const [i, snake] of snakeArray.entries()) {
    const x = getX(snake.col)
    const y = getY(snake.row)
    snake.setX(x)
    snake.setY(y)
    snake.draw()
    snake.setStroke(1, 'green')
    if (i == snakeArray.length - 1) {
      let isLeftIce = true
      for (const eye of snakeEyes) {
        switch (direction) {
          case 'down':
            isLeftIce ? eye.setX(x - eyeSpaceFromCenter) : eye.setX(x + eyeSpaceFromCenter)
            eye.setY(y + eyeSpaceFromCenter / 2)
            break
          case 'left':
            isLeftIce ? eye.setY(y - eyeSpaceFromCenter) : eye.setY(y + eyeSpaceFromCenter)
            eye.setX(x - eyeSpaceFromCenter / 2)
            break
          case 'right':
            isLeftIce ? eye.setY(y - eyeSpaceFromCenter) : eye.setY(y + eyeSpaceFromCenter)
            eye.setX(x + eyeSpaceFromCenter / 2)
            break
          case 'up':
            isLeftIce ? eye.setX(x - eyeSpaceFromCenter) : eye.setX(x + eyeSpaceFromCenter)
            eye.setY(y - eyeSpaceFromCenter / 2)
            break
          default:
            break
        }
        eye.draw()
        isLeftIce = !isLeftIce
      }
    }
  }
}

function getX(col = 0) {
  return col * gridSize + gridSize / 2
}

function getY(row = 0) {
  return row * gridSize + gridSize / 2
}

function getPos(col, row) {
  const x = getX(col)
  const y = getY(row)
  return { x, y }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (e) => {
    if (['a', 'ArrowLeft'].includes(e.key) && direction != 'right') direction = 'left'
    else if (['d', 'ArrowRight'].includes(e.key) && direction != 'left') direction = 'right'
    else if (['s', 'ArrowDown'].includes(e.key) && direction != 'up') direction = 'down'
    else if (['w', 'ArrowUp'].includes(e.key) && direction != 'down') direction = 'up'
  })
  drawGrid()
  drawSnack()

  setInterval(() => {
    ctx.clearRect(0, 0, width, hegiht)
    for (let [i, snake] of snakeArray.entries()) {
      if (i < snakeArray.length - 1) {
        snake.col = snakeArray[i + 1].col
        snake.row = snakeArray[i + 1].row
      } else if (i >= snakeArray.length - 1) {
        if (direction == 'up') snake.row -= 1
        else if (direction == 'down') snake.row += 1
        else if (direction == 'left') snake.col -= 1
        else if (direction == 'right') snake.col += 1
        if (snake.row < 0) snake.row = gridTotal - 1
        else if (snake.row >= gridTotal) snake.row = 0
        else if (snake.col < 0) snake.col = gridTotal - 1
        else if (snake.col >= gridTotal) snake.col = 0
      }
    }
    drawGrid()
    drawSnack()
  }, 500)
})