import { HTML } from "../interface"

function renderPDF(node: NAST.PDF): HTML {
  return `<div style="text-align: center;"><embed width="${node.fullWidth ? "100%" : node.width}" height="${node.height}"\
 src="${node.source}" type="application/pdf"></div>`
}

export default renderPDF