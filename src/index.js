import './styles.css';


const body = document.querySelector('body')
const inputContainer = document.querySelector('.inputContainer');
const countryList = document.querySelector('.country-list');
const clearBtn = document.querySelector('.clear-btn');

inputContainer.addEventListener('change', () => {
    fetch(`https://restcountries.eu/rest/v2/name/${inputContainer.value}`)
        .then(data => data.json())
        .then(data => {

            data.forEach(element => {
                if (data.length === 1) {
                    body.insertAdjacentHTML('beforeend', `
      <div>
      <h2 class="strana">${element.name}</h2>
      <img class="flag" width="200" src="${element.flag}">
      <ul class="proStarnu">
      <li>Capital: ${element.capital}</li>
      <li>Population: ${element.population}</li>
      <li>Languages:
      </li>
      </ul>
      </div>`)
                }

                if (data.length > 1) {

                    countryList.insertAdjacentHTML('afterbegin', `<li class="countryListItem">${element.name}</li>`)
                    document.querySelector('.countryListItem').addEventListener('click', () => {
                        body.insertAdjacentHTML('beforeend', `
      <div>
      <h2 class="strana">${element.name}</h2>
      <img class="flag" width="200" src="${element.flag}">
      <ul class="proStarnu">
      <li>Capital: ${element.capital}</li>
      <li>Population: ${element.population}</li>
      <li>Languages:
      </li>
      </ul>
      </div>`)

                    })
                };
            })
        })
})


const cleaner = function () {
    inputContainer.value = '';
}

// const cleanerList = function () {
//     document.querySelector('.countryList').removeChild();
// }

clearBtn.addEventListener('click', cleaner);
