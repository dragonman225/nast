/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor, getBlockTitle, getBlockIcon } from './utils'

async function transformCallout(
  node: Notion.Block
): Promise<Nast.Callout> {
  const nastNode = {
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