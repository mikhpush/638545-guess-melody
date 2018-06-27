import {getElementFromTemplate, renderScreen, userResultsDisplay, gameState} from '../utils.js';
import {WelcomeScreen} from './welcome';
import {AbstractView} from './abstract-view';


export class WinScreen extends AbstractView {
	constructor(allGamesResults, userResultsScope, userPositionIndex, userComparison, state, fastAnswers) {
		super();
		this.fastAnswers = fastAnswers;
		this.state = state; 
		this.allGamesResults = allGamesResults;
		this.userResultsScope = userResultsScope;
		this.userPositionIndex = userPositionIndex;
		this.userComparison = userComparison;
	}

	render() {
		return `<div class="main main--result">
		  <h2 class="title">Вы настоящий меломан!</h2>
		  <div class="main-stat">За&nbsp;${Math.floor(this.state.timeSpentSec / 60)}&nbsp;минуты и ${this.state.timeSpentSec % 60}&nbsp;секунд
		    <br>вы&nbsp;набрали ${this.userResultsScope.userScore} баллов (${this.fastAnswers} быстрых)
		    <br>совершив ${3 - this.userResultsScope.noteLives} ошибки
		  </div>
		  <span class="main-comparison">Вы заняли ${this.userPositionIndex + 1} место из ${this.allGamesResults.length}.
		   Это&nbsp;лучше чем у&nbsp;${this.userComparison()}%&nbsp;игроков</span>
		  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
			</div>`
	}


	onAnswer() {
		gameState.noteLivesMissed = 0;
		gameState.FIRSTTRACK = 0;
		renderScreen(new WelcomeScreen().element);
	}

	bind() {
		this.element.querySelector(`.main-replay`).addEventListener(`click`, () => {
			this.onAnswer();
		});
	}

}

