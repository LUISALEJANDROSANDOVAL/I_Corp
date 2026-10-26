# Hoja de Ruta hacia el 100%: Perfeccionamiento y Personalización Institucional
## Proyecto: Miel Natural del Bosque Chaqueño
**Punto de Origen Conceptual (POC):** *"Origen Intacto, Bosque Puro Chaco"*  
**Procedencia:** Cuevo, Provincia Cordillera, Santa Cruz — Bolivia  
**Estado:** Documento de Directrices y Checklist de Lanzamiento Oficial

---

## 1. Diagnóstico Ejecutivo

El sitio web cuenta con una arquitectura técnica de nivel internacional (**animaciones con física de resortes, scroll cinético con Lenis, escenarios fijados sticky en cada capítulo, micrograno analógico y diseño sonoro orgánico con Web Audio API**).

Para que la web pase de su estado actual a una **plataforma institucional definitiva y personalizada al 100% para la empresa**, se debe completar la integración de los siguientes 5 pilares:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      LOS 5 PILARES HACIA EL 100% DEFINITIVO                 │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ 1. Fotografía Real   │ 2. Activos de Marca  │ 3. Canales de Enlace          │
│    Sustituir mockups │    Vectores SVG del  │    WhatsApp Business real,    │
│    por frascos reales│    logotipo oficial  │    Instagram y dominio        │
├──────────────────────┴──────────────────────┴───────────────────────────────┤
│ 4. Trazabilidad & Legalidad                 │ 5. Despliegue & Métricas      │
│    Sellos SENASAG, origen y advertencias    │    Dominio .bo/.com, SSL, GA4 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Fotografía de Producto y Territorio (El Salto Visual)

> [!IMPORTANT]
> **Prioridad Máxima:** Las fotografías actuales de los frascos (`jar-hero.webp`, `jar-coleccionista.webp`, `jar-melipona.webp`, `jar-cristalizada.webp`) son composiciones de demostración generadas con IA. Tienen etiquetas simuladas en inglés y francés (*Melipona Gold*, *Aurore Royale*, etc.). Reemplazarlas por fotografía real es el paso que le dará autenticidad absoluta a la empresa.

### Tareas Requeridas:
1. **Fotografía de Estudio de los Frascos Reales:**
   * Tomar fotos en alta definición de los envases definitivos con la **etiqueta oficial en español de la marca pegada al frasco**.
   * Requerimientos técnicos: Fondo blanco puro o canal alfa transparente recortado (.png / .webp), iluminación suave cenital y lateral para destacar el color ámbar natural y la textura de la miel.
   * Proporción recomendada: 1:1 (cuadrada) o 4:5 vertical (alta resolución: mín. 2000 × 2000 px).
2. **Fotografía Territorial de Cuevo y el Apiario:**
   * Sustituir las imágenes de fondo genéricas por fotos auténticas de la flora chaqueña (árboles de quebracho colorado, algarrobos en flor y mistol).
   * Fotografías documentales de las abejas nativas Meliponas en sus troncos reales y de los recolectores trabajando artesanalmente con vestimenta adecuada.

---

## 3. Identidad Corporativa y Logotipo Vectorial

* **Vectorización Oficial (SVG):**
  * Actualmente se utiliza una imagen rasterizada (`logo-oficial-white.png`).
  * Para pantallas Retina, 4K y dispositivos móviles de alta gama, se recomienda convertir el imagotipo caligráfico de autor a formato **SVG (`.svg`)**. Esto garantiza bordes vectoriales perfectos sin pérdida de calidad y menor peso de carga.
* **Paquete de Favicons e Iconos Institucionales:**
  * Crear el archivo `favicon.ico`, `apple-touch-icon.png` (180x180 px) y `icon.svg` a partir del isotipo (la gota silvestre o la abeja con el trazado oficial).

---

## 4. Personalización de Canales de Contacto y Conversión

En el archivo de configuración `lib/miel.ts` actualmente existen datos de prueba que deben ser sustituidos por los oficiales de la empresa:

