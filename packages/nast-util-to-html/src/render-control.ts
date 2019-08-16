import Nast from 'notajs-types/nast'

import { NAST_BLOCK_TYPES } from './constants'
import { renderChildren } from './render-utils'
import { raiseWarning } from './log-utils'

import renderAudio from './widgets/audio'
import renderBookmark from './widgets/bookmark'
import renderCallout from './widgets/callout'
import renderCode from './widgets/code'
import renderCollection from './widgets/collection'
import renderColumnList from './widgets/column-helper'
import renderDivider from './widgets/divider'
import renderEmbed from './widgets/embed'
import renderEquation from './widgets/equation'
import renderHeading from './widgets/heading'
import renderImage from './widgets/image'
import renderList from './widgets/list'
import renderQuote from './widgets/quote'
import renderText from './widgets/text'
import renderToDo from './widgets/to-do'
import renderToggle from './widgets/toggle'

/**
 * Render with given root node.
 */
function renderRoot(node: Nast.Block, elemClass = 'nast-document'): string {
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
  <img src="${cover}" data-src="${cover}" style="object-position: center ${coverPosition}%">
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
    case NAST_BLOCK_TYPES.text:
      html = renderText(node as Nast.Text, renderNode)
      break
    case NAST_BLOCK_TYPES.heading:
      html = renderHeading(node as Nast.Heading)
      break
    case NAST_BLOCK_TYPES.columnList:
      html = renderColumnList(node as Nast.ColumnList, renderNode)
      break
    case NAST_BLOCK_TYPES.bulletedList:
    case NAST_BLOCK_TYPES.numberedList:
      html = renderList(node, renderNode)
      break
    case NAST_BLOCK_TYPES.toggle:
      html = renderToggle(node as Nast.ToggleList, renderNode)
      break
    case NAST_BLOCK_TYPES.toDo:
      html = renderToDo(node as Nast.ToDoList, renderNode)
      break
    case NAST_BLOCK_TYPES.divider:
      html = renderDivider(node as Nast.Divider)
      break
    case NAST_BLOCK_TYPES.quote:
      html = renderQuote(node as Nast.Quote)
      break
    case NAST_BLOCK_TYPES.callout:
      html = renderCallout(node as Nast.Callout)
      break
    case NAST_BLOCK_TYPES.image:
      html = renderImage(node as Nast.Image)
      break
    case NAST_BLOCK_TYPES.bookmark:
      html = renderBookmark(node as Nast.WebBookmark)
      break
    case NAST_BLOCK_TYPES.embed:
    case NAST_BLOCK_TYPES.video:
      html = renderEmbed(node as Nast.Embed)
      break
    case NAST_BLOCK_TYPES.audio:
      html = renderAudio(node as Nast.Audio)
      break
    case NAST_BLOCK_TYPES.code:
      html = renderCode(node as Nast.Code)
      break
    case NAST_BLOCK_TYPES.equation:
      html = renderEquation(node as Nast.Equation)
      break
    case NAST_BLOCK_TYPES.collection:
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