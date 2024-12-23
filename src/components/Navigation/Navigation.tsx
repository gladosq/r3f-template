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
      <a className={clsx(s.link, pathname === '/app-3' && s.link_active)} href={'/app-3'}>/app-3</a>
      <Link className={clsx(s.link, pathname === '/app-4' && s.link_active)} href={'/app-4'}>/app-4</Link>
      <Link className={clsx(s.link, pathname === '/app-5' && s.link_active)} href={'/app-5'}>/app-5</Link>
      <a className={clsx(s.link, pathname === '/app-6' && s.link_active)} href={'/app-6'}>/app-6</a>
      <Link className={clsx(s.link, pathname === '/app-7' && s.link_active)} href={'/app-7'}>/app-7</Link>
      <a className={clsx(s.link, pathname === '/app-8' && s.link_active)} href={'/app-8'}>/app-8</a>
      <Link className={clsx(s.link, pathname === '/app-9' && s.link_active)} href={'/app-9'}>/app-9</Link>
      <Link className={clsx(s.link, pathname === '/app-10' && s.link_active)} href={'/app-10'}>/app-10</Link>
      <Link className={clsx(s.link, pathname === '/app-11' && s.link_active)} href={'/app-11'}>/app-11</Link>
      <Link className={clsx(s.link, pathname === '/app-12' && s.link_active)} href={'/app-12'}>/app-12</Link>
      <Link className={clsx(s.link, pathname === '/app-13' && s.link_active)} href={'/app-13'}>/app-13</Link>
      {pathname === '/app-1' && <div className={s.title}>Environments, CanvasSettings, OrbitControls, alpha, useGLTF, group</div>}
      {pathname === '/app-2' && <div className={s.title}>Preloader, Html, State work, useFrame, Parallax (cursor)</div>}
      {pathname === '/app-3' && <div className={s.title}>Helpers, reusable component, Environment background, leva, diff scale</div>}
      {pathname === '/app-4' && <div className={s.title}>Animations, time control, backgroundBlurriness</div>}
      {pathname === '/app-5' && <div className={s.title}>Math.PI, FLoat</div>}
      {pathname === '/app-6' && <div className={s.title}>dynamic cdn download, download error handle</div>}
      {pathname === '/app-7' && <div className={s.title}>draggable, color, collection models, position control</div>}
      {pathname === '/app-8' && <div className={s.title}>interactive with model, few materials models opacity, ref</div>}
      {pathname === '/app-9' && <div className={s.title}>Lights</div>}
      {pathname === '/app-10' && <div className={s.title}>Effects: glitch, rotate control, rotation animation, pulsing animation, ascii render</div>}
      {pathname === '/app-11' && <div className={s.title}>Color animations, Infinite animations function</div>}
      {pathname === '/app-12' && <div className={s.title}>Parallax (scroll)</div>}
      {pathname === '/app-13' && <div className={s.title}>Scroll animations observer</div>}
    </nav>
  );
}
