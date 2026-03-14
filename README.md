# Algoritmos con TypeScript

Curso progresivo de **algoritmos y estructuras de datos** implementados en TypeScript, explicados en español desde cero.

Basado en *Algorithms Notes for Professionals* — 7 módulos, 54+ lecciones.

---

## Estructura del proyecto

```
Algoritmos/
├── agente.md                          ← Guía del agente maestro + índice del curso
├── tsconfig.json                      ← Configuración de TypeScript
├── package.json                       ← Dependencias del proyecto
└── leccion-X.X-nombre-del-tema/
    ├── teoria.ts                      ← Código explicativo con comentarios
    ├── reto.ts                        ← Ejercicio a completar (TODO)
    └── solucion.ts                    ← Se crea solo después de entregar el reto
```

## Cómo ejecutar una lección

```bash
# Entrar a la carpeta de la lección
cd leccion-1.1-que-es-un-algoritmo

# Ejecutar la teoría
npx ts-node teoria.ts

# Ejecutar el reto (una vez completado)
npx ts-node reto.ts
```

## Módulos del curso

| Módulo | Tema | Lecciones |
|--------|------|-----------|
| 1 | Fundamentos y Complejidad | 7 |
| 2 | Árboles | 8 |
| 3 | Grafos | 10 |
| 4 | Paradigmas algorítmicos | 6 |
| 5 | Algoritmos de Ordenamiento | 11 |
| 6 | Algoritmos de Búsqueda | 5 |
| 7 | Algoritmos Avanzados | 7 |

## Progreso

**0 / 54** lecciones completadas — en curso.

## Tecnologías

- **TypeScript** `^5.x`
- **ts-node** — ejecución directa de `.ts`
- **Node.js** `v22.x`
