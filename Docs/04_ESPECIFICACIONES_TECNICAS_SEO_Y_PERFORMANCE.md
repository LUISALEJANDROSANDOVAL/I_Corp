# Especificaciones Técnicas, SEO y Rendimiento Web
## Marca: Miel Natural del Bosque Chaqueño
**Punto de Origen Conceptual (POC):** *"Origen Intacto, Bosque Puro Chaco"*  
**Stack de Desarrollo:** Next.js 16 (App Router + Turbopack) + React 19 + Tailwind CSS v4 + Motion (`motion/react`)  

---

## 1. Arquitectura Tecnológica y Elección del Stack

| Capa Tecnológica | Solución Adoptada | Justificación Técnica y Beneficio |
| :--- | :--- | :--- |
| **Framework Base** | Next.js 16 (App Router) | Renderizado estático de alto rendimiento (SSG), generación en el borde y optimización nativa de activos. |
| **Motor de Renderizado** | React 19 Server Components | Cero JavaScript en el bundle inicial para bloques estáticos; hidratación selectiva solo para componentes interactivos. |
| **Estilos y CSS** | Tailwind CSS v4 (`@tailwindcss/postcss`) | CSS compilado de alto rendimiento con tokens nativos `@theme` en OKLCH y variables CSS sin sobrecarga de runtime. |
| **Librería de Animación** | Motion (`motion/react` v14) | Animaciones de física natural basada en resortes (Springs), transformaciones por puntero y paralaje optimizado en GPU (`transform: translate3d`). |
| **Tipografía Web** | `next/font/google` | Cero saltos de diseño (CLS = 0) mediante precarga y auto-hospedaje de `Playfair Display` y `Jost` sin llamadas externas a Google Fonts en runtime. |
| **Manejo de Imágenes** | `next/image` con WebP/AVIF | Servido adaptativo por resolución (`sizes`), carga diferida (lazy loading) para imágenes bajo el pliegue y `priority` para el Hero. |

---

## 2. Estrategia SEO On-Page y Metadatos

### 2.1. Metadatos Principales
* **Meta Title:** `Miel Natural del Bosque del Chaco — Miel Cruda Silvestre de Cuevo, Bolivia`
* **Meta Description:** `Miel cruda de monte chaqueño cosechada a mano en Cuevo (Cordillera). Extracción en frío, sin pasteurizar, de floraciones de quebracho, mistol y meliponas nativas. Edición limitada numerada.`
* **Keywords:** `miel cruda bolivia, miel silvestre chaco, miel de cuevo cordillera, miel melipona sin aguijón, miel pura quebracho mistol, miel gourmet bolivia`
* **Robots:** `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
* **Idioma / Locale:** `es_BO` (Español - Bolivia)
* **Canonical URL:** `https://mielbosquedelchaco.com/`

### 2.2. Protocolo Open Graph (Facebook / WhatsApp / LinkedIn)
```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Miel Natural del Bosque Chaqueño" />
<meta property="og:title" content="Miel Natural del Bosque del Chaco — Origen Intacto" />
<meta property="og:description" content="Néctar crudo silvestre de floraciones de quebracho y mistol, cosechado a mano en Cuevo. Extracción en frío y trazabilidad por frasco numerado." />
<meta property="og:url" content="https://mielbosquedelchaco.com/" />
<meta property="og:image" content="https://mielbosquedelchaco.com/images/og-share.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Frasco gourmet de Miel Natural del Bosque del Chaco" />
<meta property="og:locale" content="es_BO" />
```

### 2.3. Twitter Card
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Miel Natural del Bosque del Chaco — Miel Cruda Silvestre" />
<meta name="twitter:description" content="Pureza silvestre del Gran Chaco boliviano. Extracción en frío y trazabilidad por lote." />
<meta name="twitter:image" content="https://mielbosquedelchaco.com/images/og-share.png" />
```

---

## 3. Datos Estructurados Schema.org (JSON-LD)

Se inyectan bloques de JSON-LD en el `<head>` de la página para facilitar fragmentos enriquecidos (Rich Snippets) en Google Search:

### 3.1. Esquema `Organization` / `Brand`
```json
{
  "@context": "https://schema.org",
  "@type": "Brand",
  "name": "Miel Natural del Bosque Chaqueño",
  "alternateName": "Miel del Bosque del Chaco",
  "url": "https://mielbosquedelchaco.com",
  "logo": "https://mielbosquedelchaco.com/images/logo-oficial-dark.png",
  "description": "Producción, extracción artesanal en frío y comercialización de miel cruda silvestre prémium de floraciones del Gran Chaco.",
  "originAddress": {
    "@type": "PostalAddress",
    "addressLocality": "Cuevo",
    "addressRegion": "Provincia Cordillera, Santa Cruz",
    "addressCountry": "BO"
  },
  "sameAs": [
    "https://instagram.com/mielbosquedelchaco"
  ]
}
```

### 3.2. Esquema `Product` (Colección Gourmet)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Miel Cruda de Quebracho y Mistol - Edición Coleccionista 500g",
  "image": "https://mielbosquedelchaco.com/images/jar-coleccionista.png",
  "description": "Miel silvestre del Gran Chaco extraída en frío. Floración de quebracho colorado y mistol con notas amaderadas y tostadas.",
  "brand": {
    "@type": "Brand",
    "name": "Miel Natural del Bosque Chaqueño"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://mielbosquedelchaco.com/#vitrina",
    "priceCurrency": "BOB",
    "price": "240",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.95",
    "reviewCount": "48"
  }
}
```

### 3.3. Esquema `FAQPage`
Permite desplegar las preguntas y respuestas directamente en el carrusel de resultados de búsqueda de Google, incrementando el CTR orgánico hasta en un 30%.

---

## 4. Optimización de Core Web Vitals y Rendimiento

| Indicador Web Vital | Meta de Rendimiento | Estrategia de Implementación |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 1.2 segundos` | Pre-renderizado estático del Hero + Atributo `priority` en la imagen del frasco principal con compresión WebP. |
| **CLS (Cumulative Layout Shift)** | `0.00 (Inexistente)` | Reservas explícitas de relación de aspecto (`aspect-square`, `aspect-[4/5]`) en todas las imágenes y fuentes locales con `font-display: swap`. |
| **INP / FID (Interaction to Next Paint)** | `< 50 ms` | Desacoplamiento de eventos `pointermove` mediante `useSpring` con tasa de muestreo ligera y sin repintados de DOM innecesarios. |
| **FCP (First Contentful Paint)** | `< 0.7 segundos` | CSS crítico inline y bundle JS de hidratación mínimo gracias a la división de componentes cliente (`'use client'`). |

---

## 5. Directrices de Empaquetado y Compresión de Activos

1. **Logotipos Vectoriales y PNG:**  
   * Los archivos maestros en alta resolución (`Docs/Logos`) se conservan como archivo histórico.
   * En `public/images` se despliegan versiones optimizadas para web a 1200px de ancho (`logo-oficial-dark.png` y `logo-oficial-white.png`) con compresión sin pérdidas.
2. **Fotografías de Producto:**  
   * Formato WebP/PNG de 24 bits con máscara de transparencia optimizada para recorte limpio sobre fondo `#1C2A23`.
3. **Seguridad y Encabezados de Red:**  
   * `X-Content-Type-Options: nosniff`
   * `X-Frame-Options: DENY`
   * `Referrer-Policy: strict-origin-when-cross-origin`
