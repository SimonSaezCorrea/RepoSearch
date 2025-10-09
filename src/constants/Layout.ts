// Configuración de layout con breakpoints de MUI
export const LAYOUT = {
  MASONRY_BREAKPOINTS: {
    xs: 1,    // < 600px = 1 columna
    sm: 1,    // 600px-900px = 1 columna (hasta 1090px aprox)
    md: 2,    // 900px-1200px = 2 columnas (1090px-1370px aprox)
    lg: 3,    // 1200px-1536px = 3 columnas (1370px-1700px aprox) 
    xl: 4,    // 1536px+ = 4 columnas (1700px+)
  },
  MASONRY_SPACING: {
    xs: 1.5,  // 1 columna - espaciado estándar
    sm: 1.5,  // 1 columna - espaciado estándar
    md: 2,    // 2 columnas - espaciado mayor
    lg: 5,  // 3 columnas - espaciado mayor
    xl: 4,    // 4+ columnas - espaciado amplio
  },

} as const;