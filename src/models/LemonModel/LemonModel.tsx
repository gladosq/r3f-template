import { useGLTF } from '@react-three/drei';

export default function LemonModel() {
  const { scene } = useGLTF('/models/lemon.glb');

  return (
    <group
      position={[0, 0, 0]}
      scale={0.5}
      /*-- Поворот на 90 градусов вокруг оси Y --*/
      rotation={[0, Math.PI / 2, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}
