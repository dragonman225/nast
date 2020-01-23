import * as Notion from "notionapi-agent/dist/interfaces"
import * as NAST from "nast-types"
import { convertFileUrl, getBlockUri, getHashLink } from "./util"
import { createAgent } from "notionapi-agent"

export async function transformTitle(
  semanticStrings: Notion.SemanticString[] | undefined
): Promise<NAST.SemanticString[]> {

  if (!semanticStrings) return []

  const newSemanticStrings: NAST.SemanticString[] = []

  semanticStrings.forEach(ss => {

    const text = ss[0]
    const formattings = ss[1]

    if (formattings) {

      const newFormattings: NAST.FormattingAll[] = []

      formattings.forEach(async formatting => {

        const formattingId = formatting[0]
        const formattingOpt = formatting[1]

        switch (formattingId) {
          case "a":
            newFormattings.push(["a", processLink(formattingOpt)])
            break
          case "u":
            newFormattings.push(["u", await getNotionUser(formattingOpt)])
            break
          case "p":
            newFormattings.push(["p", await getResource(formattingOpt)])
            break
          default:
            newFormattings.push([formattingId, formattingOpt])
        }

      })

      newSemanticStrings.push([text, newFormattings])

    } else {
      newSemanticStrings.push([text])
    }

  })

  return newSemanticStrings
}

function processLink(link: string) {
  return getHashLink(convertFileUrl(link))
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
        title: await transformTitle((page.properties || {}).title),
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