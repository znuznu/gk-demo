import React, { useContext, useEffect, useRef, useState } from 'react';

import * as Groolkit from '@znuznu/groolkit';

import { Box } from '@chakra-ui/react';

import AlgorithmContext from 'contexts/AlgorithmContext';
import {
  processFill,
  processFov,
  processLine,
  processPath,
} from 'services/algorithm.service';

const View = () => {
  const canvasRef = useRef(null);

  const [clickSelection, setClickSelection] = useState([]);
  const [grid, setGrid] = useState([
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

  const [draw, setDraw] = useState(undefined);

  const currentAlgorithm = useContext(AlgorithmContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  useEffect(() => {
    if (grid && canvasRef.current.getContext('2d')) {
      setDraw(
        new Groolkit.Draw(canvasRef.current.getContext('2d'), grid, (n) => n, {
          widthTile: Groolkit.TILE_WIDTH,
          heightTile: Groolkit.TILE_HEIGHT,
        })
      );
    }
  }, [grid]);

  useEffect(() => {
    if (draw) {
      draw.drawGrid();
    }
  }, [draw]);

  useEffect(() => {
    const handleAlgorithm = () => {
      switch (currentAlgorithm.type) {
        case 'PATH':
          handlePath();
          break;
        case 'FOV':
          handleFov();
          break;
        case 'LINE':
          handleLine();
          break;
        case 'FILL':
          handleFill();
          break;
        default:
          throw new Error(`No such algorithm type '${currentAlgorithm.type}'`);
      }
    };

    handleAlgorithm();
  });

  const handlePath = () => {
    if (clickSelection.length !== 2) {
      return;
    }

    const result = processPath({
      algorithmName: currentAlgorithm.name,
      grid,
      callback: (n) => n,
      positions: clickSelection,
    });

    draw.drawPath(result, 500);
  };

  const handleLine = () => {
    if (clickSelection.length !== 2) {
      return;
    }

    const lineResult = processLine({
      algorithmName: currentAlgorithm.name,
      grid,
      callback: (n) => n,
      positions: clickSelection,
    });

    draw.drawLine(lineResult);
  };

  const handleFov = () => {
    if (!clickSelection.length) {
      return;
    }

    const fovResult = processFov({
      algorithmName: currentAlgorithm.name,
      grid,
      callback: (n) => !n,
      position: clickSelection[0],
    });

    draw.drawFov(fovResult);
  };

  const handleFill = () => {
    if (!clickSelection.length) {
      return;
    }

    const fillResult = processFill({
      algorithmName: currentAlgorithm.name,
      grid,
      callback: (n) => n === 0,
      position: clickSelection[0],
    });

    draw.drawFill(fillResult);
  };

  const handleClick = (event) => {
    const [canvasX, canvasY] = getCanvasPosition(event.clientX, event.clientY);
    const [x, y] = getTilePosition(canvasY, canvasX);

    const isTwoClicksAlgorithm =
      currentAlgorithm.type === 'PATH' || currentAlgorithm.type === 'LINE';

    if (isTwoClicksAlgorithm) {
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
            <canvas ref={canvasRef} onClick={handleClick} />
          </Box>
        </>
      )}
    </AlgorithmContext.Consumer>
  );
};

export default View;
