# 🔍 RepoSearch

**Explorador de Repositorios GitHub** - Una aplicación web moderna y elegante para descubrir y explorar repositorios de GitHub de manera intuitiva y visual.

## ✨ Características

### 🎯 Funcionalidades Principales
- **Búsqueda Aleatoria**: Descubre repositorios interesantes con queries generadas automáticamente
- **Búsqueda Manual**: Busca repositorios específicos con filtros avanzados
- **Visualización Masonry**: Layout de tarjetas adaptativo y responsivo
- **Scroll Infinito**: Carga automática de más resultados
- **Filtros Avanzados**: Múltiples criterios de búsqueda (lenguaje, estrellas, fechas, etc.)
- **Gestión de Rate Limiting**: Manejo inteligente de límites de la API de GitHub

### 🎨 Interfaz de Usuario
- **Diseño Moderno**: UI limpia y profesional con Tailwind CSS
- **Responsive**: Optimizado para desktop, tablet y móvil
- **Animaciones Suaves**: Transiciones y efectos visuales elegantes
- **Modo Oscuro**: Soporte completo para temas claro y oscuro
- **Componentes Reutilizables**: Arquitectura modular y escalable

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1** - Biblioteca principal para la interfaz de usuario
- **TypeScript 5.8.3** - Tipado estático para mayor robustez
- **Vite 7.1.12** - Herramienta de construcción rápida y moderna
- **Tailwind CSS 4.1.14** - Framework de utilidades CSS
- **Lucide React** - Iconografía moderna y consistente

### Componentes UI
- **Material-UI (MUI) 7.3.3** - Componentes de interfaz avanzados
- **React Select 5.10.2** - Selectores personalizados
- **React Tooltip 5.29.1** - Tooltips informativos
- **React Toggle 4.1.3** - Controles de alternancia

### Herramientas de Desarrollo
- **ESLint 9.36.0** - Linting de código
- **Prettier 3.6.2** - Formateo de código
- **TypeScript ESLint** - Reglas específicas para TypeScript
- **React Compiler** - Optimización automática de React

## 📁 Estructura del Proyecto

```
src/
├── features/                    # Características principales
│   ├── repository/             # Gestión de repositorios
│   │   ├── components/         # Componentes de repositorio
│   │   ├── hooks/             # Hooks personalizados
│   │   ├── styles/            # Estilos específicos
│   │   └── types/             # Tipos TypeScript
│   └── search/                # Funcionalidad de búsqueda
│       ├── components/        # Componentes de búsqueda
│       ├── hooks/            # Hooks de búsqueda
│       └── styles/           # Estilos de búsqueda
├── shared/                    # Código compartido
│   ├── api/                  # Integración con GitHub API
│   ├── hooks/               # Hooks globales
│   ├── ui/                  # Componentes UI compartidos
│   └── styles/              # Estilos globales
└── main.tsx                 # Punto de entrada
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **pnpm** (recomendado) o npm

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd RepoSearch
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configurar variables de entorno** (opcional)
   ```bash
   # Crear archivo .env.local
   echo "VITE_GITHUB_TOKEN=tu_token_de_github" > .env.local
   ```
   
   > **Nota**: Un token de GitHub aumenta el límite de requests de 60 a 5,000 por hora.

4. **Ejecutar en modo desarrollo**
   ```bash
   pnpm dev
   # o
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📜 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo
pnpm build            # Construcción para producción
pnpm preview          # Vista previa de la construcción

