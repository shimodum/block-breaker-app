
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

        <div class="start-area">
            <button id="startButton" type="button">START</button>
        </div>

        <div class="game-instructions">
            <p class="instructions-title">操作方法</p>

            <p>← → キー または マウス：パドル移動</p>
            <p>Spaceキー：一時停止・再開</p>
            <p>Rキー：リスタート</p>
        </div>
    </main>

    <script src="{{ asset('js/game.js') }}"></script>
</body>
</html>
