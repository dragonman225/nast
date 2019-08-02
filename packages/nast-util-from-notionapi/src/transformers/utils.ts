import * as Notion from '../types/api'
// import * as Nast from '../types/nast'

function getBlockColor(
  node: Notion.BlockValue
): string | undefined {
  let color = node.format
    ? node.format['block_color']
    : undefined
  return color
}

function getBlockTitle(
  node: Notion.BlockValue
): Notion.StyledString[] {
  let title = node.properties
    ? node.properties.title
      ? node.properties.title
      : [] as Notion.StyledString[]
    : [] as Notion.StyledString[]
  return title
}

export {
  getBlockColor,
  getBlockTitle
}