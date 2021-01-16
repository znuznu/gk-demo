import * as Groolkit from '@znuznu/groolkit';

import React, { useContext, useEffect, useRef, useState } from 'react';

import { Box } from '@chakra-ui/react';

import AlgorithmContext from 'contexts/AlgorithmContext';
import {
  processFill,
  processFov,
  processLine,
  processPath,
} from 'services/algorithm.service';
import { COLORS, generate } from 'services/grid.service';

const View = () => {
  const canvasRef = useRef(null);
  const currentAlgorithm = useContext(AlgorithmContext);
  const [clickSelection, setClickSelection] = useState([]);
  const [grid, setGrid] = useState(generate(30, 30));
  const [draw, setDraw] = useState(undefined);
  const [currentPointerCell, setCurrentPointerCell] = useState(undefined);
  const [tileSize, setTileSize] = useState(16);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  useEffect(() => {
    if (grid && canvasRef.current.getContext('2d')) {
      setDraw(
        new Groolkit.Draw(canvasRef.current.getContext('2d'), grid, (n) => n, {
          width: tileSize,
          height: tileSize,
        })
      );
    }
  }, [grid, tileSize]);

  useEffect(() => {
    if (draw) {
      draw.drawGrid();
    }
  }, [draw]);

  useEffect(() => {
    const handleAlgorithm = () => {
      const handle = {
        PATH: handlePath,
        FOV: handleFov,
        LINE: handleLine,
        FILL: handleFill,
      };

      handle[currentAlgorithm.type]();
    };

    // Avoid drawing a trace, we're trading some perf here but it's okay
    handleDefault();

    handleAlgorithm();
  });

  useEffect(() => {
    if (currentPointerCell) {
      const x = currentPointerCell.x;
      const y = currentPointerCell.y;

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.fillStyle = COLORS.hover;
      context.globalAlpha = 0.4;
      context.fillRect(y * tileSize, x * tileSize, tileSize, tileSize);
    }
  }, [currentPointerCell, tileSize]);

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

  const handleDefault = () => {
    if (draw) {
      draw.drawGrid();
    }
  };

  const handleClick = (event) => {
    const [canvasX, canvasY] = getCanvasPosition(event.clientX, event.clientY);
    const [x, y] = getCellPosition(canvasY, canvasX);

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

  const handleMov = (event) => {
    const [canvasX, canvasY] = getCanvasPosition(event.clientX, event.clientY);
    const [x, y] = getCellPosition(canvasY, canvasX);

    const isNotSet = !currentPointerCell;

    if (isNotSet || currentPointerCell.x !== x || currentPointerCell.y !== y) {
      setCurrentPointerCell({ x, y });
    }
  };

  const handleOut = () => {
    setCurrentPointerCell(undefined);
  };

  const getCanvasPosition = (clientX, clientY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const canvasX = clientX - rect.left;
    const canvasY = clientY - rect.top;

    return [canvasX, canvasY];
  };

  const getCellPosition = (canvasX, canvasY) => {
    let x = ~~(canvasX / tileSize);
    let y = ~~(canvasY / tileSize);

    return [x, y];
  };

  return (
    <AlgorithmContext.Consumer>
      {(value) => (
        <>
          <Box _hover={{ cursor: 'pointer' }}>
            <canvas
              ref={canvasRef}
              onClick={handleClick}
              onPointerMove={handleMov}
              onPointerOut={handleOut}
            />
          </Box>
        </>
      )}
    </AlgorithmContext.Consumer>
  );
};

export default View;
