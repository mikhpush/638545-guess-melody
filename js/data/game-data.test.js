import {assert} from 'chai';
import {setTimer} from '../utils.js';
import {userScoreCounter} from '../utils.js';
import {userResultsDisplay} from '../utils.js';

describe(`Функция вывода результатов`, () => {
	it(`у пользователя закончилось время`, () => {
		const lastGamesResults = [
		  { userScore : 4, noteLives : 3, gameTimeLeft : 65 },
		  { userScore : 5, noteLives : 1, gameTimeLeft : 85 },
		  { userScore : 8, noteLives : 0, gameTimeLeft : 65 },
		  { userScore : 11, noteLives : 2, gameTimeLeft : 65 },
		];
		const userResultsScope = { userScore : 10, noteLives : 2, gameTimeLeft : 0 };

		let resultScreen = userResultsDisplay(lastGamesResults, userResultsScope);
		assert.equal(resultScreen, `Время вышло! Вы не успели отгадать все мелодии`);
	});

	it(`у пользователя закончилbcm попытки`, () => {
		const lastGamesResults = [
		  { userScore : 4, noteLives : 3, gameTimeLeft : 65 },
		  { userScore : 5, noteLives : 1, gameTimeLeft : 85 },
		  { userScore : 8, noteLives : 0, gameTimeLeft : 65 },
		  { userScore : 11, noteLives : 2, gameTimeLeft : 65 },
		];
		const userResultsScope = { userScore : 10, noteLives : 0, gameTimeLeft : 45 };

		let resultScreen = userResultsDisplay(lastGamesResults, userResultsScope);
		assert.equal(resultScreen, `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
	});

	it(`Пользователь зянял 2 место из 5`, () => {
		const lastGamesResults = [
		  { userScore : 4, noteLives : 3, gameTimeLeft : 65 },
		  { userScore : 5, noteLives : 1, gameTimeLeft : 85 },
		  { userScore : 8, noteLives : 0, gameTimeLeft : 65 },
		  { userScore : 11, noteLives : 2, gameTimeLeft : 65 },
		];
		const userResultsScope = { userScore : 10, noteLives : 1, gameTimeLeft : 10 };

		let resultScreen = userResultsDisplay(lastGamesResults, userResultsScope);
		assert.equal(resultScreen, `Вы заняли 2 место из 5 игроков. \n  Это лучше, чем у 60% игроков`);
	});

	it(`Пользователь зянял 3 место из 9`, () => {
		const lastGamesResults = [
		  { userScore : 4, noteLives : 3, gameTimeLeft : 65 },
		  { userScore : 5, noteLives : 1, gameTimeLeft : 85 },
		  { userScore : 8, noteLives : 0, gameTimeLeft : 65 },
		  { userScore : 11, noteLives : 2, gameTimeLeft : 65 },
	    { userScore : 4, noteLives : 3, gameTimeLeft : 65 },
		  { userScore : 5, noteLives : 1, gameTimeLeft : 85 },
		  { userScore : 8, noteLives : 0, gameTimeLeft : 65 },
		  { userScore : 11, noteLives : 2, gameTimeLeft : 65 },
		];
		const userResultsScope = { userScore : 10, noteLives : 1, gameTimeLeft : 10 };

		let resultScreen = userResultsDisplay(lastGamesResults, userResultsScope);
		assert.equal(resultScreen, `Вы заняли 3 место из 9 игроков. \n  Это лучше, чем у 67% игроков`);
	});

	it(`Пользователь набрал столько же, сколько набрали два предыдущих лидера`, () => {
		const lastGamesResults = [
		  { userScore : 10, noteLives : 3, gameTimeLeft : 65 },
		  { userScore : 10, noteLives : 1, gameTimeLeft : 85 },
		  { userScore : 10, noteLives : 0, gameTimeLeft : 65 },
		  { userScore : 10, noteLives : 2, gameTimeLeft : 65 },
	    { userScore : 4, noteLives : 3, gameTimeLeft : 65 },
		  { userScore : 8, noteLives : 1, gameTimeLeft : 85 },
		  { userScore : 9, noteLives : 0, gameTimeLeft : 65 },
		  { userScore : 2, noteLives : 2, gameTimeLeft : 65 },
		];
		const userResultsScope = { userScore : 10, noteLives : 1, gameTimeLeft : 100 };

		let resultScreen = userResultsDisplay(lastGamesResults, userResultsScope);
		assert.equal(resultScreen, `Вы заняли 1 место из 9 игроков. \n  Это лучше, чем у 89% игроков`);
	});
});



describe(`Проверка функции подсчета очков`, () => {
	it(`Пользователь ответил медленно на все вопросы - получил 10`, () => {
		let answersArray = [];
		let numberOfAnswers = 1;
		while (numberOfAnswers <= 10 ) {
			answersArray.push({isCorrect: true, timeSpent: 40});
			numberOfAnswers += 1;
		};
		let score = userScoreCounter(answersArray);
		assert.equal(score, 10);
	});

	it(`Пользователь ответил не на все вопросы - получил -1`, () => {
		let answersArray = [];
		let numberOfAnswers = 1;
		while (numberOfAnswers < 8) {
			answersArray.push({isCorrect: true, timeSpent: 40});
			numberOfAnswers += 1;
		};
		let score = userScoreCounter(answersArray);
		assert.equal(score, -1);
	});

	it(`Пользователь ответил на два вопроса быстрее 30 секунд - получил 12`, () => {
		let answersArray = [];
		let numberOfAnswers = 1;
		while (numberOfAnswers <= 8) {
			answersArray.push({isCorrect: true, timeSpent: 40});
			numberOfAnswers += 1;
		};
		answersArray.push({isCorrect: true, timeSpent: 2});
		answersArray.push({isCorrect: true, timeSpent: 20});
		let score = userScoreCounter(answersArray);
		assert.equal(score, 12);
	});

	it(`Пользователь ответил на 5 быстро, а на 5 медленно - получил 15`, () => {
		let answersArray = [];
		let numberOfAnswers = 1;
		while (numberOfAnswers <= 5) {
			answersArray.push({isCorrect: true, timeSpent: 40});
			numberOfAnswers += 1;
		};
		while (numberOfAnswers <= 10) {
			answersArray.push({isCorrect: true, timeSpent: 20});
			numberOfAnswers += 1;
		};

		let score = userScoreCounter(answersArray);
		assert.equal(score, 15);
	});

	it(`Пользователь на каждый ответ тратил ровно 30 секунд - получил толко 10`, () => {
		let answersArray = [];
		let numberOfAnswers = 1;
		while (numberOfAnswers <= 10) {
			answersArray.push({isCorrect: true, timeSpent: 30});
			numberOfAnswers += 1;
		};

		let score = userScoreCounter(answersArray);
		assert.equal(score, 10);
	});

	it(`Пользователь не дал ни одного ответа вообще - получил -1`, () => {
		let answersArray = [];
		let score = userScoreCounter(answersArray);
		assert.equal(score, -1);
	});

});

describe(`Корректные значения таймера`, () => {
	it(`Таймер принимает положительные числа (секунды)`, () => {
		const xTimer = setTimer(300);
		assert.equal(xTimer.timeLeft - 1, 299);
	})

	it(`Проверка обратного счета метода и состояния, когда время вышло`, () => {
		const xTimer = setTimer(3);
		xTimer.tick();
		xTimer.tick();
		xTimer.tick();
		assert.equal(xTimer.isFinished(), true );
	})
});

describe(`Некорректные значения таймера`, () => {
	it(`Таймер не принимает стоки и выдает ошибку`, () => {
		assert.throws(() => setTimer(`пять минут`))
	})

	it(`Таймер не принимает отрицательные значения и выдает ошибку`, () => {
		assert.throws(() => setTimer(-4))
	})

	it(`Таймер не принимает значения отличные от целых чисел и выдает ошибку`, () => {
		assert.throws(() => setTimer(4.5))
	})

	it(`Таймер не принимает значения отличные от целых чисел и выдает ошибку`, () => {
		assert.throws(() => setTimer(4.5))
	})

});
