import { Block } from "notionapi-agent/dist/interfaces/notion-models"

function getBlockColor(
  node: Block
): string | undefined {
  return node.format ? node.format.block_color : undefined
}

/**
 * Get emoji character or public accessible URL of the icon of a block
 * @param node - A Notion block
 */
function getBlockIcon(
  node: Block
): string | undefined {
  let icon = node.format
    ? node.format.page_icon
    : undefined

  if (icon) {
    icon = convertImageUrl(icon)
  }

  return icon
}

/**
 * Convert an image source string to a public accessible URL
 * @param url - Image URL
 * @param width - Image width
 */
function convertImageUrl(
  url: string,
  width?: number
): string {
  const prefixS3 = /^https:\/\/s3/
  const prefixBuiltIn = /^\/image/

  let rUrl

  if (prefixS3.test(url)) {
    const cleanUrl = url.split("?")[0].replace("s3.us-west", "s3-us-west")
    rUrl = `https://notion.so/image/${encodeURIComponent(cleanUrl)}`
  } else if (prefixBuiltIn.test(url)) {
    rUrl = `https://notion.so${url}`
  } else {
    rUrl = url
  }

  if (width) {
    return `${rUrl}?width=${width}`
  } else {
    return rUrl
  }
}

export {
  getBlockColor,
  getBlockIcon,
  convertImageUrl
}