'use client';

import OscarModel from "@/models/OscarModel/OscarModel";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

export default function App1() {
  return (
    <div className="canvasContainer">
      <Suspense fallback={null}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ fov: 40 }}
          gl={{
            /*-- Делаем прозрачный фон --*/
            alpha: true,
            powerPreference: 'high-performance',
            /*-- Сглаживает края объектов и улучшает визуальное качество --*/
            antialias: true,
          }}
        >
          {/*-- Orbit Controls для просмотра модели, дебага --*/}
          <OrbitControls
            enableZoom={true}
            enableRotate={true}
            /*-- Автоматическое вращение камеры вокруг объекта. Например, для анимации --*/
            autoRotate={false}
            /*-- Ограничить угол вращения камеры --*/
            // minPolarAngle={Math.PI / 2}
            // maxPolarAngle={Math.PI / 2}
          />
          <OscarModel />
          {/*-- Встроенные пресеты environment из @react-three/drei, 
          падают с ошибкой cdn (можно выкачать через VPN) --*/}
          <Environment files="./environment/studio.hdr" />
        </Canvas>
      </Suspense>
    </div>
  );
}
