/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor } from './utils'

async function transformImage(
  node: Notion.Block
): Promise<Nast.Image> {
  let format = node.format || {}
  const nastNode = {
    id: node.id,
    type: 'image' as 'image',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
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