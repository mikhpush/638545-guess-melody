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
};

export const userScoreCounter = (answersArray) => {
  
  const NUMBER_ANSWERS = 10;
  const FAST_TIME_ANSWER = 30;

  const answerPoints = { 
    CORRECT: 1, 
    FAST: 2, 
    INCORRECT: -2 
  };
  
  let userScore = 0;

  if (answersArray.length < NUMBER_ANSWERS) {
    return userScore = -1;
  };

  answersArray.forEach(function(it) {
    if (it.isCorrect == true && it.timeSpent < FAST_TIME_ANSWER) {
      userScore += answerPoints.FAST;
    } else if (it.isCorrect == true && it.timeSpent >= FAST_TIME_ANSWER) {
      userScore += answerPoints.CORRECT;
    } else if (it.isCorrect == false) {
      userScore -= answerPoints.INCORRECT;
    }
  });

  return userScore;
}

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