#!/usr/bin/env bash
set -euo pipefail
flag() {
	for f in $@; do
		[[ -e ".flags/$f" ]] || return 1
	done
}
ymlToJson() {
	yq -o=json eval $1.yml > $1.json
}
SCRIPT=app
BIN=bin
EXEC=$BIN/$SCRIPT-linux
if ! flag local; then
	for i in pkg typescript asciidoctor; do
		npm install -g $i
	done
fi
if [ -f *.yaml ]; then
	for f in *.yaml; do
		mv -- "$f" "${f%.yaml}.yml"
	done
fi
ymlToJson tsconfig
tsc
asciidoctor page.adoc -o=README.md -s
asciidoctor page.adoc -o=index.html
if flag local; then
	if flag build; then
		rm -rf $BIN/*
		TARGETS=
		for i in linux macos win; do
			TARGETS+=latest-${i%.exe},
		done
		pkg $SCRIPT.js \
			--targets ${TARGETS%,} \
			--out-path $BIN
		chmod +x $EXEC
	fi
	if flag log; then
		rm -rf $SCRIPT.log
		./$EXEC > $SCRIPT.log
	# else
		# ./$EXEC
	fi
fi