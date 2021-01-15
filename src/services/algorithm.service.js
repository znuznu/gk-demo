import * as Groolkit from '@znuznu/groolkit';

/**
 * Return an object containing the algorithm name and his type.
 *
 * @param {string} algorithmName
 */
export const getAlgorithmObject = (algorithmName) => {
  const paths = ['astar4', 'astar8', 'dijsktra4', 'dijsktra8'];
  const fovs = ['rsc'];
  const lines = ['lerp'];
  // fill
  // const lines = ['linelerp'];

  if (paths.includes(algorithmName)) {
    return { name: algorithmName, type: 'PATH' };
  } else if (fovs.includes(algorithmName)) {
    return { name: algorithmName, type: 'FOV' };
  } else if (lines.includes(algorithmName)) {
    return { name: algorithmName, type: 'LINE' };
  }
};

export const processPath = ({ algorithmName, grid, callback, positions }) => {
  //todo: change this abomination!
  const paths = {
    dijkstra4: new Groolkit.Path.Dijkstra(grid, { type: 4 }, callback),
    dijkstra8: new Groolkit.Path.Dijkstra(grid, { type: 8 }, callback),
    astar4: new Groolkit.Path.AStar(grid, { type: 4 }, callback),
    astar8: new Groolkit.Path.AStar(grid, { type: 8 }, callback),
  };

  const path = paths[algorithmName];

  path.init();
  const start = positions[0];
  const end = positions[1];

  return path.search(start, end);
};

export const processFov = ({ algorithmName, grid, callback, position }) => {
  const fovs = {
    rsc: new Groolkit.FOV.RecursiveShadowCasting(grid, callback),
  };

  return fovs[algorithmName].compute(position);
};

export const processLine = ({ algorithmName, grid, callback, positions }) => {
  const lines = {
    lerp: new Groolkit.Line.LineLerp(grid, callback),
  };

  return lines[algorithmName].process(positions[0], positions[1]);
};
