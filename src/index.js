import './sass/index.scss';
import { fetchPictures } from './js/picApiService.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('.search-form');
const galleryBox = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let query ='';
let simpleLightBox ='';
searchForm.addEventListener('submit', onSearch);

// search pic fn
function onSearch (evt){
  evt.preventDefault();
  query = evt.currentTarget.searchQuery.value.trim();
  // galleryBox.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  if (!query){
    Notify.failure('The search string cannot be empty. Please specify your search query.');
    return;
  }

  fetchPictures(query).then(({data}) => {
       console.log(data);
           renderMarkup(data);
           simpleLightBox = new SimpleLightbox('.gallery a').refresh();
           Notify.success(`Hooray! We found ${data.totalHits} images.`);
         })
         .catch(error => console.log(error))
         .finally(() => {
          searchForm.reset();
        });

};


function renderMarkup (images) {
  const markup = images.map(image => {
    const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
    return
    `<a class="gallery__item" href="${largeImageURL}">
      <div class="photo-card">
       <img src="${webformatURL}" alt="${tags}" loading="lazy" />
         <div class="info">
         <p class="info-item"><b>Likes</b>${likes}</p>
         <p class="info-item"><b>Views</b>${views}</p>
         <p class="info-item"><b>Comments</b>${comments}</p>
         <p class="info-item"><b>Downloads</b>${downloads}</p>
         </div>
      </div>
    </a>`;
  }).join('');

  galleryBox.insertAdjacentHTML('beforeend', markup);
    };

