const URL_API_FOX = "https://randomfox.ca/images"; // El maximo de imagenes es 122
const URL_API_CAT = "https://api.thecatapi.com/v1/images";

const app = document.querySelector("#app");
const btnAddFox = document.querySelector("#add-fox");
const btnAddCat = document.querySelector("#add-cat");

/**
 * Function to call a cat
 *
 * @param {Number} page
 * @return cat
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

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createContainerImg = (img) => {
  const container = document.createElement("div");
  container.className = "container-image";
  container.appendChild(img);
  return container;
};

/**
 * Método para añadir zorros
 * @param {*} event
 */
const addFox = (event) => {
  event.preventDefault();

  const id = getRandomNumber(1,122)
  const img = document.createElement("img");
  img.src = `${URL_API_FOX}/${id}.jpg`;
  img.width = 150;

  const container = createContainerImg(img);
  app.querySelector("#add-fox").insertAdjacentElement("beforeBegin", container);
};

/**
 * Método para añadir gatos
 * @param {*} event
 */
const addCat = async (event) => {
  event.preventDefault();
  const id = getRandomNumber(0, 9);
  const cat = await callCat(id);

  if (cat === {}) {
    return;
  }

  const img = document.createElement("img");
  img.src = cat[0].url;
  img.width = cat[0].width;
  img.height = cat[0].height;

  const container = createContainerImg(img);
  app.querySelector("#add-cat").insertAdjacentElement("beforeBegin", container);
};

btnAddFox.addEventListener("click", addFox);
btnAddCat.addEventListener("click", addCat);
