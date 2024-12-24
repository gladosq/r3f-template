### Деплой — https://r3f-template-gladosq.vercel.app

### Структура
- `/app-1` - Environments, CanvasSettings, OrbitControls, alpha, useGLTF, group
- `/app-2` - Preloader, Html, State work, useFrame, cursor parallax
- `/app-3` - Helpers, reusable component, Environment background, leva, diff scale
- `/app-4` - Animations, time control, backgroundBlurriness
- `/app-5` - Math.PI, FLoat
- `/app-6` - dynamic cdn download, download error handle
- `/app-7` - draggable, color, collection models, position control
- `/app-8` - interactive with model, few materials models opacity, ref
- `/app-9` - Lights
- `/app-10` - Effects: glitch, rotate control, rotation animation, pulsing animation, ascii render
- `/app-11` - Color animations, Infinite animations function
- `/app-12` - Parallax (scroll)
- `/app-13` - Scroll animations observer

### Проблемы с Next 15

- На Next.js версии `15.0.0` и выше, требуется `@react-three/fiber`, версии `^9.0.0-rc.1` (https://github.com/vercel/next.js/issues/71836)
- `@react-three/drei` на текущий момент не поддерживает React 19 
- `leva` не работает на Next 15 (крашит Next), поэтому чтобы не ломался деплой демки, стоит 14 Next. На Эдите `leva` использовать не обязательно
- Так как версия rc, то не матчатся какие-то зависимости: ставить нужно с флагом `--legacy-peer-deps`

##### Рабочий конфиг:

```json
"dependencies": {
  "@react-three/drei": "^9.120.4",
  "@react-three/fiber": "^9.0.0-rc.1",
  "@react-three/postprocessing": "^2.16.3",
  "postprocessing": "^6.36.4",
  "sharp": "^0.33.5",
  "three": "^0.169.0",
  "next": "15.0.3",
  "react": "18.3.1",
  "react-dom": "18.3.1"
},
```

### Запуск
Запуск dev-приложения:
```bash
# Установить зависимости
npm i
# Запустить локальный сервер
npm run dev
```

Сборка билда:
```bash
# Установить зависимости
npm i
# Собрать билд
npm run build
```
