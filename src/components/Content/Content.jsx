import React, { useState } from 'react';

import {
  Box,
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';

import { getAlgorithmObject } from 'services/algorithm.service';

import View from './View/View';
import Algorithms from './Algorithms/Algorithms';
import AlgorithmContext from 'contexts/AlgorithmContext';
import View3D from './View3D/View3D';

const Content = () => {
  // todo extract to a constant
  const [currentAlgorithm, setCurrentAlgorithm] = useState({
    name: 'astar4',
    type: 'PATH',
  });

  const changeAlgorithm = (algorithm) => {
    setCurrentAlgorithm(getAlgorithmObject(algorithm));
  };

  return (
    <Box mx="auto" borderRadius="lg" borderWidth="1px" mt={5} p={5}>
      <Flex mx="auto">
        <Box mr={5}>
          <Algorithms changeAlgorithm={changeAlgorithm} />
        </Box>
        <Tabs variant="soft-rounded" colorScheme="red" isLazy>
          <TabList>
            <Tab>2D</Tab>
            <Tab>3D</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <AlgorithmContext.Provider value={currentAlgorithm}>
                <View />
              </AlgorithmContext.Provider>
            </TabPanel>
            <TabPanel width="512px" height="512px">
              <View3D />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default Content;
