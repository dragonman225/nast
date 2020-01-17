/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockAdvanced from "notionapi-agent/dist/interfaces/notion-models/block/AdvancedBlock"

async function transformTableOfContent(
  node: NotionBlockAdvanced.TableOfContent
): Promise<NAST.TableOfContent> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "table_of_content",
    color: getBlockColor(node)
  }
}

export default transformTableOfContent