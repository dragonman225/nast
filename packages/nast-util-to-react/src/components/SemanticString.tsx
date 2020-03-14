import * as React from "react"
import * as NAST from "nast-types"
import { convertColor } from "../util"
import renderCode from "../util-prismjs"

export interface SemanticStringArrayProps {
  semanticStringArray: NAST.SemanticString[]
  /** Whether the content is code. */
  isCode?: boolean
  /** One of programming languages listed in `../legacy/util-prismjs.ts`. */
  codeLang?: string
  /**
   * Do not render interactive elements such as <a>.
   * See https://stackoverflow.com/questions/7863554/is-it-ok-to-have-an-a-inside-another-a
   */
  noInteractive?: boolean
}

export interface SemanticStringProps {
  semanticString: NAST.SemanticString
  isCode?: boolean
  codeLang?: string
  noInteractive?: boolean
}

export function SemanticStringArray(props: SemanticStringArrayProps) {
  /**
   * In case TypeScript fails to detect type mismatch, or an unexpected 
   * runtime edge case occurred.
   */
  const ssArr = props.semanticStringArray || []
  return (
    <span className="SemanticStringArray">
      {ssArr.map((ss, i) =>
        <SemanticString
          semanticString={ss}
          isCode={props.isCode}
          codeLang={props.codeLang}
          noInteractive={props.noInteractive}
          key={i} />)}
    </span>
  )
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
          <strong className={`${elemName} ${elemName}--Bold`}>
            {rendered}
          </strong>
      /* Italic */
      case "i":
        return rendered =
          <em className={`${elemName} ${elemName}--Italic`}>
            {rendered}
          </em>
      /* Strike */
      case "s":
        return rendered =
          <del className={`${elemName} ${elemName}--Strike`}>
            {rendered}
          </del>
      /* Link */
      case "a": {
        const link = formattingOpts as string
        return rendered = props.noInteractive ?
          rendered :
          <a className={`${elemName} ${elemName}--Link`} href={link}>
            {rendered}
          </a>
      }
      /* Inline Code */
      case "c":
        return rendered =
          <code className={`${elemName} ${elemName}--Code`}>
            {rendered}
          </code>
      /* Color or Background Color */
      case "h": {
        const color = convertColor(formattingOpts as string)
        const hType = color.startsWith("Bg") ? "Bg" : "Color"
        return rendered =
          <mark className={`${elemName} ${elemName}--Highlighted${hType} ${elemName}--${color}`}>
            {rendered}
          </mark>
      }
      /* Comment */
      case "m":
        return rendered =
          <span className={`${elemName} ${elemName}--Commented`}>
            {rendered}
          </span>
      /** Inline Mention Individual */
      case "u": {
        const individual = formattingOpts as NAST.Individual
        return rendered =
          <span className={`${elemName} ${elemName}--Individual`}>
            <InlineMentionIndividual data={individual} />
          </span>
      }
      /** Inline Mention Resource */
      case "p": {
        const resource = formattingOpts as NAST.Resource
        return rendered =
          <span className={`${elemName} ${elemName}--Resource`}>
            <InlineMentionResource
              data={resource} noInteractive={props.noInteractive} />
          </span>
      }
      /** Inline Mention Date */
      case "d": {
        const date = formattingOpts as NAST.DateTime
        return rendered =
          <span className={`${elemName} ${elemName}--Date`}>
            <InlineMentionDate data={date} />
          </span>
      }
      default:
        console.log(`Unsupported formatting: ${formatting[0]}`)
        return rendered =
          <span className={`${elemName} ${elemName}--Unknown`}>
            {rendered}
          </span>
    }
  }, renderedText)

  return <span className={blockName}>{renderedText}</span>

}

interface InlineMentionIndividualProps {
  data: NAST.Individual
}

interface InlineMentionResourceProps {
  data: NAST.Resource
  noInteractive?: boolean
}

interface InlineMentionDateProps {
  data: NAST.DateTime
}

function InlineMentionIndividual(props: InlineMentionIndividualProps) {
  return (
    <>@{props.data.name}</>
  )
}

function InlineMentionResource(props: InlineMentionResourceProps) {
  if (props.noInteractive) {
    return (
      <SemanticStringArray
        semanticStringArray={props.data.title} noInteractive={true} />
    )
  } else {
    return (
      <a href={props.data.uri}>
        <SemanticStringArray
          semanticStringArray={props.data.title} noInteractive={false} />
      </a>
    )
  }
}

function InlineMentionDate(props: InlineMentionDateProps) {
  const startDate = new Date(props.data.start_date)
  const endDate = props.data.end_date ?
    new Date(props.data.end_date) : undefined
  const dateToString = function (d: Date) {
    return `@${d.getUTCFullYear()}/\
${(d.getUTCMonth() + 1).toString().padStart(2, "0")}/\
${d.getUTCDate().toString().padStart(2, "0")}`
  }
  return (
    <>
      {`${dateToString(startDate)}${endDate ?
        ` → ${dateToString(endDate)}` : ""}`}
    </>
  )
}