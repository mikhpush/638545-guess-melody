import {getElementFromTemplate, renderScreen, userResultsDisplay, initialState} from '../utils.js';
import {welcomeScreen} from './welcome';
import {AbstractView} from './abstract-view';


export class winScreen extends AbstractView {
	constructor(allGamesResults, userResultsScope, userPositionIndex, userComparison) {
		super();
		this.allGamesResults = allGamesResults;
		this.userResultsScope = userResultsScope;
		this.userPositionIndex = userPositionIndex;
		this.userComparison = userComparison;
	}

	render() {
		return `<div class="main main--result">
		  <h2 class="title">Вы настоящий меломан!</h2>
		  <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
		    <br>вы&nbsp;набрали ${this.userResultsScope.userScore} баллов (x быстрых)
		    <br>совершив ${3 - this.userResultsScope.noteLives} ошибки
		  </div>
		  <span class="main-comparison">Вы заняли ${this.userPositionIndex + 1} место из ${this.allGamesResults.length}.
		   Это&nbsp;лучше чем у&nbsp;${this.userComparison()}%&nbsp;игроков</span>
		  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
			</div>`
	}


	onAnswer() {
		initialState.noteLivesMissed = 0;
		initialState.FIRSTTRACK = 0;
		renderScreen(new welcomeScreen().element);
	}

	bind() {
		this.element.querySelector(`.main-replay`).addEventListener(`click`, () => {
			this.onAnswer();
		});
	}

}

