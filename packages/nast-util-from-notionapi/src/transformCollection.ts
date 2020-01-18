/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

import transformPage from "./transformPage"
import { getBlockUri, getBlockColor, convertImageUrl } from "./util"

import { createAgent } from "notionapi-agent"
import * as NotionBlockBasic from "notionapi-agent/dist/interfaces/notion-models/block/BasicBlock"
import * as NotionBlockDatabase from "notionapi-agent/dist/interfaces/notion-models/block/Database"
import { CollectionView } from "notionapi-agent/dist/interfaces/notion-models"

async function transformCollection(
  node: NotionBlockDatabase.CollectionViewInline
    | NotionBlockDatabase.CollectionViewPage,
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
      filter: [],
      filter_operator: "and",
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
      name: collection.name || [["Untitled"]],
      collectionId,
      defaultViewId: viewIds[0],
      views,
      schema: collection.schema,
      icon: collection.icon
        ? convertImageUrl(collection.icon) : undefined,
      cover: collection.cover
        ? convertImageUrl(collection.cover) : undefined,
      description: collection.description,
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
): Promise<CollectionView[]> {

  const { results } = await apiAgent.getRecordValues({
    requests: viewIds.map((id) => {
      return { id, table: "collection_view" }
    })
  })

  return results.reduce((collectionViews, record) => {
    if (record.role !== "none")
      collectionViews.push(record.value as CollectionView)
    return collectionViews
  }, [] as CollectionView[])

}

/** 
 * Get page blocks.
 */
async function getPageBlocks(
  blockIds: string[],
  apiAgent: ReturnType<typeof createAgent>
): Promise<NotionBlockBasic.Page[]> {

  const { results } = await apiAgent.getRecordValues({
    requests: blockIds.map((id) => {
      return { id, table: "block" }
    })
  })

  return results.reduce((pageBlocks, record) => {
    if (record.role !== "none")
      pageBlocks.push(record.value as NotionBlockBasic.Page)
    return pageBlocks
  }, [] as NotionBlockBasic.Page[])

}

export default transformCollection