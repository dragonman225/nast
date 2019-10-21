import Nast from 'notajs-types/nast'

import { renderBlock } from '../render-utils'

function renderBookmark(
  node: Nast.WebBookmark
): string {
  let titleHTML = node.title ? `<h5>${node.title}</h5>` : ''
  let descHTML = node.description ? `<p>${node.description}</p>` : ''
  let linkHTML = `<p>${node.link}</p>`

  let content = `\
<a href="${node.link}">
  ${titleHTML}
  ${descHTML}
  ${linkHTML}
</a>`
  return renderBlock(node, content)
}

export default renderBookmark