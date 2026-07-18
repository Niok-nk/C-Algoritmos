export {};
// =============================================
// SOLUCIÓN 2.2 — Agenda Telefónica con BST
// =============================================

interface NodoBST<T> {
  valor: T;
  izquierda: NodoBST<T> | null;
  derecha: NodoBST<T> | null;
}

class ArbolBST<T extends number | string> {
  private raiz: NodoBST<T> | null = null;

  insertar(valor: T): void {
    const nuevoNodo: NodoBST<T> = { valor, izquierda: null, derecha: null };
    if (!this.raiz) {
      this.raiz = nuevoNodo;
      return;
    }
    this.insertarNodo(this.raiz, nuevoNodo);
  }

  private insertarNodo(padre: NodoBST<T>, nuevo: NodoBST<T>): void {
    if (nuevo.valor < padre.valor) {
      if (!padre.izquierda) padre.izquierda = nuevo;
      else this.insertarNodo(padre.izquierda, nuevo);
    } else {
      if (!padre.derecha) padre.derecha = nuevo;
      else this.insertarNodo(padre.derecha, nuevo);
    }
  }

  buscar(valor: T): boolean {
    return this.buscarNodo(this.raiz, valor);
  }

  private buscarNodo(nodo: NodoBST<T> | null, valor: T): boolean {
    if (!nodo) return false;
    if (nodo.valor === valor) return true;
    if (valor < nodo.valor) return this.buscarNodo(nodo.izquierda, valor);
    return this.buscarNodo(nodo.derecha, valor);
  }
}

// ─────────────────────────────────────────────
// Agenda telefónica con BST
// ─────────────────────────────────────────────
const agenda = new ArbolBST<string>();

["Ana", "Carlos", "Beatriz", "David", "Elena", "Francisco"]
  .forEach(v => agenda.insertar(v));

// ── Árbol resultante ─────────────────────────
//
//            (Ana)
//               \
//            (Carlos)
//             /
//        (Beatriz)
//               \
//             (David)
//                 \
//               (Elena)
//                    \
//                (Francisco)
//
// ¿Por qué parece una lista hacia la derecha?
//   "Ana" < "Carlos" < "Beatriz" < "David"
//   No, espera: "Ana" es raíz. "Carlos" > "Ana" → derecha.
//   "Beatriz" < "Carlos" → izquierda de Carlos.
//
//   CORRECCIÓN:
//            (Ana)
//               \
//             (Carlos)
//              /
//         (Beatriz)
//               \
//             (David)
//                 \
//               (Elena)
//                    \
//                (Francisco)
//
// A) El orden de inserción importa: Ana (raíz), Carlos→derecha,
//    Beatriz→izquierda de Carlos, David→derecha de Beatriz, etc.
//
// B) Para encontrar "Elena": Ana→Carlos→Beatriz→David→Elena = 5 comparaciones
// C) Para encontrar "Ana": 1 comparación (es la raíz)
// D) Si insertas en orden alfabético A→F, todo va a la derecha
//    y el árbol degenera en una lista O(n).

// Pruebas:
console.log("Buscar Ana:", agenda.buscar("Ana"));     // true
console.log("Buscar Elena:", agenda.buscar("Elena")); // true
console.log("Buscar Mario:", agenda.buscar("Mario")); // false
