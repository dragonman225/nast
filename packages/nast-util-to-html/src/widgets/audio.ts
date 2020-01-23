import { HTML, renderBlock } from "../util"

function renderAudio(
  node: NAST.Audio
): HTML {
  const content = `\
<audio id="${node.uri}" controls><source src="${node.source}"></audio>`
  return renderBlock(node, content)
}

export default renderAudio