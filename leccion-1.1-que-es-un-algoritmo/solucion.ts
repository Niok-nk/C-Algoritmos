// =============================================
// SOLUCIÓN 1.1 — FizzBuzz Extendido
// =============================================

// ✅ Enfoque escalable (O(n) tiempo, O(1) combinaciones)
// En vez de hacer un if para cada combinación posible (lo cual
// crecería exponencialmente si agregamos más números), 
// construimos el string de forma acumulativa.

function fizzBuzzJazzSolucion(n: number): string[] {
  const resultado: string[] = [];
  
  for (let i = 1; i <= n; i++) {
    let palabra = "";
    
    // Evaluamos cada condición de forma independiente
    // y concatenamos el resultado
    if (i % 3 === 0) palabra += "Fizz";
    if (i % 5 === 0) palabra += "Buzz";
    if (i % 7 === 0) palabra += "Jazz";
    
    // Si 'palabra' está vacía (length 0, se evalúa como falso),
    // empujamos el número convertido a texto.
    // Si tiene algo, empujamos la palabra construida.
    resultado.push(palabra || String(i));
  }
  
  return resultado;
}

console.log(fizzBuzzJazzSolucion(35));
