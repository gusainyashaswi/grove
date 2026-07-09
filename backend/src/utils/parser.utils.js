const parser = require("@babel/parser");

function parseJavaScript(code) {

    return parser.parse(code, {
        sourceType: "unambiguous"
    });

}

module.exports={
    parseJavaScript
}