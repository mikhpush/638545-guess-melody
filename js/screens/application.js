
import {getElementFromTemplate, renderScreen, renderWrap, initialGameState, startGame, startCircleTimer, startTimer} from '../utils.js';
import Model from './model';
import GameScreen from './gameScreen';
import {WelcomeScreen} from './welcome';
import {WinScreen} from './win';

export class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    renderScreen(welcome.element);
  }

  static showGame() {
    const model = new Model(initialGameState); 
    const gameScreen = new GameScreen(model);
    //renderScreen(gameScreen.content.element);
    //renderWrap(gameScreen.wrapper.element);
    gameScreen.startGame();
  }


  static showStats(allGamesResults, userResultsScope, userPositionIndex, userComparison, stats, fastAnswers) {
    const statistics = new WinScreen(allGamesResults, userResultsScope, userPositionIndex, 
      userComparison, stats, fastAnswers);
    renderScreen(statistics.element);
  }

}