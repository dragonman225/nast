const fs = require('fs')
const path = require('path')
const { renderToHTML } = require('../src')

const tree = require('./testdata')

module.exports = test

function test() {
  const content = renderToHTML(tree)
  const html = renderPage(tree.title, content)

  fs.writeFileSync(path.join(__dirname, 'test.html'), html)
}

function renderPage(pageTitle, contentHTML) {
  const pageHTML = `\
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <!-- Chrome, Firefox OS and Opera Status Bar Color -->
    <meta name="theme-color" content="#FFFFFF">
    <title>${pageTitle}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css" integrity="sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/prism.css">
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <link rel="stylesheet" type="text/css" href="css/notion-color.css">
    <link rel="stylesheet" type="text/css" href="css/notablog.css">
    <link rel="stylesheet" type="text/css" href="css/theme.css">
    <link rel="stylesheet" type="text/css" href="css/debug.css">
    <style>
      :root {
        font-size: 16px;
      }
      .nast-document {
        padding: 1.5em 96px;
        max-width: 8.3in;
        margin: 0 auto;
      }
      .nast-document-full {
        padding: 1.5em 96px;
        max-width: 100%;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    ${contentHTML}
  </body>
</html>`
  return pageHTML
}