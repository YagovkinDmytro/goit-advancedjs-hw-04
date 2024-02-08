import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const galleryCard = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

form.addEventListener('submit', handlerSearchPicture);
form.addEventListener('input', handlerSearchInput);
loadMore.addEventListener('click', handlerLoadMore);

let searchValue;
let currentPage = 1;

const galleryModal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function handlerSearchPicture(evt) {
  evt.preventDefault();
  galleryCard.innerHTML = '';
  loadMore.style.visibility = 'hidden';
  searchValue = evt.target.elements.searchQuery.value.trim();

  if (!searchValue) {
    return iziToast.error({
      title: 'Error',
      message: 'Please type your search image',
      position: 'topRight',
      timeout: 3000,
    });
  }

  const dataPicture = await servicePicture(searchValue);
  const { hits, totalHits } = dataPicture.data;

  if (hits.length === 0) {
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
    message: `Hooray! We found ${totalHits} images.`,
    position: 'topRight',
    timeout: 2000,
  });

  renderMarkup(hits);
  galleryModal.refresh();

  if (totalHits > 40) {
    loadMore.style.visibility = 'visible';
  } else {
    iziToast.info({
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
      timeout: 2000,
    });
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

  const dataPixabay = await axios.get(`${BASE_URL}${params}`);
  return dataPixabay;
}

function renderMarkup(arr) {
  const markupCard = arr
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
  galleryCard.insertAdjacentHTML('beforeend', markupCard);
}

async function handlerLoadMore() {
  currentPage += 1;
  const searchValue = form.elements.searchQuery.value;
  const dataPicture = await servicePicture(searchValue, currentPage);
  const { hits, totalHits } = dataPicture.data;
  renderMarkup(hits);
  galleryModal.refresh();
  const counter = Math.ceil(totalHits / 40);
  if (currentPage === counter) {
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

function handlerSearchInput() {
  galleryCard.innerHTML = '';
  loadMore.style.visibility = 'hidden';
}
