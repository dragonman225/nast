module.exports = {
  convertNotionURLToLocalLink,
  getPageIDfromNotionURL,
  toDashID,
  isValidDashID
}

const dashIDLen = '0eeee000-cccc-bbbb-aaaa-123450000000'.length
const noDashIDLen = '0eeee000ccccbbbbaaaa123450000000'.length

function convertNotionURLToLocalLink(str) {
  let re = /https:\/\/www.notion.so\/.+#([a-f|\d]+)/
  let found = str.match(re)
  if (found != null && found[1] != null) {
    let dashID = toDashID(found[1])
    return `#${dashID}`
  } else {
    return str
  }
}

function getPageIDfromNotionURL(str) {
  let re = /https:\/\/www.notion.so\/.+-([a-f|\d]+)/
  let found = str.match(re)
  if (found != null && found[1] != null) {
    let dashID = toDashID(found[1])
    return dashID
  } else {
    return str
  }
}

function toDashID(str) {
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

function isValidDashID(str) {
  if (str.length !== dashIDLen) {
    return false
  }

  if (str.indexOf('-') === -1) {
    return false
  }

  return true
}