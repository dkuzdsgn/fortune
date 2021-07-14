const cursor = document.querySelector("div.cursor")
const canvasIn = document.querySelector ("canvas.in")
const canvasOut = document.querySelector ("canvas.out")
// important for mouse up and down
let isMouseDown = false

// when I hold the mouse down, make the cursor bigger
const growCursor = function () {
cursor.classList.add("is-down")
}

// when I let go of the mouse, make the cursor smaller
const shrinkCursor = function () {
cursor.classList.remove("is-down")
}

// move the cursor based on coordinates
const moveCursor = function(x, y) {
cursor.style.left = x + "px"
cursor.style.top = y + "px"
}

// set up a canvas
const setupCanvas = function(canvas) {
const w = window.innerWidth
const h = window.innerHeight
const dpi = window.devicePixelRatio

canvas.width = w * dpi
canvas.height = h * dpi
canvas.style.width = w + "px"
canvas.style.height = h + "px"

const context = canvas.getContext("2d")
context.scale(dpi, dpi)

if (canvas.classList.contains("in")) {
    context.fillStyle = "#000000"
    context.strokeStyle = "#ffffff"
} else {
    context.fillStyle = "#ffffff"
context.strokeStyle = "#000000"
}




context.lineWidth = 50
context.lineCap = "round"
context.lineJoin = "round"


context.shadowBlur = 20
context.shadowColor = context.strokeStyle


context.rect(-50, -50, w * dpi , h * dpi)
context.fill()
}

//chance color, based on the canvas, x and y
const startDraw = function(canvas, x, y) {
    const context = canvas.getContext("2d")
    context.moveTo(x,y)
    } 

// draw based on canvas, x and y
const moveDraw = function(canvas, x, y) {
const context = canvas.getContext("2d")
// important yslovie
if(isMouseDown) {
    context.lineTo(x, y)
    context.stroke()
}
}

setupCanvas(canvasIn)
setupCanvas(canvasOut)

document.addEventListener("mousedown", function(event) {
// important yslovie
isMouseDown = true    
growCursor()
startDraw(canvasIn, event.pageX, event.pageY)
startDraw(canvasOut, event.pageX, event.pageY)
})

document.addEventListener("mouseup",function() {
// important yslovie
isMouseDown = false    
shrinkCursor()
})

//mousemove

document.addEventListener("mousemove", function(event) {
console.log(event)
// event.pageX -> where we are on the page across
// event.pageY -> where we are on the page downwards
moveCursor(event.pageX, event.pageY)
// draw rectangle
moveDraw(canvasIn, event.pageX, event.pageY)
moveDraw(canvasOut, event.pageX, event.pageY)
})

window.addEventListener("resize", function () {
    setupCanvas(canvasIn)
    setupCanvas(canvasOut)
})

