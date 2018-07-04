import AbstractView from './abstract-view';
import Application from './application';

export default class WinScreen extends AbstractView {
  constructor(allGamesData, finalScore, userPositionIndex, userComparison, state, fastAnswers) {
    super();
    this.state = state;
    this.allGamesData = allGamesData;
    this.finalScore = finalScore;
    this.userPositionIndex = userPositionIndex;
    this.userComparison = userComparison;
    this.fastAnswers = fastAnswers;
  }

  render() {
    return `<div class="main main--result">
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${Math.floor(this.state.timeSpentSec / 60)}&nbsp;минуты и ${this.state.timeSpentSec % 60}&nbsp;секунд
        <br>вы&nbsp;набрали ${this.finalScore} баллов (${this.fastAnswers} быстрых)
        <br>совершив ${this.state.lostLives} ошибки
      </div>
      <span class="main-comparison">Вы заняли ${this.userPositionIndex + 1} место из ${this.allGamesData.length}.
       Это&nbsp;лучше чем у&nbsp;${this.userComparison}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </div>`;
  }

  onAnswer() {
    Application.showWelcome();
  }

  bind() {
    this.element.querySelector(`.main-replay`).addEventListener(`click`, () => {
      this.onAnswer();
    });
  }

}

