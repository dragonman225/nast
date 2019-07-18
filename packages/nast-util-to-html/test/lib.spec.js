const fs = require('fs')
const path = require('path')
const { toHTML } = require('../lib')

const tree = require('./testdata')

module.exports = test

function test() {
  let content = toHTML(tree)
  let html = renderPage(tree.data.title[0][0], content)

  fs.writeFileSync(path.join(__dirname, 'test.html'), html)
}

function renderPage(pageTitle, contentHTML) {
  let pageHTML = `\
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
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <link rel="stylesheet" type="text/css" href="css/notion-color.css">
    <link rel="stylesheet" type="text/css" href="css/theme.css">
    <link rel="stylesheet" type="text/css" href="css/debug.css">
    <style>
      .container {
        padding: 1.5em;
        max-width: 8.3in;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div class="container">
      ${contentHTML}
    </div>
  </body>
</html>`
  return pageHTML
}