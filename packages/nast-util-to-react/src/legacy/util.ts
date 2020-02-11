import { COLOR } from "./constants"

/**
 * Map color string in NAST to another string that is intended to use
 * as a CSS class.
 * @param {string} str A valid color string in NAST.
 * @returns {string} The CSS class string for the color string.
 */
function colorElemClass(
  elemClass: string,
  color: string
): string {
  const colorPrefix = `${elemClass}--Color`
  const bgPrefix = `${elemClass}--Bg`
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
    case COLOR.greenBg:
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
 * Escape special characters in a string.
 * 
 * @see https://github.com/facebook/react/blob/1034e26fe5e42ba07492a736da7bdf5bf2108bc6/packages/react-dom/src/server/escapeTextForBrowser.js
 * @see https://github.com/rack/rack/issues/27
 * 
 * @param {string} str Unescaped string.
 * @returns {string} Escaped string.
 */
function escapeString(
  str?: string
): string {

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

export {
  colorElemClass,
  escapeString
}