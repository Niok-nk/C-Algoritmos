export {};
// ============================================================
// LECCIÓN 2.4 — Recorrido por Niveles (Level-Order / BFS)
// ============================================================
// Explicación DETALLADA de cada línea del código
// ============================================================

// ─────────────────────────────────────────────────────────────
// EL CONCEPTO: ¿Qué es "recorrer por niveles"?
// ─────────────────────────────────────────────────────────────
//
// En la lección 2.3 aprendimos 3 recorridos que BAJAN en
// profundidad (inorder, preorder, postorder). Todos usan
// RECURSIÓN y bajan hasta el fondo antes de volver.
//
// El recorrido por NIVELES (Level-Order) es distinto:
// recorre el árbol PISO POR PISO, de arriba hacia abajo
// y de izquierda a derecha.
//
// Analogía: piensa en el organigrama de una empresa.
//   1. Primero visitas al CEO (la raíz).
//   2. Luego a los vicepresidentes (nivel 1).
//   3. Luego a los gerentes (nivel 2).
//   4. Luego a los empleados (nivel 3).
// Nunca bajas al nivel 2 hasta terminar TODO el nivel 1.
//
// Otra analogía: las ondas en el agua al tirar una piedra.
// La onda llega primero a los puntos más cercanos (nivel 1),
// luego a los siguientes (nivel 2), y así se expande.
//
// Otra más: una cola para comprar boletos. Atiendes a la
// primera persona, y cuando llega alguien nuevo se forma
// AL FINAL. Esto es exactamente lo que haremos: una COLA.
//
// El nombre técnico es BFS (Breadth First Search) =
// "búsqueda primero en anchura". "Anchura" porque se
// expande HORIZONTALMENTE, nivel por nivel, en lugar de
// bajar en vertical como los recorridos recursivos.

// ─────────────────────────────────────────────────────────────
// LA HERRAMIENTA NUEVA: la COLA (Queue)
// ─────────────────────────────────────────────────────────────
//
// Para recorrer por niveles necesitamos una estructura
// que siga la regla FIFO (First In, First Out =
// "el primero que entra, es el primero que sale").
//
// Es como la fila del supermercado:
//   - El que llega PRIMERO, es atendido PRIMERO.
//   - Los que llegan después, esperan AL FINAL.
//
// En JavaScript/TypeScript no hay una clase "Queue" nativa,
// pero un ARREGLO puede actuar como cola con dos métodos:
//
//   cola.push(elemento)   → agrega AL FINAL (entra a la fila)
//   cola.shift()          → quita del PRINCIPIO (sale de la fila)
//
// push  = "ponte al final de la fila"
// shift = "pasa el primero y sácalo"
//
// 📘 NOTA TYPESCRIPT (nuevo): el operador ! (non-null assertion)
//
//   cola.shift() devuelve el tipo "NodoBST<T> | undefined".
//   ¿Por qué "undefined"? Porque si la cola estuviera VACÍA,
//   no habría nada que sacar y devolvería undefined.
//
//   Pero nosotros solo llamamos shift() DENTRO de un while
//   que garantiza que la cola NO está vacía (cola.length > 0).
//
//   El signo ! le dice a TypeScript:
//     "confía en mí, aquí SÍ hay un valor, no es undefined".
//
//   cola.shift()!  →  "saca el primero, y te prometo que existe"

// ─────────────────────────────────────────────────────────────
// INTERFACE NodoBST<T>
// ─────────────────────────────────────────────────────────────
// Igual que en la lección 2.3: un nodo guarda un valor
// y dos punteros (izquierda y derecha), que pueden ser
// otro nodo o null.

interface NodoBST<T> {
  valor: T;
  izquierda: NodoBST<T> | null;
  derecha: NodoBST<T> | null;
}

// ─────────────────────────────────────────────────────────────
// CLASS ArbolBST<T extends number | string>
// ─────────────────────────────────────────────────────────────
// Reutilizamos la clase de la lección 2.3.
// Le AGREGAMOS un método nuevo: recorridoPorNiveles().

class ArbolBST<T extends number | string> {

  // La raíz del árbol. null si está vacío.
  raiz: NodoBST<T> | null = null;

