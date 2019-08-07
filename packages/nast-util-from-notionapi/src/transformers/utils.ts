import { Notion } from '../../../types/src'

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

function getBlockIcon(
  node: Notion.BlockValue
): string | undefined {
  let icon = node.format
    ? node.format.page_icon
    : undefined
  return icon
}

export {
  getBlockColor,
  getBlockTitle,
  getBlockIcon
}