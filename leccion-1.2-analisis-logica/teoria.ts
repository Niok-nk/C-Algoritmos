// ============================================================
// LECCIÓN 1.2 — Análisis de Lógica Básica y Casos Extremos
// Ejecutar con: npx ts-node teoria.ts
// ============================================================

// Ya implementaste tu primer algoritmo (FizzBuzz). Pero escribir
// algoritmos va más allá de que "funcione". Un algoritmo robusto 
// maneja los "Casos Borde" (Edge Cases) y usa un flujo de control
// claro para que el código sea eficiente y fácil de leer.

// ─────────────────────────────────────────────────────────────
// Concepto 1: Retorno Temprano (Early Return)
// ─────────────────────────────────────────────────────────────

// PROBLEMA: Validar si una persona puede entrar a una montaña rusa.
// Reglas: Debe medir más de 120cm, no tener problemas cardíacos
// y tener más de 12 años.

// ❌ Lógica anidada (Pirámide del código - difícil de leer)
function puedeSubirMalo(altura: number, edad: number, enfermo: boolean): boolean {
  let resultado = false;
  if (altura > 120) {
    if (edad > 12) {
      if (!enfermo) {
        resultado = true;
      }
    }
  }
  return resultado;
}

// ✅ Retorno Temprano: Descartar los casos inválidos RÁPIDO.
// 📘 Nota TypeScript: `boolean` es un tipo de dato (true o false).
function puedeSubirBueno(altura: number, edad: number, enfermo: boolean): boolean {
  if (altura <= 120) return false;     // Filtro 1: muy bajo
  if (edad <= 12) return false;        // Filtro 2: muy joven
  if (enfermo) return false;           // Filtro 3: enfermo
  
  return true; // Si sobrevivió a todos los filtros, está OK
}

console.log("¿Puede subir? (130cm, 15 años, sano):", puedeSubirBueno(130, 15, false));

// ─────────────────────────────────────────────────────────────
// Concepto 2: Casos Borde (Edge Cases)
// ─────────────────────────────────────────────────────────────

// Un error muy común al diseñar algoritmos es asumir que siempre
// recibiremos los datos "perfectos".
// ¿Qué pasa si el número es 0 o negativo? o ¿si el arreglo está vacío?

// PROBLEMA: Encontrar el número mayor en un arreglo de números.
function encontrarMayor(nums: number[]): number {
  // CASO BORDE: Si el arreglo está vacío, no hay un "mayor".
  // Si no validamos esto, nums[0] sería 'undefined'.
  if (nums.length === 0) {
    throw new Error("El arreglo no puede estar vacío"); // Manejo del error
  }

  let mayor = nums[0]; // Asumimos inicialmente que el primero es el mayor
  
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > mayor) {
      mayor = nums[i]; // Actualizamos si encontramos uno más grande
    }
  }
  return mayor;
}

console.log("Mayor de [3, -1, 9, 2]:", encontrarMayor([3, -1, 9, 2])); // 9
// Si llamamos a encontrarMayor([]) lanzará un error controlado.
