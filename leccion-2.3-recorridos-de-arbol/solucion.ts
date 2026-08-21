export {};
// =============================================
// SOLUCIÓN 2.3 — Recorridos de Árbol
// Inorder · Preorder · Postorder
// + Aclaración: ¿clase o funciones?
// =============================================
//
// ─────────────────────────────────────────────
// LA PREGUNTA DEL MILLÓN
// ─────────────────────────────────────────────
//
// En teoria.ts usé una CLASE (class ArbolBST) con
// métodos insertar(), inorder(), preorder(), postorder().
//
// En reto.ts usé FUNCIONES sueltas (insertarNodo,
// crearArbol, inorder, preorder, postorder), sin clase.
//
// ¿Por qué son diferentes? ¿Cuál es la correcta?
//
//   RESPUESTA: ambas son correctas. Son dos ESTILOS
//   distintos de escribir el MISMO algoritmo.
//
// Vamos a verlo en detalle.
//
// ─────────────────────────────────────────────
// ESTILO 1: CON CLASE (lo que viste en teoria.ts)
// ─────────────────────────────────────────────
//
// Una "class" es una CAJA que guarda dos cosas juntas:
//   1. DATOS (propiedades) → en este caso: la raíz
//   2. ACCIONES (métodos)  → insertar, inorder, etc.
//
// La ventaja: el árbol SE LLEVA SU PROPIA RAÍZ
// adentro. No tienes que pasarla como parámetro
// cada vez. El estado (raíz) y las funciones que
// lo manipulan (insertar, recorrer) viven juntos.
//
// Es el estilo "Orientado a Objetos" (POO).

interface NodoBST<T> {
  valor: T;
  izquierda: NodoBST<T> | null;
  derecha: NodoBST<T> | null;
}

class ArbolBST<T extends number | string> {

  // La raíz es PROPIEDAD del árbol. Vive adentro.
  raiz: NodoBST<T> | null = null;

  // Método 1: insertar
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

  // ── Métodos de recorrido ────────────────────
  // Fíjate: usan this.raiz como valor por DEFECTO.
  // Si llamas arbol.inorder() sin argumentos,
  // recorre desde la raíz automáticamente.
  //
  // NOTA CLAVE: this.inorder(...) es lo MISMO que
  // llamar a una función inorder(...), pero "atada"
  // al objeto. this = "este árbol en particular".

  // INORDER: izquierda → raíz → derecha
  inorder(nodo: NodoBST<T> | null = this.raiz): T[] {
    if (!nodo) return [];
    return [
      ...this.inorder(nodo.izquierda),
      nodo.valor,
      ...this.inorder(nodo.derecha),
    ];
  }

  // PREORDER: raíz → izquierda → derecha
  preorder(nodo: NodoBST<T> | null = this.raiz): T[] {
    if (!nodo) return [];
    return [
      nodo.valor,
      ...this.preorder(nodo.izquierda),
      ...this.preorder(nodo.derecha),
    ];
  }

  // POSTORDER: izquierda → derecha → raíz
  postorder(nodo: NodoBST<T> | null = this.raiz): T[] {
    if (!nodo) return [];
    return [
      ...this.postorder(nodo.izquierda),
      ...this.postorder(nodo.derecha),
      nodo.valor,
    ];
  }
}

// ─────────────────────────────────────────────
// ESTILO 2: CON FUNCIONES (lo que viste en reto.ts)
// ─────────────────────────────────────────────
//
// Aquí NO hay caja. La raíz es una variable SUELTA
// que pasamos como parámetro a cada función.
//
// La ventaja: es más SIMPLE y DIRECTO. Para un
// ejercicio corto donde solo querías practicar el
// ORDEN de los recorridos, no hacía falta arrastrar
// toda la estructura de la clase. Te di resueltas
// insertarNodo y crearArbol, y te dejé SOLO los 3
// recorridos, que era el objetivo de la lección.
//
// Es el estilo "Funcional" o "procedural".

