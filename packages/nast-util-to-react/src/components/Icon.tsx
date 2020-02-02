import * as React from "react"

export interface IconProps {
  src: string
  size?: string
}

export function Icon(props: IconProps) {
  const cname = "icon"
  const isEmoji = !/^http/.test(props.src)
  const defaultSize = "1em"
  const style: React.CSSProperties = {
    width: props.size || defaultSize,
    height: props.size || defaultSize,
  }
  if (isEmoji) {
    return <div className={cname}>{props.src}</div>
  } else {
    return <img className={cname} style={style} src={props.src} />
  }
}