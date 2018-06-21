import {getElementFromTemplate, renderScreen} from '../utils.js';
import welcomeScreen from './welcome';
import {AbstractView} from './abstract-view';

export class timeScreen extends AbstractView {

	render() {
		return `<div class="main main--result">
	  	<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
	    <h2 class="title">Увы и ах!</h2>
	    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
	    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
			</div>`
	};

};
