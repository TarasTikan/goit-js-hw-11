import axios from 'axios';
import Picture from './fetchAPI'
import Notiflix from 'notiflix'
const btn = document.querySelector('[type="submit"]')
const inputEl = document.querySelector('[name="searchQuery"]')
const formEl = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const loadBtn = document.querySelector('.load-more')

let currentHits = 0;

formEl.addEventListener('submit', getPictureEL)

loadBtn.style.display = "none";

const picture = new Picture ()
async function getPictureEL (e){
    e.preventDefault()

    picture.serchPict = inputEl.value
    picture.resetPage()
    clear()
    if (picture.serchPict === '') {
      loadBtn.style.display = "none";
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
      }

picture.getPicture().then(cardImg => {
  if(cardImg.totalHits === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }else {
    loadBtn.style.display = "block";
  }

  currentHits = cardImg.hits.length;
  render(cardImg.hits)
})

}
function render (cardIMG) {
  // const [{webformatURL,largeImageURL,tags,likes,views,comments,downloads}] = cardIMG
    const galleryItem = cardIMG.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => {
        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`
    }).join('')
    gallery.insertAdjacentHTML('beforeend', galleryItem)
}

loadBtn.addEventListener('click', giveGallery)

function giveGallery () {
    picture.getPicture().then(cardImg => {
      render(cardImg.hits)
      currentHits += cardImg.hits.length;
      if (currentHits === cardImg.totalHits) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        loadBtn.style.display = "none";
      }
    })
}

function clear () {
    gallery.innerHTML = ''
}