import { Nast } from '../../../types/src'

import colorMap from '../color-map'
import { renderBlock, renderTitle } from '../render-utils'

function renderCallout(
  node: Nast.Callout
): string {
  let content = `\
<div>
  ${node.icon ? node.icon : ''}
</div>
<div style="margin-left: 8px;">
  ${renderTitle(node.text, false, '')}
</div>`

  return renderBlock(node, content, colorMap.yellowBg)
}

export default renderCallout