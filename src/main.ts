import { GraphEditor } from './graphEditor'
import { Graph } from './math/graph'
import { Point } from './primitives/point'
import { Segment } from './primitives/segment'
import './style.css'
import { ViewPort } from './viewport'

const myCanvas = document.getElementById('myCanvas') as HTMLCanvasElement

myCanvas.width = 600
myCanvas.height = 600

const ctx = myCanvas.getContext('2d')

if (!ctx) {
	throw new Error('2d context not supported')
}

const p1 = new Point(200, 200)
const p2 = new Point(400, 200)
const p3 = new Point(200, 400)
const p4 = new Point(400, 400)

const s1 = new Segment(p1, p2)
const s2 = new Segment(p1, p3)
const s3 = new Segment(p1, p4)

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3])
const viewport = new ViewPort(myCanvas)
const graphEditor = new GraphEditor(viewport, graph)
animate()

function animate() {
	if (!ctx) throw Error('No canvas')
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
	ctx.save()
	ctx.scale(1 / viewport.zoom, 1 / viewport.zoom)
	graphEditor.display()
	ctx.restore()
	requestAnimationFrame(animate)
}
