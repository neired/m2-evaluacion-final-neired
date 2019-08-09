"use strict";const btn=document.querySelector(".btn"),input=document.querySelector(".input"),series=document.querySelector(".series__results");let favoritesList=document.querySelector(".favs__results");const endpoint="http://api.tvmaze.com/search/shows?q=";let newLi="",newH3="",newImage="",favorites=[];function resetSearch(){series.innerHTML=""}function searchWithEnter(){13===event.keyCode&&getSeries()}input.addEventListener("keypress",searchWithEnter);let showName="";function getSeries(){resetSearch(),fetch(endpoint+input.value).then(e=>e.json()).then(e=>{for(let t of e){showName=t.show.name;let e=t.show.image;(newLi=document.createElement("li")).dataset.id=t.show.id,newLi.classList.add("show__item"),(newH3=document.createElement("h3")).classList.add("show__item-name"),(newImage=document.createElement("img")).classList.add("show__item-img"),series.appendChild(newLi),newLi.appendChild(newImage),newLi.appendChild(newH3),newH3.innerHTML=showName,null!==e?(newImage.src=e.medium,newImage.alt=showName):(newImage.src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV",newImage.alt=`${showName} image`),selectFav()}})}function selectFav(){const e=document.querySelectorAll(".show__item");for(const t of e)t.addEventListener("click",addFav)}function addFav(e){let t=e.currentTarget;t.classList.toggle("show__fav");let n="",s=t.dataset.id;const a=favorites.findIndex(function(e){return e.id===s});if(favorites=JSON.parse(localStorage.getItem("favorites"))?JSON.parse(localStorage.getItem("favorites")):[],a>-1)console.log(a),favorites.splice(a,1),console.log(favorites);else{const e=t.querySelector(".show__item-img").src,a=t.querySelector(".show__item-name").innerHTML;favorites.push({id:s,src:e,name:a}),(n=document.createElement("li")).classList.add("show__item_fav"),favoritesList.appendChild(n),n.innerHTML=t.innerHTML,localStorage.setItem("favorites",JSON.stringify(favorites))}}function reload(){if(JSON.parse(localStorage.getItem("favorites")))for(const e of JSON.parse(localStorage.getItem("favorites"))){const t=document.createElement("li");t.classList.add("show__item_fav"),favoritesList.appendChild(t),(newH3=document.createElement("h3")).classList.add("show__item-name"),(newImage=document.createElement("img")).classList.add("show__item-img"),t.appendChild(newImage),t.appendChild(newH3),newH3.innerHTML=e.name,newImage.src=e.src}}btn.addEventListener("click",getSeries),reload();const btnReset=document.querySelector(".reset-btn");function resetData(){favoritesList.innerHTML="",favorites="",localStorage.clear(),series.innerHTML="",input.value=""}btnReset.addEventListener("click",resetData);