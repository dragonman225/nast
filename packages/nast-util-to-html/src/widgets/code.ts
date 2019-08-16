import Nast from 'notajs-types/nast'

import { renderBlock, renderTitle } from '../render-utils'

function renderCode(
  node: Nast.Code
): string {
  let content = `\
<pre>
  <code>
${renderTitle(node.text, true, node.language)}
  </code>
</pre>`
  return renderBlock(node, content)
}

export default renderCode