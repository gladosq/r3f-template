'use client';

import CanvasPreloader from "@/components/CanvasPreloader/CanvasPreloader";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense, useEffect, useState } from "react";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

const Models = [
  { title: 'Link 1', url: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bunny/model.gltf' },
  { title: 'Link 2', url: 'https://q23sw.csb.app/mac-draco.glb' },
  { title: 'Link broken', url: 'https://q23sw.csb.app/broken-url.glb' },
];

/*-- Декодер для простых моделей вроде как не нужен. Можно будет удалить --*/
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');

function ErrorPlaceholder() {
  return (
    <Html center>
      <div style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
        Failed to load model
      </div>
    </Html>
  );
}

/*-- Пример загрузки модели с отловом ошибки --*/
function Model({ url }: { url: string }) {
  const [model, setModel] = useState<THREE.Object3D | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        const gltf = await new Promise<GLTF>((resolve, reject) => {
          loader.load(url, resolve, undefined, reject);
        });
        setModel(gltf.scene);
        setError(null);
      } catch (err: any) {
        setError(err);
      }
    };

    loadModel();
  }, [url]);

  if (error) {
    console.error('Failed to load model:', error);
    return <ErrorPlaceholder />;
  }

  return model ? <primitive object={model} /> : <CanvasPreloader />;
}

export default function App6() {
  const { title, scale } = useControls({
    title: {
      options: Models.map(({ title }) => title),
    },
    scale: {
      value: 1.2,
      min: 0.01,
      max: 2,
      step: 0.01,
    },
  });

  return (
    <div className="canvasContainer">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ near: 0.025 }}
        gl={{
          alpha: true,
          powerPreference: 'high-performance',
          antialias: true,
        }}
      >
        <Suspense fallback={<CanvasPreloader />}>
          <OrbitControls />
          <Environment files="/environment/sunset.hdr" />
          <group
            scale={scale}
            position={[0, -1.6, -4]}
          >
            <Model
              url={Models[Models.findIndex((m) => m.title === title)]?.url}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
