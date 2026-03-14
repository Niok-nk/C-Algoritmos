// ============================================================
// LECCIÓN 1.1 — ¿Qué es un Algoritmo? Problemas vs Instancias
// Ejecutar con: npx ts-node teoria.ts
// ============================================================

// Un ALGORITMO es una secuencia FINITA de instrucciones bien
// definidas que, dada una entrada, produce una salida correcta.
//
// PROBLEMA: La pregunta general. Ej: "¿Cómo ordenar una lista?"
// INSTANCIA: Un caso específico del problema.
//            Ej: ordenar [5, 3, 8, 1] es una instancia del problema
//                de ordenamiento.

// ─────────────────────────────────────────────────────────────
// Ejemplo 1: El problema de sumar — versión simple
// ─────────────────────────────────────────────────────────────

// PROBLEMA: Dado un arreglo de números, devolver su suma total.
// INSTANCIA: [1, 2, 3, 4, 5]  → esperamos 15

// 📘 Nota TypeScript: `number[]` es un arreglo de números.
// La firma `function nombre(param: Tipo): TipoRetorno` define
// el tipo de la entrada y la salida. Esto es "tipado estático".
function sumarArreglo(nums: number[]): number {
  let suma = 0;                  // Variable acumuladora
  for (const n of nums) {        // Recorrer cada elemento
    suma += n;                   // Acumular
  }
  return suma;                   // Resultado final
}

const instancia1 = [1, 2, 3, 4, 5];
console.log("Suma:", sumarArreglo(instancia1)); // → 15

// ─────────────────────────────────────────────────────────────
// Ejemplo 2: FizzBuzz — el algoritmo clásico para empezar
// ─────────────────────────────────────────────────────────────

// PROBLEMA: Para cada número del 1 al n:
//   - Si es divisible por 3  → imprimir "Fizz"
//   - Si es divisible por 5  → imprimir "Buzz"
//   - Si es divisible por 15 → imprimir "FizzBuzz"
//   - De lo contrario        → imprimir el número

// INSTANCIA: n = 15

// 📘 Nota TypeScript: `string[]` es un arreglo de cadenas.
// `String(i)` convierte un número en texto.
function fizzBuzz(n: number): string[] {
  const resultado: string[] = [];    // Arreglo vacío de strings

  for (let i = 1; i <= n; i++) {     // Bucle del 1 al n
    if (i % 15 === 0) {              // ¡Primero verificar 15!
      resultado.push("FizzBuzz");    // Múltiplo de 3 Y 5
    } else if (i % 3 === 0) {        // Solo múltiplo de 3
      resultado.push("Fizz");
    } else if (i % 5 === 0) {        // Solo múltiplo de 5
      resultado.push("Buzz");
    } else {
      resultado.push(String(i));     // Número normal como texto
    }
  }

  return resultado;
}

console.log("\nFizzBuzz del 1 al 15:");
console.log(fizzBuzz(15));
// ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

// ─────────────────────────────────────────────────────────────
// Las 4 propiedades que todo buen algoritmo debe tener:
// ─────────────────────────────────────────────────────────────
// 1. CORRECTO    → Produce la salida esperada para toda instancia
// 2. FINITO      → Termina en algún momento (no bucle infinito)
// 3. DEFINIDO    → Cada paso es claro y sin ambigüedad
// 4. ENTRADA/SALIDA → Recibe datos y produce un resultado
