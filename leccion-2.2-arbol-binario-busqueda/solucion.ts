export {};
// =============================================
// SOLUCIÓN 2.2 — Agenda Telefónica con BST
// Explicación DETALLADA de cada línea
// =============================================

// ─────────────────────────────────────────────
// INTERFAZ NodoBST<T>
// ─────────────────────────────────────────────
// Define la FORMA que tiene cada nodo del árbol.
//   - valor: el dato que guarda (T = cualquier tipo)
//   - izquierda: hijo menor, puede ser null
//   - derecha: hijo mayor, puede ser null

interface NodoBST<T> {
  valor: T;
  izquierda: NodoBST<T> | null;
  derecha: NodoBST<T> | null;
}

// ─────────────────────────────────────────────
// CLASE ArbolBST<T>
// ─────────────────────────────────────────────
// <T extends number | string>
//   T solo puede ser número o texto.
//   ¿Por qué? Porque dentro usamos < y > para
//   comparar valores. En TypeScript, solo los
//   números y strings se pueden comparar así.
//
//   "class" es una PLANTILLA para crear objetos.
//   Agrupa datos (propiedades) y funciones
//   (métodos) en una sola unidad.

class ArbolBST<T extends number | string> {

  // ── Propiedad: raiz ────────────────────────
  // private = solo accesible DENTRO de la clase
  // NodoBST<T> | null = puede ser un nodo o vacío
  // = null = al crear el árbol, empieza vacío
  //
  // Analogía: la raíz es como la primera persona
  // en una fila. Si no hay nadie, es null.

  private raiz: NodoBST<T> | null = null;

  // ───────────────────────────────────────────
  // insertar(valor): método PÚBLICO
  // ───────────────────────────────────────────
  // Recibe un valor y lo coloca en su lugar
  // dentro del árbol, siguiendo la regla del BST:
  //   menor → izquierda, mayor → derecha

  insertar(valor: T): void {
    // 1. Crear el nuevo nodo (sin hijos aún)
    const nuevoNodo: NodoBST<T> = { valor, izquierda: null, derecha: null };

    // 2. ¿Árbol vacío? (raíz es null)
    //    !this.raiz significa "this.raiz es null"
    //    !null = true → entramos al if
    if (!this.raiz) {
      this.raiz = nuevoNodo;  // El nuevo es la raíz
      return;                 // Salimos, no sigue
      //                        (sin esto, ejecutaría
      //                         la línea de abajo)
    }

    // 3. Ya hay raíz → delegamos al método privado
    this.insertarNodo(this.raiz, nuevoNodo);
  }

  // ───────────────────────────────────────────
  // insertarNodo(padre, nuevo): método PRIVADO
  // ───────────────────────────────────────────
  // Es el CORAZÓN del BST. Usa recursión para
  // encontrar el lugar correcto.
  //
  // ¿Qué hace línea por línea?
  //
  //   if (nuevo.valor < padre.valor) {
  //     ── ¿El nuevo es MENOR que el padre?
  //        SÍ → debe ir a la IZQUIERDA
  //
  //     if (!padre.izquierda)
  //       ── ¿El padre NO tiene hijo izquierdo?
  //          (!null = true)
  //          SÍ → hay espacio libre → coloca aquí
  //
  //     else this.insertarNodo(padre.izquierda, nuevo)
  //       ── Ya hay un hijo izquierdo →
  //          repite el proceso con ESE hijo
  //          (recursión: la función se llama a sí misma)
  //
  //   } else {
  //     ── El nuevo es MAYOR O IGUAL
  //        → debe ir a la DERECHA
  //        (misma lógica que arriba)
  //   }

  private insertarNodo(padre: NodoBST<T>, nuevo: NodoBST<T>): void {
    if (nuevo.valor < padre.valor) {
      // ── Rama izquierda ──
      if (!padre.izquierda) {
        padre.izquierda = nuevo;  // Espacio libre → colocar
      } else {
        this.insertarNodo(padre.izquierda, nuevo); // Seguir bajando
      }
    } else {
      // ── Rama derecha ──
      if (!padre.derecha) {
        padre.derecha = nuevo;
      } else {
        this.insertarNodo(padre.derecha, nuevo);
      }
    }
  }