  // ── insertar (igual que 2.3) ──────────────────
  // Inserta un valor siguiendo la regla del BST:
  //   menor → izquierda, mayor → derecha.
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

  // ─────────────────────────────────────────────
  // MÉTODO: recorridoPorNiveles()
  // ─────────────────────────────────────────────
  //
  // Devuelve los valores del árbol visitados
  // NIVEL POR NIVEL, de izquierda a derecha.
  //
  //   recorridoPorNiveles(): T[] {
  //                         ↑
  //                         devuelve un arreglo de tipo T
  //
  // 📘 LECTURA:
  //   "Un método público llamado recorridoPorNiveles,
  //    sin parámetros, que devuelve un arreglo de T"
  //
  // A diferencia de los recorridos de 2.3, este NO
  // usa recursión. Usa un BUCLE while y una COLA.

  recorridoPorNiveles(): T[] {

    // ── Paso 1: ¿árbol vacío? ───────────────────
    //
    //   if (!this.raiz) return [];
    //   ↑
    //   "si no hay raíz, no hay nada que recorrer"
    //
    // Devolvemos un arreglo vacío.
    if (!this.raiz) return [];

    // ── Paso 2: preparar la COLA y el resultado ──
    //
    //   const resultado: T[] = [];
    //   ↑ arreglo donde iremos guardando los valores
    //     en el orden en que los visitamos.
    //
    //   const cola: NodoBST<T>[] = [this.raiz];
    //   ↑ la COLA empieza con un solo elemento: la raíz.
    //     [this.raiz] crea un arreglo con la raíz dentro.
    //
    // Piensa: "la fila empieza con una sola persona:
    //  el nodo raíz".
    const resultado: T[] = [];
    const cola: NodoBST<T>[] = [this.raiz];

    // ── Paso 3: el BUCLE PRINCIPAL ──────────────
    //
    //   while (cola.length > 0) {
    //   ↑
    //   "mientras HAYA personas en la fila"
    //
    //   while = bucle que se repite mientras la
    //   condición sea verdadera.
    //
    //   Este bucle se detiene cuando la cola queda
    //   vacía (ya visitamos todos los nodos).
    while (cola.length > 0) {

      // ── Paso 3a: sacar el PRIMERO de la fila ──
      //
      //   const nodo = cola.shift()!;
      //   ↑            ↑              ↑
      //   guardar      "saca al       "te prometo
      //   en nodo      primero"       que existe"
      //
      // shift() quita y devuelve el primer elemento.
      // Es FIFO: el primero que entró, es el primero
      // que sale (y lo visitamos).
      const nodo = cola.shift()!;

      // ── Paso 3b: VISITAR el nodo ──────────────
      //
      //   resultado.push(nodo.valor);
      //   ↑
      //   "agregar su valor al resultado"
      //
      // "Visitar" = registrar su valor. Aquí es donde
      // decimos "este nodo ya fue atendido".
      resultado.push(nodo.valor);

      // ── Paso 3c: ENCOLAR a los hijos ──────────
      //
      //   if (nodo.izquierda) cola.push(nodo.izquierda);
      //   ↑
      //   "si tiene hijo izquierdo, mándalo AL FINAL de la fila"
      //
      //   if (nodo.derecha) cola.push(nodo.derecha);
      //   ↑
      //   "si tiene hijo derecho, mándalo AL FINAL de la fila"
      //
      // IMPORTANTE el orden: SIEMPRE izquierda antes
      // que derecha, para respetar "izquierda a derecha".
      //
      // Al poner los hijos AL FINAL (push), garantizamos
      // que primero se atiendan todos los nodos del nivel
      // actual antes de bajar al siguiente.
      if (nodo.izquierda) cola.push(nodo.izquierda);
      if (nodo.derecha) cola.push(nodo.derecha);
    }

    // ── Paso 4: devolver el resultado ──────────
    //
    // Al salir del while (cola vacía), el arreglo
    // resultado tiene todos los valores en orden
    // de niveles.
    return resultado;
  }
}

