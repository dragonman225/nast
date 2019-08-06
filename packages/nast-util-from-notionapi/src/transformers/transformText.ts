import { Notion, Nast } from '../../../types/src'

import { getBlockColor, getBlockTitle } from './utils'

async function transformText(
  node: Notion.BlockValue
): Promise<Nast.Text> {
  let nastNode = {
    id: node.id,
    type: 'text' as 'text',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformText