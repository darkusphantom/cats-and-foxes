import { registerImage } from "./lazy";
import { URL_API_CAT, URL_API_FOX } from "./apis";

const app = document.querySelector("#app");
const btnAddFox = document.querySelector("#add-fox");
const btnAddCat = document.querySelector("#add-cat");

/**
 * Function to call a cat
 * @param {Number} page La página donde quieres obtener el gato
 * @return un gato
 */
const callCat = async (page) => {
  try {
    const res = await fetch(`${URL_API_CAT}/search?limit=${page}`);
    const cat = await res.json();
    return cat;
  } catch (error) {
    console.error(error);
    return {};
  }
};

/**
 * Obtiene un numero aleatorio
 * @param {Number} min el número minimo para el rango aleatorio
 * @param {Number} max el número maximo para el rango aleatorio
 * @returns un numero aleatorio
 */
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Crea una imagen y lo añade a un contenedor
 * @param {Element} img imagen a colocar dentro del contenedor
 * @returns Un contenedor con la imagen
 */
const createContainerImg = (img) => {
  const container = document.createElement("div");
  container.className = "container-image";
  container.appendChild(img);
  return container;
};

/**
 * Método para añadir zorros
 * @param {Event} event
 */
const addFox = (event) => {
  event.preventDefault();

  const id = getRandomNumber(1, 122);
  const img = document.createElement("img");
  img.dataset.src = `${URL_API_FOX}/${id}.jpg`;
  img.width = 150;
  img.height = 150;

  const newImage = createContainerImg(img);
  app.querySelector(".foxes").appendChild(newImage);
  setTimeout(() => registerImage(newImage), 1000);
};

/**
 * Método para añadir gatos
 * @param {Event} event
 */
const addCat = async (event) => {
  event.preventDefault();
  const id = getRandomNumber(0, 9);
  const cat = await callCat(id);

  if (cat === {}) {
    return;
  }

  const img = document.createElement("img");
  img.dataset.src = cat[0].url;
  img.width = cat[0].width;
  img.height = cat[0].height;

  const newImage = createContainerImg(img);
  app.querySelector(".cats").appendChild(newImage);
  setTimeout(() => registerImage(newImage), 1000);
};

btnAddFox.addEventListener("click", addFox);
btnAddCat.addEventListener("click", addCat);
