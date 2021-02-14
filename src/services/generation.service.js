import * as Groolkit from '@znuznu/groolkit';

export const getGenerationObject = (generationName) => {
  const dungeons = ['rogue'];
  const defaultGeneration = ['default'];

  if (defaultGeneration.includes(generationName)) {
    return { name: generationName, type: 'DEFAULT', output: null };
  } else if (dungeons.includes(generationName)) {
    return { name: generationName, type: 'DUNGEON', output: null };
  }
};

const generateDungeon = (name) => {
  let dungeon = null;

  switch (name) {
    case 'rogue':
      dungeon = new Groolkit.Dungeon.Rogue({
        heightRoomNumbers: 10,
        widthRoomNumbers: 10,
        roomHeight: [5, 12],
        roomWidth: [5, 12],
      });
      break;
  }

  return dungeon.generate();
};

export const generateGrid = (generationType) => {
  if (generationType.type === 'DUNGEON') {
    return generateDungeon(generationType.name);
  }
};

// Generate a grid with random 0 and 1.
export const generateDefault = (height, width) => {
  let grid = [];

  for (let row = 0; row < height; row++) {
    grid.push([]);
    for (let col = 0; col < width; col++) {
      grid[row].push(Math.random() <= 0.2 ? 1 : 0);
    }
  }

  return grid;
};
