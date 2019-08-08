'use strict';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const series = document.querySelector('.series__results');
let favorites = document.querySelector('.favs__results');
const favsContainer = document.querySelector('.favs');
const endpoint = 'http://api.tvmaze.com/search/shows?q=';
let newLi = '';
let newH3 = '';
let newImage = '';

function getSeries () {
// 1- se conecte con la API y me devuelva series
// 2- coja el texto del input y lo añada al final de la URL
  resetSearch();
  fetch(endpoint + input.value)
    .then(response => response.json())
    .then(data => {
      // 3- me devuelva esas series y las pinte en un <li> para cada serie, con una <img> y un <h3>
      for (let item of data) {
        newLi = document.createElement('li');
        newLi.classList.add('show__item');
        newH3 = document.createElement('h3');
        newImage = document.createElement('img');
        series.appendChild(newLi);
        newLi.appendChild(newImage);
        newLi.appendChild(newH3);
        newH3.innerHTML = item.show.name;
        // 4- si alguna serie no tiene <img>, que le añada una por defecto
        if (item.show.image !== null) {
          newImage.src = item.show.image.medium;
          newImage.alt = item.show.name;
        } else {
          newImage.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
          newImage.alt = 'Default empty image';
        }
        newLi.addEventListener('click', getFavs);
      }
    });
}
btn.addEventListener('click', getSeries);

function resetSearch () {
  // 5- cuando haga una nueva búsqueda no quiero tener las anteriores en pantalla
  series.innerHTML = '';
}

function searchWithEnter() {
  if(event.keyCode===13) {
    getSeries();
  }
}
input.addEventListener('keypress', searchWithEnter);

//crear un array de pelis favoritas
// 1- cambiar los estilos de fondo y color de fuente a la que seleccione
// 2- moverlos a otra lista
function getFavs (){
  event.currentTarget.classList.toggle('show__fav');
  favsContainer.classList.remove('hidden');
  addFav();
}

function addFav () {
  let newFavLi = document.createElement('li');
  let newFavImage = document.createElement('image');
  let newFavH3 = document.createElement('h3');
  newFavLi.classList.add('show__item_fav');
  favorites.appendChild(newFavLi);
  newFavLi.appendChild(newFavImage);
  newFavLi.appendChild(newFavH3);
  newFavH3.innerHTML = event.currentTarget.innerHTML;
}
function removeFav () {
  favorites.remove();
}
