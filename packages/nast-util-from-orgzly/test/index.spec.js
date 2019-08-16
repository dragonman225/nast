const path = require('path')
const fs = require('fs')

const { renderToHTML } = require('../../nast-util-to-html')
const { orgStringToNast } = require('../')

const renderOpts = {
  contentOnly: true,
  bypassPreRenderTransform: true
}

const org = fs.readFileSync(path.join(__dirname, 'Test.org'), { encoding: 'utf-8' })
const nast = orgStringToNast(org)
fs.writeFileSync(path.join(__dirname, 'Test.json'), JSON.stringify(nast), { encoding: 'utf-8' })
const contentHTML = renderToHTML(nast, renderOpts)
const page = renderPage('Test', contentHTML)
fs.writeFileSync(path.join(__dirname, 'Test.html'), page, { encoding: 'utf-8' })

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
    <link rel="stylesheet" type="text/css" href="css/theme.css">
    <link rel="stylesheet" type="text/css" href="css/debug.css">
    <style>
      :root {
        font-size: 16px;
      }
      .container {
        padding: 1.5em;
        max-width: 8.3in;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${pageTitle}</h1>
      ${contentHTML}
    </div>
  </body>
</html>`
  return pageHTML
}