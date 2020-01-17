/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as NotionBlockAdvanced from "notionapi-agent/dist/interfaces/notion-models/block/AdvancedBlock"

async function transformBreadcrumb(
  node: NotionBlockAdvanced.Breadcrumb
): Promise<NAST.BreadCrumb> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "breadcrumb",
    color: getBlockColor(node)
  }
}

export default transformBreadcrumb