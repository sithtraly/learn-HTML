import { Rectangle } from './components/rectangle.js'
import { Circle } from './components/circle.js'

function hex2rgb(hex) {
  hex = hex.toString()
  if (hex[0] == '#') hex = hex.replace('#', '')
  if (hex.length == 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  if (hex.length == 6) {
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    return `rgb(${r},${g},${b})`
  }
}

function rand(min, max) {
  let r = Math.floor(Math.random() * max)
  if (r < min) r = min
  else if (r > max) r = max
  return r
}

function drawText(context, text, x, y, { align = 'start', color = '#ffffff', font = '24px serif' } = {}) {
  context.fillStyle = color
  context.textAlign = align
  context.font = font
  context.fillText(text, x, y)
}

document.addEventListener('DOMContentLoaded', () => {
  const defaultBarspeed = 2
  const defaultGravity = 5
  const defaultPlayerSpeed = 6

  let speedBar = defaultBarspeed
  let gravity = defaultGravity
  let playerSpeed = defaultPlayerSpeed
  let scores = 0
  let isPause = false
  let isGameOver = false
  let isTouchingBar = false
  let isJumping = false;
  let isMoveLeft = false
  let isMoveRight = false
  let touchingBar
  const playerSize = 30

  const cv = document.querySelector('#canvas')
  const w = cv.width = window.innerWidth < 400 ? window.innerWidth : 400
  const h = cv.height = window.innerHeight < 600 ? window.innerHeight : 600
  const cw = w / 2
  const ch = h / 2
  const ctx = cv.getContext('2d')

  const initBar = () => {
    for (let i = 0; i < 5; i++) {
      let x = rand(50, w - 50)
      let y = h + i * 120 + 10
      const width = 100, height = 10
      let color = 'white'
      if (i == 4) color = 'red'
      if (i == 0) x = cw
      bars[i] = new Rectangle(ctx, x, y, width, height, color)
      bars[i].draw()
      bars[i].isTouched = false
    }
  }

  // draw bar
  const bars = []
  initBar()

  const onRestart = () => {
    if (isGameOver) {
      isGameOver = false
      player.setX(cw)
      player.setY(ch)
      initBar()
      playerSpeed = defaultPlayerSpeed
      speedBar = defaultBarspeed
      gravity = defaultGravity
      scores = 0
    }
  }

  // drawCircle
  const player = new Rectangle(ctx, cw, ch, playerSize, playerSize, '#aadd11')

  document.addEventListener('keypress', (e) => {
    if (e.key == ' ' || e.keyCode == 'Space') {
      if ( !isGameOver) {
        isPause = !isPause
        new Rectangle(ctx, cw, ch, 64, 74, 'black').draw()
        new Rectangle(ctx, cw - 20, ch, 24, 74, 'red').draw()
        new Rectangle(ctx, cw - 20, ch, 20, 70).draw()
        new Rectangle(ctx, cw + 20, ch, 24, 74, 'red').draw()
        new Rectangle(ctx, cw + 20, ch, 20, 70).draw()
      }
    }
    if (e.key == 'r') {
      onRestart()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (['a', 'ArrowLeft'].includes(e.key)) isMoveLeft = true
    if (['d', 'ArrowRight'].includes(e.key)) isMoveRight = true
    if (e.key == 'w' || e.key == 'ArrowUp') {
      if (isTouchingBar) {
        gravity = gravity * -3
        isJumping = true
      }
    }
  })

  document.addEventListener('keyup', (e) => {
    if (['a', 'ArrowLeft'].includes(e.key)) isMoveLeft = false
    if (['d', 'ArrowRight'].includes(e.key)) isMoveRight = false
  })

  setInterval(() => {
    if (!isPause) {
      ctx.clearRect(0, 0, w, h)

      if (!isGameOver) {
        isTouchingBar = false
        for (const bar of bars) {
          const isMatchY = player.yt < bar.yt && bar.yt < player.yb
          const isMatchX = player.xr > bar.xl && player.xl < bar.xr
          if (isMatchY && isMatchX) {
            if (bar.color == 'red') {
              isGameOver = true
            }
            else {
              touchingBar = bar
              isTouchingBar = true
              if (bar.isTouched == false) {
                scores++
                bar.isTouched = true
              }
            }
          }
          bar.changeYby(-speedBar)
          if (bar.y < 0) {
            bar.y = h
            bar.x = rand(50, w - 50)
            bar.isTouched = false
          }
        }

        if (isMoveLeft && player.x - player.w / 2 > 0) player.changeXby(-playerSpeed)
        if (isMoveRight && player.x + player.w / 2 < w) player.changeXby(playerSpeed)
        if (isTouchingBar) {
          if (isJumping) {
            player.changeYby(gravity)
            if (player.yb < touchingBar.yb) isJumping = false
          } else if (player.yt > 0) player.changeYby(-speedBar)
          else player.draw()
        } else {
          if (player.yb >= h || player.yt <= 0) {
            isGameOver = true
          } else {
            player.changeYby(gravity)
          }
        }
        if (gravity < defaultGravity) {
          gravity++
        }
        speedBar += 0.001
        playerSpeed += 0.001
        gravity += 0.001

        // draw scores
        drawText(ctx, `Scores: ${scores}`, 10, 30)
      } else {
        drawText(ctx, 'Game Over', cw, ch - 100, { font: '48px serif', color: 'red', align: 'center' })
        drawText(ctx, 'Your Scores: ' + scores, cw, ch, { font: '32px serif', align: 'center' })
        drawText(ctx, 'Press `r` to restart', cw, ch + 100, { font: '28px serif', align: 'center' })
      }
    }
  }, 1000 / 30)
})