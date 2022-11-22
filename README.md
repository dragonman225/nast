# NAST

A block-based intermediate representation for document-like content.

![](assets/cover.png)

## Packages

| Name                                                         | Description                                                  | Status           |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :--------------- |
| [nast-types](./packages/nast-types)                          | A TypeScript type definition module to specify data models for intermediate representation of data. | Experimental     |
| [nast-util-from-notionapi](./packages/nast-util-from-notionapi) | Import data from a [Notion](https://www.notion.so/) page.    | Stable           |
| [nast-util-from-orgzly](./packages/nast-util-from-orgzly)    | Import data from an org-mode file exported by [Orgzly](http://www.orgzly.com/). | Proof of Concept |
| [nast-util-to-react](./packages/nast-util-to-react)          | Render data to `JSX.Element` or HTML. (Preferred)            | Stable           |
| [npdl](./packages/npdl)                                      | Download Notion pages as self-contained / single-file HTML files. | Stable           |
| nast-util-to-svelte                                          | Render data to HTML using Svelte.                            | -                |

* Stability : **Stable** > **Experimental** > **Proof of Concept**

## Development

### Clone the repo and `cd` into it

```bash
git clone https://github.com/dragonman225/nast.git && cd nast
```

### Install dependencies

* `yarn` (required)

  ```bash
  npm i -g yarn
  ```

  We use `yarn` to manage package dependencies.

* `lerna` (required)

  ```bash
  npm i -g lerna@6.0.3
  ```

  This project is a monorepo managed with [lerna](https://github.com/lerna/lerna). If you haven't heard of it before, [this tutorial](https://github.com/reggi/lerna-tutorial) is a good starting point.

* `typedoc` (optional)

  ```bash
  npm i -g typedoc
  ```

  `typedoc` needs to be available in the command-line for reference document generation.

* [Graphviz](https://www.graphviz.org/) (optional)

  ```bash
  # For Arch Linux
  pacman -S graphviz
  
  # For macOS via Homebrew
  brew install graphviz 
  ```

  `dot` needs to available in the command-line for dependency graph generation.

### Setup the project

```bash
yarn # Install and link dependencies
npx lerna run build # Build all packages
```

### Testing

* Test the overall functionality with `npdl`.

  Download a Notion page and render it to HTML. Use the CSS theme at `packages/nast-util-to-react/src/theme.css`.

  ```bash
  node packages/npdl/index.js -i=<notion_page_url> output.html
  ```

  Use an external theme.

  ```bash
  node packages/npdl/index.js -i=<notion_page_url> --theme=<path_to_css> output.html
  ```

  Just download a Notion page without rendering to HTML.

  ```bash
  node packages/npdl/index.js -i=<notion_page_url> --tree output.json
  ```

  `npdl` has more features, which can be listed with

  ```bash
  node packages/npdl/index.js
  ```

  You can also install `npdl` globally.

  ```bash
  cd packages/npdl && npm i -g .
  ```

* Each package may have its own test suite, which is not covered here.

### Contributing to NAST

* [Contributing to the project](CONTRIBUTING.md)

### Troubleshooting

* `npx nx graph` to check if the packages are correctly linked.
  * If a package is published with a new version, don't forget to update other packages that are using it.