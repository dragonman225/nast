/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor } from './utils'

async function transformAudio(
  node: Notion.Block
): Promise<Nast.Audio> {
  const nastNode = {
    id: node.id,
    type: 'audio' as 'audio',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    source: node.properties
      ? node.properties.source
        ? node.properties.source[0][0]
        : '#'
      : '#'
  }
  return nastNode
}

export default transformAudio