"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHaveAccessibleName = toHaveAccessibleName;
var _domAccessibilityApi = require("dom-accessibility-api");
var _utils = require("./utils");
var _printers = require("./printers");
/**
 * @param {jasmine.MatchersUtil} matchersUtil
 */
function toHaveAccessibleName(matchersUtil) {
  return {
    compare: function compare(htmlElement, expectedAccessibleName) {
      (0, _utils.checkHtmlElement)(htmlElement);
      var actualAccessibleName = (0, _domAccessibilityApi.computeAccessibleName)(htmlElement);
      var missingExpectedValue = arguments.length === 1;
      var pass = false;
      if (missingExpectedValue) {
        // When called without an expected value we only want to validate that the element has an
        // accessible name, whatever it may be.
        pass = actualAccessibleName !== '';
      } else {
        pass = expectedAccessibleName instanceof RegExp ? expectedAccessibleName.test(actualAccessibleName) : matchersUtil.equals(actualAccessibleName, expectedAccessibleName);
      }
      return {
        pass: pass,
        message: pass ? "".concat((0, _printers.printSuccess)('PASSED'), " ").concat((0, _printers.printSecSuccess)("Expected element to have accessible name:\n".concat((0, _printers.printSuccess)(String(expectedAccessibleName)), "\nReceived:\n").concat((0, _printers.printSuccess)(actualAccessibleName)))) : "".concat((0, _printers.printError)('FAILED'), " ").concat((0, _printers.printSecError)("Expected element to have accessible name:\n".concat((0, _printers.printError)(String(expectedAccessibleName)), "\nReceived:\n").concat((0, _printers.printSuccess)(actualAccessibleName))))
      };
    }
  };
}