import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const galleryCard = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

form.addEventListener('submit', handlerSearchPicture);
loadMore.addEventListener('click', handlerLoadMore);

let searchValue;
let currentPage = 1;

async function handlerSearchPicture(evt) {
  evt.preventDefault();
  searchValue = evt.target.elements.searchQuery.value.trim();

  if (!searchValue) {
    return iziToast.error({
      title: 'Error',
      message: 'Please type your search image',
      position: 'topRight',
      timeout: 3000,
    });
  }

  const dataPixabay = await servicePicture(searchValue);
  const picturesArr = dataPixabay.hits;

  if (dataPixabay.hits.length === 0) {
    return iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again.',
      position: 'topRight',
      timeout: 2000,
    });
  }
  iziToast.success({
    title: 'OK',
    message: `Hooray! We found ${dataPixabay.totalHits} images.`,
    position: 'topRight',
    timeout: 2000,
  });

  galleryCard.innerHTML = createMarkup(picturesArr);
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  if (dataPixabay.totalHits > 40) {
    loadMore.style.visibility = 'visible';
  }
  currentPage = 1;
}

async function servicePicture(searchValue, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/?';
  const API_KEY = '42224356-31537d6cd2f97832aeb8b3ce8';
  const searchTerm = searchValue;
  const params = new URLSearchParams({
    key: API_KEY,
    q: `${searchTerm}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });

  const dataPixabay = await axios.get(`${BASE_URL}${params}`).then(response => {
    return response.data;
  });
  return dataPixabay;
}

function createMarkup(arr) {
  return arr
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
        return `<a href="${largeImageURL}"><div class="photo-card">
    <img class="small-picture" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            <b>${likes}</b>
        </p>
            <p class="info-item">
            <b>Views</b>
            <b>${views}</b>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <b>${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <b>${downloads}</b>
        </p>
    </div>
</div></a>
    `;
      }
    )
    .join('');
}

async function handlerLoadMore() {
  currentPage += 1;
  const searchValue = form.elements.searchQuery.value;
  const dataPixabay = await servicePicture(searchValue, currentPage);
  const picturesArr = dataPixabay.hits;
  galleryCard.insertAdjacentHTML('beforeend', createMarkup(picturesArr));
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  const counter = Number(dataPixabay.totalHits) / 40;
  if (currentPage >= counter) {
    loadMore.style.visibility = 'hidden';
    form.reset();
    iziToast.info({
      title: '',
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
      timeout: 2000,
    });
  }
}
