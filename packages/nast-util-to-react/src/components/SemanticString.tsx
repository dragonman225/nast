import * as React from "react"
import * as NAST from "nast-types"
import { colorElemClass } from "../legacy/util"
import renderCode from "../legacy/util-prismjs"

export interface SemanticStringArrayProps {
  semanticStringArray: NAST.SemanticString[]
  isCode?: boolean
  codeLang?: string
}

export function SemanticStringArray(props: SemanticStringArrayProps) {
  return (
    <span className="SemanticStringArray">
      {props.semanticStringArray.map((ss, i) =>
        <SemanticString
          semanticString={ss}
          isCode={props.isCode}
          codeLang={props.codeLang}
          key={i} />)}
    </span>
  )
}

export interface SemanticStringProps {
  semanticString: NAST.SemanticString
  isCode?: boolean
  codeLang?: string
}

export function SemanticString(props: SemanticStringProps) {

  const blockName = "SemanticString"
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

  renderedText = formattings.reduce((rendered, formatting) => {
    const elemName = `${blockName}__Fragment`
    const formattingId = formatting[0]
    const formattingOpts = formatting[1]
    switch (formattingId) {
      /* Bold */
      case "b":
        return rendered =
          <strong className={`${elemName} ${elemName}--bold`}>
            {rendered}
          </strong>
      /* Italic */
      case "i":
        return rendered =
          <em className={`${elemName} ${elemName}--italic`}>
            {rendered}
          </em>
      /* Strike */
      case "s":
        return rendered =
          <del className={`${elemName} ${elemName}--strike`}>
            {rendered}
          </del>
      /* Link */
      case "a": {
        const link = formattingOpts as string
        return rendered =
          <a className={`${elemName} ${elemName}--link`} href={link}>
            {rendered}
          </a>
      }
      /* Inline Code */
      case "c":
        return rendered =
          <code className={`${elemName} ${elemName}--code`}>
            {rendered}
          </code>
      /* Color or Background Color */
      case "h": {
        const color = formattingOpts as string
        return rendered =
          <span className={`${elemName} ${colorElemClass(elemName, color)}`}>
            {rendered}
          </span>
      }
      /* Comment */
      case "m":
        return rendered =
          <span className={`${elemName} ${elemName}--commented`}>
            {rendered}
          </span>
      /** Inline Mention Individual */
      case "u": {
        const individual = formattingOpts as NAST.Individual
        return rendered =
          <span className={`${elemName} ${elemName}--individual`}>
            <InlineMentionIndividual data={individual} />
          </span>
      }
      /** Inline Mention Resource */
      case "p": {
        const resource = formattingOpts as NAST.Resource
        return rendered =
          <span className={`${elemName} ${elemName}--resource`}>
            <InlineMentionResource data={resource} />
          </span>
      }
      /** Inline Mention Date */
      case "d": {
        const date = formattingOpts as NAST.DateTime
        return rendered =
          <span className={`${elemName} ${elemName}--date`}>
            <InlineMentionDate data={date} />
          </span>
      }
      default:
        console.log(`Unsupported formatting: ${formatting[0]}`)
        return rendered =
          <span className={`${elemName} ${elemName}--unknown`}>
            {rendered}
          </span>
    }
  }, renderedText)

  return <span className={blockName}>{renderedText}</span>

}

export interface InlineMentionIndividualProps {
  data: NAST.Individual
}

function InlineMentionIndividual(props: InlineMentionIndividualProps) {
  return (
    <>@{props.data.name}</>
  )
}

export interface InlineMentionResourceProps {
  data: NAST.Resource
}

function InlineMentionResource(props: InlineMentionResourceProps) {
  return (
    <a href={props.data.uri}>
      <SemanticStringArray semanticStringArray={props.data.title} />
    </a>
  )
}

export interface InlineMentionDateProps {
  data: NAST.DateTime
}

function InlineMentionDate(props: InlineMentionDateProps) {
  const startDate = new Date(props.data.start_date)
  return (
    <>
      @{startDate.getUTCFullYear()}/
      {startDate.getUTCMonth() + 1}/
      {startDate.getUTCDate()}
    </>
  )
}