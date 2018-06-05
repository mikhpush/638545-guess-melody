// Экран приветствия 

import {gameArtist} from './gameArtist';
import {changeScreen} from './utils'

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

const buttonPlay = mainWelcome.querySelector('.main-play'); 
buttonPlay.addEventListener(`click`, () => {
  changeScreen(gameArtist);
});

export {mainWelcome};