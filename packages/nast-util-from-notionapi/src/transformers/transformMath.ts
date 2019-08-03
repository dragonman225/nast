import * as Notion from '../types/api'
import * as Nast from '../types/nast'

import { getBlockColor } from './utils'

async function transformMath(
  node: Notion.BlockValue
): Promise<Nast.MathEquation> {
  let nastNode = {
    id: node.id,
    type: 'equation' as 'equation',
    color: getBlockColor(node),
    children: [],
    latex: node.properties
      ? node.properties.title
        ? node.properties.title[0][0]
        : ''
      : ''
  }
  return nastNode
}

export default transformMath