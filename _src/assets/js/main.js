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

let showName = '';
function getSeries () {
  resetSearch();
  fetch(endpoint + input.value)
    .then(response => response.json())
    .then(data => {
      //me devuelve las series y las pinta en un <li> para cada serie, con una <img> y un <h3>
      for (let item of data) {
        showName = item.show.name;
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
        //si alguna serie no tiene <img>, que le añada una por defecto
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

//hace un array con las pelis que salen y les pone un listener a todas para marcarlas como favs
function selectFav () {
  const myShows = document.querySelectorAll('.show__item');
  for (const show of myShows) {
    show.addEventListener('click', addFav);
  }
}
let newFavLi ='';

function addFav () {
  //cambia los estilos de fondo y color de fuente a la que seleccione como favorita
  let currentShow = event.currentTarget;
  currentShow.classList.toggle('show__fav');
  favsContainer.classList.remove('hidden');
  const favShowName = currentShow.getAttribute('data-name');

  //hace un array con las pelis favoritas si tienen la clase show__fav
  if (currentShow.classList.contains('show__fav') === true) {
    //si lo he marcado como fav y no estaba, al array y a la lista de favoritos
    if (favorites.includes(favShowName) !== true){
      favorites.push(favShowName);

      newFavLi = document.createElement('li');
      newFavLi.classList.add('show__item_fav');
      newFavLi.setAttribute('data-fav', favShowName);
      favoritesList.appendChild(newFavLi);
      newFavLi.innerHTML = currentShow.innerHTML;

      localStorage.setItem('favshow', favShowName);
    }
    console.log(favorites);
  } else {
    //si ya está de antes y lo estoy re-marcando, me lo borras
    const i = favorites.indexOf(favShowName);
    if (i > -1) {
      favorites.splice(i, 1);
      favoritesList.removeChild(newFavLi);
    }
    console.log(favorites);
  }
}

//copia los elementos del array a la lista de favoritos
// function paintFavs () {
// console.log(favorites);

// }

