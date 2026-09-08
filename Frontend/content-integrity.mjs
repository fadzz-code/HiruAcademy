import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import ts from "typescript";

const baseline = "745d3ea1eca0051e7e5f45b6f79eb157e39b0f12";
const files = execFileSync("git", ["ls-tree", "-r", "--name-only", baseline, "Frontend/src"], { cwd: "..", encoding: "utf8" }).trim().split("\n").filter((file) => /\.tsx?$/.test(file));
let strings = 0;
let controls = 0;
function fingerprint(file, source) {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const result = [];
  function visit(node) {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.endsWith(".css")) return;
    if (ts.isJsxAttribute(node) && ["className", "style"].includes(node.name.getText(tree))) return;
    if (ts.isStringLiteralLike(node) || ts.isNumericLiteral(node) || ts.isJsxText(node)) {
      const text = ts.isJsxText(node) ? node.text.replace(/\s+/g, " ").trim() : node.text;
      if (text) result.push([ts.SyntaxKind[node.kind], text]);
    }
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(tree);
      if (["a", "Link", "button", "input", "select", "textarea", "ruby", "rt", "p", "h1", "h2", "h3"].includes(tag)) result.push(["element", tag]);
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return result;
}
for (const file of files) {
  const before = fingerprint(file, execFileSync("git", ["show", `${baseline}:${file}`], { cwd: "..", encoding: "utf8" }));
  const after = fingerprint(file, readFileSync(`../${file}`, "utf8"));
  if (file === "Frontend/src/components/flashcard-session.tsx") {
    const timing = after.find(([kind, value]) => kind === "FirstLiteralToken" && value === "300");
    assert(timing, "Flashcard midpoint must remain 300ms for exact 600ms flip");
    timing[1] = "175";
  }
  assert.deepEqual(after, before, `Content or nonvisual literal changed: ${file}`);
  strings += before.filter(([kind]) => kind !== "element").length;
  controls += before.filter(([kind]) => kind === "element").length;
}
console.log(`Integrity PASS: ${files.length} source files, ${strings} literals/text nodes, ${controls} semantic element occurrences; baseline ${baseline}`);
