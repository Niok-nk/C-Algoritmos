export {};
// =============================================
// RETO 2.2 — Agenda Telefónica con BST
// Dificultad: 🟡 Medio
// =============================================
// Usando la clase ArbolBST de la teoría, construye
// una agenda telefónica que almacene contactos
// ordenados por nombre.
//
// Datos a insertar:
//   ("Ana", 555-101)
//   ("Carlos", 555-203)
//   ("Beatriz", 555-102)
//   ("David", 555-304)
//   ("Elena", 555-405)
//   ("Francisco", 555-506)
//
// Luego responde:
//   A) ¿Qué orden tienen los nombres en el árbol?
//   B) ¿Cuántas comparaciones necesitas para encontrar "Elena"?
//   C) ¿Y para encontrar "Ana"?
//   D) ¿Qué pasa si insertas los nombres en orden alfabético?
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

// Escribe tu código aquí:

const agenda = new ArbolBST<string>();












// Pruebas:
// console.log("Buscar Ana:", agenda.buscar("Ana"));     // true
// console.log("Buscar Elena:", agenda.buscar("Elena")); // true
// console.log("Buscar Mario:", agenda.buscar("Mario")); // false
