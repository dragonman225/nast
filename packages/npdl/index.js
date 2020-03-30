#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { createAgent } = require("notionapi-agent")
const { getOnePageAsTree } = require("nast-util-from-notionapi")
const { renderToHTML: renderToHTMLLegacy } = require("nast-util-to-html")
const { renderToHTML } = require("nast-util-to-react")
const { getPageIDFromPageURL } = require("notion-util")
const { parseArgs, parseFlagVal, FlagTypes } = require("@dnpr/cli")

main()

async function main() {
  try {

    const { args, flags } = parseArgs(process.argv)
    const printHelp = parseFlagVal(flags, "(-h|--help)", FlagTypes.boolean, false)
    const pageUrl = parseFlagVal(flags, "(-i|--input)", FlagTypes.string,
      "https://www.notion.so/Block-Test-1c4d63a8ffc747bea5658672797a595a")
    const pageId = getPageIDFromPageURL(pageUrl)
    const outputTree = parseFlagVal(flags, "(-t|--tree)", FlagTypes.boolean, false)
    const verbose = parseFlagVal(flags, "(-v|--verbose)", FlagTypes.boolean, false)
    const useLegacyRenderer = parseFlagVal(flags, "--legacy-renderer", FlagTypes.boolean, false)
    const server = parseFlagVal(flags, "--server", FlagTypes.string, undefined)
    const token = parseFlagVal(flags, "--token", FlagTypes.string, undefined)
    const themeCSSPath = parseFlagVal(flags, "--theme", FlagTypes.string,
      path.join(__dirname, "node_modules/nast-util-to-react/test/theme.css"))
    const output = args[0]

    if (!output || printHelp) {
      console.log(`
Usage: npdl <output_file>

Optional Flags:

-h, --help                Print this help message.
-i=<url>, --input=<url>   Specify a page URL.
-t, --tree                Output IR tree as JSON instead of rendering to HTML.
-v, --verbose             Print more messages for debugging.
--legacy-renderer         Use the legacy HTML renderer.
--server=<url>            Use an alternative Notion-compatible server.
--token=<token>           Specify a token for authentication (to access private pages).
--theme=<path_to_css>     Specify a theme stylesheet to embed.`)
      process.exit(0)
    }

    const notion = createAgent({ token, debug: verbose, server })
    const page = await getOnePageAsTree(pageId, notion)
    if (outputTree) {
      fs.writeFileSync(output, JSON.stringify(page))
      process.exit(0)
    }

    const html = useLegacyRenderer ?
      renderToHTMLLegacy(page, { renderRoot: true }) : renderToHTML(page)
    const title = (page.title || page.name).reduce((result, partial, index) => {
      if (index === 0) result += partial[0]
      else result += (" " + partial[0])
      return result
    }, "")
    fs.writeFileSync(
      output,
      useLegacyRenderer ? renderPageLegacy(title, html) : renderPage(title, html, themeCSSPath)
    )

  } catch (error) {
    console.log(error)
  }
}

function renderPageLegacy(pageTitle, contentHTML) {
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
      body {
        width: 8.3in;
        max-width: calc((100vw - 15px) - 192px);
        margin: 100px auto;
        padding: 0 50px;
      }
    </style>
  </head>
  <body>
    ${contentHTML}
  </body>
</html>`
  return pageHTML
}

function renderPage(pageTitle, contentHTML, themeCSSPath) {
  const themeCSS = fs.readFileSync(themeCSSPath, { encoding: 'utf-8' })
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
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism.min.css">
    <style>${themeCSS}</style>
    <style>
      :root {
        font-size: 16px;
      }
      .PageRoot {
        width: 900px;
        max-width: 100%;
        margin: 0 auto;
        padding: 0px 96px 30vh;
      }
    </style>
  </head>
  <body>
    ${contentHTML}
  </body>
</html>`
  return pageHTML
}