# Calidad de Código
pnpm lint             # Verificar código con ESLint
pnpm lint:fix         # Corregir problemas de linting
pnpm format           # Formatear código con Prettier
pnpm format:check     # Verificar formato de código
pnpm type-check       # Verificar tipos TypeScript
```

## 🎮 Uso de la Aplicación

### Búsqueda Aleatoria
- La aplicación carga automáticamente repositorios aleatorios al iniciar
- Haz clic en "🎲 Nueva Búsqueda Aleatoria" para generar nuevos resultados
- El sistema utiliza múltiples estrategias de generación de queries para diversidad

### Búsqueda Manual
1. **Búsqueda Básica**: Ingresa términos en el campo "Buscar"
2. **Filtros Avanzados**: Expande "Filtros Avanzados" para opciones adicionales:
   - **Ordenamiento**: Por relevancia, estrellas, forks, etc.
   - **Lenguaje**: Filtra por lenguaje de programación
   - **Estrellas**: Mínimo número de estrellas
   - **Fechas**: Filtros por fecha de creación o último push
   - **Organización**: Buscar en organizaciones específicas
   - **Tópicos**: Filtrar por temas específicos

### Navegación
- **Scroll Infinito**: Desplázate hacia abajo para cargar más resultados
- **Tarjetas Interactivas**: Haz clic en avatares para ver perfiles de usuario
- **Enlaces Directos**: Haz clic en el ícono de GitHub para abrir repositorios

## 🔧 Configuración Avanzada

### Personalización de Estilos
Los estilos se organizan en:
- `src/shared/styles/shared/` - Variables y estilos globales
- `src/features/*/styles/` - Estilos específicos por feature
- `tailwind.config.js` - Configuración de Tailwind CSS

### Integración con GitHub API
- **Endpoint**: `https://api.github.com/search/repositories`
- **Rate Limiting**: Manejo automático de límites de API
- **Autenticación**: Soporte opcional para tokens de GitHub
- **Timeout**: Configuración de timeout para requests

## 🎨 Características de Diseño

### Layout Masonry
- **Responsive**: Se adapta automáticamente a diferentes tamaños de pantalla
- **Animaciones**: Efectos de entrada escalonados para las tarjetas
- **Optimización**: Lazy loading de imágenes y componentes

### Componentes Reutilizables
- **Card**: Tarjeta de repositorio con información completa
- **SearchControls**: Panel de controles de búsqueda
- **LoadingSpinner**: Indicador de carga personalizado
- **ErrorMessage**: Manejo de errores con opciones de reintento

## 🔒 Gestión de Errores

### Rate Limiting
- **Detección Automática**: Identifica límites de API alcanzados
- **Información Visual**: Muestra tiempo de reset y requests restantes
- **Recuperación**: Opciones para reintentar operaciones

### Manejo de Errores
- **Timeouts**: Gestión de requests que tardan demasiado
- **Fallbacks**: Estrategias de recuperación automática
- **Retry Logic**: Sistema de reintentos inteligente

## 🌐 Compatibilidad

### Navegadores Soportados
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

### Características Requeridas
- **ES2020**: Soporte para características modernas de JavaScript
- **CSS Grid**: Para layouts responsivos
- **Fetch API**: Para requests HTTP
- **Web APIs**: crypto.getRandomValues para aleatoriedad

## 📈 Optimizaciones de Rendimiento

### React
- **React Compiler**: Optimización automática de re-renders
- **useCallback**: Memoización de funciones
- **memo**: Prevención de re-renders innecesarios
- **Lazy Loading**: Carga diferida de componentes

### Bundle
- **Code Splitting**: División automática del código
- **Tree Shaking**: Eliminación de código no utilizado
- **Minificación**: Compresión de assets
- **Source Maps**: Para debugging en desarrollo

## 🤝 Contribución

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de bugs
docs: documentación
style: formato de código
refactor: refactorización
test: pruebas
chore: tareas de mantenimiento
```

### Flujo de Trabajo
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **GitHub API** por proporcionar acceso a datos de repositorios
- **React Team** por la excelente biblioteca de UI
- **Tailwind CSS** por el framework de utilidades CSS
- **Lucide** por los iconos modernos y consistentes

---

**RepoSearch** - Descubre el mundo de código abierto de GitHub de una manera completamente nueva 🚀
