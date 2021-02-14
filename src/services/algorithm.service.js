import * as Groolkit from '@znuznu/groolkit';

/**
 * Return an object containing the algorithm name and his type.
 *
 * @param {string} algorithmName
 */
export const getAlgorithmObject = (algorithmName) => {
  const paths = ['astar4', 'astar8', 'dijkstra4', 'dijkstra8'];
  const fovs = ['rsc'];
  const lines = ['lerp'];
  const fill = ['flood'];

  if (paths.includes(algorithmName)) {
    return { name: algorithmName, type: 'PATH' };
  } else if (fovs.includes(algorithmName)) {
    return { name: algorithmName, type: 'FOV' };
  } else if (lines.includes(algorithmName)) {
    return { name: algorithmName, type: 'LINE' };
  } else if (fill.includes(algorithmName)) {
    return { name: algorithmName, type: 'FILL' };
  }
};

// FIXME: replace the switches below by something sexy

export const processPath = ({ algorithmName, grid, callback, positions }) => {
  let path = null;

  switch (algorithmName) {
    case 'astar4':
      path = new Groolkit.Path.AStar(grid, { type: 4 }, callback);
      break;
    case 'astar8':
      path = new Groolkit.Path.AStar(grid, { type: 8 }, callback);
      break;
    case 'dijkstra4':
      path = new Groolkit.Path.Dijkstra(grid, { type: 4 }, callback);
      break;
    case 'dijkstra8':
      path = new Groolkit.Path.Dijkstra(grid, { type: 8 }, callback);
      break;
    default:
      throw new Error(`No such algorithm: '${algorithmName}'`);
  }

  path.init();
  const start = positions[0];
  const end = positions[1];

  return path.search(start, end);
};

export const processFov = ({ algorithmName, grid, callback, position }) => {
  let fov = null;

  switch (algorithmName) {
    case 'rsc':
      fov = new Groolkit.FOV.RecursiveShadowCasting(grid, callback);
      break;
    default:
      throw new Error(`No such algorithm: '${algorithmName}'`);
  }

  return fov.compute(position);
};

export const processLine = ({ algorithmName, grid, callback, positions }) => {
  let line = null;

  switch (algorithmName) {
    case 'lerp':
      line = new Groolkit.Line.LineLerp(grid, callback);
      break;
    default:
      throw new Error(`No such algorithm: '${algorithmName}'`);
  }

  return line.process(positions[0], positions[1]);
};

export const processFill = ({ algorithmName, grid, callback, position }) => {
  let fill = null;

  switch (algorithmName) {
    case 'flood':
      fill = new Groolkit.Fill.FloodFill(grid, callback);
      break;
    default:
      throw new Error(`No such algorithm: '${algorithmName}'`);
  }

  return fill.process(position);
};
