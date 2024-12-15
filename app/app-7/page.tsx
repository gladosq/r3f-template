'use client';

import { getRandomNumber } from "@/utils/utils";
import { Environment, useGLTF, DragControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense, useMemo, useState } from "react";
import * as THREE from "three";

const Models = [
  { title: 'globe', url: '/models/globe.glb' },
  { title: 'bunny', url: '/models/bunny.glb' },
  { title: 'lemon', url: '/models/lemon.glb' },
  { title: 'oscar-compressed', url: '/models/oscar-compressed.glb' },
  { title: 'nerd', url: '/models/nerd.glb' },
];

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  const randomXVariable = useMemo(() => getRandomNumber(-2, 6), []);
  const randomYVariable = useMemo(() => getRandomNumber(0, 0.2), []);
  const randomZVariable = useMemo(() => getRandomNumber(-2, 2), []);

  return <primitive object={scene} scale={0.05} position={[randomXVariable, randomYVariable, randomZVariable]} />
}

export default function App7() {
  const [models, setModels] = useState<{ url: string; }[]>([]);
  console.log('models:', models);

  const addModel = () => {
    setModels([...models, { url: Models[getRandomNumber(0, Models.length - 1)].url }]);
  };

  const removeModel = () => {
    setModels(models.filter((_, i) => i !== models.length - 1));
  };

  const { color } = useControls({
    color: {
      value: '#901d3f',
    },
  });

  const { scene } = useGLTF('/models/meme.glb');

  /*-- Содержит либо массив материалов, либо один материал. Обычно один --*/
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material && 'color' in mesh.material) {
          const material = mesh.material as THREE.MeshBasicMaterial | THREE.MeshStandardMaterial;
          if (material.color) {
            material.color.set(color);
          }
        }
      }
    });
  }, [color]);

  return (
    <div className="canvasContainer">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ near: 0.025, fov: 50 }}
        gl={{
          alpha: true,
          powerPreference: 'high-performance',
          antialias: true,
        }}
      >
        <Suspense>
          <Environment files="./environment/sunset.hdr" background backgroundBlurriness={0.5} />

          {/*-- Оборачиваем объект в DragControls (конфликтует с OrbitControls),
          Есть метод onDrag, можно вытащить из матрицы координаты (???) --*/}
          <DragControls>
            <group position={[0, -0.7, 3]}>
              <primitive object={scene} scale={1} />
            </group>
          </DragControls>

          <group position={[-4, -0.2, -3]}>
            {models.map((model, index) => (
              <DragControls>
                <Model key={index} url={model.url} />

              </DragControls>
            ))}
          </group>

          <axesHelper args={[5]} />
        </Suspense>
      </Canvas>
      <div className='navigation'>
        <button className='button' onClick={addModel}>Add Model</button>
        <button className='button' onClick={removeModel}>Remove Model</button>
      </div>
    </div>
  );
}
