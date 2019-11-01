declare const log: any;
/**
 * Failsafe JSON.parse() wrapper.
 * @param str - Payload to parse.
 * @returns Parsed object when success, undefined when fail.
 */
declare function parseJSON(str: string): object | undefined;
export { log, parseJSON };
//# sourceMappingURL=utils.d.ts.map