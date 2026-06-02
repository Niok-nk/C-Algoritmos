export {};
// =============================================
// SOLUCIÓN 1.4 — Clasificador de Complejidades
// =============================================

// ─────────────────────────────────────────────
// FUNCIÓN A: esPrimo — O(√n)
// ─────────────────────────────────────────────
// La optimización clave: solo iteramos hasta √n
// porque si n = a × b, al menos uno de los dos
// es ≤ √n. No tiene sentido buscar más allá.
function esPrimoOptimo(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;   // 2 es el único par primo
  if (n % 2 === 0) return false; // descartar pares

  for (let i = 3; i * i <= n; i += 2) { // solo impares
    if (n % i === 0) return false;
  }
  return true;
}

// ─────────────────────────────────────────────
// FUNCIÓN B: dosPunteros — O(n)
// ─────────────────────────────────────────────
// Dos punteros en los extremos se acercan
// según si la suma es menor o mayor al objetivo.
function dosPunteros(arr: number[], objetivo: number): [number, number] | null {
  let inicio = 0;
  let fin = arr.length - 1;

  while (inicio <= fin) {
    const suma = arr[inicio] + arr[fin];
    if (suma === objetivo) {
      return [arr[inicio], arr[fin]];
    } else if (suma < objetivo) {
      inicio++;  // Necesitamos suma más grande
    } else {
      fin--;     // Necesitamos suma más pequeña
    }
  }
  return null;
}

// ─────────────────────────────────────────────
// FUNCIÓN C: contarUnicos — O(n)
// ─────────────────────────────────────────────

// 📘 NOTA TYPESCRIPT — Set y .size
// =============================================
//
// ¿Qué es Set<T>?
// ----------------
// Set es una estructura de datos que almacena
// VALORES ÚNICOS. Así como un arreglo almacena
// varios elementos ordenados por índice, un Set
// almacena elementos SIN DUPLICADOS y SIN un
// orden definido (aunque en la práctica conserva
// el orden de inserción).
//
// Sintaxis: new Set<T>(iterable?)
//   - T es el tipo de los elementos (se infiere automáticamente)
//   - iterable es opcional (arreglo, string, otro Set, etc.)
//
// Ejemplos:
//   new Set([1, 2, 2, 3])  → Set { 1, 2, 3 }
//   new Set("hola")        → Set { 'h', 'o', 'l', 'a' }
//                           (las letras repetidas se ignoran)
//
// Métodos principales:
//   .add(valor)  → agrega un valor (ignorado si ya existe)
//   .has(valor)  → true/false si el valor existe
//   .delete(valor) → elimina un valor
//   .clear()     → vacía el Set
//
// ¿Qué es .size?
// --------------
// .size NO es un método, es una PROPIEDAD (como .length).
// Devuelve la CANTIDAD de elementos únicos en el Set.
// Es la forma de preguntar "¿cuántos elementos distintos hay?".
//
// Diferencia con .length de arreglos:
//   [1,2,2,3].length  → 4 (cuenta TODO, incluso duplicados)
//   new Set([1,2,2,3]).size → 3 (solo valores únicos)
//
// ¿Por qué .size y no .length?
//   Porque Set no es un arreglo, no tiene "índices".
//   La palabra .size se usa en estructuras que no son
//   secuencias indexadas: Set, Map, etc.
//
// Ejemplo visual de cómo Set elimina duplicados:
//
//   Entrada: [1, 2, 2, 3, 3, 3]
//   Set internamente:
//     add(1) → Set {1}
//     add(2) → Set {1, 2}
//     add(2) → Set {1, 2}  ← 2 ya existe, se ignora
//     add(3) → Set {1, 2, 3}
//     add(3) → Set {1, 2, 3}  ← 3 ya existe, se ignora
//     add(3) → Set {1, 2, 3}  ← 3 ya existe, se ignora
//   .size → 3
//
// Versión simplificada (1 línea):
function contarUnicos(arr: number[]): number {
  return new Set(arr).size;
}

// ─────────────────────────────────────────────
// Pruebas
// ─────────────────────────────────────────────
console.log("--- esPrimoOptimo O(√n) ---");
console.log(esPrimoOptimo(2));   // true
console.log(esPrimoOptimo(7));   // true
console.log(esPrimoOptimo(9));   // false
console.log(esPrimoOptimo(4));   // false

console.log("\n--- dosPunteros O(n) ---");
console.log(dosPunteros([1, 3, 5, 7, 9], 8));   // [1, 7]
console.log(dosPunteros([2, 4, 6, 8], 10));      // [2, 8]
console.log(dosPunteros([1, 2, 3], 10));          // null

console.log("\n--- contarUnicos O(n) ---");
console.log(contarUnicos([1, 2, 2, 3, 3, 3])); // 3
console.log(contarUnicos([5, 5, 5, 5]));        // 1
console.log(contarUnicos([1, 2, 3, 4]));        // 4
