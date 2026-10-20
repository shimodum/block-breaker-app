
const canvas = document.getElementById("gameCanvas"); // Canvas要素を取得して、canvas という変数に代入している。= Canvas要素を取得して、HTMLの<canvas>要素を操作するための準備をしている。
const ctx = canvas.getContext("2d"); // 2d =2次元（2-dimensional）, 取得した上記Canvasから、2D描画用のコンテキストを取得している。= 2D描画機能を取得 = これにより、canvas上に図形を描画できるようになる。

// ブロックの設定
const brickRowCount = 4;
const brickColumnCount = 7;
const brickWidth = 56;
const brickHeight = 16;
const brickPaddingX = 7;
const brickPaddingY = 7;
const brickOffsetX = 20;
const brickOffsetY = 25;

const brickColors = ["#fb7185", "#fbbf24", "#34d399", "#60a5fa"];

const bricks = [];

// ボールの位置
let ballX = 240; // ボールの位置と移動速度は時間とともに変化するので、constではなくletを使っている。
let ballY = 200;

// ボールの移動速度
let ballDX = 2;
let ballDY = -2;

const ballRadius = 7;

// パドルの設定
const paddleWidth = 80;
const paddleHeight = 10;
let paddleX = 200; // letを使用しているのは、パドルの位置（x座標）がゲーム中に移動（更新）するため
const paddleY = 290;
const paddleSpeed = 5;

// キーの押下状態
let rightPressed = false;
let leftPressed = false;


// パドルを描画する
function drawPaddle() {
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

// ボールを描画する
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

// ブロックの情報を配列に登録する
function createBricks() {
    for (let row = 0; row < brickRowCount; row++) {
        for (let col = 0; col < brickColumnCount; col++) {
            const x = brickOffsetX + col * (brickWidth + brickPaddingX);
            const y = brickOffsetY + row * (brickHeight + brickPaddingY);

            bricks.push({
                x: x,
                y: y,
                color: brickColors[row],
                status: 1
            });
        }
    }
}

// ブロックを描画する
function drawBricks() {
    for (const brick of bricks) {
        if (brick.status === 1) {
            ctx.fillStyle = brick.color;
            ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
        }
    }
}

// ボールとブロックの衝突判定
function checkBallBrickCollision() {
    for (const brick of bricks) {
        if (brick.status === 0) {
            continue; // 衝突済みのブロックは無視する
        }

        const nextX = ballX + ballDX;
        const nextY = ballY + ballDY;

        const hitsBrick =
            nextX + ballRadius > brick.x &&
            nextX - ballRadius < brick.x + brickWidth &&
            nextY + ballRadius > brick.y &&
            nextY - ballRadius < brick.y + brickHeight;

        if (hitsBrick) {
            ballDY = -ballDY;
            brick.status = 0;
            break; // 一度に複数のブロックに衝突することはないので、衝突したらループを抜ける
        }
        

    }

}

// キーを押したとき
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        rightPressed = true;
        event.preventDefault(); // デフォルトのスクロール動作を防ぐ
    } else if (event.key === "ArrowLeft") {
        leftPressed = true;
        event.preventDefault();
    }
});

// キーを離したとき
document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowRight") {
        rightPressed = false;
        event.preventDefault();
    } else if (event.key === "ArrowLeft") {
        leftPressed = false;
        event.preventDefault();
    }
});

// マウスでパドルを操作する
canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();

    // マウスのX座標をCanvas内部の座標に変換
    const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);

    // マウスの位置に合わせてパドルを移動
    paddleX = mouseX - paddleWidth / 2;

    // パドルがCanvasの範囲外に出ないようにする
    paddleX = Math.max(0, Math.min(paddleX, canvas.width - paddleWidth));
});

// パドルの位置を更新する
function movePaddle() {
    if (rightPressed && paddleX + paddleWidth < canvas.width) { // 「右キーが押されている」かつ「パドルの右端がCanvasの右端より左にある」場合
        paddleX += paddleSpeed; // パドルを右へ5px移動
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    // Canvasの範囲内に収める
    paddleX = Math.max(0, Math.min(paddleX, canvas.width - paddleWidth));
}

// ボールとパドルの衝突判定
function checkBallPaddleCollision() {
    // ボールが上方向に移動している場合は判定しない
    if (ballDY <= 0) {
        return; // 上方向に移動している場合は衝突判定を行わずに関数を終了する
    }

    const nextBallBottom = ballY + ballDY + ballRadius;

    // ボールがパドルの上端を通過するか
    const hitsPaddleTop =
        ballY + ballRadius <= paddleY &&
        nextBallBottom >= paddleY;
    
    // ボールがパドルの横幅と重なっているか
    const hitsPaddleX =
        ballX + ballRadius >= paddleX &&
        ballX - ballRadius <= paddleX + paddleWidth;
    
    if (hitsPaddleTop && hitsPaddleX) {
        ballDY = -ballDY; // ボールの進行方向を反転させる
    }
}

// すべての図形を描画する
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリアしてから再描画することで、前のフレームの描画が残らないようにしている

    movePaddle();

    drawPaddle();
    drawBall();
    drawBricks();

    // 次のボールの位置を計算（現在の位置に移動量を足して、次にボールが移動する予定の座標を計算）
    const nextX = ballX + ballDX;
    const nextY = ballY + ballDY;

    // 左右の壁との当たり判定（ボールの右端が右の壁を越える、またはボールの左端が左の壁を越える場合）
    if (nextX + ballRadius > canvas.width || nextX - ballRadius < 0) {
        ballDX = -ballDX; // ボールの進行方向を反転させる
    }

    // 上の壁との当たり判定
    if (nextY - ballRadius < 0) {
        ballDY = -ballDY;
    }

    // ボールとパドルの衝突判定
    checkBallPaddleCollision();

    // ブロックとの衝突判定
    checkBallBrickCollision();
    ballX += ballDX;
    ballY += ballDY;

    requestAnimationFrame(draw); // Canvas全体を一度消去している → 次のフレームで再度draw関数を呼び出すことで、アニメーションを実現している。= これにより、毎フレームごとにボールの位置が更新され、滑らかなアニメーションが可能になる
}

createBricks(); // ゲーム開始前にブロックを生成する
draw(); // ゲームを開始するために最初のフレームを描画