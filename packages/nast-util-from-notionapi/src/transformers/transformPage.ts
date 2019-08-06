import { Notion, Nast } from '../../../types/src'

import { getBlockColor, getBlockTitle, getBlockIcon } from './utils'

async function transformPage(
  node: Notion.BlockValue
): Promise<Nast.Page> {
  let format = node.format || {}
  let nastNode = {
    id: node.id,
    type: 'page' as 'page',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    title: getBlockTitle(node)[0] ? getBlockTitle(node)[0][0] : '',
    icon: getBlockIcon(node),
    cover: format.page_cover || undefined,
    fullWidth: typeof format.page_full_width !== 'undefined'
      ? format.page_full_width : false,
    coverPosition: format.page_cover_position || 1
  }
  return nastNode
}

export default transformPage