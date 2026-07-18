export {};
// =============================================
// PRÁCTICA: Construye tu Árbol paso a paso
// Dificultad: 🟢 Básico (guiado)
// =============================================
// Vas a construir un árbol desde CERO.
// Hay 6 pasos. Cada paso explica QUÉ escribir
// y POR QUÉ. No sigas hasta completar cada uno.
//
// Árbol a construir:
//
//        (1)
//       /   \
//    (2)     (3)
//   /   \      \
// (4)   (5)    (6)
//
// =============================================

// =============================================
// PASO 1: Define la interfaz del nodo
// =============================================
// Una interfaz describe la forma que tiene un nodo.
// Todo nodo tiene:
//   - valor: el dato que guarda (de cualquier tipo T)
//   - hijos: un arreglo de nodos hijos del mismo tipo
//
// 📘 Escribe esto:
//
//   interface NodoArbol<T> {
//     valor: T;
//     hijos: NodoArbol<T>[];
//   }
//
// 👆 Escríbelo debajo de esta línea (borra el comentario)

// [PASO 1: ESCRIBE LA INTERFAZ AQUÍ]



// =============================================
// PASO 2: Crea la función crearNodo
// =============================================
// crearNodo recibe un valor y devuelve un nodo
// con ese valor y un arreglo de hijos vacío.
//
// Pista:
//   function crearNodo<T>(valor: T): NodoArbol<T> {
//     return { valor, hijos: [] };
//   }
//
// 👆 Escríbela debajo

// [PASO 2: ESCRIBE LA FUNCIÓN crearNodo AQUÍ]



// =============================================
// PASO 3: Crea la función agregarHijo
// =============================================
// agregarHijo recibe un nodo padre y un nodo hijo,
// y agrega el hijo al arreglo de hijos del padre.
//
// Pista: usa .push()
//
//   function agregarHijo<T>(padre: NodoArbol<T>, hijo: NodoArbol<T>): void {
//     padre.hijos.push(hijo);
//   }
//
// 👆 Escríbela debajo

// [PASO 3: ESCRIBE LA FUNCIÓN agregarHijo AQUÍ]



// =============================================
// PASO 4: Verifica que funciona
// =============================================
// Descomenta este código para probar los pasos 1-3:

// const n1 = crearNodo(1);
// const n2 = crearNodo(2);
// const n3 = crearNodo(3);
// agregarHijo(n1, n2);
// agregarHijo(n1, n3);
// console.log("PASO 4 - Prueba:");
// console.log("Valor raíz:", n1.valor);            // 1
// console.log("Hijos de raíz:", n1.hijos.map(h => h.valor)); // [2, 3]
// console.log("¿Pasó la prueba? Sí si ves [2, 3]");

// Si ves "[2, 3]", pasaste los pasos 1-3. Sigue al paso 5.
// Si hay ERROR, revisa lo que escribiste en los pasos 1-3.



// =============================================
// PASO 5: Construye el árbol completo
// =============================================
// Ahora construye el árbol completo usando
// crearNodo y agregarHijo:
//
//         (1)
//        /   \
//     (2)     (3)
//    /   \      \
//  (4)   (5)    (6)
//
// Instrucciones (escribe el código debajo):
//   1. Crea la raíz con crearNodo(1)
//   2. Crea nodos 2, 3, 4, 5, 6
//   3. Conéctalos con agregarHijo
//      - 1 → 2 y 1 → 3
//      - 2 → 4 y 2 → 5
//      - 3 → 6

// [PASO 5: CONSTRUYE EL ÁRBOL AQUÍ]








// =============================================
// PASO 6: Prueba el árbol
// =============================================
// Descomenta estas pruebas para verificar:

// console.log("\n=== PRUEBA FINAL ===");
// console.log("Raíz:", raiz.valor);                     // 1
// console.log("Hijos de 2:", n2.hijos.map(h => h.valor)); // [4, 5]
// console.log("Hijos de 3:", n3.hijos.map(h => h.valor)); // [6]
// console.log("¿Es hoja el 4?", n4.hijos.length === 0);  // true
// console.log("¿Es hoja el 6?", n6.hijos.length === 0);  // true
// console.log("¿Es hoja la raíz 1?", raiz.hijos.length === 0); // false
// console.log("¡ÁRBOL COMPLETO! 🎉");

// Si todo sale bien, ¡construiste tu primer árbol
// desde cero! Ahora sabes cómo funciona cada parte.
