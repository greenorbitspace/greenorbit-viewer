"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHaveAccessibleDescription = toHaveAccessibleDescription;
var _domAccessibilityApi = require("dom-accessibility-api");
var _utils = require("./utils");
var _printers = require("./printers");
/**
 * @param {jasmine.MatchersUtil} matchersUtil
 */
function toHaveAccessibleDescription(matchersUtil) {
  return {
    /**
     * @param {Element} htmlElement
     * @param {RegExp | string | jasmine.AsymmetricMatcher<string>} expectedAccessibleDescription
     */
    compare: function compare(htmlElement, expectedAccessibleDescription) {
      (0, _utils.checkHtmlElement)(htmlElement);
      var actualAccessibleDescription = (0, _domAccessibilityApi.computeAccessibleDescription)(htmlElement);
      var missingExpectedValue = arguments.length === 1;
      var pass = false;
      if (missingExpectedValue) {
        // When called without an expected value we only want to validate that the element has an
        // accessible description, whatever it may be.
        pass = actualAccessibleDescription !== '';
      } else {
        pass = expectedAccessibleDescription instanceof RegExp ? expectedAccessibleDescription.test(actualAccessibleDescription) : matchersUtil.equals(actualAccessibleDescription, expectedAccessibleDescription);
      }
      return {
        pass: pass,
        message: pass ? "".concat((0, _printers.printSuccess)('PASSED'), " ").concat((0, _printers.printSecSuccess)("Expected element to have accessible description:\n".concat((0, _printers.printSuccess)(String(expectedAccessibleDescription)), "\nReceived:\n").concat((0, _printers.printSuccess)(actualAccessibleDescription)))) : "".concat((0, _printers.printError)('FAILED'), " ").concat((0, _printers.printSecError)("Expected element to have accessible description:\n".concat((0, _printers.printError)(String(expectedAccessibleDescription)), "\nReceived:\n").concat((0, _printers.printSuccess)(actualAccessibleDescription))))
      };
    }
  };
}