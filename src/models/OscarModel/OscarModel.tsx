import {useGLTF} from '@react-three/drei';

export default function OscarModel() {
  /*-- Лоадер для модели (статика), вытаскиваем ноды и материал --*/
  const {nodes, materials} = useGLTF('/models/oscar-compressed.glb');
  const scene = useGLTF('/models/oscar-compressed.glb');
  
  /*-- Если есть готовая сцена, вытаскиваем сцену.
  Если сцены нет, вытаскиваем по отдельности нужный нам mesh, 
  material и геометрию, если нужна --*/

  return (
    /*-- Рендер модели в group, чтобы можно было удобно управлять несколькими mesh. 
    Здесь подставка рендерится как отдельный mesh --*/
    <group
      scale={0.1}
      position={[0, -1.5, -6]}
      rotation={[Math.PI / 2, Math.PI, Math.PI]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes as any).Object_2.geometry}
        material={materials['blinn1SG']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes as any).Object_3.geometry}
        material={materials['blinn2SG']}
      />
    </group>
  );
}
