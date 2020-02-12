const COLOR = {
  gray: "gray",
  brown: "brown",
  orange: "orange",
  yellow: "yellow",
  green: "green", // for tags
  teal: "teal", // for blocks, actually green
  blue: "blue",
  purple: "purple",
  pink: "pink",
  red: "red",
  grayBg: "gray_background",
  brownBg: "brown_background",
  orangeBg: "orange_background",
  yellowBg: "yellow_background",
  tealBg: "teal_background",
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
  COLOR,
  COLLECTION_VIEW_TYPES,
  COLLECTION_ITEM_PROPERTY_TYPES
}