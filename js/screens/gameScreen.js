import {addUserAnswer, getElementFromTemplate, fastAnswersAmount, userScoreCounter, renderScreen, renderWrap, initialGameState, 
	startGame, startCircleTimer, startTimer} from '../utils.js';
import Model from './model';
import {LevelView} from './level-view';
import {LevelWrapView} from './levelWrap-view';
import musicCollection from '../music/music.js';
import answersArtist from '../answers/answersArtist.js';
import {AttemptsScreen} from './attempts';
import {TimeScreen} from './time';
import {Application} from './application';
import lastGamesResults from '../answers/lastGamesResults.js';
import {adaptedAnswersData, adaptedMusicCollection} from './data-adapter';
import GenreView from './genre-view';

export default class GameScreen {
	constructor(model) {
		this.model = model;
		this.track = adaptedMusicCollection(this.model.state.FIRSTTRACK, this.model.gameData);
		this.answer = adaptedAnswersData(this.model.state.FIRSTTRACK, this.model.gameData);

	}

	onGameAnswer(it, choosenAnswers) {
		this.model.stopTick();
    
    let isCorrect;

    if (this.answer.type === "genre") {
    	for (const choice of choosenAnswers) {
      	if (choice.checked == true && choice.value != this.answer.genre) {
      		isCorrect = false;
      		this.model.attemptLoss();
      		break;
	    	} else if (choice.checked == true && choice.value == this.answer.genre) {
	    		isCorrect = true;
	    	};
	    };

    } else {
    	if (this.track.name == it.value) {
      	isCorrect = true;
    	} else {
      	isCorrect = false;
      	this.model.attemptLoss();
    	}
    }

    if (this.model.state.noteLivesMissed == this.model.state.NOTELIVES) {
      this.outOfAttempts();
      return;
    }

    addUserAnswer(isCorrect, this.model.state.perAnswerCounter);

    if (this.model.state.FIRSTTRACK == (this.model.state.AMOUNTOFGAMES - 1)) {
      const finalScore = userScoreCounter(this.model.state);

      const userResultsScope = {
        gameTimeLeft : (this.model.state.GAMETIMEMIN*60 + this.model.state.GAMETIMESEC),
        noteLives : (this.model.state.NOTELIVES - this.model.state.noteLivesMissed),
        userScore : finalScore
      };

      lastGamesResults.push(userResultsScope);
		  const allGamesResults = lastGamesResults;

		  const statistics = allGamesResults.map(function(it) {
		    return it.userScore;
		  });

		  statistics.sort(function(a, b) {
		    return b - a;
		  });

		  const userPositionIndex = statistics.findIndex(function(it) {
		    return it == userResultsScope.userScore;
		  });

		  const userComparison = () => { 
		   return Math.round((allGamesResults.length - userPositionIndex - 1) / allGamesResults.length * 100);
		  };

		  const fastAnswers = fastAnswersAmount();
		  userComparison();
		  Application.showStats(allGamesResults, userResultsScope, userPositionIndex, 
		  	userComparison, this.model.state, fastAnswers);
      return;
    }



    this.model.state.FIRSTTRACK += 1;
    this.track = adaptedMusicCollection(this.model.state.FIRSTTRACK, this.model.gameData);
    this.answer = adaptedAnswersData(this.model.state.FIRSTTRACK, this.model.gameData);
    this.model.state.perAnswerCounter = 0;
 		this.startGame();
	}


	startGame() {
		this.model.tick();
		if (this.model.gameData[this.model.state.FIRSTTRACK].type === `artist`) {
			this.content = new LevelView(this.track, this.answer);
		} else {
			this.content = new GenreView(this.track, this.answer);
		}
		this.content.onAnswer = this.onGameAnswer.bind(this);
    
    this.wrapper = new LevelWrapView(this.model.state.noteLivesMissed, this.model.state);
    this.wrapper.onAnswer = this.playAgain.bind(this);
    renderScreen(this.content.element);
    renderWrap(this.wrapper.element);
    const timeListener = setInterval(() =>{
    	if (this.model.state.GAMETIMESEC == 0 && this.model.state.GAMETIMEMIN == 0) {
    		this.outOfTime();  
    	}
    }, 2000);
	}

	outOfAttempts() {
		const attemptsScreen = new AttemptsScreen().element;
		attemptsScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
      this.playAgain()
    });
    renderScreen(attemptsScreen);
	}

	outOfTime() {
		const timeScreen = new TimeScreen().element;
		timeScreen.querySelector(`.main-replay`).addEventListener(`click`, () => {
      this.playAgain()
    });
    renderScreen(timeScreen);
	}

	playAgain() {
		this.model.restart();
		Application.showWelcome();
	}

	results() {

	}
}