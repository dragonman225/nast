import * as NAST from 'nast'

import { renderBlock, renderTitle } from '../render-utils'

function renderCode(
  node: NAST.Code
): string {
  let content = `\
<pre>
  <code>
${renderTitle(node.title, true, node.language)}
  </code>
</pre>`
  return renderBlock(node, content)
}

export default renderCode