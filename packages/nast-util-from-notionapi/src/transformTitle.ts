import { SemanticString } from "notionapi-agent/dist/interfaces/notion-models/"
import * as NAST from "nast-types"
import { getHashLink } from "./util"
import { createAgent } from "notionapi-agent"
import { NotionUser } from "notionapi-agent/dist/interfaces/notion-models"

export async function transformTitle(
  semanticStrings: SemanticString[] | undefined
): Promise<NAST.SemanticString[] | undefined> {

  if (!semanticStrings) return undefined

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
            newFormattings.push(["a", getHashLink(formattingOpt)])
            break
          case "u":
            newFormattings.push(["u", await getNotionUser(formattingOpt)])
            break
          default:
            newFormattings.push(formatting)
        }

      })

      newSemanticStrings.push([text, newFormattings])

    } else {
      newSemanticStrings.push([text])
    }

  })

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
      const user = resp.results[0].value as NotionUser
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