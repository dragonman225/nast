import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"
import { Icon } from "./Icon"

export interface CalloutProps extends BlockRendererProps {
  current: NAST.Callout
}

export function Callout(props: CalloutProps) {
  const data = props.current
  return (
    <div id={data.uri} className={data.type}>
      <div className={`${data.type}__icon`}>
        {data.icon ? <Icon src={data.icon} /> : ""}
      </div>
      <div className={`${data.type}__content`}>
        <SemanticStringArray semanticStringArray={data.title} />
        {props.children}
      </div>
    </div>
  )
}