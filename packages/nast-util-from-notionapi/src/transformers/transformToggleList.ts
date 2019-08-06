import { Notion, Nast } from '../../../types/src'

import { getBlockColor, getBlockTitle } from './utils'

async function transformToggleList(
  node: Notion.BlockValue
): Promise<Nast.ToggleList> {
  let nastNode = {
    id: node.id,
    type: 'toggle' as 'toggle',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformToggleList