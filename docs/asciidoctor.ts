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
		(_:string,code:string):string => String(config[code])
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