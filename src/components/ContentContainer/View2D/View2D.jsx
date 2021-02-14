import * as Groolkit from '@znuznu/groolkit';

import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { Box } from '@chakra-ui/react';

import { COLORS } from 'services/grid.service';

const View2D = (props) => {
  const { grid, manageClickSelection, algorithmResult, generation } = props;

  const canvasRef = useRef(null);

  const [draw, setDraw] = useState(undefined);
  const [hoveredCell, setHoveredCell] = useState(undefined);
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
    if (draw && generation.type !== 'DUNGEON') {
      draw.drawGrid();
    }
  }, [draw]);

  useEffect(() => {
    if (draw) {
      drawGrid();
    }
  }, [generation]);

  useEffect(() => {
    const drawPointer = () => {
      const x = hoveredCell.x;
      const y = hoveredCell.y;

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.fillStyle = COLORS.HOVER;
      context.globalAlpha = 0.4;
      context.fillRect(y * tileSize, x * tileSize, tileSize, tileSize);
      context.globalAlpha = 1;
    };

    if (hoveredCell) {
      drawGrid();
      if (algorithmResult.result) {
        drawResult();
      }
      drawPointer();
    }
  }, [hoveredCell, tileSize]);

  useEffect(() => {
    if (algorithmResult.result) {
      drawResult();
    }
  }, [algorithmResult]);

  const drawResult = () => {
    const type = algorithmResult.type;
    const result = algorithmResult.result;

    switch (type) {
      case 'PATH':
        draw.drawPath(result);
        break;
      case 'FOV':
        draw.drawFov(result);
        break;
      case 'LINE':
        draw.drawLine(result);
        break;
      case 'FILL':
        draw.drawFill(result);
        break;
      default:
        throw new Error(`No such algorithm type: '${type}'`);
    }
  };

  const drawGrid = () => {
    switch (generation.type) {
      case 'DUNGEON':
        drawDungeon(generation.name);
        break;
      case 'DEFAULT':
        draw.drawGrid(grid);
        break;
    }
  };

  const drawDungeon = (name) => {
    if (generation.output) {
      switch (name) {
        case 'rogue':
          draw.drawRogue(generation.output);
          break;
      }
    }
  };

  const eventToCellPosition = (event) => {
    const [canvasX, canvasY] = getCanvasPosition(event.clientX, event.clientY);
    return getCellPosition(canvasY, canvasX);
  };

  const handleClick = (event) => {
    const [x, y] = eventToCellPosition(event);
    manageClickSelection(x, y);
  };

  const handleMov = (event) => {
    const [x, y] = eventToCellPosition(event);

    const isSet = hoveredCell;
    if (!isSet || hoveredCell.x !== x || hoveredCell.y !== y) {
      setHoveredCell({ x, y });
    }
  };

  const handleOutCanvas = () => {
    setHoveredCell(undefined);
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
    <>
      <Box _hover={{ cursor: 'pointer' }}>
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          onPointerMove={handleMov}
          onPointerOut={handleOutCanvas}
        />
      </Box>
    </>
  );
};

View2D.propTypes = {
  grid: PropTypes.array.isRequired,
  manageClickSelection: PropTypes.func.isRequired,
  algorithmResult: PropTypes.object.isRequired,
  generation: PropTypes.object.isRequired,
};

export default View2D;
