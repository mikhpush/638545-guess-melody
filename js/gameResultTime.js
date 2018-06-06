// Три экрана с результатами - выигрыш, проигрыш по времени, проигрыш по попыткам
import {replayButton} from './utils';

const resultLossTime = document.createElement(`section`);
resultLossTime.className = `main main--result`;
resultLossTime.innerHTML = `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  `;

replayButton(resultLossTime);

export {resultLossTime};
    