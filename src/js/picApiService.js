import axios from 'axios';


axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '31598593-79bd95191575728407a30b47c';

// async function fetchPictures(query) {
//   const response = await axios.get(
//     `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`,
//   );
//   return response;
// }
// export { fetchPictures };
export const fetchPictures = async (query) => {
  return await fetch(
    `https://pixabay.com/api/?key=31598593-79bd95191575728407a30b47c&q=${query}&orientation=horizontal&safesearch=true&image_type=photo`
  )
    .then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
};