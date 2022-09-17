import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { debounce } from 'lodash.debounce';
import countryCard from './templates/country-card.hbs';


const DEBOUNCE_DELAY = 300;

const inputVal = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info')
inputVal.addEventListener('input', onInputVal);

function onInputVal(event) {
  const val = event.currentTarget.value;
  fetchCountries(val)
  .then((data) => {
        const country = countryCard(data)
      countryInfoEl.insertAdjacentHTML('beforeend', country)

  })    
    }


    // ({
    //     flag: { svg },
    //     name: { official },
    //     capital,
    //     population,
    //     languages,
    //   })