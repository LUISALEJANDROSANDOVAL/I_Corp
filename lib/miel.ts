/**
 * Datos de marca y producto — Fuente Oficial.
 * NOTA: el número de WhatsApp es un marcador de posición — reemplazar por el real antes de publicar.
 */
export const WHATSAPP_NUMBER = '59170000000'
export const INSTAGRAM_HANDLE = 'mielbosquedelchaco'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const CHAPTERS = [
  { id: 'terroir', numeral: 'I', label: 'El Terroir' },
  { id: 'meliponas', numeral: 'II', label: 'Las Guardianas' },
  { id: 'coleccion', numeral: 'III', label: 'La Colección' },
  { id: 'pureza', numeral: 'IV', label: 'La Pureza' },
  { id: 'contacto', numeral: '✦', label: 'Contacto' },
] as const

export type TastingNote = {
  /** posición en % sobre la fotografía original (cuadrada) */
  x: number
  y: number
  title: string
  text: string
}

export type Presentation = {
  id: string
  name: string
  subname: string
  tagline: string
  weight: string
  floracion: string
  perfil: string
  image: string
  alt: string
  glow: string
  notes: TastingNote[]
}

export const PRESENTATIONS: Presentation[] = [
  {
    id: 'coleccionista',
    name: 'Frasco Coleccionista',
    subname: 'Multifloral de Monte Alto',
    tagline:
      'Vidrio facetado de alto gramaje (8 cm de alto y 23 cm de contorno), ideal para resaltar el ámbar profundo de la miel de quebracho y mistol.',
    weight: '500 g',
    floracion: 'Quebracho y mistol',
    perfil: 'Intensa y amaderada',
    image: '/images/jar-coleccionista.webp',
    alt: 'Frasco facetado de vidrio pesado con miel ámbar oscura y tapa dorada con sello de abeja',
    glow: 'rgba(212, 120, 20, 0.55)',
    notes: [
      {
        x: 50,
        y: 15,
        title: 'Tapa dorada y precinto oficial',
        text: 'Sello de garantía con trazabilidad directa hasta la colmena de origen en el Chaco.',
      },
      {
        x: 50,
        y: 56,
        title: 'Etiqueta Miel Natural',
        text: 'Identidad oficial del Bosque Chaqueño en Cuevo con ilustración de flora nativa.',
      },
      {
        x: 74,
        y: 72,
        title: 'Ámbar profundo',
        text: 'Miel pura y rica en minerales de quebracho colorado y mistol.',
      },
    ],
  },
  {
    id: 'melipona',
    name: 'Edición Melipona',
    subname: 'Nativas sin Aguijón',
    tagline:
      'Presentación especial en frasco bajo y ancho (23 cm de diámetro de volumen), destacando una rareza de cosecha mínima de abejas nativas (Meliponini).',
    weight: '250 g',
    floracion: 'Flora silvestre del sotobosque chaqueño',
    perfil: 'Viva y cítrica',
    image: '/images/jar-melipona.webp',
    alt: 'Frasco redondo de miel melipona dorada con tapón de corcho sellado con cera y cordel de yute',
    glow: 'rgba(242, 169, 34, 0.5)',
    notes: [
      {
        x: 50,
        y: 17,
        title: 'Sello de cera natural',
        text: 'Corcho sellado artesanalmente con cera de la propia colmena.',
      },
      {
        x: 76,
        y: 38,
        title: '100% Cosecha silvestre',
        text: 'Identificación artesanal atada con cordel de yute rústico.',
      },
      {
        x: 50,
        y: 68,
        title: 'Miel de Meliponas',
        text: 'Cosecha de abejas nativas sin aguijón con acidez luminosa y toques cítricos.',
      },
    ],
  },
  {
    id: 'cristalizada',
    name: 'Reserva Cristalizada',
    subname: 'Algarrobo en Flor',
    tagline:
      'Envase cilíndrico robusto que exhibe la cristalización natural espontánea del algarrobo, logrando una textura cremosa y untuosa.',
    weight: '350 g',
    floracion: 'Algarrobo nativo',
    perfil: 'Suave con notas de vainilla y nuez',
    image: '/images/jar-cristalizada.webp',
    alt: 'Frasco bajo con miel cristalizada cremosa, cuchara de madera y tapa de nogal',
    glow: 'rgba(200, 160, 80, 0.45)',
    notes: [
      {
        x: 42,
        y: 17,
        title: 'Cuchara de madera tallada',
        text: 'Diseñada a mano para servir la miel preservando sus propiedades bioactivas.',
      },
      {
        x: 80,
        y: 55,
        title: 'Tapa artesanal de madera',
        text: 'Cierre natural que complementa la pureza y nobleza del envase.',
      },
      {
        x: 50,
        y: 62,
        title: 'Textura cremosa y viva',
        text: 'Cristalización espontánea que certifica su condición 100% cruda sin pasteurizar.',
      },
    ],
  },
]
