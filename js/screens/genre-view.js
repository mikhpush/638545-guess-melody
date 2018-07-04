import AbstractView from './abstract-view';

export default class GenreView extends AbstractView {
  constructor(track, answer) {
    super();
    this.track = track;
    this.answer = answer;
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
                        <input type="checkbox" name="answer" value="${item.genre}" id="a-${i + 1}">
                        <label class="genre-answer-check" for="a-${i + 1}"></label>
                      </div>`;
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
            </div>`;
  }

  onAnswer() {

  }

  bind() {

    let genreSoundGlobal;

    const soundTracks = [];

    for (const track of this.track.answers) {
      const soundTrack = new Audio(track.src);
      soundTracks.push(soundTrack);
    }
    genreSoundGlobal = soundTracks[0];
    const audioNode = document.createElement(`div`).appendChild(genreSoundGlobal);
    const nodeTree = document.querySelector(`body`);

    if (nodeTree.lastElementChild instanceof document.defaultView.HTMLAudioElement) {
      nodeTree.removeChild(nodeTree.lastElementChild);
    }
    nodeTree.appendChild(audioNode);

    genreSoundGlobal.play();

    const tracks = this.element.querySelectorAll(`.player-control`);
    tracks[0].className = `player-control player-control--pause`;

    for (let i = 0; i < tracks.length; i++) {
      tracks[i].addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (tracks[i].className === `player-control player-control--play`) {
          genreSoundGlobal = soundTracks[i];
          const newAudioNode = document.createElement(`div`).appendChild(genreSoundGlobal);
          document.querySelector(`body`).replaceChild(newAudioNode, nodeTree.lastElementChild);
          genreSoundGlobal.play();
          for (const randomTrack of tracks) {
            randomTrack.className = `player-control player-control--play`;
          }
          tracks[i].className = `player-control player-control--pause`;
        } else {
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
      const chosenAnswers = this.element.querySelectorAll(`.genre-answer input[type="checkbox"]`);
      this.onAnswer(evt, chosenAnswers);
    });
  }

}
