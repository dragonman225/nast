/** For types only */
import * as Notion from 'notionapi-agent'
import * as Nast from '../nast'

import { getBlockColor } from './utils'

async function transformEquation(
  node: Notion.Block
): Promise<Nast.Equation> {
  const nastNode = {
    id: node.id,
    type: 'equation' as 'equation',
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    children: [],
    latex: node.properties
      ? node.properties.title
        ? node.properties.title[0][0]
        : ''
      : ''
  }
  return nastNode
}

export default transformEquation