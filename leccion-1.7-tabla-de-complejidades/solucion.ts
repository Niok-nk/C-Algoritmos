export {};
// =============================================
// SOLUCIÓN 1.7 — Tabla de Complejidades
// =============================================

// Fragmento 1: O(n²) — Doble bucle anidado
function fragmento1(n: number): void {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}

// Fragmento 2: O(log n) — i se duplica (i *= 2)
function fragmento2(n: number): void {
  for (let i = 1; i < n; i *= 2) {
    console.log(i);
  }
}

// Fragmento 3: O(n) — Dos bucles separados se suman, se simplifica
function fragmento3(n: number): void {
  for (let i = 0; i < n; i++) { console.log(i); }
  for (let j = 0; j < n; j++) { console.log(j); }
}

// Fragmento 4: O(n²) — Matriz n×n, doble bucle
function fragmento4(matriz: number[][]): void {
  const n = matriz.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(matriz[i][j]);
    }
  }
}

// Fragmento 5: O(log n) — Búsqueda binaria, divide a la mitad
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

// Fragmento 6: O(n + m) → O(n) si n y m son del mismo orden
function fragmento6(a: number[], b: number[]): void {
  for (const x of a) { console.log(x); }
  for (const y of b) { console.log(y); }
}

// Fragmento 7: O(1) — Límite fijo de 10 iteraciones
function fragmento7(arr: number[]): void {
  for (let i = 0; i < 10 && i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// ============================================================
// RESUMEN DEL MÓDULO 1: Guía rápida para identificar O()
// ============================================================
//
//   Sin bucles ni recursión                  → O(1)
//   i *= 2, i /= 2                           → O(log n)
//   i * i <= n                               → O(√n)
//   Un solo for hasta n                      → O(n)
//   for i..n { for j*=2..n }                 → O(n log n)
//   for i..n { for j..n }                    → O(n²)
//   for i..n { for j..n { for k..n }}        → O(n³)
//   Recursión con 2 llamadas por nivel       → O(2ⁿ)
//   Permutaciones (n! combinaciones)         → O(n!)
console.log("\n=== MÓDULO 1 COMPLETADO ===");
