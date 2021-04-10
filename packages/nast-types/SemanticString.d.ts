import { Color, TimeZone, URI, Latex } from "./util"

/*************************************************************************
 * General Models                                                        *
 *************************************************************************/

/** A string that uniquely identifies the formatting. */
type FormattingId = string

/** Can be anything, such as a string, an object, etc. */
type FormattingOption = any

/** Describe a formatting. */
export interface StringFormatting {
  0: FormattingId
  1?: FormattingOption
}

/** Describe a formatted string. */
export interface AbstractSemanticString {
  0: string
  1?: StringFormatting[]
}

/*************************************************************************
 * Specialized Models                                                    *
 *************************************************************************/

export interface FormattingBold extends StringFormatting {
  0: "b"
}

export interface FormattingItalic extends StringFormatting {
  0: "i"
}

export interface FormattingStrike extends StringFormatting {
  0: "s"
}

export interface FormattingLink extends StringFormatting {
  0: "a"
  1: string
}

export interface FormattingInlineCode extends StringFormatting {
  0: "c"
}

export interface FormattingColored extends StringFormatting {
  0: "h"
  1: Color
}

export interface FormattingCommented extends StringFormatting {
  0: "m"
}

export type FormattingBasic =
  FormattingBold | FormattingItalic | FormattingStrike | FormattingLink
  | FormattingInlineCode | FormattingColored | FormattingCommented

export interface BasicAbstractSemanticString extends AbstractSemanticString {
  1?: FormattingBasic[]
}

export interface Contact {
  namespace: string
  identifier: string
}

export interface Occupation {
  title: string
  organization: string
}

export interface Individual {
  name: string
  contacts?: Contact[]
  alias?: string[]
  occupation?: Occupation[]
  description?: string
}

export interface FormattingMentionIndividual extends StringFormatting {
  0: "u"
  1: Individual
}

export interface InlineMentionIndividual extends AbstractSemanticString {
  0: "‣"
  1: [FormattingMentionIndividual]
}

export interface Resource {
  title: SemanticString[]
  uri: URI
}

export interface FormattingMentionResource extends StringFormatting {
  0: "p"
  1: Resource
}

export interface InlineMentionResource extends AbstractSemanticString {
  0: "‣"
  1: [FormattingMentionResource]
}

/** 
 * A structure to represent a reminder alarm before the start of 
 * {@link DateTime}.
 * 
 * e.g. `value` is `30`, `unit` is `minute` 
 * -> 30 minutes before.
 * 
 * e.g. `value` is `1`, `unit` is `day`, `time` is `09:00` 
 * -> 1 day before at 9 a.m.
 */
export type Reminder = {
  value: number
  unit: "minute" | "hour" | "day" | "week"
  /** e.g. "09:00" */
  time?: string
}

/**
 * A structure to represent date and time.
 */
export type DateTime = {
  type: "date" | "daterange" | "datetime" | "datetimerange"
  /** e.g. "2019-05-27" */
  start_date: string
  /** e.g. "2019-05-27" */
  end_date?: string
  /** e.g. "15:00" */
  start_time?: string
  /** e.g. "15:00" */
  end_time?: string
  reminder?: Reminder
  date_format: "relative" | "MM/DD/YYYY" | "MMM DD, YYYY"
  | "DD/MM/YYYY" | "YYYY/MM/DD"
  /** 12h ("h:mm A") or 24h ("H:mm") */
  time_format?: "h:mm A" | "H:mm"
  time_zone?: TimeZone
}

export interface FormattingMentionDate extends StringFormatting {
  0: "d"
  1: DateTime
}

export interface InlineMentionDate extends AbstractSemanticString {
  0: "‣"
  1: [FormattingMentionDate]
}

export interface FormattingInlineMath extends StringFormatting {
  0: "e"
  1: Latex
}

export interface InlineMath extends AbstractSemanticString {
  0: "⁍"
  1: [FormattingInlineMath]
}

export type FormattingAll =
  FormattingBasic | FormattingMentionDate
  | FormattingMentionIndividual | FormattingMentionResource
  | FormattingInlineMath

export interface SemanticString {
  0: string
  1?: FormattingAll[]
}