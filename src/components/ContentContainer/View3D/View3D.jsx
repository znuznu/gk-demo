import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';

import React, { useEffect, useRef, useState } from 'react';
import CellMesh from './CellMesh';
import { generate } from 'services/grid.service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({ OrbitControls });

const View3D = () => {
  const [grid, setGrid] = useState(generate(30, 30));

  useEffect(() => {
    const t = () => {
      console.log('unmount');
    };
    console.log('mount');

    return t;
  }, []);

  useEffect(() => {
    console.log('update');
  });

  const CameraControls = () => {
    const {
      camera,
      gl: { domElement },
    } = useThree();

    const controls = useRef();

    camera.position.set(-20, 20, -20);
    camera.zoom = 2;

    // @ts-ignore
    useFrame((state) => controls.current.update());

    return (
      // @ts-ignore
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        minPolarAngle={0}
        target={[grid.length / 2, 0, grid[0].length / 2]}
      />
    );
  };

  return (
    <Canvas>
      <CameraControls />
      <ambientLight />
      <pointLight position={[grid.length / 2, 15, grid[0].length / 2]} />
      {grid.map((row, rIndex) =>
        row.map((col, cIndex) => (
          <CellMesh
            position={[rIndex, col ? 0.63 : 0.25, cIndex]}
            type={col ? 'BLOCK' : 'PASSAGE'}
            key={`${rIndex}-${cIndex}`}
            coordinates={{ x: rIndex, y: cIndex }}
          />
        ))
      )}
    </Canvas>
  );
};

export default View3D;
