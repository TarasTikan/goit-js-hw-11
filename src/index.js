import axios from 'axios';
import Picture from './fetchAPI'
import Notiflix from 'notiflix'
const btn = document.querySelector('[type="submit"]')
const inputEl = document.querySelector('[name="searchQuery"]')
const formEl = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const loadBtn = document.querySelector('.load-more')
formEl.addEventListener('submit', getPictureEL)

const picture = new Picture ()
async function getPictureEL (e){
    e.preventDefault()

    picture.newValueInp = inputEl.value
    //   else if (picture.newValueInp !== )
    clear()
    if (picture.newValueInp === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
      }
picture.getPicture().then(cardIMG => {
})
}
function render (cardIMG) {
    const galleryItem = cardIMG.map(([{webformatURL,largeImageURL,tags,likes,views,comments,downloads}]) => {
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
// let page = 1
function giveGallery () {
    picture.getPicture().then(render)
}

function clear () {
    gallery.innerHTML = ''
}