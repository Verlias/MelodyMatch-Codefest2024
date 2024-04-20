class MusicNote {
    constructor(center, angle) {
        this.center = center;
        this.angle = angle;
        this.rotationspeed = .002;
    }

    get x() {
        return this.center[0];
    }

    get y() {
        return this.center[1];
    }

    drawNote(ctx) {
        // Draw the note head
        var hdis = 33;
        var hoff = -3;
        ctx.beginPath();
        ctx.arc(this.x+(hdis*Math.cos(this.angle))+(hoff*Math.sin(this.angle)), this.y+(hdis*Math.sin(this.angle))+(hoff*Math.cos(this.angle)), 5, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();

        // Draw the stem
        var slen = 35;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + (slen*Math.cos(this.angle)), this.y+(slen*Math.sin(this.angle)));
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        // Draw the flag
        var foff = 3;
        var flenx = 10
        var fleny = 1
        ctx.beginPath();
        ctx.moveTo(this.x + (foff*Math.cos(this.angle)), this.y + (foff*Math.sin(this.angle)));
        ctx.lineTo(this.x + (flenx * Math.cos(this.angle)) + (fleny * Math.cos(this.angle)), this.y + (flenx * Math.sin(this.angle)) + (flenx * Math.sin(this.angle)));
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    rotate(){
        this.angle += this.rotationspeed;
    }

    increaseSpeed() {
        this.rotationspeed += .01;
    }

    decreaseSpeed() {
        this.rotationspeed -= .0005;
        if (this.rotationspeed < .002) {
            this.rotationspeed = .002;
        }
    }
}

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var musicnotes = [];

for (let i = 1; i <= 8; i++) {
    var angle = (2 * Math.PI/8) * i
    musicnotes.push(new MusicNote([100, 100], angle));
}

document.addEventListener('keydown', function (event) {
    musicnotes.forEach(note => {
        if (note != null) {
            note.increaseSpeed();
        }
    });
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    musicnotes.forEach(note => {
        if (note != null) {
            note.decreaseSpeed();
            note.rotate();
            note.drawNote(ctx);
        }
    });
    requestAnimationFrame(draw);
}


draw();