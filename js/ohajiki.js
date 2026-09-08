class ohajiki {
    constructor(id, x, y, radius, weight, color ) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.weight = weight;
        this.color = color;
        //飛ばす方向描画用
        this.tx = null;
        this.ty = null;
        //飛ぶ方向
        this.gx = 0;
        this.gy = 0;
    }
    
    draw(canvas, ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(canvas.width * this.x, canvas.width * this.y, canvas.width * this.radius, 0, Math.PI * 2);
        ctx.fill();
        if (this.tx !== null && this.ty !== null) {
            ctx.strokeStyle = "rgba(255, 255, 255, 1)";
            ctx.lineWidth = canvas.width * 0.01;
            ctx.beginPath();
            ctx.moveTo(canvas.width * this.x, canvas.width * this.y);
            ctx.lineTo(canvas.width * (this.x + this.tx), canvas.width * (this.y + this.ty));
            ctx.stroke();
        }
    }

    update() {
        this.x += this.gx;
        this.y += this.gy;
        if (this.x < 0 + this.radius) {
            this.x = (0 + this.radius) * 2 - this.x;
            this.gx = -this.gx;
        }
        if (this.x > 1 - this.radius) {
            this.x = (1 - this.radius) * 2 - this.x;
            this.gx = -this.gx;
        }
        if (this.y < 0 + this.radius) {
            this.y = (0 + this.radius) * 2 - this.y;
            this.gy = -this.gy;
        }
        if (this.y > 2 - this.radius) {
            this.y = (2 - this.radius) * 2 - this.y;
            this.gy = -this.gy;
        }
    }
}
