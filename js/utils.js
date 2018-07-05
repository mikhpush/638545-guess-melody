export const GAME_CONSTS = {
  ANSWER_POINTS: {
    CORRECT: 1,
    FAST: 2,
    INCORRECT: -2
  },
  FAST_TIME_ANSWER: 30,
  CIRCLE_LENGTH: 2325,
  AMOUNT_OF_GAMES: 10,
  NOTE_LIVES: 3
};

export let initialGameState = {
  currentTrack: 0,
  lostLives: 0,
  gameTimeMin: 5,
  gameTimeSec: 0,
  timeSpentSec: 0,
  perAnswerCounter: 0,
  circleCut: 0,
  userAnswers: []
};

let circleTimer;

export const startCircleTimer = (arg) => {

  let timeInSec;
  timeInSec = (timeInSec !== undefined) ? timeInSec : (arg.gameTimeMin * 60);

  const circleCutShift = (GAME_CONSTS.CIRCLE_LENGTH / timeInSec);
  circleTimer = setInterval(() => {
    arg.circleCut += circleCutShift;
    document.querySelector(`.timer-line`).style.strokeDashoffset = arg.circleCut;
    if (arg.circleCut === GAME_CONSTS.CIRCLE_LENGTH) {
      clearInterval(circleTimer);
    }
  }, 1000);
};

export const stopCircleTimer = () => {
  clearInterval(circleTimer);
};

let timer;

export const startTimer = (arg) => {
  if (!isFinite(arg.gameTimeMin) || !isFinite(arg.gameTimeSec)) {
    throw new Error(`passed argument is not finite`);
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
    } else if (arg.gameTimeMin >= 0 && arg.gameTimeSec > 0) {
      arg.gameTimeSec -= 1;
    }

    arg.perAnswerCounter += 1;
    arg.timeSpentSec += 1;
    
    let twoDigitSecDisplay = (arg.gameTimeSec < 10) ? `0${arg.gameTimeSec}` : arg.gameTimeSec;

    

    document.querySelector(`.timer-value-mins`).innerHTML = arg.gameTimeMin;
    document.querySelector(`.timer-value-secs`).innerHTML = twoDigitSecDisplay;
    


    if (arg.gameTimeMin === 0 && arg.gameTimeSec < 30) {
      const timerContainer = document.querySelector(`.timer-value`);
      timerContainer.style.color = (timerContainer.style.color === `red`) ? (`#ff9749`) : (`red`);
    }

  }, 1000);
};

export const stopTimer = () => {
  clearInterval(timer);
};

export const compareUsers = (previousGamesData, userPositionIndex) => {
  const rank = Math.round((previousGamesData.length - userPositionIndex - 1) / previousGamesData.length * 100);
  return rank;
};

export const addUserAnswer = (isCorrect, modelState) => {
  let newAnswer = isCorrect ? modelState.perAnswerCounter : -1;
  modelState.userAnswers.push(newAnswer);
};

export const getUserPositionIndex = (previousGamesData, finalScore) => {
  const statistics = previousGamesData.map(function (arg) {
    const score = userScoreCounter(arg.answers);
    return score;
  });

  statistics.sort(function (a, b) {
    return b - a;
  });

  const userPosition = statistics.findIndex(function (arg) {
    return arg === finalScore;
  });

  return userPosition;
};

export const fastAnswersAmount = (modelState) => {
  let number = 0;
  modelState.userAnswers.forEach((it) => {
    if (it < GAME_CONSTS.FAST_TIME_ANSWER && it > 0) {
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

  if (arg.length < GAME_CONSTS.AMOUNT_OF_GAMES) {
    userScore = -1;
    return userScore;
  }

  arg.forEach(function (it) {
    if (it < GAME_CONSTS.FAST_TIME_ANSWER && it > 0) {
      userScore += GAME_CONSTS.ANSWER_POINTS.FAST;
    } else if (it >= GAME_CONSTS.FAST_TIME_ANSWER) {
      userScore += GAME_CONSTS.ANSWER_POINTS.CORRECT;
    } else if (it < 0) {
      userScore += GAME_CONSTS.ANSWER_POINTS.INCORRECT;
    }
  });

  return userScore;
};
