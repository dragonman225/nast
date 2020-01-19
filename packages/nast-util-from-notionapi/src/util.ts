/**
 * Copyright (c) 2019-present Wen-Zhi Wang <zxcvb22217@gmail.com>
 * All rights reserved.
 *
 * Use of this source code is governed by a MIT license that can be found 
 * in the LICENSE file.
 */

import { Block } from "notionapi-agent/dist/interfaces/notion-models"

const dashIDLen = "0eeee000-cccc-bbbb-aaaa-123450000000".length
const noDashIDLen = "0eeee000ccccbbbbaaaa123450000000".length

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
 * Get a link that starts with # if the input URL links to an element 
 * in the same page.
 */
function getHashLink(
  str: string
): string {
  const re = /https:\/\/www.notion.so\/.+#([\da-f]+)/
  const found = str.match(re)
  if (found != null && found[1] != null) {
    return "#" + getBlockUri(found[1])
  } else {
    return str
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



function toDashID(str: string): string {
  if (isValidDashID(str)) {
    return str
  }

  const s = str.replace(/-/g, "")

  if (s.length !== noDashIDLen) {
    return str
  }

  return str.substring(0, 8) + "-"
    + str.substring(8, 12) + "-"
    + str.substring(12, 16) + "-"
    + str.substring(16, 20) + "-"
    + str.substring(20)
}



function isValidDashID(str: string): boolean {
  if (str.length !== dashIDLen) {
    return false
  }

  if (str.indexOf("-") === -1) {
    return false
  }

  return true
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
  getHashLink,
  convertImageUrl,
  convertFileUrl,
  toDashID,
  isValidDashID,
  isNotionRelativePath,
  isNotionSecureUrl
}