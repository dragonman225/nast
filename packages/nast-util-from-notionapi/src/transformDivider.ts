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

async function transformDivider(
  node: NotionBlockBasic.Divider
): Promise<NAST.Divider> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "divider",
    color: getBlockColor(node)
  }
}

export default transformDivider