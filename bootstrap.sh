#!/bin/bash

function build_pkg {
  local pkg_name="$1"
  pushd "packages/$pkg_name"
  yarn build
  popd
}

yarn

build_pkg nast-util-from-notionapi
build_pkg nast-util-to-react
build_pkg notion-util