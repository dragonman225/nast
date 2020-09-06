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

async function transformText(
  node: Notion.Block.Text
): Promise<NAST.Text> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "text",
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    title: node.properties ?
      await transformTitle(node, node.properties.title) || [] : [],
  }
}

export default transformText