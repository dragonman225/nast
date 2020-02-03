import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"

export interface AudioProps extends BlockRendererProps {
  current: NAST.Audio
}

export function Audio(props: AudioProps) {
  return (
    <audio id={props.current.uri} className="Audio" controls>
      <source src={props.current.source} />
    </audio>
  )
}