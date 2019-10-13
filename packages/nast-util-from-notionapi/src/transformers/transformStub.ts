/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor } from './utils'

async function transformStub(
  node: Notion.Block
): Promise<Nast.Stub> {
  const nastNode = {
    id: node.id,
    type: node.type,
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    raw: node
  }
  return nastNode
}

export default transformStub