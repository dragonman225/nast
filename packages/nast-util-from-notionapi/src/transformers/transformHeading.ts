/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor, getBlockTitle } from './utils'
import blockMap from '../block-map'

async function transformHeading(
  node: Notion.Block
): Promise<Nast.Heading> {
  let depth
  switch (node.type) {
    case blockMap.header:
      depth = 1
      break
    case blockMap.subHeader:
      depth = 2
      break
    default:
      depth = 3
  }

  const nastNode = {
    id: node.id,
    type: 'heading' as 'heading',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    text: getBlockTitle(node),
    depth
  }
  return nastNode
}

export default transformHeading