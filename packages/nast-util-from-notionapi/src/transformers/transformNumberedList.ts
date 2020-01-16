/** Import scripts. */
import { getBlockColor } from './utils'

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from '../nast'

async function transformNumberedList(
  node: NotionBlockBasic.NumberedList
): Promise<NAST.NumberedList> {
  return {
    children: [],
    id: node.id,
    type: 'numbered_list',
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : []
  }
}

export default transformNumberedList