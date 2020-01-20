import * as NAST from "nast-types"

import { RenderContext } from "./interface"
import { renderNode, renderNodes } from "./render-control"
import {
  renderSemanticStringArray
} from "./util"

type RenderOptions = {
  /** Whether to render the root node. */
  renderRoot?: boolean
  cssClass?: {
    prefixBlock: string
    prefixColor: string
    modifierIndent: string
  }
}

/**
 * Render NAST to HTML.
 */
function renderToHTML(
  data: NAST.Block | NAST.SemanticString[],
  options: RenderOptions = {
    renderRoot: false
  }
): string {

  const renderContext: RenderContext = {
    depthFromRoot: 0,
    numberedListCount: 0,
    cssClass: options.cssClass || {
      prefixBlock: "block",
      prefixColor: "color",
      modifierIndent: "indent"
    }
  }

  if (Array.isArray(data)) {
    /** NAST.SemanticString[] */
    return renderSemanticStringArray(data)
  } else {
    /** NAST.Block */
    if (options.renderRoot) {
      if (data.type === "page")
        return "<h1>"
          + `${renderSemanticStringArray((data as NAST.Page).title)}`
          + "</h1>"
          + renderNodes(data.children, renderContext)
      else
        return renderNode(data, renderContext)
    } else {
      return renderNodes(data.children, renderContext)
    }
  }

}

export {
  renderToHTML
}