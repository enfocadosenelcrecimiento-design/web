# Migración a Android

Esta carpeta ahora incluye los archivos básicos para convertir tu web en una app móvil:

- `manifest.json` — Configuración PWA para instalación en navegadores móviles.
- `sw.js` — Service worker simple para cachear la aplicación.
- `capacitor.config.json` — Configuración inicial para Capacitor.
- `package.json` — Dependencias y scripts para generar el proyecto Android.

## Qué puedes hacer ahora

### Opción 1: Usar Capacitor

1. Instala Node.js en tu PC.
2. Abre una terminal en la carpeta `web`.
3. Ejecuta:
   - `npm install`
   - `npx cap init MathQuestWeb com.mathquest.web`
   - `npx cap add android`
   - `npx cap copy`
   - `npx cap open android`

4. En Android Studio, construye el APK y pruébalo.

### Opción 2: Crear APK con PWABuilder sin Android Studio

1. Abre `https://www.pwabuilder.com`.
2. Carga tu sitio web (`index.html`) o pega la URL si lo subes a un servidor.
3. Usa el manifest creado y sigue los pasos para generar un APK.

## Nota importante

En este entorno no había Node.js disponible, así que no pude ejecutar `npm install` ni crear el proyecto Android completo. Los archivos necesarios ya están listos en el proyecto.
