import React, { useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import Algorithms from './Algorithms/Algorithms';
import View from './View/View';
import AlgorithmContext from 'contexts/AlgorithmContext';

const Content = () => {
  let [currentAlgorithm, setCurrentAlgorithm] = useState({
    name: 'astar4',
    type: 'PATH',
  });

  const changeAlgorithm = (algorithm) => {
    const paths = ['astar4', 'astar8', 'dijsktra4', 'dijsktra8'];
    const fovs = ['rsc'];
    const lines = ['linelerp'];
    // fill
    // const lines = ['linelerp'];

    if (paths.includes(algorithm)) {
      setCurrentAlgorithm({ name: algorithm, type: 'PATH' });
    } else if (fovs.includes(algorithm)) {
      setCurrentAlgorithm({ name: algorithm, type: 'FOV' });
    } else if (lines.includes(algorithm)) {
      setCurrentAlgorithm({ name: algorithm, type: 'LINE' });
    }
  };

  return (
    <Box mx="auto" borderRadius="lg" borderWidth="1px" mt={10} p={5}>
      <Flex mx="auto">
        <Box mr={5}>
          <Algorithms changeAlgorithm={changeAlgorithm} />
        </Box>
        <AlgorithmContext.Provider value={currentAlgorithm}>
          <View />
        </AlgorithmContext.Provider>
      </Flex>
    </Box>
  );
};

export default Content;
