// =============================================
// SOLUCIÓN 1.2 — La Taquilla del Cine
// =============================================
// Patrón clave: Etapas separadas con else if + VIP al final

function calcularPreciob(edad: number, esMartes: boolean, esVIP: boolean, peliculaR: boolean): number {

  // ETAPA 1: Validar casos borde (SIEMPRE primero)
  if (edad < 0 || edad > 120) throw new Error("Edad inválida");

  // ETAPA 2: Precio por categoría — else if garantiza exclusividad
  let precioBase: number;

  if (edad < 12) {
    if (peliculaR) return -1;    // Restricción de acceso
    precioBase = 5;              // Niños: precio fijo
  } else if (edad >= 65) {
    precioBase = 7;              // Adultos mayores: precio fijo
  } else {
    precioBase = esMartes ? 6 : 10; // Adultos normales
  }

  // ETAPA 3: VIP al final, sobre el precio ya calculado
  return esVIP ? precioBase * 0.8 : precioBase;
}

console.log("Niño en película R (esperado: -1) ->", calcularPreciob(10, false, false, true));
console.log("Niño martes VIP  (esperado: 4)   ->", calcularPreciob(10, true, true, false));
console.log("Adulto martes    (esperado: 6)   ->", calcularPreciob(30, true, false, false));
console.log("Adulto mayor VIP (esperado: 5.6) ->", calcularPreciob(70, false, true, false));
