import * as React from "react"
import * as NAST from "nast-types"
import { RendererProps } from "../interfaces"

export interface BookmarkProps extends RendererProps {
  current: NAST.Bookmark
}

export function Bookmark(props: BookmarkProps) {
  const name = "bookmark"
  const data = props.current
  return (
    <a id={data.uri} className={name} href={data.link}>
      {data.title ?
        <h5 className={`${name}__title`}>{data.title}</h5> : ""}
      {data.description ?
        <p className={`${name}__desc`}>{data.description}</p> : ""}
      <p className={`${name}__link`}>{data.link}</p>
    </a>
  )
}