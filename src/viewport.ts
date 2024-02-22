import { Point } from './primitives/point'

export class ViewPort {
	ctx: CanvasRenderingContext2D
	zoom = 1

	constructor(private canvas: HTMLCanvasElement) {
		this.ctx = canvas.getContext('2d')!
		this.addEventListeners()
	}

	getMouse(e: MouseEvent) {
		return new Point(e.offsetX * this.zoom, e.offsetY * this.zoom)
	}

	private addEventListeners() {
		this.canvas.addEventListener('wheel', this.handleMouseWheel.bind(this))
	}

	private handleMouseWheel(e: WheelEvent) {
		const dir = Math.sign(e.deltaY)
		const step = 0.1
		this.zoom += dir * step
		this.zoom = Math.max(1, Math.min(this.zoom, 5))
	}
}
