'use client';

import { useGLTF, OrbitControls, Environment, AsciiRenderer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { useControls } from "leva";
import { GlitchMode } from "postprocessing";
import { Suspense, useRef, useState } from "react";
import { Group, Vector2 } from 'three';

function Model({ effect, url, rotateMode, rotate, pulsing = false }:
  {
    effect: string,
    url: string,
    rotateMode: string | null,
    rotate: { rotationX: number, rotationY: number, rotationZ: number },
    pulsing: boolean
  }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<Group>(null!);

  const [scale, setScale] = useState(1);
  const [direction, setDirection] = useState(1);

  useFrame(() => {
    if (groupRef.current) {
      const rotationSpeed = 0.01; // Скорость вращения

      if (rotateMode === 'x') {
        groupRef.current.rotation.x += rotationSpeed;
      } else if (rotateMode === 'y') {
        groupRef.current.rotation.y += rotationSpeed;
      } else if (rotateMode === 'z') {
        groupRef.current.rotation.z += rotationSpeed;
      }

      if (effect === 'pulsing animation' && pulsing) {
        const newScale = scale + direction * 0.004;
        if (newScale >= 1.1 || newScale <= 1) {
          setDirection(-direction);
        }
        setScale(newScale);

        groupRef.current.scale.set(newScale, newScale, newScale);
      }
    }
  });


  return (
    <group
      ref={groupRef} position={[0, 0, 0]}
      rotation={rotate ? [rotate.rotationX, rotate.rotationY, rotate.rotationZ] : undefined}
    >
      <primitive object={scene} scale={1} />
    </group>
  );
}

export default function App10() {
  const {
    effect,
    vectorDelayX,
    vectorDelayY,
    vectorDurationX,
    vectorDurationY,
    vectorStrengthX,
    vectorStrengthY,
    rotationX,
    rotationY,
    rotationZ,
    rotationAxis,
    redColor,
    pulsing
  } = useControls({
    effect: {
      value: 'glitch',
      options: ['glitch', 'rotate control', 'rotation animation', 'pulsing animation', 'ASCII renderer'],
    },
    vectorDelayX: { value: 4.5, min: 0, max: 20, step: 1, render: (get) => get('effect') === 'glitch' },
    vectorDelayY: { value: 2.5, min: 0, max: 20, step: 1, render: (get) => get('effect') === 'glitch' },
    vectorDurationX: { value: 0.5, min: 0, max: 1, step: 0.01, render: (get) => get('effect') === 'glitch' },
    vectorDurationY: { value: 0.5, min: 0, max: 1, step: 0.01, render: (get) => get('effect') === 'glitch' },
    vectorStrengthX: { value: 0.5, min: 0, max: 1, step: 0.01, render: (get) => get('effect') === 'glitch' },
    vectorStrengthY: { value: 0.5, min: 0, max: 1, step: 0.01, render: (get) => get('effect') === 'glitch' },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01, render: (get) => get('effect') === 'rotate control' },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01, render: (get) => get('effect') === 'rotate control' },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01, render: (get) => get('effect') === 'rotate control' },
    rotationAxis: { value: 'y', options: ['x', 'y', 'z'], render: (get) => get('effect') === 'rotation animation' },
    pulsing: { value: true, render: (get) => get('effect') === 'pulsing animation' },
    redColor: { value: false, label: 'Красный цвет', render: (get) => get('effect') === 'ASCII renderer' },
  });

  const vectorDelay = new Vector2(vectorDelayX, vectorDelayY);
  const vectorDuration = new Vector2(vectorDurationX, vectorDurationY);
  const vectorStrength = new Vector2(vectorStrengthX, vectorStrengthY);

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

            {effect === 'glitch' ? (
              <Glitch
                delay={vectorDelay}
                duration={vectorDuration}
                strength={vectorStrength}
                mode={GlitchMode.SPORADIC}
                active
                ratio={1.05}
              />
            ) : <></>}

            <Model
              effect={effect}
              url={'/models/phuong_cuu_thien.glb'}
              rotateMode={(effect === 'rotation animation' ? rotationAxis : null)}
              rotate={{
                rotationX,
                rotationY,
                rotationZ
              }}
              pulsing={pulsing}
            />

            {(effect === 'ASCII renderer') ? (
              <AsciiRenderer renderIndex={100} fgColor={redColor ? 'red' : 'white'} bgColor={'transparent'} />
            ) : <></>}
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div >
  );
}
