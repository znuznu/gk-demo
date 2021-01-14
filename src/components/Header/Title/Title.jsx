import React from 'react';

import PropTypes from 'prop-types';
import { Heading } from '@chakra-ui/react';

const Title = (props) => {
  const { title } = props;

  return (
    <Heading as="h1" display="inline" mb={10}>
      {title}
    </Heading>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
