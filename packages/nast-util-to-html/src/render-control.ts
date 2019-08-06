import { Nast } from '../../types/src'

import blockMap from './block-map'
import { renderChildren } from './render-utils'
import { raiseWarning } from './log-utils'

import {
  renderDivider,
  renderQuote,
  renderCallout,
  renderImage,
  renderBookmark,
  renderEmbed,
  renderAudio,
  renderCode
} from './render-blocks'

import renderText from './widgets/text'
import renderHeading from './widgets/heading'
import renderColumnList from './widgets/column-helper'
import renderList from './widgets/list'
import renderToggle from './widgets/toggle'
import renderToDo from './widgets/to-do'
import renderEquation from './widgets/equation'
import renderCollection from './widgets/collection'

/**
 * Render with given root node.
 */
function renderRoot(node: Nast.Root, elemClass = 'nast-document'): string {
  /**
   * The root node can be any type of block, if it's a "page" block it 
   * will be treated specially.
   */
  if (node.type === 'page') {
    /**
     * To solve the casting error:
     * If this was intentional, convert the expression to 'unknown' first.
     * The following is what that means.
     */
    let pageNode = node as unknown as Nast.Page
    let title = pageNode.title
    let icon = pageNode.icon ? pageNode.icon : ''
    let cover = pageNode.cover
    let fullWidth = pageNode.fullWidth
    let coverPosition = (1 - pageNode.coverPosition) * 100

    let containerClass = fullWidth
      ? `${elemClass}-full` : `${elemClass}`

    let coverDiv = ''
    if (pageNode.cover != null) {
      coverDiv = `\
<div class="page-cover">
  <img src="${cover}" style="object-position: center ${coverPosition}%">
</div>`
    }

    return `\
<div class="${containerClass}">
  ${coverDiv}
  <div id="${node.id}" class="page-title">
    <span class="page-icon">${icon}</span>
    <h1>${title}</h1>
  </div>
  ${renderChildren(node.children, renderNode)}
</div>`
  } else {
    return `\
<div class="${elemClass}">
  ${renderNode(node)}
</div>`
  }
}

function renderNode(node: Nast.Block): string {
  let html = ''

  switch (node.type) {
    case blockMap.text:
      html = renderText(node as Nast.Text, renderNode)
      break
    case blockMap.heading:
      html = renderHeading(node as Nast.Heading)
      break
    case blockMap.columnList:
      html = renderColumnList(node as Nast.ColumnList, renderNode)
      break
    case blockMap.bulletedList:
    case blockMap.numberedList:
      html = renderList(node, renderNode)
      break
    case blockMap.toggle:
      html = renderToggle(node as Nast.ToggleList, renderNode)
      break
    case blockMap.toDo:
      html = renderToDo(node as Nast.ToDoList, renderNode)
      break
    case blockMap.divider:
      html = renderDivider(node)
      break
    case blockMap.quote:
      html = renderQuote(node)
      break
    case blockMap.callout:
      html = renderCallout(node)
      break
    case blockMap.image:
      html = renderImage(node)
      break
    case blockMap.bookmark:
      html = renderBookmark(node)
      break
    case blockMap.embed:
    case blockMap.video:
      html = renderEmbed(node)
      break
    case blockMap.audio:
      html = renderAudio(node)
      break
    case blockMap.code:
      html = renderCode(node)
      break
    case blockMap.equation:
      html = renderEquation(node as Nast.Equation)
      break
    case blockMap.collection:
      html = renderCollection(node as Nast.Collection)
      break
    default:
      raiseWarning(`No render function for ${node.type}. Ignored.`)
  }

  return html
}

export {
  renderRoot,
  renderNode
}