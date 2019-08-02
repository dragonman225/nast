import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformToDo(
  node: Notion.BlockValue
): Promise<Nast.ToDoList> {
  let nastNode = {
    id: node.id,
    type: 'to_do' as 'to_do',
    color: getBlockColor(node),
    children: [],
    text: getBlockTitle(node),
    checked: node.properties
      ? node.properties.checked
        ? node.properties.checked[0][0] === 'Yes'
        : false
      : false
  }
  return nastNode
}

export default transformToDo