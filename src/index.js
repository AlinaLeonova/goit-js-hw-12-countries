import './styles.css';
import debounce from "../node_modules/lodash.debounce/index.js";
import { error, defaultModules } from '../node_modules/@pnotify/core';
import * as PNotifyDesktop from '../node_modules/@pnotify/desktop';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import "../node_modules/@pnotify/core/dist/PNotify.css";


const inputContainer = document.querySelector('.input-container');
const countryList = document.querySelector('.country-list');
const clearBtn = document.querySelector('.clear-btn');
const searchResult = document.querySelector('.result-search');

defaultModules.set(PNotifyDesktop, {});

searchResult.innerHTML = localStorage.getItem('country') || '';

inputContainer.value = "";

const inputFn = function () {
    if (inputContainer.value == '') {
        countryList.innerHTML = "";
        return
    }

    fetch(`https://restcountries.eu/rest/v2/name/${inputContainer.value}`)
        .then(data => data.json())
        .then(data => {
            countryList.innerHTML = "";
            if (data.length > 10) {
                const errNotice2 = error({
                    title: 'Too much result',
                    text: "Please, try again",
                    delay: 1000,
                    modules: new Map([
                        ...defaultModules,
                        [PNotifyDesktop, {}
                        ]])
                })
                return
            }
            data.forEach(element => {
                if (data.length === 1) {
                    searchResult.innerHTML = "";
                    searchResult.insertAdjacentHTML('beforeend', `
      
      <h2 class="">${element.name}</h2>
      <img width="200" src="${element.flag}">
      <ul>
      <li>Capital: ${element.capital}</li>
      <li>Population: ${element.population}</li>
      <li>Languages:
      <ul class="lang-list"></ul>
      </li>
      </ul>
      `);

                    element.languages.forEach(({ name }) => {
                        document.querySelector('.lang-list').insertAdjacentHTML('beforeend', `<li>${name}</li>`)
                    })
                    localStorage.setItem('country', searchResult.innerHTML);
                }

                if (data.length > 1 && data.length < 10) {

                    countryList.insertAdjacentHTML('afterbegin', `<li class="countryListItem">${element.name}</li>`)
                    document.querySelector('.countryListItem').addEventListener('click', () => {
                        searchResult.innerHTML = '';
                        searchResult.insertAdjacentHTML('beforeend', `
      
      <h2 class="">${element.name}</h2>
      <img width="200" src="${element.flag}">
      <ul>
      <li>Capital: ${element.capital}</li>
      <li>Population: ${element.population}</li>
      <li>Languages:
      <ul class="lang-list"></ul>
      </li>
      </ul>
      `);

                        element.languages.forEach(({ name }) => {
                            document.querySelector('.lang-list').insertAdjacentHTML('beforeend', `<li>${name}</li>`);
                        })
                        localStorage.setItem('country', searchResult.innerHTML);
                    })
                };
            })
        })
        .catch(err => {
            const errNotice1 = error({
                title: "Enter correct country",
                text: "Please, try again",
                delay: 1000,
                modules: new Map([
                    ...defaultModules,
                    [PNotifyDesktop, {}]
                ])
            })
        }

        )
}

inputContainer.addEventListener('input', debounce(inputFn, 500));

const cleaner = function () {
    inputContainer.value = '';
}

clearBtn.addEventListener('click', cleaner);


