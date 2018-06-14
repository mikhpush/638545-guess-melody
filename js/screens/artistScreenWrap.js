import {getElementFromTemplate, renderScreen, playAgain, initialState} from '../utils';
import welcomeScreen from './welcome';

let artistScreenWrap = (noteLives, sound) => {

const artistRandomWrap = (noteLives, sound) => { 
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
      <a class="play-again play-again__wrap" href="#">
        <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
      </a>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle stroke-dasharray="2325" 
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">01</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">03</span>
        </div>
      </svg>
<div class="main-mistakes">
        
      </div>
      `;
/*
  wrapper.querySelector(`.timer-line`).style.strokeDashoffset = initialState.CIRCLECUT;

  const circle = (p) => {
    const circleMarkup = document.createElement(`div`);
    circleMarkup.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle stroke-dasharray="2325" stroke-dashoffset="${initialState.CIRCLECUT}" 
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>`;
    wrapper.querySelector(`svg`).replaceWith(circleMarkup);
  }

  circle(initialState.CIRCLECUT);
*/
  wrapper.querySelector(`.play-again`).addEventListener(`click`, () => {
    sound.pause();
    console.log(sound);

    renderScreen(welcomeScreen);
  });

  for (let i = 1; i <= noteLives; i++) {
    const notes = document.createElement('img')
    notes.className = `main-mistake`;
    notes.src = `img/wrong-answer.png`;
    notes.width =`35`;
    notes.height = `49`;
    console.log(notes);
    wrapper.querySelector(`.main-mistakes`).insertAdjacentElement(`beforeEnd`, notes);
  }

  return wrapper;
};

return artistRandomWrap(noteLives, sound);
}

export default artistScreenWrap;

/*
<div class="main-mistakes">
        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      </div>
      */