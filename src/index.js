import './sass/index.scss';
import { fetchPictures } from './js/picApiService.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('.search-form');
const galleryBox = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onloadMore);

loadMoreBtn.classList.add('is-hidden');

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 12;

  function onSearch(e){
    e.preventDefault();
    page = 1;
    query = e.currentTarget.elements.searchQuery.value.trim();
    galleryBox.innerHTML='';
    if (!query){
          Notify.failure('The search string cannot be empty. Please specify your search query.');
          return;
        }
    loadMoreBtn.classList.remove('is-hidden');

    fetchPictures(query, page, perPage).then( ({ data }) =>{
      if (data.totalHits === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
      createMarkup(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
      }).refresh();
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }).catch(error => console.log(error))
         .finally(() => {
          searchForm.reset();

        });
  };

  function onloadMore(){
    page += 1;
    simpleLightBox.destroy();
    fetchPictures(query, page, perPage).then(({ data })=>{
      createMarkup(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
      }).refresh();
      const totalPages = Math.ceil(data.totalHits / perPage);
      if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        Notify.failure("We're sorry, but you've reached the end of search results.");
      }
    }).catch(error => console.log(error));
  };

//

function createMarkup(hits) {
  console.log(`Rendering...`);
  const markup = hits.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads })=>{
    return `<a class="gallery__item" href="${largeImageURL}">
      <div class="photo-card">
       <img src="${webformatURL}" alt="${tags}" width = "300" height="200" loading="lazy" />
         <div class="info">
         <p class="info-item"><b>Likes</b>${likes}</p>
         <p class="info-item"><b>Views</b>${views}</p>
         <p class="info-item"><b>Comments</b>${comments}</p>
         <p class="info-item"><b>Downloads</b>${downloads}</p>
         </div>
      </div>
    </a>`;
  }).join('');
  galleryBox.insertAdjacentHTML('beforeend',markup );};