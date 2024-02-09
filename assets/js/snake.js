// @ts-nocheck
import { Rectangle } from './components/rectangle.js'
import { Circle } from './components/circle.js'
import { Text } from './components/text.js'

const width = 400, hegiht = 400
const totalGrid = 10
const gridSize = width / totalGrid
const cv = document.getElementById('canvas')
const ctx = cv.getContext('2d')
let direction = 'down'
let fps = 3
let scores = 0
const lbScore = new Text(ctx, getX(0) / 2, getY(1) / 2)
lbScore.setAlignment('left')
lbScore.setFont('24px ProtestStrike')
lbScore.draw()

const eyeSize = 5
const eyeSpaceFromCenter = 8
let snakeArray = []
function initSnake(snakeSize = 3) {
  snakeArray = []
  for (let i = 0; i < snakeSize; i++) {
    const snake = new Rectangle(ctx, getX(0), getY(i), gridSize, gridSize, 'white')
    snake.col = 0
    snake.row = i
    snakeArray.push(snake)
  }
}
initSnake()
const snakeEyes = [
  new Circle(ctx, getX(snakeArray[0].col - eyeSpaceFromCenter), getY(snakeArray[0].row) + 5, eyeSize, 'green'),
  new Circle(ctx, getX(snakeArray[0].col + eyeSpaceFromCenter), getY(snakeArray[0].row) + 5, eyeSize, 'green')
]

let food
let isGameOver = false

// set game width and height
cv.width = width
cv.height = hegiht
cv.style.backgroundColor = 'black'

function drawGrid() {
  ctx.beginPath()
  ctx.strokeStyle = 'gray'
  for (let i = 0; i < totalGrid; i++) {
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
    snake.setStroke(1, 'blue')
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

function drawFood() {
  if (!food) food = new Circle(ctx, getX(5), getY(5), gridSize / 2, 'pink')
  food.draw()
}

function generateFood() {
  const col = Math.floor(Math.random() * totalGrid)
  const row = Math.floor(Math.random() * totalGrid)
  const isOccupied = snakeArray.some(snake => snake.col == col && snake.row == row)
  return isOccupied ? generateFood() : { col, row }
}

function drawGameOver() {
  const lbGameOver = new Text(ctx, width / 2, hegiht * 0.25, 'Game Over')
  lbGameOver.setFont('56px ProtestStrike')
  lbGameOver.draw()
  const lbScores = new Text(ctx, width / 2, hegiht * 0.5, 'Scores: ' + scores)
  lbScores.setFont('36px ProtestStrike')
  lbScores.draw()
  const lbRestart = new Text(ctx, width / 2, hegiht * 0.75, 'Press `r` to restart')
  lbRestart.setFont('36px ProtestStrike')
  lbRestart.setColor('pink')
  lbRestart.draw()
}

function drawYouWon() {
  const lbCongrate = new Text(ctx, width / 2, hegiht * 0.25, 'Congratulation')
  lbCongrate.setFont('48px ProtestStrike')
  lbCongrate.draw()
  const lbYouWon = new Text(ctx, width / 2, hegiht * 0.5, 'You Won!!!')
  lbYouWon.setFont('56px ProtestStrike')
  lbYouWon.draw()
  const lbRestart = new Text(ctx, width / 2, hegiht * 0.75, 'Press `r` to restart')
  lbRestart.setFont('36px ProtestStrike')
  lbRestart.setColor('pink')
  lbRestart.draw()
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
  const sounds = {
    eat: new Audio('/assets/sounds/touch.mp3'),
    die: new Audio('/assets/sounds/die.mp3')
  }
  document.addEventListener('keydown', (e) => {
    if (['a', 'ArrowLeft'].includes(e.key) && direction != 'right') direction = 'left'
    else if (['d', 'ArrowRight'].includes(e.key) && direction != 'left') direction = 'right'
    else if (['s', 'ArrowDown'].includes(e.key) && direction != 'up') direction = 'down'
    else if (['w', 'ArrowUp'].includes(e.key) && direction != 'down') direction = 'up'
    else if (e.key == 'r') {
      isGameOver = false
      initSnake()
      scores = 0
      food.setX(getX(5))
      food.setY(getY(5))
      direction = 'down'
    }
  })
  drawGrid()
  drawSnack()
  drawFood()
  lbScore.draw()

  setInterval(() => {
    ctx.clearRect(0, 0, width, hegiht)
    if (snakeArray.length < totalGrid * totalGrid && !isGameOver) {
      for (let [i, snake] of snakeArray.entries()) {
        if (i < snakeArray.length - 1) {
          snake.col = snakeArray[i + 1].col
          snake.row = snakeArray[i + 1].row
        } else if (i >= snakeArray.length - 1) {
          if (direction == 'up') snake.row -= 1
          else if (direction == 'down') snake.row += 1
          else if (direction == 'left') snake.col -= 1
          else if (direction == 'right') snake.col += 1
          if (snake.row < 0) snake.row = totalGrid - 1
          else if (snake.row >= totalGrid) snake.row = 0
          else if (snake.col < 0) snake.col = totalGrid - 1
          else if (snake.col >= totalGrid) snake.col = 0
        }
      }
      drawGrid()
      drawSnack()
      const snakeHead = snakeArray[snakeArray.length - 1]
      const tmpSnakeArray = Array.from(snakeArray)
      tmpSnakeArray.pop()
      isGameOver = tmpSnakeArray.some((snake) => snake.col == snakeHead.col && snake.row == snakeHead.row)
      if (isGameOver) sounds.die.play()
      if (snakeHead.x == food.x && snakeHead.y == food.y) {
        sounds.eat.play()
        const newPos = generateFood()
        food.setX(getX(newPos.col))
        food.setY(getY(newPos.row))
        const snake = new Rectangle(ctx, snakeArray[0].col, snakeArray[0].row, gridSize, gridSize, 'white')
        snakeArray.unshift(snake)
        scores++
      }
      drawFood()
      lbScore.setText('Scores: ' + scores)
    } else if (isGameOver) {
      drawGameOver()
    } else {
      drawYouWon()
    }
  }, 1000 / fps)
})