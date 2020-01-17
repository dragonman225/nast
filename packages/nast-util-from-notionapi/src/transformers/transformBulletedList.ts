/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from "../nast"

async function transformBulletedList(
  node: NotionBlockBasic.BulletedList
): Promise<NAST.BulletedList> {
  return {
    children: [],
    id: node.id,
    type: "bulleted_list",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : []
  }
}

export default transformBulletedList