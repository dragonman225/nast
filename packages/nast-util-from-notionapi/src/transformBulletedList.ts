/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"

async function transformBulletedList(
  node: NotionBlockBasic.BulletedList
): Promise<NAST.BulletedList> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "bulleted_list",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : []
  }
}

export default transformBulletedList