'use strict';

const mainElement = document.querySelector(`.main`);

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

let arrowButtons = document.createElement(`DIV`);
arrowButtons.className = `arrows__wrap`;
arrowButtons.innerHTML = `<style>
      .arrows__wrap {
        position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn" onclick="showScreen(currentIndex-1)" ><-</button>
    <button class="arrows__btn" onclick="showScreen(currentIndex+1)">-></button>`;

document.querySelector(`.app`).appendChild(arrowButtons);


let currentIndex = 0;

function selectScreen(element) {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
}

const myTemplate = document.querySelector(`template`).content; //	content только существует для template?

const screens = Array.from(myTemplate.querySelectorAll(`.main`));


function showScreen(i) {
  i = i < 0 ? screens.length - 1 : i;
  i = i > screens.length-1 ? 0 : i;
  currentIndex = i;
  // alert(`currentIndex = ${currentIndex}, при этом i = ${i}`  );
  selectScreen(screens[currentIndex]);
}


document.addEventListener(`keydown`, (key) => {
  switch (key.keyCode) {
    case LEFT_ARROW:
      showScreen(currentIndex - 1); // не понимаю, почему не работает оператор decrement --
      break;
    case RIGHT_ARROW:
      showScreen(currentIndex + 1);
      break;
  }
});

showScreen(0);


