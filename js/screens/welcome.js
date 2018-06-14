import {getElementFromTemplate, renderScreen, renderWrap, initialState, startGame, circle} from '../utils.js';
import artistScreenWrap from './artistScreenWrap';
import artistScreen from './artist';
import {globalSound} from './artist';
import musicCollection from '../music/music.js';
import answersArtist from '../answers/answersArtist.js';
import timeScreen from './time';

const welcomeScreen = getElementFromTemplate(`
	<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>
`);

welcomeScreen.querySelector(`.main-play`).addEventListener(`click`, () => {
  renderScreen(artistScreen(musicCollection[initialState.FIRSTTRACK], answersArtist(initialState.FIRSTTRACK)));
  console.log(initialState.noteLivesMissed)
  renderWrap(artistScreenWrap(initialState.noteLivesMissed, globalSound));

  setInterval(function slicer() {

    circle(initialState.CIRCLECUT);

    initialState.CIRCLECUT += (2325/(initialState.GAMETIME*20));
    console.log(`я отрендерилась ${initialState.CIRCLECUT}`);
  }, 50);

 // startGame(120, timeScreen);

});

export default welcomeScreen;

