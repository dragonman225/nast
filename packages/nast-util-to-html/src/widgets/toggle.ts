import { Nast } from '../../../types/src'

import { blockIndentClass } from './constants'
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
  <div class="${blockIndentClass}">
    ${renderChildren(node.children, renderNext)}
  </div>
</details>`
  return html
}

export = renderToggle