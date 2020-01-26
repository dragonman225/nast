import * as React from "react"
import * as NAST from "nast-types"
import { renderColor } from "../lagacy/util"
import renderCode from "../lagacy/util-prismjs"

export interface SemanticStringProps {
  semanticString: NAST.SemanticString
  isCode?: boolean
  codeLang?: string
}

export function SemanticString(props: SemanticStringProps) {

  const text = props.semanticString[0]
  const formattings = props.semanticString[1] || []
  let renderedText: JSX.Element

  if (props.isCode) {
    // TODO: Can this be rendered without <span> ?
    renderedText = <span dangerouslySetInnerHTML={{
      __html: renderCode(text, props.codeLang)
    }} />
  } else {
    renderedText = <>{text}</>
  }

  return formattings.reduce((rendered, formatting) => {
    const formattingId = formatting[0]
    const formattingOpts = formatting[1]
    switch (formattingId) {
      /* Bold */
      case "b":
        return rendered = <strong>{rendered}</strong>
      /* Italic */
      case "i":
        return rendered = <em>{rendered}</em>
      /* Strike */
      case "s":
        return rendered = <del>{rendered}</del>
      /* Link */
      case "a": {
        const link = formattingOpts as string
        return rendered = <a href={link}>{rendered}</a>
      }
      /* Inline Code */
      case "c":
        return rendered = <code>{rendered}</code>
      /* Color or Background Color */
      case "h": {
        const color = formattingOpts as string
        return rendered =
          <span className={renderColor(color)}>{rendered}</span>
      }
      /* Comment */
      case "m":
        return rendered =
          <span className="color-comment">{rendered}</span>
      /** Inline Mention Individual */
      case "u": {
        const individual = formattingOpts as NAST.Individual
        return rendered = <InlineMentionIndividual data={individual} />
      }
      /** Inline Mention Resource */
      case "p": {
        const resource = formattingOpts as NAST.Resource
        return rendered = <InlineMentionResource data={resource} />
      }
      /** Inline Mention Date */
      case "d": {
        const date = formattingOpts as NAST.DateTime
        return rendered = <InlineMentionDate data={date} />
      }
      default:
        console.log(`Unsupported formatting: ${formatting[0]}`)
        return rendered
    }
  }, renderedText)

}

export interface SemanticStringArrayProps {
  semanticStringArray: NAST.SemanticString[]
  isCode?: boolean
  codeLang?: string
}

export function SemanticStringArray(props: SemanticStringArrayProps) {
  return (
    <>
      {props.semanticStringArray.map((ss, i) =>
        <SemanticString
          semanticString={ss}
          isCode={props.isCode}
          codeLang={props.codeLang} 
          key={i} />)}
    </>
  )
}

export interface InlineMentionIndividualProps {
  data: NAST.Individual
}

function InlineMentionIndividual(props: InlineMentionIndividualProps) {
  return (
    <span className="color-mention">@{props.data.name}</span>
  )
}

export interface InlineMentionResourceProps {
  data: NAST.Resource
}

function InlineMentionResource(props: InlineMentionResourceProps) {
  return (
    <span className="color-mention">
      <a href={props.data.uri}>
        <SemanticStringArray semanticStringArray={props.data.title} />
      </a>
    </span>
  )
}

export interface InlineMentionDateProps {
  data: NAST.DateTime
}

function InlineMentionDate(props: InlineMentionDateProps) {
  const startDate = new Date(props.data.start_date)
  return (
    <span className="color-mention">
      @{startDate.getUTCFullYear()}/
      {startDate.getUTCMonth() + 1}/
      {startDate.getUTCDate()}
    </span>
  )
}