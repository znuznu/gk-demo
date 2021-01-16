import React from 'react';
import { ChakraProvider, Container, extendTheme, Flex } from '@chakra-ui/react';

import { Fonts } from 'fonts/fonts';

import Content from 'components/Content/Content';
import Header from 'components/Header/Header';
import Explanation from 'components/Explanation/Explanation';
import Footer from 'components/Footer/Footer';

const theme = extendTheme({
  fonts: {
    heading: 'Nunito',
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Header />
      <Container justifyContent="center" h="100%" maxW="6xl">
        <Flex flexDir="column">
          <Explanation />
          <Content />
          <Footer />
        </Flex>
      </Container>
    </ChakraProvider>
  );
}

export default App;
