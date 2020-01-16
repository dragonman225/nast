import { renderBlock, renderTitle } from '../render-utils'

function renderCallout(
  node: NAST.Callout
): string {
  let iconHTML = /^http/.test(node.icon || '')
    ? `<img src="${node.icon}" style="height: 1.5em;">` : node.icon

  let content = `\
<div style="padding-top: 2.5px;">
  ${iconHTML}
</div>
<div style="margin-left: 8px;">
  ${renderTitle(node.title, false, '')}
</div>`

  return renderBlock(node, content)
}

export default renderCallout