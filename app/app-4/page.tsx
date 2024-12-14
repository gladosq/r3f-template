'use client';

import HibiscusModel from "@/models/Hibiscus/Hibiscus";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function App4() {
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
          <Environment files="./environment/sunset.hdr" background backgroundBlurriness={0.5}/>

          <HibiscusModel/>
        </Canvas>
      </Suspense>
    </div>
  );
}
