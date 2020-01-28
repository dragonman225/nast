import * as React from "react"

export interface IconProps {
  src: string
}

export function Icon(props: IconProps) {
  const isEmoji = !/^http/.test(props.src)
  return (
    isEmoji ? <>{props.src}</> : <img src={props.src} />
  )
}