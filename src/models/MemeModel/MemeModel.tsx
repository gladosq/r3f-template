import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from "three";

export default function MemeModel({color}: {color: string}) {
  const { scene } = useGLTF('/models/meme.glb');

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
    <group
      position={[0, -0.7, 3]}
      scale={1}
    >
      <primitive object={scene} />
    </group>
  );
}
