import React from 'react';

import { Box } from '@chakra-ui/react';

import Title from './Title/Title';

const Header = () => {
  return (
    <Box mt={10} mx="auto">
      <Title title="Groolkit library demo" />
    </Box>
  );
};

export default Header;
