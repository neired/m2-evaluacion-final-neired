'use strict';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const series = document.querySelector('.series__results');
let favoritesList = document.querySelector('.favs__results');
const endpoint = 'http://api.tvmaze.com/search/shows?q=';
let newLi = '';
let newH3 = '';
let newImage = '';
let favorites = [];

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
        newLi.dataset['id'] = item.show.id;
        newLi.classList.add('show__item');
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

function addFav (event) {
  //cambia los estilos de fondo y color de fuente a la que seleccione como favorita
  let currentShow = event.currentTarget;
  currentShow.classList.toggle('show__fav');
  let newFavLi ='';
  let object = currentShow.dataset['id'];

  function findShowInFavs(favorites) {
    return favorites.id === object;
  }
  const indexFav = favorites.findIndex(findShowInFavs);

  if ((JSON.parse(localStorage.getItem('favorites')))){
    favorites = JSON.parse(localStorage.getItem('favorites'));
  } else {
    favorites = [];
  }

  if (indexFav > -1) {
    console.log(indexFav);
    favorites.splice(indexFav, 1);
    console.log(favorites);
  } else {
    const selectedShowSrc = currentShow.querySelector('.show__item-img').src;
    const selectedShowName = currentShow.querySelector('.show__item-name').innerHTML;
    favorites.push({id:object, src:selectedShowSrc, name:selectedShowName});

    newFavLi = document.createElement('li');
    newFavLi.classList.add('show__item_fav');
    favoritesList.appendChild(newFavLi);
    newFavLi.innerHTML = currentShow.innerHTML;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

reload ();
function reload () {
  if (JSON.parse(localStorage.getItem('favorites'))){
    for (const item of JSON.parse(localStorage.getItem('favorites'))){
      const newLi = document.createElement('li');
      newLi.classList.add('show__item_fav');
      favoritesList.appendChild(newLi);
      newH3 = document.createElement('h3');
      newH3.classList.add('show__item-name');
      newImage = document.createElement('img');
      newImage.classList.add('show__item-img');
      newLi.appendChild(newImage);
      newLi.appendChild(newH3);
      newH3.innerHTML = item.name;
      newImage.src = item.src;
    }
  }
}
