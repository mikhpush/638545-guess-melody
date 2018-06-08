// Экран приветствия

import {gameArtist} from './gameArtist';
import {changeScreen} from './utils';
import {resultLossTime} from './gameResultTime';

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
    </p>
  `;

let gameTimer = 0;

const timer = (screen, xMin, xSec) => {

  const timerSec = screen.querySelector(`.timer-value-secs`);
  const timerMin = screen.querySelector(`.timer-value-mins`);
    
  timerSec.innerHTML = xSec;
  timerMin.innerHTML = xMin;

  const timerCountdown = setInterval(function() {

    if (timerMin.innerHTML == 0 && timerSec.innerHTML == 0) {
      changeScreen(resultLossTime);
      clearInterval(timerCountdown);
    }

    else if (timerSec.innerHTML == 0 && timerMin.innerHTML > 0) {
      timerSec.innerHTML = 60;
      timerMin.innerHTML -= 1;
    }

    timerSec.innerHTML -= 1;
    gameTimer += 1;
  }, 1000); 
}

const buttonPlay = mainWelcome.querySelector(`.main-play`);
buttonPlay.addEventListener(`click`, () => {
  changeScreen(gameArtist);
  timer(gameArtist, 5, 0);
});



export {mainWelcome, gameTimer};
