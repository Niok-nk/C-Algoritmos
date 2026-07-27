export {};
// ============================================================
// LECCIÓN 2.3 — Recorridos de Árbol
// Inorder · Preorder · Postorder
// ============================================================
// Explicación DETALLADA de cada línea del código
// ============================================================

// ─────────────────────────────────────────────────────────────
// INTERFACE NodoBST<T>
// ─────────────────────────────────────────────────────────────
//
// "interface" define la FORMA que debe tener un objeto.
// No ejecuta código. Solo dice "un nodo del árbol se ve así".
//
//   NodoBST<T>   ← el <T> significa "de cualquier tipo"
//                    Es un GENÉRICO. T puede ser number,
//                    string, o lo que elijas al usarlo.
//
//   valor: T;
//     ↑ El nodo guarda un dato de tipo T.
//     Si creas NodoBST<number>, valor es number.
//     Si creas NodoBST<string>, valor es string.
//
//   izquierda: NodoBST<T> | null;
//     ↑ Hijo izquierdo. Puede ser OTRO nodo del mismo tipo,
//       o null si no tiene hijo izquierdo.
//     | significa "uno de estos dos": Nodo o null.
//
//   derecha: NodoBST<T> | null;
//     ↑ Hijo derecho. Misma idea.
//
// 📘 LECTURA:
//   "Una interfaz NodoBST de tipo T, que tiene:
//    una propiedad valor de tipo T,
//    una propiedad izquierda de tipo NodoBST<T> o null,
//    una propiedad derecha de tipo NodoBST<T> o null"

interface NodoBST<T> {
  valor: T;
  izquierda: NodoBST<T> | null;
  derecha: NodoBST<T> | null;
}

// ─────────────────────────────────────────────────────────────
// CLASS ArbolBST<T extends number | string>
// ─────────────────────────────────────────────────────────────
//
// "class" es una PLANTILLA para crear objetos.
// Agrupa datos (propiedades) y funciones (métodos).
//
//   ArbolBST<T extends number | string>
//     ↑         ↑
//     nombre    "T solo puede ser number o string"
//               Esto es una RESTRICCIÓN.
//               ¿Por qué? Porque dentro usamos < y >
//               para comparar valores.
//               TypeScript solo deja comparar así
//               si sabe que son números o texto.
//
// 📘 LECTURA:
//   "Una clase ArbolBST de tipo T (que solo puede ser
//    número o texto), que tiene..."

class ArbolBST<T extends number | string> {

  // ═══════════════════════════════════════════
  // PROPIEDAD: raiz
  // ═══════════════════════════════════════════
  //
  //   raiz: NodoBST<T> | null = null;
  //   ↑                             ↑
  //   nombre de la                  valor inicial: vacío
  //   propiedad
  //
  // Esto significa:
  //   "Todo ArbolBST tiene una raíz que es
  //    un nodo de tipo T, o null si el árbol
  //    está vacío. Al crear el árbol, arranca
  //    vacío (= null)."
  //
  // A diferencia de la lección 2.2, aquí la raíz
  // es PÚBLICA (no tiene private). ¿Por qué?
  // Porque los métodos de recorrido (inorder, etc.)
  // tienen un parámetro nodo que permite empezar
  // desde cualquier parte. Si quisiéramos recorrer
  // desde afuera, podemos acceder a arbol.raiz.
  //
  // null es "no hay valor". En la computadora,
  // null es un puntero que no apunta a nada.

  raiz: NodoBST<T> | null = null;

  // ═══════════════════════════════════════════
  // MÉTODO: insertar(valor)
  // ═══════════════════════════════════════════
  //
  // Recibe un valor y lo coloca en el árbol
  // siguiendo la regla del BST:
  //   menor → izquierda, mayor → derecha
  //
  //   insertar(valor: T): void {
  //                         ↑
  //                         "no devuelve nada"
  //                         void = vacío
  //
  // 📘 LECTURA:
  //   "Un método público llamado insertar, que recibe
  //    un parámetro valor de tipo T,
  //    y no devuelve nada (void)"

