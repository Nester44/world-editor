import { Point } from '../primitives/point'
import { Segment } from '../primitives/segment'

export class Graph {
	constructor(public points: Point[] = [], public segments: Segment[] = []) {}

	draw(ctx: CanvasRenderingContext2D) {
		for (const seg of this.segments) {
			seg.draw(ctx)
		}
		for (const point of this.points) {
			point.draw(ctx)
		}
	}

	addPoint(point: Point) {
		this.points.push(point)
	}

	tryAddPoint(point: Point) {
		if (!this.containsPoint(point)) {
			this.addPoint(point)
			return true
		}

		return false
	}

	containsPoint(point: Point) {
		return this.points.find((p) => p.equals(point))
	}

	addSegment(seg: Segment) {
		this.segments.push(seg)
	}
	containsSegment(seg: Segment) {
		return this.segments.find((s) => s.equals(seg))
	}

	tryAddSegment(seg: Segment) {
		if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
			this.addSegment(seg)
			return true
		}
		return false
	}

	removeSegment(seg: Segment) {
		this.segments.splice(this.segments.indexOf(seg), 1)
	}

	removePoint(point: Point) {
		const segs = this.getSegmentsWithPoint(point)

		for (const seg of segs) {
			this.removeSegment(seg)
		}

		this.points.splice(this.points.indexOf(point), 1)
	}

	getSegmentsWithPoint(point: Point) {
		return this.segments.filter((seg) => seg.includes(point))
	}

	dispose() {
		this.points.length = 0
		this.segments.length = 0
	}
}
