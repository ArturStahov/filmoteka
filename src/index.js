import './sass/main.scss';
import './js/navigation';
import img from './images/temp.png';
import refs from './js/refs.js';
import {
  renderFilmList,
  fetchPopularMoviesList,
  baseUrl,
  apiKey,
  pageNumber,
  formattingFethData,
} from './js/initialHomePage';
import {
  usersSearch,
  renderForm,
  renderNavigate,
} from './js/searchAndPaginationHomePage';
import { serviceLibraryButtons } from './js/libraryPage';
import formTemplate from './template/homePageForm.hbs';
import filmListTemplate from './template/homePageContent.hbs';
import navigateTemplate from './template/homePageNav.hbs';
import myFilmLibraryPageButtons from './template/myFilmLibraryPageButtons.hbs';

// render form
renderForm(formTemplate);

//render navigations
renderNavigate(navigateTemplate);

//render library buttons
serviceLibraryButtons(myFilmLibraryPageButtons);

// render movies
fetchPopularMoviesList(baseUrl, pageNumber, apiKey).then(data => {
  const arrData = data.results;
  renderFilmList(filmListTemplate, formattingFethData(arrData));
});

//render query
usersSearch();
