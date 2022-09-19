import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.compotents = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.compotents = this.compotents.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)

      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.compotents.forEach(component => component.init())
  }
}
