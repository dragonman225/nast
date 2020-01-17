import { Notion, Nast } from '../../../types/src'

import { getBlockColor } from './utils'

async function transformBookmark(
  node: Notion.BlockValue
): Promise<Nast.WebBookmark> {
  let props = node.properties || {}
  let format = node.format || {}
  let nastNode = {
    id: node.id,
    type: 'bookmark' as 'bookmark',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    link: props.link ? props.link[0][0] : '#',
    title: props.title ? props.title[0][0] : undefined,
    description: props.description ? props.description[0][0] : undefined,
    icon: format.bookmark_icon,
    cover: format.bookmark_cover,
  }
  return nastNode
}

export default transformBookmark