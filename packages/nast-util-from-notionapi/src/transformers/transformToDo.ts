/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NAST from "../nast"

async function transformToDo(
  node: NotionBlockBasic.ToDo
): Promise<NAST.ToDo> {
  return {
    children: [],
    id: node.id,
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