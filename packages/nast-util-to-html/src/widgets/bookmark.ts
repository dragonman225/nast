import { renderBlock } from "../util"

function renderBookmark(
  node: NAST.Bookmark
): string {
  const titleHTML = node.title ? `<h5 class="title">${node.title}</h5>` : ""
  const descHTML = node.description ? `<p class="description">${node.description}</p>` : ""
  const linkHTML = `<p class="link">${node.link}</p>`

  const content = `\
<a href="${node.link}">\
${titleHTML}\
${descHTML}\
${linkHTML}\
</a>`
  return renderBlock(node, content)
}

export default renderBookmark