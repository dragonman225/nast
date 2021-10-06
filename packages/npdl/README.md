# npdl (<ins>N</ins>otion <ins>P</ins>age <ins>D</ins>own<ins>l</ins>oader)

Download Notion pages as self-contained / single-file HTML files.

## Get it!

**npdl** is a command-line app built with Node.js, so we install it with [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

```bash
npm i -g npdl
```

On Linux or macOS, you may need to either add `sudo` before the command or [change the default directory for storing NPM packages](https://npm.github.io/installation-setup-docs/installing/a-note-on-permissions.html).

## Examples

Generate [demo page](https://www.notion.so/Block-Test-1c4d63a8ffc747bea5658672797a595a) to `index.html`.

```bash
npdl index.html
```

Generate Notion's "[What's New?](https://www.notion.so/157765353f2c4705bd45474e5ba8b46c)" page to `index.html`.

```bash
npdl -i="https://www.notion.so/157765353f2c4705bd45474e5ba8b46c" index.html
```

## Optional Flags

There are options to **set a token to access private pages**, **attach a different CSS stylesheet**, and **use an alternate Notion server or proxy**. Feel free to try them out and [report](https://github.com/dragonman225/nast/issues) if they don't work.

```
-h, --help                Print this help message.
-i=<url>, --input=<url>   Specify a page URL.
-t, --tree                Output IR tree as JSON instead of rendering to HTML.
-v, --verbose             Print more messages for debugging.
--legacy-renderer         Use the legacy HTML renderer.
--server=<url>            Use an alternate Notion-compatible server.
--token=<token>           Specify a token for authentication (e.g. to access private pages).
--theme=<path_to_css>     Specify an alternate stylesheet to embed.
```



