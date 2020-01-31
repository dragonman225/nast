import * as React from "react"

export interface IconProps {
  src: string
  size?: string
  borderRadius?: string
}

export function Icon(props: IconProps) {
  const isEmoji = !/^http/.test(props.src)
  const defaultSize = "1em"
  const defaultBorderRadius = "3px"
  const style: React.CSSProperties = isEmoji ?
    { width: props.size || defaultSize, textAlign: "center" } :
    {
      width: props.size || defaultSize,
      height: props.size || defaultSize,
      borderRadius: props.borderRadius || defaultBorderRadius
    }
  if (isEmoji) {
    return <div style={style}>{props.src}</div>
  } else {
    return <img src={props.src} style={style} />
  }
}