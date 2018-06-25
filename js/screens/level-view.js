import {renderScreen, addUserAnswer, renderWrap, initialState, userScoreCounter} from '../utils';
//import genreScreen from './genre';
import musicCollection from '../music/music.js';
import answersArtist from '../answers/answersArtist.js';
import lastGamesResults from '../answers/lastGamesResults.js';
import {winScreen} from './win';
import {attemptsScreen} from './attempts';
import {LevelWrapView} from './levelWrap-view';
import {AbstractView} from './abstract-view';

export let globalSound;

export class LevelView extends AbstractView {
	constructor(track, answer) {
		super();
		this.track = track;
		this.answer = answer;
		this.soundTrack = new Audio(track.src);
  	globalSound = this.soundTrack;
	}

	render() {
		return `<div class="main main--level main--level-artist">
		  <div class="main-wrap">
		      <h2 class="title main-title">Какое это произведение?</h2>
		      <div class="player-wrapper">
		        <div class="player">
		          <audio>
		          </audio>
		          <button class="player-control player-control--pause"></button>
		          <div class="player-track">
		            <span class="player-status"></span>
		          </div>
		        </div>
		      </div>
		      <form class="main-list">
		        <div class="main-answer-wrapper">
		          <input class="main-answer-r" type="radio" id="answer-1" name="answer" value="${this.answer.val1}"/>
		          <label class="main-answer" for="answer-1">
		            <img class="main-answer-preview" src="${this.answer.img1}"
		                 alt="Пелагея" width="134" height="134">
		            ${this.answer.val1}
		          </label>
		        </div>

		        <div class="main-answer-wrapper">
		          <input class="main-answer-r" type="radio" id="answer-2" name="answer" value="${this.answer.val2}"/>
		          <label class="main-answer" for="answer-2">
		            <img class="main-answer-preview" src="${this.answer.img2}"
		                 alt="${this.track.artist}" width="134" height="134">
		            ${this.answer.val2}
		          </label>
		        </div>

		        <div class="main-answer-wrapper">
		          <input class="main-answer-r" type="radio" id="answer-3" name="answer" value="${this.answer.val3}"/>
		          <label class="main-answer" for="answer-3">
		            <img class="main-answer-preview" src="${this.answer.img3}"
		                 alt="Lorde" width="134" height="134">
		            ${this.answer.val3}
		          </label>
		        </div>
		      </form>
		    </div>

		  </div>`
	}

	get element() {
		this.soundTrack.play()

		if (this._element) {
			return this._element
		}

		this._element = document.createElement(`div`);
		Object.assign(this._element.style,{width: '100%', height:'100%'});
		this._element.innerHTML = this.render();
		this.bind();
		console.log(this.track.name);
		return this._element;

	} 

	onAnswer(it) {
	  this.soundTrack.pause();
    
    let isCorrect;
    let TIMESPENT = 20;

    if (this.track.name == it.value) {
      isCorrect = true;
    } else {
      isCorrect = false;
      initialState.noteLivesMissed += 1;
      console.log(`Итого у вас ошибкок ${initialState.noteLivesMissed}`);
    }

    addUserAnswer(isCorrect, TIMESPENT);

    if (initialState.FIRSTTRACK == (initialState.AMOUNTOFGAMES - 1)) {
      const finalScore = userScoreCounter();

      const userResultsScope = {
        gameTimeLeft : 20,
        noteLives : (initialState.NOTELIVES - initialState.noteLivesMissed),
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

		  userComparison();
      renderScreen(new winScreen(allGamesResults, userResultsScope, userPositionIndex, userComparison).element);
      return;
    }

    if (initialState.noteLivesMissed == initialState.NOTELIVES) {
      renderScreen(new attemptsScreen().element);
      return;
    }

    initialState.FIRSTTRACK += 1;
    renderScreen(new LevelView(musicCollection[initialState.FIRSTTRACK], answersArtist(initialState.FIRSTTRACK)).element);
 		renderWrap(new LevelWrapView(initialState.noteLivesMissed, globalSound).element);
	};

	bind() {
		const onAnswerHook = (it) => {this.onAnswer(it)};

  	const playButton = this.element.querySelector('.player-control--pause');
  	playButton.addEventListener(`click`, () => {
    	this.soundTrack.pause();
  	});

  	const answerButton = this.element.querySelectorAll(`.main-answer-r`);
  	
  	answerButton.forEach(function (it) {
	    it.addEventListener(`click`, () => {
	    	onAnswerHook(it);
	    });
	  });
	  
	}
}

