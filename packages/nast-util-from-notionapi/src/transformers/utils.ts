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

/**
 * Get emoji character or public accessible URL of the icon of a block
 * @param node - A Notion block
 */
function getBlockIcon(
  node: Notion.Block
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
    const cleanUrl = url.split('?')[0].replace('s3.us-west', 's3-us-west')
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
  getBlockTitle,
  getBlockIcon,
  convertImageUrl
}