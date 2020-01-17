import { renderBlock } from "../render-utils"

function renderBookmark(
  node: NAST.Bookmark
): string {
  let titleHTML = node.title ? `<h5 class="title">${node.title}</h5>` : ""
  let descHTML = node.description ? `<p class="description">${node.description}</p>` : ""
  let linkHTML = `<p class="link">${node.link}</p>`

  let content = `\
<a href="${node.link}">
  ${titleHTML}
  ${descHTML}
  ${linkHTML}
</a>`
  return renderBlock(node, content)
}

export default renderBookmark