function insertarNodo<T extends number | string>(
  raiz: NodoBST<T> | null, valor: T
): NodoBST<T> {
  if (!raiz) return { valor, izquierda: null, derecha: null };
  if (valor < raiz.valor) {
    raiz.izquierda = insertarNodo(raiz.izquierda, valor);
  } else {
    raiz.derecha = insertarNodo(raiz.derecha, valor);
  }
  return raiz;
}

function crearArbol(valores: number[]): NodoBST<number> | null {
  let raiz: NodoBST<number> | null = null;
  valores.forEach(v => { raiz = insertarNodo(raiz, v); });
  return raiz;
}

function inorderFn(nodo: NodoBST<number> | null): number[] {
  if (!nodo) return [];
  return [
    ...inorderFn(nodo.izquierda),
    nodo.valor,
    ...inorderFn(nodo.derecha),
  ];
}

function preorderFn(nodo: NodoBST<number> | null): number[] {
  if (!nodo) return [];
  return [
    nodo.valor,
    ...preorderFn(nodo.izquierda),
    ...preorderFn(nodo.derecha),
  ];
}

function postorderFn(nodo: NodoBST<number> | null): number[] {
  if (!nodo) return [];
  return [
    ...postorderFn(nodo.izquierda),
    ...postorderFn(nodo.derecha),
    nodo.valor,
  ];
}

// ─────────────────────────────────────────────
// ¿EN QUÉ SE PARECEN?
// ─────────────────────────────────────────────
//
// Ponlos lado a lado. La lógica recursiva es
// EXACTAMENTE la misma. Solo cambia la sintaxis:
//
//   CLASE (método)                    FUNCIÓN (suelta)
//   ──────────────────────────────────────────────
//   this.inorder(nodo.izquierda)      inorderFn(nodo.izquierda)
//   nodo.valor                        nodo.valor
//   this.inorder(nodo.derecha)        inorderFn(nodo.derecha)
//
//   this.inorder(...)  → llama al método del MISMO objeto
//   inorderFn(...)     → llama a la función por su nombre
//
// El "this" simplemente dice "mi propia función",
// porque la función vive DENTRO del objeto.
// Fuera del objeto, se llama por su nombre.
//
// ─────────────────────────────────────────────
// ¿CUÁNDO USAR CADA UNO?
// ─────────────────────────────────────────────
//
//   ✅ CLASE: cuando quieres que los datos y sus
//      operaciones viajen JUNTOS. Ej: "tengo un
//      árbol y quiero insertarle cosas en muchos
//      lugares del programa". El árbol recuerda su
//      propia raíz.
//
//   ✅ FUNCIONES: cuando solo quieres una OPERACIÓN
//      PURA sobre datos. Ej: "pásame un nodo y te
//      devuelvo el recorrido". Simple y corto.
//
// Ambos son válidos. En este curso verás los dos,
// y en lecciones futuras (grafos, por ejemplo) usaremos
// más funciones puras, porque ahí no hay "un objeto"
// central tan claro.

// ─────────────────────────────────────────────
// PRUEBAS: ambos estilos dan el MISMO resultado
// ─────────────────────────────────────────────

const valores = [8, 3, 10, 1, 6, 14, 4, 7, 13];

// Estilo 1: clase
const arbolClase = new ArbolBST<number>();
valores.forEach(v => arbolClase.insertar(v));

console.log("=== ESTILO 1: CLASE ===");
console.log("INORDER:  ", arbolClase.inorder().join("  "));
console.log("PREORDER: ", arbolClase.preorder().join("  "));
console.log("POSTORDER:", arbolClase.postorder().join("  "));

// Estilo 2: funciones
const arbolFn = crearArbol(valores);

console.log("\n=== ESTILO 2: FUNCIONES ===");
console.log("INORDER:  ", inorderFn(arbolFn).join("  "));
console.log("PREORDER: ", preorderFn(arbolFn).join("  "));
console.log("POSTORDER:", postorderFn(arbolFn).join("  "));

// ─────────────────────────────────────────────
// RESULTADO ESPERADO (igual en ambos)
// ─────────────────────────────────────────────
// INORDER:   1  3  4  6  7  8  10  13  14
// PREORDER:  8  3  1  6  4  7  10  14  13
// POSTORDER: 1  4  7  6  3  13  14  10  8
