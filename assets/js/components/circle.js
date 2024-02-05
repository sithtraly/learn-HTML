export class Circle {
  constructor(context, x, y, radius, color = '#ffffff') {
    this.ctx = context
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.xl = x - radius
    this.xr = x + radius
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  changeXby(x) {
    this.x += x
    this.xl = this.x - this.radius
    this.xr = this.x + this.radius
  }

  changeYby(y) {
    this.y += y
  }
}