import CreditCardInputMask from 'credit-card-input-mask';
import {mask} from './mask.js';
import {showCard} from './showCard.js';
import {setChildren} from 'redom';

setChildren(document.body, showCard());

const name = document.getElementById('name');
const cardnumber = document.getElementById('cardnumber');
const svgnumber = document.getElementById('svgnumber');
const expirationdate = document.getElementById('expirationdate');
const svgexpire = document.getElementById('svgexpire');
const securitycode = document.getElementById('securitycode');
const svgsecurity = document.getElementById('svgsecurity');
const ccicon = document.getElementById('ccicon');
const ccsingle = document.getElementById('ccsingle');
const svgname = document.getElementById('svgname');
const svgnameback = document.getElementById('svgnameback');
const lightcolor = document.querySelectorAll('.lightcolor');
const darkcolor = document.querySelectorAll('.darkcolor');
const creditcard = document.querySelector('.creditcard');

// функция для смены цвета у карточки
const swapColor = (color) => {
  lightcolor.forEach((input) => {
    input.setAttribute('class', color);
  });
  darkcolor.forEach((input) => {
    input.setAttribute('class', color + 'dark');
  });
};

name.addEventListener('input', () => {
  svgname.textContent = name.value.toUpperCase();
  svgnameback.textContent = name.value;
});

cardnumber.addEventListener('input', () => {
  cardnumber.value = cardnumber.value.replace(/[^0-9]/, '');
  
  mask.map(item => {
    new CreditCardInputMask({
      element: document.querySelector('#cardnumber'),
      pattern: '{{9999}} {{9999}} {{9999}} {{9999}}',
    });
    const regexp = item.regex;
    const result = cardnumber.value.match(regexp);
    if (result) {
      if (item.cardType === 'Unknown') {
        return;
      }
      svgnumber.textContent = cardnumber.value;
      ccicon.innerHTML = item.icon;
      ccsingle.innerHTML = item.logo;
      
      swapColor(item.color);
    }
  });
});

const regexp = /(0*[1-9]|1[012])\/(2[4-9])/g;

expirationdate.addEventListener('input', (e) => {
  e.preventDefault();
  expirationdate.value = expirationdate.value.replace(regexp, (d) => {
    svgexpire.textContent = d;
    return d;
  });
});

creditcard.addEventListener('click', () => {
  creditcard.classList.toggle('flipped');
  svgsecurity.textContent = '';
});

securitycode.addEventListener('click', () => {
  creditcard.classList.toggle('flipped');
  svgsecurity.textContent = '';
});

securitycode.addEventListener('input', () => {
  svgsecurity.textContent = securitycode.value;
});
