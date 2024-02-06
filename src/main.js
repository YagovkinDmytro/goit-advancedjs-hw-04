import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const galleryCard = document.querySelector('.gallery');

form.addEventListener('submit', handlerSearchPicture);

async function handlerSearchPicture(evt) {
  evt.preventDefault();
  const searchValue = evt.target.elements.searchQuery.value.trim();
  if (!searchValue) {
    return iziToast.error({
      title: 'Error',
      message: 'Please type your search image',
      position: 'topRight',
      timeout: 3000,
    });
  }
  servicePicture(searchValue);

  //createMarkup(dataPixabay);
}

async function servicePicture(searchValue) {
  const BASE_URL = 'https://pixabay.com/api/?';
  const API_KEY = '42224356-31537d6cd2f97832aeb8b3ce8';
  const searchTerm = searchValue;

  const params = new URLSearchParams({
    key: API_KEY,
    q: `${searchTerm}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const dataPixabay = await axios
    .get(`${BASE_URL}${params}`)
    .then(response => {
      return response.data.hits;
    })
    .catch(error => console.log(error));

  if (dataPixabay.length === 0) {
    return iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again.',
      position: 'topRight',
      timeout: 3000,
    });
  }
  iziToast.success({
    title: 'OK',
    message: 'Successfully found pictures!',
    position: 'topRight',
    timeout: 2000,
  });

  return console.log(dataPixabay);
}

async function createMarkup(dataPixabay) {
  const card = await dataPixabay
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>${likes}</b>
        </p>
            <p class="info-item">
        <b>${views}</b>
        </p>
        <p class="info-item">
            <b>${comments}</b>
        </p>
        <p class="info-item">
            <b>${downloads}</b>
        </p>
    </div>
</div>`;
      }
    )
    .join('');
  return galleryCard.insertAdjacentHTML('beforeend', card);
}
