//Набор общих функций

import {mainWelcome} from './mainWelcome';


const mainElement = document.querySelector('.main');

const changeScreen = (x) => {
	mainElement.innerHTML = ``;
	mainElement.appendChild(x);
};

const playAgainButton = (y) => {
  y.querySelector(`.play-again`).addEventListener(`click`, () => {
    changeScreen(mainWelcome);
  });
  
};

const replayButton = (z) => {
  z.querySelector(`.main-replay`).addEventListener(`click`, () => {
    changeScreen(mainWelcome);
  });
  
};

export {changeScreen, playAgainButton, replayButton};