// ─────────────────────────────────────────────────────────────
// TRAZA PASO A PASO de recorridoPorNiveles()
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
// ── Estado inicial ──
//   resultado = []
//   cola = [8]
//
// ── Vuelta 1 ──
//   cola.length = 1 > 0 ✓
//   nodo = cola.shift() → 8       (cola queda [])
//   resultado = [8]
//   hijos de 8: izquierda=3, derecha=10
//   cola = [3, 10]
//
// ── Vuelta 2 ──
//   nodo = cola.shift() → 3       (cola queda [10])
//   resultado = [8, 3]
//   hijos de 3: 1 y 6
//   cola = [10, 1, 6]
//
// ── Vuelta 3 ──
//   nodo = cola.shift() → 10      (cola queda [1, 6])
//   resultado = [8, 3, 10]
//   hijos de 10: derecha=14 (no tiene izquierda)
//   cola = [1, 6, 14]
//
// ── Vuelta 4 ──
//   nodo = cola.shift() → 1       (cola queda [6, 14])
//   resultado = [8, 3, 10, 1]
//   1 no tiene hijos → cola no cambia
//   cola = [6, 14]
//
// ── Vuelta 5 ──
//   nodo = cola.shift() → 6       (cola queda [14])
//   resultado = [8, 3, 10, 1, 6]
//   hijos de 6: 4 y 7
//   cola = [14, 4, 7]
//
// ── Vuelta 6 ──
//   nodo = cola.shift() → 14      (cola queda [4, 7])
//   resultado = [8, 3, 10, 1, 6, 14]
//   hijos de 14: izquierda=13
//   cola = [4, 7, 13]
//
// ── Vuelta 7 ──
//   nodo = cola.shift() → 4       (cola queda [7, 13])
//   resultado = [8, 3, 10, 1, 6, 14, 4]
//   4 no tiene hijos
//
// ── Vuelta 8 ──
//   nodo = cola.shift() → 7       (cola queda [13])
//   resultado = [8, 3, 10, 1, 6, 14, 4, 7]
//   7 no tiene hijos
//
// ── Vuelta 9 ──
//   nodo = cola.shift() → 13      (cola queda [])
//   resultado = [8, 3, 10, 1, 6, 14, 4, 7, 13]
//   13 no tiene hijos
//
// ── Vuelta 10 ──
//   cola.length = 0 → NO entra al while
//   → se devuelve [8, 3, 10, 1, 6, 14, 4, 7, 13] ✅
//
// Observa cómo la COLA es la que "lleva la cuenta"
// de qué nodo toca visitar a continuación. Por eso
// el orden sale nivel por nivel.

// ─────────────────────────────────────────────────────────────
// ANÁLISIS DE COMPLEJIDAD
// ─────────────────────────────────────────────────────────────
//
// TIEMPO: O(n)
//   Visitamos CADA nodo exactamente UNA vez.
//   Si hay n nodos, hacemos n iteraciones del while.
//   (shift() de un arreglo puede ser O(n) internamente,
//    pero conceptualmente visitamos n nodos)
//
// ESPACIO: O(n)
//   En el peor caso (el nivel más ancho) la cola guarda
//   ~n/2 nodos a la vez. Esto sigue siendo O(n).
//
// COMPARACIÓN con los recorridos de 2.3:
//   - inorder/preorder/postorder usan la PILA de recursión
//     (O(h), h = altura) en espacio.
//   - Level-Order usa una COLA (O(n)) en espacio.
//   - Misma complejidad de tiempo O(n), distinto orden.

// ─────────────────────────────────────────────────────────────
// PRUEBAS
// ─────────────────────────────────────────────────────────────

const arbol = new ArbolBST<number>();

// Insertamos los mismos valores que en 2.3
[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach(v => arbol.insertar(v));

console.log("LEVEL-ORDER:", arbol.recorridoPorNiveles().join("  "));
// Resultado: 8  3  10  1  6  14  4  7  13

// ── Comparación rápida con 2.3 (mismo árbol) ──
//   INORDER:    1  3  4  6  7  8  10  13  14   (profundidad)
//   LEVEL-ORDER:8  3  10  1  6  14  4  7  13    (anchura)
//
// Fíjate: en INORDER el 1 (el más profundo) aparece PRIMERO.
// En LEVEL-ORDER el 8 (la raíz) aparece PRIMERO.
// Son dos formas distintas de visitar los MISMOS nodos.
