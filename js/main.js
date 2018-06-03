import gameArtist from './gameArtist.js';
import mainAnswer from './gameArtist.js';
import playAgain from './gameArtist.js';

import gameGenre from './gameGenre.js';
import genreAnswer from './gameGenre.js';


import resultWin from './gameResultWin.js';
import resultLossTime from './gameResultTime.js';
import resultLossAttepts from './gameResultAttepts.js';





const mainWelcome = document.createElement(`section`);
mainWelcome.className = `main main--welcome`;
mainWelcome.innerHTML = `
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>`;

const mainElement = document.querySelector(`.main`);
mainElement.appendChild(mainWelcome);

const buttonPlay = document.querySelector('.main-play'); 
buttonPlay.addEventListener(`click`, () => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(gameArtist);
});

console.log(playAgain);
playAgain.addEventListener(`click`, () => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(mainWelcome);
});

mainAnswer.addEventListener(`click`, () => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(gameGenre);
});

genreAnswer.addEventListener(`click`, () => {
  let randomResult = Math.floor(Math.random()*3);
  console.log(randomResult);
  switch (randomResult) {
    case 0: 
      randomResult = resultWin;
      console.log(resultWin);
      break;
    case 1:
      randomResult = resultLossTime;
      console.log(resultLossTime);
      break;
    case 2: 
      randomResult = resultLossAttepts;
      console.log(resultLossAttepts);
      break;
  };

  console.log(randomResult);
  mainElement.innerHTML = ``;
  mainElement.appendChild(randomResult);

})