import asciidoctor from '@asciidoctor/core'
const processor = asciidoctor()
import fs from 'fs';
function compile(
	adoc: string,
	out: string,
	opt: Record<string, (string | boolean)> = {},
	reg: Array<[RegExp, string]> = []
) {
	const game_name:string = "Untitled Idle"
	opt.safe = "unsafe"
	reg.push([
		/\{\{(.*?)\}\}/g,
		(_:string,code:string):string => String(eval(code))
	])
	const doc = fs.readFileSync(adoc, "utf8");
	console.log(out, opt)
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