import {GAME_CONSTS, addUserAnswer, fastAnswersAmount, getUserPositionIndex,
  compareUsers, userScoreCounter, renderScreen, renderWrap} from '../utils.js';
import LevelView from './artist-view';
import LevelWrapView from './level-wrap-view';
import AttemptsScreen from './attempts-out-screen';
import TimeScreen from './time-out-screen';
import Application from './application';
import {adaptedAnswersData, adaptedMusicCollection} from './adapt-data';
import GenreView from './genre-view';
import Loader from './loader';
import DialogWindow from './dialog-window';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.track = adaptedMusicCollection(this.model.state.currentTrack, this.model.gameData);
    this.answer = adaptedAnswersData(this.model.state.currentTrack, this.model.gameData);
  }

  implementDialogBox() {
    this.dialogBox = new DialogWindow();
    this.dialogBox.onAnswer = this.restart.bind(this);
    renderWrap(this.dialogBox.element);
    this.dialogBoxStatus = document.querySelector(`.modal-confirm`);
    this.dialogBoxStatus.style.visibility = `hidden`;
  }

  showQuestion() {
    this.dialogBoxStatus.style.visibility = `visible`;
  }

  checkIsCorrect(it, chosenAnswers) {

    let isCorrect;

    if (this.answer.type === `genre`) {
      for (const choice of chosenAnswers) {
        if (choice.checked && choice.value !== this.answer.genre) {
          isCorrect = false;
          this.model.reduceAttempts();
          break;
        } else if (choice.checked && choice.value === this.answer.genre) {
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

    return isCorrect;
  }

  getNextlevel() {
    this.model.state.currentTrack += 1;
    this.track = adaptedMusicCollection(this.model.state.currentTrack, this.model.gameData);
    this.answer = adaptedAnswersData(this.model.state.currentTrack, this.model.gameData);
    this.model.state.perAnswerCounter = 0;
    this.startGame();
  }

  getUserResults() {
    const results = {
      date: new Date(),
      time: this.model.state.timeSpentSec,
      answers: this.model.state.userAnswers
    };

    return results;
  }

  onAnswer(it, chosenAnswers) {
    this.model.stopTick();

    const isCorrect = this.checkIsCorrect(it, chosenAnswers);

    if (this.model.state.lostLives === GAME_CONSTS.NOTE_LIVES) {
      this.loseAttempts();
      return;
    }

    addUserAnswer(isCorrect, this.model.state);

    if (this.model.state.currentTrack === (GAME_CONSTS.AMOUNT_OF_GAMES - 1)) {

      let previousGamesData;
      const finalScore = userScoreCounter(this.model.state.userAnswers);
      const userResultsData = this.getUserResults();

      Loader.loadResults().
      then((data) => {
        previousGamesData = data;
      }).
      then(() => {
        previousGamesData.push(userResultsData);
        const userPositionIndex = getUserPositionIndex(previousGamesData, finalScore);

        const userComparison = compareUsers(previousGamesData, userPositionIndex);
        const fastAnswers = fastAnswersAmount(this.model.state);

        Loader.saveResults(userResultsData);

        Application.showStats(previousGamesData, finalScore, userPositionIndex,
            userComparison, this.model.state, fastAnswers);
      });

    } else {
      this.getNextlevel();
    }
  }


  startGame() {
    this.model.tick();
    if (this.model.gameData[this.model.state.currentTrack].type === `artist`) {
      this.content = new LevelView(this.track, this.answer);
    } else {
      this.content = new GenreView(this.track, this.answer);
    }
    this.content.onAnswer = this.onAnswer.bind(this);
    this.wrapper = new LevelWrapView(this.model.state.lostLives, this.model.state);
    this.wrapper.onAnswer = this.showQuestion.bind(this);
    renderScreen(this.content.element);
    renderWrap(this.wrapper.element);
    this.implementDialogBox();
    let displayedMin;
    let displayedSec;
    const timeListener = setInterval(() => {
      if (document.querySelector(`.timer-value-mins`) !== null) {
        displayedMin = document.querySelector(`.timer-value-mins`).innerHTML;
        displayedSec = document.querySelector(`.timer-value-secs`).innerHTML;
      }

      if (displayedMin === `0` && displayedSec === `00`) {
        this.loseTime();
        clearInterval(timeListener);
      }
    }, 1000);
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

  restart(it) {
    this.dialogBoxStatus.style.visibility = `hidden`;
    if (it.innerHTML === `Ок`) {
      this.playAgain();
    }
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
