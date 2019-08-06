import { Notion, Nast } from '../../../types/src'

import { getBlockColor } from './utils'

async function transformStub(
  node: Notion.BlockValue
): Promise<Nast.Block> {
  let nastNode = {
    id: node.id,
    type: node.type,
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: []
  }
  return nastNode
}

export default transformStub