  insertar(valor: T): void {

    // ── Línea 1: Crear el nuevo nodo ──────────
    //
    //   const nuevo: NodoBST<T> = { valor, izquierda: null, derecha: null };
    //   ↑       ↑                ↑
    //   "crea"  nombre           objeto literal
    //           de la            con estas
    //           variable         propiedades
    //
    // { valor, izquierda: null, derecha: null }
    // Es una abreviación de JavaScript.
    // Significa: { valor: valor, izquierda: null, derecha: null }
    // Cuando la propiedad se llama IGUAL que la variable,
    // puedes escribirla una sola vez.
    //
    // El nuevo nodo arranca sin hijos (null en ambos lados).

    const nuevo: NodoBST<T> = { valor, izquierda: null, derecha: null };

    // ── Línea 2: ¿Árbol vacío? ────────────────
    //
    //   if (!this.raiz) {
    //   ↑    ↑
    //   "si" "this.raiz ES null"
    //
    // this se refiere a ESTE objeto en particular.
    // Si creas dos árboles:
    //   const a = new ArbolBST();
    //   const b = new ArbolBST();
    // this dentro de a.insertar() es a,
    // this dentro de b.insertar() es b.
    //
    // !this.raiz significa "this.raiz es null
    // o undefined". ! es negación.
    // !null = true → entramos al if.
    // !(un nodo) = false → no entramos.
    //
    // this.raiz = nuevo;
    //   El nuevo nodo se convierte en la raíz.
    //
    // return;
    //   Salimos del método. Sin esto, seguiría
    //   ejecutando this.insertarNodo() debajo.

    if (!this.raiz) {
      this.raiz = nuevo;
      return;
    }

    // ── Línea 3: Ya hay raíz → insertarNodo ───
    //
    // this.insertarNodo(this.raiz, nuevo);
    // Llama al método privado pasándole:
    //   1. La raíz actual (desde donde empezar)
    //   2. El nodo nuevo (el que hay que colocar)

    this.insertarNodo(this.raiz, nuevo);
  }

  // ═══════════════════════════════════════════
  // MÉTODO PRIVADO: insertarNodo(actual, nuevo)
  // ═══════════════════════════════════════════
  //
  // private = solo accesible DENTRO de la clase.
  // No puedes llamar a arbol.insertarNodo() desde afuera.
  //
  // Este método usa RECURSIÓN.
  // Recursión = una función que se llama a sí misma.
  //
  // ¿Por qué recursión?
  // Porque no sabemos cuántos niveles tiene el árbol.
  // Podría tener 1 nivel o 1000. La recursión permite
  // "bajar un nivel y repetir el proceso" sin saber
  // cuántas veces hay que hacerlo.
  //
  //   insertarNodo(actual: NodoBST<T>, nuevo: NodoBST<T>): void {
  //                ↑                    ↑
  //                "donde estamos        "el que queremos
  //                 mirando ahora"        colocar"
  //
  // 📘 LECTURA:
  //   "Un método privado llamado insertarNodo,
  //    que recibe un parámetro actual de tipo NodoBST<T>
  //    y un parámetro nuevo de tipo NodoBST<T>,
  //    y no devuelve nada (void)"

  private insertarNodo(actual: NodoBST<T>, nuevo: NodoBST<T>): void {

    // ── Línea 1: Comparar valores ─────────────
    //
    //   if (nuevo.valor < actual.valor) {
    //   ↑
    //   "si el nuevo es MENOR que el actual"
    //
    // Esto decide hacia dónde ir:
    //   nuevo < actual → IZQUIERDA
    //   nuevo ≥ actual → DERECHA

    if (nuevo.valor < actual.valor) {

      // ── Rama IZQUIERDA ──────────────────────
      //
      //   if (!actual.izquierda)
      //   ↑
      //   "si el actual NO tiene hijo izquierdo"
      //   (!null = true → hay espacio)
      //
      // actual.izquierda = nuevo;
      //   Coloca el nuevo nodo aquí.
      //
      //   else
      //   ↑
      //   "si YA hay un hijo izquierdo"
      //
      // this.insertarNodo(actual.izquierda, nuevo);
      //   REPITE el proceso con ese hijo.
      //   La función SE LLAMA A SÍ MISMA.
      //   Esto es la RECURSIÓN.
      //   Baja un nivel y vuelve a preguntar.

      if (!actual.izquierda) {
        actual.izquierda = nuevo;
      } else {
        this.insertarNodo(actual.izquierda, nuevo);
      }

    } else {

      // ── Rama DERECHA ────────────────────────
      // Misma lógica que arriba pero a la derecha.
      // Si nuevo ≥ actual, va a la derecha.

      if (!actual.derecha) {
        actual.derecha = nuevo;
      } else {
        this.insertarNodo(actual.derecha, nuevo);
      }
    }
  }

