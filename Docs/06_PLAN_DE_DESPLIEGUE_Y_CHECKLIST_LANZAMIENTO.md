# Plan de Despliegue, Monitoreo y Checklist de Lanzamiento
## Marca: Miel Natural del Bosque Chaqueño
**Punto de Origen Conceptual (POC):** *"Origen Intacto, Bosque Puro Chaco"*  
**Versión de Despliegue:** 2.0  

---

## 1. Checklist de Control de Calidad Pre-Lanzamiento (QA Checklist)

### 1.1. Verificación de Identidad de Marca y Estética
- [x] Logotipo oficial aplicado en versión fondo claro (`logo-oficial-dark.png`) y versión fondo oscuro (`logo-oficial-white.png`).
- [x] Respeto estricto a los códigos de color: Verde Monte (`#1C2A23`), Dorado Ámbar (`#F2A922`), Blanco Sustrato (`#F7F5F0`).
- [x] Tipografía institucional (`Playfair Display` para titulares y `Jost` para texto) cargada sin destello de texto invisible (FOIT).
- [x] Textura de papel verjurado artesanal (`.grain`) renderizada suavemente sin sobrecargar la GPU.

### 1.2. Pruebas Funcionales e Interactivas
- [x] Barra de anuncios con ticker de cosecha viva visible en desktop y móvil.
- [x] Menú móvil desplegable con cierre automático al seleccionar una sección ancla.
- [x] Efecto 3D de inclinación por cursor en el Hero y Vitrina (`motion/react`) con desactivación automática en pantallas táctiles o `prefers-reduced-motion`.
- [x] Puntos de cata sensorial (Hotspots) interactivos con despliegue de notas organolépticas en desktop (hover) y móvil (tap).
- [x] Acordeón de Preguntas Frecuentes (FAQ) con apertura y cierre fluido accesible por teclado.
- [x] Enlaces dinámicos de WhatsApp testeados con números reales y texto codificado (`encodeURIComponent`).

### 1.3. Compatibilidad Móvil y Cross-Browser
- [x] **iOS Safari (iPhone 12 a 16):** Verificación de márgenes seguros en barra de estado (`viewport-fit=cover`) y scroll elástico.
- [x] **Android Chrome:** Renderizado nítido de gradientes y botones táctiles con tamaño mínimo de 44px.
- [x] **Desktop (Chrome, Safari, Firefox, Edge):** Comprobación de aceleración por hardware en filtros y desenfoques (*backdrop-filter*).

---

## 2. Configuración de Producción y Despliegue

### 2.1. Variables de Entorno y Configuración Comercial
Archivo `.env.production` (o configuración en Vercel Dashboard):
```env
NEXT_PUBLIC_WHATSAPP_NUMBER="59170000000"
NEXT_PUBLIC_INSTAGRAM_HANDLE="mielbosquedelchaco"
NEXT_PUBLIC_SITE_URL="https://mielbosquedelchaco.com"
```

### 2.2. Comando de Construcción y Validación
Ejecutar previamente antes de cualquier pase a producción:
```bash
pnpm run build
```
Salida esperada:
* Compilación limpia mediante Turbopack.
* Generación de páginas estáticas `○ (Static) prerendered as static content`.
* Cero advertencias de sintaxis o TypeScript.

---

## 3. Protocolo de Gestión por Temporada de Cosecha

Dado que la producción de Miel del Bosque Chaqueño está sujeta a la floración silvestre estacional:

1. **Agotamiento de Lote:**
   * Cuando un lote se agota (ej. Lote 07 de Cuevo), actualizar la propiedad `edition` en `lib/miel.ts`:
     ```ts
     edition: 'Lote 07 · AGOTADO (Próxima cosecha en floración de primavera)'
     ```
   * Cambiar el botón de WhatsApp a: `"Unirme a la lista de espera del Lote 08"`.
2. **Apertura de Nueva Cosecha:**
   * Actualizar el número de lote, frascos producidos y fecha en la barra de anuncios superior (`ticker`).
   * Cargar las nuevas notas de cata si hubo predominancia de mistol frente a quebracho.

---

## 4. Auditoría de Métricas de Rendimiento (Lighthouse Score)

Metas establecidas para la versión en producción:
* **Performance:** > 95 / 100
* **Accessibility:** 100 / 100
* **Best Practices:** 100 / 100
* **SEO:** 100 / 100
