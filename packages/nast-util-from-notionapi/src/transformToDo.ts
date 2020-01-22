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

async function transformToDo(
  node: Notion.Block.ToDo
): Promise<NAST.ToDo> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "to_do",
    color: getBlockColor(node),
    title: node.properties ?
      await transformTitle(node.properties.title) || [] : [],
    checked: node.properties
      ? node.properties.checked
        ? node.properties.checked[0][0] === "Yes" : false
      : false
  }
}

export default transformToDo