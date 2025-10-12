#!/usr/bin/env bash
set -euo pipefail
flag() {
	for f in "$@"; do
		[[ -e ".flags/$f" ]] || return 1
	done
}
if ! flag local; then
	npm install -g pkg
fi
pkg . --targets latest-linux-x64,latest-win-x64,latest-macos-x64