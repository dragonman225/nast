export type Color =
  "gray" | "brown" | "orange" | "yellow" | "teal" | "blue" | "purple"
  | "pink" | "red" | "gray_background" | "brown_background"
  | "orange_background" | "yellow_background" | "teal_background"
  | "blue_background" | "purple_background" | "pink_background"
  | "red_background"

/**
 * A string containing exactly one emoji character.
 */
export type Emoji = string

/**
 * TZ database name in "*Area/Location*" format, e.g. "Asia/Taipei".
 * 
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type TimeZone = string

/**
 * An [RFC3986](https://tools.ietf.org/html/rfc3986) 
 * Uniform Resource Identifier.
 */
export type URI = string

/**
 * A publicly accessible URL.
 */
export type PublicUrl = string

/**
 * An UUID string, e.g. `0297b381-6319-417b-a4f8-2ca1f2a96a81`
 */
export type UUID = string

/**
 * An Unix timestamp number in milliseconds.
 */
export type TimestampNumber = number

/**
 * A LaTeX string representing math.
 */
export type Latex = string