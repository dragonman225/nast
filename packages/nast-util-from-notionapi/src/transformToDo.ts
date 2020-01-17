/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"

async function transformToDo(
  node: NotionBlockBasic.ToDo
): Promise<NAST.ToDo> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "to_do",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : [],
    checked: node.properties
      ? node.properties.checked
        ? node.properties.checked[0][0] === "Yes" : false
      : false
  }
}

export default transformToDo