'use client';

import LemonModel from "@/models/LemonModel/LemonModel";
import { Environment, Float, OrbitControls, Stats, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense } from "react";

export default function App4() {
  /*-- [0, Math.PI / 2, 0] -> поворот вокруг оси Y на 90 градусов --*/
  const { position, rotation, rotationIntensity, floatIntensity, speed } = useControls({
    position: {
      value: [0, -1, -0.5],
      step: 0.1,
    },
    rotation: {
      value: [Math.PI / 0.05, 0, 0],
      step: 0.1,
    },
    rotationIntensity: {
      value: 1.6,
      min: 0,
      max: 2,
      step: 0.01,
    },
    floatIntensity: {
      value: 2,
      min: 0,
      max: 3,
      step: 0.1,
    },
    speed: {
      value: 3.5,
      min: 0,
      max: 10,
      step: 0.1,
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
          <OrbitControls />
          <Environment files="./environment/apartment.hdr" />

          <Float
            position={position}
            rotation={rotation}
            rotationIntensity={rotationIntensity}
            floatIntensity={floatIntensity}
            speed={speed}
          >
            <LemonModel />

          </Float>
        </Canvas>
      </Suspense>
    </div>
  );
}
