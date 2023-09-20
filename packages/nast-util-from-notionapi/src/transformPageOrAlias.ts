/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

/** Import scripts. */
import { getBlockUri, getBlockColor, getBlockIcon, convertImageUrl } from "./util"

/** Import types. */
import { createAgent } from "notionapi-agent"
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
      ? convertImageUrl(format.page_cover, "block", node.id) : undefined,
    fullWidth: typeof format.page_full_width !== "undefined"
      ? format.page_full_width : false,
    coverPosition: format.page_cover_position || 1,
    properties: newProperties
  }
}

async function transformPageOrAlias(
  node: Notion.Block.Page | Notion.Block.Alias,
  apiAgent: ReturnType<typeof createAgent>,
  parent?: Notion.Block
): Promise<NAST.Page> {
  if (node.type === "page") return transformPage(node)
  else {
    const resp = await apiAgent.getRecordValues({
      requests: [{ id: node.format.alias_pointer.id, table: "block" }]
    })
    const page = resp.results[0].value as Notion.Block.Page
    /**
     * HACK: Dereference the alias to the linked page.
     */
    if (parent && parent.content) {
      parent.content = parent.content.map(
        blockId => blockId === node.id ? page.id : blockId
      )
    }
    return transformPage(page)
  }
}

export default transformPageOrAlias