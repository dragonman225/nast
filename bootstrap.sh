#!/bin/bash

function npm_build {
  local pkg_name="$1"
  pushd "packages/$pkg_name"
  npm run build
  popd
}

lerna bootstrap

npm_build nast-util-from-notionapi
npm_build nast-util-to-html
npm_build nast-util-to-react
npm_build notion-util