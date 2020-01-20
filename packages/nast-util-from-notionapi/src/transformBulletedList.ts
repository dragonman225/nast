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
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import { transformTitle } from "./transformTitle"

async function transformBulletedList(
  node: NotionBlockBasic.BulletedList
): Promise<NAST.BulletedList> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "bulleted_list",
    color: getBlockColor(node),
    title: node.properties ? await transformTitle(node.properties.title) || [] : []
  }
}

export default transformBulletedList