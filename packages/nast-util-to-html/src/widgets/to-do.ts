import * as NAST from 'nast'

import { CSS } from '../constants'
import { renderBlock, renderChildren, renderTitle } from '../render-utils'

function renderToDo(
  node: NAST.ToDo,
  renderNext: Function
) {
  let unCheckedIconHTML = '<div style="margin-right: 4px; width: 24px; flex-grow: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; min-height: calc(1.5em + 6px); padding-right: 2px;"><div style="width: 16px; height: 16px; display: flex; align-items: stretch; justify-content: stretch; flex-shrink: 0; flex-grow: 0; cursor: pointer; transition: background 200ms ease-out 0s;"><div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; display: flex; align-items: center; justify-content: center; width: 100%;"><svg viewBox="0 0 16 16" style="width: 100%; height: 100%; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden;"><path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path></svg></div></div></div>'
  let checkedIconHTML = '<div style="margin-right: 4px; width: 24px; flex-grow: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; min-height: calc(1.5em + 6px); padding-right: 2px;"><div style="width: 16px; height: 16px; display: flex; align-items: stretch; justify-content: stretch; flex-shrink: 0; flex-grow: 0; cursor: pointer; transition: background 200ms ease-out 0s; background: rgb(46, 170, 220);"><div style="cursor: pointer; user-select: none; transition: background 120ms ease-in 0s; display: flex; align-items: center; justify-content: center; width: 100%;"><svg viewBox="0 0 14 14" style="width: 12px; height: 12px; display: block; fill: white; flex-shrink: 0; backface-visibility: hidden;"><polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon></svg></div></div></div>'
  let checked = node.checked

  let content = `\
<div style="display: flex; align-items: flex-start;">
  ${checked ? checkedIconHTML : unCheckedIconHTML}
  <div style="flex: 1 1 0px; min-width: 1px; display: flex; flex-direction: column; justify-content: center; padding-top: 2px; padding-bottom: 2px; min-height: calc(1.5em + 6px); ${checked ? 'opacity: 0.375;' : ''}">
    ${checked ? '<s>' : ''}${renderTitle(node.title, false, '')}${checked ? '</s>' : ''}
  </div>
</div>`

  let childrenContent = ''
  if (node.children.length > 0) {
    childrenContent = `\
<div class="${CSS.blockIndentClass}">
  ${renderChildren(node.children, renderNext)}
</div>`
  }

  let html = `\
${renderBlock(node, content)}
${childrenContent}`

  return html
}

export default renderToDo