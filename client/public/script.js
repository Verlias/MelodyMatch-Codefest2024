// Define the Point class
class Point {
    constructor(position, row) {
        this.position = position;   // Tuple
        this.origin = position[1]   // Float
        this.right = null;          // Point object
        this.front = null;          // Point object
        this.back = null;           // Point object
        this.row = row;             // Integer (row number)
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

    get hasright() {
        return this.right !== null;
    }

    get hasfront() {
        return this.front !== null;
    }

    get hasback() {
        return this.back !== null;
    }

    // Setters

    setRight(right) {
        this.right = right;
    }

    setFront(front) {
        this.front = front;
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
        if (this.hasright) {
            this.drawLine(ctx, this.right);
        }
        if (this.hasfront) {
            this.drawLine(ctx, this.front);
        }
        if (this.hasback) {
            this.drawLine(ctx, this.back);
        }
    }

    drawLine(ctx, pointTo) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(pointTo.x, pointTo.y);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
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

// Y-axis restrictions for main line 
const bound = canvas.height * 1 / 5
const topbound = mainlineY - bound;
const bottombound = mainlineY + bound;

points0 = createRow(null, 0);
pointsf1 = createRow(points0, 1);
pointsf2 = createRow(pointsf1, 2);
pointsf3 = createRow(pointsf2, 3);
pointsf4 = createRow(pointsf3, 4);
pointsf5 = createRow(pointsf4, 5);
pointsf6 = createRow(pointsf5, 6);
pointsf7 = createRow(pointsf6, 7);
pointsb1 = createRow(points0, -1);
pointsb2 = createRow(pointsb1, -2);
pointsb3 = createRow(pointsb2, -3);
pointsb4 = createRow(pointsb3, -4);
pointsb5 = createRow(pointsb4, -5);
pointsb6 = createRow(pointsb5, -6);
pointsb7 = createRow(pointsb6, -7);

setMainConnections(points0, pointsf1, pointsb1);

function createRow(previous, rownum) {
    var points = [];

    // Create points and set their positions
    for (let i = -4; i < numPoints + 4; i++) {
        points.push(new Point([(i * (canvas.width / (numPoints - 1)))+(rownum*25), mainlineY + (rownum*25)], rownum));
    }

    // Set left and right connections for points to form a line
    for (let i = 0; i < points.length - 1; i++) {
        points[i].setRight(points[i + 1]);
        if (previous != null) {
            if (rownum < 0) {
                points[i].setBack(previous[i])
            }
            else {
                points[i].setFront(previous[i])
            }
        }
    }

    return points
}

function setMainConnections(mainline, f1, b1) {
    for (let i = 0; i < mainline.length - 1; i++) {
        mainline[i].setBack(b1[i]);
        //mainline[i].setFront(f1[i]);
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

    points0.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });

    pointsf1.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y + 25, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsf2.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y + 50, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsf3.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y + 75, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsf4.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y + 100, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsf5.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y + 125, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsf6.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y + 150, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsf7.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y + 175, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });


    pointsb1.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y - 25, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsb2.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y - 50, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsb3.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y - 75, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsb4.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y - 100, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsb5.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y - 125, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsb6.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y - 150, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
        }
    });
    pointsb7.forEach(point => {
        point.drawPoint(ctx);
        point.updatePosition(mousePos.x, mousePos.y - 175, canvas.width)
        if (frame % 5 == 0) {
            point.shift()
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
canvas.addEventListener('mousemove', handleMouseMove, false);

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