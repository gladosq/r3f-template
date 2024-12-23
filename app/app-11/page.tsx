'use client';

import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial> | null>(null!);

  const { startColor, endColor, duration } = useControls({
    startColor: {
      value: '#00ff00',
    },
    endColor: {
      value: '#ff0000',
    },
    duration: {
      value: 2,
      min: 0.1,
      max: 10,
      step: 0.1,
    }
  });

  /*-- Присваиваем ref к первому mesh в сцене --*/
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          meshRef.current = child;
          /*-- Устанавливаем начальный цвет --*/
          child.material.color.set(startColor);
        }
      });
    }
  }, [scene, startColor]);

  useFrame((state) => {
    if (meshRef.current) {
      const elapsedTime = state.clock.getElapsedTime();
      /*-- Синусоидальная функция для бесконечной анимации --*/
      const progress = (Math.sin(elapsedTime / duration * Math.PI * 2) + 1) / 2;

      const start = new THREE.Color(startColor);
      const end = new THREE.Color(endColor);
      const currentColor = start.clone().lerp(end, progress);

      meshRef.current.material.color.copy(currentColor);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      <primitive object={scene} scale={1} />
    </group>
  );
}

export default function App11() {

  return (
    <div className="canvasContainer">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [-1, 3, 6], near: 0.025, fov: 20 }}
        gl={{
          alpha: false,
          powerPreference: 'high-performance',
          antialias: true,
        }}
      >
        <Suspense>
          <EffectComposer>
            <OrbitControls />
            <Environment files="./environment/sunset.hdr" />

            <Model
              url={'/models/meme.glb'}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div >
  );
}
