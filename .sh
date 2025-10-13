#!/usr/bin/env bash
set -euo pipefail
flag() {
	for f in "$@"; do
		[[ -e ".flags/$f" ]] || return 1
	done
}
SCRIPT=app
EXEC=$SCRIPT-linux
if ! flag local; then
	npm install -g pkg
fi
EX=( \
	linux \
	macos \
	win.exe \
)
for e in "${EX[@]}"; do
	for i in "*-$e"; do
		rm -rf "$i"
	done
done
pkg "$SCRIPT.js" --targets latest-linux,latest-win,latest-macos
if ! flag local; then
	chmod +x "$EXEC"
	"./$EXEC"
fi