'use client';

import { useIntersection } from "@/utils/utils";
import { useGLTF, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { CSSProperties, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Model({ url, isVisible }: { url: string, isVisible: boolean }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null!);

  const [currentScale, setCurrentScale] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOpacity, setCurrentOpacity] = useState(0);

  const { animationDuration, targetScale } = useControls({
    animationDuration: {
      value: 1.8,
      min: 0.1,
      max: 5,
      step: 0.1,
      label: 'Время'
    },
    targetScale: {
      value: 2,
      min: 1,
      max: 5,
      step: 0.1,
      label: 'Масштаб'
    },
  });

  useEffect(() => {
    if (isVisible) {
      if (!isAnimating) {
        setIsAnimating(true);
      }
    } else {
      setIsAnimating(false);
      setCurrentScale(1);
      setCurrentOpacity(0);
    }
  }, [isVisible, isAnimating]);

  useFrame((_, delta) => {
    if (groupRef.current && isAnimating) {
      const speed = delta / animationDuration;
      const newScale = Math.min(currentScale + speed, targetScale);
      const newOpacity = Math.min(currentOpacity + speed, 1);
      setCurrentScale(newScale);
      setCurrentOpacity(newOpacity);
      groupRef.current.scale.set(newScale, newScale, newScale);

      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = newOpacity;
        }
      });

      if (newScale >= targetScale && newOpacity >= 1) {
        setIsAnimating(false);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <primitive object={scene} scale={0.7} />
    </group>
  );
}

export default function App13() {
  const canvasRef = useRef(null!);

  const mockStyles = {
    height: '90vh',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)'
  } as CSSProperties;

  const isVisible = useIntersection(canvasRef, { threshold: 0.1 });

  return (
    <div
      style={{ maxHeight: '800px', overflow: 'auto' }}
    >
      <div style={{ ...mockStyles, height: '60vh' }} >
        <h1 style={{ width: '100%' }}>block 1</h1>
      </div>
      <div style={{ ...mockStyles, height: '36vh' }} >
        <h1 style={{ width: '100%' }}>block 2</h1>
      </div>

      <div ref={canvasRef} className="canvasContainer" style={{ minHeight: '600px' }}>
        <Canvas
          shadows
          dpr={[1, 2]}
          style={{ height: '700px' }}
          camera={{ position: [1, 7, 16], near: 0.025, fov: 30 }}
          gl={{
            alpha: true,
            powerPreference: 'high-performance',
            antialias: true,
          }}
        >
          <Suspense>
            <EffectComposer>
              <Environment files="./environment/sunset.hdr" />

              <Model
                url={'/models/apfel.glb'}
                isVisible={isVisible}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div >

      <div style={mockStyles}>
        <h1 style={{ width: '100%' }}>block 3</h1>
      </div>
    </div >
  );
}
