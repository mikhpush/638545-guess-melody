import {getElementFromTemplate, renderScreen, renderWrap, initialState, startGame, circle} from '../utils.js';
import {LevelWrapView} from './levelWrap-view';
import {globalSound} from './level-view';
import musicCollection from '../music/music.js';
import answersArtist from '../answers/answersArtist.js';
import timeScreen from './time';
import {LevelView} from './level-view';
import {AbstractView} from './abstract-view';

export class welcomeScreen extends AbstractView {

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
    renderScreen(new LevelView(musicCollection[initialState.FIRSTTRACK], answersArtist(initialState.FIRSTTRACK)).element);
    renderWrap(new LevelWrapView(initialState.noteLivesMissed, globalSound).element);
    setInterval(function slicer() {
      circle(initialState.CIRCLECUT);
      initialState.CIRCLECUT += (initialState.CIRCLELENGTH/(initialState.GAMETIME*20));
    }, 50);
    // startGame(120, timeScreen);
  }

  bind() {
    this.element.querySelector(`.main-play`).addEventListener(`click`, () => {
      this.onAnswer();
    });
  }
}

export default welcomeScreen;

