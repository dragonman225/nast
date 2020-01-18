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
import * as NotionBlockMedia from "notionapi-agent/dist/interfaces/notion-models/block/Media"

async function transformCode(
  node: NotionBlockMedia.Code
): Promise<NAST.Code> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "code",
    color: getBlockColor(node),
    title: node.properties ? node.properties.title || [] : [],
    language: node.properties
      ? node.properties.language
        ? node.properties.language[0][0] : undefined
      : undefined,
    wrap: (typeof node.format !== "undefined"
      && typeof node.format.code_wrap !== "undefined")
      ? node.format.code_wrap : false
  }
}

export default transformCode