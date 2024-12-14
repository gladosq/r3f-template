import { useGLTF } from '@react-three/drei';

export default function GlobeModel() {
  /*-- Рендерим просто сцену, без всяких материалов --*/
  const { scene } = useGLTF('/models/globe.glb');

  return (
    <group
      position={[-4, -1, -12]}
      scale={0.1}
      rotation={[0, Math.PI / 2, 0]}
    >
      <object3D position={[0, 0, 0]} />
      <primitive object={scene} />
    </group>
  );
}
