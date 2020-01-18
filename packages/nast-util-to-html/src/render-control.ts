import { NAST_BLOCK_TYPES } from "./constants"
import { HTML, RenderContext } from "./interface"

import renderAudio from "./widgets/audio"
import renderBookmark from "./widgets/bookmark"
import renderCallout from "./widgets/callout"
import renderCode from "./widgets/code"
import renderCollection from "./widgets/collection"
import renderColumnList from "./widgets/column"
import renderDivider from "./widgets/divider"
import renderEmbed from "./widgets/embed"
import renderEquation from "./widgets/equation"
import renderFile from "./widgets/file"
import renderHeading from "./widgets/heading"
import renderImage from "./widgets/image"
import renderList from "./widgets/list"
import renderPage from "./widgets/page"
import renderPDF from "./widgets/pdf"
import renderQuote from "./widgets/quote"
import renderText from "./widgets/text"
import renderToDo from "./widgets/to-do"
import renderToggle from "./widgets/toggle"
import renderVideo from "./widgets/video"

function renderNode(node: NAST.Block, ctx: RenderContext): HTML {
  let html = ""

  switch (node.type) {
    case NAST_BLOCK_TYPES.text:
      html = renderText(node as NAST.Text, ctx, renderNodes)
      break
    case NAST_BLOCK_TYPES.heading:
      html = renderHeading(node as NAST.Heading)
      break
    case NAST_BLOCK_TYPES.columnList:
      html = renderColumnList(node as NAST.ColumnList, ctx, renderNodes)
      break
    case NAST_BLOCK_TYPES.bulletedList:
      html = renderList(node as NAST.BulletedList, ctx, renderNodes)
      break
    case NAST_BLOCK_TYPES.file:
      html = renderFile(node as NAST.File)
      break
    case NAST_BLOCK_TYPES.numberedList:
      html = renderList(node as NAST.NumberedList, ctx, renderNodes)
      break
    case NAST_BLOCK_TYPES.toggle:
      html = renderToggle(node as NAST.Toggle, ctx, renderNodes)
      break
    case NAST_BLOCK_TYPES.toDo:
      html = renderToDo(node as NAST.ToDo, ctx, renderNodes)
      break
    case NAST_BLOCK_TYPES.divider:
      html = renderDivider(node as NAST.Divider)
      break
    case NAST_BLOCK_TYPES.quote:
      html = renderQuote(node as NAST.Quote, ctx, renderNodes)
      break
    case NAST_BLOCK_TYPES.callout:
      html = renderCallout(node as NAST.Callout, ctx, renderNodes)
      break
    case NAST_BLOCK_TYPES.image:
      html = renderImage(node as NAST.Image)
      break
    case NAST_BLOCK_TYPES.bookmark:
      html = renderBookmark(node as NAST.Bookmark)
      break
    case NAST_BLOCK_TYPES.embed:
      html = renderEmbed(node as NAST.Embed)
      break
    case NAST_BLOCK_TYPES.video:
      html = renderVideo(node as NAST.Video)
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
    case NAST_BLOCK_TYPES.page:
      html = renderPage(node as NAST.Page)
      break
    case NAST_BLOCK_TYPES.pdf:
      html = renderPDF(node as NAST.PDF)
      break
    default:
      console.log(`No render function for block "${node.type}".`)
  }

  return html
}

function renderNodes(nodes: NAST.Block[], ctx: RenderContext): HTML {
  let html = ""
  let listState = "none"
  let listCount = 0
  for (let i = 0; i < nodes.length; i++) {

    const node = nodes[i]

    switch (listState) {
      case "none": {
        if (node.type === NAST_BLOCK_TYPES.bulletedList) {
          listState = "in_bullet"
          listCount = 1
          html += "<ul>"
        } else if (node.type === NAST_BLOCK_TYPES.numberedList) {
          listState = "in_number"
          listCount = 1
          html += "<ol>"
        } else {
          listState = "none"
          listCount = 0
        }
        break
      }
      case "in_bullet": {
        if (node.type === NAST_BLOCK_TYPES.bulletedList) {
          listState = "in_bullet"
          listCount++
        } else if (node.type === NAST_BLOCK_TYPES.numberedList) {
          listState = "in_number"
          listCount = 1
          html += "</ul><ol>"
        } else {
          listState = "none"
          listCount = 0
          html += "</ul>"
        }
        break
      }
      case "in_number": {
        if (node.type === NAST_BLOCK_TYPES.bulletedList) {
          listState = "in_bullet"
          listCount = 1
          html += "</ol><ul>"
        } else if (node.type === NAST_BLOCK_TYPES.numberedList) {
          listState = "in_number"
          listCount++
        } else {
          listState = "none"
          listCount = 0
          html += "</ol>"
        }
        break
      }
      default: {
        listState = "none"
        listCount = 0
      }
    }

    html += renderNode(node, {
      cssClass: ctx.cssClass,
      depthFromRoot: ctx.depthFromRoot,
      numberedListCount: listCount
    })

    /** If there is an active list, terminate it after the last child. */
    if (i === nodes.length - 1) {
      if (listState === "in_bullet") html += "</ul>"
      else if (listState === "in_number") html += "</ol>"
    }

  }

  return html
}

export {
  renderNode,
  renderNodes
}