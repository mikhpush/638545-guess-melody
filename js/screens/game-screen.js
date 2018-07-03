import {addUserAnswer, fastAnswersAmount, userScoreCounter, renderScreen, renderWrap} from '../utils.js';
import LevelView from './artist-view';
import LevelWrapView from './level-wrap-view';
import AttemptsScreen from './attempts';
import TimeScreen from './time';
import Application from './application';
import {adaptedAnswersData, adaptedMusicCollection} from './adapt-data';
import GenreView from './genre-view';
import Loader from './loader';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.track = adaptedMusicCollection(this.model.state.currentTrack, this.model.gameData);
    this.answer = adaptedAnswersData(this.model.state.currentTrack, this.model.gameData);
  }

  onGameAnswer(it, choosenAnswers) {
    this.model.stopTick();

    let isCorrect;

    if (this.answer.type === `genre`) {
      for (const choice of choosenAnswers) {
        if (choice.checked === true && choice.value !== this.answer.genre) {
          isCorrect = false;
          this.model.reduceAttempts();
          break;
        } else if (choice.checked === true && choice.value === this.answer.genre) {
          isCorrect = true;
        } else if (choice.checked !== true && choice.value === this.answer.genre) {
          isCorrect = false;
          this.model.reduceAttempts();
          break;
        }
      }

    } else {
      if (this.track.name === it.value) {
        isCorrect = true;
      } else {
        isCorrect = false;
        this.model.reduceAttempts();
      }
    }

    if (this.model.state.lostLives === this.model.state.NOTELIVES) {
      this.loseAttempts();
      return;
    }

    addUserAnswer(isCorrect, this.model.state.perAnswerCounter);

    if (this.model.state.currentTrack === (this.model.state.AMOUNTOFGAMES - 1)) {
      const finalScore = userScoreCounter(this.model.state);

      const userResultsData = {
        date: new Date(),
        time: this.model.state.timeSpentSec,
        answers: this.model.state.userAnswers
      };

      let previousGamesData;

      Loader.loadResults().
      then((data) => {
        previousGamesData = data;
      }).
      then(() => {
        previousGamesData.push(userResultsData);

        const statistics = previousGamesData.map(function (arg) {
          const score = userScoreCounter(arg.answers);
          return score;
        });

        statistics.sort(function (a, b) {
          return b - a;
        });

        const userPositionIndex = statistics.findIndex(function (arg) {
          return arg === finalScore;
        });

        const userComparison = () => {
          return Math.round((previousGamesData.length - userPositionIndex - 1) / previousGamesData.length * 100);
        };

        const fastAnswers = fastAnswersAmount();
        userComparison();

        Loader.saveResults(userResultsData);

        Application.showStats(previousGamesData, finalScore, userPositionIndex,
            userComparison, this.model.state, fastAnswers);
      });

    }

    this.model.state.currentTrack += 1;
    this.track = adaptedMusicCollection(this.model.state.currentTrack, this.model.gameData);
    this.answer = adaptedAnswersData(this.model.state.currentTrack, this.model.gameData);
    this.model.state.perAnswerCounter = 0;
    this.startGame();
  }


  startGame() {
    this.model.tick();
    if (this.model.gameData[this.model.state.currentTrack].type === `artist`) {
      this.content = new LevelView(this.track, this.answer);
    } else {
      this.content = new GenreView(this.track, this.answer);
    }
    this.content.onAnswer = this.onGameAnswer.bind(this);
    this.wrapper = new LevelWrapView(this.model.state.lostLives, this.model.state);
    this.wrapper.onAnswer = this.playAgain.bind(this);
    renderScreen(this.content.element);
    renderWrap(this.wrapper.element);
    const timeListener = setInterval(() => {
      if (this.model.state.gameTimeMin === 0 && this.model.state.gameTimeSec === 0) {
        this.loseTime();
        clearInterval(timeListener);
      }
    }, 2000);
  }

  loseAttempts() {
    const attemptsScreen = new AttemptsScreen().element;
    attemptsScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
      this.playAgain();
    });
    renderScreen(attemptsScreen);
  }

  loseTime() {
    const timeScreen = new TimeScreen().element;
    timeScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
      this.playAgain();
    });
    renderScreen(timeScreen);
  }

  playAgain() {
    const currentTracks = document.querySelectorAll(`audio`);
    for (const singleTrack of currentTracks) {
      singleTrack.pause();
    }
    this.model.stopTick();
    this.model.restart();
    Application.showWelcome();
  }
}
