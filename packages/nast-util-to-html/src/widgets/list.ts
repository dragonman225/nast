import { Nast } from '../../../types/src'

import blockMap from '../block-map'
import { renderChildren, renderBlock, renderTitle } from '../render-utils'

function renderList(
  node: Nast.Block,
  renderNext: Function
): string {
  if (node.type === blockMap.bulletedList)
    return renderBulletedList(node, renderNext)
  else (node.type === blockMap.numberedList)
    return renderNumberedList(node, renderNext)
}

function renderBulletedList(
  node: Nast.Block,
  renderNext: Function
): string {
  let listItemsHTML = node.children.map(listItem => {
    return renderListItem(listItem as Nast.BulletedListItem, renderNext)
  })
  let html = `\
<ul>
  ${listItemsHTML.join('')}
</ul>`
  return html
}

function renderNumberedList(
  node: Nast.Block,
  renderNext: Function
): string {
  let listItemsHTML = node.children.map(listItem => {
    return renderListItem(listItem as Nast.NumberedListItem, renderNext)
  })
  let html = `\
<ol>
  ${listItemsHTML.join('')}
</ol>`
  return html
}

function renderListItem(
  node: Nast.BulletedListItem | Nast.NumberedListItem,
  renderNext: Function
): string {
  let content = renderTitle(node.text, false, '')

  /**
   * Without ul, some content become out of container.
   * But ul has its own indent padding, so we don't need the indent class.
   */
  let html = `\
<li>
  <div id="${node.id}">
    ${renderBlock(node, content, )}
  </div>
  ${renderChildren(node.children, renderNext)}
</li>`

  return html
}

export default renderList