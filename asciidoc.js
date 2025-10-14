"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asciidoctor_1 = __importDefault(require("asciidoctor"));
const processor = (0, asciidoctor_1.default)();
const doc = processor.convertFile("./README.adoc");
