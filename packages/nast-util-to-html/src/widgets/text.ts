import { Nast } from '../../../types/src'

import { renderChildren, renderColor, renderTitle } from '../render-utils'
import { CSS } from '../constants'
import blockMap from '../block-map'

function renderText(node: Nast.Text, renderNext: Function) {
  let blockColorClass = node.color ? renderColor(node.color) : ''

  let content = `\
<div class="${CSS.blockClass} ${CSS.blockClass}--${blockMap.text} ${blockColorClass}">
  ${renderTitle(node.text, false, '')}
</div>`

  let childrenContent = ''
  if (node.children.length > 0) {
    childrenContent = `\
<div class="${CSS.blockIndentClass}">
  ${renderChildren(node.children, renderNext)}
</div>`
  }

  return content + childrenContent
}

export default renderText