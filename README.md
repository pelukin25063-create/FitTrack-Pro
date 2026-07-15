# FitTrack Pro

Aplicación móvil de seguimiento fitness desarrollada con **Ionic 8 + Angular 20 + Capacitor 8**, para la asignatura Programación de Dispositivos Móviles (ISW-307).

## Descripción

FitTrack Pro centraliza en una sola app el registro de entrenamientos, el trazado de rutas de ejercicio por GPS, el monitoreo con sensores Bluetooth, el progreso físico fotográfico y la posibilidad de compartir rutinas por NFC — todo con persistencia de datos local.

## Tecnologías utilizadas

- **Ionic Framework 8** — componentes de interfaz móvil
- **Angular 20** — framework base y enrutamiento
- **Capacitor 8** — puente a hardware nativo
- **TypeScript 5.8**
- **Leaflet.js** — mapas interactivos
- **@ionic/storage-angular** — persistencia local
- Plugins de Capacitor: `@capacitor/geolocation`, `@capacitor/camera`, `@capacitor/network`, `@capacitor-community/bluetooth-le`, `@capgo/capacitor-nfc`

## Requisitos

- Node.js 24.x
- npm 11.x
- Ionic CLI 7.x (`npm install -g @ionic/cli`)
- Android Studio (para compilar/probar en Android)

## Instalación

```bash
git clone https://github.com/pelukin25063-create/FitTrack-Pro.git
cd FitTrack-Pro
npm install
ionic serve
```

Esto debería abrir la app en `http://localhost:8100` con las 5 pestañas funcionando.

## Ejecutar en Android

```bash
ionic build
npx cap add android
npx cap sync android
npx cap open android
```

Esto abre Android Studio con el proyecto cargado. Selecciona un emulador o conecta tu celular por USB (con depuración USB activada) y presiona **Run**.

### Permisos necesarios (Android)

Agrega en `android/app/src/main/AndroidManifest.xml`, antes de `<application>`:
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.NFC" />
```

## Notas técnicas importantes

- **`webDir` en `capacitor.config.ts` es `www/browser`**, no `www`. El nuevo *application builder* de Angular 20 anida el `index.html` en una subcarpeta `browser/`.
- **`@capacitor-community/nfc` está descontinuado** (sin versión para Capacitor 8) — este proyecto usa **`@capgo/capacitor-nfc`** en su lugar.
- Todos los componentes llevan `standalone: false` explícito en su `@Component`, porque Angular 19+ asume `standalone: true` por defecto y este proyecto usa la arquitectura clásica de NgModules.
- El `appId` en `capacitor.config.ts` no puede empezar con una palabra reservada de Java (por ejemplo `do`), o Gradle falla al compilar el namespace de Android.
- Bluetooth, NFC y cámara **no funcionan en el emulador de Android Studio** ni en `ionic serve` — se probaron en un dispositivo Android físico.

## Estructura del proyecto

```
src/app/
  models/          -> Interfaces de datos (Workout, Route, Profile, Tip...)
  services/        -> Lógica de negocio y acceso a hardware/storage
    storage.service.ts     Unidad 9 - Almacenamiento base
    workout.service.ts     Unidad 3/9 - CRUD de entrenamientos
    location.service.ts    Unidad 6 - Geolocalización
    network.service.ts     Unidad 4 - Conectividad
    camera.service.ts      Unidad 7/8 - Cámara y QR
    bluetooth.service.ts   Unidad 5 - Bluetooth Low Energy
    nfc.service.ts         Unidad 5 - NFC
    api.service.ts         Unidad 10 - Consumo de API REST
    profile.service.ts     Unidad 9 - Perfil de usuario
  tabs/            -> Navegación principal (Unidad 1/2)
  pages/
    home/          -> Fase 1: Dashboard + tips desde API
    workouts/      -> Fase 2: CRUD de entrenamientos con gestos
    routes/        -> Fase 3: Mapa GPS + conectividad
    progress/      -> Fase 4: Cámara, QR y audio
    profile/       -> Fase 5: Bluetooth, NFC y perfil
```

## Cobertura de las 10 unidades

| Unidad | Tema | Dónde está cubierta |
|---|---|---|
| 1 | Introducción | Estructura general del proyecto Ionic/Angular/Capacitor |
| 2 | Navegación | `tabs/` con ion-tabs y lazy loading |
| 3 | Interfaces | `workouts.page.html` (ion-list, ion-item-sliding, ion-modal) |
| 4 | Conectividad | `network.service.ts` + badge online/offline |
| 5 | Bluetooth/NFC | `bluetooth.service.ts`, `nfc.service.ts` |
| 6 | Geolocalización | `location.service.ts` + mapa Leaflet en `routes.page.ts` |
| 7 | Multimedia | Reproductor de audio en `progress.page.ts` |
| 8 | Cámara | `camera.service.ts` (foto + QR) |
| 9 | Almacenamiento | `storage.service.ts` y todos los servicios que lo usan |
| 10 | Servicios Web | `api.service.ts` (consumo de JSONPlaceholder) |

## Capturas de pantalla

_[Agregar aquí capturas de la app corriendo en navegador, emulador y dispositivo físico]_

## Autor

- **[Tu nombre completo]** — Matrícula: **[xxxxxx]**
- Asignatura: Programación de Dispositivos Móviles (ISW-307)
- Facilitador: Joan Manuel Gregorio Pérez
