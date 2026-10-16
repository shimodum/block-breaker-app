
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block Breaker</title>
    <link rel="stylesheet" href="{{ asset('css/game.css') }}">
</head>
<body>
    <header class="site-header">
        <h1>BLOCK BREAKER</h1>
        <p>User: Guest</p>
    </header>

    <main class="game-container">
        <div class="game-info">
            <p>SCORE: <span id="score">0</span></p>
            <p>LIFE: <span id="lives">♥♥♥</span></p>
        </div>

        <canvas id="gameCanvas" width="480" height="320"></canvas>

        <p class="game-instructions">
            ← → キーでパドルを操作
        </p>
    </main>
</body>
</html>
