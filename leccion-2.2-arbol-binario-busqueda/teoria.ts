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
