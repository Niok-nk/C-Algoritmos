export {};
// =============================================
// RETO 2.4 — Recorrido por Niveles (Level-Order / BFS)
// Dificultad: 🟡
// =============================================
//
// Tienes que completar el método recorridoPorNiveles()
// para que devuelva los valores del árbol visitados
// NIVEL POR NIVEL, de izquierda a derecha.
//
// Árbol de prueba:
//
//          (8)
//         /   \
//       (3)   (10)
//      /   \      \
//    (1)   (6)    (14)
//         /   \    /
//       (4)   (7) (13)
//
// Resultado esperado:
//   LEVEL-ORDER: 8  3  10  1  6  14  4  7  13
//
// Recuerda la estrategia: usa una COLA (FIFO).
//   - Empieza la cola con la raíz.
//   - Mientras la cola no esté vacía:
//       1. Saca el primero (shift)
//       2. Registra su valor
//       3. Encola sus hijos (izquierda, luego derecha)
// =============================================

// ── No toques esta parte ─────────────────────
interface NodoBST<T> {
  valor: T;
  izquierda: NodoBST<T> | null;
  derecha: NodoBST<T> | null;
}

class ArbolBST<T extends number | string> {

  raiz: NodoBST<T> | null = null;

  insertar(valor: T): void {
    const nuevo: NodoBST<T> = { valor, izquierda: null, derecha: null };
    if (!this.raiz) {
      this.raiz = nuevo;
      return;
    }
    this.insertarNodo(this.raiz, nuevo);
  }

  private insertarNodo(actual: NodoBST<T>, nuevo: NodoBST<T>): void {
    if (nuevo.valor < actual.valor) {
      if (!actual.izquierda) {
        actual.izquierda = nuevo;
      } else {
        this.insertarNodo(actual.izquierda, nuevo);
      }
    } else {
      if (!actual.derecha) {
        actual.derecha = nuevo;
      } else {
        this.insertarNodo(actual.derecha, nuevo);
      }
    }
  }

  // =============================================
  // TU TAREA: completa este método
  // =============================================
  //
  // Pistas:
  //   - Si no hay raíz, devuelve []
  //   - Crea una cola: const cola: NodoBST<T>[] = [this.raiz]
  //   - Usa while (cola.length > 0) { ... }
  //   - const nodo = cola.shift()!  (el ! le dice a
  //     TypeScript "aquí sí hay valor")
  //   - Registra nodo.valor en el resultado
  //   - Encola hijos con cola.push(...)
  //
  // 📝 El método debe devolver T[] (arreglo de valores).
  // ─────────────────────────────────────────────

  recorridoPorNiveles(): T[] {
    // TODO: implementa aquí el recorrido por niveles

  }
}
// ─────────────────────────────────────────────

// ── Pruebas (no toques) ──────────────────────
const arbol = new ArbolBST<number>();
[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach(v => arbol.insertar(v));

console.log("LEVEL-ORDER:", arbol.recorridoPorNiveles().join("  "));
// Esperado: 8  3  10  1  6  14  4  7  13
