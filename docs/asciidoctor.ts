import asciidoctor from '@asciidoctor/core'
const processor = asciidoctor()
import fs from 'fs';
function compile(
	adoc: string,
	out: string,
	opt: Record<string, (string | boolean)> = {},
	reg: Array<[RegExp, any]> = []
) {
	const config = {
		game: {
			title: "Untitled"
		}
	}
	opt.safe = "unsafe"
	reg.push([
		/\{\{\s*(.*?)\s*\}\}/g,
		(_,key) => {
			const keys = key.split(".")
			let value = config
			for (const k of keys) {
				if (value && k in value) {
					value = value[k]
				} else {
					value = `{{ ${key} }}`
					break
				}
			}
			return String(value)
		}
	])
	const doc = fs.readFileSync(adoc, "utf8");
	let compiled = processor.convert(doc, opt) as string
	reg.forEach(([r, s]) => {
		compiled = compiled.replace(r, s);
	})
	fs.writeFileSync(`../${out}`, compiled);
}
const tasks: Array<[
	string,
	string,
	Record<string, (string | boolean)>?,
	Array<[RegExp, string]>?
]> = [
		[
			"page.adoc",
			"index.html",
			{ standalone: true }
		],
		[
			"page.adoc",
			"README.md",
			{ standalone: false }
		]
	]
tasks.forEach(i => compile(...i))