  // ═══════════════════════════════════════════
  // MÉTODO: inorder(nodo)
  // ═══════════════════════════════════════════
  //
  // INORDER = izquierda → raíz → derecha
  //
  //   inorder(nodo: NodoBST<T> | null = this.raiz): T[] {
  //           ↑                              ↑           ↑
  //           parámetro:                     valor por   devuelve
  //           un nodo o null                 defecto:    un arreglo
  //                                           la raíz    de tipo T
  //
  // = this.raiz es un valor por DEFECTO.
  // Si llamas arbol.inorder() sin argumentos,
  // automáticamente usa this.raiz como nodo inicial.
  // También puedes llamar arbol.inorder(algúnNodo)
  // para recorrer desde cualquier parte.
  //
  // T[] significa "arreglo de valores tipo T".
  // Si T es number, devuelve number[].
  // Si T es string, devuelve string[].
  //
  // 📘 LECTURA:
  //   "Un método público llamado inorder,
  //    que recibe un parámetro nodo de tipo NodoBST<T> o null
  //    (por defecto es this.raiz si no se pasa nada),
  //    y devuelve un arreglo de tipo T (T[])"

  inorder(nodo: NodoBST<T> | null = this.raiz): T[] {

    // ── Caso base: null → arreglo vacío ───────
    //
    //   if (!nodo) return [];
    //   ↑           ↑      ↑
    //   "si nodo   "entonces  "devuelve arreglo
    //    es null"   devuelve"  vacío"
    //
    // Este es el CASO BASE de la recursión.
    // Sin esto, la recursión sería INFINITA.
    // Cuando llegamos a un nodo que no existe
    // (null), dejamos de llamarnos y devolvemos [].

    if (!nodo) return [];

    // ── Cuerpo: izquierda → yo → derecha ──────
    //
    // return [
    //   ...this.inorder(nodo.izquierda),  // 1
    //   nodo.valor,                        // 2
    //   ...this.inorder(nodo.derecha),    // 3
    // ];
    //
    // Los CORCHETES [] crean un arreglo nuevo.
    // Dentro ponemos 3 cosas separadas por coma:
    //
    //   1. ...this.inorder(nodo.izquierda)
    //      ... es el OPERADOR SPREAD.
    //      Significa "expande este arreglo aquí".
    //      this.inorder(...) devuelve un arreglo.
    //      ... lo DESPARMA y pone cada elemento
    //      individual en el arreglo nuevo.
    //
    //      Ejemplo:
    //        const a = [1, 2];
    //        const b = [...a, 3];
    //        // b = [1, 2, 3]
    //
    //      this.inorder(nodo.izquierda) llama
    //      al método CON EL HIJO IZQUIERDO.
    //      Es RECURSIÓN: baja un nivel.
    //
    //   2. nodo.valor
    //      El valor de ESTE nodo.
    //
    //   3. ...this.inorder(nodo.derecha)
    //      Lo mismo pero con el hijo derecho.
    //
    // El ORDEN de estas 3 cosas determina
    // el tipo de recorrido.
    //
    // Aquí: izquierda → YO → derecha = INORDER

    return [
      ...this.inorder(nodo.izquierda),
      nodo.valor,
      ...this.inorder(nodo.derecha),
    ];
  }

  // ═══════════════════════════════════════════
  // MÉTODO: preorder(nodo)
  // ═══════════════════════════════════════════
  //
  // PREORDER = raíz → izquierda → derecha
  //
  // La ÚNICA DIFERENCIA con inorder es que
  // nodo.valor va al PRINCIPIO.
  //
  //   [nodo.valor, ...izquierda, ...derecha]
  //
  // 📘 LECTURA:
  //   "Un arreglo que tiene primero mi valor,
  //    luego todos los valores del subárbol izquierdo,
  //    luego todos los valores del subárbol derecho"

  preorder(nodo: NodoBST<T> | null = this.raiz): T[] {
    if (!nodo) return [];
    return [
      nodo.valor,
      ...this.preorder(nodo.izquierda),
      ...this.preorder(nodo.derecha),
    ];
  }

  // ═══════════════════════════════════════════
  // MÉTODO: postorder(nodo)
  // ═══════════════════════════════════════════
  //
  // POSTORDER = izquierda → derecha → raíz
  //
  // nodo.valor va al FINAL.
  //
  //   [...izquierda, ...derecha, nodo.valor]

  postorder(nodo: NodoBST<T> | null = this.raiz): T[] {
    if (!nodo) return [];
    return [
      ...this.postorder(nodo.izquierda),
      ...this.postorder(nodo.derecha),
      nodo.valor,
    ];
  }
}

