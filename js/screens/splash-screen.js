import AbstractView from './abstract-view';

export default class SplashScreen extends AbstractView {

  constructor() {
    super();
    this.cursor = 0;
    this.symbolsSeq = [`0`, `o`, `0`, `o`];
    this.symbolsTextSeq = [`З`, `За`, `Заг`, `Загр`, `Загру`, `Загруж`, `Загружа`, `Загружае`, `Загружаем`,
      `Загружаемс`, `Загружаемся`, `Загружаемся.`, `Загружаемся..`, `Загружаемся...`, ``];
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = document.createElement(`div`);
    Object.assign(this._element.style, {
      width: `100%`,
      height: `100%`,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
      color: `#666666`,
      flexDirection: `column`
    });
    this._element.innerHTML = this.render();
    this.bind();
    return this._element;
  }

  render() {
    return `
        <div class="loader" style="color:#ff9749;font-size:196px;"> 
        </div>
        <div class="loader-text" style="margin-top:120px;color:#ff9749;width:300px;font-size:46px;"> 
      </div>`;
  }

  start() {
    this.cursor++;
    this.cursor = this.cursor >= this.symbolsTextSeq.length ? 0 : this.cursor;
    this.element.querySelector(`.loader-text`).textContent = `${this.symbolsTextSeq[this.cursor]}`;
    this.timeout = setTimeout(() => this.start(), 100);
  }

  stop() {
    clearTimeout(this.timeout);
  }
}
