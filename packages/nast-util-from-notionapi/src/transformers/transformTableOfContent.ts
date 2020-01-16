/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockAdvanced from "notionapi-agent/dist/interfaces/notion-models/block/AdvancedBlock"
import * as NAST from "../nast"

async function transformTableOfContent(
  node: NotionBlockAdvanced.TableOfContent
): Promise<NAST.TableOfContent> {
  return {
    children: [],
    id: node.id,
    type: "table_of_content",
    color: getBlockColor(node)
  }
}

export default transformTableOfContent