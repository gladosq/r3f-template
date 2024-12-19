'use client';

import { Environment, useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";


function Model({ url }: { url: string }) {
  /*-- Обращение к свойствам модели через ref --*/
  const modelRef = useRef<THREE.Mesh>(null!);

  const { scene, materials } = useGLTF(url);
  const pipee = useGLTF(url);
  const [scale, setScale] = useState(0.05);
  const [isTransparent, setIsTransparent] = useState(false);

  const handleClick = () => {
    setIsTransparent((prevState) => !prevState);

    if (modelRef.current) {
      const material = materials['Kain'];

      if (material) {
        material.transparent = true;
        material.opacity = isTransparent ? 0.5 : 1.0;
      } else return;
    }
  };

  const handleHover = () => {
    setScale(scale * 1.1);
  };

  const handleUnhover = () => {
    setScale(scale / 1.1);
  };

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material && 'opacity' in mesh.material) {
          mesh.material.opacity = isTransparent ? 0.1 : 1.0;
          /*-- Покрасит все материалы сцены --*/
          // mesh.material.color.set('yellow');
        }
      }
    });
  }, [isTransparent, scene]);

  return (
    <mesh
      ref={modelRef}
      onClick={handleClick}
      onPointerOver={handleHover}
      onPointerOut={handleUnhover}
      position={[0, 0, 0]}
      scale={scale}
    >
      <primitive object={scene} />
    </mesh>
  );
}

export default function App8() {
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
          <OrbitControls />
          <Environment files="./environment/sunset.hdr" background backgroundBlurriness={0.5} />

          <group position={[0, 0, 0]} scale={20}>
            <Model url={'/models/nerd.glb'} />
          </group>

          <group position={[-3, -1, -2]} scale={20}>
            <Model url={'/models/bunny.glb'} />
          </group>

          <axesHelper args={[5]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
