import React from 'react';

import { Box, Select, Text } from '@chakra-ui/react';

const optgroups = [
  {
    label: 'FOV',
    options: [{ value: 'rsc', name: 'Recursive Shadow Casting' }],
  },
  {
    label: 'Path',
    options: [
      { value: 'astar4', name: 'A* (Orthogonal)' },
      { value: 'astar8', name: 'A* (Diagonal)' },
      { value: 'dijkstra4', name: 'Dijkstra (Orthogonal)' },
      { value: 'dijkstra8', name: 'Dijkstra (Diagonal)' },
    ],
  },
  {
    label: 'Filling',
    options: [{ value: 'flood', name: 'Flood filling' }],
  },
  {
    label: 'Line',
    options: [{ value: 'lerp', name: 'Linear interpolation' }],
  },
];

const Algorithms = (props) => {
  const { changeAlgorithm } = props;

  const handleChange = (e) => {
    changeAlgorithm(e.target.value);
  };

  return (
    <Box maxW="sm">
      <Text fontWeight="bold">Algorithm</Text>
      <Select size="md" onChange={handleChange} defaultValue="astar4" mt={1}>
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
    </Box>
  );
};

export default Algorithms;
