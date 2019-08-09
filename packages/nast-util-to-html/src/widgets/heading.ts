import { Nast } from '../../../types/src'

import { renderColor, renderTitle } from '../render-utils'
import { CSS } from '../constants'

function renderHeading(node: Nast.Heading): string {
  let blockColorClass = node.color ? renderColor(node.color) : ''
  let textHTML = renderTitle(node.text, false, '')
  let content = ''

  if (node.depth < 6 && node.depth > 0) {
    content = `<h${node.depth + 1}>${textHTML}</h${node.depth + 1}>`
  } else {
    content = `<h6>${textHTML}</h6>`
  }

  let html = `\
<div class="${CSS.blockClass} ${blockColorClass}">
  ${content}
</div>`

  return html
}

export default renderHeading