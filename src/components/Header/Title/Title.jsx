import React from 'react';

import PropTypes from 'prop-types';
import { Badge, Box, Heading } from '@chakra-ui/react';

const Title = (props) => {
  const { title, version } = props;

  return (
    <>
      <Box>
        <Heading as="h1" display="inline" mb={10}>
          {title}
        </Heading>
        <Badge ml={1} colorScheme="red">
          {version}
        </Badge>
      </Box>
    </>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
};

export default Title;
