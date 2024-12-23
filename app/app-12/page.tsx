'use client';

import { useGLTF, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { CSSProperties, Suspense, useRef } from "react";
import * as THREE from "three";

type ScrollModelRefType = {
  scrollTop: number;
}

function Model({ url, scrollModelRef }: { url: string, scrollModelRef: React.RefObject<ScrollModelRefType> }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null!);

  const { direction, rotationDirection, scaleDirection } = useControls({
    direction: {
      value: 'right',
      options: ['right', 'left'],
      label: 'Направление'
    },
    rotationDirection: {
      value: 'clockwise',
      options: ['clockwise', 'counterclockwise'],
      label: 'Вращение'

    },
    scaleDirection: {
      value: 'increase',
      options: ['increase', 'decrease'],
      label: 'Масштабирование'
    },
  });

  useFrame(() => {
    if (groupRef.current && scrollModelRef.current) {
      /*-- В конце коэффициенты для изменения положения/размера --*/
      const positionMultiplier = direction === 'right' ? 0.006 : -0.006;
      const rotationMultiplier = rotationDirection === 'clockwise' ? 0.002 : -0.002;
      const scaleMultiplier = scaleDirection === 'increase' ? 0.001 : -0.001;

      groupRef.current.position.x = scrollModelRef.current.scrollTop * positionMultiplier;
      groupRef.current.rotation.y = scrollModelRef.current.scrollTop * rotationMultiplier;
      const scale = 1 + scrollModelRef.current.scrollTop * scaleMultiplier;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <primitive object={scene} scale={1} />
    </group>
  );
}

export default function App12() {
  const scrollModelRef = useRef<ScrollModelRefType>({ scrollTop: 0 });
  /*-- Переменная, по которой параллаксится, это scrollTop главного окна,
  но можно паралаксить по чему угодно --*/
  const windowScrollRef = useRef(null);

  const handleScroll = () => {
    if (windowScrollRef.current) {
      const { scrollTop } = windowScrollRef.current;
      scrollModelRef.current = { scrollTop };
    }
  };

  const mockStyles = {
    height: '90vh',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)'
  } as CSSProperties;

  return (
    <div
      ref={windowScrollRef}
      style={{ maxHeight: '800px', overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={mockStyles} >
        <h1 style={{ width: '100%' }}>block 1</h1>
      </div>

      <div className="canvasContainer" style={{ minHeight: '600px' }}>
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
                scrollModelRef={scrollModelRef}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div >

      <div style={mockStyles}>
        <h1 style={{ width: '100%' }}>block 2</h1>
      </div>
    </div >
  );
}
