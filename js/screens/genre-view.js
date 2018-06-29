import {getElementFromTemplate, renderScreen} from '../utils.js';
import winScreen from './win';
import timeScreen from './time';
import attemptsScreen from './attempts';
import {WelcomeScreen} from './welcome';
import {AbstractView} from './abstract-view';


export default class GenreView extends AbstractView {
  constructor(track, answer) {
    super();
    this.track = track;
    this.answer = answer;
  
    //globalSound = this.soundTrack;
  }
  
  render() {
    const htmlElements = this.answer.answers.map((item, i) => {
      return `<div class="genre-answer">
                        <div class="player-wrapper">
                          <div class="player">
                            <audio></audio>
                            <button class="player-control player-control--play"></button>
                            <div class="player-track">
                              <span class="player-status"></span>
                            </div>
                          </div>
                        </div>
                        <input type="checkbox" name="answer" value="${item.genre}" id="a-${i+1}">
                        <label class="genre-answer-check" for="a-${i+1}"></label>
                      </div>`
    });

    const htmlString = htmlElements.join(` `);

    return `<div class="main main--level main--level-genre">
              <div class="main-wrap">
                <h2 class="title">${this.answer.question}</h2>
                <form class="genre">
                  ${htmlString}
                  <button class="genre-answer-send" type="submit">Ответить</button>
                </form>
              </div>
            </div>`
  }

  onAnswer(it, choosenAnswers) {
    
  }

  bind() {

    let genreSoundGlobal;

    const soundTracks = [];

    for (const track of this.track.answers) {
      const soundTrack = new Audio(track.src);
      soundTracks.push(soundTrack);
    }

    genreSoundGlobal = soundTracks[0];
    genreSoundGlobal.play();

    const tracks = this.element.querySelectorAll(`.player-control`);
    tracks[0].className = `player-control player-control--pause`;

    for (let i = 0; i < tracks.length; i++) {
      tracks[i].addEventListener(`click`, (evt) => {
        if (tracks[i].className === `player-control player-control--play`) {
          evt.preventDefault();
          genreSoundGlobal = soundTracks[i];
          genreSoundGlobal.play();
          tracks[i].className = `player-control player-control--pause`;
        } else {
          evt.preventDefault();
          genreSoundGlobal.pause();
          tracks[i].className = `player-control player-control--play`;
        }
      });
    }

    const checkboxes = this.element.querySelectorAll(`.genre-answer input[type="checkbox"]`);
    const submit = this.element.querySelector(`.genre-answer-send`);
    const genreAnswer = this.element.querySelector(`.genre-answer-send`);

    submit.disabled = true;

    checkboxes.forEach(function (it) {
      it.addEventListener(`change`, () => {
        submit.disabled = !it.checked;
      });
    });

    genreAnswer.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      genreSoundGlobal.pause();
      const choosenAnswers = this.element.querySelectorAll(`.genre-answer input[type="checkbox"]`);
      this.onAnswer(evt, choosenAnswers)
    });

    const onAnswerHook = (it) => {this.onAnswer(it)};
  }

}
