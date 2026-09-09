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
        //減速
        const friction = 1;
        this.gx *= friction;
        this.gy *= friction;
        
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

        for (const p of ohajikiArray) {
            if (this.id === p.id) continue;
            const dx = p.x - this.x;
            const dy = p.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.radius + p.radius) {
                if (distance === 0) continue;

                //めり込み
                const overlap = this.radius + p.radius - distance;
                //長さ1のときのx,yの方向ベクトル
                const nx = dx / distance;
                const ny = dy / distance;
                //thisを押し戻す
                this.x -= nx * overlap;
                this.y -= ny * overlap;

                //近づいているときだけ、質量に応じて速度を交換する(github copilot)
                //相対的に二つが近づいているとき
                const relativeVelocity = (p.gx - this.gx) * nx + (p.gy - this.gy) * ny;
                if (relativeVelocity < 0) {
                    const inverseWeightSum = 1 / this.weight + 1 / p.weight;
                    const impulse = -2 * relativeVelocity / inverseWeightSum;
                    this.gx -= impulse * nx / this.weight;
                    this.gy -= impulse * ny / this.weight;
                    p.gx += impulse * nx / p.weight;
                    p.gy += impulse * ny / p.weight;
                }
            }
        }
    }
}
