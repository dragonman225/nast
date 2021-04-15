const fs = require("fs")
const path = require("path")
const { renderToHTML } = require("..")

const testDataPath = path.join(__dirname, "block-test.json")
const outputPath = path.join(__dirname, "index.html")

if (!fs.existsSync(testDataPath)) {
  console.log(`"${testDataPath}" does not exist. Execute "npm run update-test-data" to generate one.`)
  process.exit();
}

const tree = require(testDataPath)

const timeStart = Date.now()
const html = `\
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet">
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
fs.writeFileSync(outputPath, html, { encoding: "utf-8" })
console.log(`${timeEnd - timeStart} ms`)