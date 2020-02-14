import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { colorfulBlock } from "../util"
import { SemanticStringArray } from "./SemanticString"

export interface QuoteProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLQuoteElement>> {
}

export interface QuoteDriverProps extends BlockRendererProps {
  current: NAST.Quote
}

export function Quote(props: QuoteProps) {
  return <blockquote {...props} />
}

export function QuoteDriver(props: QuoteDriverProps) {
  const blockName = "Quote"
  const data = props.current
  // TODO: Use <Text> to wrap data.title
  return (
    <Quote id={data.uri} className={`${colorfulBlock(data.color)} ${blockName}`}>
      <SemanticStringArray semanticStringArray={data.title} />
      {props.children}
    </Quote>
  )
}