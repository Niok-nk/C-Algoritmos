export {};
// ============================================================
// LECCIÓN 1.6 — Análisis de Bucles
// ¿Cuántas veces corre tu código?
// Ejecutar con: npx ts-node teoria.ts
// ============================================================

// En las lecciones anteriores viste que la complejidad depende
// de cuántas veces se ejecutan las operaciones clave.
// Ahora aprenderemos a CONTAR esas iteraciones con precisión.
//
// Regla de oro: busca los BUCLES. Son ellos los que multiplican
// el trabajo. Cada bucle anidado multiplica las iteraciones.

// ─────────────────────────────────────────────────────────────
// Caso 1: Bucle simple — O(n)
// ─────────────────────────────────────────────────────────────
// Un solo for que recorre n elementos → n iteraciones.
function imprimirArreglo(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // 1 operación, n veces
  }
}
// Conteo: n iteraciones → O(n)
console.log("Caso 1: Un bucle simple → O(n)");

// ─────────────────────────────────────────────────────────────
// Caso 2: Dos bucles separados — O(n + m)
// ─────────────────────────────────────────────────────────────
// Dos for INDEPENDIENTES (no anidados) → se SUMAN.
function procesarDosArreglos(a: number[], b: number[]): void {
  for (const x of a) { console.log(x); }  // n veces
  for (const y of b) { console.log(y); }  // m veces
}
// Conteo: n + m iteraciones → O(n + m)
// Se simplifica a O(n) si n y m son del mismo orden.
console.log("Caso 2: Bucles separados → O(n + m)");

// ─────────────────────────────────────────────────────────────
// Caso 3: Bucle anidado (doble for) — O(n × m)
// ─────────────────────────────────────────────────────────────
// Un for DENTRO de otro → las iteraciones se MULTIPLICAN.
function imprimirPares(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {       // n veces
    for (let j = 0; j < arr.length; j++) {     // n veces
      console.log(`(${arr[i]}, ${arr[j]})`);   // n × n = n²
    }
  }
}
// Conteo: n × n = n² iteraciones → O(n²)
console.log("Caso 3: Bucle anidado → O(n²)");

// ─────────────────────────────────────────────────────────────
// Caso 4: Bucle que se reduce a la mitad — O(log n)
// ─────────────────────────────────────────────────────────────
// No todos los bucles avanzan de 1 en 1.
// Si el índice se MULTIPLICA o DIVIDE, la complejidad cambia.
function potenciasDeDos(hasta: number): void {
  for (let i = 1; i < hasta; i *= 2) {  // i se duplica: 1, 2, 4, 8, 16...
    console.log(i);
  }
}
// Conteo: log₂(n) iteraciones → O(log n)
// Para n=1000: i=1,2,4,8,16,32,64,128,256,512 → 10 iteraciones
console.log("\nCaso 4: i *= 2 → O(log n)");
potenciasDeDos(1000);

// ─────────────────────────────────────────────────────────────
// Caso 5: Bucle que avanza de a √n — O(√n)
// ─────────────────────────────────────────────────────────────
function divisoresHastaRaiz(n: number): void {
  for (let i = 1; i * i <= n; i++) {  // i² ≤ n → √n iteraciones
    console.log(i);
  }
}
// Para n=100: i=1,2,3,4,5,6,7,8,9,10 → 10 iteraciones (√100 = 10)
console.log("\nCaso 5: i² ≤ n → O(√n)");
divisoresHastaRaiz(100);

// ─────────────────────────────────────────────────────────────
// Caso 6: Bucle con constante — O(1)
// ─────────────────────────────────────────────────────────────
// Aunque haya un bucle, si el número de iteraciones es FIJO
// (no depende de n), sigue siendo O(1).
function imprimirPrimeros10(arr: number[]): void {
  const limite = Math.min(10, arr.length);
  for (let i = 0; i < limite; i++) {  // máximo 10, sin importar n
    console.log(arr[i]);
  }
}
// Conteo: máximo 10 iteraciones → O(1)
console.log("\nCaso 6: Bucle con límite fijo → O(1)");

// ─────────────────────────────────────────────────────────────
// Tabla resumen: Cómo reconocer cada complejidad por el bucle
// ─────────────────────────────────────────────────────────────
console.log("\n=== Reconocer complejidad por el bucle ===");
console.log("for (i = 0; i < n; i++)         → O(n)    (lineal)");
console.log("for (i = 0; i < n; i++)          → O(n²)   (cuadrático)");
console.log("  for (j = 0; j < n; j++)        → (anidado)");
console.log("for (i = 1; i < n; i *= 2)      → O(log n) (logarítmico)");
console.log("for (i = n; i > 1; i /= 2)      → O(log n) (logarítmico)");
console.log("for (i = 1; i*i ≤ n; i++)       → O(√n)   (raíz)");
console.log("for (i = 0; i < 10; i++)        → O(1)    (constante)");
console.log("for (i = 0; i < n; i++)          → O(n log n) (linerog.)");
console.log("  for (j = 1; j < n; j *= 2)    → (n × log n)");
