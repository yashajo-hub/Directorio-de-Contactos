let contactos = [];
let siguienteId = 1;

const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const btnAgregar = document.getElementById("btn-agregar");
const buscador = document.getElementById("buscador");
const lista = document.getElementById("lista");
const mensajeVacio = document.getElementById("mensaje-vacio");
const contador = document.getElementById("contador");

function agregarContacto() {
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

  // Validación: sin nombre o sin teléfono no se hace nada
  if (nombre === "" || telefono === "") {
    return;
  }

  contactos.push({ id: siguienteId++, nombre: nombre, telefono: telefono });

  inputNombre.value = "";
  inputTelefono.value = "";
  inputNombre.focus();

  render();
}

function eliminarContacto(id) {
  contactos = contactos.filter(function (c) {
    return c.id !== id;
  });
  render();
}

function crearElementoContacto(contacto) {
  const li = document.createElement("li");
  li.className = "contacto";

  const info = document.createElement("div");
  info.className = "contacto-info";

  const nombre = document.createElement("span");
  nombre.className = "contacto-nombre";
  nombre.textContent = contacto.nombre;

  const telefono = document.createElement("span");
  telefono.className = "contacto-telefono";
  telefono.textContent = contacto.telefono;

  info.appendChild(nombre);
  info.appendChild(telefono);

  const btnEliminar = document.createElement("button");
  btnEliminar.type = "button";
  btnEliminar.className = "btn-eliminar";
  btnEliminar.textContent = "Eliminar";

  // Un event listener por cada botón de eliminar
  btnEliminar.addEventListener("click", function () {
    eliminarContacto(contacto.id);
  });

  li.appendChild(info);
  li.appendChild(btnEliminar);
  return li;
}

function render() {
  const termino = buscador.value.trim().toLowerCase();

  // El filtro solo afecta lo que se muestra, no el array original
  const visibles = contactos.filter(function (c) {
    return c.nombre.toLowerCase().includes(termino);
  });

  lista.innerHTML = "";
  visibles.forEach(function (c) {
    lista.appendChild(crearElementoContacto(c));
  });

  if (contactos.length === 0) {
    mensajeVacio.textContent = "Todavía no agregaste contactos.";
    mensajeVacio.hidden = false;
  } else if (visibles.length === 0) {
    mensajeVacio.textContent = "No hay contactos que coincidan con la búsqueda.";
    mensajeVacio.hidden = false;
  } else {
    mensajeVacio.hidden = true;
  }

  // El contador siempre refleja el total real, nunca los filtrados
  contador.textContent = "Contactos: " + contactos.length;
}

