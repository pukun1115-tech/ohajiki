const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    const w = Math.floor(window.innerWidth);
    const h = Math.floor(window.innerHeight / 2) * 2;

    //画面上の表示サイズ
    let displayWidth, displayHeight;

    if ((h / 2) > w) {
        displayWidth = w;
        displayHeight = w * 2;
    } else {
        displayWidth = h / 2;
        displayHeight = h;
    }

    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";

    const dpr = window.devicePixelRatio || 1;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    ctx.scale(dpr, dpr);
}

window.addEventListener("resize", resizeCanvas);

const ohajikiArray = [];

function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(mainLoop);
}

resizeCanvas();
mainLoop();