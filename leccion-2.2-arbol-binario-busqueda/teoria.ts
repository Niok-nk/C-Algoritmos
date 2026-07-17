export {};
// ============================================================
// LECCIÓN 2.2 — Árbol Binario de Búsqueda (BST)
// Inserción y búsqueda
// Ejecutar con: npx ts-node teoria.ts
// ============================================================

// Un BST es un árbol donde CADA nodo tiene:
//   - Un valor
//   - Un hijo IZQUIERDO (valores MENORES)
//   - Un hijo DERECHO  (valores MAYORES)
//
// Esto permite buscar en O(log n) en promedio.
//
// Visualización:
//         (8)        ← raíz
//        /   \
//     (3)    (10)    ← 3<8<10
//    /   \      \
//  (1)   (6)    (14) ← 1<3, 6>3, 14>10
//       /  \      /
//     (4) (7)  (13)
//
// Regla: izquierda < padre < derecha SIEMPRE

// ─────────────────────────────────────────────────────────────
// Casos de uso reales
// ─────────────────────────────────────────────────────────────
//
// 1. MOTORES DE BÚSQUEDA (autocompletado):
//    Cuando escribes en Google, el sistema sugiere términos
//    usando un BST. Cada letra que escribes reduce el espacio
//    de búsqueda a la mitad, como en el árbol.
//
// 2. SISTEMAS DE ARCHIVOS:
//    Algunos sistemas operativos organizan archivos en BST
//    para encontrar carpetas y archivos rápidamente por nombre.
//
// 3. BASES DE DATOS (índices simples):
//    Antes de los B-Tree (árboles balanceados), las bases de
//    datos usaban BST para indexar. Aún se usan en sistemas
//    pequeños o en memoria (in-memory databases).
//
// 4. COMPRESIÓN DE DATOS (árbol de Huffman):
//    Es un tipo de BST donde los caracteres más frecuentes
//    están más cerca de la raíz, permitiendo códigos más cortos.
//
// 5. JUEGOS (espacio de búsqueda):
//    Los bots de ajedrez usan BST para almacenar y explorar
//    movimientos posibles. Cada nodo es un tablero, las ramas
//    son los movimientos.

// ─────────────────────────────────────────────────────────────
// Implementación del BST
// ─────────────────────────────────────────────────────────────

interface NodoBST<T> {
  valor: T;
  izquierda: NodoBST<T> | null;
  derecha: NodoBST<T> | null;
  //           ↑
  //           └── null significa "no hay hijo"
}

// 📘 NOTA TYPESCRIPT — ¿Qué es una clase?
// ============================================================
//
// class es una "plantilla" para crear objetos.
// Agrupa datos (propiedades) y funciones (métodos) en una
// sola unidad. Se lee de derecha a izquierda:
//
//   class ArbolBST<T extends number | string> { ... }
//     ↑        ↑        ↑
//     └──      └──      └── "T solo puede ser number
//     "class"  nombre   o string" (restricción genérica)
//
//   "Define una plantilla llamada ArbolBST que trabaja con
//    valores numéricos o de texto."
//
// Partes de una clase:
//
// 1. PROPIEDADES (datos que guarda):
//    private raiz: NodoBST<T> | null = null;
//    ↑              ↑                   ↑
//    └── "solo      └── tipo de dato    └── valor inicial
//         accesible
//         dentro de
//         la clase"
//
// 2. MÉTODOS (funciones que hace):
//    insertar(valor: T): void { ... }
//    ↑       ↑           ↑
//    └──     └── recibe  └── "no devuelve nada"
//    "público" un dato
//    (accesible
//    desde fuera)
//
// 3. this (la palabra clave):
//    this.raiz  → "la raíz de ESTE árbol en particular"
//    this.insertarNodo() → "el método insertarNodo de ESTE objeto"
//
// 4. private vs público (por defecto):
//    private   → solo accesible DENTRO de la clase
//    (sin nada) → accesible DESDE FUERA (público)
//    Ej: arbol.insertar(8) funciona, pero arbol.raiz NO
//
// 5. new (crear un objeto a partir de la clase):
//    const arbol = new ArbolBST<number>();
//                  ↑     ↑
//                  └──   └── "crea una instancia de ArbolBST
//                  "crea  que trabaja con números"
//                   nuevo"
//
// Analogía:
//   class es como un MOLDE de galletas.
//   El molde define la forma (propiedades y métodos).
//   new crea una GALLETA (objeto real) usando ese molde.
//   Puedes hacer muchas galletas (objetos) con el mismo molde.
//
// Diferencia con interface:
//   interface → solo describe la FORMA (como un plano)
//   class     → describe la forma Y da la IMPLEMENTACIÓN
//               (tiene código ejecutable dentro)
//
// En este archivo usamos interface para describir nodos
// y class para describir el árbol completo (con sus
// métodos de insertar y buscar).

class ArbolBST<T extends number | string> {
  // ↑     ↑
  // └─ una └─ T solo puede ser number o string
  //    "clase"    (necesitamos poder comparar con < y >)

  private raiz: NodoBST<T> | null = null;
  //    ↑       ↑
  //    └─ solo └─ empieza vacío
  //       accesible
  //       dentro de
  //       la clase

  // ─────────────────────────────────────────────
  // Insertar un valor en el BST
  // ─────────────────────────────────────────────
  insertar(valor: T): void {
    const nuevoNodo: NodoBST<T> = { valor, izquierda: null, derecha: null };

    if (!this.raiz) {
      this.raiz = nuevoNodo; // Árbol vacío → el nuevo es la raíz
      return;
    }

    this.insertarNodo(this.raiz, nuevoNodo);
  }

