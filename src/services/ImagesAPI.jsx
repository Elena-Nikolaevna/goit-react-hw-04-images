
import axios from 'axios';
const API_KEY = '28801959-c80fb9d6110e7835101e93207';

export function getImages(query, pageNumber) {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => {
      return response.data;
    });
}