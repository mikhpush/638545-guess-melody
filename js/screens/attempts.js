import {getElementFromTemplate, renderScreen} from '../utils.js';
import {WelcomeScreen} from './welcome';
import {AbstractView} from './abstract-view';

export class AttemptsScreen extends AbstractView {

	render() {
		return `<div class="main main--result">
	  	<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

	    <h2 class="title">Какая жалость!</h2>
	    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
	    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
			</div>`
	}

}
