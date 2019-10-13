import * as Notion from 'notionapi-agent'

function getBlockColor(
  node: Notion.Block
): string | undefined {
  const color = node.format
    ? node.format['block_color']
    : undefined
  return color
}

function getBlockTitle(
  node: Notion.Block
): Notion.StyledString[] {
  const title = node.properties
    ? node.properties.title
      ? node.properties.title
      : [] as Notion.StyledString[]
    : [] as Notion.StyledString[]
  return title
}

function getBlockIcon(
  node: Notion.Block
): string | undefined {
  const icon = node.format
    ? node.format.page_icon
    : undefined
  return icon
}

export {
  getBlockColor,
  getBlockTitle,
  getBlockIcon
}