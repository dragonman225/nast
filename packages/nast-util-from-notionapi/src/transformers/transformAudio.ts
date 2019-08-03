import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor } from './utils'

async function transformAudio(
  node: Notion.BlockValue
): Promise<Nast.Audio> {
  let nastNode = {
    id: node.id,
    type: 'audio' as 'audio',
    color: getBlockColor(node),
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