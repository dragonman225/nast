/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformToggleList(
  node: Notion.Block
): Promise<Nast.ToggleList> {
  const nastNode = {
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