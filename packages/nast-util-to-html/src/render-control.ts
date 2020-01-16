import { NAST_BLOCK_TYPES } from './constants'
import { renderChildren, renderIconToHTML } from './render-utils'
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
function renderRoot(node: NAST.Block, elemClass = 'nast-document'): string {
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
    let pageNode = node as unknown as NAST.Page
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
    <span class="page-icon">${renderIconToHTML(icon)}</span>
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

function renderNode(node: NAST.Block): string {
  let html = ''

  switch (node.type) {
    case NAST_BLOCK_TYPES.text:
      html = renderText(node as NAST.Text, renderNode)
      break
    case NAST_BLOCK_TYPES.heading:
      html = renderHeading(node as NAST.Heading)
      break
    case NAST_BLOCK_TYPES.columnList:
      html = renderColumnList(node as NAST.ColumnList, renderNode)
      break
    case NAST_BLOCK_TYPES.bulletedList:
    case NAST_BLOCK_TYPES.numberedList:
      html = renderList(node, renderNode)
      break
    case NAST_BLOCK_TYPES.toggle:
      html = renderToggle(node as NAST.Toggle, renderNode)
      break
    case NAST_BLOCK_TYPES.toDo:
      html = renderToDo(node as NAST.ToDo, renderNode)
      break
    case NAST_BLOCK_TYPES.divider:
      html = renderDivider(node as NAST.Divider)
      break
    case NAST_BLOCK_TYPES.quote:
      html = renderQuote(node as NAST.Quote)
      break
    case NAST_BLOCK_TYPES.callout:
      html = renderCallout(node as NAST.Callout)
      break
    case NAST_BLOCK_TYPES.image:
      html = renderImage(node as NAST.Image)
      break
    case NAST_BLOCK_TYPES.bookmark:
      html = renderBookmark(node as NAST.Bookmark)
      break
    case NAST_BLOCK_TYPES.embed:
    case NAST_BLOCK_TYPES.video:
      html = renderEmbed(node as NAST.Embed)
      break
    case NAST_BLOCK_TYPES.audio:
      html = renderAudio(node as NAST.Audio)
      break
    case NAST_BLOCK_TYPES.code:
      html = renderCode(node as NAST.Code)
      break
    case NAST_BLOCK_TYPES.equation:
      html = renderEquation(node as NAST.Equation)
      break
    case NAST_BLOCK_TYPES.collectionInline:
    case NAST_BLOCK_TYPES.collectionPage:
      html = renderCollection(node as NAST.CollectionInline)
      break
    default:
      raiseWarning(`No render function for block "${node.type}".`)
  }

  return html
}

export {
  renderRoot,
  renderNode
}