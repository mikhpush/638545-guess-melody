import {getElementFromTemplate, renderScreen, addUserAnswer, renderWrap, initialState, userScoreCounter} from '../utils';
import genreScreen from './genre';
import musicCollection from '../music/music.js';
import answersArtist from '../answers/answersArtist.js';
import lastGamesResults from '../answers/lastGamesResults.js';
import artistScreenWrap from './artistScreenWrap';
import winScreen from './win';
import attemptsScreen from './attempts';



export let globalSound;

const artistScreen = (track, answer) => {
  const artistRandomScreen = getElementFromTemplate(`<div class="main main--level main--level-artist">
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
          <input class="main-answer-r" type="radio" id="answer-1" name="answer" value="${answer.val1}"/>
          <label class="main-answer" for="answer-1">
            <img class="main-answer-preview" src="${answer.img1}"
                 alt="Пелагея" width="134" height="134">
            ${answer.val1}
          </label>
        </div>

        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-2" name="answer" value="${answer.val2}"/>
          <label class="main-answer" for="answer-2">
            <img class="main-answer-preview" src="${answer.img2}"
                 alt="${track.artist}" width="134" height="134">
            ${answer.val2}
          </label>
        </div>

        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-3" name="answer" value="${answer.val3}"/>
          <label class="main-answer" for="answer-3">
            <img class="main-answer-preview" src="${answer.img3}"
                 alt="Lorde" width="134" height="134">
            ${answer.val3}
          </label>
        </div>
      </form>
    </div>

  </div>`)
  
  const soundTrack = new Audio(track.src);
  globalSound = soundTrack;
  soundTrack.play()

  const playButton = artistRandomScreen.querySelector('.player-control--pause');
  playButton.addEventListener(`click`, () => {
    soundTrack.pause();
  });

  const answerButton = artistRandomScreen.querySelectorAll(`.main-answer-r`);
  answerButton.forEach(function (it) {
    it.addEventListener(`click`, () => {
      soundTrack.pause();
      
      let isCorrect;
      let TIMESPENT = 20;

      if (track.name == it.value) {
        isCorrect = true;
      } else {
        isCorrect = false;
        initialState.noteLivesMissed += 1;
        console.log(`Итого у вас ошибкок ${initialState.noteLivesMissed}`);
      }

      addUserAnswer(isCorrect, TIMESPENT);

      if (initialState.FIRSTTRACK == (initialState.AMOUNTOFGAMES - 1)) {
        const finalScore = userScoreCounter();
        console.log(finalScore);

        const userResultsScope = {
          gameTimeLeft : 20,
          noteLives : (initialState.NOTELIVES - initialState.noteLivesMissed),
          userScore : finalScore
        };

        renderScreen(winScreen(lastGamesResults, userResultsScope));

        return;
      }

      if (initialState.noteLivesMissed == initialState.NOTELIVES) {
        renderScreen(attemptsScreen);
        return;
      }

      initialState.FIRSTTRACK += 1;

      renderScreen(artistScreen(musicCollection[initialState.FIRSTTRACK], answersArtist(initialState.FIRSTTRACK)));
      renderWrap(artistScreenWrap(initialState.noteLivesMissed, globalSound));
      console.log(initialState.FIRSTTRACK)
    });
  });


  return artistRandomScreen;
};

export default artistScreen;
