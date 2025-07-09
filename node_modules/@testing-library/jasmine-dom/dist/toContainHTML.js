"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toContainHTML = toContainHTML;
var _utils = require("./utils");
var _printers = require("./printers");
/**
 * @see https://github.com/testing-library/jest-dom/blob/main/src/__tests__/to-contain-html.js
 */

function getNormalizedHtml(container, htmlText) {
  var div = container.ownerDocument.createElement('div');
  div.innerHTML = htmlText;
  return div.innerHTML;
}
function toContainHTML() {
  return {
    compare: function compare(htmlElement, htmlText) {
      (0, _utils.checkHtmlElement)(htmlElement);
      if (typeof htmlText !== 'string') {
        throw new Error((0, _printers.printSecWarning)("".concat((0, _printers.printError)('FAILED'), ".toContainHTML() expects a string value, got ").concat((0, _printers.printWarning)(htmlText))));
      }
      var pass = htmlElement.outerHTML.includes(getNormalizedHtml(htmlElement, htmlText));
      return {
        pass: pass,
        message: pass ? "".concat((0, _printers.printSuccess)('PASSED'), " ").concat((0, _printers.printSecSuccess)("Expected: ".concat((0, _printers.printSuccess)("'".concat(htmlText, "'")), ". Received: ").concat((0, _printers.printSuccess)(htmlElement.outerHTML)))) : "".concat((0, _printers.printError)('FAILED'), " ").concat((0, _printers.printSecError)("Expected: ".concat((0, _printers.printError)("'".concat(htmlText, "'")), ". Received: ").concat((0, _printers.printSuccess)(htmlElement.outerHTML))))
      };
    },
    negativeCompare: function negativeCompare(htmlElement, htmlText) {
      (0, _utils.checkHtmlElement)(htmlElement);
      if (typeof htmlText !== 'string') {
        throw new Error((0, _printers.printSecWarning)("".concat((0, _printers.printError)('FAILED'), ".not.toContainHTML() expects a string value, got ").concat((0, _printers.printWarning)(htmlText))));
      }
      var pass = !htmlElement.outerHTML.includes(getNormalizedHtml(htmlElement, htmlText));
      return {
        pass: pass,
        message: pass ? "".concat((0, _printers.printSuccess)('PASSED'), " ").concat((0, _printers.printSecSuccess)("Expected: ".concat((0, _printers.printError)("'".concat(htmlText, "'")), ". Received: ").concat((0, _printers.printSuccess)(htmlElement.outerHTML)))) : "".concat((0, _printers.printError)('FAILED'), " ").concat((0, _printers.printSecError)("Expected: ".concat((0, _printers.printSuccess)("'".concat(htmlText, "'")), ". Received: ").concat((0, _printers.printSuccess)(htmlElement.outerHTML))))
      };
    }
  };
}