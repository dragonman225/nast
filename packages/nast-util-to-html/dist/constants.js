"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CSS = {
    blockClass: 'block',
    blockIndentClass: 'block--indent',
    colorClassPrefix: 'color-',
    bgColorClassPrefix: 'background-',
    tableCellContentType: {
        text: 'cell-type-text',
        select: 'cell-type-select',
        checkbox: 'cell-type-checkbox'
    },
    tagInTableCellColorPrefix: 'tag-',
    checkBoxInTablePrefix: 'check-'
};
exports.CSS = CSS;
const NAST_BLOCK_TYPES = {
    page: 'page',
    heading: 'heading',
    toDo: 'to_do',
    toggle: 'toggle',
    columnList: 'column_list',
    column: 'column',
    bulletedListItem: 'bulleted_list_item',
    numberedListItem: 'numbered_list_item',
    bulletedList: 'bulleted_list',
    numberedList: 'numbered_list',
    text: 'text',
    code: 'code',
    equation: 'equation',
    divider: 'divider',
    quote: 'quote',
    callout: 'callout',
    tableOfContents: 'table_of_contents',
    breadcrumb: 'breadcrumb',
    image: 'image',
    video: 'video',
    embed: 'embed',
    audio: 'audio',
    bookmark: 'bookmark',
    collection: 'collection'
};
exports.NAST_BLOCK_TYPES = NAST_BLOCK_TYPES;
const COLOR = {
    gray: 'gray',
    brown: 'brown',
    orange: 'orange',
    yellow: 'yellow',
    green: 'teal',
    blue: 'blue',
    purple: 'purple',
    pink: 'pink',
    red: 'red',
    grayBg: 'gray_background',
    brownBg: 'brown_background',
    orangeBg: 'orange_background',
    yellowBg: 'yellow_background',
    greenBg: 'teal_background',
    blueBg: 'blue_background',
    purpleBg: 'purple_background',
    pinkBg: 'pink_background',
    redBg: 'red_background'
};
exports.COLOR = COLOR;
const COLLECTION_VIEW_TYPES = {
    table: 'table',
    list: 'list',
    gallery: 'gallery',
    board: 'board',
    calendar: 'calendar'
};
exports.COLLECTION_VIEW_TYPES = COLLECTION_VIEW_TYPES;
const COLLECTION_ITEM_PROPERTY_TYPES = {
    title: 'title',
    text: 'text',
    number: '',
    select: 'select',
    multiSelect: 'multi_select',
    date: 'date',
    person: 'person',
    filesAndMedia: 'files_and_media',
    checkbox: 'checkbox',
    url: 'url',
    email: 'email',
    phone: 'phone',
    createdTime: 'created_time'
};
exports.COLLECTION_ITEM_PROPERTY_TYPES = COLLECTION_ITEM_PROPERTY_TYPES;
//# sourceMappingURL=constants.js.map