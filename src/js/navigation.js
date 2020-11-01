import footerTemplate from '../template/footer.hbs';
import headerTemplate from '../template/header.hbs';
import refs from './refs';
import 'material-design-icons/iconfont/material-icons.css';
import { showDetails } from './filmDetailsPage';
import { drawQueueFilmList } from './libraryPage';
import { baseUrl, apiKey } from './initialHomePage';
import { controlGlobalPage, homePagePagination } from './searchAndPaginationHomePage';


const activeHomePage = () => {
  refs.homePage.classList.remove('notActivePage');
  refs.myFilmLibraryPage.classList.add('notActivePage');
  refs.detailsPage.classList.add('notActivePage');
};

const activeLibraryPage = () => {
  refs.myFilmLibraryPage.classList.remove('notActivePage');
  refs.detailsPage.classList.add('notActivePage');
  refs.homePage.classList.add('notActivePage');
};

const activeDetailsPage = (movied) => {
  refs.homePage.classList.add('notActivePage');
  refs.myFilmLibraryPage.classList.add('notActivePage');
  refs.detailsPage.classList.remove('notActivePage');
  showDetails(movied);
};

function renderHeader(){
  refs.header.insertAdjacentHTML('afterbegin', headerTemplate());
}

function renderFooter(){
  refs.footer.insertAdjacentHTML('afterbegin', footerTemplate());
}

function addHeaderListener(){
  refs.linkLogo = refs.header.querySelector('.js-logo');
  refs.linkHome = refs.header.querySelector('.js-home');
  refs.linkMyLibrary = refs.header.querySelector('.js-myLibrary');

  refs.linkLogo.addEventListener('click', linkLogoHandler);
  refs.linkHome.addEventListener('click', linkHomeHandler);
  refs.linkMyLibrary.addEventListener('click', linkMyLibraryHandler);
  refs.homeList.addEventListener('click', homeListHandler);
}



function homeListHandler(event) {
  const { target, currentTarget } = event;

  if (target.nodeName !== 'LI') {
    return;
  }

  const movieId = target.dataset.itemid;

  fetch(`${baseUrl}/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => {
      activeDetailsPage(data);
    });
}

function linkMyLibraryHandler(){
  activeLibraryPage();
  drawQueueFilmList();
}

function linkHomeHandler(){
  homePagePagination();
  controlGlobalPage.setStartPage();
  activeHomePage();
}

function linkLogoHandler(){
  homePagePagination();
  controlGlobalPage.setStartPage();
  activeHomePage();
}

export { activeHomePage, activeDetailsPage, renderHeader, renderFooter, addHeaderListener };
