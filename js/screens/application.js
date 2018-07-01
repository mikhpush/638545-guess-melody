
import {renderScreen} from '../utils.js';
import Model from './model';
import GameScreen from './game-screen';
import {WelcomeScreen} from './welcome';
import {WinScreen} from './win';
import SplashScreen from './splash-screen';
import ErrorScreen from './splash-screen';

let gameData;

export class Application {

  static showSplash() {
    const splash = new SplashScreen();
    renderScreen(splash.element);
    splash.start();
    setTimeout(function () {
      window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then((response) => splash.checkStatus(response)).
      then((response) => response.json()).
      then((data) => {
        gameData = data;
      }).
      then(() => Application.showWelcome()).
      catch(Application.showError).
      then(() => splash.stop());
    }, 1000);
  }

  static showWelcome() {
    const welcome = new WelcomeScreen();
    renderScreen(welcome.element);
  }

  static showGame() {
    const model = new Model(gameData);
    const gameScreen = new GameScreen(model);
    gameScreen.startGame();
  }

  static showStats(allGamesResults, userResultsScope, userPositionIndex, userComparison, stats, fastAnswers) {
    const statistics = new WinScreen(allGamesResults, userResultsScope, userPositionIndex,
        userComparison, stats, fastAnswers);
    renderScreen(statistics.element);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    renderScreen(errorScreen.element);
  }

}
