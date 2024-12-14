'use client';

import { Environment, OrbitControls, Stats, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense } from "react";

const Models = [
  { title: 'globe', url: '/models/globe.glb' },
  { title: 'oscar', url: '/models/oscar-compressed.glb' },
  { title: 'bunny', url: '/models/bunny.glb' },
];

/*-- Самый простой способ отрендерить сцену --*/
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />
}

export default function App3() {
  const { title, scale } = useControls({
    title: {
      options: Models.map(({ title }) => title),
    },
    scale: {
      value: 0.1,
      min: 0.01,
      max: 1,
      step: 0.01,
    },
  });

  return (
    <div className="canvasContainer">
      <Suspense>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ near: 0.025 }}
          gl={{
            alpha: true,
            powerPreference: 'high-performance',
            antialias: true,
          }}
        >
          <OrbitControls autoRotate />
          <Environment files="./environment/apartment.hdr" background />

          <group
            scale={scale}
            position={[0, -2, 0]}
          >
            <Model
              url={Models[Models.findIndex((m) => m.title === title)].url}
            />
          </group>

          {/*-- Помощники --*/}
          <Stats />
          <axesHelper args={[5]} />
        </Canvas>
      </Suspense>
    </div>
  );
}
