// =============================================
// RETO 1.3 — El Buscador de Pares
// Dificultad: 🟡 Medio
// =============================================
// Dado un arreglo de números y un número objetivo "suma",
// encuentra si existen DOS elementos cuya suma sea exactamente
// igual al objetivo. Devuelve sus ÍNDICES como [i, j].
// Si no existen, devuelve null.
//
// Hay dos formas de resolver esto:
//   1. Fuerza bruta → revisa todos los pares posibles (O(n²))
//   2. Eficiente    → usa un Map para recordar lo que has visto (O(n))
//
// Debes implementar AMBAS y luego comparar.
//
// Ejemplo:
//   lista = [2, 7, 11, 15], suma = 9
//   → [0, 1] porque lista[0] + lista[1] = 2 + 7 = 9
//
// Restricciones:
//   - Cada índice solo se puede usar una vez (no usar el mismo elemento dos veces)
//   - Devuelve los índices del primer par que encuentres
// =============================================

// 📘 Nota TypeScript: `[number, number] | null` significa que la función
// retorna un arreglo de exactamente 2 números, O null si no hay solución.

// TODO: Versión 1 - Fuerza bruta O(n²)
function dosSumaFuerzaBruta(lista: number[], suma: number): [number, number] | null {

}

// TODO: Versión 2 - Usando Map O(n)
// Pista: para cada número num en la lista, calcula su "complemento" = suma - num
//        Si el complemento YA EXISTE en el Map, encontraste el par.
//        Si no, guarda num en el Map y continúa.
function dosSumaEficiente(lista: number[], suma: number): [number, number] | null {

}

// Pruebas:
const lista1 = [2, 7, 11, 15];
const lista2 = [3, 2, 4];
const lista3 = [1, 5, 3, 9];

console.log("--- Fuerza Bruta ---");
console.log(dosSumaFuerzaBruta(lista1, 9));   // esperado: [0, 1]
console.log(dosSumaFuerzaBruta(lista2, 6));   // esperado: [1, 2]
console.log(dosSumaFuerzaBruta(lista3, 20));  // esperado: null

console.log("--- Eficiente ---");
console.log(dosSumaEficiente(lista1, 9));     // esperado: [0, 1]
console.log(dosSumaEficiente(lista2, 6));     // esperado: [1, 2]
console.log(dosSumaEficiente(lista3, 20));    // esperado: null
