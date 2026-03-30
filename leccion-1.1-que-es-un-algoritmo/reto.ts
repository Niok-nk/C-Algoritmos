// =============================================
// RETO 1.1 — FizzBuzz Extendido
// Dificultad: 🟢 Básico
// =============================================
// El FizzBuzz clásico solo usa 3 y 5.
// Tu versión extendida debe manejar también el 7:
//
//   - Divisible por 3          → "Fizz"
//   - Divisible por 5          → "Buzz"
//   - Divisible por 7          → "Jazz"
//   - Divisible por 3 y 5      → "FizzBuzz"
//   - Divisible por 3 y 7      → "FizzJazz"
//   - Divisible por 5 y 7      → "BuzzJazz"
//   - Divisible por 3, 5 y 7   → "FizzBuzzJazz"
//   - Ninguno de los anteriores → el número como string
//
// Entrada: n (número entero positivo)
// Salida:  string[] con los resultados del 1 al n
// =============================================

// TODO: implementa la función aquí
function fizzBuzzJazz(n: number): string[] {
    const resultado: string[] = [];
    for (let i = 1; i <= n; i++) {
        if (i % 3 == 0 && i % 5 == 0 && i % 7 == 0) {
            resultado.push("FizzBuzzJazz");
        } else if ( i % 5 == 0 && i % 7 == 0) {
            resultado.push("BuzzJazz");
        } else if ( i % 3 == 0 && i % 7 == 0) {
            resultado.push("FizzJazz");
        } else if ( i % 3 == 0 && i % 5 == 0) {
            resultado.push("FizzBuzz");
        } else if ( i % 7 == 0) {
            resultado.push("Jazz");
        } else if ( i % 5 == 0) {
            resultado.push("Buzz");
        } else if ( i % 3 == 0) {
            resultado.push("Fizz");
        } else {
            resultado.push(String(i));
        }
    }
    return resultado;
}

// Pruebas:
console.log(fizzBuzzJazz(35));
// Posiciones clave a verificar:
// i=3  → "Fizz"
// i=5  → "Buzz"
// i=7  → "Jazz"
// i=15 → "FizzBuzz"
// i=21 → "FizzJazz"

// ✅ Approach acumulativo — escala con cualquier cantidad de divisores
function fizzBuzzJazzz(n: number): string[] {
  const resultado: string[] = [];
  for (let i = 1; i <= n; i++) {
    let palabra = "";                          // Empieza vacío
    if (i % 3 === 0) palabra += "Fizz";       // Agrega "Fizz" si aplica
    if (i % 5 === 0) palabra += "Buzz";       // Agrega "Buzz" si aplica
    if (i % 7 === 0) palabra += "Jazz";       // Agrega "Jazz" si aplica
    resultado.push(palabra || String(i));     // Si vacío, usa el número
  }
  return resultado;
}
console.log(fizzBuzzJazzz(35));