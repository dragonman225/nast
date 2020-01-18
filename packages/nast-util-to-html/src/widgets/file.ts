import { HTML } from "../interface"

const fileIcon = `<svg viewBox="0 0 30 30" class="file" style="width: 100%; height: 100%; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden;"><path d="M22,8v12c0,3.866-3.134,7-7,7s-7-3.134-7-7V8c0-2.762,2.238-5,5-5s5,2.238,5,5v12c0,1.657-1.343,3-3,3s-3-1.343-3-3V8h-2v12c0,2.762,2.238,5,5,5s5-2.238,5-5V8c0-3.866-3.134-7-7-7S6,4.134,6,8v12c0,4.971,4.029,9,9,9s9-4.029,9-9V8H22z"></path></svg>`

function renderFile(
  node: NAST.File
): HTML {
  let html = `<div class="block block--file" style="min-height: 36px; padding: 3px;">\
<div style="width: 1.35em; height: 1.35em; display: inline-block; vertical-align: sub;">${fileIcon}</div>`
  html += `<a href="${node.source}"><span style="margin: 5px;">${node.title}</span>`
  if (node.size) html += `<span style="margin: 5px; opacity: 0.8; font-size: 0.8em;">${node.size}</span>`
  html += "</a></div>"
  return html
}

export default renderFile