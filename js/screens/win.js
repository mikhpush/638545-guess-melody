import {getElementFromTemplate, renderScreen, userResultsDisplay, initialState} from '../utils.js';
import welcomeScreen from './welcome';

const winScreen = (lastGamesResults, userResultsScope) => { 

  lastGamesResults.push(userResultsScope);
  const allGamesResults = lastGamesResults;

  const statistics = allGamesResults.map(function(it) {
    return it.userScore;
  });

  statistics.sort(function(a, b) {
    return b - a;
  });

  const userPositionIndex = statistics.findIndex(function(it) {
    return it == userResultsScope.userScore;
  });

  const userComparison = () => { 
   return Math.round((allGamesResults.length - userPositionIndex -1) / allGamesResults.length * 100);
  };

  console.log(`Вы заняли ${userPositionIndex + 1} место из ${allGamesResults.length} игроков. 
  Это лучше, чем у ${userComparison()}% игроков`);


	const winRandomScreen = getElementFromTemplate(`<div class="main main--result">
  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
    <br>вы&nbsp;набрали ${userResultsScope.userScore} баллов (x быстрых)
    <br>совершив ${3 - userResultsScope.noteLives} ошибки
  </div>
  <span class="main-comparison">Вы заняли ${userPositionIndex + 1} место из ${allGamesResults.length}.
   Это&nbsp;лучше чем у&nbsp;${userComparison()}%&nbsp;игроков</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
</div>`);

	winRandomScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
		initialState.noteLivesMissed = 0;
		initialState.FIRSTTRACK = 0;
		renderScreen(welcomeScreen);
	});

	return winRandomScreen;
}

export default winScreen;
