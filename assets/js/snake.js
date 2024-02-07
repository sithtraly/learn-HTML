import { Rectangle } from './components/rectangle.js'
import { Circle } from './components/circle.js'

const width = 400, hegiht = 400
const gridSize = width / 10
const gridTotal = width / gridSize
const cv = document.getElementById('canvas')
const ctx = cv.getContext('2d')
let direction = 'down'

let snake
const eyeSize = 5
const eyeSpaceFromCenter = 8
const snakeArray = [
  { x: 0, y: 2 },
  { x: 0, y: 1 },
  { x: 0, y: 0 },
]
const snakeEyes = [
  new Circle(ctx, getX(snakeArray[0].x - eyeSpaceFromCenter), getY(snakeArray[0].y) + 5, eyeSize, 'green'),
  new Circle(ctx, getX(snakeArray[0].x + eyeSpaceFromCenter), getY(snakeArray[0].y) + 5, eyeSize, 'green')
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
  for (const [i, pos] of snakeArray.entries()) {
    const x = getX(pos.x)
    const y = getY(pos.y)
    snake = new Rectangle(ctx, x, y, gridSize, gridSize, 'white')
    snake.draw()
    snake.setStroke(1, 'green')
    if (i == 0) {
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
  ctx.clearRect(0, 0, width, hegiht)
  drawGrid()
  drawSnack()
})