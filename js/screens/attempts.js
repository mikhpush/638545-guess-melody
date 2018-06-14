import {getElementFromTemplate, renderScreen, initialState} from '../utils.js';
import welcomeScreen from './welcome';

const attemptsScreen = getElementFromTemplate(`<div class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</div>`);

attemptsScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
	initialState.noteLivesMissed = 0;
	initialState.FIRSTTRACK = 0;
	renderScreen(welcomeScreen);
});

export default attemptsScreen;
