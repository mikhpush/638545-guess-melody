const answerPoints = {
    CORRECT: 1,
    FAST: 2,
    INCORRECT: -2
  };

export let initialGameState = {
  currentTrack: 0,
  AMOUNTOFGAMES: 10,
  lostLives: 0,
  NOTELIVES: 3,
  GAMETIMESEC: 300,
  gameTimeMin: 5,
  gameTimeSec: 0,
  timeSpentSec: 0,
  perAnswerCounter: 0,
  CIRCLELENGTH: 2325,
  circleCut: 0,
  FAST_TIME_ANSWER: 30,
  userAnswers: []
};

let circleTimer;

export const startCircleTimer = (arg) => {

  const circleCutShift = (arg.CIRCLELENGTH / (initialGameState.GAMETIMESEC * 20));
  circleTimer = setInterval(() => {
    /*
    document.querySelector(`.timer-line`).style.strokeDashoffset = arg.circleCut;
    arg.circleCut += circleCutShift;
    */
    if (arg.circleCut === arg.CIRCLELENGTH) {
      clearInterval(circleTimer);
    }
  }, 50);
};

export const stopCircleTimer = () => {
  clearInterval(circleTimer);
};

let timer;

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

export const startTimer = (arg) => {
  if (!isNumeric(arg.gameTimeMin) || !isNumeric(arg.gameTimeSec)) {
    throw new Error(`passed argument is not a number`);
  }

  if (arg.gameTimeMin < 0 || arg.gameTimeSec < 0) {
    throw new Error(`Время не может быть отрицательным`);
  }

  if (!Number.isInteger(arg.gameTimeMin) || !Number.isInteger(arg.gameTimeSec)) {
    throw new Error(`боюсь, мы принимаем только целые секунды к расчету`);
  }

  timer = setInterval(() => {
    if (arg.gameTimeMin === 0 && arg.gameTimeSec === 0) {
      clearInterval(timer);
    } else if (arg.gameTimeMin >= 0 && arg.gameTimeSec === 0) {
      arg.gameTimeSec = 59;
      if (arg.gameTimeMin > 0) {
        arg.gameTimeMin -= 1;
      }
    }
    arg.perAnswerCounter += 1;
    arg.timeSpentSec += 1;
/*
    let twoDigitSecDisplay = (arg.gameTimeSec < 10) ? `0${arg.gameTimeSec}` : arg.gameTimeSec;

    document.querySelector(`.timer-value-mins`).innerHTML = arg.gameTimeMin;
    document.querySelector(`.timer-value-secs`).innerHTML = twoDigitSecDisplay;
    arg.gameTimeSec -= 1;
*/
/*
    if (arg.gameTimeMin === 0 && arg.gameTimeSec < 30) {
      const timerContainer = document.querySelector(`.timer-value`);
      timerContainer.style.color = (timerContainer.style.color === `red`) ? (`#ff9749`) : (`red`);
    }
    */
  }, 1000);
};

export const stopTimer = () => {
  clearInterval(timer);
};

export const addUserAnswer = (isCorrect, timeSpent) => {

  let newAnswer;
  if (isCorrect === true) {
    newAnswer = timeSpent;
  } else {
    newAnswer = -1;
  }

  initialGameState.userAnswers.push(newAnswer);
};

export const fastAnswersAmount = () => {
  let number = 0;
  initialGameState.userAnswers.forEach((it) => {
    if (it < initialGameState.FAST_TIME_ANSWER && it > 0) {
      number += 1;
    }
  });
  return number;
};

export const renderScreen = (screen) => {
  const mainScreen = document.querySelector(`.main`);
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(screen);
};

export const renderWrap = (wrapper) => {
  const mainScreen = document.querySelector(`.main--level`);
  mainScreen.insertAdjacentElement(`afterbegin`, wrapper);
};

export const userScoreCounter = (arg) => {
  let userScore = 0;

  if (initialGameState.userAnswers.length < arg.AMOUNTOFGAMES) {
    userScore = -1;
    return userScore;
  }

  initialGameState.userAnswers.forEach(function (it) {
    if (it < initialGameState.FAST_TIME_ANSWER && it > 0) {
      userScore += answerPoints.FAST;
    } else if (it >= initialGameState.FAST_TIME_ANSWER) {
      userScore += answerPoints.CORRECT;
    } else if (it < 0) {
      userScore += answerPoints.INCORRECT;
    }
  });

  return userScore;
};
