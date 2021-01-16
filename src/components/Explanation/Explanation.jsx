import React from 'react';

import { Code, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const Explanation = () => {
  return (
    <>
      <Text mt={5} mx="auto" justify="center">
        <Code>Groolkit</Code> is a JavaScript library with a bunch of algorithms
        related to grids.
      </Text>
      <Text mt={5} mx="auto" justify="center">
        The repository is available{' '}
        <Link
          href="https://github.com/znuznu/groolkit"
          aria-label="Link to the Groolkit Github repository"
          isExternal
          color="red.700"
        >
          here
          <ExternalLinkIcon mx="2px" my="auto" />
        </Link>
        .
      </Text>
    </>
  );
};

export default Explanation;
