import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor, getBlockTitle } from './utils'

async function transformCode(
  node: Notion.BlockValue
): Promise<Nast.Code> {
  let props = node.properties || {}
  let format = node.format || {}
  let nastNode = {
    id: node.id,
    type: 'code' as 'code',
    color: getBlockColor(node),
    children: [],
    text: getBlockTitle(node),
    language: props.language ? props.language[0][0] : undefined,
    wrap: typeof format.code_wrap !== 'undefined'
      ? format.code_wrap : false
  }
  return nastNode
}

export default transformCode