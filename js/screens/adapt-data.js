
export const adaptedAnswersData = (n, gameData) => {

  let result;

  if (gameData[n].type === `artist`) {
    result = {
      val1: gameData[n].answers[0].title,
      val2: gameData[n].answers[1].title,
      val3: gameData[n].answers[2].title,
      img1: gameData[n].answers[0].image.url,
      img2: gameData[n].answers[1].image.url,
      img3: gameData[n].answers[2].image.url
    };

  } else if (gameData[n].type === `genre`) {
    result = gameData[n];
  }

  return result;
};

export const adaptedMusicCollection = (n, gameData) => {

  let result;

  if (gameData[n].type === `artist`) {
    let correctName;

    for (const correctTrack of gameData[n].answers) {
      if (correctTrack.isCorrect) {
        correctName = correctTrack.title;
        break;
      }
    }

    result = {
      question: gameData[n].question,
      name: correctName,
      src: gameData[n].src,
    };

  } else if (gameData[n].type === `genre`) {
    result = gameData[n];
  }

  return result;
};
