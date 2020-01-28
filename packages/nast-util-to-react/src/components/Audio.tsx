import * as React from "react"
import * as NAST from "nast-types"
import { RendererProps } from "../interfaces"

export interface AudioProps extends RendererProps {
  current: NAST.Audio
}

export function Audio(props: AudioProps) {
  return (
    <audio id={props.current.uri} className="audio" controls>
      <source src={props.current.source} />
    </audio>
  )
}