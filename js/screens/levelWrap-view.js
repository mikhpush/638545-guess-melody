import {getElementFromTemplate, renderScreen, playAgain} from '../utils';
import {WelcomeScreen} from './welcome';
import {AbstractView} from './abstract-view';


export class LevelWrapView extends AbstractView {
  constructor(noteLives, gameState) {
    super();
    this.gameState = gameState;
    this.noteLives = noteLives;

  }

  render() {
    return `<a class="play-again play-again__wrap" href="#">
        <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
      </a>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle stroke-dasharray="2325" stroke-dashoffset="${this.gameState.circleCut}" 
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${this.gameState.GAMETIMEMIN}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${((this.gameState.GAMETIMESEC != 0) ? this.gameState.GAMETIMESEC : (`0${this.gameState.GAMETIMESEC}`))}</span>
        </div>
      </svg>
<div class="main-mistakes">
        
      </div>
      `;
  }

  get element() {
    if (this._element) {
      return this._element
    }

    this._element = document.createElement(`div`);
    this._element.innerHTML = this.render();

    for (let i = 1; i <= this.noteLives; i++) {
      const notes = document.createElement('img')
      notes.className = `main-mistake`;
      notes.src = `img/wrong-answer.png`;
      notes.width =`35`;
      notes.height = `49`;
      this._element.querySelector(`.main-mistakes`).insertAdjacentElement(`beforeEnd`, notes);
    }

    this.bind();
    return this._element;
  }

  onAnswer() {
    super.onAnswer();
  }

  bind() {
    this.element.querySelector(`.play-again`).addEventListener(`click`, () => {
      this.onAnswer();
    });

  }
};

