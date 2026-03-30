// ============================================================
// LECCIÓN 1.3 — Complejidad Algorítmica: ¿Por qué importa la eficiencia?
// Ejecutar con: npx ts-node teoria.ts
// ============================================================

// Imagina que tienes que buscar un contacto en tu teléfono.
// Si tienes 10 contactos, buscar uno a uno tarda apenas un segundo.
// ¿Y si tienes 1,000,000 de contactos? De repente, el mismo enfoque
// puede tardar minutos. Ahí es donde la COMPLEJIDAD ALGORÍTMICA
// se vuelve crítica — nos dice cómo escala un algoritmo.

// ─────────────────────────────────────────────────────────────
// ¿Qué medimos? Operaciones, no segundos
// ─────────────────────────────────────────────────────────────

// NO medimos tiempo en segundos (depende del hardware).
// Medimos el NÚMERO DE OPERACIONES que realiza el algoritmo
// en función del tamaño de la entrada (n).

// ─────────────────────────────────────────────────────────────
// Ejemplo 1: Búsqueda Lineal — O(n)
// ─────────────────────────────────────────────────────────────

// PROBLEMA: Encontrar si un número existe en una lista.
// Estrategia: revisar uno por uno desde el inicio.

// 📘 Nota TypeScript: El tipo `number[]` es un arreglo de números.
// `indexOf` retorna -1 si no lo encuentra, o la posición si sí.
function busquedaLineal(lista: number[], objetivo: number): number {
  for (let i = 0; i < lista.length; i++) { // n iteraciones en el peor caso
    if (lista[i] === objetivo) return i;    // Encontrado
  }
  return -1; // No encontrado
}

// Si n = 10 → máximo 10 comparaciones
// Si n = 1,000,000 → máximo 1,000,000 comparaciones
// La cantidad de trabajo CRECE LINEAL con n → O(n)

// ─────────────────────────────────────────────────────────────
// Ejemplo 2: Acceso directo — O(1)
// ─────────────────────────────────────────────────────────────

// PROBLEMA: Obtener el primer elemento de una lista.
// Estrategia: acceder directamente por índice.
function obtenerPrimero(lista: number[]): number {
  return lista[0]; // 1 sola operación, no importa el tamaño de la lista
}

// Si n = 10 → 1 operación
// Si n = 1,000,000 → 1 operación
// El trabajo es CONSTANTE, no importa n → O(1)

// ─────────────────────────────────────────────────────────────
// Ejemplo 3: Doble bucle — O(n²)
// ─────────────────────────────────────────────────────────────

// PROBLEMA: Verificar si hay dos números iguales en la lista.
// Estrategia (ingenua): comparar cada elemento con todos los demás.
function tieneDuplicados(lista: number[]): boolean {
  for (let i = 0; i < lista.length; i++) {       // n veces
    for (let j = i + 1; j < lista.length; j++) { // n veces anidado
      if (lista[i] === lista[j]) return true;
    }
  }
  return false;
}

// Si n = 10 → máximo 45 comparaciones (n*(n-1)/2)
// Si n = 1,000 → máximo 499,500 comparaciones
// Si n = 10,000 → ~50,000,000 comparaciones 😱
// El trabajo CRECE CUADRÁTICO → O(n²)

// ─────────────────────────────────────────────────────────────
// Demostración visual del impacto
// ─────────────────────────────────────────────────────────────
function contarOperaciones(n: number): void {
  console.log(`\nPara n = ${n}:`);
  console.log(`  O(1)   → ${"1".padStart(12)} operaciones`);
  console.log(`  O(n)   → ${String(n).padStart(12)} operaciones`);
  console.log(`  O(n²)  → ${String(n * n).padStart(12)} operaciones`);
}

contarOperaciones(10);
contarOperaciones(1_000);
contarOperaciones(10_000);
