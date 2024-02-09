export class Text {
  constructor(context, x, y, text='') {
    this.ctx = context
    this.x = x
    this.y = y
    this.text = text
    this.color = 'white'
    this.align = 'center'
    this.font = '24px serif'
  }

  setAlignment(align = 'center') {
    this.align = align
  }

  setColor(color = 'white') {
    this.color = color
  }

  setFont(font = '24px serif') {
    this.font = font
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.textAlign = this.align
    this.ctx.font = this.font
    this.ctx.shadowBlur = 4
    this.ctx.shadowColor = 'black'
    this.ctx.fillText(this.text, this.x, this.y)
    this.ctx.shadowBlur = 0
  }
  setText(text) {
    this.text = text
    this.draw()
  }
}