# Clases y Métodos en TypeScript

> Guía para entender cómo funcionan las clases y cómo interactúan con los objetos que crean. Usa `ArbolBST` como ejemplo.

---

## 1. Una clase tiene DOS tipos de contenido

```typescript
class ArbolBST<T extends number | string> {
  // ┌─ PROPIEDADES: los DATOS (cosas que la clase "sabe")
  raiz: NodoBST<T> | null = null;

  // ┌─ MÉTODOS: las ACCIONES (cosas que la clase "hace")
  insertar(valor: T): void { ... }
  inorder(): T[] { ... }
}
```

- **Propiedad** → sustantivo (la *raíz*).
- **Método** → verbo (insertar, recorrer). Un método es simplemente **una función que vive dentro de una clase**.

---

## 2. Anatomía de un método

Toma `insertar`:

```typescript
insertar(valor: T): void {
  const nuevo = { valor, izquierda: null, derecha: null };
  if (!this.raiz) { this.raiz = nuevo; return; }
  this.insertarNodo(this.raiz, nuevo);
}
```

Tiene 5 piezas:

| Pieza | En `insertar` | Qué significa |
|---|---|---|
| **Nombre** | `insertar` | cómo lo llamas: `arbol.insertar(...)` |
| **Parámetros** | `(valor: T)` | lo que recibe de entrada |
| **Tipo de retorno** | `: void` | qué devuelve (`void` = nada) |
| **Cuerpo** | `{ ... }` | los pasos que ejecuta |
| **Visibilidad** | (pública por defecto) | quién puede llamarlo |

---

## 3. `public` vs `private` (la visibilidad)

```typescript
class ArbolBST<T> {
  insertar(valor: T): void { ... }        // PÚBLICO (por defecto)
  private insertarNodo(...): void { ... } // PRIVADO
}
```

- **`public`** → se llama desde afuera: `arbol.insertar(8)` ✅
- **`private`** → solo se llama desde *dentro* de la clase. No puedes hacer `arbol.insertarNodo(...)` desde fuera. ❌

**¿Por qué ocultar `insertarNodo`?** Porque es un *detalle interno*. El usuario del árbol solo quiere decir "inserta esto". No le interesa cómo baja la recursión. Es como un auto: tú usas el volante y el freno (públicos), no los pistones del motor (privados).

---

## 4. Parámetros con valor por defecto

En `inorder`:

```typescript
inorder(nodo: NodoBST<T> | null = this.raiz): T[] {
```

El `= this.raiz` dice: "si me llamas **sin** argumento, empieza desde la raíz".

```typescript
arbol.inorder();        // usa this.raiz automáticamente
arbol.inorder(otroNodo); // puedes empezar desde cualquier parte
```

---

## 5. `this`: el puente

Dentro de cada método, `this` = **el objeto concreto que llamó al método**.

```typescript
const a = new ArbolBST();
const b = new ArbolBST();

a.insertar(8);   // dentro, this = a → modifica a.raiz
b.insertar(20);  // dentro, this = b → modifica b.raiz
```

Sin `this`, la clase no tendría forma de saber *de cuál* de los mil árboles que creaste hablas.

---

## 6. El constructor (dónde nacen las propiedades)

`ArbolBST` no tiene constructor explícito, pero mira qué hace `raiz = null`:

```typescript
class ArbolBST<T> {
  raiz: NodoBST<T> | null = null;  // ← se ejecuta al crear el objeto
}
```

Esa línea es un **inicializador**: se corre automáticamente cada vez que haces `new ArbolBST()`. Es equivalente a tener:

```typescript
class ArbolBST<T> {
  raiz: NodoBST<T> | null;
  constructor() {
    this.raiz = null;   // ← "al nacer, empieza vacío"
  }
}
```

El **constructor** es el método especial que se ejecuta **una sola vez**, en el instante en que nace el objeto. Lo usa la clase para "preparar" el objeto.

---

## 7. Flujo completo de una llamada (mental model)

Cuando escribes `arbol.insertar(8)`, esto es lo que ocurre por dentro:

```
1. Busca el objeto `arbol`.
2. Busca en SU clase el método `insertar`.
3. Ejecuta insertar, pero con `this` apuntando a `arbol`.
4. Dentro, `this.raiz` lee la raíz de `arbol` (no de otro árbol).
5. Si está vacía, le asigna el nuevo nodo → arbol.raiz = 8.
```

Y cuando `insertar` llama a `this.insertarNodo(this.raiz, nuevo)`:

```
6. `this.insertarNodo` → busca ese método en la MISMA clase.
7. `this` sigue siendo `arbol` (no cambia).
8. Le pasa `this.raiz` (= la raíz actual) como primer argumento.
```

**El punto clave:** los métodos se llaman entre sí con `this.metodo()`, y `this` siempre se refiere al mismo objeto durante toda la operación.

---

## 8. Resumen visual

```
          CLASE (molde / fábrica)
┌──────────────────────────────────────┐
│  propiedades:  raiz                  │  ← qué SABE
│  métodos:      insertar()            │  ← qué HACE
│                insertarNodo()  (priv)│
│                inorder()             │
└──────────────────────────────────────┘
        new            new            new
         │              │              │
      ┌──▼──┐       ┌───▼──┐      ┌───▼──┐
      │ a   │       │  b   │      │  c   │   ← OBJETOS (cada uno
      │raiz:│       │raiz: │      │raiz: │     con su PROPIA raíz)
      └─────┘       └──────┘      └──────┘

   a.insertar(8)  →  this = a  →  a.raiz = 8
   b.insertar(20) →  this = b  →  b.raiz = 20
```
