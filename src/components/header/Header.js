import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle, revertLastAction} from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click', 'keydown'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${title}"/>
  
      <div>
  
        <div class="button" data-button="remove">
          <span 
          class="material-symbols-outlined" 
          data-button="remove"
          >delete</span>
        </div>
  
        <div class="button" data-button="exit">
          <span 
          class="material-symbols-outlined" 
          data-button="exit"
          >logout</span>
        </div>
  
      </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Are you sure about deleting this table?')

      if (decision) {
        localStorage.removeItem('excel:'+ ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onKeydown(event) {
    if (event.key === 'z' && event.ctrlKey) {
      this.$dispatch(revertLastAction())
    }
  }
}
