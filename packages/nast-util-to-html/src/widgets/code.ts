import { renderBlock, renderSemanticStringArray } from "../util"

function renderCode(
  node: NAST.Code
): string {
  const content = `\
<pre id="${node.uri}"><code>\
${renderSemanticStringArray(node.title, true, node.language)}\
</code></pre>`
  return renderBlock(node, content)
}

export default renderCode