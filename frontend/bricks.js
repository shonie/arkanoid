export function makeBricks(x, y) {
  const bricks = [];
  for (let c = 0; c < x; c += 1) {
    bricks[c] = [];
    for (let r = 0; r < y; r += 1) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
  return bricks;
}

