import React from 'react';
import { ChakraProvider, Container, extendTheme, Flex } from '@chakra-ui/react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';

import { Fonts } from 'Fonts/Fonts';

const theme = extendTheme({
  fonts: {
    heading: 'Nunito',
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Container justifyContent="center" h="100%" maxW="6xl">
        <Flex flexDir="column">
          <Header />
          <Content />
        </Flex>
      </Container>
    </ChakraProvider>
  );
}

export default App;
