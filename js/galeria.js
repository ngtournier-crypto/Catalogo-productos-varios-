document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalGaleria");
  const modalImagen = document.getElementById("modalImagen");
  const modalTexto = document.getElementById("modalTexto");

  const btnCerrar = document.querySelector(".modal__cerrar");
  const btnAnterior = document.querySelector(".modal__anterior");
  const btnSiguiente = document.querySelector(".modal__siguiente");

  // Todas las imágenes de la galería
  const imagenes = document.querySelectorAll(".galeria img");

  let indiceActual = 0;

  function mostrarImagen(indice) {
    const imagen = imagenes[indice];

    modalImagen.src = imagen.src;
    modalImagen.alt = imagen.alt || "";

    modalTexto.textContent =
      imagen.dataset.descripcion ||
      imagen.alt ||
      "";

    modal.classList.add("abierto");
    modal.setAttribute("aria-hidden", "false");

    indiceActual = indice;
  }

  function cerrarModal() {
    modal.classList.remove("abierto");
    modal.setAttribute("aria-hidden", "true");
  }

  function siguienteImagen() {
    const nuevoIndice = (indiceActual + 1) % imagenes.length;
    mostrarImagen(nuevoIndice);
  }

  function anteriorImagen() {
    const nuevoIndice =
      (indiceActual - 1 + imagenes.length) % imagenes.length;
    mostrarImagen(nuevoIndice);
  }

  imagenes.forEach((img, indice) => {
    img.addEventListener("click", () => {
      mostrarImagen(indice);
    });
  });

  btnCerrar.addEventListener("click", cerrarModal);
  btnSiguiente.addEventListener("click", siguienteImagen);
  btnAnterior.addEventListener("click", anteriorImagen);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      cerrarModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (modal.getAttribute("aria-hidden") === "true") return;

    if (e.key === "Escape") cerrarModal();
    if (e.key === "ArrowRight") siguienteImagen();
    if (e.key === "ArrowLeft") anteriorImagen();
  });
});
