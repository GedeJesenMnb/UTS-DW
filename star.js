
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);


canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';  
canvas.style.zIndex = '9999';  
canvas.style.background = 'transparent';  
canvas.style.mixBlendMode = 'screen';  


class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.opacity = 1;
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.color = this.generateStarColor();
    }

    generateStarColor() {
       
        const colors = [
            'rgba(255, 255, 255, 0.7)',   
            'rgba(173, 216, 230, 0.6)',   
            'rgba(255, 250, 205, 0.5)',   
            'rgba(230, 230, 250, 0.6)'   
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        
        
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((i * 4 * Math.PI) / 5) * this.size,
                      Math.sin((i * 4 * Math.PI) / 5) * this.size);
            ctx.lineTo(Math.cos(((i * 4 + 2) * Math.PI) / 5) * (this.size / 2),
                      Math.sin(((i * 4 + 2) * Math.PI) / 5) * (this.size / 2));
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.opacity -= 0.02;
        this.size += 0.1;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }
}


let mouseX = 0;
let mouseY = 0;
const stars = [];


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();


window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    
    if (Math.random() > 0.5) {
        stars.push(new Star(mouseX, mouseY));
    }
});


function animate() {
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = stars.length - 1; i >= 0; i--) {
        stars[i].update();
        stars[i].draw();

      
        if (stars[i].opacity <= 0) {
            stars.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();


window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    
    if (Math.random() > 0.5) {
        stars.push(new Star(mouseX, mouseY));
    }
});