'use client';

import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />
}

export default function App9() {
  const { lightType, intensity, color, position } = useControls({
    lightType: {
      value: 'PointLight',
      options: ['PointLight', 'SpotLight', 'DirectionalLight', 'HemisphereLight'],
    },
    intensity: {
      value: 100,
      min: 0,
      max: 2000,
    },
    color: {
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
        // Точечный свет излучается из одной точки во всех направлениях.
        return <pointLight intensity={intensity} color={color} position={[position.x, position.y, position.z]} />;
      case 'SpotLight':
        // Прожектор излучает свет в форме конуса в одном направлении.
        return (
          <spotLight
            position={[position.x, position.y, position.z]}
            angle={40}
            penumbra={1}
            intensity={intensity}
            castShadow
            shadow-mapSize={2024}
            distance={420}
            color={color}
          />
        );
      case 'DirectionalLight':
        // Направленный свет излучается в одном направлении и освещает все объекты в сцене одинаково.
        return <directionalLight intensity={intensity} color={color} position={[position.x, position.y, position.z]} />;
      case 'HemisphereLight':
        // Полусферический свет излучается сверху и снизу, создавая эффект освещения неба и земли.
        return <hemisphereLight intensity={intensity} color={color} position={[position.x, position.y, position.z]} />;
      default:
        return null;
    }
  };

  return (
    <div className="canvasContainer">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{position: [-2, 4, 4], near: 0.025, fov: 50 }}
        gl={{
          alpha: true,
          powerPreference: 'high-performance',
          antialias: true,
        }}
      >
        <Suspense>
          <OrbitControls />

          <group position={[0, 0, 0]} scale={1}>
            <Model url={'/models/meme.glb'} />
          </group>
          {createLight()}

          <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color={'#222222'} />
          </mesh>

          <axesHelper args={[5]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
