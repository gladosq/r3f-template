'use client';

import CanvasPreloader from "@/components/CanvasPreloader/CanvasPreloader";
import FollowCursorEffect from "@/effects/FollowCursorEffect";
import GlobeModel from "@/models/GlobeModel/GlobeModel";
import OscarModel from "@/models/OscarModel/OscarModel";
import { Environment, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import { Suspense, useCallback, useState } from "react";

export default function App2() {
  const [isFollow, setIsFollow] = useState(false);
  const [color, setColor] = useState('#7986CB');

  const handleFollowToggle = useCallback(() => {
    setIsFollow((prevState) => !prevState);
  }, []);

  return (
    <div className="canvasContainer">
      {/*-- Fallback, показывает прелоадер пока не загрузилась моделька --*/}
      <Suspense fallback={<CanvasPreloader />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ fov: 40 }}
          gl={{
            alpha: true,
            powerPreference: 'high-performance',
            antialias: true,
          }}
        >
          <OscarModel />
          <GlobeModel />
          <Environment files="./environment/studio.hdr" />

          {/*-- Задание цвета фону --*/}
          <color attach='background' args={[color]} />
          {/*-- Опционально рендерим компонент с эффектом --*/}
          {isFollow && <FollowCursorEffect />}
        </Canvas>
      </Suspense>
      <div className="navigation">
        <button
          onClick={handleFollowToggle}
          className={clsx('button', isFollow && 'button_active')}
        >
          {!isFollow ? 'Следовать' : 'Не следовать'}
        </button>
        <button
          className='button'
          onClick={() => {
            setColor((prevState) => prevState === '#7986CB' ? 'black' : '#7986CB');
          }}
        >
          Поменять цвет
        </button>
      </div>
    </div>
  );
}
