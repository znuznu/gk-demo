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

import View2D from './View2D/View2D';
import Algorithms from './Algorithms/Algorithms';
// import View3D from './View3D/View3D';
import { generate } from 'services/grid.service';

const ContentContainer = () => {
  const [grid, setGrid] = useState(generate(30, 30));
  const [clickSelection, setClickSelection] = useState([]);
  const [algorithmResult, setAlgorithmResult] = useState({
    type: 'PATH',
    name: 'astar4',
    result: undefined,
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
    setAlgorithmResult({ ...algorithmType, result: undefined });
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
      <Flex mx="auto">
        <Box mr={5}>
          <Algorithms changeAlgorithm={changeAlgorithm} />
        </Box>
        <Tabs variant="soft-rounded" colorScheme="red">
          <TabList>
            <Tab>2D</Tab>
            {/* <Tab>3D</Tab> */}
          </TabList>

          <TabPanels>
            <TabPanel>
              <View2D
                grid={grid}
                manageClickSelection={manageClickSelection}
                algorithmResult={algorithmResult}
              />
            </TabPanel>
            {/* <TabPanel width="512px" height="512px">
              <View3D />
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default ContentContainer;
