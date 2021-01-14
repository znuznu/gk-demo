import React from 'react';

import { Box, Heading, Select } from '@chakra-ui/react';

const Algorithms = (props) => {
  const { changeAlgorithm } = props;

  const handleChange = (e) => {
    changeAlgorithm(e.target.value);
  };

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
      options: [{ value: 'floodfill', name: 'Flood filling' }],
    },
    {
      label: 'Line',
      options: [{ value: 'linelerp', name: 'Linear interpolation' }],
    },
  ];

  return (
    <Box maxW="sm">
      <Heading as="h2" size="md" display="inline" mb={10}>
        Algorithms
      </Heading>
      <Select
        placeholder="Select option"
        size="md"
        onChange={handleChange}
        defaultValue="astar4"
      >
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
