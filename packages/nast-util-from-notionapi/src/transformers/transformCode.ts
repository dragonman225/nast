/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformCode(
  node: Notion.Block
): Promise<Nast.Code> {
  const props = node.properties || {}
  const format = node.format || {}
  const nastNode = {
    id: node.id,
    type: 'code' as 'code',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    text: getBlockTitle(node),
    language: props.language ? props.language[0][0] : undefined,
    wrap: typeof format.code_wrap !== 'undefined'
      ? format.code_wrap : false
  }
  return nastNode
}

export default transformCode