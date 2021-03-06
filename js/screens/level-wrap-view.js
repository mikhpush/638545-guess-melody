import AbstractView from './abstract-view';

export default class LevelWrapView extends AbstractView {
  constructor(noteLives, gameState) {
    super();
    this.gameState = gameState;
    this.noteLives = noteLives;
    this.sec = (this.gameState.gameTimeSec < 10) ? (`0${this.gameState.gameTimeSec}`) : this.gameState.gameTimeSec;

  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = document.createElement(`div`);
    this._element.innerHTML = this.render();

    for (let i = 1; i <= this.noteLives; i++) {
      const notes = document.createElement(`img`);
      notes.className = `main-mistake`;
      notes.src = `img/wrong-answer.png`;
      notes.width = `35`;
      notes.height = `49`;
      this._element.querySelector(`.main-mistakes`).insertAdjacentElement(`beforeEnd`, notes);
    }

    this.bind();
    return this._element;
  }

  bind() {


    this.element.querySelector(`.play-again`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onAnswer();
    });

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
      </svg>
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${this.gameState.gameTimeMin}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${this.sec}</span>
        </div>
      
<div class="main-mistakes">
        
      </div>
      `;
  }

  showQuestion() {
    const boxMarkup = `
        <p>Внимание! Все данные текущей игры будут утеряны</p>
        <button class="confirm">не игра и была</button>
        <button class="cancel">ой, не надо</button>
      `;
    const dialogBox = document.createElement(`div`);
    dialogBox.style.cssText = `
        width: 240px;
        height: 100px;
        z-index: 10;
        position: absolute;
        margin: auto;
        padding: 20px;
        background-color: #333333;
      `;
    dialogBox.innerHTML = boxMarkup;
    dialogBox.style.visibility = `hidden`;
    document.querySelector(`body`).appendChild(dialogBox);

    dialogBox.querySelector(`.confirm`).addEventListener(`click`, () => {
      this.onAnswer();
      dialogBox.style.visibility = `hidden`;
    });

    dialogBox.querySelector(`.cancel`).addEventListener(`click`, () => {
      dialogBox.style.visibility = `hidden`;
    });

    return dialogBox;
  }

  onAnswer() {

  }
}
