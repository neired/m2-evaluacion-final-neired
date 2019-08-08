'use strict';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const series = document.querySelector('.series__results');
// const container = document.querySelector('.series__container');
const endpoint = 'http://api.tvmaze.com/search/shows?q=';

function getSeries () {
// 1- se conecte con la API y me devuelva series
// 2- coja el texto del input y lo añada al final de la URL
  fetch(endpoint + input.value)
    .then(response => response.json())
    .then(data => {
      // 3- me devuelva esas series y las pinte en un <li> para cada serie, con una <img> y un <h3>
      for (let item of data) {
        const newLi = document.createElement('li');
        newLi.classList.add('show__style');
        const newH3 = document.createElement('h3');
        const newImage = document.createElement('img');
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
      }
    });
}
// 5- cuando haga una nueva búsqueda no quiero tener las anteriores en pantalla
function resetSearch () {
  series.innerHTML = '';
}
function getNewSearch () {
  if (series.innerHTML === '') {
    getSeries();
  } else {
    resetSearch();
    getSeries();
  }
}
btn.addEventListener('click', getNewSearch);

function compareWithEnter() {
  if(event.keyCode===13) {
    getNewSearch();
  }
}
input.addEventListener('keypress', compareWithEnter);

