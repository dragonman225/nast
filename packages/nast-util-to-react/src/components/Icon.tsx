import * as React from "react"

export interface IconProps {
  src: string
  size?: string
}

export function Icon(props: IconProps) {
  const cname = "icon"
  const isEmoji = !/^http/.test(props.src)
  const defaultSize = "1.5em"
  const style: React.CSSProperties = {
    width: props.size || defaultSize,
    height: props.size || defaultSize,
  }
  if (isEmoji) {
    return <div className={cname} style={style}>{props.src}</div>
  } else {
    return <img className={cname} style={style} src={props.src} />
  }
}