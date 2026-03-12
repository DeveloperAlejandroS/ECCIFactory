# 📻 Radio ECCI — Página Web Oficial

> Sitio web de la estación radial universitaria de la **Universidad ECCI**, Bogotá, Colombia.

---

## Historia del proyecto

**Radio ECCI** nació como el proyecto de radio universitaria de la [Universidad ECCI](https://www.ecci.edu.co), con el propósito de ser la voz de su comunidad académica. Su misión giraba en torno a cuatro pilares fundamentales:

- 🎓 **Educación** — programas que informaban y formaban a estudiantes, docentes y egresados.
- 💡 **Conocimiento** — divulgación científica, tecnológica y académica.
- 🎭 **Cultura** — arte, entretenimiento y expresiones culturales diversas.
- 🔬 **Investigación** — difusión de proyectos y avances investigativos de la institución.

La radio transmitía en vivo a través de **Spreaker** bajo el programa *Radio ECCI 2023*, alcanzando a la comunidad universitaria desde Bogotá. El sitio web original fue desarrollado como proyecto estudiantil en HTML, CSS y JavaScript vanilla, y alojado públicamente en GitHub.

---

## Estado actual

**La emisora original cerró operaciones.** El stream de Spreaker asociado a *Radio ECCI 2023* dejó de transmitir, por lo que el reproductor original quedó inactivo.

Como homenaje al espíritu del proyecto y para mantener el sitio funcional, el reproductor fue reemplazado por una **emisora externa de salsa en vivo**, género representativo de la cultura colombiana. El reproductor intenta automáticamente hasta 4 streams HTTPS de fallback en caso de fallo, garantizando que siempre haya música disponible.

---

## Modernización de la interfaz (v2)

La segunda versión del sitio fue una reescritura completa manteniendo HTML, CSS y JavaScript puro — sin frameworks, sin dependencias, sin build tools.

### Diseño — Liquid Glass

Inspirado en el lenguaje visual de **iOS 26**, el rediseño adoptó una estética *liquid glass*:

- `backdrop-filter: blur()` y `saturate()` en todas las tarjetas y el header para efecto de cristal translúcido real.
- Highlight especular en el borde superior de cada card simulando el reflejo de luz en vidrio.
- 4 **orbs de color animados** en el fondo (azul navy, rojo, dorado, azul oscuro) con movimiento lento tipo lava lamp usando `@keyframes` y `filter: blur(80px)`.
- Textura de ruido SVG generada inline para evitar la apariencia plástica del glass sin textura.
- Sombras en capas con `inset` para profundidad real.

### Hero — Geometría animada en CSS puro

El banner principal fue rehecho completamente sin imágenes:

- 4 **anillos concéntricos** girando a distintas velocidades (9s, 12s, 18s, 28s) en direcciones alternas, con el arco activo en los colores de marca.
- 3 **puntos orbitando** (azul, dorado, rojo) como satélites en radios distintos.
- 3 **ondas de radio** tipo ripple expandiéndose desde el centro en loop.
- 20 **barras de ecualizador** con alturas y delays escalonados en la parte inferior.
- Tipografía: `RADIO` en tracking amplio sobre `ECCI` a tamaño `clamp(5rem, 22vw, 13rem)`.

### Temas claro / oscuro

- Toggle ☀️/🌙 en el header, persiste en `localStorage`.
- Detecta automáticamente `prefers-color-scheme` del sistema operativo.
- Más de 40 tokens CSS en `:root` se intercambian simultáneamente con transición de 0.4s.
- Orbs, bordes, fondos de glass, textos y chips adaptan sus colores coherentemente en ambos temas.

### Accesibilidad

- Skip link (*"Saltar al contenido principal"*) para lectores de pantalla.
- Jerarquía de headings correcta: un solo `<h1>` por página, `<h2>` en secciones.
- `aria-live`, `aria-label`, `aria-pressed`, `aria-current` en todos los elementos interactivos.
- `role="listbox"`, `role="listitem"`, `role="region"` en componentes semánticos.
- `prefers-reduced-motion`: desactiva todas las animaciones CSS de un golpe.
- Foco visible con `outline` dorado para navegación por teclado.

### Compatibilidad móvil (iOS & Android)

- `viewport-fit=cover` + `env(safe-area-inset-*)` para notch del iPhone y Dynamic Island.
- `padding-bottom: env(safe-area-inset-bottom)` en el footer para la barra de home del iPhone.
- `apple-mobile-web-app-capable` y `apple-mobile-web-app-status-bar-style` para modo pantalla completa al guardar en Home Screen.
- `theme-color` diferenciado según tema claro/oscuro vía media query.
- Tap targets mínimo 44×44px (Apple HIG y Material Design).
- `-webkit-tap-highlight-color: transparent` elimina el destello azul en Android.
- `touch-action: manipulation` en todos los botones elimina el delay de 300ms en iOS.
- `-webkit-overflow-scrolling: touch` para scroll suave en iOS Safari.
- Menú hamburguesa con bloqueo de scroll del body mientras está abierto, cierre con `Escape` y cierre al tocar fuera.

### SEO y metadatos

- `<meta name="description">`, keywords, author y robots.
- Open Graph completo (Facebook, LinkedIn): `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale`, `og:site_name`.
- Twitter Card con `summary_large_image`.
- Favicon corregido (`rel="shortcut icon"` con `type="image/png"`).
- `apple-touch-icon` para el ícono en iOS Home Screen.

### Reproductor de radio

- Streams HTTPS hardcodeados — sin API key, sin dependencias externas.
- Sistema de fallback automático: si un stream falla, prueba el siguiente sin intervención del usuario.
- Manejo diferenciado de errores: `NotAllowedError` (autoplay bloqueado) muestra mensaje amigable en lugar de saltar streams infinitamente.
- Visualizador de ondas animado en CSS puro que se activa únicamente durante la reproducción.
- Indicador **LIVE** con pulso animado.
- Control de volumen deslizante estilizado.

---

## Estructura de archivos

```
RadioECCI/
├── index.html        # Estructura semántica, metadatos SEO y Open Graph
├── style.css         # Sistema de diseño Liquid Glass + temas + responsive
├── script.js         # Tema, menú, nav activo, reproductor de radio
├── README.md         # Este archivo
└── Assets/
    └── img/
        ├── LogoNoBG.png       # Logo principal (fondo transparente)
        ├── Logo.jpg           # Logo para Open Graph
        ├── Email.png          # Ícono de correo
        ├── FacebookLOGO.png   # Ícono de Facebook
        ├── InstagramLOGO.png  # Ícono de Instagram
        ├── TwitterLOGO.png    # Ícono de X (Twitter)
        └── survey.png         # Ícono de encuesta
```

---

## Tecnologías

| Categoría | Detalle |
|---|---|
| Lenguajes | HTML5, CSS3, JavaScript ES5+ |
| Tipografías | [Syne](https://fonts.google.com/specimen/Syne) (display) · [Figtree](https://fonts.google.com/specimen/Figtree) (cuerpo) vía Google Fonts |
| Radio API | Streams HTTPS hardcodeados (sin dependencia externa) |
| Frameworks | Ninguno |
| Build tools | Ninguno |

---

## Redes sociales

| Red | Enlace |
|---|---|
| 📧 Correo | radio@ecci.edu.co |
| 📘 Facebook | [@RadioECCICO](https://www.facebook.com/RadioECCICO) |
| 📸 Instagram | [@radioecci](https://instagram.com/radioecci) |
| 🐦 X / Twitter | [@EcciRadio](https://x.com/EcciRadio) |

---

*© Radio ECCI · Universidad ECCI · Bogotá, Colombia*
