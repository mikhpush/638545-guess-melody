//дом

import {mainWelcome} from './mainWelcome';
import {changeScreen} from './utils';

changeScreen(mainWelcome);
alert('hi');
/*







//setInterval(findPlayAgainButton, 1000);

const findReplayButton = () => {
  const replay = mainElement.querySelector(`section`);
  replay.querySelector(`.main-replay`).addEventListener(`click`, () => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(mainWelcome);
  });
};

//setInterval(findReplayButton, 1000);





const disabledSubmit = () => {
  const checkbox = document.getElementsByName(`answer`);
  const submit = document.querySelector(`.genre-answer-send`);
  console.log(checkbox);
  console.log(submit); 
  submit.disabled = true;

  checkbox.forEach( function(it) { 
      if (it.checked == true) {
      submit.disabled = false;
    }});
 
}

//etInterval(disabledSubmit, 500);
*/