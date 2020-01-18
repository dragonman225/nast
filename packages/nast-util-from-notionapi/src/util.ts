/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

import { Block } from "notionapi-agent/dist/interfaces/notion-models"

function getBlockUri(block: Block | string): string {
  if (typeof block === "string") // Got block id
    return `https://www.notion.so/${block.replace(/-/g, "")}`
  else
    return `https://www.notion.so/${block.id.replace(/-/g, "")}`
}



function getBlockColor(node: Block): string | undefined {
  return node.format ? node.format.block_color : undefined
}



/**
 * Get emoji character or public accessible URL of the icon of a block
 * @param node - A Notion block
 */
function getBlockIcon(node: Block): string | undefined {

  if (node.format && node.format.page_icon) {
    return convertImageUrl(node.format.page_icon)
  } else {
    return undefined
  }

}



/**
 * Convert an image source string to a public accessible URL.
 * @param url - Image URL
 * @param width - Image width
 */
function convertImageUrl(url: string, width?: number): string {

  const pubUrl = (function (): string {
    if (isNotionSecureUrl(url)) {
      const cleanUrl = url.split("?")[0].replace("s3.us-west", "s3-us-west")
      return `https://www.notion.so/signed/${encodeURIComponent(cleanUrl)}`
    } else if (isNotionRelativePath(url)) {
      return `https://www.notion.so${url}`
    } else {
      return url
    }
  })()

  if (width) {
    return `${pubUrl}?width=${width}`
  } else {
    return pubUrl
  }

}



/**
 * Convert a file source string to a public accessible URL.
 * @param url - Image URL
 */
function convertFileUrl(url: string): string {

  return (function (): string {
    if (isNotionSecureUrl(url)) {
      const cleanUrl = url.split("?")[0].replace("s3.us-west", "s3-us-west")
      return `https://www.notion.so/signed/${encodeURIComponent(cleanUrl)}`
    } else {
      return url
    }
  })()

}



/**
 * Whether an URL is a NotionRelativePath.
 * 
 * @see https://notionapi.netlify.com/globals.html#notionrelativepath
 * 
 * @param url 
 */
function isNotionRelativePath(url: string): boolean {
  const regex = /^\/images?\//
  return regex.test(url)
}



/**
 * Whether an URL is a NotionSecureUrl.
 * 
 * @see https://notionapi.netlify.com/globals.html#notionsecureurl
 * 
 * @param url 
 */
function isNotionSecureUrl(url: string): boolean {
  const regex =
    /^https:\/\/s3.+\.amazonaws\.com\/secure.notion-static.com\//
  return regex.test(url)
}

export {
  getBlockUri,
  getBlockColor,
  getBlockIcon,
  convertImageUrl,
  convertFileUrl,
  isNotionRelativePath,
  isNotionSecureUrl
}