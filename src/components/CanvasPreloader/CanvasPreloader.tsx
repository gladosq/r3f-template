import { Html } from '@react-three/drei';
import s from './CanvasPreloader.module.scss';

export default function CanvasPreloader() {
  return (
    <Html center>
      <div className={s.wrapper}>
        <h2>loading</h2>
      </div>
    </Html>
  );
}
