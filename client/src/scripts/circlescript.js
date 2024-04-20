// Define the Point class
class Point {
    constructor(position, angle) {
        this.angle = angle
        this.position = position;
        this.originx = position[0]
        this.originy = position[1];
        this.next = null;
        this.randomoffset = Math.random() * 3;
        this.shakespeed = .05
        this.rotationspeed = .03;
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

    // Setters

    setNext(next) {
        this.next = next;
    }

    changeSpeed(scale) {
        this.rotationspeed = .03 * scale;
    }

    shift() {
        if (this.randomoffset > 3) {
            this.shiftdirection = -1;
        }
        else if (this.randomoffset < -3) {
            this.shiftdirection = 1;
        }
        this.randomoffset += this.shiftdirection * this.shakespeed
        var xoffset = this.randomoffset * Math.cos(this.angle);
        var yoffset = this.randomoffset * Math.sin(this.angle);
        this.position[0] = this.originx + xoffset;
        this.position[1] = this.originy + yoffset;
        
    }

    rotate(radius, center) {
        this.shift();

        this.angle += this.rotationspeed;
        this.originx = center[0] + Math.cos(this.angle) * radius;
        this.originy = center[1] + Math.sin(this.angle) * radius;

    }

    // Drawing methods
    drawConnections(ctx) {
        this.drawLine(ctx, this.next)
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

// Get the canvas element
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Initialize mouseX and mouseY variables
var mouseX = 0;
var mouseY = 0;

// Define the radius and center of the circle
const radius = 30;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Create 20 points positioned around the circumference of the circle
const points = [];
for (let i = 0; i < 15; i++) {
    const angle = (Math.PI * 2) / 15 * i;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const point = new Point([x, y], angle);
    points.push(point);
}

// Connect each point to the next one to form a circle
for (let i = 0; i < points.length; i++) {
    points[i].setNext(points[(i + 1) % points.length]);
}

// Draw each point
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var mousePos = getMousePos(canvas, { clientX: mouseX, clientY: mouseY });

    var distance = calculateDistance(mousePos, { x: centerX, y: centerY });
    console.log(distance);
    if (distance > 500) {
        distance = 500;
    }
    scale = (600 - distance) / 600

    for (const point of points) {
        point.changeSpeed(scale);
        point.rotate(radius, [centerX, centerY]);
        point.drawPoint(ctx);
    }

    requestAnimationFrame(draw);
}

draw();

// Function to calculate distance between mouse and center of circle
function calculateDistance(a, b) {
    return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2)
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