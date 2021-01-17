import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';

const colors = {
  passage: 'white',
  block: 'grey',
};

const TileMesh = (props) => {
  const { position, type, coordinates } = props;

  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    //mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      position={position}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => console.log(coordinates)}
    >
      <boxBufferGeometry args={[1, type === 'block' ? 1 : 0.25, 1]} />
      <meshStandardMaterial color={hovered ? 'firebrick' : colors[type]} />
    </mesh>
  );
};

TileMesh.propTypes = {
  position: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  coordinates: PropTypes.object.isRequired,
};

export default TileMesh;
