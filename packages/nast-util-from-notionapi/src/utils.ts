const { Logger } = require('@dnpr/logger')

const log = new Logger('nast-util-from-notionapi')

/**
 * Failsafe JSON.parse() wrapper.
 * @param str - Payload to parse.
 * @returns Parsed object when success, undefined when fail.
 */
function parseJSON(str: string): object | undefined {
  try {
    return JSON.parse(str)
  } catch (error) {
    return undefined
  }
}

export { log, parseJSON }