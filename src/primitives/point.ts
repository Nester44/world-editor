type DrawPointOptions = {
	size?: number
	color?: string
	outline?: boolean
	fill?: boolean
}

export class Point {
	constructor(public x: number, public y: number) {}

	draw(
		ctx: CanvasRenderingContext2D,
		{
			size = 18,
			color = 'black',
			outline = false,
			fill = false,
		}: DrawPointOptions = {},
	) {
		const rad = size / 2
		ctx.beginPath()
		ctx.fillStyle = color
		ctx.arc(this.x, this.y, rad, 0, Math.PI * 2)
		ctx.fill()

		if (outline) {
			ctx.beginPath()
			ctx.lineWidth = 2
			ctx.strokeStyle = 'yellow'
			ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2)
			ctx.stroke()
		}

		if (fill) {
			ctx.beginPath()
			ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2)
			ctx.fillStyle = 'yellow'
			ctx.fill()
		}
	}

	equals(point: Point) {
		return this.x == point.x && this.y == point.y
	}
}
