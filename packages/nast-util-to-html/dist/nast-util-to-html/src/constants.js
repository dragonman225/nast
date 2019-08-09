"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CSS = {
    blockClass: 'block',
    blockIndentClass: 'block--indent',
    colorClassPrefix: 'color-',
    bgColorClassPrefix: 'background-'
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
const collectionViewTypeMap = {
    table: 'table',
    list: 'list',
    gallery: 'gallery',
    board: 'board',
    calendar: 'calendar'
};
exports.collectionViewTypeMap = collectionViewTypeMap;
//# sourceMappingURL=constants.js.map