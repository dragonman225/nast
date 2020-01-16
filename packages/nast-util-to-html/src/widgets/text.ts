import { CSS, NAST_BLOCK_TYPES } from '../constants'
import { renderChildren, renderColor, renderTitle } from '../render-utils'

function renderText(node: NAST.Text, renderNext: Function) {
  let blockColorClass = node.color ? renderColor(node.color) : ''

  let content = `\
<div class="${CSS.blockClass} ${CSS.blockClass}--${NAST_BLOCK_TYPES.text} ${blockColorClass}">
  ${renderTitle(node.title, false, '')}
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