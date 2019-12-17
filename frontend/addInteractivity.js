const keyCodes = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
};

export function addInteractivity(game) {
  const events = {
    keydown: {
      [keyCodes.ARROW_LEFT]: () => {
        game.startMovingLeft();
      },
      [keyCodes.ARROW_RIGHT]: () => {
        game.startMovingRight();
      },
    },
    keyup: {
      [keyCodes.ARROW_LEFT]: () => {
        game.stopMoving();
      },
      [keyCodes.ARROW_RIGHT]: () => {
        game.stopMoving();
      },
    },
  };

  for (const event of Object.keys(events)) {
    window.addEventListener(event, e => {
      if (e.which in events[event]) {
        e.preventDefault();
        events[event][e.which](e);
      }
    });
  }
}