| Variable | Valor Actual (Mockup) | Valor Requerido para Producción | Ubicación en el Código |
| :--- | :--- | :--- | :--- |
| **Teléfono WhatsApp** | `59170000000` | Número oficial de WhatsApp Business de ventas/atención | `lib/miel.ts` (Línea 5) |
| **Usuario Instagram** | `mielbosquedelchaco` | Usuario oficial `@` verificado de la empresa | `lib/miel.ts` (Línea 6) |
| **Mensaje de Bienvenida** | Texto genérico | Protocolo de respuesta automática institucional | `lib/miel.ts` (`whatsappLink`) |
| **Dominio Web Base** | `mielbosquedelchaco.com` | Dominio contratado oficial (ej. `mieldelchaco.com` o `.bo`) | `app/layout.tsx` (Línea 30) |

---

## 5. Respaldos Institucionales, Sanidad y Legalidad

Para que la web inspire 100% de confianza ante compradores gourmet, hoteles, restaurantes y distribuidores:

1. **Sellos Sanitarios y Bromatológicos:**
   * Añadir el número de registro sanitario de **SENASAG** (Servicio Nacional de Sanidad Agropecuaria e Inocuidad Alimentaria de Bolivia) o la leyenda *"Cosecha artesanal silvestre en proceso de certificación"*.
2. **Denominación y Trazabilidad:**
   * Consolidar el origen geográfico: *Municipio de Cuevo, Provincia Cordillera, Departamento de Santa Cruz — Estado Plurinacional de Bolivia*.
3. **Advertencia Sanitaria Obligatoria:**
   * Incorporar al pie o en la sección de pureza la advertencia bromatológica estándar: *"No administrar a niños menores de 1 año de edad"*.
4. **Política de Privacidad y Términos:**
   * Añadir enlaces sutiles en el pie de página hacia los Términos de Uso y Política de Tratamiento de Datos para contacto por WhatsApp.

---

## 6. Infraestructura, Despliegue y Métricas de Rendimiento

1. **Adquisición y Configuración de Dominio:**
   * Registrar el dominio corporativo preferido (por ejemplo: `mielnaturaldelchaco.com`, `mieldelchaco.bo`).
   * Configurar los registros DNS (CNAME y registros A) apuntando a la plataforma de hosting.
2. **Alojamiento Recomendado:**
   * **Vercel** o **Cloudflare Pages:** Excelente rendimiento para Next.js 16 con despliegues automáticos desde el repositorio GitHub `LUISALEJANDROSANDOVAL/I_Corp`.
3. **Analítica y Píxel de Conversión:**
   * Configurar **Google Analytics 4 (GA4)** o **Google Tag Manager** para monitorear visitantes, de qué ciudades de Bolivia o del exterior ingresan y qué productos consultan más.
   * Si la empresa invertirá en publicidad digital (Facebook / Instagram Ads), integrar el **Meta Pixel** para medir clics hacia el botón de WhatsApp.

---

## 7. Tabla Resumen de Tareas Pendientes para el Lanzamiento

| Fase | Tarea | Responsable | Impacto |
| :--- | :--- | :--- | :--- |
| **Inmediato** | Proporcionar número de WhatsApp real y redes sociales | Empresa / Cliente | Crítico para recibir consultas |
| **Inmediato** | Subir código definitivo a GitHub (`git commit` y `git push`) | Desarrollador | Respaldo y CI/CD |
| **Semana 1** | Fotografiar los 3 frascos reales con etiqueta y fondo transparente | Fotógrafo / Empresa | Estética 100% auténtica |
| **Semana 1** | Exportar logo oficial en formato `.svg` | Diseñador Gráfico | Nitidez óptima |
| **Semana 2** | Comprar dominio (`.bo` o `.com`) y desplegar en Vercel | DevOps / Desarrollador | Publicación oficial online |
| **Semana 2** | Validar números de SENASAG o sellos de certificación | Legal / Producción | Confianza institucional |

---

> [!TIP]
> **Conclusión:** La estructura técnica, las animaciones de nivel internacional y el diseño ya están listos y optimizados. El último tramo para alcanzar el 100% consiste únicamente en reemplazar los **activos provisionales (fotos de catálogo generadas y teléfonos de prueba)** por los **activos reales de la empresa**.
