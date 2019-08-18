const dashIDLen = '0eeee000-cccc-bbbb-aaaa-123450000000'.length
const noDashIDLen = '0eeee000ccccbbbbaaaa123450000000'.length

function getPageIDFromNotionDatabaseURL(str: string) {
  const re = /https:\/\/www.notion.so\/([\da-f]+)\?v=([\da-f]+)/
  const found = str.match(re)
  if (found != null && found[1] != null) {
    let dashID = toDashID(found[1])
    return dashID
  } else {
    throw new Error(`Cannot get pageID from ${str}.`)
  }
}

function getBookmarkLinkFromNotionPageURL(str: string | undefined) {
  if (!str) return str
  let re = /https:\/\/www.notion.so\/.+#([\da-f]+)/
  let found = str.match(re)
  if (found != null && found[1] != null) {
    let dashID = toDashID(found[1])
    return `#${dashID}`
  } else {
    return str
  }
}

function getPageIDFromNotionPageURL(str: string) {
  let lastStrInUrl = str.split('/').pop()
  let pageID = lastStrInUrl
    ? lastStrInUrl.split('-').pop() : ''

  if (pageID && pageID.length === noDashIDLen) {
    return toDashID(pageID)
  } else {
    return str
  }
}

function toDashID(str: string) {
  if (isValidDashID(str)) {
    return str
  }

  let s = str.replace(/-/g, '')

  if (s.length !== noDashIDLen) {
    return str
  }

  let res = str.substring(0, 8) + '-' + str.substring(8, 12) + '-' + str.substring(12, 16) + '-' + str.substring(16, 20) + '-' + str.substring(20)
  return res
}

function isValidDashID(str: string) {
  if (str.length !== dashIDLen) {
    return false
  }

  if (str.indexOf('-') === -1) {
    return false
  }

  return true
}

/** Deprecated. Please use getBookmarkLinkfromNotionPageURL() instead. */
function convertNotionURLToLocalLink(str: string) {
  return getBookmarkLinkFromNotionPageURL(str)
}

/** Deprecated. Please use getPageIDFromNotionPageURL() instead. */
function getPageIDfromNotionURL(str: string) {
  return getPageIDFromNotionPageURL(str)
}

export {
  getPageIDFromNotionDatabaseURL,
  getBookmarkLinkFromNotionPageURL,
  getPageIDFromNotionPageURL,
  toDashID,
  isValidDashID,
  convertNotionURLToLocalLink, // Deprecated
  getPageIDfromNotionURL // Deprecated
}