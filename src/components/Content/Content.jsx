import React, { useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { getAlgorithmObject } from 'services/algorithm.service';

import View from './View/View';
import Algorithms from './Algorithms/Algorithms';
import AlgorithmContext from 'contexts/AlgorithmContext';

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
