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

async function transformColumn(
  node: NotionBlockBasic.Column
): Promise<NAST.Column> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "column",
    color: getBlockColor(node),
    ratio: node.format
      ? node.format.column_ratio || 1 : 1
  }
}

export default transformColumn