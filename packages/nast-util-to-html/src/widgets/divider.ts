import { Nast } from '../../../types/src'

import { renderBlock } from '../render-utils'

function renderDivider(
  node: Nast.Divider
): string {
  let content = '\
<div style="width: 100%; border: 1px solid rgba(55, 53, 47, 0.09);"></div>'
  return renderBlock(node, content)
}

export default renderDivider