import asciidoctor from '@asciidoctor/core';
const processor = asciidoctor();
import fs from 'fs';
function compile(adoc, out, opt = {}, reg = []) {
    opt.safe = "unsafe";
    reg.push([
        /\{\{game_name\}\}/g,
        "Idle Game"
    ]);
    const doc = fs.readFileSync(adoc, "utf8");
    console.log(out, opt);
    let compiled = processor.convert(doc, opt);
    reg.forEach(([r, s]) => {
        compiled = compiled.replace(r, s);
    });
    fs.writeFileSync(`../${out}`, compiled);
}
const tasks = [
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
];
tasks.forEach(i => compile(...i));
