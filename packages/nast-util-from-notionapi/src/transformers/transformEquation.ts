/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockAdvanced from "notionapi-agent/dist/interfaces/notion-models/block/AdvancedBlock"
import * as NAST from "../nast"

async function transformEquation(
  node: NotionBlockAdvanced.Equation
): Promise<NAST.Equation> {
  return {
    children: [],
    id: node.id,
    type: "equation",
    color: getBlockColor(node),
    latex: node.properties
      ? node.properties.title
        ? node.properties.title[0][0] : ""
      : ""
  }
}

export default transformEquation