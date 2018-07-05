const SERVER_URL = `https://es.dump.academy/guess-melody`;

const APP_ID = 55783411;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } 

  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return window.fetch(`${SERVER_URL}/questions`).then(checkStatus).
    then(toJSON);
  }

  static loadResults() {
    return window.fetch(`${SERVER_URL}/stats/${APP_ID}`).then(checkStatus).then(toJSON);
  }

  static saveResults(userResultsData) {
    const data = userResultsData;

    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}`, requestSettings).then(checkStatus);
  }
}
