import { Graph } from './math/graph'
import { getNearestPoint } from './math/utils'
import { Point } from './primitives/point'
import { Segment } from './primitives/segment'
import { ViewPort } from './viewport'

export class GraphEditor {
	public ctx: CanvasRenderingContext2D
	private canvas: HTMLCanvasElement
	private selected: Point | null = null
	private hovered: Point | null = null
	private dragging = false
	private mouse: Point | null = null

	constructor(private viewport: ViewPort, private graph: Graph) {
		this.canvas = viewport.canvas
		this.ctx = this.canvas.getContext('2d')!
		this.addEventListeners()
	}

	private addEventListeners() {
		this.canvas.addEventListener(
			'mousedown',
			this.handleMouseDown.bind(this),
		)

		this.canvas.addEventListener(
			'mousemove',
			this.handleMouseMove.bind(this),
		)

		this.canvas.addEventListener('contextmenu', (e) => e.preventDefault())
		this.canvas.addEventListener('mouseup', () => (this.dragging = false))
	}

	private handleMouseDown(e: MouseEvent) {
		// right click
		if (e.button === 2) {
			if (this.selected) {
				this.selected = null
			} else if (this.hovered) {
				this.removePoint(this.hovered)
			}
		}
		if (e.button === 0) {
			if (this.hovered) {
				this.selectPoint(this.hovered)
				this.dragging = true
				return
			}
			this.graph.addPoint(this.mouse!)
			this.selectPoint(this.mouse!)
			this.hovered = this.mouse
		}
	}

	private handleMouseMove(e: MouseEvent) {
		this.mouse = this.viewport.getMouse(e)

		this.hovered = getNearestPoint(
			this.mouse,
			this.graph.points,
			10 * this.viewport.zoom,
		)

		if (this.dragging) {
			this.selected!.x = this.mouse.x
			this.selected!.y = this.mouse.y
		}
	}

	private selectPoint(point: Point) {
		if (this.selected) {
			this.graph.tryAddSegment(new Segment(this.selected, point))
		}

		this.selected = point
	}

	private removePoint(point: Point) {
		this.graph.removePoint(point)

		this.hovered = null
		if (this.selected == point) {
			this.selected = null
		}
	}

	display() {
		this.graph.draw(this.ctx)

		if (this.hovered) {
			this.hovered.draw(this.ctx, { fill: true })
		}

		if (this.selected) {
			const intent = this.hovered ? this.hovered : this.mouse!
			new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] })
			this.selected.draw(this.ctx, { outline: true })
		}
	}
}
