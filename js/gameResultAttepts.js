
const resultLossAttepts = document.createElement(`section`);
resultLossAttepts.className = `main main--result`;
resultLossAttepts.innerHTML = `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>

  `;

export default resultLossAttepts;
    