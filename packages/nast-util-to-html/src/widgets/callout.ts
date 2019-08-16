import Nast from 'notajs-types/nast'

import { COLOR } from '../constants'
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

  return renderBlock(node, content, COLOR.yellowBg)
}

export default renderCallout