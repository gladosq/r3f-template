'use client';

import clsx from "clsx";
import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import s from './Navigation.module.scss';

export default function Navigation() {
  const pathname = usePathname();
  if (pathname === '/') redirect('app-1');

  return (
    <nav className={s.nav}>
      <Link className={clsx(s.link, pathname === '/app-1' && s.link_active)} href={'/app-1'}>/app-1</Link>
      <Link className={clsx(s.link, pathname === '/app-2' && s.link_active)} href={'/app-2'}>/app-2</Link>
      <Link className={clsx(s.link, pathname === '/app-3' && s.link_active)} href={'/app-3'}>/app-3</Link>
      <Link className={clsx(s.link, pathname === '/app-4' && s.link_active)} href={'/app-4'}>/app-4</Link>
      <Link className={clsx(s.link, pathname === '/app-5' && s.link_active)} href={'/app-5'}>/app-5</Link>
      <Link className={clsx(s.link, pathname === '/app-6' && s.link_active)} href={'/app-6'}>/app-6</Link>
      <Link className={clsx(s.link, pathname === '/app-7' && s.link_active)} href={'/app-7'}>/app-7</Link>
      {pathname === '/app-1' && <div className={s.title}>Environments, CanvasSettings, OrbitControls, alpha, useGLTF, group, hard models</div>}
      {pathname === '/app-2' && <div className={s.title}>Preloader, Html, State work, useFrame, easy models</div>}
      {pathname === '/app-3' && <div className={s.title}>Helpers, reusable component, Environment background, leva, diff scale</div>}
      {pathname === '/app-4' && <div className={s.title}>Animations, time control, backgroundBlurriness</div>}
      {pathname === '/app-5' && <div className={s.title}>Math.PI, FLoat</div>}
      {pathname === '/app-6' && <div className={s.title}>dynamic cdn download, download error handle</div>}
      {pathname === '/app-7' && <div className={s.title}>draggable, color, collection models</div>}
    </nav>
  );
}