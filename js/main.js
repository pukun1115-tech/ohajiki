const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = {
    pointerDown: false,
    pointerX: null,
    pointerY: null,
    pointerTargetOhajikiId: null,
    ohajikiId: 0
};

window.addEventListener("resize", () => {
    resizeCanvas(canvas, ctx);
});

canvas.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    updatePointerPosition(e);
    game.pointerDown = true;
});

canvas.addEventListener("pointermove", (e) => {
    e.preventDefault();
    updatePointerPosition(e);
});

canvas.addEventListener("pointerup", (e) => {
    e.preventDefault();
    updatePointerPosition(e);
    game.pointerDown = false;
});

const ohajikiArray = [];
ohajikiArray.push(createOhajiki(0.8, 1, 0.1, 10, "rgba(255, 255, 0, 1)"));
ohajikiArray.push(createOhajiki(0.4, 1, 0.05, 10, "rgba(0, 0, 255, 0.5)"));

resizeCanvas(canvas);
mainLoop();

function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const o of ohajikiArray) {
        o.draw(canvas, ctx);
        o.update();
    }

    const target = ohajikiArray.find(o => (o.id ===game.pointerTargetOhajikiId));
    if (target === undefined) {
        if (game.pointerDown) {
            for (const o of ohajikiArray) {
                const distance = Math.pow(game.pointerX - o.x, 2) + Math.pow(game.pointerY - o.y, 2);
                if (distance < Math.pow(o.radius, 2)) {
                    game.pointerTargetOhajikiId = o.id;
                    break;
                }
            }
        }
    }
    else {
        if (game.pointerDown) {
            target.tx = game.pointerX - target.x;
            target.ty = game.pointerY - target.y;
        }
        else {
            target.gx = -target.tx / 20;
            target.gy = -target.ty / 20;
            target.tx = null;
            target.ty = null;
            game.pointerTargetOhajikiId = null;
        }
    }

    requestAnimationFrame(mainLoop);
}

function resizeCanvas(canvas) {
    //ウィンドウの大きさ
    const w = Math.floor(window.innerWidth);
    const h = Math.floor(window.innerHeight / 2) * 2;

    //画面上の表示サイズ
    let displayWidth, displayHeight;

    if ((h / 2) > w) {
        //縦が余る
        displayWidth = w;
        displayHeight = w * 2;
    } else {
        //横が余る
        displayWidth = h / 2;
        displayHeight = h;
    }

    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";

    const dpr = window.devicePixelRatio || 1;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
}

function updatePointerPosition(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    game.pointerX = (e.clientX - rect.left) / rect.width;
    game.pointerY = (e.clientY - rect.top) / rect.width;
}

function createOhajiki(x, y, radius, weight, color) {
    game.ohajikiId++;
    return new ohajiki(game.ohajikiId, x, y, radius, weight, color);
}
