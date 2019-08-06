import { Notion, Nast } from '../../../types/src'

import { getBlockColor } from './utils'

async function transformDivider(
  node: Notion.BlockValue
): Promise<Nast.Divider> {
  let nastNode = {
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