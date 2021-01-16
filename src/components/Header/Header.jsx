import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import Title from './Title/Title';

const Header = () => {
  return (
    <Box mx="auto" borderTop="8px solid" borderColor="red.700">
      <Flex mt={3} justifyContent="center">
        <Title title="Groolkit library demo" version="0.8.0" />
      </Flex>
    </Box>
  );
};

export default Header;
