import Nast from 'notajs-types/nast'

import { CSS } from '../constants'
import { renderBlock, renderChildren, renderTitle } from '../render-utils'

function renderToggle(
  node: Nast.ToggleList,
  renderNext: Function
) {
  let content = renderTitle(node.text, false, '')
  let block = renderBlock(node, content, 'summary')
  let html = `\
<details>
  ${block}
  <div class="${CSS.blockIndentClass}">
    ${renderChildren(node.children, renderNext)}
  </div>
</details>`
  return html
}

export default renderToggle