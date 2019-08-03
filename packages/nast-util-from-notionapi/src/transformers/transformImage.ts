import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor } from './utils'

async function transformImage(
  node: Notion.BlockValue
): Promise<Nast.Image> {
  let format = node.format || {}
  let nastNode = {
    id: node.id,
    type: 'image' as 'image',
    color: getBlockColor(node),
    children: [],
    width: format.block_width || 9999,
    source: format.display_source || '#',
    fullWidth: typeof format.block_full_width !== 'undefined'
        ? format.block_full_width : false,
    pageWidth: typeof format.block_page_width !== 'undefined'
        ? format.block_page_width : false
  }
  return nastNode
}

export default transformImage