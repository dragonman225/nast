import Nast from 'notajs-types/nast'

import { renderBlock } from '../render-utils'

function renderAudio(
  node: Nast.Audio
): string {
  let content = `\
<audio controls>
  <source src="${node.source}">
</audio>
  `
  return renderBlock(node, content)
}

export default renderAudio