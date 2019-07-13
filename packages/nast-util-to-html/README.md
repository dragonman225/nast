# notionast-util-to-html

Render HTML from NotionAST.

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
- [x] Bulleted LIst
- [ ] Numbered List (Renders every item with number 1)
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
- [ ] Code
- [ ] File

### Advanced Blocks

- [ ] Table of Contents
- [ ] Math Equation
- [ ] Template Button (This seems to be useless when rendered)
- [ ] Breadcrumb