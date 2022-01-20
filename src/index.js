import { fetchCountries } from './js/fetchCountries';
import { renderCountries } from './js/renderCountries';
import { cleanupRender } from './js/cleanupRender';
import { refs } from './js/refs';

import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

refs.inputSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const name = e.target.value.trim();

  if (!name) {
    cleanupRender();
    return;
  }

  fetchCountries(name)
    .then(renderCountries)
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
}
