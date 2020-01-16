import * as NAST from 'nast'

import { renderBlock, renderTitle } from '../render-utils'

function renderQuote(
  node: NAST.Quote
): string {
  let content = `\
<blockquote>
  ${renderTitle(node.title, false, '')}
</blockquote>`
  return renderBlock(node, content)
}

export default renderQuote