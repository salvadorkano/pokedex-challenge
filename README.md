# Pokedex Challenge

Aplicación móvil desarrollada con React Native, Expo y TypeScript que consume la API pública de PokéAPI para presentar un listado inicial de Pokémon y una vista de detalle con información relevante de cada elemento seleccionado.

## Descripción general

El objetivo de esta solución fue construir una aplicación móvil funcional y mantenible, priorizando una arquitectura clara, separación de responsabilidades y una base escalable para futuras extensiones.

La aplicación permite consultar los primeros 20 Pokémon, explorar su información detallada, buscar elementos por nombre o id y marcar favoritos para una navegación más rápida dentro de la sesión actual.

## Funcionalidades implementadas

- Listado inicial de los primeros 20 Pokémon obtenidos desde PokéAPI
- Visualización de nombre e imagen en cada tarjeta
- Navegación hacia pantalla de detalle
- Vista de detalle con:
  - id
  - nombre
  - imagen
  - tipos
  - habilidades
  - estadísticas
  - peso
  - altura
  - experiencia base
- Estados visuales para carga, error y datos vacíos
- Skeleton loaders para mejorar la percepción de carga
- Búsqueda local por nombre o id
- Gestión de favoritos
- Filtro para visualizar todos los elementos o únicamente favoritos

## Stack tecnológico

- React Native
- Expo
- TypeScript
- Jest

## Enfoque de arquitectura

La solución se estructuró siguiendo una organización inspirada en Clean Architecture, con el objetivo de desacoplar la lógica de negocio, el acceso a datos y la interfaz de usuario.

### Capas del proyecto

- `domain`: entidades del negocio, contratos de repositorio y casos de uso
- `data`: DTOs, mappers, data sources e implementación de repositorios
- `infrastructure`: cliente HTTP y definición de endpoints
- `presentation`: pantallas, componentes, hooks, navegación, tema y utilidades de UI
- `core`: composición de dependencias

Esta estructura permite:

- aislar reglas de negocio
- facilitar el mantenimiento
- mejorar la escalabilidad
- reducir el acoplamiento entre capas
- simplificar la sustitución de implementaciones

## Decisiones técnicas relevantes

### 1. Separación entre UI y acceso a datos

La interfaz no consume directamente la API.  
La información pasa por DTOs, mappers, repositorios y casos de uso antes de ser utilizada en la capa de presentación.

Esto permite mantener una frontera clara entre datos externos y modelos del dominio.

### 2. Uso de repositorios y casos de uso

Se definieron contratos de repositorio en la capa `domain` e implementaciones concretas en la capa `data`, lo que facilita el desacoplamiento y la evolución del proyecto.

Los casos de uso encapsulan acciones específicas como:

- obtener listado de Pokémon
- obtener detalle de un Pokémon

### 3. Inyección de dependencias

Se implementó un contenedor simple en `src/core/di/container.ts` para centralizar la construcción de las dependencias principales sin requerir librerías de terceros. 

Este enfoque permite:

- reducir acoplamiento
- mejorar organización
- facilitar reemplazo de implementaciones en futuras iteraciones

### 4. Persistencia y estrategia de caché

No se integró una librería externa de persistencia como AsyncStorage para mantener la solución alineada con el alcance y restricciones asumidas del reto.

Como alternativa, se implementó un almacenamiento en memoria para la sesión activa, permitiendo:

- reutilizar datos ya consultados
- evitar solicitudes innecesarias
- mejorar la experiencia de uso dentro de la sesión actual

La arquitectura deja preparada la sustitución de esta estrategia por persistencia real sin impactar la capa de presentación.

### 5. Tipado fuerte con TypeScript

Se utilizaron tipos explícitos para entidades, DTOs, contratos, respuestas y utilidades, con el fin de mejorar la seguridad del código, la legibilidad y la mantenibilidad.

## Estructura del proyecto

```bash
src
├── core
│   └── di
├── data
│   ├── dto
│   ├── mappers
│   ├── repositories
│   └── sources
├── domain
│   ├── entities
│   ├── repositories
│   └── use-cases
├── infrastructure
│   └── api
└── presentation
    ├── components
    ├── favorites
    ├── hooks
    ├── navigation
    ├── screens
    ├── theme
    └── utils
```

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run start
```

También se puede ejecutar con:

```bash
npm run android
npm run ios
npm run web
```

## Ejecución de pruebas

```bash
npm test
```

Actualmente se incluyen pruebas unitarias para:

- mappers
- utilidades de formato
- utilidades de manejo de errores

## Criterios priorizados en la solución

Durante el desarrollo se priorizó:

- claridad arquitectónica
- separación de responsabilidades
- componentes reutilizables
- código tipado y legible
- experiencia de usuario mediante estados visuales claros
- facilidad de mantenimiento y extensión

## Posibles mejoras futuras

- integración de persistencia local real
- soporte offline más robusto
- paginación o carga incremental
- mayor cobertura de pruebas unitarias e integración
- mejoras adicionales de accesibilidad
- refinamiento visual y animaciones

## Autor

Desarrollado por Salvador Kano como solución para assessment técnico de React Native.

## API utilizada

- [PokéAPI](https://pokeapi.co/)
