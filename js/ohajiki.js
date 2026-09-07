class ohajiki {
    constructor(x, y, radius, weight, color ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.weight = weight;
        this.color = color;
    }
    
    draw(canvas, ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(canvas.width * this.x, canvas.width * this.y, canvas.width * this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}