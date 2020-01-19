import { SemanticString } from "notionapi-agent/dist/interfaces/notion-models/"
import * as NAST from "nast-types"
import { getHashLink } from "./util"

export function transformTitle(
  semanticStrings: SemanticString[] | undefined
): NAST.SemanticString[] | undefined {

  if (!semanticStrings) return undefined

  const newSemanticStrings: NAST.SemanticString[] = []

  semanticStrings.forEach(ss => {

    const text = ss[0]
    const formattings = ss[1]

    if (formattings) {

      const newFormattings: NAST.FormattingAll[] = []

      formattings.forEach(formatting => {

        const formattingId = formatting[0]
        const formattingOpt = formatting[1]

        switch (formattingId) {
          case "a":
            newFormattings.push(["a", getHashLink(formattingOpt)])
            break
          case "u":
            newFormattings.push(["u", { name: formattingOpt }])
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