
import {welcomeScreen} from './screens/welcome';
import {renderScreen} from './utils';

renderScreen(new welcomeScreen().element);



/*
const lastGamesResults = [
		  { userScore : 4, noteLives : 3, gameTimeLeft : 65 },
		  { userScore : 5, noteLives : 1, gameTimeLeft : 85 },
		  { userScore : 8, noteLives : 0, gameTimeLeft : 65 },
		  { userScore : 11, noteLives : 2, gameTimeLeft : 65 },
		];
		const userResultsScope = { userScore : 10, noteLives : 2, gameTimeLeft : 0 };

export const userResultsDisplay = (lastGamesResults, userResultsScope) => {
  
  if (userResultsScope.gameTimeLeft = 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`
  };

  if (userResultsScope.noteLives = 0) {
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
   return ((allGamesResults.length - userPositionIndex -1) / allGamesResults.length * 100);
  };

  return `Вы заняли ${userPositionIndex + 1} место из ${allGamesResults.length} игроков. 
  Это лучше, чем у ${userComparison()}% игроков`;
}

console.log(userResultsDisplay(lastGamesResults, userResultsScope));
*/