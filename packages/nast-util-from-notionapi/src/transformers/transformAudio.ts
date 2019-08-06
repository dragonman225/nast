import { Notion, Nast } from '../../../types/src'

import { getBlockColor } from './utils'

async function transformAudio(
  node: Notion.BlockValue
): Promise<Nast.Audio> {
  let nastNode = {
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