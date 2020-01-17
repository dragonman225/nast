/** Import scripts. */
import { getBlockColor } from "./utils"

/** Import types. */
import * as NotionBlockAdvanced from "notionapi-agent/dist/interfaces/notion-models/block/AdvancedBlock"
import * as NAST from "../nast"

async function transformBreadcrumb(
  node: NotionBlockAdvanced.Breadcrumb
): Promise<NAST.BreadCrumb> {
  return {
    children: [],
    id: node.id,
    type: "breadcrumb",
    color: getBlockColor(node)
  }
}

export default transformBreadcrumb