
export let initialGameState = {
  FIRSTTRACK : 0,
  AMOUNTOFGAMES : 10,
  noteLivesMissed : 0,
  NOTELIVES : 3,
  GAMETIMEMIN : 5,
  GAMETIMESEC : 0,
  timeSpentSec : 0,
  perAnswerCounter : 0,
  CIRCLELENGTH : 2325,
  circleCut : 0,
  FAST_TIME_ANSWER : 30
};

export let gameState = Object.assign({}, initialGameState);

let userAnswers = [];

let circleTimer;

export const startCircleTimer = (arg) => {
  const circleCutShift = (arg.CIRCLELENGTH/((arg.GAMETIMEMIN*60 + arg.GAMETIMESEC)*20));
  circleTimer = setInterval(() => {
    document.querySelector(`.timer-line`).style.strokeDashoffset = arg.circleCut;
    arg.circleCut += circleCutShift;
    if (arg.circleCut == arg.CIRCLELENGTH) {
      clearInterval(circleTimer);
    }
  }, 50);
}

export const stopCircleTimer = () => {clearInterval(circleTimer)};

let timer;

export const startTimer = (arg) => {
  timer = setInterval(() => {
    if (arg.GAMETIMEMIN == 0 && arg.GAMETIMESEC == 0) {
      return clearInterval(timer);
    } else if (arg.GAMETIMEMIN >= 0 && arg.GAMETIMESEC == 0) {
      arg.GAMETIMESEC = 59;
      if (arg.GAMETIMEMIN > 0) {
        arg.GAMETIMEMIN -= 1;
      }
    };
    arg.perAnswerCounter += 1;
    arg.timeSpentSec += 1;

    let twoDigitSecDisplay = (arg.GAMETIMESEC < 10) ? `0${arg.GAMETIMESEC}` : arg.GAMETIMESEC; 

    document.querySelector(`.timer-value-mins`).innerHTML = arg.GAMETIMEMIN;
    document.querySelector(`.timer-value-secs`).innerHTML = twoDigitSecDisplay;
    arg.GAMETIMESEC -= 1;
  }, 1000);
};

export const stopTimer = () => {clearInterval(timer)};

function singleAnswer(isCorrect, TIMESPENT) {
  this.isCorrect = isCorrect;
  this.timeSpent = TIMESPENT;
}

export const addUserAnswer = (isCorrect, TIMESPENT) => {
  let newAnser = new singleAnswer(isCorrect, TIMESPENT);
  userAnswers.push(newAnser);
}

export const fastAnswersAmount = () => {
  let number = 0;
  userAnswers.forEach((it) => {
    if (it.timeSpent < initialGameState.FAST_TIME_ANSWER) {
      number += 1;
    }
  });
  return number;
};

export const getElementFromTemplate = (stringTemplate) => {
	let result = document.createElement('div');
	Object.assign(result.style,{width: '100%', height:'100%'});
	result.innerHTML = stringTemplate;
	return result;
};

export const renderScreen = (screen) => {
	const mainScreen = document.querySelector(`.main`);	
	mainScreen.innerHTML = ``;
	mainScreen.appendChild(screen);
};

export const renderWrap = (wrapper) => {
  const mainScreen = document.querySelector(`.main--level`);
  mainScreen.insertAdjacentElement(`afterbegin`, wrapper);
}

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

export const setTimer = (time) => { 
	if (!isNumeric(time)) { 
		throw new Error(`passed argument is not a number`); 
	}

	if (time < 0) {
    throw new Error(`cannot set negative value`);
  }

  if (!Number.isInteger(time)) {
  	throw new Error(`боюсь, мы принимаем только целые секунды к расчету`)
  }

  const timer = { 
    timeLeft: time, 
    isFinished: false,
    tick: () => { 
      if (timer.timeLeft > 0) { 
        timer.timeLeft -= 1; // *sec 
      } else {
        timer.isFinished = true;
      }
    } 
  };

  return timer; 
};

export const userScoreCounter = (arg) => {
  const answerPoints = { 
    CORRECT: 1, 
    FAST: 2, 
    INCORRECT: -2 
  };
  
  let userScore = 0;

  if (userAnswers.length < arg.AMOUNTOFGAMES) {
    return userScore = -1;
  };

  userAnswers.forEach(function(it) {
    if (it.isCorrect == true && it.timeSpent < initialGameState.FAST_TIME_ANSWER) {
      userScore += answerPoints.FAST;
    } else if (it.isCorrect == true && it.timeSpent >= initialGameState.FAST_TIME_ANSWER) {
      userScore += answerPoints.CORRECT;
    } else if (it.isCorrect == false) {
      userScore += answerPoints.INCORRECT;
    }
  });

  return userScore;
}
/*
export const userResultsDisplay = (lastGamesResults, userResultsScope) => {
  
  if (userResultsScope.gameTimeLeft == 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`
  };

  if (userResultsScope.noteLives == 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
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
   return Math.round((allGamesResults.length - userPositionIndex -1) / allGamesResults.length * 100);
  };

  return `Вы заняли ${userPositionIndex + 1} место из ${allGamesResults.length} игроков. 
  Это лучше, чем у ${userComparison()}% игроков`;
}
*/










// Набор общих функций

/*import {mainWelcome} from './mainWelcome';


export const changeScreen = (x) => {
  const mainElement = document.querySelector(`.main`);
  mainElement.innerHTML = ``;
  mainElement.appendChild(x);
};

export const playAgainButton = (y) => {
  y.querySelector(`.play-again`).addEventListener(`click`, () => {
    changeScreen(mainWelcome);
  });
};

export const replayButton = (z) => {
  z.querySelector(`.main-replay`).addEventListener(`click`, () => {
    changeScreen(mainWelcome);
  });
};

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

export const setTimer = (time) => { 
	if (!isNumeric(time)) { 
		throw new Error(`passed argument is not a number`); 
	}

	if (time < 0) {
    throw new Error(`cannot set negative value`);
  }

  if (!Number.isInteger(time)) {
  	throw new Error(`боюсь, мы принимаем только целые секунды к расчету`)
  }

  const timer = { 
    timeLeft: time, 
    isFinished: () => timer.timeLeft === 0, 
    tick: () => { 
      if (timer.timeLeft > 0) { 
        timer.timeLeft -= 1; // *sec 
      } 
    } 
  };

  return timer; 
};*/