import refs from './refs';
import homePageTpl from '../template/homePageContent.hbs';
import 'material-design-icons/iconfont/material-icons.css';

let formRef = null;
let btn_next = null;
let btn_prev = null;
let page_span = null;

const renderForm = template => {
  refs.homePage.insertAdjacentHTML('afterbegin', template());
};

const renderNavigate = template => {
  refs.homePage.insertAdjacentHTML('beforeend', template());
};

function usersSearch() {
  formRef = refs.homePage.querySelector('form');
  formRef.addEventListener('submit', searchFilmsHandler);
  btn_next = refs.homePage.querySelector('.button-next');
  btn_prev = refs.homePage.querySelector('.button-prev');
  page_span = refs.homePage.querySelector('.page');
  btn_next.addEventListener('click', handlerNext);
  btn_prev.addEventListener('click', handlerPrev);
  if (films.isStartPage) {
    btn_prev.setAttribute('disabled', 'disabled');
  }
}

function handlerNext() {
  films.incrementPage();
  fetchMovies();
  btn_prev.removeAttribute('disabled');
}
function handlerPrev() {
  if (films.pageNumb === 1) {
    btn_prev.setAttribute('disabled', 'disabled');
  }
  if (films.isStartPage === false) {
    films.decrementPage();
    fetchMovies();
  }
}
function searchFilmsHandler(event) {
  event.preventDefault();
  films.resetPage();
  const formData = new FormData(formRef);
  const userInput = formData.get('query');

  if (!userInput) return;
  films.inputValue = userInput;

  fetchMovies();
}

function fetchMovies() {
  films.fetchFilms().then(data => {
    const requir = refs.homePage.querySelector('.form-search__requirements');
    if (data.length === 0) {
      requir.classList.remove('is-hidden');
      btn_next.setAttribute('disabled', 'disabled');
    } else {
      requir.classList.add('is-hidden');
    }
    const markup = data.length === 0 ? '' : homePageTpl(data);
    refs.homePage.querySelector('.home-page-list').innerHTML = markup;
    page_span.innerHTML = films.pageNumb;
    console.log('data', data);
  });
}

const apiKey = '81f248d3c9154788229a5419bb33091a';

const films = {
  isStartPage: true,
  inputValue: '',
  pageNumb: 1,
  async fetchFilms() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${this.inputValue}&page=${this.pageNumb}&include_adult=false`,
      );

      const data = await response.json();
      console.log('data', data);
      console.log('pages', data.total_pages);
      return data.results;
    } catch (error) {
      throw error;
    }
  },
  resetPage() {
    this.pageNumb = 1;
  },
  incrementPage() {
    this.pageNumb++;
    this.isStartPage = false;
  },
  decrementPage() {
    this.pageNumb--;
    if (this.pageNumb === 1) {
      this.isStartPage = true;
    }
  },
  get query() {
    return this.inputValue;
  },
  set query(value) {
    this.inputValue = value;
  },
};

export { usersSearch, renderForm, renderNavigate };
