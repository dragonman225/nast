import * as NAST from "nast" // Must be imported once.

import { renderRoot, renderNode } from "./render-control"
import { renderTitle, renderChildren, preRenderTransform } from "./render-utils"

type RenderOptions = {
  /** Ignore the root node */
  contentOnly: boolean
  /** Skip bulleted list and numbered list analysis */
  bypassPreRenderTransform: boolean
}

/**
 * Generate static HTML from NAST or StyledString[].
 */
function renderToHTML(
  data: NAST.Block | NAST.SemanticString[],
  options: RenderOptions = {
    contentOnly: false,
    bypassPreRenderTransform: false
  }
): string {
  /** Check which type of input is it */
  if (Array.isArray(data)) {
    /** View it as StyledString[] if it's an array */
    return renderTitle(data)
  } else {
    /** Otherwise, a tree */
    const tree = data
    const contentOnly = typeof options.contentOnly !== "undefined"
      ? options.contentOnly : false

    /** Transform the tree if necessary so that it can be rendered */
    let newTree =
      options.bypassPreRenderTransform ? tree : preRenderTransform(tree)

    /** If contentOnly flag is set, do not render the root node */
    if (contentOnly) {
      return renderChildren(newTree.children, renderNode)
    } else {
      return renderRoot(newTree)
    }
  } // else
} // function

export {
  renderToHTML
}