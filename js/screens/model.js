import {getElementFromTemplate, renderScreen, renderWrap, initialGameState, startGame, 
	startCircleTimer, startTimer, stopCircleTimer, stopTimer} from '../utils.js';


export default class Model {
	constructor(gameData) {
		this.restart();
		this.gameData = gameData;
	}

	get state() {
		return this._state;
	}

	tick() {
		//let circleTimer;
		//let timer;
		startCircleTimer(this._state);
		startTimer(this._state);
	}

	stopTick() {
		stopCircleTimer();
		stopTimer();
	}

	outOfAttempts() {
		this._state.noteLivesMissed = 3;
	}

	attemptLoss() {
		this._state.noteLivesMissed += 1;
	}

	outOfTime() {
		this._state.GAMETIMEMIN = 0;
		this._state.GAMETIMESEC = 0;
	}

	restart() {
		this._state = Object.assign({}, initialGameState);
	}
}