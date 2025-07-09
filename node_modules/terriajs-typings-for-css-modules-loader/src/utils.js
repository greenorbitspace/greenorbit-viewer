// @ts-check
const path = require("path");
const camelCase = require("camelcase");

/**
 * @param {string} content
 * @returns {string[]}
 */
const getCssModuleKeys = (content) => {
  const indexOfLocals = content.indexOf(".locals");
  if (indexOfLocals >= 0) {
    // let's only check `exports.locals` for keys to avoid getting keys from the sourcemap when it's enabled
    // if we cannot find locals, then the module only contains global styles
    return getCssModuleKeysFromLocalsLiteral(content.substring(indexOfLocals));
  } else {
    return getCssModuleKeysFromESMExports(content);
  }
};

/**
 * @param {string} content
 * @returns {string[]}
 */
const getCssModuleKeysFromESMExports = (content) => {
  // extract from either `export var foo = "..."` or `export { _1 as "foo-bar" }`
  const keyRegex =
    /export (?:(?:const|var|let) ([^ \n=]+)\s*=|\{ \w+ as "([^"\n]+)" \})/g;
  let match;
  const cssModuleKeys = [];

  while ((match = keyRegex.exec(content))) {
    let exportName = match[1] || match[2];
    if (cssModuleKeys.indexOf(exportName) < 0) {
      cssModuleKeys.push(exportName);
    }
  }
  return cssModuleKeys;
};

/**
 * @param {string} content
 * @returns {string[]}
 */
const getCssModuleKeysFromLocalsLiteral = (content) => {
  // extract from ` ___CSS_LOADER_EXPORT___.locals = { foo: "bar" }`
  const keyRegex = /"([^"\n]+)":/g;
  let match;
  const cssModuleKeys = [];

  while ((match = keyRegex.exec(content))) {
    if (cssModuleKeys.indexOf(match[1]) < 0) {
      cssModuleKeys.push(match[1]);
    }
  }
  return cssModuleKeys;
};

/**
 * @param {string} filename
 */
const filenameToPascalCase = (filename) => {
  return camelCase(path.basename(filename), { pascalCase: true });
};

/**
 * @param {string[]} cssModuleKeys
 * @param {string=} indent
 */
const cssModuleToTypescriptInterfaceProperties = (cssModuleKeys, indent) => {
  return [...cssModuleKeys]
    .sort()
    .map((key) => `${indent || ""}'${key}': string;`)
    .join("\n");
};

const filenameToTypingsFilename = (filename) => {
  const dirName = path.dirname(filename);
  const baseName = path.basename(filename);
  return path.join(dirName, `${baseName}.d.ts`);
};

/**
 * @param {string[]} cssModuleKeys
 * @param {string} pascalCaseFileName
 */
const generateGenericExportInterface = (
  cssModuleKeys,
  pascalCaseFileName,
  disableLocalsExport
) => {
  const interfaceName = `I${pascalCaseFileName}`;
  const moduleName = `${pascalCaseFileName}Module`;
  const namespaceName = `${pascalCaseFileName}Namespace`;

  const localsExportType = disableLocalsExport
    ? ``
    : ` & {
  /** WARNING: Only available when \`css-loader\` is used without \`style-loader\` or \`mini-css-extract-plugin\` */
  locals: ${namespaceName}.${interfaceName};
}`;

  const interfaceProperties = cssModuleToTypescriptInterfaceProperties(
    cssModuleKeys,
    "    "
  );
  return `declare namespace ${namespaceName} {
  export interface I${pascalCaseFileName} {
${interfaceProperties}
  }
}

declare const ${moduleName}: ${namespaceName}.${interfaceName}${localsExportType};

export = ${moduleName};`;
};

module.exports = {
  getCssModuleKeys,
  filenameToPascalCase,
  filenameToTypingsFilename,
  generateGenericExportInterface,
};
