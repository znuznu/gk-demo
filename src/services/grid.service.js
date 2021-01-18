// Provided by Groolkit soon

// export it from Groolkit?
export const COLORS = {
  HOVER: 'firebrick',
  BLOCK: 'grey',
  PASSAGE: 'white',
  LINE: 'black',
  BG: 'white',
  START: 'pink',
  END: 'green',
  PATH: 'yellow',
  FILL: 'lightblue',
  LINE_ALGORITHM: 'red',
  FOV: 'wheat',
};

// Generate a grid with random 0 and 1.
export const generate = (height, width) => {
  let grid = [];

  for (let row = 0; row < height; row++) {
    grid.push([]);
    for (let col = 0; col < width; col++) {
      grid[row].push(Math.random() <= 0.2 ? 1 : 0);
    }
  }

  return grid;
};
