import { config } from "../data.js"
import fs from "fs"
import asciidoctor from "@asciidoctor/core"
const processor = asciidoctor()
import TurndownService from "turndown"
function compile(
	out: string,
	ext: string,
	reg: Array<[RegExp, any]> = []
) {
	reg.push([
		/\{\{\s*(.*?)\s*\}\}/g,
		(_: string, key: string) => {
			const keys = key.split(".")
			return keys.reduce(
				(v, k) => v?.[k], config
			) ?? `{{ ${key} }}`
		}
	])
	const doc = fs.readFileSync("page.adoc", "utf8");
	let opt: Record<string, string | boolean> = {
		safe: "unsafe"
	}
	function c() {
		let comp = String(processor.convert(doc, opt))
		reg.forEach(([r, s]) => {
			comp = comp.replace(r, s)
		})
		return comp
	}
	let compiled: string
	switch (ext) {
		case "md":
			opt.standalone = false
			const turndownService = new TurndownService({
				headingStyle: "atx",
				codeBlockStyle: "fenced"
			})
			turndownService.addRule("fencedCodeWithLanguage", {
				filter: "code",
				replacement: function (content: string, node) {
					const el = node as HTMLElement
					const className = el.getAttribute('class') || '';
					const languageMatch = className.match(/language-(\S+)/);
					const language = languageMatch ? languageMatch[1] : '';
					return [
						"```" + language,
						content,
						"```"
					].join("\n")
				}
			})
			compiled = turndownService.turndown(c())
			break
		case "html":
			opt.standalone = true
			compiled = c().replace(
				/(?<=language-)(t(?:ype)?s(?:cript)?)(?= hljs)/g,
				(_, match) => {
					switch (match) {
						case "ts": return "js"
						case "typescript": return "javascript"
					}
				}
			)
			break
	}
	fs.writeFileSync(`../${out}.${ext}`, compiled);
}
const tasks: Array<[
	string,
	string
]> = [
		["index", "html"],
		["README", "md"]
	]
tasks.forEach(i => compile(...i))