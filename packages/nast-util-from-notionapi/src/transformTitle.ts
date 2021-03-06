/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

import * as Notion from "notionapi-agent/dist/interfaces"
import * as NAST from "nast-types"
import { convertFileUrl, getBlockUri, getHashLink } from "./util"
import { createAgent } from "notionapi-agent"

export async function transformTitle(
  node: Notion.Block, // for context info
  semanticStrings: Notion.SemanticString[] | undefined
): Promise<NAST.SemanticString[]> {

  if (!semanticStrings) return []

  const newSemanticStrings: NAST.SemanticString[] = []

  for (let j = 0; j < semanticStrings.length; j++) {
    const ss = semanticStrings[j]

    const text = ss[0]
    const formattings = ss[1]

    if (formattings) {
      const newFormattings: NAST.FormattingAll[] = []

      for (let i = 0; i < formattings.length; i++) {
        const formatting = formattings[i]

        const formattingId = formatting[0]
        const formattingOpt = formatting[1]

        switch (formattingId) {
          case "a":
            /**
             * File & Media columns in Database blocks are stored as links, 
             * so we need to pass the link through convertFileUrl().
             */
            newFormattings.push(["a",
              getHashLink(convertFileUrl(node.id, formattingOpt as string))])
            break
          case "u": {
            const notionUser = await getNotionUser(formattingOpt as Notion.Util.UUID)
            newFormattings.push(["u", notionUser])
            break
          }
          case "p":
            newFormattings.push(["p", await getResource(formattingOpt as string)])
            break
          default:
            newFormattings.push([formattingId, formattingOpt] as NAST.FormattingAll)
        }
      }

      newSemanticStrings.push([text, newFormattings])
    } else {
      newSemanticStrings.push([text])
    }
  }

  return newSemanticStrings
}

async function getNotionUser(id: string): Promise<NAST.Individual> {
  try {
    const notion = createAgent()
    const resp = await notion.getRecordValues({
      requests: [{ table: "notion_user", id }]
    })

    if (resp.results[0].role === "none") {
      return {
        name: "Unknown Notion User"
      }
    } else {
      const user = resp.results[0].value as Notion.NotionUser
      return {
        name: user.given_name + " " + user.family_name,
        contacts: [
          {
            namespace: "notion.so",
            identifier: id
          }, {
            namespace: "email",
            identifier: user.email
          }
        ]
      }
    }

  } catch (error) {
    return {
      name: "Unknown Notion User"
    }
  }
}

async function getResource(id: string): Promise<NAST.Resource> {
  try {
    const notion = createAgent()
    const resp = await notion.getRecordValues({
      requests: [{ table: "block", id }]
    })

    if (resp.results[0].role === "none") {
      return {
        title: [["Unknown Page"]],
        uri: ""
      }
    } else {
      const page = resp.results[0].value as Notion.Block.Page
      return {
        title: await transformTitle(page, (page.properties || {}).title),
        uri: getBlockUri(page)
      }
    }

  } catch (error) {
    return {
      title: [["Unknown Page"]],
      uri: ""
    }
  }
}