/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor, getBlockTitle, getBlockIcon, convertImageUrl } from './utils'

async function transformPage(
  node: Notion.Block
): Promise<Nast.Page> {
  const format = node.format || {}
  const nastNode = {
    id: node.id,
    type: 'page' as 'page',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    title: getBlockTitle(node)[0] ? getBlockTitle(node)[0][0] : '',
    icon: getBlockIcon(node),
    cover: format.page_cover ? convertImageUrl(format.page_cover) : undefined,
    fullWidth: typeof format.page_full_width !== 'undefined'
      ? format.page_full_width : false,
    coverPosition: format.page_cover_position || 1,
    properties: node.properties
  }
  return nastNode
}

export default transformPage