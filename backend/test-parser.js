const { parseJavaScript } = require("./src/utils/parser.utils");

const code = `
function add(a, b) {
    return a + b;
}
    function add(a, b) {
    return a + b;
}
`;

const ast = parseJavaScript(code);

console.log(ast.type);
console.log(ast.program.body.length);
console.log(ast.program.body[2].type);