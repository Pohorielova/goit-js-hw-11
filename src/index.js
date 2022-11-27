import './sass/index.scss';
// import { fetchPictures } from './js/picApiService.js';
import PicApiService from './js/picApiService.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('.search-form');
const galleryBox = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
// ----------вариант 1, не работает
// let query ='';
// let simpleLightBox ='';
// searchForm.addEventListener('submit', onSearch);
// let page = 1;
// const perPage = 40;
// // search pic fn
// function onSearch (evt){
//   evt.preventDefault();
//   page = 1;
//   query = evt.currentTarget.elements.searchQuery.value.trim();
//   // galleryBox.innerHTML = '';
//   loadMoreBtn.classList.add('is-hidden');
//   if (!query){
//     Notify.failure('The search string cannot be empty. Please specify your search query.');
//     return;
//   }
//   fetchPictures(query, page, perPage).then(({data}) => {
//            renderMarkup(data.hits);
//            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
//            Notify.success(`Hooray! We found ${data.totalHits} images.`);
//          })
//          .catch(error => console.log(error))
//          .finally(() => {
//           searchForm.reset();
//         });
// };
// function renderMarkup (data) {
//   const markup = data.hits.map(image => {
//     const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
//     return
//     `<a class="gallery__item" href="${largeImageURL}">
//       <div class="photo-card">
//        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//          <div class="info">
//          <p class="info-item"><b>Likes</b>${likes}</p>
//          <p class="info-item"><b>Views</b>${views}</p>
//          <p class="info-item"><b>Comments</b>${comments}</p>
//          <p class="info-item"><b>Downloads</b>${downloads}</p>
//          </div>
//       </div>
//     </a>`;
//   }).join('');
//   galleryBox.insertAdjacentHTML('beforeend', markup);
//     };


searchForm.addEventListener('submit', onSearch);
// ----------вариант 2, пробуем
loadMoreBtn.addEventListener('click', onloadMore);
loadMoreBtn.classList.add('is-hidden');

const picApiService = new PicApiService();
  function onSearch(e){
    e.preventDefault();
    galleryBox.innerHTML='';
    picApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    picApiService.resetPage();
    if (!picApiService.query){
          Notify.failure('The search string cannot be empty. Please specify your search query.');
          return;
        }
    loadMoreBtn.classList.remove('is-hidden');

    picApiService.fetchPictures().then( hits =>{
      createMarkup(hits);
      simpleLightBox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
      }).refresh();
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }).catch(error => console.log(error))
         .finally(() => {
          searchForm.reset();
          
        });
  };

  function onloadMore(e){
    picApiService.fetchPictures().then(hits=>{
      createMarkup(hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    });
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
