export {};
// =============================================
// RETO 1.7 — Clasificador de Complejidades
// Dificultad: 🟢 Básico
// =============================================
// Para cada fragmento de código, determina su
// complejidad Big-O y escríbela en el comentario.
//
// ─────────────────────────────────────────────
// EJEMPLO:
//   for (let i = 0; i < n; i++) { ... }
//   Complejidad: O(n)
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// FRAGMENTO 1
// ─────────────────────────────────────────────
// TODO: anota la complejidad
// Complejidad: O(???)
function fragmento1(n: number): void {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}

// ─────────────────────────────────────────────
// FRAGMENTO 2
// ─────────────────────────────────────────────
// TODO: anota la complejidad
// Complejidad: O(???)
function fragmento2(n: number): void {
  for (let i = 1; i < n; i *= 2) {
    console.log(i);
  }
}

// ─────────────────────────────────────────────
// FRAGMENTO 3
// ─────────────────────────────────────────────
// TODO: anota la complejidad
// Complejidad: O(???)
function fragmento3(n: number): void {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
  for (let j = 0; j < n; j++) {
    console.log(j);
  }
}

// ─────────────────────────────────────────────
// FRAGMENTO 4 — Arreglo bidimensional (matriz)
// Recibe una matriz cuadrada de n × n
// ─────────────────────────────────────────────
// TODO: anota la complejidad
// Complejidad: O(???)
function fragmento4(matriz: number[][]): void {
  const n = matriz.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(matriz[i][j]);
    }
  }
}

// ─────────────────────────────────────────────
// FRAGMENTO 5 — Búsqueda binaria
// Recibe un arreglo ORDENADO y un objetivo
// ─────────────────────────────────────────────
// TODO: anota la complejidad
// Complejidad: O(???)
function fragmento5(arr: number[], objetivo: number): number {
  let inicio = 0;
  let fin = arr.length - 1;
  while (inicio <= fin) {
    const medio = Math.floor((inicio + fin) / 2);
    if (arr[medio] === objetivo) return medio;
    if (arr[medio] < objetivo) inicio = medio + 1;
    else fin = medio - 1;
  }
  return -1;
}

// ─────────────────────────────────────────────
// FRAGMENTO 6 — Bucles independientes
// Un arreglo de tamaño n, otro de tamaño m
// ─────────────────────────────────────────────
// TODO: anota la complejidad
// Complejidad: O(???)
function fragmento6(a: number[], b: number[]): void {
  for (const x of a) { console.log(x); }
  for (const y of b) { console.log(y); }
}

// ─────────────────────────────────────────────
// FRAGMENTO 7 — Bucle con límite fijo
// ─────────────────────────────────────────────
// TODO: anota la complejidad
// Complejidad: O(???)
function fragmento7(arr: number[]): void {
  for (let i = 0; i < 10 && i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// Pruebas (no modificarlas):
console.log("--- Fragmento 1 ---");
fragmento1(3);

console.log("\n--- Fragmento 2 ---");
fragmento2(20);

console.log("\n--- Fragmento 3 ---");
fragmento3(3);

console.log("\n--- Fragmento 4 ---");
fragmento4([[1, 2], [3, 4]]);

console.log("\n--- Fragmento 5 ---");
console.log(fragmento5([1, 3, 5, 7, 9], 5));

console.log("\n--- Fragmento 6 ---");
fragmento6([1, 2], [3, 4, 5]);

console.log("\n--- Fragmento 7 ---");
fragmento7([1, 2, 3, 4, 5]);
