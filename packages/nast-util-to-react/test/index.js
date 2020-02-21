const fs = require("fs")
const path = require("path")
const { renderToHTML } = require("..")
const tree = require("./test.json")

const timeStart = Date.now()
const html = `\
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism.min.css">
  <link rel="stylesheet" type="text/css" href="theme.css">
  <style>
    .PageRoot {
      width: 900px;
      max-width: 100%;
      margin: 0 auto;
      padding: 0px 96px 30vh;
    }
  </style>
</head>
<body>${renderToHTML(tree)}</body>
</html>
`
const timeEnd = Date.now()
fs.writeFileSync(path.join(__dirname, "index.html"), html, { encoding: "utf-8" })
console.log(`${timeEnd - timeStart} ms`)