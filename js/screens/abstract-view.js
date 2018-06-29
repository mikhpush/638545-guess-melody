import {renderScreen} from '../utils';

import {WelcomeScreen} from './welcome';


export class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
		if (this._element) {
			return this._element
		}
		this._element = document.createElement(`div`);
		Object.assign(this._element.style,{width: '100%', height:'100%'});
		this._element.innerHTML = this.render();
    this.bind();
		return this._element;
  }

  render() {
    return render(this.template);
  }

  bind() {
    
  }

};
