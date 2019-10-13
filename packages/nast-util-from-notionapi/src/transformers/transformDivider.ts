/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor } from './utils'

async function transformDivider(
  node: Notion.Block
): Promise<Nast.Divider> {
  const nastNode = {
    id: node.id,
    type: 'divider' as 'divider',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: []
  }
  return nastNode
}

export default transformDivider