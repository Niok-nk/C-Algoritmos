export {};
// =============================================
// SOLUCIÓN 1.5 — Clasificador de Notaciones
// =============================================

// ============================================================
// FUNCIÓN A: encontrarMaximo — Θ(n)
// ============================================================
//
// ¿Por qué Θ(n)?
//   O  (Big-O) → n: el peor caso es recorrer n elementos
//   Ω  (Omega) → n: el mejor caso TAMBIÉN es n elementos
//   ¿Por qué? Aunque el máximo esté en arr[0], el for igual
//   recorre todo el arreglo. No puede "saber" que ya encontró
//   el máximo hasta revisar todos. Así que SIEMPRE da n pasos.
//   Como O = Ω = n → Θ(n).
//
// Explicación del código:
//   1. Si el arreglo está vacío, lanzamos error (no hay máximo)
//   2. Asumimos que arr[0] es el máximo inicial
//   3. Empezamos desde i=1 (el índice 0 ya lo tenemos)
//   4. Si encontramos un número mayor, actualizamos
//   5. Al final, devolvemos el máximo encontrado
function encontrarMaximo(arr: number[]): number {
  if (arr.length === 0) throw new Error("Arreglo vacío");
  let maximo = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maximo) {
      maximo = arr[i];
    }
  }
  return maximo;
}

// ============================================================
// FUNCIÓN B: estaOrdenado — O(n), Ω(1), NO Θ
// ============================================================
//
// ¿Por qué NO es Θ?
//   O (Big-O) → n: peor caso (todo ordenado) → recorrer todo
//   Ω (Omega) → 1: mejor caso (desorden al inicio) → 1 paso
//   Θ requiere que O y Ω sean iguales. 1 ≠ n → NO es Θ.
//
// Explicación del código:
//   1. Si está vacío, por definición está ordenado → true
//   2. Recorremos comparando CADA elemento con el ANTERIOR
//   3. Si arr[i-1] > arr[i] → desordenado → return false
//   4. Si terminamos el for sin problema → return true
//
// ¿Por qué arr[i-1] > arr[i] y no al revés?
//   Queremos detectar cuando un elemento es MENOR que el anterior.
//   Ej: [1, 5, 3, 8] → en i=2: arr[1]=5 > arr[2]=3 → false ✅
//      [1, 3, 5, 8] → nunca se cumple → true ✅
function estaOrdenado(arr: number[]): boolean {
  if (arr.length === 0) return true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

// ============================================================
// FUNCIÓN C: esTheta — Determina si Θ aplica
// ============================================================
//
// La lógica es simple: si Ω y O tienen el mismo valor,
// entonces el algoritmo SIEMPRE da esa cantidad de pasos → Θ.
// Si son diferentes, no se puede usar Θ.
function esTheta(omega: string, o: string): string {
  if (omega === o) {
    return `Θ(${omega})`;
  }
  return `No es Θ (Ω = ${omega}, O = ${o}, son diferentes)`;
}

// ============================================================
// RESUMEN: ¿Cuándo usar cada notación?
// ============================================================
//
// Usa O  cuando quieras decir "como máximo esto"
// Usa Ω  cuando quieras decir "como mínimo esto"
// Usa Θ  SOLO cuando el mejor y peor caso sean iguales
//
// ┌──────────────────────┬──────┬──────┬──────┐
// │ Algoritmo            │ O    │ Ω    │ ¿Θ? │
// ├──────────────────────┼──────┼──────┼──────┤
// │ encontrarMaximo      │ n    │ n    │ Θ(n) │
// │ estaOrdenado         │ n    │ 1    │ No   │
// │ Sumar arreglo        │ n    │ n    │ Θ(n) │
// │ Búsqueda Lineal      │ n    │ 1    │ No   │
// │ Búsqueda Binaria     │ log n│ 1    │ No   │
// │ Primer elemento      │ 1    │ 1    │ Θ(1) │
// └──────────────────────┴──────┴──────┴──────┘

// ============================================================
// PRUEBAS
// ============================================================
console.log("=== encontrarMaximo Θ(n) ===");
console.log(encontrarMaximo([3, 7, 2, 9, 5])); // 9
console.log(encontrarMaximo([-5, -2, -10]));   // -2
console.log(encontrarMaximo([100]));            // 100

console.log("\n=== estaOrdenado (O(n), Ω(1), NO Θ) ===");
console.log(estaOrdenado([1, 3, 5, 8]));  // true
console.log(estaOrdenado([1, 5, 3, 8]));  // false
console.log(estaOrdenado([3]));            // true
console.log(estaOrdenado([]));             // true

console.log("\n=== esTheta ===");
console.log("Ω(1), O(n):", esTheta("1", "n"));
console.log("Ω(n), O(n):", esTheta("n", "n"));
console.log("Ω(1), O(1):", esTheta("1", "1"));
console.log("Ω(1), O(log n):", esTheta("1", "log n"));
console.log("Ω(n²), O(n²):", esTheta("n²", "n²"));
