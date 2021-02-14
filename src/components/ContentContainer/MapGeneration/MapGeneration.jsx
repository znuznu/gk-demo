import React from 'react';

import { Box, Button, Select, Text } from '@chakra-ui/react';

const optgroups = [
  {
    label: 'Random fill',
    options: [{ value: 'default', name: 'Fill with random wall positions' }],
  },
  {
    label: 'Dungeon',
    options: [{ value: 'rogue', name: 'Rogue "original" algorithm' }],
  },
];

const Gen = (props) => {
  const { changeGeneration, generateGrid } = props;

  const handleChange = (e) => {
    changeGeneration(e.target.value);
  };

  const emitGeneration = () => {
    generateGrid();
  };

  return (
    <Box maxW="sm" display="flex" flexDir="column" justifyContent="center">
      <Text fontWeight="bold">Map generation</Text>
      <Select size="md" onChange={handleChange} defaultValue="default" mt={1}>
        {optgroups.map((groups) => (
          <optgroup key={groups.label} label={groups.label}>
            {groups.options.map((options) => (
              <option key={options.value} value={options.value}>
                {options.name}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
      <Button mt={3} mx="auto" onClick={emitGeneration}>
        Generate
      </Button>
    </Box>
  );
};

export default Gen;
