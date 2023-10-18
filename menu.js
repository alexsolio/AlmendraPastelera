const tortas = [
    { nombre: "lemon pie", precio: 10000 },
    { nombre: "crumble de manzana", precio: 12000 },
    { nombre: "rogel", precio: 9000 },
    { nombre: "marquise", precio: 8000 },
    { nombre: "ricota", precio: 8000 },
];

let respuesta = prompt("Bienvenido al Menú. ¿Conoces nuestras tortas? si/no").toLowerCase();

while (respuesta !== "si" && respuesta !== "no") {
    alert("Responde con si o no");
    respuesta = prompt("¿Conoces nuestras tortas? si/no").toLowerCase();
}

const carrito = [];

if (respuesta === "no") {
    alert("Nuestras recetas son:\n" + tortas.map(torta => torta.nombre).join("\n"));
}

while (true) {
    const eleccion = prompt("¿Qué torta quisieras agregar al carrito? (escribe 'fin' para finalizar)").toLowerCase();

    if (eleccion === "fin") {
        break;
    }

    const tortaEncontrada = tortas.find(torta => torta.nombre === eleccion);

    if (tortaEncontrada) {
        carrito.push({ nombre: tortaEncontrada.nombre, precio: tortaEncontrada.precio });
    } else if (respuesta === "no") {
        alert("Torta no encontrada en el menú.");
    } else {
        alert("Torta no encontrada en el menú.");
    }
}

if (carrito.length > 0) {
    let total = carrito.reduce((acc, item) => acc + item.precio, 0);
    const carritoStr = carrito.map(item => `${item.nombre} - Precio: $${item.precio}`).join("\n");
    alert(`Carrito de compras:\n${carritoStr}\nTotal: $${total}`);
} else {
    alert("No se ha agregado nada al carrito.");
}
