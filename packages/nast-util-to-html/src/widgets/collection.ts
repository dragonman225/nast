import Nast from 'notajs-types/nast'
import Notion from 'notajs-types/notion'

import { COLLECTION_VIEW_TYPES, COLLECTION_ITEM_PROPERTY_TYPES, CSS } from '../constants'
import { raiseWarning } from '../log-utils'
import { escapeString, renderTitle } from '../render-utils'

function renderCollection(
  node: Nast.Collection
): string {
  let viewMeta = node.views.find(view => view.id === node.defaultViewId)

  if (typeof viewMeta === 'undefined') {
    raiseWarning(`Cannot find view of ${node.defaultViewId}`)
    return ''
  }

  let pages = node.blocks
  let sortQueries = viewMeta.query.sort
  if (sortQueries != null) {
    let sortFunc = factorySortFunc(sortQueries)
    pages = pages.sort(sortFunc)
  }

  switch (viewMeta.type) {
    case COLLECTION_VIEW_TYPES.table:
      return renderTable(node, pages, viewMeta.format)
    case COLLECTION_VIEW_TYPES.gallery:
      return renderGallery(node, pages, viewMeta.format)
    default:
      raiseWarning(`No render function for collection view ${viewMeta.type}`)
      return ''
  }
}

function renderTable(
  node: Nast.Collection,
  pages: Nast.Page[],
  viewFormat: Notion.CollectionViewFormat
): string {
  const title = escapeString(node.name)

  const viewSchema = (viewFormat.table_properties || [])
    .filter(colViewInfo => colViewInfo.visible)
    .map(colViewInfo => {
      const colId = colViewInfo.property

      return {
        id: colId,
        width: colViewInfo.width,
        name: node.schema[colId].name,
        type: node.schema[colId].type,
        options: node.schema[colId].options
      }
    });

  const theadHTML = viewSchema
    .map(col => `<th style="${col.width ? `width: ${col.width}px;` : ''}">${escapeString(col.name)}</th>`)

  const trowsHTML = pages
    /** Skip empty collection items (pages without properties) */
    .filter(page => page.properties)
    .map(page => {
      /**
       * Notion put properties of a collection item in the item's "page" block. 
       * They even mixed those properties with "Notion.BlockProperties". 
       * Quite confusing and messy.
       */
      const pageProps = page.properties as { [key: string]: Notion.StyledString[] }
      const row = viewSchema.map(clctItemProp => {
        switch (clctItemProp.type) {
          case COLLECTION_ITEM_PROPERTY_TYPES.title: {
            return `<td>${escapeString(page.title)}</td>`
          }
          case COLLECTION_ITEM_PROPERTY_TYPES.text: {
            return `<td>${renderTitle(pageProps[clctItemProp.id])}</td>`
          }
          case COLLECTION_ITEM_PROPERTY_TYPES.select:
          case COLLECTION_ITEM_PROPERTY_TYPES.multiSelect: {
            const optionNames = pageProps[clctItemProp.id]
              ? pageProps[clctItemProp.id][0][0].split(',') : []
            const optionsHTML = optionNames.map(optionName => {
              const option = clctItemProp.options.find(o => o.value === optionName)

              if (!option) {
                raiseWarning(`Select option "${optionName}" isn't found on property "${clctItemProp.id}:${clctItemProp.name}".`)
                return ''
              }

              const color = `${CSS.collectionItemPropTypeSelectColorPrefix}${option.color}`
              return `<span class="${CSS.collectionItemPropTypeSelect} ${color}">${escapeString(option.value)}</span>`
            })

            return `<td>${optionsHTML.join('')}</td>`
          }
          default:
            raiseWarning(`Collection item property type "${clctItemProp.type}" hasn't been implemented.`)
            return `<td>${renderTitle(pageProps[clctItemProp.id])}</td>`
        }
      })

      return `<tr>${row.join('')}</tr>`
    })

  const tableHTML = `\
  <div class="collection-view-table">
    <h4>${title}</h4>
    <table style="width: 100%;">
      <thead>
        <tr>${theadHTML.join('')}</tr>
      </thead>
      <tbody>
        ${trowsHTML.join('\n')}
      </tbody>
    </table>
  </div>`

  return tableHTML
}

function renderGallery(
  node: Nast.Collection,
  pages: Nast.Page[],
  viewFormat: Notion.CollectionViewFormat
): string {
  let title = escapeString(node.name)
  let imageContain = viewFormat.gallery_cover_aspect
    ? viewFormat.gallery_cover_aspect === 'contain' : false

  let pagesHTMLArr = pages.map(page => {
    return `\
<div id="${page.id}" class="gallery__grid__item">
  <div class="gallery__gird__item__content">
    <div>
      <div class="gallery__grid__item__cover ${imageContain
        ? 'gallery__grid__item__cover--contain' : ''}">
        ${page.cover ? `<img src="${page.cover}" data-src="${page.cover}">` : ''}
      </div>
      <div class="gallery__grid__item__title">
        ${escapeString(page.title)}
      </div>
    </div>
  </div>
</div>`
  })

  let galleryHTML = `\
<div class="gallery">
  <h4>${title}</h4>
  <div class="gallery__grid">
    ${pagesHTMLArr.join('')}
  </div>
</div>`

  return galleryHTML
}

function factorySortFunc(sortQuery: Notion.SortQuery[]) {
  let directions = sortQuery.map(q => {
    if (q.direction === 'descending') return -1
    else return 1
  })

  return function (a: Nast.Page, b: Nast.Page): number {
    for (let i = 0; i < directions.length; ++i) {
      let field: 'title' | 'createdTime'

      if (sortQuery[i].type === 'title') field = 'title'
      else if (sortQuery[i].type === 'created_time') field = 'createdTime'
      else continue

      /**
       * Tricks here: when a[field] equals b[field], it does
       * not return, continue to compare the next field.
       */
      if (a[field] > b[field]) return directions[i]
      if (a[field] < b[field]) return -(directions[i])
    }
    return 0
  }
}

export default renderCollection