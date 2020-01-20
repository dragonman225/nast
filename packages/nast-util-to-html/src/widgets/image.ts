import { renderBlock, renderSemanticStringArray } from "../util"

function renderImage(
  node: NAST.Image
): string {
  const width = node.fullWidth ? "100%" : node.width + "px"
  const height = node.height + "px"

  const content = `\
<div style="width: 100%; max-width: ${width}; margin: 0.5em auto; overflow: hidden;">\
<figure style="margin: 0;">\
<img src="${node.source}" data-src="${node.source}" style="width: 100%; ${node.fullWidth ? "height: " + height + ";" : ""} object-fit: cover;">\
${node.caption ? `<figcaption>${renderSemanticStringArray(node.caption)}</figcaption>` : ""}\
</figure>\
</div>`

  return renderBlock(node, content)
}

export default renderImage