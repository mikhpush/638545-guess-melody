
const musicData = [
  {
    artist: `Tchaikovsky`,
    name: `Waltz of the Flowers`,
    image: `http://www.intermedia.ru/img/news/267902.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=d60fdf6ce5048650&f=m`,
    genre: `classic`
  },
  {
    artist: `Rahmaninov`,
    name: `Vocalise`,
    image: `http://krim-gf.ru/wp-content/uploads/658139-700x700.jpg`,
    src: `http://adultedu.ru/music/Vocalise.mp3`,
    genre: `Rock`
  },
  {
    artist: `Rimsky-Korsakov`,
    name: `Flight Of The Bumblebee`,
    image: `https://i.mycdn.me/image?id=855683527493&t=35&plc=WEB&tkn=*cEjV15A6I0uiyhlzESeXaseXyHc`,
    src: `http://adultedu.ru/music/BumbleBee_flight.mp3`,
    genre: `classic`
  },
  {
    artist: `Borodin`,
    name: `Poloveckie dance`,
    image: `https://im0-tub-ru.yandex.net/i?id=c8e5c5b0f60a42f2b1d7729b1c57d8de&n=13`,
    src: `http://adultedu.ru/music/poloveckie_plyaski.mp3`,
    genre: `classic`
  },
  {
    artist: `Tchaikovsky`,
    name: `Marsh from Nutckracker`,
    image: `http://www.intermedia.ru/img/news/267902.jpg`,
    src: `http://adultedu.ru/music/Marsh_Nutckracker.mp3`,
    genre: `classic`
  },
  {
    artist: `Glinka`,
    name: `Uverture to Ruslan&Ludmila.mp3`,
    image: `http://900igr.net/up/datai/252218/0014-014-.jpg`,
    src: `http://adultedu.ru/music/Uvertyura_Ruslan&Ludmila.mp3`,
    genre: `classic`
  },
  {
    artist: `Prokofiev`,
    name: `Dance of the knights`,
    image: `https://i.pinimg.com/originals/1d/0b/45/1d0b45ee7f61b185e2dbe551b8f88a85.jpg`,
    src: `http://adultedu.ru/music/Dance_of_the_knight.mp3`,
    genre: `classic`
  },
  {
    artist: `Shostakovich`,
    name: `Simphony No.7 Leningradskaya`,
    image: `https://pp.userapi.com/c633616/v633616922/31450/5ZFAXREaUq8.jpg`,
    src: `http://adultedu.ru/music/Simphony_No.7_Leningradskaya.mp3`,
    genre: `classic`
  },
  {
    artist: `Mussorgsky`,
    name: `Chorus Slava from Boris Godunov`,
    image: `http://www.rulex.ru/rpg/WebPict/fullpic/1102-104.jpg`,
    src: `http://adultedu.ru/music/Chorus_Slava_from_Boris_Godunov.mp3`,
    genre: `classic`
  },
  {
    artist: `Agapkin`,
    name: `Farewell of Slavianka`,
    image: `https://upload.wikimedia.org/wikipedia/commons/5/50/Vasiliy_Agapkin.jpg`,
    src: `http://adultedu.ru/music/Procshanie_slavyanki.mp3`,
    genre: `classic`
  }

];

const musicRandomizer= (musicData) => {
  const randomCollection = musicData.sort(function(a, b) {
    return (Math.random() - Math.random());
  });

  return randomCollection
}

const musicCollection = musicRandomizer(musicData);

export default musicCollection;
//