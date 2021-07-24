/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

import transformPage from "./transformPageOrAlias"
import { getBlockUri, getBlockColor, convertImageUrl } from "./util"

import { createAgent } from "notionapi-agent"
import * as Notion from "notionapi-agent/dist/interfaces"
import { transformTitle } from "./transformTitle"

async function transformCollection(
  node: Notion.Block.CollectionViewInline | Notion.Block.CollectionViewPage,
  apiAgent: ReturnType<typeof createAgent>
): Promise<NAST.CollectionInline | NAST.CollectionPage> {

  const blockId = node.id
  const viewIds = node.view_ids
  const collectionId = node.collection_id

  if (!viewIds) {
    throw new Error(`Collection block ${blockId} has no view.`)
  }

  if (!collectionId) {
    throw new Error(`Collection block ${blockId} has no collection id`)
  }

  /** First, query the collection. */
  const queryResult = await apiAgent.queryCollection({
    collectionId,
    collectionViewId: viewIds[0],
    loader: {
      limit: 1000000,
      loadContentCover: false,
      type: "table",
      userLocale: "en",
      userTimeZone: "Asia/Taipei"
    },
    query: {
      aggregate: [],
      aggregations: [],
      filter: {
        filters: [],
        operator: "and"
      },
      sort: []
    }
  })

  /** Must be the first of the collection recordMap. */
  const collection =
    Object.values(queryResult.recordMap.collection)[0].value

  if (!collection) {
    throw new Error(`Fail to get collection ${collectionId}, role is none`)
  }

  /** Get collection views and collection items. */
  const viewsPromise = getCollectionViews(viewIds, apiAgent)
  const pagesPromise = getPageBlocks(queryResult.result.blockIds, apiAgent)

  const [views, pages] =
    await Promise.all([viewsPromise, pagesPromise])

  if (node.type === "collection_view") {
    return {
      children: await Promise.all(pages.map(page => transformPage(page))),
      uri: getBlockUri(node),
      type: "collection_inline",
      color: getBlockColor(node),
      createdTime: node.created_time,
      lastEditedTime: node.last_edited_time,
      name: collection.name || [["Untitled"]],
      collectionId,
      defaultViewId: viewIds[0],
      views,
      schema: collection.schema
    }
  } else {
    return {
      children: await Promise.all(pages.map(page => transformPage(page))),
      uri: getBlockUri(node),
      type: "collection_page",
      color: getBlockColor(node),
      createdTime: node.created_time,
      lastEditedTime: node.last_edited_time,
      name: collection.name || [["Untitled"]],
      collectionId,
      defaultViewId: viewIds[0],
      views,
      schema: collection.schema,
      /**
       * Nasty! For collections, we should use 
       * "table=collection&id=<collection_id>", 
       * regular convertImageUrl() doesn't work.
       */
      // This is a HACK!!!
      icon: collection.icon
        ? convertImageUrl(collectionId, collection.icon).replace("block", "collection")
        : undefined,
      cover: collection.cover
        ? convertImageUrl(collectionId, collection.cover).replace("block", "collection")
        : undefined,
      description: await transformTitle(node, collection.description),
      coverPosition: collection.format
        ? collection.format.collection_cover_position || 1 : 1
    }
  }

}

/** 
 * Get collection views.
 */
async function getCollectionViews(
  viewIds: string[],
  apiAgent: ReturnType<typeof createAgent>
): Promise<Notion.CollectionView[]> {

  const { results } = await apiAgent.getRecordValues({
    requests: viewIds.map((id) => {
      return { id, table: "collection_view" }
    })
  })

  return results.reduce((collectionViews, record) => {
    if (record.role !== "none")
      collectionViews.push(record.value as Notion.CollectionView)
    return collectionViews
  }, [] as Notion.CollectionView[])

}

/** 
 * Get page blocks.
 */
async function getPageBlocks(
  blockIds: string[],
  apiAgent: ReturnType<typeof createAgent>
): Promise<Notion.Block.Page[]> {

  const { results } = await apiAgent.getRecordValues({
    requests: blockIds.map((id) => {
      return { id, table: "block" }
    })
  })

  return results.reduce((pageBlocks, record) => {
    if (record.role !== "none")
      pageBlocks.push(record.value as Notion.Block.Page)
    return pageBlocks
  }, [] as Notion.Block.Page[])

}

export default transformCollection