import { HTML, renderBlock } from "../util"

function renderVideo(
  node: NAST.Video
): HTML {
  const content = `\
<video controls><source src="${node.source}"></video>`
  return renderBlock(node, content)
}

export default renderVideo