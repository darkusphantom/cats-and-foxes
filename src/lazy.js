/**
 * Función para verificar si el elemento se encuentra dentro de la pantalla
 * @param {Element} entry el elemento a utilizar
 * @returns true si el elemento está dentro de la pantalla
 */
const isIntersecting = (entry) => entry.isIntersecting;

/**
 * Carga la imagen y detiene su observador
 * @param {Element} entry el elemento de la imagen
 */
const loadImage = (entry) => {
  const container = entry.target;
  const image = container.firstChild;
  const url = image.dataset.src;
  image.src = url;
  observer.unobserve(container);
};

/**
 * El observador para identificar si un elemento se encuentra dentro de la pantalla
 */
const observer = new IntersectionObserver((entries) => {
  entries.filter(isIntersecting).forEach(loadImage);
});

/**
 *
 * @param {*} image
 */
export const registerImage = (image) => {
  observer.observe(image);
};
