'use strict';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const series = document.querySelector('.series__results');
const container = document.querySelector('.series__container');
const endpoint = 'http://api.tvmaze.com/search/shows?q=';

function getSeries (event) {
// 1- se conecte con la API y me devuelva series
// 2- coja el texto del input y lo añada al final de la URL
  fetch(endpoint + input.value)
    .then(response => response.json())
    .then(data => {
      console.log(data['']);
      // 3- me devuelva esas series y las pinte en la página
      // 4- cree un <li> para cada serie, con una <img> y un <h3>
      // 5- si alguna serie no tiene <img>, que le añada una por defecto
      for (item of data) {
        const newLi = document.createElement('li');
        const newH3 = document.createElement('h3');
        const newImage = document.createElement('img');
        series.appendChild(newLi);
        newLi.appendChild(newH3);
        newLi.appendChild(newImage);
        newLi.appendChild(item);
      }
    });
}

btn.addEventListener('click', getSeries);

