// =============================================
// RETO 1.2 — La Taquilla del Cine
// Dificultad: 🟡 Medio
// =============================================
// Estás diseñando el algoritmo central para cobrar boletos
// en la taquilla de un cine. Debes analizar la lógica considerando
// early returns y casos borde.
//
// Reglas de precios:
// 1. Entrada base: $10
// 2. Si es martes (día de descuento), la entrada base baja a $6
// 3. Niños (menores de 12 años) siempre pagan el precio fijo de $5
//    NUNCA pueden entrar si la película es clasificación "R" (retorna -1).
// 4. Adultos mayores (65 años o más) siempre pagan un precio fijo de $7.
// 5. Los Miembros VIP tienen un 20% de descuento SOBRE el precio
//    final que hayan obtenido (ya sea descuento de martes, niño, etc.).
//
// Casos Borde y Validaciones:
// - Si la edad es menor a 0 o mayor a 120, debes lanzar un error:
//   throw new Error("Edad inválida");
//
// Entrada: edad (number), esMartes (boolean), esVIP (boolean), peliculaR (boolean)
// Salida:  number (el precio final, o -1 si no puede entrar)
// =============================================

// TODO: implementa la función aquí usando retornos tempranos
function calcularPrecio(edad: number, esMartes: boolean, esVIP: boolean, peliculaR: boolean): number {

    if (edad < 0 || edad > 120) {
        throw new Error("Edad inválida");
    }
    let precioBase = 10;
    if (edad < 12) {
        if (peliculaR) return -1;
        precioBase = 5;
        
    } else if (edad >= 65){
        if (esMartes){
            precioBase = 6;
        }else{
            precioBase = 7;
        }
    } else {
        if (esMartes){
            precioBase = 6;
        }else{
            precioBase = 10;
        }
    }

    return esVIP ? precioBase * 0.8 : precioBase;


}

// Pruebas:
// Puedes descomentar estas líneas para probar tu código
console.log("Niño en película R (esperado: -1) ->", calcularPrecio(10, false, false, true));
console.log("Niño martes (esperado: 4) ->", calcularPrecio(10, true, true, false)); // 5 - 20% = 4
console.log("Adulto martes (esperado: 6) ->", calcularPrecio(30, true, false, false));
console.log("Adulto mayor VIP (esperado: 5.6) ->", calcularPrecio(70, false, true, false)); // 7 - 20% = 5.6
