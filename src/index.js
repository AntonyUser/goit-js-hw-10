import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'

const DEBOUNCE_DELAY = 300;

const inputVal = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

inputVal.addEventListener('input', debounce(onInputVal, DEBOUNCE_DELAY));

function onInputVal() {
  countryList.innerHTML = '';
  countryInfoEl.innerHTML = '';
  const trimVal = inputVal.value.trim()
  if (trimVal) {
    fetchCountries(trimVal).then(onRenderCountry).catch(onCatchError);
  }
  

function onRenderCountry(data) {
  if (data.length > 10) {
    return Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
  }
    data.forEach(country => {
     const { flags: { svg },
      name: { official },
      capital,
      population,
      languages,
    } = country
    if (data.length === 1) {
      const dataEl = `<img class="country-icon" src='${svg}' alt='flag' width='60' />
      <h2 class='county-info_name'>${official}</h2>
      <p class='country-info_description'>
        Capital:
        <span class='country-info_val'>${capital}</span>
      </p>
      <p class='country-info_description'>
        Population:
        <span class='country-info_val'>${population}</span>
      </p>
      <p class='country-info_description'>
        Language:
        <span class='country-info_val'>${Object.values(languages).join(
          ', '
        )}</span>
      </p>`;
      countryInfoEl.innerHTML = dataEl;
      }
      
    else {
      const dataEl = `<li>
      <img class="country-icon" src="${svg}" width='20' height='15'></img>
      <p class="country-list__text">${official}</p>
    </li>`;
    countryList.insertAdjacentHTML('beforeend', dataEl);
    }
  })

}}

function onCatchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}


Notiflix.Notify.init({

  warning: {
    background: '#30d5c8'
  }

});
