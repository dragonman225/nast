import * as NAST from 'nast'

import { renderBlock } from '../render-utils'

function renderEmbed(
  node: NAST.Embed
): string {
  let width = node.fullWidth ? '100%' : `${node.width}px`
  let source = node.source
  let aspectRatio = node.aspectRatio * 100

  let iframeSandbox = 'allow-scripts allow-popups allow-forms allow-same-origin'
  let iframeStyle = 'position: absolute; left: 0px; top: 0px; width: 100%;\
 height: 100%; border: none; border-radius: 1px; pointer-events: auto;\
 background-color: rgb(247, 246, 245);'

  let content = `\
<div style="width: ${width};">
  <div style="position: relative; min-height: 100px; height: 0; padding-bottom: ${aspectRatio}%;">
    <iframe src="${source}" sandbox="${iframeSandbox}" allowfullscreen style="${iframeStyle}"></iframe>
  </div>
</div>`

  return renderBlock(node, content)
}

export default renderEmbed