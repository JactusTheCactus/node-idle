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
EX=( \
	linux \
	macos \
	win.exe \
)
for e in "${EX[@]}"; do
	for i in *-$e; do
		rm -rf $i
	done
done
pkg script.js --targets latest-linux,latest-win,latest-macos
if flag local; then
	chmod +x idle-linux
	./idle-linux
fi