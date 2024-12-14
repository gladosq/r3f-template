import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import * as THREE from "three";
import { Group } from 'three';

export default function HibiscusModel() {
  const { animations, scene } = useGLTF('/models/hibiscus.glb');
  const mixer = useRef(new THREE.AnimationMixer(scene));
  const group = useRef<Group>(null!);

  /*-- Воспроизведение первой анимации из массива animations --*/
  const action = mixer.current.clipAction(animations[0]);
  action.play();

  const { time } = useControls({
    time: {
      value: 0,
      min: 0,
      max: animations[0].duration,
      step: 0.01,
    },
  });

  /*-- useFrame используется для обновления анимации на каждом кадре --*/
  useEffect(() => {
    mixer.current.setTime(time);
  }, [time]);

  useFrame((_, delta) => {
    mixer.current.update(delta);
  });

  return (
    <group
      position={[0, 0.3, 4]}
      scale={1}
      rotation={[0, 4.4, 0]}
      ref={group}
    >
      <object3D position={[0, 0, 0]} />
      <primitive object={scene} />
    </group>
  );
}
