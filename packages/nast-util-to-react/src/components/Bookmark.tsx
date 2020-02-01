import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"

export interface BookmarkProps extends BlockRendererProps {
  current: NAST.Bookmark
}

export function Bookmark(props: BookmarkProps) {
  const cname = "bookmark"
  const data = props.current
  return (
    <div id={data.uri} className={cname}>
      <a href={data.link}>
        {data.title ?
          <h5 className={`${cname}__title`}>{data.title}</h5> : ""}
        {data.description ?
          <p className={`${cname}__desc`}>{data.description}</p> : ""}
        <p className={`${cname}__link`}>{data.link}</p>
      </a>
    </div>
  )
}