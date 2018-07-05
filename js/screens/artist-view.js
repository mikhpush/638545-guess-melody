
import AbstractView from './abstract-view';

export default class LevelView extends AbstractView {
  constructor(track, answer) {
    super();
    this.track = track;
    this.answer = answer;
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = document.createElement(`div`);
    Object.assign(this._element.style, {width: `100%`, height: `100%`});
    this._element.innerHTML = this.render();
    this.bind();
    return this._element;
  }

  render() {
    return `<div class="main main--level main--level-artist">
      <div class="main-wrap">
          <h2 class="title main-title">${this.track.question}</h2>
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
      </div>`;
  }

  onAnswer() {
  }

  bind() {
    let artistSoundGlobal = new Audio(this.track.src);
    const node = document.createElement(`div`).appendChild(artistSoundGlobal);
    const nodeTree = document.querySelector(`body`);
    if (nodeTree.lastElementChild instanceof document.defaultView.HTMLAudioElement) {
      nodeTree.removeChild(nodeTree.lastElementChild);
    }

    nodeTree.appendChild(node);
    artistSoundGlobal.play();

    const onAnswerHook = (it) => {
      this.onAnswer(it);
    };

    const playButton = this.element.querySelector(`.player-control`);
    playButton.addEventListener(`click`, (evt) => {
      if (playButton.className === `player-control player-control--play`) {
        evt.preventDefault();
        artistSoundGlobal.play();
        playButton.className = `player-control player-control--pause`;
      } else {
        evt.preventDefault();
        artistSoundGlobal.pause();
        playButton.className = `player-control player-control--play`;
      }
    });

    const answerButton = this.element.querySelectorAll(`.main-answer-r`);

    answerButton.forEach(function (it) {
      it.addEventListener(`click`, () => {
        nodeTree.removeChild(nodeTree.lastElementChild);
        onAnswerHook(it);
      });
    });
  }
}

