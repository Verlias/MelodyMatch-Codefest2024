// Define the Point class
class Point {
    constructor(position, row) {
        this.position = position;
        this.origin = position[1] + (Math.random()-.5) * 50;
        this.left = null;
        this.back = null;
        this.row = row;
        this.randomoffset = Math.random() * 10;
        if (Math.random() > 0.5) {
            this.shiftdirection = 1;
        }
        else { this.shiftdirection = -1 }
        
    }

    // Getters
    get x() {
        return this.position[0];
    }
    get y() {
        return this.position[1];
    }

    get hasleft() {
        return this.left !== null;
    }

    get hasback() {
        return this.back !== null;
    }

    // Setters

    setLeft(left) {
        this.left = left;
    }

    setBack(back) {
        this.back = back;
    }

    shift() {
        if (this.randomoffset > 10) {
            this.shiftdirection = -1;
        }
        else if (this.randomoffset < -10) {
            this.shiftdirection = 1;
        }
        this.randomoffset += this.shiftdirection * .5
    }

    // Math.abs(this.row)
    updatePosition(mx, my, width) {
        var deltaX = Math.abs(this.x - mx);
        var scale = (((width - deltaX) / width) ** 2);
        if (this.row != 0) {
            scale = scale / (Math.abs(this.row))
        }
        var deltaY = this.origin - my;
        this.position[1] = this.origin;
        this.position[1] -= deltaY * scale + this.randomoffset;
    }

    // Drawing methods
    drawConnections(ctx) {
        if (this.hasleft) {
            this.drawLine(ctx, this.left);
        }
        if (this.hasback) {
            this.drawLine(ctx, this.back);
        }
    }

    drawLine(ctx, pointTo) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(pointTo.x, pointTo.y);
        ctx.strokeStyle = '#4d6773';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#bfedf7';
        ctx.fill();
        ctx.closePath()
    }

    drawPoint(ctx) {
        this.drawCircle(ctx);
        this.drawConnections(ctx);
    }
}

// ---------------------------------------------------------------------- //
// ---------------------------------------------------------------------- //

// Get the canvas element
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Set canvas width and height to be the same as the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize mouseX and mouseY variables
var mouseX = 0;
var mouseY = 0;

// Calculate the number of points based on the canvas width and the gap between points
const numPoints = Math.floor(canvas.width / 50) + 1;

// Y-axis for main line
const mainlineY = canvas.height * 0.75;

// Y-offset in between rows
const rowdeltaY = 25

// Y-axis restrictions for main line 
const bound = canvas.height * 1 / 5
const topbound = mainlineY - bound;
const bottombound = mainlineY + bound;

halfrowcount = Math.floor((((bound) * 2) / rowdeltaY) / 2);
additionalrows = Math.floor((canvas.height - bottombound) / rowdeltaY) + 2;

allpoints = createRow(null, -halfrowcount, halfrowcount, additionalrows);


function createRow(previous, rownum, count, additional) {
    if (rownum <= count + additional) {
        var rows = [];
        points = [];


        slope = 3
        len = numPoints + count * 2 + additional
        // Create points and set their positions
        for (let i = 0; i < (len); i++) {
            x = ((i-count) * (canvas.width / (numPoints - 1))) + (rownum * rowdeltaY);
            y = mainlineY + (rownum * rowdeltaY) + ((len-i) * slope);
            points.push(new Point([x, y], rownum));
            if (i > 0) {
                points[i].setLeft(points[i - 1])
            }
            if (rownum != -count) {
                points[i].setBack(previous[i])
            }
            

        }

        rows = rows.concat(points);
        return rows.concat(createRow(points, rownum += 1, count, additional));
    }
}



// ---------------------------------------------------------------------- //
// ---------------------------------------------------------------------- //

frame = 0
function animate() {
    draw();
    requestAnimationFrame(animate);
}
animate();

// ---------------------------------------------------------------------- //
// ---------------------------------------------------------------------- //

// Function to draw all points and connections
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the cursor point
    var mousePos = getMousePos(canvas, { clientX: mouseX, clientY: mouseY });
    // Sets the mouse y
    if (mousePos.y < topbound) {
        mousePos.y = topbound;
    }
    else if (mousePos.y > bottombound) {
        mousePos.y = bottombound;
    }

    allpoints.forEach(point => {
        if (point != null) {
            point.drawPoint(ctx);
            point.updatePosition(mousePos.x, mousePos.y, canvas.width)
            if (frame % 5 == 0) {
                point.shift()
            }
        } 
    });

    frame += 1
}

// Function to get mouse position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Function to handle mouse movement
function handleMouseMove(evt) {
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

// Event listener for mouse movement
document.addEventListener('mousemove', handleMouseMove, false);

// Function to draw the cursor point
function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
}

window.addEventListener('resize', function () {
    location.reload();
});