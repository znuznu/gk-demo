import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Box, Code, Flex, Text } from '@chakra-ui/react';

const Result = (props) => {
  const { result } = props;

  return (
    <>
      {result && (
        <Box mt={3}>
          <Text fontWeight="bold">Result</Text>
          <Box p={1} bgColor="gray.100">
            <Code>{`{`}</Code>
            <Box ml={4}>
              {result.status && (
                <Flex>
                  <Code>
                    <Box as="span" fontWeight="bold">
                      status:
                    </Box>{' '}
                    {result.status}
                  </Code>
                </Flex>
              )}
              {result && result.positions && (
                <>
                  <Code fontWeight="bold">positions:</Code>
                  <Box bgColor="gray.100" overflow="auto" maxH="200px">
                    <Code>[</Code>
                    {result.positions.map((position) => (
                      <Code
                        whiteSpace="pre-wrap"
                        display="block"
                        key={`x-${position.x},y-${position.y}`}
                      >
                        {`  { x: ${position.x}, y: ${position.y} }`}
                      </Code>
                    ))}
                    <Code>]</Code>
                  </Box>
                </>
              )}
            </Box>
            <Code>{`}`}</Code>
          </Box>
        </Box>
      )}
    </>
  );
};

Result.propTypes = {
  result: PropTypes.object,
};

export default Result;
