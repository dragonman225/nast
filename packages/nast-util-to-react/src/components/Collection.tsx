import * as React from "react"
import * as NAST from "nast-types"
import { BlockRendererProps } from "../interfaces"
import { Anchor } from "./Anchor"
import { Pill } from "./Pill"
import { SemanticStringArray } from "./SemanticString"

function createAccessor(
  column: NAST.Collection["schema"][string],
  columnId: string
) {
  return function (row: NAST.Page) {
    /**
     * A common place to get the column value. 
     * However, some types of column values are at other places.
     */
    const data = (row.properties || {})[columnId]
    switch (column.type) {
      case "title":
        return {
          type: column.type,
          value: row.title
        }
      case "checkbox":
        return {
          type: column.type,
          value: data ? data[0][0] === "Yes" : false
        }
      case "select":
      case "multi_select": {
        const optionNames = data ? data[0][0].split(",") : []
        return {
          type: column.type,
          value: optionNames.map(optionName => {
            const option = (column.options || [])
              .find(o => o.value === optionName)
            if (!option) {
              console.log(`Select option "${optionName}" is \
not found on property "${columnId}:${column.name}".`)
              return {
                color: "default",
                value: optionName
              }
            } else {
              return {
                color: option.color,
                value: option.value
              }
            }
          })
        }
      }
      // TODO: NAST currently do not have the following 4 information.
      case "created_by":
      case "last_edited_by":
        return {
          type: column.type,
          value: "Someone"
        }
      case "created_time":
      case "last_edited_time":
        return {
          type: column.type,
          value: 0
        }
      default:
        return {
          type: column.type,
          value: (row.properties || {})[columnId]
        }
    }
  }
}

export interface CollectionProps {
  view: NAST.Collection["views"][number]
  columns: {
    id: string
    name: NAST.Collection["schema"][string]["name"]
    type: NAST.Collection["schema"][string]["type"]
    options: NAST.Collection["schema"][string]["options"]
    accessor: ReturnType<typeof createAccessor>
  }[]
  rows: NAST.Page[]
}

export interface CollectionDriverProps extends BlockRendererProps {
  current: NAST.Collection
}

export function Collection(props: CollectionProps) {
  const viewType = props.view.type
  switch (viewType) {
    case "table":
      return <Table {...props} />
    case "gallery":
      return <Gallery {...props} />
    default:
      console.log(`Collection view type "${viewType}" is unsupported`)
      return <></>
  }
}

export function CollectionDriver(props: CollectionDriverProps) {
  const data = props.current
  const view = data.views.find(view => view.id === data.defaultViewId)
  const columns: CollectionProps["columns"] =
    Object.keys(data.schema).map(colId => {
      const col = data.schema[colId]
      return {
        id: colId,
        name: col.name,
        type: col.type,
        options: col.options,
        accessor: createAccessor(col, colId)
      }
    })
  const rows = data.children

  if (!view) {
    console.log(`Cannot find default view "${data.defaultViewId}" in \
collection "${data.collectionId}"`)
    return <></>
  }

  if (data.type === "collection_page") {
    return (
      <main id={data.uri} className="CollectionPage">
        <Collection view={view} columns={columns} rows={rows} />
      </main>
    )
  } else {
    return (
      <div id={data.uri} className="CollectionInline">
        <h3>
          <Anchor href={data.uri} />
          <SemanticStringArray semanticStringArray={data.name} />
        </h3>
        <Collection view={view} columns={columns} rows={rows} />
      </div>
    )
  }
}

export function Table(props: CollectionProps) {
  const blockName = "Table"
  const viewFormat = props.view.format
  const columnMap = (function () {
    const map: {
      [key: string]: typeof props.columns[number]
    } = {}
    props.columns.forEach(col => map[col.id] = col)
    return map
  })()
  const visibleColumns = (viewFormat.table_properties || [])
    .filter(colViewInfo => colViewInfo.visible)
    /** 
     * Some collection views have "ghost" properties that don"t exist 
     * in collection schema.
     */
    .filter(colViewInfo => columnMap[colViewInfo.property])
    .map(colViewInfo => {
      const colId = colViewInfo.property
      return {
        ...columnMap[colId],
        id: colId,
        width: colViewInfo.width
      }
    })
  const tableHeadCells = visibleColumns.map(col =>
    <th style={col.width ? { width: `${col.width}px` } : {}}>
      {col.name}
    </th>
  )
  const tableRows = props.rows
    .filter(row => row.properties)
    .map((row, i) => {
      return (
        <tr key={i}>
          {
            visibleColumns.map(col => {
              const elemNameBase = `${blockName}__Cell`
              const data = col.accessor.call(null, row)
              switch (data.type) {
                case "title": {
                  return (
                    <td className={`${elemNameBase}Title`}>
                      <a href={row.uri}>
                        <SemanticStringArray
                          semanticStringArray={row.title} />
                      </a>
                    </td>
                  )
                }
                case "checkbox": {
                  const elemName = `${elemNameBase}Checkbox`
                  const checked = data.value
                  return (
                    <td className={`${elemName} ${checked ?
                      `${elemName}--Yes` : `${elemName}--No`}`}>
                      <div style={
                        checked ? { background: "rgb(46, 170, 220)" } : {}
                      }>
                        {
                          checked ?
                            <svg viewBox="0 0 14 14">
                              <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
                            </svg> :
                            <svg viewBox="0 0 16 16">
                              <path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z" />
                            </svg>
                        }
                      </div>
                    </td>
                  )
                }
                case "select":
                case "multi_select": {
                  const options = data.value
                  return (
                    <td className={`${elemNameBase}Select`}>
                      {
                        options.map(option => {
                          return (
                            <Pill content={option.value}
                              color={option.color} />
                          )
                        })
                      }
                    </td>
                  )
                }
                case "created_by":
                case "last_edited_by": {
                  return (
                    <td className={`${elemNameBase}CreatedEditedBy`}>
                      {data.value}
                    </td>
                  )
                }
                case "created_time":
                case "last_edited_time": {
                  return (
                    <td className={`${elemNameBase}CreatedEditedTime`}>
                      {data.value}
                    </td>
                  )
                }
                default:
                  return (
                    <td className={`${elemNameBase}Text`}>
                      <SemanticStringArray
                        semanticStringArray={data.value} />
                    </td>
                  )
              }
            })
          }
        </tr>
      )
    })

  return (
    <div className={blockName}>
      <table>
        <thead>
          <tr>{tableHeadCells}</tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  )
}

export function Gallery(props: CollectionProps) {
  const blockName = "Gallery"
  const viewFormat = props.view.format
  const imageContain = viewFormat.gallery_cover_aspect
    ? viewFormat.gallery_cover_aspect === "contain" : false

  const galleryItems = props.rows.map(row => {
    return (
      <div id={row.uri} className={`${blockName}__Item`}>
        <a href={row.uri}>
          <div>
            <div>
              <div className={`${blockName}__Item__Cover ${imageContain ?
                `${blockName}__Item__Cover--Contain` : ""}`}>
                {
                  row.cover ? <img src={row.cover} /> : ""
                }
              </div>
              <div className={`${blockName}__Item__Title`}>
                <SemanticStringArray semanticStringArray={row.title} />
              </div>
            </div>
          </div>
        </a>
      </div>
    )
  })

  return (
    <div className={blockName}>
      {galleryItems}
    </div>
  )
}