// ─────────────────────────────────────────────────────────────
// Las 3 funciones son IDÉNTICAS excepto por 1 línea:
// la posición de nodo.valor.
//
//   inorder:   [...izquierda,  nodo.valor,  ...derecha]
//   preorder:  [nodo.valor,  ...izquierda,  ...derecha]
//   postorder: [...izquierda,  ...derecha,  nodo.valor]
//
// La RECURSIÓN hace que "izquierda" y "derecha" NO sean
// un solo valor, sino el resultado de recorrer TODO
// ese subárbol. Por eso necesitamos el spread (...).
//
// Sin spread:
//   [this.inorder(nodo.izquierda), nodo.valor]
//   → [[1, 3, 4], 8]  ← arreglo DENTRO de arreglo
//
// Con spread:
//   [...this.inorder(nodo.izquierda), nodo.valor]
//   → [1, 3, 4, 8]  ← todo al mismo nivel

// ─────────────────────────────────────────────────────────────
// Traza visual de inorder PASO A PASO
// ─────────────────────────────────────────────────────────────
//
// Árbol:
//          (8)
//         /   \
//       (3)   (10)
//      /   \      \
//    (1)   (6)    (14)
//         /   \    /
//       (4)   (7) (13)
//
// Llamada: arbol.inorder()
//   Como no le pasamos nada, usa this.raiz = 8
//
//   inorder(8) empieza:
//     ├─ ¿8 es null? NO
//     ├─ Llamar a inorder(8.izquierda) = inorder(3)
//     │   ├─ ¿3 es null? NO
//     │   ├─ Llamar a inorder(3.izquierda) = inorder(1)
//     │   │   ├─ ¿1 es null? NO
//     │   │   ├─ inorder(1.izquierda) = inorder(null) → []
//     │   │   ├─ valor = [1]
//     │   │   └─ inorder(1.derecha) = inorder(null) → []
//     │   │   = [1]   ← 1 no tiene hijos
//     │   ├─ valor = [3]
//     │   └─ Llamar a inorder(3.derecha) = inorder(6)
//     │       ├─ ¿6 es null? NO
//     │       ├─ inorder(6.izquierda) = inorder(4)
//     │       │   ├─ inorder(null) → []
//     │       │   ├─ [4]
//     │       │   └─ inorder(null) → []
//     │       │   = [4]
//     │       ├─ [6]
//     │       └─ inorder(6.derecha) = inorder(7)
//     │           ├─ [] + [7] + [] = [7]
//     │       = [4, 6, 7]
//     │   = [1, 3, 4, 6, 7]   ← TODO el subárbol izquierdo
//     ├─ [8]                  ← LA RAÍZ
//     └─ Llamar a inorder(8.derecha) = inorder(10)
//         ├─ ¿10 es null? NO
//         ├─ inorder(10.izquierda) = inorder(null) → []
//         ├─ [10]
//         └─ inorder(10.derecha) = inorder(14)
//             ├─ inorder(14.izquierda) = inorder(13)
//             │   ├─ [] + [13] + [] = [13]
//             ├─ [14]
//             └─ inorder(14.derecha) = inorder(null) → []
//             = [13, 14]
//         = [10, 13, 14]
//     = [1, 3, 4, 6, 7, 8, 10, 13, 14] ✅
//
// La recursión BAJA hasta encontrar hojas (nodos
// sin hijos). Cuando una hoja devuelve su valor,
// ese valor "sube" y se combina con los demás.
// Es como armar un rompecabezas de abajo hacia arriba.

// ─────────────────────────────────────────────────────────────
// Pruebas
// ─────────────────────────────────────────────────────────────

// new ArbolBST<number>() crea un árbol para números
//   new = "crea una instancia de la clase"
//   ArbolBST<number> = "árbol que trabaja con números"
//   () = llama al constructor (inicializa el objeto)

const arbol = new ArbolBST<number>();

// forEach: "del arreglo, para cada elemento,
//            nómbralo v, e insértalo en el árbol"
[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach(v => arbol.insertar(v));

// .join("  ") convierte el arreglo en texto,
// separando cada elemento con dos espacios.
// [1, 3, 4] → "1  3  4"

console.log("INORDER:  ", arbol.inorder().join("  "));
//   Resultado: 1  3  4  6  7  8  10  13  14
console.log("PREORDER: ", arbol.preorder().join("  "));
//   Resultado: 8  3  1  6  4  7  10  14  13
console.log("POSTORDER:", arbol.postorder().join("  "));
//   Resultado: 1  4  7  6  3  13  14  10  8
