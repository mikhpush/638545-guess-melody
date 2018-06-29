
import {getElementFromTemplate, renderScreen, renderWrap, gameState, startGame, startCircleTimer, startTimer} from '../utils.js';
import {LevelWrapView} from './levelWrap-view';
import {globalSound} from './level-view';
import musicCollection from '../music/music.js';
import answersArtist from '../answers/answersArtist.js';
import timeScreen from './time';
import {Application} from './application';
import {LevelView} from './level-view';
import {AbstractView} from './abstract-view';



export class WelcomeScreen extends AbstractView {

  render() {
    return `<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>`
  }

  onAnswer() {
    Application.showGame();


  }

  bind() {
    this.element.querySelector(`.main-play`).addEventListener(`click`, () => {
      this.onAnswer();
    });
  }
}

