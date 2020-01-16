/** Import scripts. */
import { getBlockColor } from './utils'

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from '../nast'

async function transformHeading(
  node: NotionBlockBasic.Header | NotionBlockBasic.SubHeader
    | NotionBlockBasic.SubSubHeader
): Promise<NAST.Heading> {
  let depth
  switch (node.type) {
    case "header":
      depth = 1
      break
    case "sub_header":
      depth = 2
      break
    default:
      depth = 3
  }

  return {
    children: [],
    id: node.id,
    type: 'heading',
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : [],
    depth
  }
}

export default transformHeading