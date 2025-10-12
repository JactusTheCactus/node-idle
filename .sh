#!/usr/bin/env bash
set -euo pipefail
flag() {
	for f in "$@"; do
		[[ -e ".flags/$f" ]] || return 1
	done
}
pkg . --targets node24-linux-x64,node24-win-x64,node24-macos-x64