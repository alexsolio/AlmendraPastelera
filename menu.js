const fetchData = async () => {
    try {
      const response = await fetch("./data.json");
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
  
  const carritoContainer = document.getElementById("carrito-container");
  const carritoList = document.getElementById("carrito-list");
  const totalPrecio = document.getElementById("total-precio");
  let carrito = [];
  let total = 0;
  
  const contenedorPrincipal = document.createElement("div");
  contenedorPrincipal.classList.add("contenedor-comida");
  
  const botonVaciarCarrito = document.getElementById("vaciar-carrito");
  
  botonVaciarCarrito.addEventListener("click", () => {
    carrito = [];
    total = 0;
    actualizarCarrito();
    actualizarColorCarrito();
    alert("Carrito vacío.");
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
  
      // Botón para eliminar
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
      buttonContainer.appendChild(botonEliminar); // Agregar el botón de eliminar
  
      li.appendChild(nombreCantidad);
      li.appendChild(precio);
      li.appendChild(buttonContainer);
      carritoList.appendChild(li);
    });
  
    totalPrecio.textContent = `${total}`;
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
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
  }
  
  // Función para eliminar un producto
  function eliminarProducto(item) {
    const index = carrito.indexOf(item);
    if (index !== -1) {
      total -= item.precio * item.cantidad;
      carrito.splice(index, 1);
      actualizarCarrito();
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const abrirCarritoBtn = document.getElementById("abrir-carrito");
    const menuCarrito = document.getElementById("contenido-carrito");
  
    abrirCarritoBtn.addEventListener("click", function (event) {
      event.preventDefault();
      menuCarrito.classList.toggle("oculto");
    });
  
    const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
    cerrarCarritoBtn.addEventListener("click", function (event) {
      event.preventDefault();
      menuCarrito.classList.add("oculto");
    });
  });
  
  // Inicializar el carrito al cargar la página
  document.addEventListener("DOMContentLoaded", function () {
    inicializarCarrito();
  });
  
  function inicializarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
      actualizarCarrito();
    }
  }
  