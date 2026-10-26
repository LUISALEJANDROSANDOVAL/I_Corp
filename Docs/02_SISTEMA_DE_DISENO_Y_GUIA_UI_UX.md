# Sistema de Diseño UI/UX y Guía de Estilo Digital
## Marca: Miel Natural del Bosque Chaqueño
**Punto de Origen Conceptual (POC):** *"Origen Intacto, Bosque Puro Chaco"*  
**Framework:** Next.js 16 + Tailwind CSS v4 + Motion (`motion/react`)  

---

## 1. Fundamentos Visuales y Filosofía Estética

El diseño digital de la marca sigue una estética de **minimalismo botánico y editorial prémium**. Se aleja deliberadamente de los tópicos de la apicultura industrial (amarillos fosforescentes, gráficos caricaturescos o estética de colmena plástica) para evocar:
* El silencio y la inmensidad del monte seco chaqueño.
* La densidad cromática del néctar puro madurado en tronco de quebracho.
* La exclusividad de un alimento vivo embotellado como perfume o destilado de colección.

---

## 2. Tokens Cromáticos Oficiales (Palette System)

La paleta se normaliza directamente a partir de las especificaciones del Manual de Identidad de Marca:

| Nombre del Token | Código HEX | RGB | HSL | Propósito en Interfaz UI |
| :--- | :--- | :--- | :--- | :--- |
| **Negro Carbón Silvestre** | `#111111` | `17, 17, 17` | `0°, 0%, 7%` | Color de fondo principal, texto de máximo contraste y modo oscuro profundo. |
| **Verde Monte Profundo** | `#1C2A23` | `28, 42, 35` | `150°, 20%, 14%` | Fondo atmosférico, superficie de contenedores y color institucional primario. |
| **Verde Musgo Chaqueño** | `#4A5D4E` | `74, 93, 78` | `133°, 11%, 33%` | Bordes suaves, tarjetas secundarias y elementos de relieve botánico. |
| **Verde Hoja Nativa** | `#2E7D32` | `46, 125, 50` | `123°, 46%, 34%` | Isotipos botánicos, indicadores de confirmación ecológica y brotes. |
| **Dorado Ámbar Néctar** | `#F2A922` | `242, 169, 34` | `39°, 89%, 54%` | Acento principal, llamadas a la acción (CTAs), brillo de gotas y acentos dorados. |
| **Bronce Envejecido** | `#8C6D3B` | `140, 109, 59` | `37°, 41%, 39%` | Acentos secundarios, subtítulos editoriales y texturas de madera. |
| **Crema Orgánico Sustrato** | `#F7F5F0` | `247, 245, 240`| `43°, 33%, 95%` | Tipografía principal sobre fondo oscuro, fondos claros para secciones de cata. |
| **Blanco Puro** | `#FFFFFF` | `255, 255, 255`| `0°, 0%, 100%` | Puntos de luz, texto en botones y fondos de tarjetas de alta pureza. |

### Variables CSS (OKLCH / HSL Inline Theme)
```css
:root {
  --forest: #1c2a23;
  --forest-dark: #111111;
  --moss: #4a5d4e;
  --leaf: #2e7d32;
  --amber: #f2a922;
  --amber-rich: #e89b28;
  --bronze: #8c6d3b;
  --cream: #f7f5f0;
  --pure: #ffffff;
  
  --background: var(--forest);
  --foreground: var(--cream);
  --border: color-mix(in oklab, var(--cream) 14%, transparent);
  --ring: var(--amber);
}
```

---

## 3. Sistema Tipográfico Institucional

| Nivel Jerárquico | Familia Tipográfica | Pesos | Estilo | Aplicación en la Web |
| :--- | :--- | :--- | :--- | :--- |
| **Titulares H1 / H2** | `Playfair Display` / `Cinzel` | 400, 600, 700 | Normal e Italic | Encabezados de sección, frases poéticas del terroir y nombres de producto. |
| **Texto de Párrafo / UI** | `Jost` / `Montserrat` | 300, 400, 500 | Normal | Párrafos descriptivos, botones, menús, etiquetas y tablas técnicas. |
| **Subtítulos Editoriales** | `Playfair Display Italic` | 400 | Italic | Bajadas de título, citas de cata y testimonios de chefs. |
| **Eyebrows / Overlines** | `Jost` | 500, 600 | Uppercase (`tracking-[0.35em]`) | Identificadores de sección, números de lote y sellos de origen. |
| **Logotipo Maestro** | `Custom Botanical Script` | — | Caligráfico de Autor | Logotipo oficial digitalizado en alta definición (`logo-oficial-white.png`). |

