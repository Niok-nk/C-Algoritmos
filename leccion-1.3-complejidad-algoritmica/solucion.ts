export {}; // Aísla este archivo como módulo independiente.
// Sin esto, TypeScript trataría todas las variables de todos los archivos
// del proyecto como si estuvieran en el mismo lugar (ámbito global),
// lo que causaría errores de "variable ya declarada".

// =============================================
// SOLUCIÓN 1.3 — El Buscador de Pares
// =============================================

// ─────────────────────────────────────────────────────────────
// FIRMA DE LA FUNCIÓN — ¿Qué significa cada parte?
// ─────────────────────────────────────────────────────────────
//
//  function dosSumaFuerzaBruta(lista: number[], suma: number): [number, number] | null
//  │        │                  │      │         │      │       │                  │
//  │        │                  │      │         │      │       │                  └─ "o null"
//  │        │                  │      │         │      │       │                     Si no se
//  │        │                  │      │         │      │       │                     encontró par,
//  │        │                  │      │         │      │       │                     devolvemos null.
//  │        │                  │      │         │      │       │
//  │        │                  │      │         │      │       └─ [number, number]
//  │        │                  │      │         │      │          Una "Tupla": arreglo
//  │        │                  │      │         │      │          de exactamente 2 números.
//  │        │                  │      │         │      │          Ej: [0, 1]
//  │        │                  │      │         │      │
//  │        │                  │      │         │      └─ number → tipo del parámetro "suma"
//  │        │                  │      │         │
//  │        │                  │      │         └─ number → tipo de cada elemento del arreglo
//  │        │                  │      │
//  │        │                  │      └─ [] → indica que es un ARREGLO (no un número solo)
//  │        │                  │
//  │        │                  └─ lista → nombre del parámetro (lo elegimos nosotros)
//  │        │
//  │        └─ dosSumaFuerzaBruta → nombre de la función
//  │
//  └─ function → palabra clave para declarar una función

// ─────────────────────────────────────────────────────────────
// Versión 1: Fuerza Bruta — O(n²)
// ─────────────────────────────────────────────────────────────
function dosSumaFuerzaBruta(lista: number[], suma: number): [number, number] | null {
  // 'i' empieza en 0 (primer elemento)
  for (let i = 0; i < lista.length; i++) {
    // 'j' empieza en i+1 para no comparar un elemento consigo mismo
    // y para no repetir pares (si ya comparamos [0,1] no necesitamos [1,0])
    for (let j = i + 1; j < lista.length; j++) {
      if (lista[i] + lista[j] === suma) {
        return [i, j]; // Devolver los ÍNDICES (posiciones), no los valores
      }
    }
  }
  return null; // Si los dos bucles terminaron sin encontrar nada → null
}

// ─────────────────────────────────────────────────────────────
// Versión 2: Con Map — O(n)
// ─────────────────────────────────────────────────────────────

// ¿Qué es Map<number, number>?
// Map es como una tabla de dos columnas: CLAVE → VALOR
// Map<number, number> significa:  clave=número, valor=número
//
// Ejemplo visual del Map mientras recorremos [2, 7, 11] con suma=9:
//
//  Iteración 0: num=2, complemento=7
//    ¿Está 7 en el Map? NO
//    Guardamos: Map { 2 → 0 }   (el número 2 está en el índice 0)
//
//  Iteración 1: num=7, complemento=2
//    ¿Está 2 en el Map? SÍ → el índice guardado es 0
//    Retornamos [0, 1] ← índice del complemento, índice actual
//
//  ¡Solo 2 iteraciones! Con fuerza bruta serían 3 comparaciones.

function dosSumaEficiente(lista: number[], suma: number): [number, number] | null {
  // Creamos un Map vacío
  // Usaremos: clave = el número de la lista, valor = su índice (posición)
  const visto = new Map<number, number>();
  //    │        │    │   │       │
  //    │        │    │   │       └─ tipo del VALOR que guardamos (el índice)
  //    │        │    │   └─ tipo de la CLAVE que guardamos (el número de la lista)
  //    │        │    └─ Map → la clase/estructura de datos
  //    │        └─ new → crea una instancia nueva (un Map vacío)
  //    └─ const → variable que no se puede reasignar
  //               (visto siempre apuntará a este Map, aunque el Map cambie internamente)

  for (let i = 0; i < lista.length; i++) {
    const num = lista[i];        // El número en la posición i
    const complemento = suma - num; // ¿Qué número necesito para llegar a 'suma'?
    //  Si suma=9 y num=2 → complemento=7
    //  Si suma=9 y num=7 → complemento=2

    if (visto.has(complemento)) {
      // .has(clave) → pregunta si la clave existe en el Map. Devuelve true/false.
      // Si el complemento ya fue guardado antes, encontramos el par.

      return [visto.get(complemento)!, i];
      //       │    │   │             │   └─ i → índice actual (el número que acabamos de revisar)
      //       │    │   │             │
      //       │    │   │             └─ ! (Operador Non-Null Assertion)
      //       │    │   │               TypeScript no sabe si .get() puede devolver 'undefined'.
      //       │    │   │               Pero NOSOTROS sabemos que existe porque justo antes
      //       │    │   │               verificamos con .has() que sí está en el Map.
      //       │    │   │               El ! le dice a TypeScript: "confía en mí, NO es undefined".
      //       │    │   │               Sin el !, TypeScript se quejaría con un error de tipo.
      //       │    │   │
      //       │    │   └─ complemento → la clave que buscamos en el Map
      //       │    │
      //       │    └─ .get(clave) → recupera el VALOR asociado a esa clave
      //       │                     En nuestro caso, el valor es el ÍNDICE del complemento
      //       │
      //       └─ visto → nuestro Map
    }

    visto.set(num, i);
    // .set(clave, valor) → guarda una entrada en el Map
    // Guardamos: "este número (num) se encuentra en la posición (i)"
    // Para usarlo en futuras iteraciones como posible complemento.
  }

  return null; // Recorrimos toda la lista y no encontramos ningún par
}

// ─────────────────────────────────────────────────────────────
// Pruebas
// ─────────────────────────────────────────────────────────────
const lista1 = [2, 7, 11, 15];
const lista2 = [3, 2, 4];
const lista3 = [1, 5, 3, 9];

console.log("--- Fuerza Bruta O(n²) ---");
console.log(dosSumaFuerzaBruta(lista1, 9));   // [0, 1]  → 2+7=9
console.log(dosSumaFuerzaBruta(lista2, 6));   // [1, 2]  → 2+4=6
console.log(dosSumaFuerzaBruta(lista3, 20));  // null    → no existe

console.log("--- Eficiente O(n) ---");
console.log(dosSumaEficiente(lista1, 9));     // [0, 1]
console.log(dosSumaEficiente(lista2, 6));     // [1, 2]
console.log(dosSumaEficiente(lista3, 20));    // null

