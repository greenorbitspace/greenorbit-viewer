"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHaveErrorMessage = toHaveErrorMessage;
var _utils = require("./utils");
var _printers = require("./printers");
/**
 * @see aria-errormessage spec https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage
 * @param {jasmine.MatchersUtil} matchersUtil
 */
function toHaveErrorMessage(matchersUtil) {
  return {
    compare: function compare(htmlElement, checkWith) {
      (0, _utils.checkHtmlElement)(htmlElement);
      if (!htmlElement.hasAttribute('aria-invalid') || htmlElement.getAttribute('aria-invalid') === 'false') {
        return {
          pass: false,
          message: pass ? "".concat((0, _printers.printSuccess)('PASSED'), " ").concat((0, _printers.printSecSuccess)("Expected the element to have invalid state indicated by\n".concat((0, _printers.printSuccess)("aria-invalid=\"true\""), "\nReceived\n").concat((0, _printers.printSuccess)(htmlElement.hasAttribute('aria-invalid') ? "aria-invalid=\"".concat(htmlElement.getAttribute('aria-invalid'), "\"") : "''")))) : "".concat((0, _printers.printError)('FAILED'), " ").concat((0, _printers.printSecError)("Expected the element to have invalid state indicated by\n".concat((0, _printers.printError)("aria-invalid=\"true\""), "\nReceived\n").concat((0, _printers.printSuccess)(htmlElement.hasAttribute('aria-invalid') ? "aria-invalid=\"".concat(htmlElement.getAttribute('aria-invalid'), "\"") : "''"))))
        };
      }
      var expectsErrorMessage = checkWith !== undefined;
      var errormessageIDRaw = htmlElement.getAttribute('aria-errormessage') || '';
      var errormessageIDs = errormessageIDRaw.split(/\s+/).filter(Boolean);
      var errormessage = '';
      if (errormessageIDs.length > 0) {
        var document = htmlElement.ownerDocument;
        var errormessageEls = errormessageIDs.map(function (errormessageID) {
          return document.getElementById(errormessageID);
        }).filter(Boolean);
        errormessage = (0, _utils.normalize)(errormessageEls.map(function (el) {
          return el.textContent;
        }).join(' '));
      }
      var pass = expectsErrorMessage ? checkWith instanceof RegExp ? checkWith.test(errormessage) : matchersUtil.equals(errormessage, checkWith) : Boolean(errormessage);
      return {
        pass: pass,
        message: pass ? "".concat((0, _printers.printSuccess)('PASSED'), " ").concat((0, _printers.printSecSuccess)("Expected the element to have error message\n".concat((0, _printers.printSuccess)(checkWith), "\nReceived\n").concat((0, _printers.printSuccess)(errormessage)))) : "".concat((0, _printers.printError)('FAILED'), " ").concat((0, _printers.printSecError)("Expected the element to have error message\n".concat((0, _printers.printError)(checkWith), "\nReceived\n").concat((0, _printers.printSuccess)(errormessage))))
      };
    }
  };
}