import { SemanticString } from "notionapi-agent/dist/interfaces/notion-models/"

export function transformTitle(
  title: SemanticString[] | undefined): NAST.SemanticString[] | undefined {
  if (!title) return undefined

  title.forEach(str => {
    const formattings = str[1]
    if (formattings) {
      formattings.forEach(f => {
        if (f[0] === "u") f[1] = { name: f[1] }
      })
    }
  })

  return title as NAST.SemanticString[]
}