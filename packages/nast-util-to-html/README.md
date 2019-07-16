# notionast-util-to-html

Render HTML from NotionAST.

## Usage

Require [`notionast-util-from-notionapi-v0.2.0`](https://github.com/dragonman225/notionast-util-from-notionapi/tree/v0.2.0)

See `test/test.html` for example result.

See `test/lib.spec.js` for usage details.

## Supported Blocks

### Fundamental

- [x] Block Color
- [x] Column & Column List
  - [x] Responsive : Wrap into one column per row when viewport width < 680px

### Basic Blocks

- [x] Text
  - [x] Color & Background
  - [x] Style : Bold, Italic, Strike, Code, Link
  - [x] Nested
- [ ] Embeded Sub-page
- [x] Heading 1, 2, 3
- [x] Bulleted List
- [x] Numbered List
- [x] Toggle List
- [x] Quote
- [x] Divider
- [x] Callout
### Inline

- [ ] Mention a Person (Directly renders `id` of the user)
- [ ] Mention a Page (Directly renders `id` of the page)
- [ ] Date or Reminder (Directly renders raw data)

### Database

Not yet supported

### Media

- [x] Image
- [x] Web Bookmark
- [ ] Video
- [ ] Audio
- [x] Code
- [ ] File

### Advanced Blocks

- [ ] Table of Contents
- [ ] Math Equation
- [ ] Template Button (This seems to be useless when rendered)
- [ ] Breadcrumb
