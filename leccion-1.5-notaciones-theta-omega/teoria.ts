export {};
// ============================================================
// LECCIÓN 1.5 — Notaciones Big-Theta y Big-Omega
// Límites superior e inferior de un algoritmo
// Ejecutar con: npx ts-node teoria.ts
// ============================================================

// En la lección 1.4 aprendiste Big-O (O), que mide el PEOR caso.
// Pero un algoritmo no siempre se comporta igual:
//   - A veces termina rapidísimo (mejor caso)
//   - A veces tarda muchísimo (peor caso)
//   - Casi siempre está en algún punto intermedio (caso promedio)
//
// Por eso existen TRES notaciones:
//
//   O (Big-O)     → Límite SUPERIOR → "nunca será peor que esto"
//   Ω (Big-Omega) → Límite INFERIOR → "nunca será mejor que esto"
//   Θ (Big-Theta) → Límite ESTRICTO → "siempre es exactamente esto"
//                    (solo cuando el mejor y peor caso son iguales)

// ─────────────────────────────────────────────────────────────
// Analogía: El ascensor del edificio
// ─────────────────────────────────────────────────────────────
//
// Imagina que trabajas en un edificio de 100 pisos y esperas
// el ascensor en el piso 1.
//
//   O  (Big-O): "Como máximo, el ascensor tarda 100 segundos
//                en llegar" (el peor escenario posible)
//
//   Ω  (Big-Omega): "Como mínimo, tarda 1 segundo en llegar"
//                   (el mejor escenario: el ascensor ya está
//                    en tu piso)
//
//   Θ  (Big-Theta): SOLO se aplica si el ascensor SIEMPRE
//                   tarda exactamente 30 segundos, sin importar
//                   nada. Ni más, ni menos.
//
// En la mayoría de algoritmos, el mejor caso y el peor caso
// son diferentes, así que NO podemos usar Θ para describirlos.

// ─────────────────────────────────────────────────────────────
// Ejemplo 1: Búsqueda Lineal — O(n), Ω(1), NO Θ
// ─────────────────────────────────────────────────────────────
// PROBLEMA: Buscar un número en un arreglo DESORDENADO.
//
// Mejor caso (Ω): el número está en la PRIMERA posición → 1 paso
// Peor caso  (O): el número está al FINAL o no existe → n pasos
// Promedio:        ~n/2 pasos
//
// Como Ω(1) ≠ O(n), NO podemos decir Θ. Los límites son distintos.
function busquedaLineal(arr: number[], objetivo: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === objetivo) return i; // ¡Encontrado!
  }
  return -1; // No existe
}

console.log("--- Búsqueda Lineal ---");
const datos = [5, 3, 8, 1, 9, 2, 7];
console.log("Buscar 5 (primero, Ω(1)):", busquedaLineal(datos, 5));
console.log("Buscar 7 (último, O(n)):", busquedaLineal(datos, 7));

// ─────────────────────────────────────────────────────────────
// Ejemplo 2: Sumar arreglo — O(n), Ω(n), Θ(n)
// ─────────────────────────────────────────────────────────────
// PROBLEMA: Sumar todos los números de un arreglo.
//
// PIENSA: ¿Hay alguna forma de que este algoritmo termine
// en 1 paso? NO. Siempre debes recorrer TODOS los números.
// El mejor caso y el peor caso son iguales: n pasos.
//
//   Ω(n) → mínimo n pasos
//   O(n) → máximo n pasos
//   Θ(n) → siempre exactamente n pasos
//
// Cuando el mejor y peor caso son IGUALES, usamos Θ.
function sumarArreglo(arr: number[]): number {
  let suma = 0;
  for (const num of arr) {
    suma += num; // Esto se ejecuta n veces SIEMPRE
  }
  return suma;
}

console.log("\n--- Sumar Arreglo (Θ(n)) ---");
console.log("Suma de [1,2,3,4,5]:", sumarArreglo([1, 2, 3, 4, 5])); // 15

// ─────────────────────────────────────────────────────────────
// Ejemplo 3: Acceder al primer elemento — O(1), Ω(1), Θ(1)
// ─────────────────────────────────────────────────────────────
// No importa el tamaño del arreglo, siempre es 1 operación.
// Todos los casos son iguales → Θ(1).
function obtenerPrimero(arr: number[]): number {
  return arr[0]; // 1 operación, siempre
}

console.log("\n--- Acceder al primero (Θ(1)) ---");
console.log("Primero de [10,20,30]:", obtenerPrimero([10, 20, 30]));

// ─────────────────────────────────────────────────────────────
// Ejemplo 4: Búsqueda Binaria — O(log n), Ω(1), NO Θ
// ─────────────────────────────────────────────────────────────
// Requiere arreglo ORDENADO.
//
// Mejor caso (Ω): el elemento está justo en la mitad → 1 paso
// Peor caso  (O): dividimos hasta el final → log₂(n) pasos
//
// Como Ω(1) ≠ O(log n), no es Θ.
function busquedaBinaria(arr: number[], objetivo: number): number {
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

const ordenado = [1, 3, 5, 7, 9, 11, 13, 15];
console.log("\n--- Búsqueda Binaria ---");
console.log("Buscar 7 (medio, Ω(1)):", busquedaBinaria(ordenado, 7));
console.log("Buscar 15 (extremo, O(log n)):", busquedaBinaria(ordenado, 15));

// ─────────────────────────────────────────────────────────────
// Tabla comparativa
// ─────────────────────────────────────────────────────────────
console.log("\n=== Comparación de Notaciones ===");
console.log("Algoritmo\t\tΩ (mejor)\tO (peor)\t¿Es Θ?");
console.log("Busq. Lineal\t\tΩ(1)\t\tO(n)\t\tNO");
console.log("Sumar arreglo\t\tΩ(n)\t\tO(n)\t\tSÍ (Θ(n))");
console.log("Primer elemento\t\tΩ(1)\t\tO(1)\t\tSÍ (Θ(1))");
console.log("Busq. Binaria\t\tΩ(1)\t\tO(log n)\tNO");
