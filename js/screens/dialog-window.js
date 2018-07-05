import AbstractView from './abstract-view';

export default class DialogWindow extends AbstractView {

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = document.createElement(`div`);
    this._element.innerHTML = this.render();
    this.bind();
    return this._element;
  }

  render() {
    return `<section class="modal-confirm modal-confirm__wrap">
    <form class="modal-confirm__inner">
      <button class="modal-confirm__close" type="button">Закрыть</button>
      <h2 class="modal-confirm__title">Подтверждение</h2>
      <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal-confirm__btn-wrap">
        <button class="modal-confirm__btn">Ок</button>
        <button class="modal-confirm__btn">Отмена</button>
      </div>
    </form>
  </section>`;
  }

  bind() {
    for (const answer of this.element.querySelectorAll(`.modal-confirm__btn`)) {
      answer.addEventListener(`click`, (it) => {
        it.preventDefault();
        this.onAnswer(it.target);
      });
    }

    this.element.querySelector(`.modal-confirm__close`).addEventListener(`click`, (it) => {
      it.preventDefault();
      this.onAnswer(it.target);
    });

  }

  onAnswer() {

  }

}

