import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor } from './utils'

async function transformEmbed(
  node: Notion.BlockValue
): Promise<Nast.Embed> {
  let format = node.format || {}
  let nastNode = {
    id: node.id,
    type: node.type === 'video'
      ? 'video' as 'video' : 'embed' as 'embed',
    color: getBlockColor(node),
    children: [],
    width: format.block_width || 9999,
    source: format.display_source || '#',
    fullWidth: typeof format.block_full_width !== 'undefined'
      ? format.block_full_width : false,
    pageWidth: typeof format.block_page_width !== 'undefined'
      ? format.block_page_width : false,
    aspectRatio: format.block_aspect_ratio || 0.562, // 16:9
    preserveScale: typeof format.block_preserve_scale !== 'undefined'
      ? format.block_preserve_scale : true
  }
  return nastNode
}

export default transformEmbed