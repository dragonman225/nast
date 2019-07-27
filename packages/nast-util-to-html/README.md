# nast-util-to-html

Render HTML from NAST.

This module takes the output of [`nast-util-from-notionapi (v0.2.0)`](https://github.com/dragonman225/nast-util-from-notionapi/tree/v0.2.0) as input and generate HTML.

 Here is a [demo page](https://nota.netlify.com/test.html). Also you can take a look at [`test/test.html`](https://github.com/dragonman225/nast-util-to-html/blob/master/test/test.html) for the generated HTML.

## Usage

A great starting point is reading [`test/lib.spec.js`](https://github.com/dragonman225/nast-util-to-html/blob/master/test/lib.spec.js), my test script which is less than 50 lines (core code only 5 lines, most of others are just HTML that wrap the generated content).

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
- [x] Video
- [ ] Audio
- [x] Code
- [ ] File

### Advanced Blocks

- [ ] Table of Contents
- [ ] Math Equation
- [ ] Template Button (This seems to be useless when rendered)
- [ ] Breadcrumb
