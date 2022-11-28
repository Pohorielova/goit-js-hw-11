
// ----------вариант 1, не работает
import axios from 'axios';


axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '31598593-79bd95191575728407a30b47c';

async function fetchPictures(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  );
  return response;
}
export { fetchPictures };