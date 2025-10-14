"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asciidoctor_1 = require("asciidoctor");
const processor = (0, asciidoctor_1.default)();
const doc = processor.convertFile("./index.adoc");
