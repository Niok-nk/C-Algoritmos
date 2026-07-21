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

    interface NodoArbol<T> {
      valor: T;
      hijos: NodoArbol<T>[];
    }


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

function crearNodo<T>(valor: T): NodoArbol<T> {
  return { valor, hijos: [] };
}



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

function agregarHijo<T>(padre: NodoArbol<T>, hijo: NodoArbol<T>): void {
  padre.hijos.push(hijo);
}

// =============================================
// PASO 4: Verifica que funciona
// =============================================
// Descomenta este código para probar los pasos 1-3:

const n1 = crearNodo(1);
const n2 = crearNodo(2);
const n3 = crearNodo(3);
agregarHijo(n1, n2);
agregarHijo(n1, n3);
console.log("PASO 4 - Prueba:");
console.log("Valor raíz:", n1.valor);            // 1
console.log("Hijos de raíz:", n1.hijos.map(h => h.valor)); // [2, 3]
 console.log("¿Pasó la prueba? Sí si ves [2, 3]");

const n4 = crearNodo(4);
const n5 = crearNodo(5);
const n6 = crearNodo(6);
agregarHijo(n2, n4);
agregarHijo(n2, n5);
agregarHijo(n3, n6);

console.log("\n=== PRUEBA FINAL ===");
console.log("Raíz:", n1.valor);
console.log("Hijos de 2:", n2.hijos.map(h => h.valor));
console.log("Hijos de 3:", n3.hijos.map(h => h.valor));
console.log("¿Es hoja el 4?", n4.hijos.length === 0);
console.log("¿Es hoja el 6?", n6.hijos.length === 0);
console.log("¿Es hoja la raíz 1?", n1.hijos.length === 0);