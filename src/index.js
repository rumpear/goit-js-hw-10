import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearch: document.querySelector('#search-box'),
  listCountry: document.querySelector('.country-list'),
  infoCountry: document.querySelector('.country-info'),
};

// refs.inputSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
refs.inputSearch.addEventListener('input', onInput);

function onInput(e) {
  // * work
  // const name = refs.inputSearch.value;
  // console.log(name);

  // * doesnt work
  const name = e.currentTarget.value;
  console.log(name);

  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      return response.json();
    })
    .then(countries => {
      // массив всех стран
      console.log(countries);

      if (countries.length > 10) {
        alert('Очень много стран');
      }

      if (countries.length >= 2 && countries.length <= 10) {
        const markupList = countries
          .map(
            country => `
            <li class='country-list__item'>
                <img class='country-list__flag' src="${country.flags.svg}" alt="${country.name.official}">
                <h1 class='country-list__head'>${country.name.official}</h1>
            </li>
        `,
          )
          .join('');

        refs.listCountry.insertAdjacentHTML('afterbegin', markupList);
      }

      if (countries.length === 1) {
        // countries.map(country => {
        //   // console.log(country.name.official, country.capital, country.population);
        //   console.log(country.flags.svg);
        //   console.log(country.languages);
        // });

        const markupDiv = countries
          .map(
            country => `
            <h1> Country name: ${country.name.official}</h1>
            <h2> Capital: ${country.capital}</h2>
            <p> Population: ${country.population}</p>
            <img src="${country.flags.svg}" alt="${country.name.official}">
            <p>Official languages: ${Object.values(country.languages)}</p>
        `,
          )
          .join('');
        //   console.log(markup);

        refs.infoCountry.insertAdjacentHTML('afterbegin', markupDiv);
      }
    })
    .catch(error => console.log(error));
}

// https://restcountries.com/v2/{service}?fields={field},name.official,capital, population, flags.svg, languages
// https://restcountries.com/v2/all?fields=${name},name.official,capital, population, flags.svg, languages

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages

// function fetchCountries(name) {
//   fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
//     return response.json();
//   });
// }

function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    return response.json();
  });
}

function renderCountries() {}
