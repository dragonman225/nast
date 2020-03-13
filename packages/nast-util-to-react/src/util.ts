const COLOR = {
  gray: "gray",
  brown: "brown",
  orange: "orange",
  yellow: "yellow",
  green: "green", // appear in select and multi-select options
  teal: "teal", // appear in block colors
  blue: "blue",
  purple: "purple",
  pink: "pink",
  red: "red",
  grayBg: "gray_background",
  brownBg: "brown_background",
  orangeBg: "orange_background",
  yellowBg: "yellow_background",
  tealBg: "teal_background",
  blueBg: "blue_background",
  purpleBg: "purple_background",
  pinkBg: "pink_background",
  redBg: "red_background"
}

/**
 * Convert a color name in NAST to a color in UI.
 * @param color One of the color names defined in `COLOR`.
 * @returns A class name with a color modifier.
 */
export function convertColor(color?: string): string {
  const colorPrefix = `Color`
  const bgPrefix = `Bg`
  switch (color) {
    case COLOR.gray:
      return colorPrefix + "Gray"
    case COLOR.brown:
      return colorPrefix + "Brown"
    case COLOR.orange:
      return colorPrefix + "Orange"
    case COLOR.yellow:
      return colorPrefix + "Yellow"
    case COLOR.green:
    case COLOR.teal:
      return colorPrefix + "Green"
    case COLOR.blue:
      return colorPrefix + "Blue"
    case COLOR.purple:
      return colorPrefix + "Purple"
    case COLOR.pink:
      return colorPrefix + "Pink"
    case COLOR.red:
      return colorPrefix + "Red"
    case COLOR.grayBg:
      return bgPrefix + "Gray"
    case COLOR.brownBg:
      return bgPrefix + "Brown"
    case COLOR.orangeBg:
      return bgPrefix + "Orange"
    case COLOR.yellowBg:
      return bgPrefix + "Yellow"
    case COLOR.tealBg:
      return bgPrefix + "Green"
    case COLOR.blueBg:
      return bgPrefix + "Blue"
    case COLOR.purpleBg:
      return bgPrefix + "Purple"
    case COLOR.pinkBg:
      return bgPrefix + "Pink"
    case COLOR.redBg:
      return bgPrefix + "Red"
    default:
      return colorPrefix + "Default"
  }
}

/**
 * Make a block colorful.
 * @param color One of the color names defined in `COLOR`.
 * @returns A CSS class name string to add to a HTML element.
 */
export function colorfulBlock(color?: string): string {
  const blockName = "ColorfulBlock"
  return `${blockName} ${blockName}--${convertColor(color)}`
}

/**
 * Escape special characters in a string.
 * 
 * @see https://github.com/facebook/react/blob/1034e26fe5e42ba07492a736da7bdf5bf2108bc6/packages/react-dom/src/server/escapeTextForBrowser.js
 * @see https://github.com/rack/rack/issues/27
 * 
 * @param str An unescaped string.
 * @returns An escaped string.
 */
export function escapeString(str?: string): string {

  if (!str) return ""

  let character, escapedString = ""

  for (let i = 0; i < str.length; ++i) {
    character = str.charAt(i)
    switch (character) {
      case "<":
        escapedString += "&lt;"
        break
      case ">":
        escapedString += "&gt;"
        break
      case "&":
        escapedString += "&amp;"
        break
      case "'":
        escapedString += "&#x27;"
        break
      case "\"":
        escapedString += "&quot;"
        break
      // case "/":
      //   escapedString += "&#x2F;"
      //   break
      // case "\"":
      //   escapedString += "&quot;"
      //   break
      default:
        escapedString += character
    }
  }

  return escapedString
}

export function prettyTime(jsHour: number, jsMinute: number) {
  const ampm = jsHour >= 12 ? "PM" : "AM"
  const hour = (jsHour % 12) ? (jsHour % 12) : 12
  return `${hour}:${jsMinute.toString().padStart(2, "0")} ${ampm}`
}

export function prettyDate(timestamp: number) {
  const d = new Date(timestamp)
  const monthAbbrs = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  const month = monthAbbrs[d.getMonth()]
  const date = d.getDate()
  const year = d.getFullYear()
  const hour = d.getHours()
  const minute = d.getMinutes()
  return `${month} ${date}, ${year} ${prettyTime(hour, minute)}`
}