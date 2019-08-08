'use strict';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const series = document.querySelector('.series__results');
let favoritesList = document.querySelector('.favs__results');
const favsContainer = document.querySelector('.favs');
const endpoint = 'http://api.tvmaze.com/search/shows?q=';
let newLi = '';
let newH3 = '';
let newImage = '';
const favorites = [];

function resetSearch () {
  series.innerHTML = '';
}
function searchWithEnter() {
  if(event.keyCode===13) {
    getSeries();
  }
}
input.addEventListener('keypress', searchWithEnter);

function getSeries () {
  resetSearch();
  fetch(endpoint + input.value)
    .then(response => response.json())
    .then(data => {
      // 3- me devuelva esas series y las pinte en un <li> para cada serie, con una <img> y un <h3>
      for (let item of data) {
        let showName = item.show.name;
        let showImage = item.show.image;
        newLi = document.createElement('li');
        newLi.classList.add('show__item');
        newLi.setAttribute('data-name', showName);
        newH3 = document.createElement('h3');
        newH3.classList.add('show__item-name');
        newImage = document.createElement('img');
        newImage.classList.add('show__item-img');
        series.appendChild(newLi);
        newLi.appendChild(newImage);
        newLi.appendChild(newH3);
        newH3.innerHTML = showName;
        // 4- si alguna serie no tiene <img>, que le añada una por defecto
        if (showImage !== null) {
          newImage.src = showImage.medium;
          newImage.alt = showName;
        } else {
          newImage.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
          newImage.alt = `${showName} image`;
        }
        selectFav ();
        // newLi.addEventListener('click', getFavs);
      }
    });
}
btn.addEventListener('click', getSeries);

// 3- moverlos a otra lista

// function getFavs (){
//   console.log(event.currentTarget);
//   event.currentTarget.classList.toggle('show__fav');
//   favsContainer.classList.remove('hidden');
//   addFav();
// }
function addFav () {
  // 1- cambiar los estilos de fondo y color de fuente a la que seleccione como favorita
  const currentShow = event.currentTarget;
  currentShow.classList.toggle('show__fav');
  favsContainer.classList.remove('hidden');
  const favShowName = currentShow.getAttribute('data-name');
  // 2- hacer un array con las pelis favoritas
  if (currentShow.classList.contains('show__fav') === true) {
    //si lo he marcado como fav, al array (si no está ya de antes, claro)
    if (favorites.includes(favShowName) !== true){
      favorites.push(favShowName);
      let newFavLi = document.createElement('li');
      // newFavLi.classList.add('show__item_fav');
      favoritesList.appendChild(newFavLi);
      newFavLi.innerHTML = event.currentTarget.innerHTML;
// }
    }
  } else {
    //si ya está de antes y lo estoy re-marcando, me lo borras
    const i = favorites.indexOf(favShowName);
    if (i > -1) {
      favorites.splice(i, 1);
    }
  }
  console.log(favorites);
}
//hace un array con las pelis que salen y les pone un listener a todas para marcarlas como favs
function selectFav () {
  const myShows = document.querySelectorAll('.show__item');
  for (const show of myShows) {
    show.addEventListener('click', addFav);
  }
}

//   {
//   let newFavLi = document.createElement('li');
//   newFavLi.classList.add('show__item_fav');
//   favorites.appendChild(newFavLi);
//   newFavLi.innerHTML = event.currentTarget.innerHTML;
// }
