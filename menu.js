const tortasClasicas = [
    {
        id: 1,
        nombre: "Lemon Pie",
        descripcion: "Masa dulce rellena con crema de limón y cubierta con merengue italiano.",
        precio: 10000,
        imagen: "../multimedia/imagenes/algarrobo.jpg",
    },
    {
        id: 2,
        nombre: "Crumble de manzana",
        descripcion: "Manzanas horneadas con una capa crujiente y dorada.",
        precio: 12000,
        imagen: "../multimedia/imagenes/crumble.jpg",
    },
    {
        id: 3,
        nombre: "Rogel",
        descripcion: "Finos discos de masa cubiertos con dulce de leche y merengue italiano.",
        precio: 9000,
        imagen: "../multimedia/imagenes/rogel.jpg",
    },
    {
        id: 4,
        nombre: "Marquise",
        descripcion: "Base de marquise de chocolate, cubierta con dulce de leche, crema y frutos rojos.",
        precio: 8000,
        imagen: "../multimedia/imagenes/torta.jpg",
    },
    {
        id: 5,
        nombre: "Ricota",
        descripcion: "Masa dulce rellena con crema de ricota.",
        precio: 8000,
        imagen: "../multimedia/imagenes/algarrobo.jpg",
    },
];

const carritoContainer = document.getElementById("carrito-container");
const carritoList = document.getElementById("carrito-list");
const totalPrecio = document.getElementById("total-precio");
let carrito = [];
let total = 0;

// Verificar si hay un carrito en localStorage y cargarlo si existe
const carritoGuardado = localStorage.getItem("carrito");

if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    total = carrito.reduce((acc, item) => acc + item.precio, 0);
    actualizarCarrito();
}

// Crear un contenedor principal para los elementos
const contenedorPrincipal = document.createElement("div");
contenedorPrincipal.classList.add("contenedor-comida");

tortasClasicas.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("tortas-clasicas");

    // Crear un elemento para la imagen y aplicar la clase "imagen-menu"
    const imagen = document.createElement("img");
    imagen.src = item.imagen;
    imagen.alt = item.nombre;
    imagen.classList.add("imagen-menu");

    // Crear elementos para el nombre, el precio y el botón "Agregar al carrito"
    const nombre = document.createElement("h4");
    nombre.textContent = item.nombre;

    const precio = document.createElement("h5");
    precio.textContent = `$${item.precio}`;

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al carrito";

    // Escuchar el evento de clic en el botón "Agregar al carrito"
    botonAgregar.addEventListener("click", () => {
        carrito.push(item);
        total += item.precio;
        actualizarCarrito();
    });

    // Agregar los elementos al div
    div.appendChild(imagen);
    div.appendChild(nombre);
    div.appendChild(precio);
    div.appendChild(botonAgregar);

    // Agregar el elemento a contenedorPrincipal
    contenedorPrincipal.appendChild(div);
});

// Agregar contenedorPrincipal al documento
document.body.appendChild(contenedorPrincipal);

const botonVaciarCarrito = document.getElementById("vaciar-carrito");

// Agregar el evento de clic al botón "Vaciar carrito"
botonVaciarCarrito.addEventListener("click", () => {
    carrito = []; // Vaciar el carrito
    total = 0; // Restablecer el total a 0
    actualizarCarrito();
    actualizarColorCarrito(); // Llamar a la función para actualizar el color del título
    alert("Carrito vacío.");

});

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    carritoList.innerHTML = "";
    carrito.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.nombre;
        carritoList.appendChild(li);
    });
    totalPrecio.textContent = `${total}`;

    // Guardar el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarColorCarrito(); // Llamar a la función para actualizar el color del título
}

// Función para actualizar el color del título del carrito
function actualizarColorCarrito() {
    const carritoTitulo = document.getElementById("carrito-titulo");
    if (carrito.length > 0) {
        carritoTitulo.style.color = "green"; 
    } else {
        carritoTitulo.style.color = "orange"; 
    }
}

// Llamar a la función para configurar el color del título al cargar la página
actualizarColorCarrito();