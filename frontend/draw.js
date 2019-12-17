export function draw(game, ctx) {
  const paddleHeight = 10;
  const paddleWidth = 75;
  const ballRadius = 10;

  let dx = 2;
  let dy = -2;
  let paddleX = (ctx.canvas.width - paddleWidth) / 2;
  const brickRowCount = game.bricks[0].length;
  const brickColumnCount = game.bricks.length;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;
  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c += 1) {
      for (let r = 0; r < brickRowCount; r += 1) {
        if (game.bricks[c][r].status === 1) {
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          game.bricks[c][r].x = brickX;
          game.bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = '#0095DD';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function drawBall() {
    const { x, y } = game.ball.coords;
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }

  function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Score: ${game.score}`, 8, 20);
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(
      paddleX,
      ctx.canvas.height - paddleHeight,
      paddleWidth,
      paddleHeight
    );
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }

  function collisionDetection() {
    const { x, y } = game.ball.coords;
    for (let c = 0; c < brickColumnCount; c += 1) {
      for (let r = 0; r < brickRowCount; r += 1) {
        const b = game.bricks[c][r];
        if (b.status === 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status = 0;
            game.score++;
            if (game.score == brickRowCount * brickColumnCount) {
              alert('You win, congratulations!');
              game.finish();
            }
          }
        }
      }
    }
  }

  function _draw() {
    const { x, y } = game.ball.coords;
    if (!game.isPlaying) {
      alert('Game over');
      document.location.reload();
      return;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    requestAnimationFrame(_draw);
    collisionDetection();
    if (x + dx > ctx.canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > ctx.canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        game.finish();
      }
    }
    if (game.movingRight) {
      paddleX += 7;
      if (paddleX + paddleWidth > ctx.canvas.width) {
        paddleX = ctx.canvas.width - paddleWidth;
      }
    } else if (game.movingLeft) {
      paddleX -= 7;
      if (paddleX < 0) {
        paddleX = 0;
      }
    }
    game.ball.moveRight(dx);
    game.ball.moveDown(dy);
  }

  game.start();

  _draw();
}