---

## 4. Componentes UI y Patrones de Interacción

### 4.1. Botones (Button Variants)
* **Botón Shine Dorado (`.btn-shine`):**  
  Borde dorado `#F2A922` con barrido de luz oblicuo al posar el cursor (`transform: translateX(120%) skewX(-20deg)`). Se utiliza para el checkout de compra y llamadas primarias a WhatsApp.
* **Botón Píldora de Cristal (`Glass Pill`):**  
  Fondo translúcido `bg-forest/70 backdrop-blur-xl` con borde blanco al 15% para navegación y filtros.
* **Botón Fantasma de Contorno (`Outline Button`):**  
  Borde suave con texto en crema y micro-escalado al toque (`scale: 0.98`).

### 4.2. Tarjetas Interactivas con Brillo Reactivo al Puntero (Cursor Glow)
Las tarjetas de beneficios y notas técnicas capturan el evento `onPointerMove` y proyectan un halo radial dinámico en tiempo de ejecución:
```tsx
const glow = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, color-mix(in oklab, var(--amber) 18%, transparent), transparent 70%)`
```

### 4.3. Puntos de Cata Interactivos (Hotspots Táctiles)
Sobre la fotografía de cada frasco se sitúan botones circulares pulsantes en oro cálido. Al hacer hover o tap:
* El punto emite una onda concéntrica (`ping`).
* Despliega un panel flotante con título de cata, matiz organoléptico y explicación de cosecha.

### 4.4. Textura de Grano Analógico (`.grain`)
Para evitar la frialdad del diseño vectorial plano, un filtro de ruido SVG fractal sutil al 7% de opacidad cubre suavemente las secciones oscuras, evocando el papel verjurado artesanal.

---

## 5. Especificaciones de Movimiento y Animación (Motion Tokens)

* **Curva de Aceleración Maestra (Editorial Ease):**  
  `const EASE = [0.22, 1, 0.36, 1]` (desaceleración suave y refinada).
* **Física de Resortes (Spring Physics para Efecto 3D):**  
  `stiffness: 80, damping: 20` para rotación reactiva del frasco en el viewport.
* **Transiciones de Entrada:**  
  Duración de `0.8s` a `1.2s` con desplazamiento en eje Y de `20px` a `0px` y difuminado progresivo (`filter: blur(8px)` a `blur(0px)`).
* **Paralaje Suave al Desplazamiento (Scroll Parallax):**  
  Las imágenes del bosque de Cuevo se desplazan entre `-8%` y `+8%` sincronizadas con el scroll.
* **Respeto a la Preferencia del Usuario:**  
  Todas las animaciones de movimiento reactivo consultan `useReducedMotion()` para desactivar aceleraciones abruptas en usuarios sensibles.

---

## 6. Criterios de Accesibilidad (A11y - WCAG 2.1 Nivel AA)

1. **Contraste de Color:**  
   Texto crema (`#F7F5F0`) sobre verde bosque (`#1C2A23`) alcanza una relación de contraste de **11.4:1**, superando ampliamente el requisito mínimo de **4.5:1**.
2. **Navegación por Teclado:**  
   Todos los elementos interactivos cuentan con estilos explícitos para `:focus-visible` mediante anillos de foco ámbar (`outline-ring`).
3. **Lectores de Pantalla:**  
   Los textos con divisiones visuales de animación incluyen `<span className="sr-only">` con el texto completo para garantizar lectura fluida por NVDA y VoiceOver.
4. **Objetivos Táctiles (Touch Targets):**  
   Todo botón táctil móvil posee una dimensión mínima de **44 × 44 píxeles**.
