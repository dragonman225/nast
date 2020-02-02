import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { SemanticStringArray } from "./SemanticString"
import { Icon } from "./Icon"

export interface CalloutProps extends BlockRendererProps {
  current: NAST.Callout
}

export function Callout(props: CalloutProps) {
  const cname = "callout"
  const data = props.current
  return (
    <div id={data.uri} className={cname}>
      <div className={`${cname}__icon`} >
        {data.icon ?
          <Icon src={data.icon} size="1.5em" /> : ""}
      </div>
      <p className={`${cname}__content`}>
        <SemanticStringArray semanticStringArray={data.title} />
        {props.children}
      </p>
    </div>
  )
}