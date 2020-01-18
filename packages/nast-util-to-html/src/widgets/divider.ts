import { renderBlock } from "../util"

function renderDivider(
  node: NAST.Divider
): string {
  const content = `\
<div style="width: 100%; border: 1px solid rgba(55, 53, 47, 0.09);"></div>`
  return renderBlock(node, content)
}

export default renderDivider