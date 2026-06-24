export {};
// ============================================================
// LECCIÓN 1.7 — Tabla de Complejidades
// Cómo reconocerlas de un vistazo
// Ejecutar con: npx ts-node teoria.ts
// ============================================================

// Esta lección es un RESUMEN visual de todo el Módulo 1.
// Aquí consolidamos las 8 complejidades principales y
// aprendemos a identificarlas por el patrón del código.

// ─────────────────────────────────────────────────────────────
// Las 8 complejidades (de mejor a peor)
// ─────────────────────────────────────────────────────────────

function ejemploO1(n: number): number {
  return n * (n + 1) / 2; // Fórmula directa, sin bucles
  // Siempre 1 operación → O(1)
}

function ejemploOLogN(n: number): void {
  for (let i = 1; i < n; i *= 2) { console.log(i); }
  // i se duplica: 1, 2, 4, 8... → log₂(n) iteraciones → O(log n)
}

function ejemploORaizN(n: number): void {
  for (let i = 1; i * i <= n; i++) { console.log(i); }
  // i² ≤ n → √n iteraciones → O(√n)
}

function ejemploON(n: number): void {
  for (let i = 0; i < n; i++) { console.log(i); }
  // 1 iteración por elemento → O(n)
}

function ejemploONLogN(n: number): void {
  for (let i = 0; i < n; i++) {        // n veces
    for (let j = 1; j < n; j *= 2) {   // log n veces
      console.log(i, j);
    }
  }
  // n × log n → O(n log n)
}

function ejemploON2(n: number): void {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
  // n × n → O(n²)
}

function ejemploO2N(n: number): number {
  if (n <= 1) return n;
  return ejemploO2N(n - 1) + ejemploO2N(n - 2);
  // Fibonacci recursivo: cada llamada genera 2 más → O(2ⁿ)
}

// ─────────────────────────────────────────────────────────────
// Tabla de crecimiento (n = número de elementos)
// ─────────────────────────────────────────────────────────────
console.log("=== Crecimiento de las complejidades ===");
console.log("n\tO(1)\tO(log n)\tO(√n)\tO(n)\tO(n log n)\tO(n²)\tO(2ⁿ)");
for (const n of [1, 2, 5, 10, 20, 50, 100, 1000]) {
  const logN = Math.round(Math.log2(n));
  const raiz = Math.round(Math.sqrt(n));
  const nLogN = Math.round(n * Math.log2(n));
  const n2 = n * n;
  const dosN = n <= 20 ? 2 ** n : Infinity;
  console.log(
    `${n}\t1\t${logN}\t\t${raiz}\t${n}\t${nLogN}\t\t${n2}\t${dosN === Infinity ? "∞" : dosN}`
  );
}

// ─────────────────────────────────────────────────────────────
// Cómo reconocer cada complejidad por el código
// ─────────────────────────────────────────────────────────────
console.log("\n=== Guía rápida: Reconocer complejidades ===");

interface Ejemplo {
  codigo: string;
  complejidad: string;
  cuando: string;
}

const tabla: Ejemplo[] = [
  {
    codigo: "arr[i], sin bucles",
    complejidad: "O(1)",
    cuando: "Siempre que no haya bucles, o el bucle tenga límite fijo"
  },
  {
    codigo: "i *= 2, i /= 2, i *= k",
    complejidad: "O(log n)",
    cuando: "El índice se multiplica o divide en cada paso"
  },
  {
    codigo: "i * i <= n",
    complejidad: "O(√n)",
    cuando: "El bucle llega hasta la raíz cuadrada de n"
  },
  {
    codigo: "for (i = 0; i < n; i++)",
    complejidad: "O(n)",
    cuando: "Un solo bucle que recorre n elementos"
  },
  {
    codigo: "for i..n { for j*=2..n }",
    complejidad: "O(n log n)",
    cuando: "Bucle lineal anidado con bucle logarítmico"
  },
  {
    codigo: "for i..n { for j..n }",
    complejidad: "O(n²)",
    cuando: "Dos bucles anidados, ambos lineales"
  },
  {
    codigo: "fib(n-1) + fib(n-2)",
    complejidad: "O(2ⁿ)",
    cuando: "Recursión que se bifurca en 2 llamadas por nivel"
  },
  {
    codigo: "for i..n { for j..n { for k..n }}",
    complejidad: "O(n³)",
    cuando: "Tres bucles anidados → cúbico"
  }
];

for (const ej of tabla) {
  console.log(`${ej.complejidad.padEnd(10)} ← ${ej.codigo.padEnd(35)} → ${ej.cuando}`);
}

// ─────────────────────────────────────────────────────────────
// Datos curiosos: ¿Qué tan grande puede ser n?
// ─────────────────────────────────────────────────────────────
console.log("\n=== ¿Cuántos elementos puedo procesar en 1 segundo? ===");
console.log("(estimado en una CPU moderna, ~10⁸ operaciones/segundo)");
interface Limite {
  complejidad: string;
  maxN: string;
}
const limites: Limite[] = [
  { complejidad: "O(1)", maxN: "∞ (siempre 1 operación)" },
  { complejidad: "O(log n)", maxN: "10⁹⁰ (universo entero)" },
  { complejidad: "O(√n)", maxN: "10¹⁶" },
  { complejidad: "O(n)", maxN: "10⁸" },
  { complejidad: "O(n log n)", maxN: "~5 × 10⁶" },
  { complejidad: "O(n²)", maxN: "10⁴" },
  { complejidad: "O(n³)", maxN: "~500" },
  { complejidad: "O(2ⁿ)", maxN: "~25" },
  { complejidad: "O(n!)", maxN: "~11" },
];
for (const lim of limites) {
  console.log(`${lim.complejidad.padEnd(12)} → hasta n = ${lim.maxN}`);
}
