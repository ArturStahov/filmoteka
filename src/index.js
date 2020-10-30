import './sass/main.scss';
import './js/navigation';
import img from './images/temp.png';
import refs from './js/refs.js';
import { renderFilmList, fetchPopularMoviesList, baseUrl, apiKey, pageNumber, formattingFethData } from './js/initialHomePage';
import { usersSearch, renderForm, renderNavigate } from './js/searchAndPaginationHomePage';
import formTemplate from './template/homePageForm.hbs';
import filmListTemplate from './template/homePageContent.hbs';
import navigateTemplate from './template/homePageNav.hbs';


// render form
renderForm(formTemplate);

//render navigations
renderNavigate(navigateTemplate);


// render movies
fetchPopularMoviesList(baseUrl, pageNumber, apiKey).then(data => {
    const arrData = data.results;
    renderFilmList(filmListTemplate, formattingFethData(arrData));
    refs.homePage.querySelector('.page').innerHTML = pageNumber;
});

//render query
usersSearch();

//при переходе на HomePage  вызвать controlGlobalPage.setStartPage() в navigation.js при клике на кнопку Home
// ===>/controlGlobalPage импортнуть с ./js/searchAndPaginationHomePage НАДА ДЛЯ ПАГИНАЦИИ!