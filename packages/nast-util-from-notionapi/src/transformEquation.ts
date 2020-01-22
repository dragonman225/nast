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

async function transformEquation(
  node: Notion.Block.Equation
): Promise<NAST.Equation> {
  return {
    children: [],
    uri: getBlockUri(node),
    type: "equation",
    color: getBlockColor(node),
    latex: node.properties
      ? node.properties.title
        ? node.properties.title[0][0] : ""
      : ""
  }
}

export default transformEquation