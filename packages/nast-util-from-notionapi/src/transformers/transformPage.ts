import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle, getBlockIcon } from './utils'

async function transformPage(
  node: Notion.BlockValue
): Promise<Nast.Page> {
  let nastNode = {
    id: node.id,
    type: 'page' as 'page',
    color: getBlockColor(node),
    children: [],
    title: getBlockTitle(node)[0][0], 
    icon: getBlockIcon(node),
    cover: node.format
      ? node.format.page_cover
      : undefined,
    fullWidth: node.format
      ? node.format.page_full_width
      : false,
    coverPosition: node.format
      ? node.format.page_cover_position
      : 1
  }
  return nastNode
}

export default transformPage