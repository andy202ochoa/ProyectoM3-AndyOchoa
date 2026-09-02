# Proyecto M3 - Andy Ochoa

[Proyecto en Vercel](https://proyecto-m3-andy-ochoa-gntu.vercel.app/)

[Documentación de IA en Drive](https://drive.google.com/file/d/1n8Njqf8Vy6G4Qe0OXa_SJBoxHbHh4-tS/view?usp=sharing)

## Descripción del proyecto
Este proyecto es una aplicación web con interfaz SPA (Single Page Application) para interactuar con un asistente de IA. La app permite enviar mensajes desde la interfaz, gestionar rutas de navegación y consumir un backend serverless para conectar con Gemini mediante una API key configurada en variables de entorno.

El objetivo principal del proyecto es demostrar el uso de JavaScript puro, navegación por rutas internas, diseño sencillo y una integración básica con servicios de inteligencia artificial en un entorno desplegado en Vercel.

## Tecnologías utilizadas
- HTML5
- CSS3
- JavaScript (ES modules)
- Node.js
- npm
- Vercel
- API REST serverless
- Google Generative AI / Gemini

## Estructura del proyecto
- `src/`: código de la aplicación frontend y rutas
- `api/`: backend serverless para llamadas a la IA
- `test/`: pruebas del backend y enrutador
- `vercel.json`: configuración de despliegue en Vercel
- `.env.example`: ejemplo de variables de entorno

## Requisitos previos
Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js 18 o superior
- npm
- Git
- Una cuenta en Vercel (opcional si quieres desplegar)

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/andy202ochoa/ProyectoM3-AndyOchoa.git
   ```
2. Entra a la carpeta del proyecto:
   ```bash
   cd ProyectoM3-AndyOchoa
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Crea tu archivo de entorno local a partir del ejemplo:
   ```bash
   copy .env.example .env
   ```
   O si usas Linux/macOS:
   ```bash
   cp .env.example .env
   ```
5. Configura la variable de entorno con tu clave de acceso del servicio de IA, sin compartirla en el repositorio.

## Variables de entorno
El proyecto usa una variable de entorno llamada:

```env
GEMINI_API_KEY=tu_api_key
```

> Importante: nunca publiques esta clave en GitHub, repositorios públicos o mensajes del proyecto. Debe quedar únicamente en tu entorno local o en variables seguras del despliegue.

## Instalación de Gemini en bash
Si quieres probar o configurar Gemini desde la terminal, puedes hacerlo con la herramienta o el cliente que estés usando en tu entorno local. En este proyecto se usa la versión actual disponible del modelo Gemini, y la configuración principal se realiza mediante la variable de entorno `GEMINI_API_KEY`.

Ejemplo de configuración en bash (Linux/macOS):

```bash
export GEMINI_API_KEY="tu_api_key_aqui"

echo "$GEMINI_API_KEY"
```

Ejemplo en PowerShell (Windows):

```powershell
$env:GEMINI_API_KEY="tu_api_key_aqui"

Write-Output $env:GEMINI_API_KEY
```

### Versión actual de Gemini que estoy usando
Actualmente estoy usando la versión actual disponible del modelo Gemini en el proyecto, compatible con la integración por API REST del servicio de Google Generative AI.

> La versión exacta puede variar según el servicio y la disponibilidad de Google en el momento, pero la integración está diseñada para trabajar con la versión actual publicada y soportada por la API.

## Ejecutar el proyecto en local
Puedes ejecutar la app de forma local con un servidor estático o usando el entorno de desarrollo que prefieras.

Ejemplo básico:

```bash
npx serve .
```

También puedes desplegarlo con Vercel usando la configuración incluida en el repositorio.

## Backend
El backend se encuentra en la carpeta `api/functions.js` y expone una función serverless que:
- valida el método HTTP
- comprueba que exista la API key configurada
- valida que el mensaje no venga vacío
- envía la petición al servicio de IA
- devuelve la respuesta al frontend

## Router
La lógica de navegación está en `src/routes.js` y `src/app.js`.

Incluye rutas principales como:
- `/`
- `/chat`
- `/about`

Esto permite una navegación tipo SPA sin recarga completa.

## Pruebas
El proyecto incluye pruebas para validar el comportamiento principal del backend y del enrutador.

### Ejecutar pruebas
```bash
npm test
```

### Qué validan estas pruebas
- El backend rechaza métodos HTTP no permitidos.
- Verifica la presencia de la API key configurada.
- Confirma que el mensaje es obligatorio.
- Comprueba la respuesta exitosa cuando la consulta es válida.
- Verifica que las rutas principales existen y están correctamente definidas.

## Despliegue
El proyecto está preparado para desplegarse en Vercel con la configuración de `vercel.json`.

## Notas adicionales
- Se recomienda no subir archivos `.env` a control de versiones.
- Mantén las claves y credenciales en variables seguras del entorno de despliegue.
- Este proyecto está pensado como demostración de trabajo con JavaScript, rutas SPA y consumo de IA en una aplicación web moderna.

> Nota importante sobre Gemini: el servicio puede tener un límite de respuestas por minuto o por cuota diaria, dependiendo del plan o de la cuenta configurada. En algunos casos, la API puede tardar unos minutos en restablecerse o puede indicar que se agotó el uso diario. Si aparece ese error, normalmente hay que esperar un momento o verificar el límite actual del modelo y la cuota asignada.

## Autor
Andy Ochoa
