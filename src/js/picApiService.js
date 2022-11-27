
// ----------вариант 1, не работает
// import axios from 'axios';


// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const KEY = '31598593-79bd95191575728407a30b47c';

// async function fetchPictures(query, page, perPage) {
//   const response = await axios.get(
//     `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
//   );
//   return response;
// }
// export { fetchPictures };


// --------вариант 2, не работает
// export const fetchPictures = async (query, page, perPage) => {
//   return await fetch(
//     `https://pixabay.com/api/?key=31598593-79bd95191575728407a30b47c&q=${query}&orientation=horizontal&safesearch=true&image_type=photo&page=${page}&per_page=${perPage}`
//   )
//     .then(async response => {
//       if (!response.ok) {
//         if (response.status === 404) {
//           return [];
//         }
//         throw new Error(response.status);
//       }
//       return await response.json();
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };
export default class PicApiService{
// ---------------вариант 3, пробуем
constructor(){
  this.searchQuery = '';
  this.page=1;
}

fetchPictures(){

  return fetch(`https://pixabay.com/api/?key=31598593-79bd95191575728407a30b47c&q=${this.searchQuery}&orientation=horizontal&safesearch=true&image_type=photo&page=${this.page}&per_page=12`)
  .then( r=> r.json())
  .then(data=>{
    this.page+=1;
    return data.hits;


  })
}

resetPage(){
  this.page =1;
}
get query(){
  return this.searchQuery;
}

set query(newQuery){
  this.searchQuery =newQuery;
}
}