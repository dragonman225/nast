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

async function transformToggle(
  node: Notion.Block.Toggle
): Promise<NAST.Toggle> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "toggle",
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    title: node.properties ?
      await transformTitle(node, node.properties.title) || [] : []
  }
}

export default transformToggle