import mainWelcome from './mainWelcome.js';
import gameArtist from './gameArtist.js';
import mainAnswer from './gameArtist.js';
import gameGenre from './gameGenre.js';
import genreAnswer from './gameGenre.js';
import resultWin from './gameResultWin.js';
import resultLossTime from './gameResultTime.js';
import resultLossAttepts from './gameResultAttepts.js';


const mainElement = document.querySelector(`.main`);
mainElement.appendChild(mainWelcome);


const buttonPlay = document.querySelector('.main-play'); 
buttonPlay.addEventListener(`click`, () => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(gameArtist);
});



const findPlayAgainButton = () => {
  const playAgain = mainElement.querySelector(`section`);
  //console.log(playAgain);

  playAgain.querySelector(`.play-again__img`).addEventListener(`click`, () => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(mainWelcome);
  });
};

setInterval(findPlayAgainButton, 1000);

const findReplayButton = () => {
  const replay = mainElement.querySelector(`section`);
  //console.log(replay);

  replay.querySelector(`.main-replay`).addEventListener(`click`, () => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(mainWelcome);
  });
};
setInterval(findReplayButton, 1000);

mainAnswer.querySelectorAll('.main-answer').forEach( function (it) {
  it.addEventListener(`click`, () => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(gameGenre);
})});

console.log((genreAnswer.getElementsByClassName(`genre-answer-send`))[0]);
genreAnswer.getElementsByClassName(`genre-answer-send`)[0].addEventListener(`click`, () => {
  let randomResult = Math.floor(Math.random()*3);
  console.log(randomResult);
  switch (randomResult) {
    case 0: 
      randomResult = resultWin;
      console.log(resultWin);
      break;
    case 1:
      randomResult = resultLossTime;
      console.log(resultLossTime);
      break;
    case 2: 
      randomResult = resultLossAttepts;
      console.log(resultLossAttepts);
      break;
  };

  console.log(randomResult);
  mainElement.innerHTML = ``;
  mainElement.appendChild(randomResult);

});

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

setInterval(disabledSubmit, 500);
