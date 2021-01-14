import React, { useContext, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import * as Groolkit from '@znuznu/groolkit';

import { Box } from '@chakra-ui/react';

import AlgorithmContext from 'contexts/AlgorithmContext';

const View = (props) => {
  const canvasRef = useRef(null);

  let [draw, setDraw] = useState(
    new Groolkit.Draw.DrawPath({
      context: canvasRef.current.context,
      grid,
      callback: (n) => n,
      drawOptions: {
        widthTile: Groolkit.TILE_WIDTH,
        heightTile: Groolkit.TILE_HEIGHT,
      },
    })
  );

  const twoClicksAlgorithms = [
    'astar4',
    'astar8',
    'dijkstra4',
    'dijkstra8',
    'linelerp',
  ];

  let [clickSelection, setClickSelection] = useState([]);
  let [grid, setGrid] = useState([
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  ]);

  const currentAlgorithm = useContext(AlgorithmContext);

  const { height, width, bgColor } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = bgColor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  useEffect(() => {
    if (draw) {
      draw.drawGrid();
    }
  }, [draw]);

  useEffect(() => {
    if (draw) {
      const args = {
        context: canvasRef.current.context,
        grid,
        callback: (n) => n,
        drawOptions: {
          widthTile: Groolkit.TILE_WIDTH,
          heightTile: Groolkit.TILE_HEIGHT,
        },
      };

      if (currentAlgorithm.type === 'PATH') {
        setDraw(new Groolkit.Draw.DrawPath(args));
      } else if (currentAlgorithm.type === 'FOV') {
        setDraw(new Groolkit.Draw.DrawFov(args));
      } else if (currentAlgorithm.type === 'LINE') {
        setDraw(new Groolkit.Draw.DrawLine(args));
      }
    }
  }, [currentAlgorithm]);

  useEffect(() => {
    if (currentAlgorithm) {
      handleAlgorithm();
    }
  }, [clickSelection]);

  const processPath = () => {
    if (clickSelection.length !== 2) {
      return;
    }

    // todo change that shit
    const paths = {
      dijkstra4: new Groolkit.Path.Dijkstra(grid, { type: 4 }, (n) => n),
      dijkstra8: new Groolkit.Path.Dijkstra(grid, { type: 8 }, (n) => n),
      astar4: new Groolkit.Path.AStar(grid, { type: 4 }, (n) => n),
      astar8: new Groolkit.Path.AStar(grid, { type: 8 }, (n) => n),
    };

    let path = paths[currentAlgorithm];

    path.init();
    let start = clickSelection[0];
    let end = clickSelection[1];
    let result = path.search(start, end);

    draw.draw(result, 500);
  };

  const processFov = () => {
    const fovs = {
      rsc: new Groolkit.FOV.RecursiveShadowCasting(grid, (n) => !n),
    };

    let fovResult = fovs[currentAlgorithm].compute(clickSelection[0]);

    if (fovResult.status === 'Success') {
      console.log(fovResult);
      draw.draw(fovResult);
    }
  };

  const handleAlgorithm = () => {
    const algorithms = {
      PATH: () => 'processPath',
      FOV: () => 'processFov',
    };

    algorithms[currentAlgorithm.type]();
  };

  const handleClick = (event) => {
    const [canvasX, canvasY] = getCanvasPosition(event.clientX, event.clientY);
    const [x, y] = getTilePosition(canvasY, canvasX);

    if (twoClicksAlgorithms.includes(currentAlgorithm)) {
      if (clickSelection.length !== 2) {
        setClickSelection((clickSelection) => [...clickSelection, { x, y }]);
      } else {
        setClickSelection((clickSelection) => [clickSelection[1], { x, y }]);
      }
    } else {
      setClickSelection([{ x, y }]);
    }
  };

  const getCanvasPosition = (clientX, clientY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const canvasX = clientX - rect.left;
    const canvasY = clientY - rect.top;

    return [canvasX, canvasY];
  };

  const getTilePosition = (canvasX, canvasY) => {
    let x = ~~(canvasX / Groolkit.TILE_HEIGHT);
    let y = ~~(canvasY / Groolkit.TILE_WIDTH);

    return [x, y];
  };

  return (
    <AlgorithmContext.Consumer>
      {(value) => (
        <>
          <Box _hover={{ cursor: 'pointer' }}>
            <canvas ref={canvasRef} color={bgColor} onClick={handleClick} />
          </Box>
        </>
      )}
    </AlgorithmContext.Consumer>
  );
};

View.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  bgColor: PropTypes.string,
};

View.defaultProps = {
  bgColor: '#000000',
};

export default View;
