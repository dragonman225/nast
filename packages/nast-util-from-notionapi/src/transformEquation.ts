/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockAdvanced from "notionapi-agent/dist/interfaces/notion-models/block/AdvancedBlock"

async function transformEquation(
  node: NotionBlockAdvanced.Equation
): Promise<NAST.Equation> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "equation",
    color: getBlockColor(node),
    latex: node.properties
      ? node.properties.title
        ? node.properties.title[0][0] : ""
      : ""
  }
}

export default transformEquation