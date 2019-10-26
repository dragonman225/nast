"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const log_utils_1 = require("../log-utils");
const render_utils_1 = require("../render-utils");
function renderCollection(node) {
    let viewMeta = node.views.find(view => view.id === node.defaultViewId);
    if (typeof viewMeta === 'undefined') {
        log_utils_1.raiseWarning(`Cannot find view of ${node.defaultViewId}`);
        return '';
    }
    let pages = node.blocks;
    let sortQueries = viewMeta.query.sort;
    if (sortQueries != null) {
        let sortFunc = factorySortFunc(sortQueries);
        pages = pages.sort(sortFunc);
    }
    switch (viewMeta.type) {
        case constants_1.COLLECTION_VIEW_TYPES.table:
            return renderTable(node, pages, viewMeta.format);
        case constants_1.COLLECTION_VIEW_TYPES.gallery:
            return renderGallery(node, pages, viewMeta.format);
        default:
            log_utils_1.raiseWarning(`No render function for collection view ${viewMeta.type}`);
            return '';
    }
}
function renderTable(node, pages, viewFormat) {
    const title = render_utils_1.escapeString(node.name);
    // const wrap = (typeof viewFormat.table_wrap === 'undefined')
    //   ? viewFormat.table_wrap : true
    const viewSchema = (viewFormat.table_properties || [])
        .filter(colViewInfo => colViewInfo.visible)
        /**
         * Some collection views have "ghost" properties that don't exist
         * in collection schema.
         */
        .filter(colViewInfo => node.schema[colViewInfo.property])
        .map(colViewInfo => {
        const colId = colViewInfo.property;
        return {
            id: colId,
            width: colViewInfo.width,
            name: node.schema[colId].name,
            type: node.schema[colId].type,
            options: node.schema[colId].options
        };
    });
    const theadHTML = viewSchema
        .map(col => `<th style="${col.width ? `width: ${col.width}px;` : ''}">${render_utils_1.escapeString(col.name)}</th>`);
    const trowsHTML = pages
        /** Skip empty collection items (pages without properties) */
        .filter(page => page.properties)
        .map(page => {
        /**
         * Notion put properties of a collection item in the item's "page" block.
         * They even mixed those properties with "Notion.BlockProperties".
         * Quite confusing and messy.
         */
        const pageProps = page.properties;
        const row = viewSchema.map(clctItemProp => {
            switch (clctItemProp.type) {
                case constants_1.COLLECTION_ITEM_PROPERTY_TYPES.title: {
                    return `<td class="${constants_1.CSS.tableCellContentType.text}"><span>${render_utils_1.escapeString(page.title)}</span></td>`;
                }
                case constants_1.COLLECTION_ITEM_PROPERTY_TYPES.url:
                case constants_1.COLLECTION_ITEM_PROPERTY_TYPES.text: {
                    return `<td class="${constants_1.CSS.tableCellContentType.text}"><span>${render_utils_1.renderTitle(pageProps[clctItemProp.id])}</span></td>`;
                }
                case constants_1.COLLECTION_ITEM_PROPERTY_TYPES.select:
                case constants_1.COLLECTION_ITEM_PROPERTY_TYPES.multiSelect: {
                    const optionNames = pageProps[clctItemProp.id]
                        ? pageProps[clctItemProp.id][0][0].split(',') : [];
                    const optionsHTML = optionNames.map(optionName => {
                        clctItemProp.options = clctItemProp.options;
                        const option = clctItemProp.options.find(o => o.value === optionName);
                        if (!option) {
                            log_utils_1.raiseWarning(`Select option "${optionName}" isn't found on property "${clctItemProp.id}:${clctItemProp.name}".`);
                            return '';
                        }
                        const color = `${constants_1.CSS.tagInTableCellColorPrefix}${option.color}`;
                        return `<span class="${color}">${render_utils_1.escapeString(option.value)}</span>`;
                    });
                    return `<td class="${constants_1.CSS.tableCellContentType.select}">${optionsHTML.join('')}</td>`;
                }
                case constants_1.COLLECTION_ITEM_PROPERTY_TYPES.checkbox: {
                    const checkboxVal = pageProps[clctItemProp.id];
                    const checked = checkboxVal ? checkboxVal[0][0] === 'Yes' : false;
                    const checkedSvg = '<svg viewBox="0 0 14 14" style="width: 12px; height: 12px; display: block; fill: white; flex-shrink: 0; backface-visibility: hidden;" class="check"><polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon></svg>';
                    const unCheckedSvg = '<svg viewBox="0 0 16 16" style="width: 100%; height: 100%; display: block; flex-shrink: 0; backface-visibility: hidden;" class="checkboxSquare"><path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path></svg>';
                    if (checked) {
                        return `<td class="${constants_1.CSS.tableCellContentType.checkbox}"><div class="${constants_1.CSS.checkBoxInTablePrefix}yes">${checkedSvg}</div></td>`;
                    }
                    else {
                        return `<td class="${constants_1.CSS.tableCellContentType.checkbox}"><div class="${constants_1.CSS.checkBoxInTablePrefix}no">${unCheckedSvg}</div></td>`;
                    }
                }
                default:
                    log_utils_1.raiseWarning(`Collection item property type "${clctItemProp.type}" hasn't been implemented.`);
                    return `<td><span class="${constants_1.CSS.tableCellContentType.text}">${render_utils_1.renderTitle(pageProps[clctItemProp.id])}</span></td>`;
            }
        });
        return `<tr>${row.join('')}</tr>`;
    });
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
  </div>`;
    return tableHTML;
}
function renderGallery(node, pages, viewFormat) {
    let title = render_utils_1.escapeString(node.name);
    let imageContain = viewFormat.gallery_cover_aspect
        ? viewFormat.gallery_cover_aspect === 'contain' : false;
    let pagesHTMLArr = pages.map(page => {
        return `\
<div id="${page.id}" class="grid-item">
  <div class="gird-item-content">
    <div>
      <div class="grid-item-cover ${imageContain
            ? 'grid-item-cover--contain' : ''}">
        ${page.cover ? `<img src="${page.cover}" data-src="${page.cover}">` : ''}
      </div>
      <div class="grid-item-title">
        ${render_utils_1.escapeString(page.title)}
      </div>
    </div>
  </div>
</div>`;
    });
    let galleryHTML = `\
<div class="collection-view-gallery">
  <h4>${title}</h4>
  <div class="grid">
    ${pagesHTMLArr.join('')}
  </div>
</div>`;
    return galleryHTML;
}
function factorySortFunc(sortQuery) {
    let directions = sortQuery.map(q => {
        if (q.direction === 'descending')
            return -1;
        else
            return 1;
    });
    return function (a, b) {
        for (let i = 0; i < directions.length; ++i) {
            let field;
            if (sortQuery[i].type === 'title')
                field = 'title';
            else if (sortQuery[i].type === 'created_time')
                field = 'createdTime';
            else
                continue;
            /**
             * Tricks here: when a[field] equals b[field], it does
             * not return, continue to compare the next field.
             */
            if (a[field] > b[field])
                return directions[i];
            if (a[field] < b[field])
                return -(directions[i]);
        }
        return 0;
    };
}
exports.default = renderCollection;
//# sourceMappingURL=collection.js.map