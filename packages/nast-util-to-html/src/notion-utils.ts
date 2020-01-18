const dashIDLen = "0eeee000-cccc-bbbb-aaaa-123450000000".length
const noDashIDLen = "0eeee000ccccbbbbaaaa123450000000".length

function getPageIDFromNotionDatabaseURL(str: string): string {
  const re = /https:\/\/www.notion.so\/([\da-f]+)\?v=([\da-f]+)/
  const found = str.match(re)
  if (found != null && found[1] != null) {
    const dashID = toDashID(found[1])
    return dashID
  } else {
    throw new Error(`Cannot get pageID from ${str}.`)
  }
}

function getBookmarkLinkFromNotionPageURL(str: string | undefined): string | undefined {
  if (!str) return str
  const re = /https:\/\/www.notion.so\/.+#([\da-f]+)/
  const found = str.match(re)
  if (found != null && found[1] != null) {
    const dashID = toDashID(found[1])
    return `#${dashID}`
  } else {
    return str
  }
}

function getPageIDFromNotionPageURL(str: string): string {
  const lastStrInUrl = str.split("/").pop()
  const pageID = lastStrInUrl
    ? lastStrInUrl.split("-").pop() : ""

  if (pageID && pageID.length === noDashIDLen) {
    return toDashID(pageID)
  } else {
    return str
  }
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

export {
  getPageIDFromNotionDatabaseURL,
  getBookmarkLinkFromNotionPageURL,
  getPageIDFromNotionPageURL,
  toDashID,
  isValidDashID
}