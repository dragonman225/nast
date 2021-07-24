/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
import { createAgent } from "notionapi-agent"
import { getBlockUri, getBlockColor, getBlockIcon, convertImageUrl } from "./util"

/** Import types. */
import * as Notion from "notionapi-agent/dist/interfaces"
import { transformTitle } from "./transformTitle"

async function transformPage(
  node: Notion.Block.Page
): Promise<NAST.Page> {
  const format = node.format || {}
  const newProperties: { [key: string]: NAST.SemanticString[] } = {}

  if (node.properties) {
    const keys = Object.keys(node.properties)
    for (let i = 0; i < keys.length; i++) {
      newProperties[keys[i]] = await transformTitle(node, node.properties[keys[i]])
    }
  }

  return {
    children: [],
    uri: getBlockUri(node),
    type: "page",
    color: getBlockColor(node),
    createdTime: node.created_time,
    lastEditedTime: node.last_edited_time,
    title: newProperties.title ? newProperties.title : [],
    icon: getBlockIcon(node),
    cover: format.page_cover
      ? convertImageUrl(node.id, format.page_cover) : undefined,
    fullWidth: typeof format.page_full_width !== "undefined"
      ? format.page_full_width : false,
    coverPosition: format.page_cover_position || 1,
    properties: newProperties
  }
}

async function transformPageOrAlias(
  node: Notion.Block.Page | Notion.Block.Alias
): Promise<NAST.Page> {
  if (node.type === "page") return transformPage(node)
  else {
    const agent = createAgent()
    const resp = await agent.getRecordValues({
      requests: [{ id: node.format.alias_pointer.id, table: "block" }]
    })
    /**
     * HACK:
     * We cannot change the node's id, or it's parent cannot find it to 
     * construct the tree. However, this hack breaks data integrity.
     */
    return transformPage({ ...resp.results[0].value, id: node.id } as Notion.Block.Page)
  }
}

export default transformPageOrAlias