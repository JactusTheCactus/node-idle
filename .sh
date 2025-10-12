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
pkg . --targets node20-linux-x64,node20-win-x64,node20-macos-x64