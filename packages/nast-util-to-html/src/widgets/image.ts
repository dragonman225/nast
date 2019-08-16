import Nast from 'notajs-types/nast'

import { renderBlock } from '../render-utils'

function renderImage(
  node: Nast.Image
): string {
  let width = node.fullWidth ? '100%' : `${node.width}px`
  let source = node.source

  /** 
   * Some images are hosted by Notion.so so the urls doesn't start with 
   * http / https, we need to convert them.
   */
  let re = /^http/
  if (!re.test(source)) {
    source = `https://www.notion.so${source}`
  }

  let content = `\
<div style="width: ${width}; margin: 0.5em auto; max-width: 100%;">
  <img src="${source}" data-src="${source}" style="width: 100%; object-fit: cover;">
</div>`

  return renderBlock(node, content)
}

export default renderImage