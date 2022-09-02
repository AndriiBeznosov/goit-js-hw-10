const URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  return fetch(
    `${URL}${name}?fields=name,capital,languages,population,flags`
  ).then(response => {
    return response.json();
  });
}