  // ───────────────────────────────────────────
  // Traza de insertar(6) en árbol con raíz 8
  // ───────────────────────────────────────────
  //
  //   Llamada: arbol.insertar(6)
  //
  //   1. ¿raíz vacía? NO (hay 8)
  //   2. insertarNodo(8, 6)
  //
  //      ┌─ 6 < 8? SÍ → izquierda
  //      │
  //      ├─ ¿8.izquierda existe?
  //      │   SÍ (está 3) → recursión
  //      │
  //      └─ insertarNodo(3, 6)
  //           │
  //           ├─ 6 < 3? NO → derecha
  //           │
  //           ├─ ¿3.derecha existe?
  //           │   NO (null) → ESPACIO LIBRE
  //           │
  //           └─ 3.derecha = 6   ✅
  //
  //   La recursión baja nivel por nivel
  //   hasta encontrar un null donde colocar
  //   el nuevo nodo.

  // ───────────────────────────────────────────
  // buscar(valor): método PÚBLICO
  // ───────────────────────────────────────────

  buscar(valor: T): boolean {
    // Empieza la búsqueda desde la raíz
    return this.buscarNodo(this.raiz, valor);
  }

  // ───────────────────────────────────────────
  // buscarNodo(nodo, valor): método PRIVADO
  // ───────────────────────────────────────────
  // Devuelve true si encuentra el valor,
  // false si llega a null.
  //
  // Línea por línea:
  //
  //   if (!nodo) return false;
  //     ── ¿Llegamos a null?
  //        (!null = true)
  //        SÍ → no existe → false
  //
  //   if (nodo.valor === valor) return true;
  //     ── ¿Este nodo tiene el valor buscado?
  //        SÍ → encontrado → true
  //
  //   if (valor < nodo.valor)
  //     ── ¿Es menor? → buscar en izquierda
  //     return this.buscarNodo(nodo.izquierda, valor);
  //
  //   return this.buscarNodo(nodo.derecha, valor);
  //     ── Es mayor → buscar en derecha
  //
  // En cada paso descartamos la MITAD del árbol.
  // Por eso la búsqueda es O(log n) en promedio.

  private buscarNodo(nodo: NodoBST<T> | null, valor: T): boolean {
    if (!nodo) return false;              // No encontrado
    if (nodo.valor === valor) return true; // Encontrado
    if (valor < nodo.valor) {
      return this.buscarNodo(nodo.izquierda, valor); // Buscar izquierda
    }
    return this.buscarNodo(nodo.derecha, valor);     // Buscar derecha
  }
}

// ─────────────────────────────────────────────
// Traza de buscar(6) en el árbol completo
// ─────────────────────────────────────────────
//
//   buscar(6)
//     → buscarNodo(8, 6)
//       → 6 !== 8, 6 < 8 → izquierda
//       → buscarNodo(3, 6)
//         → 6 !== 3, 6 < 3? NO → derecha
//         → buscarNodo(6, 6)
//           → 6 === 6 → TRUE ✅
//
//   buscar(9)
//     → buscarNodo(8, 9)
//       → 9 !== 8, 9 < 8? NO → derecha
//       → buscarNodo(10, 9)
//         → 9 !== 10, 9 < 10 → izquierda
//         → buscarNodo(null, 9)
//           → !null → FALSE

// ─────────────────────────────────────────────
// Agenda telefónica con BST
// ─────────────────────────────────────────────
const agenda = new ArbolBST<string>();

// forEach: "del arreglo, para cada elemento,
//            nómbralo v, e insértalo en la agenda"
["Ana", "Carlos", "Beatriz", "David", "Elena", "Francisco"]
  .forEach(v => agenda.insertar(v));

// ── Árbol resultante ─────────────────────────
//
//            (Ana)           ← raíz
//               \
//            (Carlos)        ← "Carlos" > "Ana" → derecha
//             /
//        (Beatriz)           ← "Beatriz" < "Carlos" → izquierda
//               \
//             (David)         ← "David" > "Beatriz" → derecha
//                 \
//               (Elena)       ← "Elena" > "David" → derecha
//                    \
//                (Francisco)  ← "Francisco" > "Elena" → derecha
//
// Nota: parece una lista porque los nombres se insertaron
// en orden alfabético parcial. Cada nuevo nombre es mayor
// que el anterior y va a la derecha repetidamente.
// Esto degrada la búsqueda a O(n).

// Pruebas:
console.log("Buscar Ana:", agenda.buscar("Ana"));     // true
console.log("Buscar Elena:", agenda.buscar("Elena")); // true
console.log("Buscar Mario:", agenda.buscar("Mario")); // false
