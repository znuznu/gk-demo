import React, { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';

import {
  processFill,
  processFov,
  processLine,
  processPath,
} from 'services/algorithm.service';

import { getAlgorithmObject } from 'services/algorithm.service';
import { generateGrid, getGenerationObject } from 'services/generation.service';

import View2D from './View2D/View2D';
import Algorithms from './Algorithms/Algorithms';
import { generateDefault } from 'services/generation.service';
import Result from './Result/Result';
import MapGeneration from './MapGeneration/MapGeneration';

const ContentContainer = () => {
  const [generation, setGeneration] = useState({
    name: 'random',
    type: 'DEFAULT',
    output: null,
  });
  const [grid, setGrid] = useState(generateDefault(30, 30));
  const [clickSelection, setClickSelection] = useState([]);
  const [algorithmResult, setAlgorithmResult] = useState({
    type: 'PATH',
    name: 'astar4',
    result: null,
  });

  useEffect(() => {
    const handlePath = () => {
      if (clickSelection.length !== 2) {
        return;
      }

      const pathResult = processPath({
        algorithmName: algorithmResult.name,
        grid,
        callback: (n) => n,
        positions: clickSelection,
      });

      setAlgorithmResult((ar) => ({ ...ar, result: pathResult }));
    };

    const handleLine = () => {
      if (clickSelection.length !== 2) {
        return;
      }

      const lineResult = processLine({
        algorithmName: algorithmResult.name,
        grid,
        callback: (n) => n,
        positions: clickSelection,
      });

      setAlgorithmResult((ar) => ({ ...ar, result: lineResult }));
    };

    const handleFov = () => {
      if (!clickSelection.length) {
        return;
      }

      const fovResult = processFov({
        algorithmName: algorithmResult.name,
        grid,
        callback: (n) => !n,
        position: clickSelection[0],
      });

      setAlgorithmResult((ar) => ({ ...ar, result: fovResult }));
    };

    const handleFill = () => {
      if (!clickSelection.length) {
        return;
      }

      const fillResult = processFill({
        algorithmName: algorithmResult.name,
        grid,
        callback: (n) => n === 0,
        position: clickSelection[0],
      });

      setAlgorithmResult((ar) => ({ ...ar, result: fillResult }));
    };

    const handle = {
      PATH: handlePath,
      FOV: handleFov,
      LINE: handleLine,
      FILL: handleFill,
    };

    handle[algorithmResult.type]();
  }, [algorithmResult.name, algorithmResult.type, clickSelection]);

  const changeAlgorithm = (algorithm) => {
    const algorithmType = getAlgorithmObject(algorithm);
    setAlgorithmResult({ ...algorithmType, result: null });
  };

  const changeGeneration = (generation) => {
    setGeneration(getGenerationObject(generation));
  };

  const generate = () => {
    // FIXME: remove when GK will be the provider
    if (generation.type === 'DEFAULT') {
      setGrid(generateDefault(30, 30));
      return;
    }

    try {
      const output = generateGrid(generation);
      setGrid(output.grid);
      setGeneration({ ...generation, output });
    } catch (e) {
      console.log(e);
    }
  };

  const manageClickSelection = (x, y) => {
    const isTwoClicksAlgorithm =
      algorithmResult.type === 'PATH' || algorithmResult.type === 'LINE';

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

  return (
    <Box mx="auto" borderRadius="lg" borderWidth="1px" mt={5} p={5}>
      <Flex flexDir="column" mx="auto">
        <Flex>
          <Box mr={5}>
            <MapGeneration
              changeGeneration={changeGeneration}
              generateGrid={generate}
            />
          </Box>
          <Box mr={5}>
            <Algorithms changeAlgorithm={changeAlgorithm} />
            <Result result={algorithmResult.result} />
          </Box>
        </Flex>
        <Tabs variant="soft-rounded" colorScheme="red">
          <TabList>
            <Tab>2D</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <View2D
                grid={grid}
                manageClickSelection={manageClickSelection}
                algorithmResult={algorithmResult}
                generation={generation}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default ContentContainer;
