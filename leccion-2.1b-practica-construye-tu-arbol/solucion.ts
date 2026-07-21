export {};
// =============================================
// SOLUCIÓN — Construye tu Árbol paso a paso
// =============================================

interface NodoArbol<T> {
  valor: T;
  hijos: NodoArbol<T>[];
}

function crearNodo<T>(valor: T): NodoArbol<T> {
  return { valor, hijos: [] };
}

function agregarHijo<T>(padre: NodoArbol<T>, hijo: NodoArbol<T>): void {
  padre.hijos.push(hijo);
}

// ── Construcción del árbol ──────────────────
const n1 = crearNodo(1);
const n2 = crearNodo(2);
const n3 = crearNodo(3);
const n4 = crearNodo(4);
const n5 = crearNodo(5);
const n6 = crearNodo(6);

agregarHijo(n1, n2);
agregarHijo(n1, n3);
agregarHijo(n2, n4);
agregarHijo(n2, n5);
agregarHijo(n3, n6);

// ── Pruebas ─────────────────────────────────
console.log("PASO 4 - Prueba:");
console.log("Valor raíz:", n1.valor);
console.log("Hijos de raíz:", n1.hijos.map(h => h.valor));

console.log("\n=== PRUEBA FINAL ===");
console.log("Raíz:", n1.valor);
console.log("Hijos de 2:", n2.hijos.map(h => h.valor));
console.log("Hijos de 3:", n3.hijos.map(h => h.valor));
console.log("¿Es hoja el 4?", n4.hijos.length === 0);
console.log("¿Es hoja el 6?", n6.hijos.length === 0);
console.log("¿Es hoja la raíz 1?", n1.hijos.length === 0);
