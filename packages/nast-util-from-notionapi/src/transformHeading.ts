/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
import { getBlockUri, getBlockColor } from "./util"

/** Import types. */
import * as Notion from "notionapi-agent/dist/interfaces"
import { transformTitle } from "./transformTitle"

async function transformHeading(
  node: Notion.Block.Header | Notion.Block.SubHeader |
    Notion.Block.SubSubHeader
): Promise<NAST.Heading> {
  let depth
  switch (node.type) {
    case "header":
      depth = 1
      break
    case "sub_header":
      depth = 2
      break
    default:
      depth = 3
  }

  return {
    children: [],
    uri: getBlockUri(node),
    type: "heading",
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    title: node.properties ? await transformTitle(node, node.properties.title) || [] : [],
    depth
  }
}

export default transformHeading