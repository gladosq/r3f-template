'use client';

import MemeModel from "@/models/MemeModel/MemeModel";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense } from "react";

export default function App9() {
  const { lightType, intensity, colorValue, position } = useControls({
    lightType: {
      value: 'PointLight',
      options: ['PointLight', 'SpotLight', 'DirectionalLight', 'HemisphereLight'],
    },
    intensity: {
      value: 60,
      min: 0,
      max: 2000,
    },
    colorValue: {
      value: '#ffffff',
    },
    position: {
      value: { x: 0, y: 5, z: 5 },
      step: 0.1,
    },
  });

  const createLight = () => {
    switch (lightType) {
      case 'PointLight':
        return <pointLight intensity={intensity} color={colorValue} position={[position.x, position.y, position.z]} />;
      case 'SpotLight':
        return (
          <spotLight
            position={[position.x, position.y, position.z]}
            angle={40}
            penumbra={1}
            intensity={intensity}
            castShadow
            shadow-mapSize={2024}
            distance={420}
            color={colorValue}
          />
        );
      case 'DirectionalLight':
        return <directionalLight intensity={intensity} color={colorValue} position={[position.x, position.y, position.z]} />;
      case 'HemisphereLight':
        return <hemisphereLight intensity={intensity} color={colorValue} position={[position.x, position.y, position.z]} />;
      default:
        return null;
    }
  };

  return (
    <div className="canvasContainer">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [-1, 1, 4], near: 0.025, fov: 50 }}
        gl={{
          alpha: true,
          powerPreference: 'high-performance',
          antialias: true,
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls />

          <group castShadow position={[0, -0.31, -3]} scale={1}>
            <MemeModel color="teal" />
          </group>
          {createLight()}

          <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color={'white'} />
          </mesh>

          <axesHelper args={[5]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
