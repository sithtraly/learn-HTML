export class Rectangle {
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {string} color
   */
  constructor(context, x, y, w, h, color = '#ffffff') {
    this.ctx = context
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
    this.xl = this.x - w / 2
    this.xr = this.x + w / 2
    this.yt = this.y - h / 2
    this.yb = this.y + h / 2
  }

  _centerX() {
    return this.x - this.w / 2
  }

  _centerY() {
    return this.y - this.h / 2
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(this._centerX(), this._centerY(), this.w, this.h)
    this.ctx.closePath()
    this.xl = this.x - this.w / 2
    this.xr = this.x + this.w / 2
    this.yt = this.y - this.h / 2
    this.yb = this.y + this.h / 2
  }

  /**
   * @param {number} x
   */
  setX(x) {
    this.x = x
    this.xl = this.x - this.w / 2
    this.xr = this.x + this.w / 2
  }

  /**
   * @param {number} y
   */
  setY(y) {
    this.y = y
    this.yt = this.y - this.h / 2
    this.yb = this.y + this.h / 2
  }

  /**
   * @param {number} x
   */
  changeXby(x) {
    this.x += x
    this.xl = this.x - this.w / 2
    this.xr = this.x + this.w / 2
    this.draw()
  }

  /**
   * @param {number} y
   */
  changeYby(y) {
    this.y += y
    this.yt = this.y - this.h / 2
    this.yb = this.y + this.h / 2
    this.draw()
  }

  /**
   * @param {number} width
   * @param {string} color
   */
  setStroke(width = 1, color = 'white') {
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width
    this.ctx.strokeRect(this._centerX(), this._centerY(), this.w, this.h)
  }
}