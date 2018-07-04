import {initialGameState, startCircleTimer, startTimer, stopCircleTimer, stopTimer} from '../utils.js';

export default class Model {
  constructor(gameData) {
    this.restart();
    this.gameData = gameData;
  }

  get state() {
    return this._state;
  }

  tick() {
    startTimer(this._state);
    startCircleTimer(this._state);
  }

  stopTick() {
    stopCircleTimer();
    stopTimer();
  }

  reduceAttempts() {
    this._state.lostLives += 1;
  }

  restart() {
    this._state = Object.assign({}, initialGameState);
    this._state.userAnswers = [];
  }
}
