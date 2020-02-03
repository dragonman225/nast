import * as React from "react"
import katex from "katex"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"

export interface EquationProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  latex: string
}

export interface EquationDriverProps extends BlockRendererProps {
  current: NAST.Equation
}

export function Equation(props: EquationProps) {
  const katexOpts = {
    throwOnError: false,
    displayMode: true
  }
  const { latex, ...remainingProps } = props
  return (
    <p {...remainingProps} dangerouslySetInnerHTML={{
      __html: katex.renderToString(latex, katexOpts)
    }} data-latex={latex} />
  )
}

export function EquationDriver(props: EquationDriverProps) {
  const blockName = "Equation"
  const data = props.current
  return (
    <Equation
      id={props.current.uri}
      className={blockName}
      latex={data.latex} />
  )
}