import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';
import { getRefs } from './refs';
const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function onInputValue(e) {
  clearCard();
  clearListСities();
  if (!e.target.value.trim()) {
    setTimeout(() => {
      e.target.value = '';
      Notify.warning('Incorrect value entered for search.');
    }, 500);

    return;
  }
  //
  fetchCountries(e.target.value).then(onFetchSuccess).catch(onFetchError);
}

function onFetchSuccess(res) {
  if (res.length > 100) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (res.length === 1) {
    addPageCard(res);
    clearListСities();
    return;
  }
  onPageRezult(res);
}

function onPageRezult(res) {
  const addListCommon = res
    .map(common => {
      return `<li><img src='${common.flags.svg}' class='flags-mini'><span>${common.name.common}</span></li>`;
    })
    .join('');
  refs.ul.innerHTML = addListCommon;
}

function addPageCard(data) {
  const additionallyСountry = data
    .map(data => {
      return `
        <h1><img src='${data.flags.svg}' width='100' class='flags'>${
        data.name.common
      }</h1>
        <p>Capital: ${data.capital}</p>
        <p>Population: ${data.population}</p>
        <p>languages: ${Object.values(data.languages)}</p>`;
    })
    .join('');

  refs.info.innerHTML = additionallyСountry;
}

function clearCard() {
  return (refs.info.innerHTML = '');
}

function clearListСities() {
  return (refs.ul.innerHTML = '');
}

function onFetchError() {
  return Notify.failure('Index...... Oops, there is no country with that name');
}
