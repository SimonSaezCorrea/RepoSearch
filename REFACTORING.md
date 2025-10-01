# Refactorización del Proyecto RepoSearch

## 📁 Nueva Estructura

```
src/
├── components/          # Componentes React
│   ├── Card/           # Componente de tarjeta
│   ├── CardGrid/       # Grid de tarjetas con Masonry
│   ├── ui/             # Componentes de UI reutilizables
│   └── index.ts        # Exportaciones de componentes
├── constants/          # Constantes y configuración
│   └── index.ts
├── hooks/              # Hooks personalizados
│   ├── useResponsiveColumns.ts
│   ├── useStaggeredAnimation.ts
│   └── index.ts
├── services/           # Servicios de datos
│   └── repositoryService.ts
├── types/              # Definiciones de TypeScript
│   └── index.ts
├── utils/              # Utilidades y helpers
│   ├── animation.ts    # Utilidades de animación
│   ├── formatters.ts   # Formateadores de datos
│   ├── cardUtils.ts    # (Archivo original - mantener compatibilidad)
│   └── datos.json
└── App.tsx
```

## 🎯 Principios Aplicados

### 1. **Separación de Responsabilidades**
- **Componentes**: Solo se encargan de la presentación
- **Hooks**: Manejan la lógica de estado y efectos
- **Services**: Gestionan los datos
- **Utils**: Funciones puras reutilizables

### 2. **Composición sobre Herencia**
- Card dividido en Header, Content, Footer
- Componentes UI pequeños y reutilizables
- Wrapper components para funcionalidad específica

### 3. **Tipado Fuerte**
- Interfaces TypeScript bien definidas
- Props tipadas explícitamente
- Tipos de datos de API separados de tipos de aplicación

### 4. **Accesibilidad (a11y)**
- Elementos semánticos apropiados (`article`, `header`, `footer`)
- ARIA labels descriptivos
- Navegación por teclado completa
- Roles ARIA apropiados

### 5. **Reutilización**
- Hooks personalizados extraíbles
- Componentes UI independientes
- Utilidades funcionales puras
- Constantes centralizadas

## 🔧 Hooks Personalizados

### `useResponsiveColumns`
```typescript
const columnCount = useResponsiveColumns();
// Retorna: 1 | 2 | 3 | 4 basado en el ancho de pantalla
```

### `useStaggeredAnimation`
```typescript
const visibleItems = useStaggeredAnimation(itemCount, getOrderFunction);
// Retorna: Set<number> con índices de elementos visibles
```

## 🎨 Componentes UI

### Componentes Atómicos
- `StarCount`: Muestra conteo de estrellas
- `UserAvatar`: Avatar del usuario con interacción
- `UserBadge`: Insignia del nombre de usuario
- `LanguageBadge`: Insignia del lenguaje de programación
- `GitHubLink`: Enlace a GitHub con icono

### Componentes Moleculares
- `Card`: Tarjeta completa compuesta por Header, Content, Footer
- `CardGrid`: Grid con animaciones y responsividad

## 📊 Tipos de Datos

### API Types
```typescript
GitHubRepository      // Datos crudos de la API
GitHubSearchResponse  // Respuesta completa de búsqueda
```

### Application Types
```typescript
ProcessedRepository      // Datos procesados para la app
ProcessedSearchResponse  // Respuesta procesada
CardProps               // Props del componente Card
```

## 🎭 Animaciones

### Sistema de Animación Escalada
- Orden horizontal respetando Masonry
- Timing configurable
- Efectos combinados (opacity + transform + scale)

## 📋 Migraciones Recomendadas

1. **Actualizar imports en App.tsx**:
```typescript
import { CardGrid } from './components';
```

2. **Usar nuevos servicios**:
```typescript
import { getRepositories } from './services/repositoryService';
```

3. **Implementar nuevos formateadores**:
```typescript
import { formatProjectName, formatNumber } from './utils/formatters';
```

## 🔄 Compatibilidad

- Los archivos originales se mantienen para compatibilidad
- Los servicios exponen las mismas funciones con nuevos nombres
- Migración gradual posible

## 🚀 Beneficios

1. **Mantenibilidad**: Código más organizado y fácil de mantener
2. **Escalabilidad**: Fácil agregar nuevas funcionalidades
3. **Testabilidad**: Componentes y funciones más fáciles de testear
4. **Reutilización**: Componentes y hooks reutilizables
5. **Performance**: Mejor separación permite optimizaciones específicas
6. **DX**: Mejor experiencia de desarrollo con tipado fuerte