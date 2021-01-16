import React from 'react';

import { Flex, Icon, Text, Link } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <Flex my={5} justify="center" flexDir="column">
        <Flex justify="center" mb={3}>
          <Link
            href="https://github.com/znuznu/gk-demo"
            aria-label="Link to the gk-demo Github repository"
            my="auto"
            mr={2}
            isExternal
          >
            <Icon
              as={FaGithub}
              w={8}
              h={8}
              color="lightgrey"
              _hover={{ color: '#222222' }}
            />
          </Link>
        </Flex>
        <Flex justify="center">
          <Text fontStyle="italic" size="12px" mb={5}>
            Groolkit is Copyright (c) - znu under MIT license
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Footer;
