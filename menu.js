const carritoContainer = document.getElementById("carrito-container");
const carritoList = document.getElementById("carrito-list");
const totalPrecio = document.getElementById("total-precio");
let carrito = [];
let total = 0;

document.addEventListener("DOMContentLoaded", function() {
    const carritoAlmacenado = localStorage.getItem("carrito");
    if (carritoAlmacenado) {
        carrito = JSON.parse(carritoAlmacenado);
        actualizarCarrito();
        actualizarColorCarrito();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const fetchData = async () => {
        try {
          const response = await fetch("../data.json");
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return [];
        }
      };
      
      let tortasClasicas = [];
      
      fetchData().then((data) => {
        tortasClasicas = data;
      
        tortasClasicas.forEach((item) => {
          let div = document.createElement("div");
          div.classList.add("tortas-clasicas");
      
          const imagen = document.createElement("img");
          imagen.src = item.imagen;
          imagen.alt = item.nombre;
          imagen.classList.add("imagen-menu");
      
          const nombre = document.createElement("h4");
          nombre.textContent = item.nombre;
      
          const precio = document.createElement("h5");
          precio.textContent = `$${item.precio}`;
      
          const botonAgregar = document.createElement("button");
          botonAgregar.textContent = "Agregar al carrito";
      
          botonAgregar.addEventListener("click", () => {
            agregarAlCarrito({ ...item, cantidad: 1 });
          });
      
          div.appendChild(imagen);
          div.appendChild(nombre);
          div.appendChild(precio);
          div.appendChild(botonAgregar);
      
          contenedorPrincipal.appendChild(div);
        });
      
        document.body.appendChild(contenedorPrincipal);
      });
       
});

const contenedorPrincipal = document.createElement("div");
contenedorPrincipal.classList.add("contenedor-comida");

const botonVaciarCarrito = document.getElementById("vaciar-carrito");

botonVaciarCarrito.addEventListener("click", () => {
    carrito = [];
    total = 0;
    actualizarCarrito();
    actualizarColorCarrito();
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Carrito vacío",
        showConfirmButton: false,
        timer: 1500
      });
});

function agregarAlCarrito(item) {
    const existente = carrito.find((producto) => producto.id === item.id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push(item);
    }

    total += item.precio;
    actualizarCarrito();
}

function incrementarCantidad(item) {
    item.cantidad++;
    total += item.precio;
    actualizarCarrito();
}

function decrementarCantidad(item) {
    if (item.cantidad > 1) {
        item.cantidad--;
        total -= item.precio;
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    carritoList.innerHTML = "";
    carrito.forEach((item) => {
        const li = document.createElement("li");
        const nombreCantidad = document.createElement("span");
        nombreCantidad.textContent = `${item.nombre} x ${item.cantidad}`;
        const precio = document.createElement("span");
        precio.textContent = `$${item.precio * item.cantidad}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "x";
        botonEliminar.addEventListener("click", () => eliminarProducto(item));

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const botonIncrementar = document.createElement("button");
        botonIncrementar.textContent = "+";
        botonIncrementar.addEventListener("click", () => incrementarCantidad(item));

        const botonDecrementar = document.createElement("button");
        botonDecrementar.textContent = "-";
        botonDecrementar.addEventListener("click", () => decrementarCantidad(item));

        buttonContainer.appendChild(botonIncrementar);
        buttonContainer.appendChild(botonDecrementar);
        buttonContainer.appendChild(botonEliminar);

        li.appendChild(nombreCantidad);
        li.appendChild(precio);
        li.appendChild(buttonContainer);
        carritoList.appendChild(li);
    });

    totalPrecio.textContent = `${total}`;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarColorCarrito();
}

function actualizarColorCarrito() {
    const carritoTitulo = document.getElementById("carrito-titulo");
    if (carrito.length > 0) {
        carritoTitulo.style.color = "green"; 
    } else {
        carritoTitulo.style.color = "orange"; 
    }
}

function eliminarProducto(item) {
    const index = carrito.indexOf(item);
    if (index !== -1) {
        total -= item.precio * item.cantidad;
        carrito.splice(index, 1);
        actualizarCarrito();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const abrirCarritoBtn = document.getElementById("abrir-carrito");
    const menuCarrito = document.getElementById("contenido-carrito");

    abrirCarritoBtn.addEventListener("click", function(event) {
        event.preventDefault();
        menuCarrito.classList.toggle("oculto");
    });

    const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
    cerrarCarritoBtn.addEventListener("click", function(event) {
        event.preventDefault();
        menuCarrito.classList.add("oculto");
    });
});