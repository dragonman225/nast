const fs = require("fs")
const path = require("path")
const { renderToHTML } = require("..")
const tree = require("./test.json")

const timeStart = Date.now()
const html = `\
<html>
<head>
  <style>
    .text, .heading, .code {
      white-space: pre-wrap;
    }
  </style>
</head>
<body>${renderToHTML(tree)}</body>
</html>
`
const timeEnd = Date.now()
fs.writeFileSync(path.join(__dirname, "test.html"), html, { encoding: "utf-8" })
console.log(`${timeEnd - timeStart} ms`)