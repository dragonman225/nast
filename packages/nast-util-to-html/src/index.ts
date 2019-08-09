import { Nast } from '../../types/src'

import { renderRoot, renderNode } from './render-control'
import { renderChildren, preRenderTransform } from './render-utils'

type RenderOptions = {
  contentOnly: boolean
}

/**
 * Generate static HTML from NAST.
 */
function renderToHTML(
  tree: Nast.Block,
  options: RenderOptions = {
    contentOnly: false
  }
): string {
  const contentOnly = typeof options.contentOnly !== 'undefined'
    ? options.contentOnly : false

  /** Transform the tree so that it can be rendered */
  let newTree = preRenderTransform(tree)

  if (contentOnly) {
    return renderChildren(newTree.children, renderNode)
  } else {
    return renderRoot(newTree)
  }
}

export {
  renderToHTML
}