/**
 * Wrapper of console.log().
 */
function log(..._arguments: unknown[]): void {
  const args = Array.from(_arguments)
  args.unshift('(nast-util-from-notionapi)')
  console.log.apply(null, args as [])
}

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