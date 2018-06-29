import musicCollection from '../music/music.js';


const answersArtist = (n) => {

let firstAnswer = -1;

let array1 = [n];

  const randomAnswer = (n) => {

    let getRandom = Math.round(Math.random()*(gameState.AMOUNTOFGAMES - 1));

    if (getRandom !== n && getRandom !== firstAnswer) {
          
      let random = getRandom;
      firstAnswer = getRandom;
      return array1.push(random);
      
    } else {
      return randomAnswer(n);
    };
  };

randomAnswer(n);
randomAnswer(n);


array1.sort(function(a, b) {
    return (Math.random() - Math.random());
  });


  return ({
      val1: musicCollection[array1[0]].name,
      val2: musicCollection[array1[1]].name,
      val3: musicCollection[array1[2]].name,
      img1: musicCollection[array1[0]].image,
      img2: musicCollection[array1[1]].image,
      img3: musicCollection[array1[2]].image
    });
   
};

export default answersArtist;