  // ── ¿Cómo funciona insertarNodo? ─────────────────────────
  //
  // Este método privado es el CORAZÓN del BST.
  // Usa toda la estructura de la clase para ordenar:
  //
  //   1. Recibe el nodo ACTUAL (donde estamos mirando)
  //      y el nodo NUEVO (el que queremos colocar).
  //
  //   2. Compara sus valores:
  //      nuevo < actual → debe ir a la IZQUIERDA
  //      nuevo ≥ actual → debe ir a la DERECHA
  //
  //   3. Revisa si hay espacio libre en esa rama:
  //      Si NO hay hijo → coloca el nuevo aquí.
  //      Si YA hay hijo → repite el proceso (recursión)
  //        llamándose a sí mismo con ese hijo.
  //
  // ── Traza visual con insertar(6) en el árbol: ───────────
  //
  //          (8)          ← this.raiz
  //         /   \
  //       (3)   (10)
  //      /   \
  //    (1)   (?) ← 6 se compara aquí
  //
  //  insertar(6):
  //    1. ¿Árbol vacío? No (raíz = 8)
  //    2. Llama a insertarNodo(8, 6)
  //       → 6 < 8 → izquierda
  //       → ¿8.izquierda vacío? No (está 3)
  //       → insertarNodo(3, 6)  ← SE LLAMA A SÍ MISMA (recursión)
  //         → 6 < 3? No → derecha
  //         → ¿3.derecha vacío? Sí → 3.derecha = 6 ✅
  //
  //  La clase completa es la que permite esto:
  //    - this.raiz       → desde dónde empezar
  //    - nodoActual.izquierda/derecha → hacia dónde ir
  //    - this.insertarNodo() → repetir el proceso
  //
  //  Cada nodo se ordena automáticamente por comparación.
  //  No hay un "algoritmo de ordenamiento" externo.
  //  El árbol SE ORDENA SOLO al insertar.

  private insertarNodo(nodoActual: NodoBST<T>, nuevoNodo: NodoBST<T>): void {
    if (nuevoNodo.valor < nodoActual.valor) {
      // Va a la izquierda
      if (!nodoActual.izquierda) {
        nodoActual.izquierda = nuevoNodo; // Espacio libre → lo colocamos
      } else {
        this.insertarNodo(nodoActual.izquierda, nuevoNodo); // Seguir bajando
      }
    } else {
      // Va a la derecha (o es igual)
      if (!nodoActual.derecha) {
        nodoActual.derecha = nuevoNodo;
      } else {
        this.insertarNodo(nodoActual.derecha, nuevoNodo);
      }
    }
  }

  // ─────────────────────────────────────────────
  // Buscar un valor en el BST
  // ─────────────────────────────────────────────
  buscar(valor: T): boolean {
    return this.buscarNodo(this.raiz, valor);
  }

  private buscarNodo(nodo: NodoBST<T> | null, valor: T): boolean {
    if (!nodo) return false;           // No encontrado
    if (nodo.valor === valor) return true; // Encontrado
    if (valor < nodo.valor) {
      return this.buscarNodo(nodo.izquierda, valor); // Buscar izquierda
    }
    return this.buscarNodo(nodo.derecha, valor);     // Buscar derecha
  }
}

// ─────────────────────────────────────────────────────────────
// Uso del BST
// ─────────────────────────────────────────────────────────────
const arbol = new ArbolBST<number>();

console.log("=== Insertando valores: 8, 3, 10, 1, 6, 14, 4, 7, 13 ===");

// 📘 NOTA TYPESCRIPT — forEach y arrow functions (=>)
// ============================================================
//
// forEach es un método de los arreglos.
// Ejecuta una función por CADA elemento del arreglo.
//
// Se lee de derecha a izquierda:
//
//   [8, 3, 10, ...].forEach( v => arbol.insertar(v) )
//     ↑                ↑        ↑                ↑
//     "del arreglo"  "para    "toma ese      "insértalo
//                     cada     elemento"      en el árbol"
//                     elemento"
//
// Completo:
//   "Del arreglo [8,3,10,...], para cada elemento,
//    nómbralo v, e insértalo en el árbol."
//
// v => arbol.insertar(v) es una ARROW FUNCTION:
//   (parámetro) => (código a ejecutar)
//       ↑            ↑
//   "recibe v"  "ejecuta esto con v"
//
// Equivale a escribir:
//   arbol.insertar(8);
//   arbol.insertar(3);
//   arbol.insertar(10);
//   arbol.insertar(1);
//   ... (9 líneas)
//
// forEach hace eso automáticamente por cada elemento.
// Puedes leerlo como: "aplica esta función a cada elemento."
[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach(v => arbol.insertar(v));

console.log("Buscar 6:", arbol.buscar(6));   // true
console.log("Buscar 14:", arbol.buscar(14)); // true
console.log("Buscar 9:", arbol.buscar(9));   // false
console.log("Buscar 1:", arbol.buscar(1));   // true
console.log("Buscar 20:", arbol.buscar(20)); // false

// ─────────────────────────────────────────────────────────────
// Análisis de Complejidad
// ─────────────────────────────────────────────────────────────
//
// | Caso | Búsqueda | Inserción |
// |------|----------|-----------|
// | Mejor | O(1) — raíz | O(1) — raíz vacía |
// | Promedio | O(log n) | O(log n) |
// | Peor | O(n) — árbol degenerado (parece lista) | O(n) |
//
// El peor caso O(n) ocurre cuando insertas valores ORDENADOS:
//   1, 2, 3, 4, 5 → todo va a la derecha → parece una lista
// Para evitarlo, se usan árboles balanceados (Rojo-Negro, AVL).
