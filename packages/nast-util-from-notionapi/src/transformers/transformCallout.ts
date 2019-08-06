import { Notion, Nast } from '../../../types/src'

import { getBlockColor, getBlockTitle, getBlockIcon } from './utils'

async function transformCallout(
  node: Notion.BlockValue
): Promise<Nast.Callout> {
  let nastNode = {
    id: node.id,
    type: 'callout' as 'callout',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    icon: getBlockIcon(node),
    text: getBlockTitle(node)
  }
  return nastNode
}

export default transformCallout