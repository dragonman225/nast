import * as NAST from 'nast'

import { renderBlock } from '../render-utils'

function renderAudio(
  node: NAST.Audio
): string {
  let content = `\
<audio controls>
  <source src="${node.source}">
</audio>
  `
  return renderBlock(node, content)
}

export default renderAudio