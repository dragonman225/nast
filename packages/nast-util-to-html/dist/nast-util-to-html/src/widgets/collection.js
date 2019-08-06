"use strict";
const constants_1 = require("./constants");
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
        case constants_1.viewTypeMap.gallery:
            return renderGallery(node, pages);
        default:
            log_utils_1.raiseWarning(`No renderer for view type ${viewMeta.type}`);
            return '';
    }
}
function renderGallery(node, pages) {
    let title = node.name;
    let pagesHTMLArr = pages.map(page => {
        return `\
<div id="${page.id}" class="gallery__grid__item">
  <div class="gallery__gird__item__content">
    <div>
      <div class="gallery__grid__item__cover">
        ${page.cover ? `<img src="${page.cover}">` : ''}
      </div>
      <div class="gallery__grid__item__title">
        ${render_utils_1.escapeString(page.title)}
      </div>
    </div>
  </div>
</div>`;
    });
    let galleryHTML = `\
<div class="gallery">
  <h4>${title}</h4>
  <div class="gallery__grid">
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
                return 0;
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
module.exports = renderCollection;
//# sourceMappingURL=collection.js.map