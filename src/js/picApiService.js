import axios from 'axios';
export { fetchPictures };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '31598593-79bd95191575728407a30b47c';

async function fetchPictures(query) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`,
  );
  return response;
}
