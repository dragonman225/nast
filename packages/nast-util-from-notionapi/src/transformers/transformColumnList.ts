/** Import scripts. */
import { getBlockColor } from './utils'

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from '../nast'

async function transformColumnList(
  node: NotionBlockBasic.ColumnList
): Promise<NAST.ColumnList> {
  return {
    children: [],
    id: node.id,
    type: 'column_list',
    color: getBlockColor(node)
  }
}

export default transformColumnList