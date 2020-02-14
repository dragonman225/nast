import * as React from "react"
import { convertColor } from "../util"

export interface PillProps {
  color?: string
  content: string
}

export function Pill(props: PillProps) {
  const blockName = "Pill"
  const color = convertColor(props.color)
  return (
    <span className={`${blockName} ${blockName}--${color}`}>
      {props.content}
    </span>
  )
}