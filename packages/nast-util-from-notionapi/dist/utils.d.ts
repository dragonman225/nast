/**
 * Wrapper of console.log().
 */
declare function log(..._arguments: unknown[]): void;
/**
 * Failsafe JSON.parse() wrapper.
 * @param str - Payload to parse.
 * @returns Parsed object when success, undefined when fail.
 */
declare function parseJSON(str: string): object | undefined;
export { log, parseJSON };
//# sourceMappingURL=utils.d.ts.map