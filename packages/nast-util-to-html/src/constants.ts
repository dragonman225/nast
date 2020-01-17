const CSS = {
  blockClass: "block",
  blockIndentClass: "block--indent",
  colorClassPrefix: "color-",
  bgColorClassPrefix: "background-",
  tableCellContentType: {
    text: "cell-type-text",
    select: "cell-type-select",
    checkbox: "cell-type-checkbox"
  },
  tagInTableCellColorPrefix: "tag-", // temp: borrow from notablog
  checkBoxInTablePrefix: "check-"
}

const NAST_BLOCK_TYPES = {
  page: "page",
  heading: "heading",
  toDo: "to_do",
  toggle: "toggle",
  columnList: "column_list",
  column: "column",
  bulletedListItem: "bulleted_list",
  numberedListItem: "numbered_list",
  bulletedList: "bulleted_list_wrapper",
  numberedList: "numbered_list_wrapper",
  text: "text",
  code: "code",
  equation: "equation",
  divider: "divider",
  quote: "quote",
  callout: "callout",
  tableOfContents: "table_of_content",
  breadcrumb: "breadcrumb",
  image: "image",
  video: "video",
  embed: "embed",
  audio: "audio",
  bookmark: "bookmark",
  collectionInline: "collection_inline",
  collectionPage: "collection_page"
}

const COLOR = {
  gray: "gray",
  brown: "brown",
  orange: "orange",
  yellow: "yellow",
  green: "teal",
  blue: "blue",
  purple: "purple",
  pink: "pink",
  red: "red",
  grayBg: "gray_background",
  brownBg: "brown_background",
  orangeBg: "orange_background",
  yellowBg: "yellow_background",
  greenBg: "teal_background",
  blueBg: "blue_background",
  purpleBg: "purple_background",
  pinkBg: "pink_background",
  redBg: "red_background"
}

const COLLECTION_VIEW_TYPES = {
  table: "table",
  list: "list",
  gallery: "gallery",
  board: "board",
  calendar: "calendar"
}

const COLLECTION_ITEM_PROPERTY_TYPES = {
  title: "title",
  text: "text",
  number: "",
  select: "select",
  multiSelect: "multi_select",
  date: "date",
  person: "person",
  filesAndMedia: "files_and_media",
  checkbox: "checkbox",
  url: "url",
  email: "email",
  phone: "phone",
  createdTime: "created_time"
}

export {
  CSS,
  NAST_BLOCK_TYPES,
  COLOR,
  COLLECTION_VIEW_TYPES,
  COLLECTION_ITEM_PROPERTY_TYPES
}