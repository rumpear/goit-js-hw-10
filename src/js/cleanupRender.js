import { refs } from './refs';

export function cleanupRender() {
  refs.listCountry.innerHTML = '';
  refs.infoCountry.innerHTML = '';
}
