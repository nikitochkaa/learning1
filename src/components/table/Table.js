import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';
import {revertLastAction} from '@/redux/actions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      subscribe: ['colState', 'rowState'],
      ...options
    })
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  storeChanged(changes) {
    if (Object.keys(changes)[0] === 'colState') {
      Object.keys(changes.colState).forEach(key => {
        this.$root
            .find(`[data-col="${key}"]`)
            .css({width: changes.colState[key] + 'px'})
        this.$root
            .findAll(`[data-col="${key}"]`)
            .forEach(el => el.style.width = changes.colState[key] + 'px')
      })
    } else {
      Object.keys(changes.rowState).forEach(key => {
        this.$root
            .find(`[data-row="${key}"]`)
            .css({height: changes.rowState[key] + 'px'})
      })
    }
    // const $parent = $resizer.closest('[data-type="resizable"]')
    // let value
    // if (type === 'col') {
    //         $parent.css({width: value + 'px'})
    //         $root.findAll(`[data-col="${$parent.data.col}"]`)
    //             .forEach(el => el.style.width = value + 'px')
    //       } else {
    //         $parent.css({height: value + 'px'})
    //       }
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"'))

    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.$emit('formula:input', this.selection.current.data.value)
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      this.$emit('formula:input', $(event.target).data.value)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
    if (event.code === 'KeyZ' && event.ctrlKey) {
      this.$dispatch(revertLastAction())
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    const text = $(event.target).text()
    this.selection.current.attr('data-value', text)
    this.updateTextInStore(text)
  }
}


