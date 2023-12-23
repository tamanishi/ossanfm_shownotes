var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// ../../../../../opt/homebrew/Cellar/cloudflare-wrangler2/3.22.1/libexec/lib/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../../../../opt/homebrew/Cellar/cloudflare-wrangler2/3.22.1/libexec/lib/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/fast-xml-parser/src/util.js
var require_util = __commonJS({
  "node_modules/fast-xml-parser/src/util.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    var nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
    var regexName = new RegExp("^" + nameRegexp + "$");
    var getAllMatches = function(string, regex) {
      const matches = [];
      let match = regex.exec(string);
      while (match) {
        const allmatches = [];
        allmatches.startIndex = regex.lastIndex - match[0].length;
        const len = match.length;
        for (let index = 0; index < len; index++) {
          allmatches.push(match[index]);
        }
        matches.push(allmatches);
        match = regex.exec(string);
      }
      return matches;
    };
    var isName = function(string) {
      const match = regexName.exec(string);
      return !(match === null || typeof match === "undefined");
    };
    exports.isExist = function(v) {
      return typeof v !== "undefined";
    };
    exports.isEmptyObject = function(obj) {
      return Object.keys(obj).length === 0;
    };
    exports.merge = function(target, a, arrayMode) {
      if (a) {
        const keys = Object.keys(a);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          if (arrayMode === "strict") {
            target[keys[i]] = [a[keys[i]]];
          } else {
            target[keys[i]] = a[keys[i]];
          }
        }
      }
    };
    exports.getValue = function(v) {
      if (exports.isExist(v)) {
        return v;
      } else {
        return "";
      }
    };
    exports.isName = isName;
    exports.getAllMatches = getAllMatches;
    exports.nameRegexp = nameRegexp;
  }
});

// node_modules/fast-xml-parser/src/validator.js
var require_validator = __commonJS({
  "node_modules/fast-xml-parser/src/validator.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    var util = require_util();
    var defaultOptions = {
      allowBooleanAttributes: false,
      //A tag can have attributes without any value
      unpairedTags: []
    };
    exports.validate = function(xmlData, options) {
      options = Object.assign({}, defaultOptions, options);
      const tags = [];
      let tagFound = false;
      let reachedRoot = false;
      if (xmlData[0] === "\uFEFF") {
        xmlData = xmlData.substr(1);
      }
      for (let i = 0; i < xmlData.length; i++) {
        if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
          i += 2;
          i = readPI(xmlData, i);
          if (i.err)
            return i;
        } else if (xmlData[i] === "<") {
          let tagStartPos = i;
          i++;
          if (xmlData[i] === "!") {
            i = readCommentAndCDATA(xmlData, i);
            continue;
          } else {
            let closingTag = false;
            if (xmlData[i] === "/") {
              closingTag = true;
              i++;
            }
            let tagName = "";
            for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
              tagName += xmlData[i];
            }
            tagName = tagName.trim();
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substring(0, tagName.length - 1);
              i--;
            }
            if (!validateTagName(tagName)) {
              let msg;
              if (tagName.trim().length === 0) {
                msg = "Invalid space after '<'.";
              } else {
                msg = "Tag '" + tagName + "' is an invalid name.";
              }
              return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
            }
            const result = readAttributeStr(xmlData, i);
            if (result === false) {
              return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
            }
            let attrStr = result.value;
            i = result.index;
            if (attrStr[attrStr.length - 1] === "/") {
              const attrStrStart = i - attrStr.length;
              attrStr = attrStr.substring(0, attrStr.length - 1);
              const isValid = validateAttributeString(attrStr, options);
              if (isValid === true) {
                tagFound = true;
              } else {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
              }
            } else if (closingTag) {
              if (!result.tagClosed) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
              } else if (attrStr.trim().length > 0) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
              } else {
                const otg = tags.pop();
                if (tagName !== otg.tagName) {
                  let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                  return getErrorObject(
                    "InvalidTag",
                    "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.",
                    getLineNumberForPosition(xmlData, tagStartPos)
                  );
                }
                if (tags.length == 0) {
                  reachedRoot = true;
                }
              }
            } else {
              const isValid = validateAttributeString(attrStr, options);
              if (isValid !== true) {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
              }
              if (reachedRoot === true) {
                return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
              } else if (options.unpairedTags.indexOf(tagName) !== -1) {
              } else {
                tags.push({ tagName, tagStartPos });
              }
              tagFound = true;
            }
            for (i++; i < xmlData.length; i++) {
              if (xmlData[i] === "<") {
                if (xmlData[i + 1] === "!") {
                  i++;
                  i = readCommentAndCDATA(xmlData, i);
                  continue;
                } else if (xmlData[i + 1] === "?") {
                  i = readPI(xmlData, ++i);
                  if (i.err)
                    return i;
                } else {
                  break;
                }
              } else if (xmlData[i] === "&") {
                const afterAmp = validateAmpersand(xmlData, i);
                if (afterAmp == -1)
                  return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
                i = afterAmp;
              } else {
                if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                  return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
                }
              }
            }
            if (xmlData[i] === "<") {
              i--;
            }
          }
        } else {
          if (isWhiteSpace(xmlData[i])) {
            continue;
          }
          return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
        }
      }
      if (!tagFound) {
        return getErrorObject("InvalidXml", "Start tag expected.", 1);
      } else if (tags.length == 1) {
        return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
      } else if (tags.length > 0) {
        return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
      }
      return true;
    };
    function isWhiteSpace(char) {
      return char === " " || char === "	" || char === "\n" || char === "\r";
    }
    function readPI(xmlData, i) {
      const start = i;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] == "?" || xmlData[i] == " ") {
          const tagname = xmlData.substr(start, i - start);
          if (i > 5 && tagname === "xml") {
            return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
          } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
            i++;
            break;
          } else {
            continue;
          }
        }
      }
      return i;
    }
    function readCommentAndCDATA(xmlData, i) {
      if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
        for (i += 3; i < xmlData.length; i++) {
          if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
        let angleBracketsCount = 1;
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "<") {
            angleBracketsCount++;
          } else if (xmlData[i] === ">") {
            angleBracketsCount--;
            if (angleBracketsCount === 0) {
              break;
            }
          }
        }
      } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      }
      return i;
    }
    var doubleQuote = '"';
    var singleQuote = "'";
    function readAttributeStr(xmlData, i) {
      let attrStr = "";
      let startChar = "";
      let tagClosed = false;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
          if (startChar === "") {
            startChar = xmlData[i];
          } else if (startChar !== xmlData[i]) {
          } else {
            startChar = "";
          }
        } else if (xmlData[i] === ">") {
          if (startChar === "") {
            tagClosed = true;
            break;
          }
        }
        attrStr += xmlData[i];
      }
      if (startChar !== "") {
        return false;
      }
      return {
        value: attrStr,
        index: i,
        tagClosed
      };
    }
    var validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
    function validateAttributeString(attrStr, options) {
      const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
      const attrNames = {};
      for (let i = 0; i < matches.length; i++) {
        if (matches[i][1].length === 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] !== void 0 && matches[i][4] === void 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
          return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
        }
        const attrName = matches[i][2];
        if (!validateAttrName(attrName)) {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
        }
        if (!attrNames.hasOwnProperty(attrName)) {
          attrNames[attrName] = 1;
        } else {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
        }
      }
      return true;
    }
    function validateNumberAmpersand(xmlData, i) {
      let re = /\d/;
      if (xmlData[i] === "x") {
        i++;
        re = /[\da-fA-F]/;
      }
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === ";")
          return i;
        if (!xmlData[i].match(re))
          break;
      }
      return -1;
    }
    function validateAmpersand(xmlData, i) {
      i++;
      if (xmlData[i] === ";")
        return -1;
      if (xmlData[i] === "#") {
        i++;
        return validateNumberAmpersand(xmlData, i);
      }
      let count = 0;
      for (; i < xmlData.length; i++, count++) {
        if (xmlData[i].match(/\w/) && count < 20)
          continue;
        if (xmlData[i] === ";")
          break;
        return -1;
      }
      return i;
    }
    function getErrorObject(code, message, lineNumber) {
      return {
        err: {
          code,
          msg: message,
          line: lineNumber.line || lineNumber,
          col: lineNumber.col
        }
      };
    }
    function validateAttrName(attrName) {
      return util.isName(attrName);
    }
    function validateTagName(tagname) {
      return util.isName(tagname);
    }
    function getLineNumberForPosition(xmlData, index) {
      const lines = xmlData.substring(0, index).split(/\r?\n/);
      return {
        line: lines.length,
        // column number is last line's length + 1, because column numbering starts at 1:
        col: lines[lines.length - 1].length + 1
      };
    }
    function getPositionFromMatch(match) {
      return match.startIndex + match[1].length;
    }
  }
});

// node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js
var require_OptionsBuilder = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js"(exports) {
    init_modules_watch_stub();
    var defaultOptions = {
      preserveOrder: false,
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      removeNSPrefix: false,
      // remove NS from tag name or attribute name if true
      allowBooleanAttributes: false,
      //a tag can have attributes without any value
      //ignoreRootElement : false,
      parseTagValue: true,
      parseAttributeValue: false,
      trimValues: true,
      //Trim string values of tag and attributes
      cdataPropName: false,
      numberParseOptions: {
        hex: true,
        leadingZeros: true,
        eNotation: true
      },
      tagValueProcessor: function(tagName, val2) {
        return val2;
      },
      attributeValueProcessor: function(attrName, val2) {
        return val2;
      },
      stopNodes: [],
      //nested tags will not be parsed even for errors
      alwaysCreateTextNode: false,
      isArray: () => false,
      commentPropName: false,
      unpairedTags: [],
      processEntities: true,
      htmlEntities: false,
      ignoreDeclaration: false,
      ignorePiTags: false,
      transformTagName: false,
      transformAttributeName: false,
      updateTag: function(tagName, jPath, attrs) {
        return tagName;
      }
      // skipEmptyListItem: false
    };
    var buildOptions = function(options) {
      return Object.assign({}, defaultOptions, options);
    };
    exports.buildOptions = buildOptions;
    exports.defaultOptions = defaultOptions;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/xmlNode.js
var require_xmlNode = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/xmlNode.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var XmlNode = class {
      constructor(tagname) {
        this.tagname = tagname;
        this.child = [];
        this[":@"] = {};
      }
      add(key, val2) {
        if (key === "__proto__")
          key = "#__proto__";
        this.child.push({ [key]: val2 });
      }
      addChild(node) {
        if (node.tagname === "__proto__")
          node.tagname = "#__proto__";
        if (node[":@"] && Object.keys(node[":@"]).length > 0) {
          this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
        } else {
          this.child.push({ [node.tagname]: node.child });
        }
      }
    };
    module.exports = XmlNode;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js
var require_DocTypeReader = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js"(exports, module) {
    init_modules_watch_stub();
    var util = require_util();
    function readDocType(xmlData, i) {
      const entities = {};
      if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
        i = i + 9;
        let angleBracketsCount = 1;
        let hasBody = false, comment = false;
        let exp = "";
        for (; i < xmlData.length; i++) {
          if (xmlData[i] === "<" && !comment) {
            if (hasBody && isEntity(xmlData, i)) {
              i += 7;
              [entityName, val, i] = readEntityExp(xmlData, i + 1);
              if (val.indexOf("&") === -1)
                entities[validateEntityName(entityName)] = {
                  regx: RegExp(`&${entityName};`, "g"),
                  val
                };
            } else if (hasBody && isElement(xmlData, i))
              i += 8;
            else if (hasBody && isAttlist(xmlData, i))
              i += 8;
            else if (hasBody && isNotation(xmlData, i))
              i += 9;
            else if (isComment)
              comment = true;
            else
              throw new Error("Invalid DOCTYPE");
            angleBracketsCount++;
            exp = "";
          } else if (xmlData[i] === ">") {
            if (comment) {
              if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
                comment = false;
                angleBracketsCount--;
              }
            } else {
              angleBracketsCount--;
            }
            if (angleBracketsCount === 0) {
              break;
            }
          } else if (xmlData[i] === "[") {
            hasBody = true;
          } else {
            exp += xmlData[i];
          }
        }
        if (angleBracketsCount !== 0) {
          throw new Error(`Unclosed DOCTYPE`);
        }
      } else {
        throw new Error(`Invalid Tag instead of DOCTYPE`);
      }
      return { entities, i };
    }
    function readEntityExp(xmlData, i) {
      let entityName2 = "";
      for (; i < xmlData.length && (xmlData[i] !== "'" && xmlData[i] !== '"'); i++) {
        entityName2 += xmlData[i];
      }
      entityName2 = entityName2.trim();
      if (entityName2.indexOf(" ") !== -1)
        throw new Error("External entites are not supported");
      const startChar = xmlData[i++];
      let val2 = "";
      for (; i < xmlData.length && xmlData[i] !== startChar; i++) {
        val2 += xmlData[i];
      }
      return [entityName2, val2, i];
    }
    function isComment(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "-" && xmlData[i + 3] === "-")
        return true;
      return false;
    }
    function isEntity(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "N" && xmlData[i + 4] === "T" && xmlData[i + 5] === "I" && xmlData[i + 6] === "T" && xmlData[i + 7] === "Y")
        return true;
      return false;
    }
    function isElement(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "L" && xmlData[i + 4] === "E" && xmlData[i + 5] === "M" && xmlData[i + 6] === "E" && xmlData[i + 7] === "N" && xmlData[i + 8] === "T")
        return true;
      return false;
    }
    function isAttlist(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "A" && xmlData[i + 3] === "T" && xmlData[i + 4] === "T" && xmlData[i + 5] === "L" && xmlData[i + 6] === "I" && xmlData[i + 7] === "S" && xmlData[i + 8] === "T")
        return true;
      return false;
    }
    function isNotation(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "N" && xmlData[i + 3] === "O" && xmlData[i + 4] === "T" && xmlData[i + 5] === "A" && xmlData[i + 6] === "T" && xmlData[i + 7] === "I" && xmlData[i + 8] === "O" && xmlData[i + 9] === "N")
        return true;
      return false;
    }
    function validateEntityName(name) {
      if (util.isName(name))
        return name;
      else
        throw new Error(`Invalid entity name ${name}`);
    }
    module.exports = readDocType;
  }
});

// node_modules/strnum/strnum.js
var require_strnum = __commonJS({
  "node_modules/strnum/strnum.js"(exports, module) {
    init_modules_watch_stub();
    var hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
    var numRegex = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
    if (!Number.parseInt && window.parseInt) {
      Number.parseInt = window.parseInt;
    }
    if (!Number.parseFloat && window.parseFloat) {
      Number.parseFloat = window.parseFloat;
    }
    var consider = {
      hex: true,
      leadingZeros: true,
      decimalPoint: ".",
      eNotation: true
      //skipLike: /regex/
    };
    function toNumber(str, options = {}) {
      options = Object.assign({}, consider, options);
      if (!str || typeof str !== "string")
        return str;
      let trimmedStr = str.trim();
      if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr))
        return str;
      else if (options.hex && hexRegex.test(trimmedStr)) {
        return Number.parseInt(trimmedStr, 16);
      } else {
        const match = numRegex.exec(trimmedStr);
        if (match) {
          const sign = match[1];
          const leadingZeros = match[2];
          let numTrimmedByZeros = trimZeros(match[3]);
          const eNotation = match[4] || match[6];
          if (!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".")
            return str;
          else if (!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".")
            return str;
          else {
            const num = Number(trimmedStr);
            const numStr = "" + num;
            if (numStr.search(/[eE]/) !== -1) {
              if (options.eNotation)
                return num;
              else
                return str;
            } else if (eNotation) {
              if (options.eNotation)
                return num;
              else
                return str;
            } else if (trimmedStr.indexOf(".") !== -1) {
              if (numStr === "0" && numTrimmedByZeros === "")
                return num;
              else if (numStr === numTrimmedByZeros)
                return num;
              else if (sign && numStr === "-" + numTrimmedByZeros)
                return num;
              else
                return str;
            }
            if (leadingZeros) {
              if (numTrimmedByZeros === numStr)
                return num;
              else if (sign + numTrimmedByZeros === numStr)
                return num;
              else
                return str;
            }
            if (trimmedStr === numStr)
              return num;
            else if (trimmedStr === sign + numStr)
              return num;
            return str;
          }
        } else {
          return str;
        }
      }
    }
    function trimZeros(numStr) {
      if (numStr && numStr.indexOf(".") !== -1) {
        numStr = numStr.replace(/0+$/, "");
        if (numStr === ".")
          numStr = "0";
        else if (numStr[0] === ".")
          numStr = "0" + numStr;
        else if (numStr[numStr.length - 1] === ".")
          numStr = numStr.substr(0, numStr.length - 1);
        return numStr;
      }
      return numStr;
    }
    module.exports = toNumber;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
var require_OrderedObjParser = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var util = require_util();
    var xmlNode = require_xmlNode();
    var readDocType = require_DocTypeReader();
    var toNumber = require_strnum();
    var regx = "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, util.nameRegexp);
    var OrderedObjParser = class {
      constructor(options) {
        this.options = options;
        this.currentNode = null;
        this.tagsNodeStack = [];
        this.docTypeEntities = {};
        this.lastEntities = {
          "apos": { regex: /&(apos|#39|#x27);/g, val: "'" },
          "gt": { regex: /&(gt|#62|#x3E);/g, val: ">" },
          "lt": { regex: /&(lt|#60|#x3C);/g, val: "<" },
          "quot": { regex: /&(quot|#34|#x22);/g, val: '"' }
        };
        this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" };
        this.htmlEntities = {
          "space": { regex: /&(nbsp|#160);/g, val: " " },
          // "lt" : { regex: /&(lt|#60);/g, val: "<" },
          // "gt" : { regex: /&(gt|#62);/g, val: ">" },
          // "amp" : { regex: /&(amp|#38);/g, val: "&" },
          // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
          // "apos" : { regex: /&(apos|#39);/g, val: "'" },
          "cent": { regex: /&(cent|#162);/g, val: "\xA2" },
          "pound": { regex: /&(pound|#163);/g, val: "\xA3" },
          "yen": { regex: /&(yen|#165);/g, val: "\xA5" },
          "euro": { regex: /&(euro|#8364);/g, val: "\u20AC" },
          "copyright": { regex: /&(copy|#169);/g, val: "\xA9" },
          "reg": { regex: /&(reg|#174);/g, val: "\xAE" },
          "inr": { regex: /&(inr|#8377);/g, val: "\u20B9" }
        };
        this.addExternalEntities = addExternalEntities;
        this.parseXml = parseXml;
        this.parseTextData = parseTextData;
        this.resolveNameSpace = resolveNameSpace;
        this.buildAttributesMap = buildAttributesMap;
        this.isItStopNode = isItStopNode;
        this.replaceEntitiesValue = replaceEntitiesValue;
        this.readStopNodeData = readStopNodeData;
        this.saveTextToParentTag = saveTextToParentTag;
        this.addChild = addChild;
      }
    };
    function addExternalEntities(externalEntities) {
      const entKeys = Object.keys(externalEntities);
      for (let i = 0; i < entKeys.length; i++) {
        const ent = entKeys[i];
        this.lastEntities[ent] = {
          regex: new RegExp("&" + ent + ";", "g"),
          val: externalEntities[ent]
        };
      }
    }
    function parseTextData(val2, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
      if (val2 !== void 0) {
        if (this.options.trimValues && !dontTrim) {
          val2 = val2.trim();
        }
        if (val2.length > 0) {
          if (!escapeEntities)
            val2 = this.replaceEntitiesValue(val2);
          const newval = this.options.tagValueProcessor(tagName, val2, jPath, hasAttributes, isLeafNode);
          if (newval === null || newval === void 0) {
            return val2;
          } else if (typeof newval !== typeof val2 || newval !== val2) {
            return newval;
          } else if (this.options.trimValues) {
            return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
          } else {
            const trimmedVal = val2.trim();
            if (trimmedVal === val2) {
              return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
            } else {
              return val2;
            }
          }
        }
      }
    }
    function resolveNameSpace(tagname) {
      if (this.options.removeNSPrefix) {
        const tags = tagname.split(":");
        const prefix = tagname.charAt(0) === "/" ? "/" : "";
        if (tags[0] === "xmlns") {
          return "";
        }
        if (tags.length === 2) {
          tagname = prefix + tags[1];
        }
      }
      return tagname;
    }
    var attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
    function buildAttributesMap(attrStr, jPath, tagName) {
      if (!this.options.ignoreAttributes && typeof attrStr === "string") {
        const matches = util.getAllMatches(attrStr, attrsRegx);
        const len = matches.length;
        const attrs = {};
        for (let i = 0; i < len; i++) {
          const attrName = this.resolveNameSpace(matches[i][1]);
          let oldVal = matches[i][4];
          let aName = this.options.attributeNamePrefix + attrName;
          if (attrName.length) {
            if (this.options.transformAttributeName) {
              aName = this.options.transformAttributeName(aName);
            }
            if (aName === "__proto__")
              aName = "#__proto__";
            if (oldVal !== void 0) {
              if (this.options.trimValues) {
                oldVal = oldVal.trim();
              }
              oldVal = this.replaceEntitiesValue(oldVal);
              const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
              if (newVal === null || newVal === void 0) {
                attrs[aName] = oldVal;
              } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
                attrs[aName] = newVal;
              } else {
                attrs[aName] = parseValue(
                  oldVal,
                  this.options.parseAttributeValue,
                  this.options.numberParseOptions
                );
              }
            } else if (this.options.allowBooleanAttributes) {
              attrs[aName] = true;
            }
          }
        }
        if (!Object.keys(attrs).length) {
          return;
        }
        if (this.options.attributesGroupName) {
          const attrCollection = {};
          attrCollection[this.options.attributesGroupName] = attrs;
          return attrCollection;
        }
        return attrs;
      }
    }
    var parseXml = function(xmlData) {
      xmlData = xmlData.replace(/\r\n?/g, "\n");
      const xmlObj = new xmlNode("!xml");
      let currentNode = xmlObj;
      let textData = "";
      let jPath = "";
      for (let i = 0; i < xmlData.length; i++) {
        const ch = xmlData[i];
        if (ch === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
            let tagName = xmlData.substring(i + 2, closeIndex).trim();
            if (this.options.removeNSPrefix) {
              const colonIndex = tagName.indexOf(":");
              if (colonIndex !== -1) {
                tagName = tagName.substr(colonIndex + 1);
              }
            }
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            if (currentNode) {
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
            }
            const lastTagName = jPath.substring(jPath.lastIndexOf(".") + 1);
            if (tagName && this.options.unpairedTags.indexOf(tagName) !== -1) {
              throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
            }
            let propIndex = 0;
            if (lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1) {
              propIndex = jPath.lastIndexOf(".", jPath.lastIndexOf(".") - 1);
              this.tagsNodeStack.pop();
            } else {
              propIndex = jPath.lastIndexOf(".");
            }
            jPath = jPath.substring(0, propIndex);
            currentNode = this.tagsNodeStack.pop();
            textData = "";
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            let tagData = readTagExp(xmlData, i, false, "?>");
            if (!tagData)
              throw new Error("Pi Tag is not closed.");
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            if (this.options.ignoreDeclaration && tagData.tagName === "?xml" || this.options.ignorePiTags) {
            } else {
              const childNode = new xmlNode(tagData.tagName);
              childNode.add(this.options.textNodeName, "");
              if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
              }
              this.addChild(currentNode, childNode, jPath);
            }
            i = tagData.closeIndex + 1;
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
            if (this.options.commentPropName) {
              const comment = xmlData.substring(i + 4, endIndex - 2);
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
              currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
            }
            i = endIndex;
          } else if (xmlData.substr(i + 1, 2) === "!D") {
            const result = readDocType(xmlData, i);
            this.docTypeEntities = result.entities;
            i = result.i;
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
            const tagExp = xmlData.substring(i + 9, closeIndex);
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            if (this.options.cdataPropName) {
              currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
            } else {
              let val2 = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true);
              if (val2 == void 0)
                val2 = "";
              currentNode.add(this.options.textNodeName, val2);
            }
            i = closeIndex + 2;
          } else {
            let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
            let tagName = result.tagName;
            const rawTagName = result.rawTagName;
            let tagExp = result.tagExp;
            let attrExpPresent = result.attrExpPresent;
            let closeIndex = result.closeIndex;
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            if (currentNode && textData) {
              if (currentNode.tagname !== "!xml") {
                textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
              }
            }
            const lastTag = currentNode;
            if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
              currentNode = this.tagsNodeStack.pop();
              jPath = jPath.substring(0, jPath.lastIndexOf("."));
            }
            if (tagName !== xmlObj.tagname) {
              jPath += jPath ? "." + tagName : tagName;
            }
            if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
              let tagContent = "";
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                i = result.closeIndex;
              } else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
                i = result.closeIndex;
              } else {
                const result2 = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
                if (!result2)
                  throw new Error(`Unexpected end of ${rawTagName}`);
                i = result2.i;
                tagContent = result2.tagContent;
              }
              const childNode = new xmlNode(tagName);
              if (tagName !== tagExp && attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
              }
              if (tagContent) {
                tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
              }
              jPath = jPath.substr(0, jPath.lastIndexOf("."));
              childNode.add(this.options.textNodeName, tagContent);
              this.addChild(currentNode, childNode, jPath);
            } else {
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                if (tagName[tagName.length - 1] === "/") {
                  tagName = tagName.substr(0, tagName.length - 1);
                  jPath = jPath.substr(0, jPath.length - 1);
                  tagExp = tagName;
                } else {
                  tagExp = tagExp.substr(0, tagExp.length - 1);
                }
                if (this.options.transformTagName) {
                  tagName = this.options.transformTagName(tagName);
                }
                const childNode = new xmlNode(tagName);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                }
                this.addChild(currentNode, childNode, jPath);
                jPath = jPath.substr(0, jPath.lastIndexOf("."));
              } else {
                const childNode = new xmlNode(tagName);
                this.tagsNodeStack.push(currentNode);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                }
                this.addChild(currentNode, childNode, jPath);
                currentNode = childNode;
              }
              textData = "";
              i = closeIndex;
            }
          }
        } else {
          textData += xmlData[i];
        }
      }
      return xmlObj.child;
    };
    function addChild(currentNode, childNode, jPath) {
      const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
      if (result === false) {
      } else if (typeof result === "string") {
        childNode.tagname = result;
        currentNode.addChild(childNode);
      } else {
        currentNode.addChild(childNode);
      }
    }
    var replaceEntitiesValue = function(val2) {
      if (this.options.processEntities) {
        for (let entityName2 in this.docTypeEntities) {
          const entity = this.docTypeEntities[entityName2];
          val2 = val2.replace(entity.regx, entity.val);
        }
        for (let entityName2 in this.lastEntities) {
          const entity = this.lastEntities[entityName2];
          val2 = val2.replace(entity.regex, entity.val);
        }
        if (this.options.htmlEntities) {
          for (let entityName2 in this.htmlEntities) {
            const entity = this.htmlEntities[entityName2];
            val2 = val2.replace(entity.regex, entity.val);
          }
        }
        val2 = val2.replace(this.ampEntity.regex, this.ampEntity.val);
      }
      return val2;
    };
    function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
      if (textData) {
        if (isLeafNode === void 0)
          isLeafNode = Object.keys(currentNode.child).length === 0;
        textData = this.parseTextData(
          textData,
          currentNode.tagname,
          jPath,
          false,
          currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false,
          isLeafNode
        );
        if (textData !== void 0 && textData !== "")
          currentNode.add(this.options.textNodeName, textData);
        textData = "";
      }
      return textData;
    }
    function isItStopNode(stopNodes, jPath, currentTagName) {
      const allNodesExp = "*." + currentTagName;
      for (const stopNodePath in stopNodes) {
        const stopNodeExp = stopNodes[stopNodePath];
        if (allNodesExp === stopNodeExp || jPath === stopNodeExp)
          return true;
      }
      return false;
    }
    function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
      let attrBoundary;
      let tagExp = "";
      for (let index = i; index < xmlData.length; index++) {
        let ch = xmlData[index];
        if (attrBoundary) {
          if (ch === attrBoundary)
            attrBoundary = "";
        } else if (ch === '"' || ch === "'") {
          attrBoundary = ch;
        } else if (ch === closingChar[0]) {
          if (closingChar[1]) {
            if (xmlData[index + 1] === closingChar[1]) {
              return {
                data: tagExp,
                index
              };
            }
          } else {
            return {
              data: tagExp,
              index
            };
          }
        } else if (ch === "	") {
          ch = " ";
        }
        tagExp += ch;
      }
    }
    function findClosingIndex(xmlData, str, i, errMsg) {
      const closingIndex = xmlData.indexOf(str, i);
      if (closingIndex === -1) {
        throw new Error(errMsg);
      } else {
        return closingIndex + str.length - 1;
      }
    }
    function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
      const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
      if (!result)
        return;
      let tagExp = result.data;
      const closeIndex = result.index;
      const separatorIndex = tagExp.search(/\s/);
      let tagName = tagExp;
      let attrExpPresent = true;
      if (separatorIndex !== -1) {
        tagName = tagExp.substr(0, separatorIndex).replace(/\s\s*$/, "");
        tagExp = tagExp.substr(separatorIndex + 1);
      }
      const rawTagName = tagName;
      if (removeNSPrefix) {
        const colonIndex = tagName.indexOf(":");
        if (colonIndex !== -1) {
          tagName = tagName.substr(colonIndex + 1);
          attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
        }
      }
      return {
        tagName,
        tagExp,
        closeIndex,
        attrExpPresent,
        rawTagName
      };
    }
    function readStopNodeData(xmlData, tagName, i) {
      const startIndex = i;
      let openTagCount = 1;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
            let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
            if (closeTagName === tagName) {
              openTagCount--;
              if (openTagCount === 0) {
                return {
                  tagContent: xmlData.substring(startIndex, i),
                  i: closeIndex
                };
              }
            }
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
            i = closeIndex;
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
            i = closeIndex;
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
            i = closeIndex;
          } else {
            const tagData = readTagExp(xmlData, i, ">");
            if (tagData) {
              const openTagName = tagData && tagData.tagName;
              if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
                openTagCount++;
              }
              i = tagData.closeIndex;
            }
          }
        }
      }
    }
    function parseValue(val2, shouldParse, options) {
      if (shouldParse && typeof val2 === "string") {
        const newval = val2.trim();
        if (newval === "true")
          return true;
        else if (newval === "false")
          return false;
        else
          return toNumber(val2, options);
      } else {
        if (util.isExist(val2)) {
          return val2;
        } else {
          return "";
        }
      }
    }
    module.exports = OrderedObjParser;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/node2json.js
var require_node2json = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/node2json.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    function prettify(node, options) {
      return compress(node, options);
    }
    function compress(arr, options, jPath) {
      let text;
      const compressedObj = {};
      for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const property = propName(tagObj);
        let newJpath = "";
        if (jPath === void 0)
          newJpath = property;
        else
          newJpath = jPath + "." + property;
        if (property === options.textNodeName) {
          if (text === void 0)
            text = tagObj[property];
          else
            text += "" + tagObj[property];
        } else if (property === void 0) {
          continue;
        } else if (tagObj[property]) {
          let val2 = compress(tagObj[property], options, newJpath);
          const isLeaf = isLeafTag(val2, options);
          if (tagObj[":@"]) {
            assignAttributes(val2, tagObj[":@"], newJpath, options);
          } else if (Object.keys(val2).length === 1 && val2[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) {
            val2 = val2[options.textNodeName];
          } else if (Object.keys(val2).length === 0) {
            if (options.alwaysCreateTextNode)
              val2[options.textNodeName] = "";
            else
              val2 = "";
          }
          if (compressedObj[property] !== void 0 && compressedObj.hasOwnProperty(property)) {
            if (!Array.isArray(compressedObj[property])) {
              compressedObj[property] = [compressedObj[property]];
            }
            compressedObj[property].push(val2);
          } else {
            if (options.isArray(property, newJpath, isLeaf)) {
              compressedObj[property] = [val2];
            } else {
              compressedObj[property] = val2;
            }
          }
        }
      }
      if (typeof text === "string") {
        if (text.length > 0)
          compressedObj[options.textNodeName] = text;
      } else if (text !== void 0)
        compressedObj[options.textNodeName] = text;
      return compressedObj;
    }
    function propName(obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== ":@")
          return key;
      }
    }
    function assignAttributes(obj, attrMap, jpath, options) {
      if (attrMap) {
        const keys = Object.keys(attrMap);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          const atrrName = keys[i];
          if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
            obj[atrrName] = [attrMap[atrrName]];
          } else {
            obj[atrrName] = attrMap[atrrName];
          }
        }
      }
    }
    function isLeafTag(obj, options) {
      const { textNodeName } = options;
      const propCount = Object.keys(obj).length;
      if (propCount === 0) {
        return true;
      }
      if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) {
        return true;
      }
      return false;
    }
    exports.prettify = prettify;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
var require_XMLParser = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/XMLParser.js"(exports, module) {
    init_modules_watch_stub();
    var { buildOptions } = require_OptionsBuilder();
    var OrderedObjParser = require_OrderedObjParser();
    var { prettify } = require_node2json();
    var validator = require_validator();
    var XMLParser2 = class {
      constructor(options) {
        this.externalEntities = {};
        this.options = buildOptions(options);
      }
      /**
       * Parse XML dats to JS object 
       * @param {string|Buffer} xmlData 
       * @param {boolean|Object} validationOption 
       */
      parse(xmlData, validationOption) {
        if (typeof xmlData === "string") {
        } else if (xmlData.toString) {
          xmlData = xmlData.toString();
        } else {
          throw new Error("XML data is accepted in String or Bytes[] form.");
        }
        if (validationOption) {
          if (validationOption === true)
            validationOption = {};
          const result = validator.validate(xmlData, validationOption);
          if (result !== true) {
            throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
          }
        }
        const orderedObjParser = new OrderedObjParser(this.options);
        orderedObjParser.addExternalEntities(this.externalEntities);
        const orderedResult = orderedObjParser.parseXml(xmlData);
        if (this.options.preserveOrder || orderedResult === void 0)
          return orderedResult;
        else
          return prettify(orderedResult, this.options);
      }
      /**
       * Add Entity which is not by default supported by this library
       * @param {string} key 
       * @param {string} value 
       */
      addEntity(key, value) {
        if (value.indexOf("&") !== -1) {
          throw new Error("Entity value can't have '&'");
        } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
          throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
        } else if (value === "&") {
          throw new Error("An entity with value '&' is not permitted");
        } else {
          this.externalEntities[key] = value;
        }
      }
    };
    module.exports = XMLParser2;
  }
});

// node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js
var require_orderedJs2Xml = __commonJS({
  "node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js"(exports, module) {
    init_modules_watch_stub();
    var EOL = "\n";
    function toXml(jArray, options) {
      let indentation = "";
      if (options.format && options.indentBy.length > 0) {
        indentation = EOL;
      }
      return arrToStr(jArray, options, "", indentation);
    }
    function arrToStr(arr, options, jPath, indentation) {
      let xmlStr = "";
      let isPreviousElementTag = false;
      for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const tagName = propName(tagObj);
        if (tagName === void 0)
          continue;
        let newJPath = "";
        if (jPath.length === 0)
          newJPath = tagName;
        else
          newJPath = `${jPath}.${tagName}`;
        if (tagName === options.textNodeName) {
          let tagText = tagObj[tagName];
          if (!isStopNode(newJPath, options)) {
            tagText = options.tagValueProcessor(tagName, tagText);
            tagText = replaceEntitiesValue(tagText, options);
          }
          if (isPreviousElementTag) {
            xmlStr += indentation;
          }
          xmlStr += tagText;
          isPreviousElementTag = false;
          continue;
        } else if (tagName === options.cdataPropName) {
          if (isPreviousElementTag) {
            xmlStr += indentation;
          }
          xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
          isPreviousElementTag = false;
          continue;
        } else if (tagName === options.commentPropName) {
          xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
          isPreviousElementTag = true;
          continue;
        } else if (tagName[0] === "?") {
          const attStr2 = attr_to_str(tagObj[":@"], options);
          const tempInd = tagName === "?xml" ? "" : indentation;
          let piTextNodeName = tagObj[tagName][0][options.textNodeName];
          piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : "";
          xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr2}?>`;
          isPreviousElementTag = true;
          continue;
        }
        let newIdentation = indentation;
        if (newIdentation !== "") {
          newIdentation += options.indentBy;
        }
        const attStr = attr_to_str(tagObj[":@"], options);
        const tagStart = indentation + `<${tagName}${attStr}`;
        const tagValue = arrToStr(tagObj[tagName], options, newJPath, newIdentation);
        if (options.unpairedTags.indexOf(tagName) !== -1) {
          if (options.suppressUnpairedNode)
            xmlStr += tagStart + ">";
          else
            xmlStr += tagStart + "/>";
        } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
          xmlStr += tagStart + "/>";
        } else if (tagValue && tagValue.endsWith(">")) {
          xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
        } else {
          xmlStr += tagStart + ">";
          if (tagValue && indentation !== "" && (tagValue.includes("/>") || tagValue.includes("</"))) {
            xmlStr += indentation + options.indentBy + tagValue + indentation;
          } else {
            xmlStr += tagValue;
          }
          xmlStr += `</${tagName}>`;
        }
        isPreviousElementTag = true;
      }
      return xmlStr;
    }
    function propName(obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!obj.hasOwnProperty(key))
          continue;
        if (key !== ":@")
          return key;
      }
    }
    function attr_to_str(attrMap, options) {
      let attrStr = "";
      if (attrMap && !options.ignoreAttributes) {
        for (let attr in attrMap) {
          if (!attrMap.hasOwnProperty(attr))
            continue;
          let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
          attrVal = replaceEntitiesValue(attrVal, options);
          if (attrVal === true && options.suppressBooleanAttributes) {
            attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
          } else {
            attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
          }
        }
      }
      return attrStr;
    }
    function isStopNode(jPath, options) {
      jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
      let tagName = jPath.substr(jPath.lastIndexOf(".") + 1);
      for (let index in options.stopNodes) {
        if (options.stopNodes[index] === jPath || options.stopNodes[index] === "*." + tagName)
          return true;
      }
      return false;
    }
    function replaceEntitiesValue(textValue, options) {
      if (textValue && textValue.length > 0 && options.processEntities) {
        for (let i = 0; i < options.entities.length; i++) {
          const entity = options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    }
    module.exports = toXml;
  }
});

// node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js
var require_json2xml = __commonJS({
  "node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var buildFromOrderedJs = require_orderedJs2Xml();
    var defaultOptions = {
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      cdataPropName: false,
      format: false,
      indentBy: "  ",
      suppressEmptyNode: false,
      suppressUnpairedNode: true,
      suppressBooleanAttributes: true,
      tagValueProcessor: function(key, a) {
        return a;
      },
      attributeValueProcessor: function(attrName, a) {
        return a;
      },
      preserveOrder: false,
      commentPropName: false,
      unpairedTags: [],
      entities: [
        { regex: new RegExp("&", "g"), val: "&amp;" },
        //it must be on top
        { regex: new RegExp(">", "g"), val: "&gt;" },
        { regex: new RegExp("<", "g"), val: "&lt;" },
        { regex: new RegExp("'", "g"), val: "&apos;" },
        { regex: new RegExp('"', "g"), val: "&quot;" }
      ],
      processEntities: true,
      stopNodes: [],
      // transformTagName: false,
      // transformAttributeName: false,
      oneListGroup: false
    };
    function Builder(options) {
      this.options = Object.assign({}, defaultOptions, options);
      if (this.options.ignoreAttributes || this.options.attributesGroupName) {
        this.isAttribute = function() {
          return false;
        };
      } else {
        this.attrPrefixLen = this.options.attributeNamePrefix.length;
        this.isAttribute = isAttribute;
      }
      this.processTextOrObjNode = processTextOrObjNode;
      if (this.options.format) {
        this.indentate = indentate;
        this.tagEndChar = ">\n";
        this.newLine = "\n";
      } else {
        this.indentate = function() {
          return "";
        };
        this.tagEndChar = ">";
        this.newLine = "";
      }
    }
    Builder.prototype.build = function(jObj) {
      if (this.options.preserveOrder) {
        return buildFromOrderedJs(jObj, this.options);
      } else {
        if (Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) {
          jObj = {
            [this.options.arrayNodeName]: jObj
          };
        }
        return this.j2x(jObj, 0).val;
      }
    };
    Builder.prototype.j2x = function(jObj, level) {
      let attrStr = "";
      let val2 = "";
      for (let key in jObj) {
        if (!Object.prototype.hasOwnProperty.call(jObj, key))
          continue;
        if (typeof jObj[key] === "undefined") {
          if (this.isAttribute(key)) {
            val2 += "";
          }
        } else if (jObj[key] === null) {
          if (this.isAttribute(key)) {
            val2 += "";
          } else if (key[0] === "?") {
            val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
          } else {
            val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
          }
        } else if (jObj[key] instanceof Date) {
          val2 += this.buildTextValNode(jObj[key], key, "", level);
        } else if (typeof jObj[key] !== "object") {
          const attr = this.isAttribute(key);
          if (attr) {
            attrStr += this.buildAttrPairStr(attr, "" + jObj[key]);
          } else {
            if (key === this.options.textNodeName) {
              let newval = this.options.tagValueProcessor(key, "" + jObj[key]);
              val2 += this.replaceEntitiesValue(newval);
            } else {
              val2 += this.buildTextValNode(jObj[key], key, "", level);
            }
          }
        } else if (Array.isArray(jObj[key])) {
          const arrLen = jObj[key].length;
          let listTagVal = "";
          for (let j = 0; j < arrLen; j++) {
            const item = jObj[key][j];
            if (typeof item === "undefined") {
            } else if (item === null) {
              if (key[0] === "?")
                val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
              else
                val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
            } else if (typeof item === "object") {
              if (this.options.oneListGroup) {
                listTagVal += this.j2x(item, level + 1).val;
              } else {
                listTagVal += this.processTextOrObjNode(item, key, level);
              }
            } else {
              listTagVal += this.buildTextValNode(item, key, "", level);
            }
          }
          if (this.options.oneListGroup) {
            listTagVal = this.buildObjectNode(listTagVal, key, "", level);
          }
          val2 += listTagVal;
        } else {
          if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
            const Ks = Object.keys(jObj[key]);
            const L = Ks.length;
            for (let j = 0; j < L; j++) {
              attrStr += this.buildAttrPairStr(Ks[j], "" + jObj[key][Ks[j]]);
            }
          } else {
            val2 += this.processTextOrObjNode(jObj[key], key, level);
          }
        }
      }
      return { attrStr, val: val2 };
    };
    Builder.prototype.buildAttrPairStr = function(attrName, val2) {
      val2 = this.options.attributeValueProcessor(attrName, "" + val2);
      val2 = this.replaceEntitiesValue(val2);
      if (this.options.suppressBooleanAttributes && val2 === "true") {
        return " " + attrName;
      } else
        return " " + attrName + '="' + val2 + '"';
    };
    function processTextOrObjNode(object, key, level) {
      const result = this.j2x(object, level + 1);
      if (object[this.options.textNodeName] !== void 0 && Object.keys(object).length === 1) {
        return this.buildTextValNode(object[this.options.textNodeName], key, result.attrStr, level);
      } else {
        return this.buildObjectNode(result.val, key, result.attrStr, level);
      }
    }
    Builder.prototype.buildObjectNode = function(val2, key, attrStr, level) {
      if (val2 === "") {
        if (key[0] === "?")
          return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
        else {
          return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
        }
      } else {
        let tagEndExp = "</" + key + this.tagEndChar;
        let piClosingChar = "";
        if (key[0] === "?") {
          piClosingChar = "?";
          tagEndExp = "";
        }
        if ((attrStr || attrStr === "") && val2.indexOf("<") === -1) {
          return this.indentate(level) + "<" + key + attrStr + piClosingChar + ">" + val2 + tagEndExp;
        } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
          return this.indentate(level) + `<!--${val2}-->` + this.newLine;
        } else {
          return this.indentate(level) + "<" + key + attrStr + piClosingChar + this.tagEndChar + val2 + this.indentate(level) + tagEndExp;
        }
      }
    };
    Builder.prototype.closeTag = function(key) {
      let closeTag = "";
      if (this.options.unpairedTags.indexOf(key) !== -1) {
        if (!this.options.suppressUnpairedNode)
          closeTag = "/";
      } else if (this.options.suppressEmptyNode) {
        closeTag = "/";
      } else {
        closeTag = `></${key}`;
      }
      return closeTag;
    };
    Builder.prototype.buildTextValNode = function(val2, key, attrStr, level) {
      if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
        return this.indentate(level) + `<![CDATA[${val2}]]>` + this.newLine;
      } else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
        return this.indentate(level) + `<!--${val2}-->` + this.newLine;
      } else if (key[0] === "?") {
        return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
      } else {
        let textValue = this.options.tagValueProcessor(key, val2);
        textValue = this.replaceEntitiesValue(textValue);
        if (textValue === "") {
          return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
        } else {
          return this.indentate(level) + "<" + key + attrStr + ">" + textValue + "</" + key + this.tagEndChar;
        }
      }
    };
    Builder.prototype.replaceEntitiesValue = function(textValue) {
      if (textValue && textValue.length > 0 && this.options.processEntities) {
        for (let i = 0; i < this.options.entities.length; i++) {
          const entity = this.options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    };
    function indentate(level) {
      return this.options.indentBy.repeat(level);
    }
    function isAttribute(name) {
      if (name.startsWith(this.options.attributeNamePrefix) && name !== this.options.textNodeName) {
        return name.substr(this.attrPrefixLen);
      } else {
        return false;
      }
    }
    module.exports = Builder;
  }
});

// node_modules/fast-xml-parser/src/fxp.js
var require_fxp = __commonJS({
  "node_modules/fast-xml-parser/src/fxp.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    var validator = require_validator();
    var XMLParser2 = require_XMLParser();
    var XMLBuilder = require_json2xml();
    module.exports = {
      XMLParser: XMLParser2,
      XMLValidator: validator,
      XMLBuilder
    };
  }
});

// node_modules/kysely/dist/cjs/util/object-utils.js
var require_object_utils = __commonJS({
  "node_modules/kysely/dist/cjs/util/object-utils.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compare = exports.noop = exports.isReadonlyArray = exports.asReadonlyArray = exports.asArray = exports.freeze = exports.getLast = exports.isPlainObject = exports.isArrayBufferOrView = exports.isObject = exports.isFunction = exports.isBuffer = exports.isBigInt = exports.isDate = exports.isNull = exports.isBoolean = exports.isNumber = exports.isString = exports.isUndefined = exports.isEmpty = void 0;
    function isEmpty(obj) {
      if (Array.isArray(obj) || isString2(obj) || isBuffer(obj)) {
        return obj.length === 0;
      } else if (obj) {
        return Object.keys(obj).length === 0;
      }
      return false;
    }
    exports.isEmpty = isEmpty;
    function isUndefined2(obj) {
      return typeof obj === "undefined" || obj === void 0;
    }
    exports.isUndefined = isUndefined2;
    function isString2(obj) {
      return typeof obj === "string";
    }
    exports.isString = isString2;
    function isNumber2(obj) {
      return typeof obj === "number";
    }
    exports.isNumber = isNumber2;
    function isBoolean2(obj) {
      return typeof obj === "boolean";
    }
    exports.isBoolean = isBoolean2;
    function isNull2(obj) {
      return obj === null;
    }
    exports.isNull = isNull2;
    function isDate(obj) {
      return obj instanceof Date;
    }
    exports.isDate = isDate;
    function isBigInt(obj) {
      return typeof obj === "bigint";
    }
    exports.isBigInt = isBigInt;
    function isBuffer(obj) {
      return typeof Buffer !== "undefined" && Buffer.isBuffer(obj);
    }
    exports.isBuffer = isBuffer;
    function isFunction2(obj) {
      return typeof obj === "function";
    }
    exports.isFunction = isFunction2;
    function isObject2(obj) {
      return typeof obj === "object" && obj !== null;
    }
    exports.isObject = isObject2;
    function isArrayBufferOrView(obj) {
      return obj instanceof ArrayBuffer || ArrayBuffer.isView(obj);
    }
    exports.isArrayBufferOrView = isArrayBufferOrView;
    function isPlainObject(obj) {
      return isObject2(obj) && !Array.isArray(obj) && !isDate(obj) && !isBuffer(obj) && !isArrayBufferOrView(obj);
    }
    exports.isPlainObject = isPlainObject;
    function getLast(arr) {
      return arr[arr.length - 1];
    }
    exports.getLast = getLast;
    function freeze2(obj) {
      return Object.freeze(obj);
    }
    exports.freeze = freeze2;
    function asArray(arg) {
      if (Array.isArray(arg)) {
        return arg;
      } else {
        return [arg];
      }
    }
    exports.asArray = asArray;
    function asReadonlyArray(arg) {
      if (isReadonlyArray2(arg)) {
        return arg;
      } else {
        return freeze2([arg]);
      }
    }
    exports.asReadonlyArray = asReadonlyArray;
    function isReadonlyArray2(arg) {
      return Array.isArray(arg);
    }
    exports.isReadonlyArray = isReadonlyArray2;
    function noop2(obj) {
      return obj;
    }
    exports.noop = noop2;
    function compare(obj1, obj2) {
      if (isReadonlyArray2(obj1) && isReadonlyArray2(obj2)) {
        return compareArrays(obj1, obj2);
      } else if (isObject2(obj1) && isObject2(obj2)) {
        return compareObjects(obj1, obj2);
      }
      return obj1 === obj2;
    }
    exports.compare = compare;
    function compareArrays(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; ++i) {
        if (!compare(arr1[i], arr2[i])) {
          return false;
        }
      }
      return true;
    }
    function compareObjects(obj1, obj2) {
      if (isBuffer(obj1) && isBuffer(obj2)) {
        return compareBuffers(obj1, obj2);
      } else if (isDate(obj1) && isDate(obj2)) {
        return compareDates(obj1, obj2);
      }
      return compareGenericObjects(obj1, obj2);
    }
    function compareBuffers(buf1, buf2) {
      return Buffer.compare(buf1, buf2) === 0;
    }
    function compareDates(date1, date2) {
      return date1.getTime() === date2.getTime();
    }
    function compareGenericObjects(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (const key of keys1) {
        if (!compare(obj1[key], obj2[key])) {
          return false;
        }
      }
      return true;
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/alter-table-node.js
var require_alter_table_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/alter-table-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlterTableNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.AlterTableNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "AlterTableNode";
      },
      create(table) {
        return (0, object_utils_js_1.freeze)({
          kind: "AlterTableNode",
          table
        });
      },
      cloneWithTableProps(node, props) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          ...props
        });
      },
      cloneWithColumnAlteration(node, columnAlteration) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          columnAlterations: node.columnAlterations ? [...node.columnAlterations, columnAlteration] : [columnAlteration]
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/identifier-node.js
var require_identifier_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/identifier-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IdentifierNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.IdentifierNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "IdentifierNode";
      },
      create(name) {
        return (0, object_utils_js_1.freeze)({
          kind: "IdentifierNode",
          name
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/create-index-node.js
var require_create_index_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/create-index-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateIndexNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var identifier_node_js_1 = require_identifier_node();
    exports.CreateIndexNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "CreateIndexNode";
      },
      create(name) {
        return (0, object_utils_js_1.freeze)({
          kind: "CreateIndexNode",
          name: identifier_node_js_1.IdentifierNode.create(name)
        });
      },
      cloneWith(node, props) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          ...props
        });
      },
      cloneWithColumns(node, columns) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          columns: [...node.columns || [], ...columns]
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/create-schema-node.js
var require_create_schema_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/create-schema-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateSchemaNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var identifier_node_js_1 = require_identifier_node();
    exports.CreateSchemaNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "CreateSchemaNode";
      },
      create(schema, params) {
        return (0, object_utils_js_1.freeze)({
          kind: "CreateSchemaNode",
          schema: identifier_node_js_1.IdentifierNode.create(schema),
          ...params
        });
      },
      cloneWith(createSchema, params) {
        return (0, object_utils_js_1.freeze)({
          ...createSchema,
          ...params
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/create-table-node.js
var require_create_table_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/create-table-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateTableNode = exports.ON_COMMIT_ACTIONS = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ON_COMMIT_ACTIONS = ["preserve rows", "delete rows", "drop"];
    exports.CreateTableNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "CreateTableNode";
      },
      create(table) {
        return (0, object_utils_js_1.freeze)({
          kind: "CreateTableNode",
          table,
          columns: (0, object_utils_js_1.freeze)([])
        });
      },
      cloneWithColumn(createTable, column) {
        return (0, object_utils_js_1.freeze)({
          ...createTable,
          columns: (0, object_utils_js_1.freeze)([...createTable.columns, column])
        });
      },
      cloneWithConstraint(createTable, constraint) {
        return (0, object_utils_js_1.freeze)({
          ...createTable,
          constraints: createTable.constraints ? (0, object_utils_js_1.freeze)([...createTable.constraints, constraint]) : (0, object_utils_js_1.freeze)([constraint])
        });
      },
      cloneWithFrontModifier(createTable, modifier) {
        return (0, object_utils_js_1.freeze)({
          ...createTable,
          frontModifiers: createTable.frontModifiers ? (0, object_utils_js_1.freeze)([...createTable.frontModifiers, modifier]) : (0, object_utils_js_1.freeze)([modifier])
        });
      },
      cloneWithEndModifier(createTable, modifier) {
        return (0, object_utils_js_1.freeze)({
          ...createTable,
          endModifiers: createTable.endModifiers ? (0, object_utils_js_1.freeze)([...createTable.endModifiers, modifier]) : (0, object_utils_js_1.freeze)([modifier])
        });
      },
      cloneWith(createTable, params) {
        return (0, object_utils_js_1.freeze)({
          ...createTable,
          ...params
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/schemable-identifier-node.js
var require_schemable_identifier_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/schemable-identifier-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SchemableIdentifierNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var identifier_node_js_1 = require_identifier_node();
    exports.SchemableIdentifierNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "SchemableIdentifierNode";
      },
      create(identifier) {
        return (0, object_utils_js_1.freeze)({
          kind: "SchemableIdentifierNode",
          identifier: identifier_node_js_1.IdentifierNode.create(identifier)
        });
      },
      createWithSchema(schema, identifier) {
        return (0, object_utils_js_1.freeze)({
          kind: "SchemableIdentifierNode",
          schema: identifier_node_js_1.IdentifierNode.create(schema),
          identifier: identifier_node_js_1.IdentifierNode.create(identifier)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/drop-index-node.js
var require_drop_index_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/drop-index-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropIndexNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var schemable_identifier_node_js_1 = require_schemable_identifier_node();
    exports.DropIndexNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DropIndexNode";
      },
      create(name, params) {
        return (0, object_utils_js_1.freeze)({
          kind: "DropIndexNode",
          name: schemable_identifier_node_js_1.SchemableIdentifierNode.create(name),
          ...params
        });
      },
      cloneWith(dropIndex, props) {
        return (0, object_utils_js_1.freeze)({
          ...dropIndex,
          ...props
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/drop-schema-node.js
var require_drop_schema_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/drop-schema-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropSchemaNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var identifier_node_js_1 = require_identifier_node();
    exports.DropSchemaNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DropSchemaNode";
      },
      create(schema, params) {
        return (0, object_utils_js_1.freeze)({
          kind: "DropSchemaNode",
          schema: identifier_node_js_1.IdentifierNode.create(schema),
          ...params
        });
      },
      cloneWith(dropSchema, params) {
        return (0, object_utils_js_1.freeze)({
          ...dropSchema,
          ...params
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/drop-table-node.js
var require_drop_table_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/drop-table-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropTableNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.DropTableNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DropTableNode";
      },
      create(table, params) {
        return (0, object_utils_js_1.freeze)({
          kind: "DropTableNode",
          table,
          ...params
        });
      },
      cloneWith(dropIndex, params) {
        return (0, object_utils_js_1.freeze)({
          ...dropIndex,
          ...params
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/alias-node.js
var require_alias_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/alias-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AliasNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.AliasNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "AliasNode";
      },
      create(node, alias) {
        return (0, object_utils_js_1.freeze)({
          kind: "AliasNode",
          node,
          alias
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/table-node.js
var require_table_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/table-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TableNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var schemable_identifier_node_js_1 = require_schemable_identifier_node();
    exports.TableNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "TableNode";
      },
      create(table) {
        return (0, object_utils_js_1.freeze)({
          kind: "TableNode",
          table: schemable_identifier_node_js_1.SchemableIdentifierNode.create(table)
        });
      },
      createWithSchema(schema, table) {
        return (0, object_utils_js_1.freeze)({
          kind: "TableNode",
          table: schemable_identifier_node_js_1.SchemableIdentifierNode.createWithSchema(schema, table)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/operation-node-source.js
var require_operation_node_source = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/operation-node-source.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isOperationNodeSource = void 0;
    var object_utils_js_1 = require_object_utils();
    function isOperationNodeSource2(obj) {
      return (0, object_utils_js_1.isObject)(obj) && (0, object_utils_js_1.isFunction)(obj.toOperationNode);
    }
    exports.isOperationNodeSource = isOperationNodeSource2;
  }
});

// node_modules/kysely/dist/cjs/expression/expression.js
var require_expression = __commonJS({
  "node_modules/kysely/dist/cjs/expression/expression.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAliasedExpression = exports.isExpression = void 0;
    var operation_node_source_js_1 = require_operation_node_source();
    var object_utils_js_1 = require_object_utils();
    function isExpression2(obj) {
      return (0, object_utils_js_1.isObject)(obj) && "expressionType" in obj && (0, operation_node_source_js_1.isOperationNodeSource)(obj);
    }
    exports.isExpression = isExpression2;
    function isAliasedExpression2(obj) {
      return (0, object_utils_js_1.isObject)(obj) && "expression" in obj && (0, object_utils_js_1.isString)(obj.alias) && (0, operation_node_source_js_1.isOperationNodeSource)(obj);
    }
    exports.isAliasedExpression = isAliasedExpression2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/select-modifier-node.js
var require_select_modifier_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/select-modifier-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectModifierNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.SelectModifierNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "SelectModifierNode";
      },
      create(modifier) {
        return (0, object_utils_js_1.freeze)({
          kind: "SelectModifierNode",
          modifier
        });
      },
      createWithExpression(modifier) {
        return (0, object_utils_js_1.freeze)({
          kind: "SelectModifierNode",
          rawModifier: modifier
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/and-node.js
var require_and_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/and-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AndNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.AndNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "AndNode";
      },
      create(left, right) {
        return (0, object_utils_js_1.freeze)({
          kind: "AndNode",
          left,
          right
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/or-node.js
var require_or_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/or-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.OrNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "OrNode";
      },
      create(left, right) {
        return (0, object_utils_js_1.freeze)({
          kind: "OrNode",
          left,
          right
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/on-node.js
var require_on_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/on-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OnNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var and_node_js_1 = require_and_node();
    var or_node_js_1 = require_or_node();
    exports.OnNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "OnNode";
      },
      create(filter) {
        return (0, object_utils_js_1.freeze)({
          kind: "OnNode",
          on: filter
        });
      },
      cloneWithOperation(onNode, operator, operation) {
        return (0, object_utils_js_1.freeze)({
          ...onNode,
          on: operator === "And" ? and_node_js_1.AndNode.create(onNode.on, operation) : or_node_js_1.OrNode.create(onNode.on, operation)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/join-node.js
var require_join_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/join-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JoinNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var on_node_js_1 = require_on_node();
    exports.JoinNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "JoinNode";
      },
      create(joinType, table) {
        return (0, object_utils_js_1.freeze)({
          kind: "JoinNode",
          joinType,
          table,
          on: void 0
        });
      },
      createWithOn(joinType, table, on) {
        return (0, object_utils_js_1.freeze)({
          kind: "JoinNode",
          joinType,
          table,
          on: on_node_js_1.OnNode.create(on)
        });
      },
      cloneWithOn(joinNode, operation) {
        return (0, object_utils_js_1.freeze)({
          ...joinNode,
          on: joinNode.on ? on_node_js_1.OnNode.cloneWithOperation(joinNode.on, "And", operation) : on_node_js_1.OnNode.create(operation)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/binary-operation-node.js
var require_binary_operation_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/binary-operation-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BinaryOperationNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.BinaryOperationNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "BinaryOperationNode";
      },
      create(leftOperand, operator, rightOperand) {
        return (0, object_utils_js_1.freeze)({
          kind: "BinaryOperationNode",
          leftOperand,
          operator,
          rightOperand
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/operator-node.js
var require_operator_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/operator-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isJSONOperator = exports.isArithmeticOperator = exports.isComparisonOperator = exports.isBinaryOperator = exports.isOperator = exports.OperatorNode = exports.OPERATORS = exports.UNARY_OPERATORS = exports.UNARY_FILTER_OPERATORS = exports.BINARY_OPERATORS = exports.JSON_OPERATORS = exports.ARITHMETIC_OPERATORS = exports.COMPARISON_OPERATORS = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.COMPARISON_OPERATORS = [
      "=",
      "==",
      "!=",
      "<>",
      ">",
      ">=",
      "<",
      "<=",
      "in",
      "not in",
      "is",
      "is not",
      "like",
      "not like",
      "match",
      "ilike",
      "not ilike",
      "@>",
      "<@",
      "&&",
      "?",
      "?&",
      "!<",
      "!>",
      "<=>",
      "!~",
      "~",
      "~*",
      "!~*",
      "@@",
      "@@@",
      "!!",
      "<->",
      "regexp"
    ];
    exports.ARITHMETIC_OPERATORS = [
      "+",
      "-",
      "*",
      "/",
      "%",
      "^",
      "&",
      "|",
      "#",
      "<<",
      ">>"
    ];
    exports.JSON_OPERATORS = ["->", "->>"];
    exports.BINARY_OPERATORS = [
      ...exports.COMPARISON_OPERATORS,
      ...exports.ARITHMETIC_OPERATORS,
      "&&",
      "||"
    ];
    exports.UNARY_FILTER_OPERATORS = ["exists", "not exists"];
    exports.UNARY_OPERATORS = ["not", "-", ...exports.UNARY_FILTER_OPERATORS];
    exports.OPERATORS = [
      ...exports.BINARY_OPERATORS,
      ...exports.JSON_OPERATORS,
      ...exports.UNARY_OPERATORS,
      "between",
      "between symmetric"
    ];
    exports.OperatorNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "OperatorNode";
      },
      create(operator) {
        return (0, object_utils_js_1.freeze)({
          kind: "OperatorNode",
          operator
        });
      }
    });
    function isOperator(op) {
      return (0, object_utils_js_1.isString)(op) && exports.OPERATORS.includes(op);
    }
    exports.isOperator = isOperator;
    function isBinaryOperator(op) {
      return (0, object_utils_js_1.isString)(op) && exports.BINARY_OPERATORS.includes(op);
    }
    exports.isBinaryOperator = isBinaryOperator;
    function isComparisonOperator(op) {
      return (0, object_utils_js_1.isString)(op) && exports.COMPARISON_OPERATORS.includes(op);
    }
    exports.isComparisonOperator = isComparisonOperator;
    function isArithmeticOperator(op) {
      return (0, object_utils_js_1.isString)(op) && exports.ARITHMETIC_OPERATORS.includes(op);
    }
    exports.isArithmeticOperator = isArithmeticOperator;
    function isJSONOperator2(op) {
      return (0, object_utils_js_1.isString)(op) && exports.JSON_OPERATORS.includes(op);
    }
    exports.isJSONOperator = isJSONOperator2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/column-node.js
var require_column_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/column-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ColumnNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var identifier_node_js_1 = require_identifier_node();
    exports.ColumnNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ColumnNode";
      },
      create(column) {
        return (0, object_utils_js_1.freeze)({
          kind: "ColumnNode",
          column: identifier_node_js_1.IdentifierNode.create(column)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/select-all-node.js
var require_select_all_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/select-all-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectAllNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.SelectAllNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "SelectAllNode";
      },
      create() {
        return (0, object_utils_js_1.freeze)({
          kind: "SelectAllNode"
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/reference-node.js
var require_reference_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/reference-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReferenceNode = void 0;
    var select_all_node_js_1 = require_select_all_node();
    var object_utils_js_1 = require_object_utils();
    exports.ReferenceNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ReferenceNode";
      },
      create(column, table) {
        return (0, object_utils_js_1.freeze)({
          kind: "ReferenceNode",
          table,
          column
        });
      },
      createSelectAll(table) {
        return (0, object_utils_js_1.freeze)({
          kind: "ReferenceNode",
          table,
          column: select_all_node_js_1.SelectAllNode.create()
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/dynamic/dynamic-reference-builder.js
var require_dynamic_reference_builder = __commonJS({
  "node_modules/kysely/dist/cjs/dynamic/dynamic-reference-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isDynamicReferenceBuilder = exports.DynamicReferenceBuilder = void 0;
    var operation_node_source_js_1 = require_operation_node_source();
    var reference_parser_js_1 = require_reference_parser();
    var object_utils_js_1 = require_object_utils();
    var DynamicReferenceBuilder2 = class {
      #dynamicReference;
      get dynamicReference() {
        return this.#dynamicReference;
      }
      /**
       * @private
       *
       * This needs to be here just so that the typings work. Without this
       * the generated .d.ts file contains no reference to the type param R
       * which causes this type to be equal to DynamicReferenceBuilder with
       * any R.
       */
      get refType() {
        return void 0;
      }
      constructor(reference) {
        this.#dynamicReference = reference;
      }
      toOperationNode() {
        return (0, reference_parser_js_1.parseSimpleReferenceExpression)(this.#dynamicReference);
      }
    };
    exports.DynamicReferenceBuilder = DynamicReferenceBuilder2;
    function isDynamicReferenceBuilder2(obj) {
      return (0, object_utils_js_1.isObject)(obj) && (0, operation_node_source_js_1.isOperationNodeSource)(obj) && (0, object_utils_js_1.isString)(obj.dynamicReference);
    }
    exports.isDynamicReferenceBuilder = isDynamicReferenceBuilder2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/order-by-item-node.js
var require_order_by_item_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/order-by-item-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrderByItemNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.OrderByItemNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "OrderByItemNode";
      },
      create(orderBy, direction) {
        return (0, object_utils_js_1.freeze)({
          kind: "OrderByItemNode",
          orderBy,
          direction
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/raw-node.js
var require_raw_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/raw-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RawNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.RawNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "RawNode";
      },
      create(sqlFragments, parameters) {
        return (0, object_utils_js_1.freeze)({
          kind: "RawNode",
          sqlFragments: (0, object_utils_js_1.freeze)(sqlFragments),
          parameters: (0, object_utils_js_1.freeze)(parameters)
        });
      },
      createWithSql(sql) {
        return exports.RawNode.create([sql], []);
      },
      createWithChild(child) {
        return exports.RawNode.create(["", ""], [child]);
      },
      createWithChildren(children) {
        return exports.RawNode.create(new Array(children.length + 1).fill(""), children);
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/order-by-parser.js
var require_order_by_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/order-by-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseOrderByItem = exports.parseOrderBy = exports.isOrderByDirection = void 0;
    var dynamic_reference_builder_js_1 = require_dynamic_reference_builder();
    var order_by_item_node_js_1 = require_order_by_item_node();
    var raw_node_js_1 = require_raw_node();
    var expression_parser_js_1 = require_expression_parser();
    var reference_parser_js_1 = require_reference_parser();
    function isOrderByDirection2(thing) {
      return thing === "asc" || thing === "desc";
    }
    exports.isOrderByDirection = isOrderByDirection2;
    function parseOrderBy2(args) {
      if (args.length === 2) {
        return [parseOrderByItem2(args[0], args[1])];
      }
      if (args.length === 1) {
        const [orderBy] = args;
        if (Array.isArray(orderBy)) {
          return orderBy.map((item) => parseOrderByItem2(item));
        }
        return [parseOrderByItem2(orderBy)];
      }
      throw new Error(`Invalid number of arguments at order by! expected 1-2, received ${args.length}`);
    }
    exports.parseOrderBy = parseOrderBy2;
    function parseOrderByItem2(ref, direction) {
      const parsedRef = parseOrderByExpression2(ref);
      if (order_by_item_node_js_1.OrderByItemNode.is(parsedRef)) {
        if (direction) {
          throw new Error("Cannot specify direction twice!");
        }
        return parsedRef;
      }
      return order_by_item_node_js_1.OrderByItemNode.create(parsedRef, parseOrderByDirectionExpression2(direction));
    }
    exports.parseOrderByItem = parseOrderByItem2;
    function parseOrderByExpression2(expr) {
      if ((0, expression_parser_js_1.isExpressionOrFactory)(expr)) {
        return (0, expression_parser_js_1.parseExpression)(expr);
      }
      if ((0, dynamic_reference_builder_js_1.isDynamicReferenceBuilder)(expr)) {
        return expr.toOperationNode();
      }
      const [ref, direction] = expr.split(" ");
      if (direction) {
        if (!isOrderByDirection2(direction)) {
          throw new Error(`Invalid order by direction: ${direction}`);
        }
        return order_by_item_node_js_1.OrderByItemNode.create((0, reference_parser_js_1.parseStringReference)(ref), parseOrderByDirectionExpression2(direction));
      }
      return (0, reference_parser_js_1.parseStringReference)(expr);
    }
    function parseOrderByDirectionExpression2(expr) {
      if (!expr) {
        return void 0;
      }
      if (expr === "asc" || expr === "desc") {
        return raw_node_js_1.RawNode.createWithSql(expr);
      }
      return expr.toOperationNode();
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/json-reference-node.js
var require_json_reference_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/json-reference-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JSONReferenceNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.JSONReferenceNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "JSONReferenceNode";
      },
      create(reference, traversal) {
        return (0, object_utils_js_1.freeze)({
          kind: "JSONReferenceNode",
          reference,
          traversal
        });
      },
      cloneWithTraversal(node, traversal) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          traversal
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/json-operator-chain-node.js
var require_json_operator_chain_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/json-operator-chain-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JSONOperatorChainNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.JSONOperatorChainNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "JSONOperatorChainNode";
      },
      create(operator) {
        return (0, object_utils_js_1.freeze)({
          kind: "JSONOperatorChainNode",
          operator,
          values: (0, object_utils_js_1.freeze)([])
        });
      },
      cloneWithValue(node, value) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          values: (0, object_utils_js_1.freeze)([...node.values, value])
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/json-path-node.js
var require_json_path_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/json-path-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JSONPathNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.JSONPathNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "JSONPathNode";
      },
      create(inOperator) {
        return (0, object_utils_js_1.freeze)({
          kind: "JSONPathNode",
          inOperator,
          pathLegs: (0, object_utils_js_1.freeze)([])
        });
      },
      cloneWithLeg(jsonPathNode, pathLeg) {
        return (0, object_utils_js_1.freeze)({
          ...jsonPathNode,
          pathLegs: (0, object_utils_js_1.freeze)([...jsonPathNode.pathLegs, pathLeg])
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/reference-parser.js
var require_reference_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/reference-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseOrderedColumnName = exports.parseColumnName = exports.parseAliasedStringReference = exports.parseStringReference = exports.parseJSONReference = exports.parseReferenceExpression = exports.parseReferenceExpressionOrList = exports.parseSimpleReferenceExpression = void 0;
    var alias_node_js_1 = require_alias_node();
    var column_node_js_1 = require_column_node();
    var reference_node_js_1 = require_reference_node();
    var table_node_js_1 = require_table_node();
    var object_utils_js_1 = require_object_utils();
    var expression_parser_js_1 = require_expression_parser();
    var identifier_node_js_1 = require_identifier_node();
    var order_by_parser_js_1 = require_order_by_parser();
    var operator_node_js_1 = require_operator_node();
    var json_reference_node_js_1 = require_json_reference_node();
    var json_operator_chain_node_js_1 = require_json_operator_chain_node();
    var json_path_node_js_1 = require_json_path_node();
    function parseSimpleReferenceExpression2(exp) {
      if ((0, object_utils_js_1.isString)(exp)) {
        return parseStringReference2(exp);
      }
      return exp.toOperationNode();
    }
    exports.parseSimpleReferenceExpression = parseSimpleReferenceExpression2;
    function parseReferenceExpressionOrList2(arg) {
      if ((0, object_utils_js_1.isReadonlyArray)(arg)) {
        return arg.map((it) => parseReferenceExpression2(it));
      } else {
        return [parseReferenceExpression2(arg)];
      }
    }
    exports.parseReferenceExpressionOrList = parseReferenceExpressionOrList2;
    function parseReferenceExpression2(exp) {
      if ((0, expression_parser_js_1.isExpressionOrFactory)(exp)) {
        return (0, expression_parser_js_1.parseExpression)(exp);
      }
      return parseSimpleReferenceExpression2(exp);
    }
    exports.parseReferenceExpression = parseReferenceExpression2;
    function parseJSONReference2(ref, op) {
      const referenceNode = parseStringReference2(ref);
      if ((0, operator_node_js_1.isJSONOperator)(op)) {
        return json_reference_node_js_1.JSONReferenceNode.create(referenceNode, json_operator_chain_node_js_1.JSONOperatorChainNode.create(operator_node_js_1.OperatorNode.create(op)));
      }
      const opWithoutLastChar = op.slice(0, -1);
      if ((0, operator_node_js_1.isJSONOperator)(opWithoutLastChar)) {
        return json_reference_node_js_1.JSONReferenceNode.create(referenceNode, json_path_node_js_1.JSONPathNode.create(operator_node_js_1.OperatorNode.create(opWithoutLastChar)));
      }
      throw new Error(`Invalid JSON operator: ${op}`);
    }
    exports.parseJSONReference = parseJSONReference2;
    function parseStringReference2(ref) {
      const COLUMN_SEPARATOR = ".";
      if (!ref.includes(COLUMN_SEPARATOR)) {
        return reference_node_js_1.ReferenceNode.create(column_node_js_1.ColumnNode.create(ref));
      }
      const parts = ref.split(COLUMN_SEPARATOR).map(trim4);
      if (parts.length === 3) {
        return parseStringReferenceWithTableAndSchema2(parts);
      }
      if (parts.length === 2) {
        return parseStringReferenceWithTable2(parts);
      }
      throw new Error(`invalid column reference ${ref}`);
    }
    exports.parseStringReference = parseStringReference2;
    function parseAliasedStringReference2(ref) {
      const ALIAS_SEPARATOR = " as ";
      if (ref.includes(ALIAS_SEPARATOR)) {
        const [columnRef, alias] = ref.split(ALIAS_SEPARATOR).map(trim4);
        return alias_node_js_1.AliasNode.create(parseStringReference2(columnRef), identifier_node_js_1.IdentifierNode.create(alias));
      } else {
        return parseStringReference2(ref);
      }
    }
    exports.parseAliasedStringReference = parseAliasedStringReference2;
    function parseColumnName2(column) {
      return column_node_js_1.ColumnNode.create(column);
    }
    exports.parseColumnName = parseColumnName2;
    function parseOrderedColumnName2(column) {
      const ORDER_SEPARATOR = " ";
      if (column.includes(ORDER_SEPARATOR)) {
        const [columnName, order] = column.split(ORDER_SEPARATOR).map(trim4);
        if (!(0, order_by_parser_js_1.isOrderByDirection)(order)) {
          throw new Error(`invalid order direction "${order}" next to "${columnName}"`);
        }
        return (0, order_by_parser_js_1.parseOrderBy)([columnName, order])[0];
      } else {
        return parseColumnName2(column);
      }
    }
    exports.parseOrderedColumnName = parseOrderedColumnName2;
    function parseStringReferenceWithTableAndSchema2(parts) {
      const [schema, table, column] = parts;
      return reference_node_js_1.ReferenceNode.create(column_node_js_1.ColumnNode.create(column), table_node_js_1.TableNode.createWithSchema(schema, table));
    }
    function parseStringReferenceWithTable2(parts) {
      const [table, column] = parts;
      return reference_node_js_1.ReferenceNode.create(column_node_js_1.ColumnNode.create(column), table_node_js_1.TableNode.create(table));
    }
    function trim4(str) {
      return str.trim();
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/primitive-value-list-node.js
var require_primitive_value_list_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/primitive-value-list-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrimitiveValueListNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.PrimitiveValueListNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "PrimitiveValueListNode";
      },
      create(values) {
        return (0, object_utils_js_1.freeze)({
          kind: "PrimitiveValueListNode",
          values: (0, object_utils_js_1.freeze)([...values])
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/value-list-node.js
var require_value_list_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/value-list-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueListNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ValueListNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ValueListNode";
      },
      create(values) {
        return (0, object_utils_js_1.freeze)({
          kind: "ValueListNode",
          values: (0, object_utils_js_1.freeze)(values)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/value-node.js
var require_value_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/value-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ValueNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ValueNode";
      },
      create(value) {
        return (0, object_utils_js_1.freeze)({
          kind: "ValueNode",
          value
        });
      },
      createImmediate(value) {
        return (0, object_utils_js_1.freeze)({
          kind: "ValueNode",
          value,
          immediate: true
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/value-parser.js
var require_value_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/value-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseSafeImmediateValue = exports.isSafeImmediateValue = exports.parseValueExpression = exports.parseValueExpressionOrList = void 0;
    var primitive_value_list_node_js_1 = require_primitive_value_list_node();
    var value_list_node_js_1 = require_value_list_node();
    var value_node_js_1 = require_value_node();
    var object_utils_js_1 = require_object_utils();
    var expression_parser_js_1 = require_expression_parser();
    function parseValueExpressionOrList2(arg) {
      if ((0, object_utils_js_1.isReadonlyArray)(arg)) {
        return parseValueExpressionList2(arg);
      }
      return parseValueExpression2(arg);
    }
    exports.parseValueExpressionOrList = parseValueExpressionOrList2;
    function parseValueExpression2(exp) {
      if ((0, expression_parser_js_1.isExpressionOrFactory)(exp)) {
        return (0, expression_parser_js_1.parseExpression)(exp);
      }
      return value_node_js_1.ValueNode.create(exp);
    }
    exports.parseValueExpression = parseValueExpression2;
    function isSafeImmediateValue2(value) {
      return (0, object_utils_js_1.isNumber)(value) || (0, object_utils_js_1.isBoolean)(value) || (0, object_utils_js_1.isNull)(value);
    }
    exports.isSafeImmediateValue = isSafeImmediateValue2;
    function parseSafeImmediateValue2(value) {
      if (!isSafeImmediateValue2(value)) {
        throw new Error(`unsafe immediate value ${JSON.stringify(value)}`);
      }
      return value_node_js_1.ValueNode.createImmediate(value);
    }
    exports.parseSafeImmediateValue = parseSafeImmediateValue2;
    function parseValueExpressionList2(arg) {
      if (arg.some(expression_parser_js_1.isExpressionOrFactory)) {
        return value_list_node_js_1.ValueListNode.create(arg.map((it) => parseValueExpression2(it)));
      }
      return primitive_value_list_node_js_1.PrimitiveValueListNode.create(arg);
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/parens-node.js
var require_parens_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/parens-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParensNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ParensNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ParensNode";
      },
      create(node) {
        return (0, object_utils_js_1.freeze)({
          kind: "ParensNode",
          node
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/binary-operation-parser.js
var require_binary_operation_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/binary-operation-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseFilterList = exports.parseFilterObject = exports.parseReferentialBinaryOperation = exports.parseValueBinaryOperation = exports.parseValueBinaryOperationOrExpression = void 0;
    var binary_operation_node_js_1 = require_binary_operation_node();
    var object_utils_js_1 = require_object_utils();
    var operation_node_source_js_1 = require_operation_node_source();
    var operator_node_js_1 = require_operator_node();
    var reference_parser_js_1 = require_reference_parser();
    var value_parser_js_1 = require_value_parser();
    var value_node_js_1 = require_value_node();
    var and_node_js_1 = require_and_node();
    var parens_node_js_1 = require_parens_node();
    var or_node_js_1 = require_or_node();
    function parseValueBinaryOperationOrExpression2(args) {
      if (args.length === 3) {
        return parseValueBinaryOperation2(args[0], args[1], args[2]);
      } else if (args.length === 1) {
        return (0, value_parser_js_1.parseValueExpression)(args[0]);
      }
      throw new Error(`invalid arguments: ${JSON.stringify(args)}`);
    }
    exports.parseValueBinaryOperationOrExpression = parseValueBinaryOperationOrExpression2;
    function parseValueBinaryOperation2(left, operator, right) {
      if (isIsOperator2(operator) && needsIsOperator2(right)) {
        return binary_operation_node_js_1.BinaryOperationNode.create((0, reference_parser_js_1.parseReferenceExpression)(left), parseOperator2(operator), value_node_js_1.ValueNode.createImmediate(right));
      }
      return binary_operation_node_js_1.BinaryOperationNode.create((0, reference_parser_js_1.parseReferenceExpression)(left), parseOperator2(operator), (0, value_parser_js_1.parseValueExpressionOrList)(right));
    }
    exports.parseValueBinaryOperation = parseValueBinaryOperation2;
    function parseReferentialBinaryOperation2(left, operator, right) {
      return binary_operation_node_js_1.BinaryOperationNode.create((0, reference_parser_js_1.parseReferenceExpression)(left), parseOperator2(operator), (0, reference_parser_js_1.parseReferenceExpression)(right));
    }
    exports.parseReferentialBinaryOperation = parseReferentialBinaryOperation2;
    function parseFilterObject2(obj, combinator) {
      return parseFilterList2(Object.entries(obj).filter(([, v]) => !(0, object_utils_js_1.isUndefined)(v)).map(([k, v]) => parseValueBinaryOperation2(k, needsIsOperator2(v) ? "is" : "=", v)), combinator);
    }
    exports.parseFilterObject = parseFilterObject2;
    function parseFilterList2(list, combinator) {
      const combine = combinator === "and" ? and_node_js_1.AndNode.create : or_node_js_1.OrNode.create;
      if (list.length === 0) {
        return value_node_js_1.ValueNode.createImmediate(combinator === "and");
      }
      let node = toOperationNode2(list[0]);
      for (let i = 1; i < list.length; ++i) {
        node = combine(node, toOperationNode2(list[i]));
      }
      if (list.length > 1) {
        return parens_node_js_1.ParensNode.create(node);
      }
      return node;
    }
    exports.parseFilterList = parseFilterList2;
    function isIsOperator2(operator) {
      return operator === "is" || operator === "is not";
    }
    function needsIsOperator2(value) {
      return (0, object_utils_js_1.isNull)(value) || (0, object_utils_js_1.isBoolean)(value);
    }
    function parseOperator2(operator) {
      if ((0, object_utils_js_1.isString)(operator) && operator_node_js_1.OPERATORS.includes(operator)) {
        return operator_node_js_1.OperatorNode.create(operator);
      }
      if ((0, operation_node_source_js_1.isOperationNodeSource)(operator)) {
        return operator.toOperationNode();
      }
      throw new Error(`invalid operator ${JSON.stringify(operator)}`);
    }
    function toOperationNode2(nodeOrSource) {
      return (0, operation_node_source_js_1.isOperationNodeSource)(nodeOrSource) ? nodeOrSource.toOperationNode() : nodeOrSource;
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/order-by-node.js
var require_order_by_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/order-by-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrderByNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.OrderByNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "OrderByNode";
      },
      create(items) {
        return (0, object_utils_js_1.freeze)({
          kind: "OrderByNode",
          items: (0, object_utils_js_1.freeze)([...items])
        });
      },
      cloneWithItems(orderBy, items) {
        return (0, object_utils_js_1.freeze)({
          ...orderBy,
          items: (0, object_utils_js_1.freeze)([...orderBy.items, ...items])
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/partition-by-node.js
var require_partition_by_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/partition-by-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PartitionByNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.PartitionByNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "PartitionByNode";
      },
      create(items) {
        return (0, object_utils_js_1.freeze)({
          kind: "PartitionByNode",
          items: (0, object_utils_js_1.freeze)(items)
        });
      },
      cloneWithItems(partitionBy, items) {
        return (0, object_utils_js_1.freeze)({
          ...partitionBy,
          items: (0, object_utils_js_1.freeze)([...partitionBy.items, ...items])
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/over-node.js
var require_over_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/over-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OverNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var order_by_node_js_1 = require_order_by_node();
    var partition_by_node_js_1 = require_partition_by_node();
    exports.OverNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "OverNode";
      },
      create() {
        return (0, object_utils_js_1.freeze)({
          kind: "OverNode"
        });
      },
      cloneWithOrderByItems(overNode, items) {
        return (0, object_utils_js_1.freeze)({
          ...overNode,
          orderBy: overNode.orderBy ? order_by_node_js_1.OrderByNode.cloneWithItems(overNode.orderBy, items) : order_by_node_js_1.OrderByNode.create(items)
        });
      },
      cloneWithPartitionByItems(overNode, items) {
        return (0, object_utils_js_1.freeze)({
          ...overNode,
          partitionBy: overNode.partitionBy ? partition_by_node_js_1.PartitionByNode.cloneWithItems(overNode.partitionBy, items) : partition_by_node_js_1.PartitionByNode.create(items)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/from-node.js
var require_from_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/from-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FromNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.FromNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "FromNode";
      },
      create(froms) {
        return (0, object_utils_js_1.freeze)({
          kind: "FromNode",
          froms: (0, object_utils_js_1.freeze)(froms)
        });
      },
      cloneWithFroms(from, froms) {
        return (0, object_utils_js_1.freeze)({
          ...from,
          froms: (0, object_utils_js_1.freeze)([...from.froms, ...froms])
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/group-by-node.js
var require_group_by_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/group-by-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GroupByNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.GroupByNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "GroupByNode";
      },
      create(items) {
        return (0, object_utils_js_1.freeze)({
          kind: "GroupByNode",
          items: (0, object_utils_js_1.freeze)(items)
        });
      },
      cloneWithItems(groupBy, items) {
        return (0, object_utils_js_1.freeze)({
          ...groupBy,
          items: (0, object_utils_js_1.freeze)([...groupBy.items, ...items])
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/having-node.js
var require_having_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/having-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HavingNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var and_node_js_1 = require_and_node();
    var or_node_js_1 = require_or_node();
    exports.HavingNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "HavingNode";
      },
      create(filter) {
        return (0, object_utils_js_1.freeze)({
          kind: "HavingNode",
          having: filter
        });
      },
      cloneWithOperation(havingNode, operator, operation) {
        return (0, object_utils_js_1.freeze)({
          ...havingNode,
          having: operator === "And" ? and_node_js_1.AndNode.create(havingNode.having, operation) : or_node_js_1.OrNode.create(havingNode.having, operation)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/select-query-node.js
var require_select_query_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/select-query-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectQueryNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var from_node_js_1 = require_from_node();
    var group_by_node_js_1 = require_group_by_node();
    var having_node_js_1 = require_having_node();
    var order_by_node_js_1 = require_order_by_node();
    exports.SelectQueryNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "SelectQueryNode";
      },
      create(withNode) {
        return (0, object_utils_js_1.freeze)({
          kind: "SelectQueryNode",
          ...withNode && { with: withNode }
        });
      },
      createFrom(fromItems, withNode) {
        return (0, object_utils_js_1.freeze)({
          kind: "SelectQueryNode",
          from: from_node_js_1.FromNode.create(fromItems),
          ...withNode && { with: withNode }
        });
      },
      cloneWithSelections(select, selections) {
        return (0, object_utils_js_1.freeze)({
          ...select,
          selections: select.selections ? (0, object_utils_js_1.freeze)([...select.selections, ...selections]) : (0, object_utils_js_1.freeze)(selections)
        });
      },
      cloneWithDistinctOn(select, expressions) {
        return (0, object_utils_js_1.freeze)({
          ...select,
          distinctOn: select.distinctOn ? (0, object_utils_js_1.freeze)([...select.distinctOn, ...expressions]) : (0, object_utils_js_1.freeze)(expressions)
        });
      },
      cloneWithFrontModifier(select, modifier) {
        return (0, object_utils_js_1.freeze)({
          ...select,
          frontModifiers: select.frontModifiers ? (0, object_utils_js_1.freeze)([...select.frontModifiers, modifier]) : (0, object_utils_js_1.freeze)([modifier])
        });
      },
      cloneWithEndModifier(select, modifier) {
        return (0, object_utils_js_1.freeze)({
          ...select,
          endModifiers: select.endModifiers ? (0, object_utils_js_1.freeze)([...select.endModifiers, modifier]) : (0, object_utils_js_1.freeze)([modifier])
        });
      },
      cloneWithOrderByItems(selectNode, items) {
        return (0, object_utils_js_1.freeze)({
          ...selectNode,
          orderBy: selectNode.orderBy ? order_by_node_js_1.OrderByNode.cloneWithItems(selectNode.orderBy, items) : order_by_node_js_1.OrderByNode.create(items)
        });
      },
      cloneWithGroupByItems(selectNode, items) {
        return (0, object_utils_js_1.freeze)({
          ...selectNode,
          groupBy: selectNode.groupBy ? group_by_node_js_1.GroupByNode.cloneWithItems(selectNode.groupBy, items) : group_by_node_js_1.GroupByNode.create(items)
        });
      },
      cloneWithLimit(selectNode, limit) {
        return (0, object_utils_js_1.freeze)({
          ...selectNode,
          limit
        });
      },
      cloneWithOffset(selectNode, offset) {
        return (0, object_utils_js_1.freeze)({
          ...selectNode,
          offset
        });
      },
      cloneWithHaving(selectNode, operation) {
        return (0, object_utils_js_1.freeze)({
          ...selectNode,
          having: selectNode.having ? having_node_js_1.HavingNode.cloneWithOperation(selectNode.having, "And", operation) : having_node_js_1.HavingNode.create(operation)
        });
      },
      cloneWithSetOperations(selectNode, setOperations) {
        return (0, object_utils_js_1.freeze)({
          ...selectNode,
          setOperations: selectNode.setOperations ? (0, object_utils_js_1.freeze)([...selectNode.setOperations, ...setOperations]) : (0, object_utils_js_1.freeze)([...setOperations])
        });
      },
      cloneWithoutSelections(select) {
        return (0, object_utils_js_1.freeze)({
          ...select,
          selections: []
        });
      },
      cloneWithoutLimit(select) {
        return (0, object_utils_js_1.freeze)({
          ...select,
          limit: void 0
        });
      },
      cloneWithoutOffset(select) {
        return (0, object_utils_js_1.freeze)({
          ...select,
          offset: void 0
        });
      },
      cloneWithoutOrderBy(select) {
        return (0, object_utils_js_1.freeze)({
          ...select,
          orderBy: void 0
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/util/prevent-await.js
var require_prevent_await = __commonJS({
  "node_modules/kysely/dist/cjs/util/prevent-await.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.preventAwait = void 0;
    function preventAwait2(clazz, message) {
      Object.defineProperties(clazz.prototype, {
        then: {
          enumerable: false,
          value: () => {
            throw new Error(message);
          }
        }
      });
    }
    exports.preventAwait = preventAwait2;
  }
});

// node_modules/kysely/dist/cjs/query-builder/join-builder.js
var require_join_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/join-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JoinBuilder = void 0;
    var join_node_js_1 = require_join_node();
    var raw_node_js_1 = require_raw_node();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var object_utils_js_1 = require_object_utils();
    var prevent_await_js_1 = require_prevent_await();
    var JoinBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      on(...args) {
        return new JoinBuilder2({
          ...this.#props,
          joinNode: join_node_js_1.JoinNode.cloneWithOn(this.#props.joinNode, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args))
        });
      }
      /**
       * Just like {@link WhereInterface.whereRef} but adds an item to the join's
       * `on` clause instead.
       *
       * See {@link WhereInterface.whereRef} for documentation and examples.
       */
      onRef(lhs, op, rhs) {
        return new JoinBuilder2({
          ...this.#props,
          joinNode: join_node_js_1.JoinNode.cloneWithOn(this.#props.joinNode, (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhs, op, rhs))
        });
      }
      /**
       * Adds `on true`.
       */
      onTrue() {
        return new JoinBuilder2({
          ...this.#props,
          joinNode: join_node_js_1.JoinNode.cloneWithOn(this.#props.joinNode, raw_node_js_1.RawNode.createWithSql("true"))
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.joinNode;
      }
    };
    exports.JoinBuilder = JoinBuilder2;
    (0, prevent_await_js_1.preventAwait)(JoinBuilder2, "don't await JoinBuilder instances. They are never executed directly and are always just a part of a query.");
  }
});

// node_modules/kysely/dist/cjs/operation-node/partition-by-item-node.js
var require_partition_by_item_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/partition-by-item-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PartitionByItemNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.PartitionByItemNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "PartitionByItemNode";
      },
      create(partitionBy) {
        return (0, object_utils_js_1.freeze)({
          kind: "PartitionByItemNode",
          partitionBy
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/partition-by-parser.js
var require_partition_by_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/partition-by-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parsePartitionBy = void 0;
    var partition_by_item_node_js_1 = require_partition_by_item_node();
    var reference_parser_js_1 = require_reference_parser();
    function parsePartitionBy2(partitionBy) {
      return (0, reference_parser_js_1.parseReferenceExpressionOrList)(partitionBy).map(partition_by_item_node_js_1.PartitionByItemNode.create);
    }
    exports.parsePartitionBy = parsePartitionBy2;
  }
});

// node_modules/kysely/dist/cjs/query-builder/over-builder.js
var require_over_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/over-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OverBuilder = void 0;
    var over_node_js_1 = require_over_node();
    var order_by_parser_js_1 = require_order_by_parser();
    var partition_by_parser_js_1 = require_partition_by_parser();
    var object_utils_js_1 = require_object_utils();
    var prevent_await_js_1 = require_prevent_await();
    var OverBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      /**
       * Adds an order by clause item inside the over function.
       *
       * ```ts
       * const result = await db
       *   .selectFrom('person')
       *   .select(
       *     (eb) => eb.fn.avg<number>('age').over(
       *       ob => ob.orderBy('first_name', 'asc').orderBy('last_name', 'asc')
       *     ).as('average_age')
       *   )
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select avg("age") over(order by "first_name" asc, "last_name" asc) as "average_age"
       * from "person"
       * ```
       */
      orderBy(orderBy, direction) {
        return new OverBuilder2({
          overNode: over_node_js_1.OverNode.cloneWithOrderByItems(this.#props.overNode, (0, order_by_parser_js_1.parseOrderBy)([orderBy, direction]))
        });
      }
      partitionBy(partitionBy) {
        return new OverBuilder2({
          overNode: over_node_js_1.OverNode.cloneWithPartitionByItems(this.#props.overNode, (0, partition_by_parser_js_1.parsePartitionBy)(partitionBy))
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.overNode;
      }
    };
    exports.OverBuilder = OverBuilder2;
    (0, prevent_await_js_1.preventAwait)(OverBuilder2, "don't await OverBuilder instances. They are never executed directly and are always just a part of a query.");
  }
});

// node_modules/kysely/dist/cjs/operation-node/selection-node.js
var require_selection_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/selection-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectionNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var reference_node_js_1 = require_reference_node();
    var select_all_node_js_1 = require_select_all_node();
    exports.SelectionNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "SelectionNode";
      },
      create(selection) {
        return (0, object_utils_js_1.freeze)({
          kind: "SelectionNode",
          selection
        });
      },
      createSelectAll() {
        return (0, object_utils_js_1.freeze)({
          kind: "SelectionNode",
          selection: select_all_node_js_1.SelectAllNode.create()
        });
      },
      createSelectAllFromTable(table) {
        return (0, object_utils_js_1.freeze)({
          kind: "SelectionNode",
          selection: reference_node_js_1.ReferenceNode.createSelectAll(table)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/select-parser.js
var require_select_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/select-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseSelectAll = exports.parseSelectArg = void 0;
    var object_utils_js_1 = require_object_utils();
    var selection_node_js_1 = require_selection_node();
    var reference_parser_js_1 = require_reference_parser();
    var dynamic_reference_builder_js_1 = require_dynamic_reference_builder();
    var expression_parser_js_1 = require_expression_parser();
    var table_parser_js_1 = require_table_parser();
    var expression_builder_js_1 = require_expression_builder();
    function parseSelectArg2(selection) {
      if ((0, object_utils_js_1.isFunction)(selection)) {
        return parseSelectArg2(selection((0, expression_builder_js_1.expressionBuilder)()));
      } else if ((0, object_utils_js_1.isReadonlyArray)(selection)) {
        return selection.map((it) => parseSelectExpression2(it));
      } else {
        return [parseSelectExpression2(selection)];
      }
    }
    exports.parseSelectArg = parseSelectArg2;
    function parseSelectExpression2(selection) {
      if ((0, object_utils_js_1.isString)(selection)) {
        return selection_node_js_1.SelectionNode.create((0, reference_parser_js_1.parseAliasedStringReference)(selection));
      } else if ((0, dynamic_reference_builder_js_1.isDynamicReferenceBuilder)(selection)) {
        return selection_node_js_1.SelectionNode.create(selection.toOperationNode());
      } else {
        return selection_node_js_1.SelectionNode.create((0, expression_parser_js_1.parseAliasedExpression)(selection));
      }
    }
    function parseSelectAll2(table) {
      if (!table) {
        return [selection_node_js_1.SelectionNode.createSelectAll()];
      } else if (Array.isArray(table)) {
        return table.map(parseSelectAllArg2);
      } else {
        return [parseSelectAllArg2(table)];
      }
    }
    exports.parseSelectAll = parseSelectAll2;
    function parseSelectAllArg2(table) {
      if ((0, object_utils_js_1.isString)(table)) {
        return selection_node_js_1.SelectionNode.createSelectAllFromTable((0, table_parser_js_1.parseTable)(table));
      }
      throw new Error(`invalid value selectAll expression: ${JSON.stringify(table)}`);
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/values-node.js
var require_values_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/values-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValuesNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ValuesNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ValuesNode";
      },
      create(values) {
        return (0, object_utils_js_1.freeze)({
          kind: "ValuesNode",
          values: (0, object_utils_js_1.freeze)(values)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/default-insert-value-node.js
var require_default_insert_value_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/default-insert-value-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultInsertValueNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.DefaultInsertValueNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DefaultInsertValueNode";
      },
      create() {
        return (0, object_utils_js_1.freeze)({
          kind: "DefaultInsertValueNode"
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/insert-values-parser.js
var require_insert_values_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/insert-values-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseInsertExpression = void 0;
    var column_node_js_1 = require_column_node();
    var primitive_value_list_node_js_1 = require_primitive_value_list_node();
    var value_list_node_js_1 = require_value_list_node();
    var object_utils_js_1 = require_object_utils();
    var value_parser_js_1 = require_value_parser();
    var values_node_js_1 = require_values_node();
    var expression_parser_js_1 = require_expression_parser();
    var default_insert_value_node_js_1 = require_default_insert_value_node();
    var expression_builder_js_1 = require_expression_builder();
    function parseInsertExpression2(arg) {
      const objectOrList = (0, object_utils_js_1.isFunction)(arg) ? arg((0, expression_builder_js_1.expressionBuilder)()) : arg;
      const list = (0, object_utils_js_1.isReadonlyArray)(objectOrList) ? objectOrList : (0, object_utils_js_1.freeze)([objectOrList]);
      return parseInsertColumnsAndValues2(list);
    }
    exports.parseInsertExpression = parseInsertExpression2;
    function parseInsertColumnsAndValues2(rows) {
      const columns = parseColumnNamesAndIndexes2(rows);
      return [
        (0, object_utils_js_1.freeze)([...columns.keys()].map(column_node_js_1.ColumnNode.create)),
        values_node_js_1.ValuesNode.create(rows.map((row) => parseRowValues2(row, columns)))
      ];
    }
    function parseColumnNamesAndIndexes2(rows) {
      const columns = /* @__PURE__ */ new Map();
      for (const row of rows) {
        const cols = Object.keys(row);
        for (const col of cols) {
          if (!columns.has(col) && row[col] !== void 0) {
            columns.set(col, columns.size);
          }
        }
      }
      return columns;
    }
    function parseRowValues2(row, columns) {
      const rowColumns = Object.keys(row);
      const rowValues = Array.from({
        length: columns.size
      });
      let hasUndefinedOrComplexColumns = false;
      for (const col of rowColumns) {
        const columnIdx = columns.get(col);
        if ((0, object_utils_js_1.isUndefined)(columnIdx)) {
          continue;
        }
        const value = row[col];
        if ((0, object_utils_js_1.isUndefined)(value) || (0, expression_parser_js_1.isExpressionOrFactory)(value)) {
          hasUndefinedOrComplexColumns = true;
        }
        rowValues[columnIdx] = value;
      }
      const hasMissingColumns = rowColumns.length < columns.size;
      if (hasMissingColumns || hasUndefinedOrComplexColumns) {
        const defaultValue = default_insert_value_node_js_1.DefaultInsertValueNode.create();
        return value_list_node_js_1.ValueListNode.create(rowValues.map((it) => (0, object_utils_js_1.isUndefined)(it) ? defaultValue : (0, value_parser_js_1.parseValueExpression)(it)));
      }
      return primitive_value_list_node_js_1.PrimitiveValueListNode.create(rowValues);
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/insert-query-node.js
var require_insert_query_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/insert-query-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InsertQueryNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.InsertQueryNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "InsertQueryNode";
      },
      create(into, withNode, replace) {
        return (0, object_utils_js_1.freeze)({
          kind: "InsertQueryNode",
          into,
          ...withNode && { with: withNode },
          replace
        });
      },
      cloneWith(insertQuery, props) {
        return (0, object_utils_js_1.freeze)({
          ...insertQuery,
          ...props
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/update-query-node.js
var require_update_query_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/update-query-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UpdateQueryNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var from_node_js_1 = require_from_node();
    exports.UpdateQueryNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "UpdateQueryNode";
      },
      create(table, withNode) {
        return (0, object_utils_js_1.freeze)({
          kind: "UpdateQueryNode",
          table,
          ...withNode && { with: withNode }
        });
      },
      cloneWithFromItems(updateQuery, fromItems) {
        return (0, object_utils_js_1.freeze)({
          ...updateQuery,
          from: updateQuery.from ? from_node_js_1.FromNode.cloneWithFroms(updateQuery.from, fromItems) : from_node_js_1.FromNode.create(fromItems)
        });
      },
      cloneWithUpdates(updateQuery, updates) {
        return (0, object_utils_js_1.freeze)({
          ...updateQuery,
          updates: updateQuery.updates ? (0, object_utils_js_1.freeze)([...updateQuery.updates, ...updates]) : updates
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/using-node.js
var require_using_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/using-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UsingNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.UsingNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "UsingNode";
      },
      create(tables) {
        return (0, object_utils_js_1.freeze)({
          kind: "UsingNode",
          tables: (0, object_utils_js_1.freeze)(tables)
        });
      },
      cloneWithTables(using, tables) {
        return (0, object_utils_js_1.freeze)({
          ...using,
          tables: (0, object_utils_js_1.freeze)([...using.tables, ...tables])
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/delete-query-node.js
var require_delete_query_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/delete-query-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeleteQueryNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var from_node_js_1 = require_from_node();
    var order_by_node_js_1 = require_order_by_node();
    var using_node_js_1 = require_using_node();
    exports.DeleteQueryNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DeleteQueryNode";
      },
      create(fromItems, withNode) {
        return (0, object_utils_js_1.freeze)({
          kind: "DeleteQueryNode",
          from: from_node_js_1.FromNode.create(fromItems),
          ...withNode && { with: withNode }
        });
      },
      cloneWithOrderByItems(deleteNode, items) {
        return (0, object_utils_js_1.freeze)({
          ...deleteNode,
          orderBy: deleteNode.orderBy ? order_by_node_js_1.OrderByNode.cloneWithItems(deleteNode.orderBy, items) : order_by_node_js_1.OrderByNode.create(items)
        });
      },
      cloneWithLimit(deleteNode, limit) {
        return (0, object_utils_js_1.freeze)({
          ...deleteNode,
          limit
        });
      },
      cloneWithUsing(deleteNode, tables) {
        return (0, object_utils_js_1.freeze)({
          ...deleteNode,
          using: deleteNode.using !== void 0 ? using_node_js_1.UsingNode.cloneWithTables(deleteNode.using, tables) : using_node_js_1.UsingNode.create(tables)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/where-node.js
var require_where_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/where-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WhereNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var and_node_js_1 = require_and_node();
    var or_node_js_1 = require_or_node();
    exports.WhereNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "WhereNode";
      },
      create(filter) {
        return (0, object_utils_js_1.freeze)({
          kind: "WhereNode",
          where: filter
        });
      },
      cloneWithOperation(whereNode, operator, operation) {
        return (0, object_utils_js_1.freeze)({
          ...whereNode,
          where: operator === "And" ? and_node_js_1.AndNode.create(whereNode.where, operation) : or_node_js_1.OrNode.create(whereNode.where, operation)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/returning-node.js
var require_returning_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/returning-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReturningNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ReturningNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ReturningNode";
      },
      create(selections) {
        return (0, object_utils_js_1.freeze)({
          kind: "ReturningNode",
          selections: (0, object_utils_js_1.freeze)(selections)
        });
      },
      cloneWithSelections(returning, selections) {
        return (0, object_utils_js_1.freeze)({
          ...returning,
          selections: returning.selections ? (0, object_utils_js_1.freeze)([...returning.selections, ...selections]) : (0, object_utils_js_1.freeze)(selections)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/explain-node.js
var require_explain_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/explain-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExplainNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ExplainNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ExplainNode";
      },
      create(format, options) {
        return (0, object_utils_js_1.freeze)({
          kind: "ExplainNode",
          format,
          options
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/query-node.js
var require_query_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/query-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QueryNode = void 0;
    var insert_query_node_js_1 = require_insert_query_node();
    var select_query_node_js_1 = require_select_query_node();
    var update_query_node_js_1 = require_update_query_node();
    var delete_query_node_js_1 = require_delete_query_node();
    var where_node_js_1 = require_where_node();
    var object_utils_js_1 = require_object_utils();
    var returning_node_js_1 = require_returning_node();
    var explain_node_js_1 = require_explain_node();
    exports.QueryNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return select_query_node_js_1.SelectQueryNode.is(node) || insert_query_node_js_1.InsertQueryNode.is(node) || update_query_node_js_1.UpdateQueryNode.is(node) || delete_query_node_js_1.DeleteQueryNode.is(node);
      },
      cloneWithWhere(node, operation) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          where: node.where ? where_node_js_1.WhereNode.cloneWithOperation(node.where, "And", operation) : where_node_js_1.WhereNode.create(operation)
        });
      },
      cloneWithJoin(node, join) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          joins: node.joins ? (0, object_utils_js_1.freeze)([...node.joins, join]) : (0, object_utils_js_1.freeze)([join])
        });
      },
      cloneWithReturning(node, selections) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          returning: node.returning ? returning_node_js_1.ReturningNode.cloneWithSelections(node.returning, selections) : returning_node_js_1.ReturningNode.create(selections)
        });
      },
      cloneWithoutWhere(node) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          where: void 0
        });
      },
      cloneWithExplain(node, format, options) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          explain: explain_node_js_1.ExplainNode.create(format, options?.toOperationNode())
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/column-update-node.js
var require_column_update_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/column-update-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ColumnUpdateNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ColumnUpdateNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ColumnUpdateNode";
      },
      create(column, value) {
        return (0, object_utils_js_1.freeze)({
          kind: "ColumnUpdateNode",
          column,
          value
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/update-set-parser.js
var require_update_set_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/update-set-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseUpdateExpression = void 0;
    var column_node_js_1 = require_column_node();
    var column_update_node_js_1 = require_column_update_node();
    var expression_builder_js_1 = require_expression_builder();
    var object_utils_js_1 = require_object_utils();
    var value_parser_js_1 = require_value_parser();
    function parseUpdateExpression2(update) {
      const updateObj = (0, object_utils_js_1.isFunction)(update) ? update((0, expression_builder_js_1.expressionBuilder)()) : update;
      return Object.entries(updateObj).filter(([_, value]) => value !== void 0).map(([key, value]) => {
        return column_update_node_js_1.ColumnUpdateNode.create(column_node_js_1.ColumnNode.create(key), (0, value_parser_js_1.parseValueExpression)(value));
      });
    }
    exports.parseUpdateExpression = parseUpdateExpression2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/on-duplicate-key-node.js
var require_on_duplicate_key_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/on-duplicate-key-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OnDuplicateKeyNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.OnDuplicateKeyNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "OnDuplicateKeyNode";
      },
      create(updates) {
        return (0, object_utils_js_1.freeze)({
          kind: "OnDuplicateKeyNode",
          updates
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/query-builder/insert-result.js
var require_insert_result = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/insert-result.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InsertResult = void 0;
    var InsertResult2 = class {
      /**
       * The auto incrementing primary key
       */
      insertId;
      /**
       * Affected rows count.
       */
      numInsertedOrUpdatedRows;
      constructor(insertId, numInsertedOrUpdatedRows) {
        this.insertId = insertId;
        this.numInsertedOrUpdatedRows = numInsertedOrUpdatedRows;
      }
    };
    exports.InsertResult = InsertResult2;
  }
});

// node_modules/kysely/dist/cjs/query-builder/no-result-error.js
var require_no_result_error = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/no-result-error.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isNoResultErrorConstructor = exports.NoResultError = void 0;
    var NoResultError2 = class extends Error {
      /**
       * The operation node tree of the query that was executed.
       */
      node;
      constructor(node) {
        super("no result");
        this.node = node;
      }
    };
    exports.NoResultError = NoResultError2;
    function isNoResultErrorConstructor2(fn) {
      return Object.prototype.hasOwnProperty.call(fn, "prototype");
    }
    exports.isNoResultErrorConstructor = isNoResultErrorConstructor2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/on-conflict-node.js
var require_on_conflict_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/on-conflict-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OnConflictNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var where_node_js_1 = require_where_node();
    exports.OnConflictNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "OnConflictNode";
      },
      create() {
        return (0, object_utils_js_1.freeze)({
          kind: "OnConflictNode"
        });
      },
      cloneWith(node, props) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          ...props
        });
      },
      cloneWithIndexWhere(node, operation) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          indexWhere: node.indexWhere ? where_node_js_1.WhereNode.cloneWithOperation(node.indexWhere, "And", operation) : where_node_js_1.WhereNode.create(operation)
        });
      },
      cloneWithIndexOrWhere(node, operation) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          indexWhere: node.indexWhere ? where_node_js_1.WhereNode.cloneWithOperation(node.indexWhere, "Or", operation) : where_node_js_1.WhereNode.create(operation)
        });
      },
      cloneWithUpdateWhere(node, operation) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          updateWhere: node.updateWhere ? where_node_js_1.WhereNode.cloneWithOperation(node.updateWhere, "And", operation) : where_node_js_1.WhereNode.create(operation)
        });
      },
      cloneWithUpdateOrWhere(node, operation) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          updateWhere: node.updateWhere ? where_node_js_1.WhereNode.cloneWithOperation(node.updateWhere, "Or", operation) : where_node_js_1.WhereNode.create(operation)
        });
      },
      cloneWithoutIndexWhere(node) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          indexWhere: void 0
        });
      },
      cloneWithoutUpdateWhere(node) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          updateWhere: void 0
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/query-builder/on-conflict-builder.js
var require_on_conflict_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/on-conflict-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OnConflictUpdateBuilder = exports.OnConflictDoNothingBuilder = exports.OnConflictBuilder = void 0;
    var column_node_js_1 = require_column_node();
    var identifier_node_js_1 = require_identifier_node();
    var on_conflict_node_js_1 = require_on_conflict_node();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var update_set_parser_js_1 = require_update_set_parser();
    var object_utils_js_1 = require_object_utils();
    var prevent_await_js_1 = require_prevent_await();
    var OnConflictBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      /**
       * Specify a single column as the conflict target.
       *
       * Also see the {@link columns}, {@link constraint} and {@link expression}
       * methods for alternative ways to specify the conflict target.
       */
      column(column) {
        const columnNode = column_node_js_1.ColumnNode.create(column);
        return new OnConflictBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
            columns: this.#props.onConflictNode.columns ? (0, object_utils_js_1.freeze)([...this.#props.onConflictNode.columns, columnNode]) : (0, object_utils_js_1.freeze)([columnNode])
          })
        });
      }
      /**
       * Specify a list of columns as the conflict target.
       *
       * Also see the {@link column}, {@link constraint} and {@link expression}
       * methods for alternative ways to specify the conflict target.
       */
      columns(columns) {
        const columnNodes = columns.map(column_node_js_1.ColumnNode.create);
        return new OnConflictBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
            columns: this.#props.onConflictNode.columns ? (0, object_utils_js_1.freeze)([...this.#props.onConflictNode.columns, ...columnNodes]) : (0, object_utils_js_1.freeze)(columnNodes)
          })
        });
      }
      /**
       * Specify a specific constraint by name as the conflict target.
       *
       * Also see the {@link column}, {@link columns} and {@link expression}
       * methods for alternative ways to specify the conflict target.
       */
      constraint(constraintName) {
        return new OnConflictBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
            constraint: identifier_node_js_1.IdentifierNode.create(constraintName)
          })
        });
      }
      /**
       * Specify an expression as the conflict target.
       *
       * This can be used if the unique index is an expression index.
       *
       * Also see the {@link column}, {@link columns} and {@link constraint}
       * methods for alternative ways to specify the conflict target.
       */
      expression(expression) {
        return new OnConflictBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
            indexExpression: expression.toOperationNode()
          })
        });
      }
      where(...args) {
        return new OnConflictBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args))
        });
      }
      /**
       * Specify an index predicate for the index target.
       *
       * See {@link WhereInterface.whereRef} for more info.
       */
      whereRef(lhs, op, rhs) {
        return new OnConflictBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhs, op, rhs))
        });
      }
      clearWhere() {
        return new OnConflictBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithoutIndexWhere(this.#props.onConflictNode)
        });
      }
      /**
       * Adds the "do nothing" conflict action.
       *
       * ### Examples
       *
       * ```ts
       * await db
       *   .insertInto('person')
       *   .values({ first_name, pic })
       *   .onConflict((oc) => oc
       *     .column('pic')
       *     .doNothing()
       *   )
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * insert into "person" ("first_name", "pic")
       * values ($1, $2)
       * on conflict ("pic") do nothing
       * ```
       */
      doNothing() {
        return new OnConflictDoNothingBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
            doNothing: true
          })
        });
      }
      /**
       * Adds the "do update set" conflict action.
       *
       * ### Examples
       *
       * ```ts
       * await db
       *   .insertInto('person')
       *   .values({ first_name, pic })
       *   .onConflict((oc) => oc
       *     .column('pic')
       *     .doUpdateSet({ first_name })
       *   )
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * insert into "person" ("first_name", "pic")
       * values ($1, $2)
       * on conflict ("pic")
       * do update set "first_name" = $3
       * ```
       *
       * In the next example we use the `ref` method to reference
       * columns of the virtual table `excluded` in a type-safe way
       * to create an upsert operation:
       *
       * ```ts
       * db.insertInto('person')
       *   .values(person)
       *   .onConflict((oc) => oc
       *     .column('id')
       *     .doUpdateSet((eb) => ({
       *       first_name: eb.ref('excluded.first_name'),
       *       last_name: eb.ref('excluded.last_name')
       *     }))
       *   )
       * ```
       */
      doUpdateSet(update) {
        return new OnConflictUpdateBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
            updates: (0, update_set_parser_js_1.parseUpdateExpression)(update)
          })
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
    };
    exports.OnConflictBuilder = OnConflictBuilder2;
    (0, prevent_await_js_1.preventAwait)(OnConflictBuilder2, "don't await OnConflictBuilder instances.");
    var OnConflictDoNothingBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      toOperationNode() {
        return this.#props.onConflictNode;
      }
    };
    exports.OnConflictDoNothingBuilder = OnConflictDoNothingBuilder2;
    (0, prevent_await_js_1.preventAwait)(OnConflictDoNothingBuilder2, "don't await OnConflictDoNothingBuilder instances.");
    var OnConflictUpdateBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      where(...args) {
        return new OnConflictUpdateBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args))
        });
      }
      /**
       * Specify a where condition for the update operation.
       *
       * See {@link WhereInterface.whereRef} for more info.
       */
      whereRef(lhs, op, rhs) {
        return new OnConflictUpdateBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhs, op, rhs))
        });
      }
      clearWhere() {
        return new OnConflictUpdateBuilder2({
          ...this.#props,
          onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithoutUpdateWhere(this.#props.onConflictNode)
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.onConflictNode;
      }
    };
    exports.OnConflictUpdateBuilder = OnConflictUpdateBuilder2;
    (0, prevent_await_js_1.preventAwait)(OnConflictUpdateBuilder2, "don't await OnConflictUpdateBuilder instances.");
  }
});

// node_modules/kysely/dist/cjs/query-builder/insert-query-builder.js
var require_insert_query_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/insert-query-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InsertQueryBuilder = void 0;
    var select_parser_js_1 = require_select_parser();
    var insert_values_parser_js_1 = require_insert_values_parser();
    var insert_query_node_js_1 = require_insert_query_node();
    var query_node_js_1 = require_query_node();
    var update_set_parser_js_1 = require_update_set_parser();
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var on_duplicate_key_node_js_1 = require_on_duplicate_key_node();
    var insert_result_js_1 = require_insert_result();
    var no_result_error_js_1 = require_no_result_error();
    var expression_parser_js_1 = require_expression_parser();
    var column_node_js_1 = require_column_node();
    var on_conflict_builder_js_1 = require_on_conflict_builder();
    var on_conflict_node_js_1 = require_on_conflict_node();
    var InsertQueryBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      values(insert) {
        const [columns, values] = (0, insert_values_parser_js_1.parseInsertExpression)(insert);
        return new InsertQueryBuilder2({
          ...this.#props,
          queryNode: insert_query_node_js_1.InsertQueryNode.cloneWith(this.#props.queryNode, {
            columns,
            values
          })
        });
      }
      /**
       * Sets the columns to insert.
       *
       * The {@link values} method sets both the columns and the values and this method
       * is not needed. But if you are using the {@link expression} method, you can use
       * this method to set the columns to insert.
       *
       * ### Examples
       *
       * ```ts
       * db.insertInto('person')
       *   .columns(['first_name'])
       *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * insert into "person" ("first_name")
       * select "pet"."name" from "pet"
       * ```
       */
      columns(columns) {
        return new InsertQueryBuilder2({
          ...this.#props,
          queryNode: insert_query_node_js_1.InsertQueryNode.cloneWith(this.#props.queryNode, {
            columns: (0, object_utils_js_1.freeze)(columns.map(column_node_js_1.ColumnNode.create))
          })
        });
      }
      /**
       * Insert an arbitrary expression. For example the result of a select query.
       *
       * ### Examples
       *
       * <!-- siteExample("insert", "Insert subquery", 50) -->
       *
       * You can create an `INSERT INTO SELECT FROM` query using the `expression` method:
       *
       * ```ts
       * const result = await db.insertInto('person')
       *   .columns(['first_name', 'last_name', 'age'])
       *   .expression((eb) => eb
       *     .selectFrom('pet')
       *     .select((eb) => [
       *       'pet.name',
       *       eb.val('Petson').as('last_name'),
       *       eb.val(7).as('age'),
       *     ])
       *   )
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * insert into "person" ("first_name", "last_name", "age")
       * select "pet"."name", $1 as "first_name", $2 as "last_name" from "pet"
       * ```
       */
      expression(expression) {
        return new InsertQueryBuilder2({
          ...this.#props,
          queryNode: insert_query_node_js_1.InsertQueryNode.cloneWith(this.#props.queryNode, {
            values: (0, expression_parser_js_1.parseExpression)(expression)
          })
        });
      }
      /**
       * Changes an `insert into` query to an `insert ignore into` query.
       *
       * If you use the ignore modifier, ignorable errors that occur while executing the
       * insert statement are ignored. For example, without ignore, a row that duplicates
       * an existing unique index or primary key value in the table causes a duplicate-key
       * error and the statement is aborted. With ignore, the row is discarded and no error
       * occurs.
       *
       * This is only supported on some dialects like MySQL. On most dialects you should
       * use the {@link onConflict} method.
       *
       * ### Examples
       *
       * ```ts
       * await db.insertInto('person')
       *   .ignore()
       *   .values(values)
       *   .execute()
       * ```
       */
      ignore() {
        return new InsertQueryBuilder2({
          ...this.#props,
          queryNode: insert_query_node_js_1.InsertQueryNode.cloneWith(this.#props.queryNode, {
            ignore: true
          })
        });
      }
      /**
       * Adds an `on conflict` clause to the query.
       *
       * `on conflict` is only supported by some dialects like PostgreSQL and SQLite. On MySQL
       * you can use {@link ignore} and {@link onDuplicateKeyUpdate} to achieve similar results.
       *
       * ### Examples
       *
       * ```ts
       * await db
       *   .insertInto('pet')
       *   .values({
       *     name: 'Catto',
       *     species: 'cat',
       *   })
       *   .onConflict((oc) => oc
       *     .column('name')
       *     .doUpdateSet({ species: 'hamster' })
       *   )
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * insert into "pet" ("name", "species")
       * values ($1, $2)
       * on conflict ("name")
       * do update set "species" = $3
       * ```
       *
       * You can provide the name of the constraint instead of a column name:
       *
       * ```ts
       * await db
       *   .insertInto('pet')
       *   .values({
       *     name: 'Catto',
       *     species: 'cat',
       *   })
       *   .onConflict((oc) => oc
       *     .constraint('pet_name_key')
       *     .doUpdateSet({ species: 'hamster' })
       *   )
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * insert into "pet" ("name", "species")
       * values ($1, $2)
       * on conflict on constraint "pet_name_key"
       * do update set "species" = $3
       * ```
       *
       * You can also specify an expression as the conflict target in case
       * the unique index is an expression index:
       *
       * ```ts
       * import { sql } from 'kysely'
       *
       * await db
       *   .insertInto('pet')
       *   .values({
       *     name: 'Catto',
       *     species: 'cat',
       *   })
       *   .onConflict((oc) => oc
       *     .expression(sql`lower(name)`)
       *     .doUpdateSet({ species: 'hamster' })
       *   )
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * insert into "pet" ("name", "species")
       * values ($1, $2)
       * on conflict (lower(name))
       * do update set "species" = $3
       * ```
       *
       * You can add a filter for the update statement like this:
       *
       * ```ts
       * await db
       *   .insertInto('pet')
       *   .values({
       *     name: 'Catto',
       *     species: 'cat',
       *   })
       *   .onConflict((oc) => oc
       *     .column('name')
       *     .doUpdateSet({ species: 'hamster' })
       *     .where('excluded.name', '!=', 'Catto'')
       *   )
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * insert into "pet" ("name", "species")
       * values ($1, $2)
       * on conflict ("name")
       * do update set "species" = $3
       * where "excluded"."name" != $4
       * ```
       *
       * You can create an `on conflict do nothing` clauses like this:
       *
       * ```ts
       * await db
       *   .insertInto('pet')
       *   .values({
       *     name: 'Catto',
       *     species: 'cat',
       *   })
       *   .onConflict((oc) => oc
       *     .column('name')
       *     .doNothing()
       *   )
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * insert into "pet" ("name", "species")
       * values ($1, $2)
       * on conflict ("name") do nothing
       * ```
       *
       * You can refer to the columns of the virtual `excluded` table
       * in a type-safe way using a callback and the `ref` method of
       * `ExpressionBuilder`:
       *
       * ```ts
       * db.insertInto('person')
       *   .values(person)
       *   .onConflict(oc => oc
       *     .column('id')
       *     .doUpdateSet({
       *       first_name: (eb) => eb.ref('excluded.first_name'),
       *       last_name: (eb) => eb.ref('excluded.last_name')
       *     })
       *   )
       * ```
       */
      onConflict(callback) {
        return new InsertQueryBuilder2({
          ...this.#props,
          queryNode: insert_query_node_js_1.InsertQueryNode.cloneWith(this.#props.queryNode, {
            onConflict: callback(new on_conflict_builder_js_1.OnConflictBuilder({
              onConflictNode: on_conflict_node_js_1.OnConflictNode.create()
            })).toOperationNode()
          })
        });
      }
      /**
       * Adds `on duplicate key update` to the query.
       *
       * If you specify `on duplicate key update`, and a row is inserted that would cause
       * a duplicate value in a unique index or primary key, an update of the old row occurs.
       *
       * This is only implemented by some dialects like MySQL. On most dialects you should
       * use {@link onConflict} instead.
       *
       * ### Examples
       *
       * ```ts
       * await db
       *   .insertInto('person')
       *   .values(values)
       *   .onDuplicateKeyUpdate({ species: 'hamster' })
       * ```
       */
      onDuplicateKeyUpdate(update) {
        return new InsertQueryBuilder2({
          ...this.#props,
          queryNode: insert_query_node_js_1.InsertQueryNode.cloneWith(this.#props.queryNode, {
            onDuplicateKey: on_duplicate_key_node_js_1.OnDuplicateKeyNode.create((0, update_set_parser_js_1.parseUpdateExpression)(update))
          })
        });
      }
      returning(selection) {
        return new InsertQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithReturning(this.#props.queryNode, (0, select_parser_js_1.parseSelectArg)(selection))
        });
      }
      returningAll() {
        return new InsertQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithReturning(this.#props.queryNode, (0, select_parser_js_1.parseSelectAll)())
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       *
       * If you want to conditionally call a method on `this`, see
       * the {@link $if} method.
       *
       * ### Examples
       *
       * The next example uses a helper function `log` to log a query:
       *
       * ```ts
       * function log<T extends Compilable>(qb: T): T {
       *   console.log(qb.compile())
       *   return qb
       * }
       *
       * db.updateTable('person')
       *   .set(values)
       *   .$call(log)
       *   .execute()
       * ```
       */
      $call(func) {
        return func(this);
      }
      /**
       * Call `func(this)` if `condition` is true.
       *
       * This method is especially handy with optional selects. Any `returning` or `returningAll`
       * method calls add columns as optional fields to the output type when called inside
       * the `func` callback. This is because we can't know if those selections were actually
       * made before running the code.
       *
       * You can also call any other methods inside the callback.
       *
       * ### Examples
       *
       * ```ts
       * async function insertPerson(values: InsertablePerson, returnLastName: boolean) {
       *   return await db
       *     .insertInto('person')
       *     .values(values)
       *     .returning(['id', 'first_name'])
       *     .$if(returnLastName, (qb) => qb.returning('last_name'))
       *     .executeTakeFirstOrThrow()
       * }
       * ```
       *
       * Any selections added inside the `if` callback will be added as optional fields to the
       * output type since we can't know if the selections were actually made before running
       * the code. In the example above the return type of the `insertPerson` function is:
       *
       * ```ts
       * {
       *   id: number
       *   first_name: string
       *   last_name?: string
       * }
       * ```
       */
      $if(condition, func) {
        if (condition) {
          return func(this);
        }
        return new InsertQueryBuilder2({
          ...this.#props
        });
      }
      /**
       * Change the output type of the query.
       *
       * You should only use this method as the last resort if the types
       * don't support your use case.
       */
      $castTo() {
        return new InsertQueryBuilder2(this.#props);
      }
      /**
       * Narrows (parts of) the output type of the query.
       *
       * Kysely tries to be as type-safe as possible, but in some cases we have to make
       * compromises for better maintainability and compilation performance. At present,
       * Kysely doesn't narrow the output type of the query based on {@link values} input
       * when using {@link returning} or {@link returningAll}.
       *
       * This utility method is very useful for these situations, as it removes unncessary
       * runtime assertion/guard code. Its input type is limited to the output type
       * of the query, so you can't add a column that doesn't exist, or change a column's
       * type to something that doesn't exist in its union type.
       *
       * ### Examples
       *
       * Turn this code:
       *
       * ```ts
       * const person = await db.insertInto('person')
       *   .values({ ...inputPerson, nullable_column: 'hell yeah!' })
       *   .returningAll()
       *   .executeTakeFirstOrThrow()
       *
       * if (nullable_column) {
       *   functionThatExpectsPersonWithNonNullValue(person)
       * }
       * ```
       *
       * Into this:
       *
       * ```ts
       * const person = await db.insertInto('person')
       *   .values({ ...inputPerson, nullable_column: 'hell yeah!' })
       *   .returningAll()
       *   .$narrowType<{ nullable_column: string }>()
       *   .executeTakeFirstOrThrow()
       *
       * functionThatExpectsPersonWithNonNullValue(person)
       * ```
       */
      $narrowType() {
        return new InsertQueryBuilder2(this.#props);
      }
      /**
       * Asserts that query's output row type equals the given type `T`.
       *
       * This method can be used to simplify excessively complex types to make typescript happy
       * and much faster.
       *
       * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
       * for typescript and you get errors like this:
       *
       * ```
       * error TS2589: Type instantiation is excessively deep and possibly infinite.
       * ```
       *
       * In these case you can often use this method to help typescript a little bit. When you use this
       * method to assert the output type of a query, Kysely can drop the complex output type that
       * consists of multiple nested helper types and replace it with the simple asserted type.
       *
       * Using this method doesn't reduce type safety at all. You have to pass in a type that is
       * structurally equal to the current type.
       *
       * ### Examples
       *
       * ```ts
       * const result = await db
       *   .with('new_person', (qb) => qb
       *     .insertInto('person')
       *     .values(person)
       *     .returning('id')
       *     .$assertType<{ id: string }>()
       *   )
       *   .with('new_pet', (qb) => qb
       *     .insertInto('pet')
       *     .values((eb) => ({ owner_id: eb.selectFrom('new_person').select('id'), ...pet }))
       *     .returning(['name as pet_name', 'species'])
       *     .$assertType<{ pet_name: string, species: Species }>()
       *   )
       *   .selectFrom(['new_person', 'new_pet'])
       *   .selectAll()
       *   .executeTakeFirstOrThrow()
       * ```
       */
      $assertType() {
        return new InsertQueryBuilder2(this.#props);
      }
      /**
       * Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
       */
      withPlugin(plugin) {
        return new InsertQueryBuilder2({
          ...this.#props,
          executor: this.#props.executor.withPlugin(plugin)
        });
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      /**
       * Executes the query and returns an array of rows.
       *
       * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
       */
      async execute() {
        const compiledQuery = this.compile();
        const query = compiledQuery.query;
        const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
        if (this.#props.executor.adapter.supportsReturning && query.returning) {
          return result.rows;
        }
        return [
          new insert_result_js_1.InsertResult(
            result.insertId,
            // TODO: remove numUpdatedOrDeletedRows.
            result.numAffectedRows ?? result.numUpdatedOrDeletedRows
          )
        ];
      }
      /**
       * Executes the query and returns the first result or undefined if
       * the query returned no result.
       */
      async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
      }
      /**
       * Executes the query and returns the first result or throws if
       * the query returned no result.
       *
       * By default an instance of {@link NoResultError} is thrown, but you can
       * provide a custom error class, or callback as the only argument to throw a different
       * error.
       */
      async executeTakeFirstOrThrow(errorConstructor = no_result_error_js_1.NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === void 0) {
          const error = (0, no_result_error_js_1.isNoResultErrorConstructor)(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
          throw error;
        }
        return result;
      }
      async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
        for await (const item of stream) {
          yield* item.rows;
        }
      }
      async explain(format, options) {
        const builder = new InsertQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
        });
        return await builder.execute();
      }
    };
    exports.InsertQueryBuilder = InsertQueryBuilder2;
    (0, prevent_await_js_1.preventAwait)(InsertQueryBuilder2, "don't await InsertQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
  }
});

// node_modules/kysely/dist/cjs/query-builder/delete-result.js
var require_delete_result = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/delete-result.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeleteResult = void 0;
    var DeleteResult2 = class {
      numDeletedRows;
      constructor(numDeletedRows) {
        this.numDeletedRows = numDeletedRows;
      }
    };
    exports.DeleteResult = DeleteResult2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/limit-node.js
var require_limit_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/limit-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LimitNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var value_node_js_1 = require_value_node();
    exports.LimitNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "LimitNode";
      },
      create(limit) {
        return (0, object_utils_js_1.freeze)({
          kind: "LimitNode",
          limit: value_node_js_1.ValueNode.create(limit)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/query-builder/delete-query-builder.js
var require_delete_query_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/delete-query-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeleteQueryBuilder = void 0;
    var join_parser_js_1 = require_join_parser();
    var table_parser_js_1 = require_table_parser();
    var select_parser_js_1 = require_select_parser();
    var query_node_js_1 = require_query_node();
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var no_result_error_js_1 = require_no_result_error();
    var delete_result_js_1 = require_delete_result();
    var delete_query_node_js_1 = require_delete_query_node();
    var limit_node_js_1 = require_limit_node();
    var order_by_parser_js_1 = require_order_by_parser();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var DeleteQueryBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      where(...args) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithWhere(this.#props.queryNode, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args))
        });
      }
      whereRef(lhs, op, rhs) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithWhere(this.#props.queryNode, (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhs, op, rhs))
        });
      }
      clearWhere() {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithoutWhere(this.#props.queryNode)
        });
      }
      using(tables) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: delete_query_node_js_1.DeleteQueryNode.cloneWithUsing(this.#props.queryNode, (0, table_parser_js_1.parseTableExpressionOrList)(tables))
        });
      }
      innerJoin(...args) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("InnerJoin", args))
        });
      }
      leftJoin(...args) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("LeftJoin", args))
        });
      }
      rightJoin(...args) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("RightJoin", args))
        });
      }
      fullJoin(...args) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("FullJoin", args))
        });
      }
      returning(selection) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithReturning(this.#props.queryNode, (0, select_parser_js_1.parseSelectArg)(selection))
        });
      }
      returningAll(table) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithReturning(this.#props.queryNode, (0, select_parser_js_1.parseSelectAll)(table))
        });
      }
      /**
       * Adds an `order by` clause to the query.
       *
       * `orderBy` calls are additive. To order by multiple columns, call `orderBy`
       * multiple times.
       *
       * The first argument is the expression to order by and the second is the
       * order (`asc` or `desc`).
       *
       * An `order by` clause in a delete query is only supported by some dialects
       * like MySQL.
       *
       * See {@link SelectQueryBuilder.orderBy} for more examples.
       *
       * ### Examples
       *
       * Delete 5 oldest items in a table:
       *
       * ```ts
       * await db
       *   .deleteFrom('pet')
       *   .orderBy('created_at')
       *   .limit(5)
       *   .execute()
       * ```
       *
       * The generated SQL (MySQL):
       *
       * ```sql
       * delete from `pet`
       * order by `created_at`
       * limit ?
       * ```
       */
      orderBy(orderBy, direction) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: delete_query_node_js_1.DeleteQueryNode.cloneWithOrderByItems(this.#props.queryNode, (0, order_by_parser_js_1.parseOrderBy)([orderBy, direction]))
        });
      }
      /**
       * Adds a limit clause to the query.
       *
       * A limit clause in a delete query is only supported by some dialects
       * like MySQL.
       *
       * ### Examples
       *
       * Delete 5 oldest items in a table:
       *
       * ```ts
       * await db
       *   .deleteFrom('pet')
       *   .orderBy('created_at')
       *   .limit(5)
       *   .execute()
       * ```
       */
      limit(limit) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: delete_query_node_js_1.DeleteQueryNode.cloneWithLimit(this.#props.queryNode, limit_node_js_1.LimitNode.create(limit))
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       *
       * If you want to conditionally call a method on `this`, see
       * the {@link $if} method.
       *
       * ### Examples
       *
       * The next example uses a helper function `log` to log a query:
       *
       * ```ts
       * function log<T extends Compilable>(qb: T): T {
       *   console.log(qb.compile())
       *   return qb
       * }
       *
       * db.deleteFrom('person')
       *   .$call(log)
       *   .execute()
       * ```
       */
      $call(func) {
        return func(this);
      }
      /**
       * Call `func(this)` if `condition` is true.
       *
       * This method is especially handy with optional selects. Any `returning` or `returningAll`
       * method calls add columns as optional fields to the output type when called inside
       * the `func` callback. This is because we can't know if those selections were actually
       * made before running the code.
       *
       * You can also call any other methods inside the callback.
       *
       * ### Examples
       *
       * ```ts
       * async function deletePerson(id: number, returnLastName: boolean) {
       *   return await db
       *     .deleteFrom('person')
       *     .where('id', '=', id)
       *     .returning(['id', 'first_name'])
       *     .$if(returnLastName, (qb) => qb.returning('last_name'))
       *     .executeTakeFirstOrThrow()
       * }
       * ```
       *
       * Any selections added inside the `if` callback will be added as optional fields to the
       * output type since we can't know if the selections were actually made before running
       * the code. In the example above the return type of the `deletePerson` function is:
       *
       * ```ts
       * {
       *   id: number
       *   first_name: string
       *   last_name?: string
       * }
       * ```
       */
      $if(condition, func) {
        if (condition) {
          return func(this);
        }
        return new DeleteQueryBuilder2({
          ...this.#props
        });
      }
      /**
       * Change the output type of the query.
       *
       * You should only use this method as the last resort if the types
       * don't support your use case.
       */
      $castTo() {
        return new DeleteQueryBuilder2(this.#props);
      }
      /**
       * Narrows (parts of) the output type of the query.
       *
       * Kysely tries to be as type-safe as possible, but in some cases we have to make
       * compromises for better maintainability and compilation performance. At present,
       * Kysely doesn't narrow the output type of the query when using {@link where} and {@link returning} or {@link returningAll}.
       *
       * This utility method is very useful for these situations, as it removes unncessary
       * runtime assertion/guard code. Its input type is limited to the output type
       * of the query, so you can't add a column that doesn't exist, or change a column's
       * type to something that doesn't exist in its union type.
       *
       * ### Examples
       *
       * Turn this code:
       *
       * ```ts
       * const person = await db.deleteFrom('person')
       *   .where('id', '=', id)
       *   .where('nullable_column', 'is not', null)
       *   .returningAll()
       *   .executeTakeFirstOrThrow()
       *
       * if (person.nullable_column) {
       *   functionThatExpectsPersonWithNonNullValue(person)
       * }
       * ```
       *
       * Into this:
       *
       * ```ts
       * const person = await db.deleteFrom('person')
       *   .where('id', '=', id)
       *   .where('nullable_column', 'is not', null)
       *   .returningAll()
       *   .$narrowType<{ nullable_column: string }>()
       *   .executeTakeFirstOrThrow()
       *
       * functionThatExpectsPersonWithNonNullValue(person)
       * ```
       */
      $narrowType() {
        return new DeleteQueryBuilder2(this.#props);
      }
      /**
       * Asserts that query's output row type equals the given type `T`.
       *
       * This method can be used to simplify excessively complex types to make typescript happy
       * and much faster.
       *
       * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
       * for typescript and you get errors like this:
       *
       * ```
       * error TS2589: Type instantiation is excessively deep and possibly infinite.
       * ```
       *
       * In these case you can often use this method to help typescript a little bit. When you use this
       * method to assert the output type of a query, Kysely can drop the complex output type that
       * consists of multiple nested helper types and replace it with the simple asserted type.
       *
       * Using this method doesn't reduce type safety at all. You have to pass in a type that is
       * structurally equal to the current type.
       *
       * ### Examples
       *
       * ```ts
       * const result = await db
       *   .with('deleted_person', (qb) => qb
       *     .deleteFrom('person')
       *     .where('id', '=', person.id)
       *     .returning('first_name')
       *     .$assertType<{ first_name: string }>()
       *   )
       *   .with('deleted_pet', (qb) => qb
       *     .deleteFrom('pet')
       *     .where('owner_id', '=', person.id)
       *     .returning(['name as pet_name', 'species'])
       *     .$assertType<{ pet_name: string, species: Species }>()
       *   )
       *   .selectFrom(['deleted_person', 'deleted_pet'])
       *   .selectAll()
       *   .executeTakeFirstOrThrow()
       * ```
       */
      $assertType() {
        return new DeleteQueryBuilder2(this.#props);
      }
      /**
       * Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
       */
      withPlugin(plugin) {
        return new DeleteQueryBuilder2({
          ...this.#props,
          executor: this.#props.executor.withPlugin(plugin)
        });
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      /**
       * Executes the query and returns an array of rows.
       *
       * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
       */
      async execute() {
        const compiledQuery = this.compile();
        const query = compiledQuery.query;
        const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
        if (this.#props.executor.adapter.supportsReturning && query.returning) {
          return result.rows;
        }
        return [
          new delete_result_js_1.DeleteResult(
            // TODO: remove numUpdatedOrDeletedRows.
            result.numAffectedRows ?? result.numUpdatedOrDeletedRows ?? BigInt(0)
          )
        ];
      }
      /**
       * Executes the query and returns the first result or undefined if
       * the query returned no result.
       */
      async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
      }
      /**
       * Executes the query and returns the first result or throws if
       * the query returned no result.
       *
       * By default an instance of {@link NoResultError} is thrown, but you can
       * provide a custom error class, or callback as the only argument to throw a different
       * error.
       */
      async executeTakeFirstOrThrow(errorConstructor = no_result_error_js_1.NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === void 0) {
          const error = (0, no_result_error_js_1.isNoResultErrorConstructor)(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
          throw error;
        }
        return result;
      }
      async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
        for await (const item of stream) {
          yield* item.rows;
        }
      }
      async explain(format, options) {
        const builder = new DeleteQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
        });
        return await builder.execute();
      }
    };
    exports.DeleteQueryBuilder = DeleteQueryBuilder2;
    (0, prevent_await_js_1.preventAwait)(DeleteQueryBuilder2, "don't await DeleteQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
  }
});

// node_modules/kysely/dist/cjs/query-builder/update-result.js
var require_update_result = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/update-result.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UpdateResult = void 0;
    var UpdateResult2 = class {
      numUpdatedRows;
      numChangedRows;
      constructor(numUpdatedRows, numChangedRows) {
        this.numUpdatedRows = numUpdatedRows;
        this.numChangedRows = numChangedRows;
      }
    };
    exports.UpdateResult = UpdateResult2;
  }
});

// node_modules/kysely/dist/cjs/query-builder/update-query-builder.js
var require_update_query_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/update-query-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UpdateQueryBuilder = void 0;
    var join_parser_js_1 = require_join_parser();
    var table_parser_js_1 = require_table_parser();
    var select_parser_js_1 = require_select_parser();
    var query_node_js_1 = require_query_node();
    var update_query_node_js_1 = require_update_query_node();
    var update_set_parser_js_1 = require_update_set_parser();
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var update_result_js_1 = require_update_result();
    var no_result_error_js_1 = require_no_result_error();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var UpdateQueryBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      where(...args) {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithWhere(this.#props.queryNode, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args))
        });
      }
      whereRef(lhs, op, rhs) {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithWhere(this.#props.queryNode, (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhs, op, rhs))
        });
      }
      clearWhere() {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithoutWhere(this.#props.queryNode)
        });
      }
      from(from) {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: update_query_node_js_1.UpdateQueryNode.cloneWithFromItems(this.#props.queryNode, (0, table_parser_js_1.parseTableExpressionOrList)(from))
        });
      }
      innerJoin(...args) {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("InnerJoin", args))
        });
      }
      leftJoin(...args) {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("LeftJoin", args))
        });
      }
      rightJoin(...args) {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("RightJoin", args))
        });
      }
      fullJoin(...args) {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("FullJoin", args))
        });
      }
      set(update) {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: update_query_node_js_1.UpdateQueryNode.cloneWithUpdates(this.#props.queryNode, (0, update_set_parser_js_1.parseUpdateExpression)(update))
        });
      }
      returning(selection) {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithReturning(this.#props.queryNode, (0, select_parser_js_1.parseSelectArg)(selection))
        });
      }
      returningAll() {
        return new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithReturning(this.#props.queryNode, (0, select_parser_js_1.parseSelectAll)())
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       *
       * If you want to conditionally call a method on `this`, see
       * the {@link $if} method.
       *
       * ### Examples
       *
       * The next example uses a helper function `log` to log a query:
       *
       * ```ts
       * function log<T extends Compilable>(qb: T): T {
       *   console.log(qb.compile())
       *   return qb
       * }
       *
       * db.updateTable('person')
       *   .set(values)
       *   .$call(log)
       *   .execute()
       * ```
       */
      $call(func) {
        return func(this);
      }
      /**
       * Call `func(this)` if `condition` is true.
       *
       * This method is especially handy with optional selects. Any `returning` or `returningAll`
       * method calls add columns as optional fields to the output type when called inside
       * the `func` callback. This is because we can't know if those selections were actually
       * made before running the code.
       *
       * You can also call any other methods inside the callback.
       *
       * ### Examples
       *
       * ```ts
       * async function updatePerson(id: number, updates: UpdateablePerson, returnLastName: boolean) {
       *   return await db
       *     .updateTable('person')
       *     .set(updates)
       *     .where('id', '=', id)
       *     .returning(['id', 'first_name'])
       *     .$if(returnLastName, (qb) => qb.returning('last_name'))
       *     .executeTakeFirstOrThrow()
       * }
       * ```
       *
       * Any selections added inside the `if` callback will be added as optional fields to the
       * output type since we can't know if the selections were actually made before running
       * the code. In the example above the return type of the `updatePerson` function is:
       *
       * ```ts
       * {
       *   id: number
       *   first_name: string
       *   last_name?: string
       * }
       * ```
       */
      $if(condition, func) {
        if (condition) {
          return func(this);
        }
        return new UpdateQueryBuilder2({
          ...this.#props
        });
      }
      /**
       * Change the output type of the query.
       *
       * You should only use this method as the last resort if the types
       * don't support your use case.
       */
      $castTo() {
        return new UpdateQueryBuilder2(this.#props);
      }
      /**
       * Narrows (parts of) the output type of the query.
       *
       * Kysely tries to be as type-safe as possible, but in some cases we have to make
       * compromises for better maintainability and compilation performance. At present,
       * Kysely doesn't narrow the output type of the query based on {@link set} input
       * when using {@link where} and/or {@link returning} or {@link returningAll}.
       *
       * This utility method is very useful for these situations, as it removes unncessary
       * runtime assertion/guard code. Its input type is limited to the output type
       * of the query, so you can't add a column that doesn't exist, or change a column's
       * type to something that doesn't exist in its union type.
       *
       * ### Examples
       *
       * Turn this code:
       *
       * ```ts
       * const person = await db.updateTable('person')
       *   .set({ deletedAt: now })
       *   .where('id', '=', id)
       *   .where('nullable_column', 'is not', null)
       *   .returningAll()
       *   .executeTakeFirstOrThrow()
       *
       * if (person.nullable_column) {
       *   functionThatExpectsPersonWithNonNullValue(person)
       * }
       * ```
       *
       * Into this:
       *
       * ```ts
       * const person = await db.updateTable('person')
       *   .set({ deletedAt: now })
       *   .where('id', '=', id)
       *   .where('nullable_column', 'is not', null)
       *   .returningAll()
       *   .$narrowType<{ deletedAt: Date; nullable_column: string }>()
       *   .executeTakeFirstOrThrow()
       *
       * functionThatExpectsPersonWithNonNullValue(person)
       * ```
       */
      $narrowType() {
        return new UpdateQueryBuilder2(this.#props);
      }
      /**
       * Asserts that query's output row type equals the given type `T`.
       *
       * This method can be used to simplify excessively complex types to make typescript happy
       * and much faster.
       *
       * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
       * for typescript and you get errors like this:
       *
       * ```
       * error TS2589: Type instantiation is excessively deep and possibly infinite.
       * ```
       *
       * In these case you can often use this method to help typescript a little bit. When you use this
       * method to assert the output type of a query, Kysely can drop the complex output type that
       * consists of multiple nested helper types and replace it with the simple asserted type.
       *
       * Using this method doesn't reduce type safety at all. You have to pass in a type that is
       * structurally equal to the current type.
       *
       * ### Examples
       *
       * ```ts
       * const result = await db
       *   .with('updated_person', (qb) => qb
       *     .updateTable('person')
       *     .set(person)
       *     .where('id', '=', person.id)
       *     .returning('first_name')
       *     .$assertType<{ first_name: string }>()
       *   )
       *   .with('updated_pet', (qb) => qb
       *     .updateTable('pet')
       *     .set(pet)
       *     .where('owner_id', '=', person.id)
       *     .returning(['name as pet_name', 'species'])
       *     .$assertType<{ pet_name: string, species: Species }>()
       *   )
       *   .selectFrom(['updated_person', 'updated_pet'])
       *   .selectAll()
       *   .executeTakeFirstOrThrow()
       * ```
       */
      $assertType() {
        return new UpdateQueryBuilder2(this.#props);
      }
      /**
       * Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
       */
      withPlugin(plugin) {
        return new UpdateQueryBuilder2({
          ...this.#props,
          executor: this.#props.executor.withPlugin(plugin)
        });
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      /**
       * Executes the query and returns an array of rows.
       *
       * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
       */
      async execute() {
        const compiledQuery = this.compile();
        const query = compiledQuery.query;
        const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
        if (this.#props.executor.adapter.supportsReturning && query.returning) {
          return result.rows;
        }
        return [
          new update_result_js_1.UpdateResult(
            // TODO: remove numUpdatedOrDeletedRows.
            // TODO: https://github.com/kysely-org/kysely/pull/431#discussion_r1172330899
            result.numAffectedRows ?? result.numUpdatedOrDeletedRows ?? BigInt(0),
            result.numChangedRows
          )
        ];
      }
      /**
       * Executes the query and returns the first result or undefined if
       * the query returned no result.
       */
      async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
      }
      /**
       * Executes the query and returns the first result or throws if
       * the query returned no result.
       *
       * By default an instance of {@link NoResultError} is thrown, but you can
       * provide a custom error class, or callback as the only argument to throw a different
       * error.
       */
      async executeTakeFirstOrThrow(errorConstructor = no_result_error_js_1.NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === void 0) {
          const error = (0, no_result_error_js_1.isNoResultErrorConstructor)(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
          throw error;
        }
        return result;
      }
      async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
        for await (const item of stream) {
          yield* item.rows;
        }
      }
      async explain(format, options) {
        const builder = new UpdateQueryBuilder2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
        });
        return await builder.execute();
      }
    };
    exports.UpdateQueryBuilder = UpdateQueryBuilder2;
    (0, prevent_await_js_1.preventAwait)(UpdateQueryBuilder2, "don't await UpdateQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
  }
});

// node_modules/kysely/dist/cjs/operation-node/common-table-expression-name-node.js
var require_common_table_expression_name_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/common-table-expression-name-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CommonTableExpressionNameNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var column_node_js_1 = require_column_node();
    var table_node_js_1 = require_table_node();
    exports.CommonTableExpressionNameNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "CommonTableExpressionNameNode";
      },
      create(tableName, columnNames) {
        return (0, object_utils_js_1.freeze)({
          kind: "CommonTableExpressionNameNode",
          table: table_node_js_1.TableNode.create(tableName),
          columns: columnNames ? (0, object_utils_js_1.freeze)(columnNames.map(column_node_js_1.ColumnNode.create)) : void 0
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/common-table-expression-node.js
var require_common_table_expression_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/common-table-expression-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CommonTableExpressionNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.CommonTableExpressionNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "CommonTableExpressionNode";
      },
      create(name, expression) {
        return (0, object_utils_js_1.freeze)({
          kind: "CommonTableExpressionNode",
          name,
          expression
        });
      },
      cloneWith(node, props) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          ...props
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/query-builder/cte-builder.js
var require_cte_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/cte-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CTEBuilder = void 0;
    var common_table_expression_node_js_1 = require_common_table_expression_node();
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var CTEBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      /**
       * Makes the common table expression materialized.
       */
      materialized() {
        return new CTEBuilder2({
          ...this.#props,
          node: common_table_expression_node_js_1.CommonTableExpressionNode.cloneWith(this.#props.node, {
            materialized: true
          })
        });
      }
      /**
       * Makes the common table expression not materialized.
       */
      notMaterialized() {
        return new CTEBuilder2({
          ...this.#props,
          node: common_table_expression_node_js_1.CommonTableExpressionNode.cloneWith(this.#props.node, {
            materialized: false
          })
        });
      }
      toOperationNode() {
        return this.#props.node;
      }
    };
    exports.CTEBuilder = CTEBuilder2;
    (0, prevent_await_js_1.preventAwait)(CTEBuilder2, "don't await CTEBuilder instances. They are never executed directly and are always just a part of a query.");
  }
});

// node_modules/kysely/dist/cjs/parser/with-parser.js
var require_with_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/with-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCommonTableExpression = void 0;
    var common_table_expression_name_node_js_1 = require_common_table_expression_name_node();
    var parse_utils_js_1 = require_parse_utils();
    var object_utils_js_1 = require_object_utils();
    var cte_builder_js_1 = require_cte_builder();
    var common_table_expression_node_js_1 = require_common_table_expression_node();
    function parseCommonTableExpression2(nameOrBuilderCallback, expression) {
      const expressionNode = expression((0, parse_utils_js_1.createQueryCreator)()).toOperationNode();
      if ((0, object_utils_js_1.isFunction)(nameOrBuilderCallback)) {
        return nameOrBuilderCallback(cteBuilderFactory2(expressionNode)).toOperationNode();
      }
      return common_table_expression_node_js_1.CommonTableExpressionNode.create(parseCommonTableExpressionName2(nameOrBuilderCallback), expressionNode);
    }
    exports.parseCommonTableExpression = parseCommonTableExpression2;
    function cteBuilderFactory2(expressionNode) {
      return (name) => {
        return new cte_builder_js_1.CTEBuilder({
          node: common_table_expression_node_js_1.CommonTableExpressionNode.create(parseCommonTableExpressionName2(name), expressionNode)
        });
      };
    }
    function parseCommonTableExpressionName2(name) {
      if (name.includes("(")) {
        const parts = name.split(/[\(\)]/);
        const table = parts[0];
        const columns = parts[1].split(",").map((it) => it.trim());
        return common_table_expression_name_node_js_1.CommonTableExpressionNameNode.create(table, columns);
      } else {
        return common_table_expression_name_node_js_1.CommonTableExpressionNameNode.create(name);
      }
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/with-node.js
var require_with_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/with-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WithNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.WithNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "WithNode";
      },
      create(expression, params) {
        return (0, object_utils_js_1.freeze)({
          kind: "WithNode",
          expressions: (0, object_utils_js_1.freeze)([expression]),
          ...params
        });
      },
      cloneWithExpression(withNode, expression) {
        return (0, object_utils_js_1.freeze)({
          ...withNode,
          expressions: (0, object_utils_js_1.freeze)([...withNode.expressions, expression])
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/util/random-string.js
var require_random_string = __commonJS({
  "node_modules/kysely/dist/cjs/util/random-string.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomString = void 0;
    var CHARS2 = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ];
    function randomString2(length) {
      let chars = "";
      for (let i = 0; i < length; ++i) {
        chars += randomChar2();
      }
      return chars;
    }
    exports.randomString = randomString2;
    function randomChar2() {
      return CHARS2[~~(Math.random() * CHARS2.length)];
    }
  }
});

// node_modules/kysely/dist/cjs/util/query-id.js
var require_query_id = __commonJS({
  "node_modules/kysely/dist/cjs/util/query-id.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createQueryId = void 0;
    var random_string_js_1 = require_random_string();
    function createQueryId2() {
      return new LazyQueryId2();
    }
    exports.createQueryId = createQueryId2;
    var LazyQueryId2 = class {
      #queryId;
      get queryId() {
        if (this.#queryId === void 0) {
          this.#queryId = (0, random_string_js_1.randomString)(8);
        }
        return this.#queryId;
      }
    };
  }
});

// node_modules/kysely/dist/cjs/util/require-all-props.js
var require_require_all_props = __commonJS({
  "node_modules/kysely/dist/cjs/util/require-all-props.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.requireAllProps = void 0;
    function requireAllProps2(obj) {
      return obj;
    }
    exports.requireAllProps = requireAllProps2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/operation-node-transformer.js
var require_operation_node_transformer = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/operation-node-transformer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationNodeTransformer = void 0;
    var object_utils_js_1 = require_object_utils();
    var require_all_props_js_1 = require_require_all_props();
    var OperationNodeTransformer2 = class {
      nodeStack = [];
      #transformers = (0, object_utils_js_1.freeze)({
        AliasNode: this.transformAlias.bind(this),
        ColumnNode: this.transformColumn.bind(this),
        IdentifierNode: this.transformIdentifier.bind(this),
        SchemableIdentifierNode: this.transformSchemableIdentifier.bind(this),
        RawNode: this.transformRaw.bind(this),
        ReferenceNode: this.transformReference.bind(this),
        SelectQueryNode: this.transformSelectQuery.bind(this),
        SelectionNode: this.transformSelection.bind(this),
        TableNode: this.transformTable.bind(this),
        FromNode: this.transformFrom.bind(this),
        SelectAllNode: this.transformSelectAll.bind(this),
        AndNode: this.transformAnd.bind(this),
        OrNode: this.transformOr.bind(this),
        ValueNode: this.transformValue.bind(this),
        ValueListNode: this.transformValueList.bind(this),
        PrimitiveValueListNode: this.transformPrimitiveValueList.bind(this),
        ParensNode: this.transformParens.bind(this),
        JoinNode: this.transformJoin.bind(this),
        OperatorNode: this.transformOperator.bind(this),
        WhereNode: this.transformWhere.bind(this),
        InsertQueryNode: this.transformInsertQuery.bind(this),
        DeleteQueryNode: this.transformDeleteQuery.bind(this),
        ReturningNode: this.transformReturning.bind(this),
        CreateTableNode: this.transformCreateTable.bind(this),
        AddColumnNode: this.transformAddColumn.bind(this),
        ColumnDefinitionNode: this.transformColumnDefinition.bind(this),
        DropTableNode: this.transformDropTable.bind(this),
        DataTypeNode: this.transformDataType.bind(this),
        OrderByNode: this.transformOrderBy.bind(this),
        OrderByItemNode: this.transformOrderByItem.bind(this),
        GroupByNode: this.transformGroupBy.bind(this),
        GroupByItemNode: this.transformGroupByItem.bind(this),
        UpdateQueryNode: this.transformUpdateQuery.bind(this),
        ColumnUpdateNode: this.transformColumnUpdate.bind(this),
        LimitNode: this.transformLimit.bind(this),
        OffsetNode: this.transformOffset.bind(this),
        OnConflictNode: this.transformOnConflict.bind(this),
        OnDuplicateKeyNode: this.transformOnDuplicateKey.bind(this),
        CreateIndexNode: this.transformCreateIndex.bind(this),
        DropIndexNode: this.transformDropIndex.bind(this),
        ListNode: this.transformList.bind(this),
        PrimaryKeyConstraintNode: this.transformPrimaryKeyConstraint.bind(this),
        UniqueConstraintNode: this.transformUniqueConstraint.bind(this),
        ReferencesNode: this.transformReferences.bind(this),
        CheckConstraintNode: this.transformCheckConstraint.bind(this),
        WithNode: this.transformWith.bind(this),
        CommonTableExpressionNode: this.transformCommonTableExpression.bind(this),
        CommonTableExpressionNameNode: this.transformCommonTableExpressionName.bind(this),
        HavingNode: this.transformHaving.bind(this),
        CreateSchemaNode: this.transformCreateSchema.bind(this),
        DropSchemaNode: this.transformDropSchema.bind(this),
        AlterTableNode: this.transformAlterTable.bind(this),
        DropColumnNode: this.transformDropColumn.bind(this),
        RenameColumnNode: this.transformRenameColumn.bind(this),
        AlterColumnNode: this.transformAlterColumn.bind(this),
        ModifyColumnNode: this.transformModifyColumn.bind(this),
        AddConstraintNode: this.transformAddConstraint.bind(this),
        DropConstraintNode: this.transformDropConstraint.bind(this),
        ForeignKeyConstraintNode: this.transformForeignKeyConstraint.bind(this),
        CreateViewNode: this.transformCreateView.bind(this),
        DropViewNode: this.transformDropView.bind(this),
        GeneratedNode: this.transformGenerated.bind(this),
        DefaultValueNode: this.transformDefaultValue.bind(this),
        OnNode: this.transformOn.bind(this),
        ValuesNode: this.transformValues.bind(this),
        SelectModifierNode: this.transformSelectModifier.bind(this),
        CreateTypeNode: this.transformCreateType.bind(this),
        DropTypeNode: this.transformDropType.bind(this),
        ExplainNode: this.transformExplain.bind(this),
        DefaultInsertValueNode: this.transformDefaultInsertValue.bind(this),
        AggregateFunctionNode: this.transformAggregateFunction.bind(this),
        OverNode: this.transformOver.bind(this),
        PartitionByNode: this.transformPartitionBy.bind(this),
        PartitionByItemNode: this.transformPartitionByItem.bind(this),
        SetOperationNode: this.transformSetOperation.bind(this),
        BinaryOperationNode: this.transformBinaryOperation.bind(this),
        UnaryOperationNode: this.transformUnaryOperation.bind(this),
        UsingNode: this.transformUsing.bind(this),
        FunctionNode: this.transformFunction.bind(this),
        CaseNode: this.transformCase.bind(this),
        WhenNode: this.transformWhen.bind(this),
        JSONReferenceNode: this.transformJSONReference.bind(this),
        JSONPathNode: this.transformJSONPath.bind(this),
        JSONPathLegNode: this.transformJSONPathLeg.bind(this),
        JSONOperatorChainNode: this.transformJSONOperatorChain.bind(this),
        TupleNode: this.transformTuple.bind(this)
      });
      transformNode(node) {
        if (!node) {
          return node;
        }
        this.nodeStack.push(node);
        const out = this.transformNodeImpl(node);
        this.nodeStack.pop();
        return (0, object_utils_js_1.freeze)(out);
      }
      transformNodeImpl(node) {
        return this.#transformers[node.kind](node);
      }
      transformNodeList(list) {
        if (!list) {
          return list;
        }
        return (0, object_utils_js_1.freeze)(list.map((node) => this.transformNode(node)));
      }
      transformSelectQuery(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "SelectQueryNode",
          from: this.transformNode(node.from),
          selections: this.transformNodeList(node.selections),
          distinctOn: this.transformNodeList(node.distinctOn),
          joins: this.transformNodeList(node.joins),
          groupBy: this.transformNode(node.groupBy),
          orderBy: this.transformNode(node.orderBy),
          where: this.transformNode(node.where),
          frontModifiers: this.transformNodeList(node.frontModifiers),
          endModifiers: this.transformNodeList(node.endModifiers),
          limit: this.transformNode(node.limit),
          offset: this.transformNode(node.offset),
          with: this.transformNode(node.with),
          having: this.transformNode(node.having),
          explain: this.transformNode(node.explain),
          setOperations: this.transformNodeList(node.setOperations)
        });
      }
      transformSelection(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "SelectionNode",
          selection: this.transformNode(node.selection)
        });
      }
      transformColumn(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ColumnNode",
          column: this.transformNode(node.column)
        });
      }
      transformAlias(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "AliasNode",
          node: this.transformNode(node.node),
          alias: this.transformNode(node.alias)
        });
      }
      transformTable(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "TableNode",
          table: this.transformNode(node.table)
        });
      }
      transformFrom(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "FromNode",
          froms: this.transformNodeList(node.froms)
        });
      }
      transformReference(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ReferenceNode",
          column: this.transformNode(node.column),
          table: this.transformNode(node.table)
        });
      }
      transformAnd(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "AndNode",
          left: this.transformNode(node.left),
          right: this.transformNode(node.right)
        });
      }
      transformOr(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "OrNode",
          left: this.transformNode(node.left),
          right: this.transformNode(node.right)
        });
      }
      transformValueList(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ValueListNode",
          values: this.transformNodeList(node.values)
        });
      }
      transformParens(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ParensNode",
          node: this.transformNode(node.node)
        });
      }
      transformJoin(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "JoinNode",
          joinType: node.joinType,
          table: this.transformNode(node.table),
          on: this.transformNode(node.on)
        });
      }
      transformRaw(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "RawNode",
          sqlFragments: (0, object_utils_js_1.freeze)([...node.sqlFragments]),
          parameters: this.transformNodeList(node.parameters)
        });
      }
      transformWhere(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "WhereNode",
          where: this.transformNode(node.where)
        });
      }
      transformInsertQuery(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "InsertQueryNode",
          into: this.transformNode(node.into),
          columns: this.transformNodeList(node.columns),
          values: this.transformNode(node.values),
          returning: this.transformNode(node.returning),
          onConflict: this.transformNode(node.onConflict),
          onDuplicateKey: this.transformNode(node.onDuplicateKey),
          with: this.transformNode(node.with),
          ignore: node.ignore,
          replace: node.replace,
          explain: this.transformNode(node.explain)
        });
      }
      transformValues(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ValuesNode",
          values: this.transformNodeList(node.values)
        });
      }
      transformDeleteQuery(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "DeleteQueryNode",
          from: this.transformNode(node.from),
          using: this.transformNode(node.using),
          joins: this.transformNodeList(node.joins),
          where: this.transformNode(node.where),
          returning: this.transformNode(node.returning),
          with: this.transformNode(node.with),
          orderBy: this.transformNode(node.orderBy),
          limit: this.transformNode(node.limit),
          explain: this.transformNode(node.explain)
        });
      }
      transformReturning(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ReturningNode",
          selections: this.transformNodeList(node.selections)
        });
      }
      transformCreateTable(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "CreateTableNode",
          table: this.transformNode(node.table),
          columns: this.transformNodeList(node.columns),
          constraints: this.transformNodeList(node.constraints),
          temporary: node.temporary,
          ifNotExists: node.ifNotExists,
          onCommit: node.onCommit,
          frontModifiers: this.transformNodeList(node.frontModifiers),
          endModifiers: this.transformNodeList(node.endModifiers)
        });
      }
      transformColumnDefinition(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ColumnDefinitionNode",
          column: this.transformNode(node.column),
          dataType: this.transformNode(node.dataType),
          references: this.transformNode(node.references),
          primaryKey: node.primaryKey,
          autoIncrement: node.autoIncrement,
          unique: node.unique,
          notNull: node.notNull,
          unsigned: node.unsigned,
          defaultTo: this.transformNode(node.defaultTo),
          check: this.transformNode(node.check),
          generated: this.transformNode(node.generated),
          frontModifiers: this.transformNodeList(node.frontModifiers),
          endModifiers: this.transformNodeList(node.endModifiers)
        });
      }
      transformAddColumn(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "AddColumnNode",
          column: this.transformNode(node.column)
        });
      }
      transformDropTable(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "DropTableNode",
          table: this.transformNode(node.table),
          ifExists: node.ifExists,
          cascade: node.cascade
        });
      }
      transformOrderBy(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "OrderByNode",
          items: this.transformNodeList(node.items)
        });
      }
      transformOrderByItem(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "OrderByItemNode",
          orderBy: this.transformNode(node.orderBy),
          direction: this.transformNode(node.direction)
        });
      }
      transformGroupBy(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "GroupByNode",
          items: this.transformNodeList(node.items)
        });
      }
      transformGroupByItem(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "GroupByItemNode",
          groupBy: this.transformNode(node.groupBy)
        });
      }
      transformUpdateQuery(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "UpdateQueryNode",
          table: this.transformNode(node.table),
          from: this.transformNode(node.from),
          joins: this.transformNodeList(node.joins),
          where: this.transformNode(node.where),
          updates: this.transformNodeList(node.updates),
          returning: this.transformNode(node.returning),
          with: this.transformNode(node.with),
          explain: this.transformNode(node.explain)
        });
      }
      transformColumnUpdate(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ColumnUpdateNode",
          column: this.transformNode(node.column),
          value: this.transformNode(node.value)
        });
      }
      transformLimit(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "LimitNode",
          limit: this.transformNode(node.limit)
        });
      }
      transformOffset(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "OffsetNode",
          offset: this.transformNode(node.offset)
        });
      }
      transformOnConflict(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "OnConflictNode",
          columns: this.transformNodeList(node.columns),
          constraint: this.transformNode(node.constraint),
          indexExpression: this.transformNode(node.indexExpression),
          indexWhere: this.transformNode(node.indexWhere),
          updates: this.transformNodeList(node.updates),
          updateWhere: this.transformNode(node.updateWhere),
          doNothing: node.doNothing
        });
      }
      transformOnDuplicateKey(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "OnDuplicateKeyNode",
          updates: this.transformNodeList(node.updates)
        });
      }
      transformCreateIndex(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "CreateIndexNode",
          name: this.transformNode(node.name),
          table: this.transformNode(node.table),
          columns: this.transformNodeList(node.columns),
          unique: node.unique,
          using: this.transformNode(node.using),
          ifNotExists: node.ifNotExists,
          where: this.transformNode(node.where)
        });
      }
      transformList(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ListNode",
          items: this.transformNodeList(node.items)
        });
      }
      transformDropIndex(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "DropIndexNode",
          name: this.transformNode(node.name),
          table: this.transformNode(node.table),
          ifExists: node.ifExists,
          cascade: node.cascade
        });
      }
      transformPrimaryKeyConstraint(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "PrimaryKeyConstraintNode",
          columns: this.transformNodeList(node.columns),
          name: this.transformNode(node.name)
        });
      }
      transformUniqueConstraint(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "UniqueConstraintNode",
          columns: this.transformNodeList(node.columns),
          name: this.transformNode(node.name)
        });
      }
      transformForeignKeyConstraint(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ForeignKeyConstraintNode",
          columns: this.transformNodeList(node.columns),
          references: this.transformNode(node.references),
          name: this.transformNode(node.name),
          onDelete: node.onDelete,
          onUpdate: node.onUpdate
        });
      }
      transformSetOperation(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "SetOperationNode",
          operator: node.operator,
          expression: this.transformNode(node.expression),
          all: node.all
        });
      }
      transformReferences(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ReferencesNode",
          table: this.transformNode(node.table),
          columns: this.transformNodeList(node.columns),
          onDelete: node.onDelete,
          onUpdate: node.onUpdate
        });
      }
      transformCheckConstraint(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "CheckConstraintNode",
          expression: this.transformNode(node.expression),
          name: this.transformNode(node.name)
        });
      }
      transformWith(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "WithNode",
          expressions: this.transformNodeList(node.expressions),
          recursive: node.recursive
        });
      }
      transformCommonTableExpression(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "CommonTableExpressionNode",
          name: this.transformNode(node.name),
          materialized: node.materialized,
          expression: this.transformNode(node.expression)
        });
      }
      transformCommonTableExpressionName(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "CommonTableExpressionNameNode",
          table: this.transformNode(node.table),
          columns: this.transformNodeList(node.columns)
        });
      }
      transformHaving(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "HavingNode",
          having: this.transformNode(node.having)
        });
      }
      transformCreateSchema(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "CreateSchemaNode",
          schema: this.transformNode(node.schema),
          ifNotExists: node.ifNotExists
        });
      }
      transformDropSchema(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "DropSchemaNode",
          schema: this.transformNode(node.schema),
          ifExists: node.ifExists,
          cascade: node.cascade
        });
      }
      transformAlterTable(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "AlterTableNode",
          table: this.transformNode(node.table),
          renameTo: this.transformNode(node.renameTo),
          setSchema: this.transformNode(node.setSchema),
          columnAlterations: this.transformNodeList(node.columnAlterations),
          addConstraint: this.transformNode(node.addConstraint),
          dropConstraint: this.transformNode(node.dropConstraint)
        });
      }
      transformDropColumn(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "DropColumnNode",
          column: this.transformNode(node.column)
        });
      }
      transformRenameColumn(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "RenameColumnNode",
          column: this.transformNode(node.column),
          renameTo: this.transformNode(node.renameTo)
        });
      }
      transformAlterColumn(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "AlterColumnNode",
          column: this.transformNode(node.column),
          dataType: this.transformNode(node.dataType),
          dataTypeExpression: this.transformNode(node.dataTypeExpression),
          setDefault: this.transformNode(node.setDefault),
          dropDefault: node.dropDefault,
          setNotNull: node.setNotNull,
          dropNotNull: node.dropNotNull
        });
      }
      transformModifyColumn(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ModifyColumnNode",
          column: this.transformNode(node.column)
        });
      }
      transformAddConstraint(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "AddConstraintNode",
          constraint: this.transformNode(node.constraint)
        });
      }
      transformDropConstraint(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "DropConstraintNode",
          constraintName: this.transformNode(node.constraintName),
          ifExists: node.ifExists,
          modifier: node.modifier
        });
      }
      transformCreateView(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "CreateViewNode",
          name: this.transformNode(node.name),
          temporary: node.temporary,
          orReplace: node.orReplace,
          ifNotExists: node.ifNotExists,
          materialized: node.materialized,
          columns: this.transformNodeList(node.columns),
          as: this.transformNode(node.as)
        });
      }
      transformDropView(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "DropViewNode",
          name: this.transformNode(node.name),
          ifExists: node.ifExists,
          materialized: node.materialized,
          cascade: node.cascade
        });
      }
      transformGenerated(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "GeneratedNode",
          byDefault: node.byDefault,
          always: node.always,
          identity: node.identity,
          stored: node.stored,
          expression: this.transformNode(node.expression)
        });
      }
      transformDefaultValue(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "DefaultValueNode",
          defaultValue: this.transformNode(node.defaultValue)
        });
      }
      transformOn(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "OnNode",
          on: this.transformNode(node.on)
        });
      }
      transformSelectModifier(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "SelectModifierNode",
          modifier: node.modifier,
          rawModifier: this.transformNode(node.rawModifier)
        });
      }
      transformCreateType(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "CreateTypeNode",
          name: this.transformNode(node.name),
          enum: this.transformNode(node.enum)
        });
      }
      transformDropType(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "DropTypeNode",
          name: this.transformNode(node.name),
          ifExists: node.ifExists
        });
      }
      transformExplain(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "ExplainNode",
          format: node.format,
          options: this.transformNode(node.options)
        });
      }
      transformSchemableIdentifier(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "SchemableIdentifierNode",
          schema: this.transformNode(node.schema),
          identifier: this.transformNode(node.identifier)
        });
      }
      transformAggregateFunction(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "AggregateFunctionNode",
          aggregated: this.transformNodeList(node.aggregated),
          distinct: node.distinct,
          filter: this.transformNode(node.filter),
          func: node.func,
          over: this.transformNode(node.over)
        });
      }
      transformOver(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "OverNode",
          orderBy: this.transformNode(node.orderBy),
          partitionBy: this.transformNode(node.partitionBy)
        });
      }
      transformPartitionBy(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "PartitionByNode",
          items: this.transformNodeList(node.items)
        });
      }
      transformPartitionByItem(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "PartitionByItemNode",
          partitionBy: this.transformNode(node.partitionBy)
        });
      }
      transformBinaryOperation(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "BinaryOperationNode",
          leftOperand: this.transformNode(node.leftOperand),
          operator: this.transformNode(node.operator),
          rightOperand: this.transformNode(node.rightOperand)
        });
      }
      transformUnaryOperation(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "UnaryOperationNode",
          operator: this.transformNode(node.operator),
          operand: this.transformNode(node.operand)
        });
      }
      transformUsing(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "UsingNode",
          tables: this.transformNodeList(node.tables)
        });
      }
      transformFunction(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "FunctionNode",
          func: node.func,
          arguments: this.transformNodeList(node.arguments)
        });
      }
      transformCase(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "CaseNode",
          value: this.transformNode(node.value),
          when: this.transformNodeList(node.when),
          else: this.transformNode(node.else),
          isStatement: node.isStatement
        });
      }
      transformWhen(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "WhenNode",
          condition: this.transformNode(node.condition),
          result: this.transformNode(node.result)
        });
      }
      transformJSONReference(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "JSONReferenceNode",
          reference: this.transformNode(node.reference),
          traversal: this.transformNode(node.traversal)
        });
      }
      transformJSONPath(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "JSONPathNode",
          inOperator: this.transformNode(node.inOperator),
          pathLegs: this.transformNodeList(node.pathLegs)
        });
      }
      transformJSONPathLeg(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "JSONPathLegNode",
          type: node.type,
          value: node.value
        });
      }
      transformJSONOperatorChain(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "JSONOperatorChainNode",
          operator: this.transformNode(node.operator),
          values: this.transformNodeList(node.values)
        });
      }
      transformTuple(node) {
        return (0, require_all_props_js_1.requireAllProps)({
          kind: "TupleNode",
          values: this.transformNodeList(node.values)
        });
      }
      transformDataType(node) {
        return node;
      }
      transformSelectAll(node) {
        return node;
      }
      transformIdentifier(node) {
        return node;
      }
      transformValue(node) {
        return node;
      }
      transformPrimitiveValueList(node) {
        return node;
      }
      transformOperator(node) {
        return node;
      }
      transformDefaultInsertValue(node) {
        return node;
      }
    };
    exports.OperationNodeTransformer = OperationNodeTransformer2;
  }
});

// node_modules/kysely/dist/cjs/plugin/with-schema/with-schema-transformer.js
var require_with_schema_transformer = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/with-schema/with-schema-transformer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WithSchemaTransformer = void 0;
    var alias_node_js_1 = require_alias_node();
    var identifier_node_js_1 = require_identifier_node();
    var operation_node_transformer_js_1 = require_operation_node_transformer();
    var schemable_identifier_node_js_1 = require_schemable_identifier_node();
    var table_node_js_1 = require_table_node();
    var object_utils_js_1 = require_object_utils();
    var ROOT_OPERATION_NODES2 = (0, object_utils_js_1.freeze)({
      AlterTableNode: true,
      CreateIndexNode: true,
      CreateSchemaNode: true,
      CreateTableNode: true,
      CreateTypeNode: true,
      CreateViewNode: true,
      DeleteQueryNode: true,
      DropIndexNode: true,
      DropSchemaNode: true,
      DropTableNode: true,
      DropTypeNode: true,
      DropViewNode: true,
      InsertQueryNode: true,
      RawNode: true,
      SelectQueryNode: true,
      UpdateQueryNode: true
    });
    var WithSchemaTransformer2 = class extends operation_node_transformer_js_1.OperationNodeTransformer {
      #schema;
      #schemableIds = /* @__PURE__ */ new Set();
      #ctes = /* @__PURE__ */ new Set();
      constructor(schema) {
        super();
        this.#schema = schema;
      }
      transformNodeImpl(node) {
        if (!this.#isRootOperationNode(node)) {
          return super.transformNodeImpl(node);
        }
        const ctes = this.#collectCTEs(node);
        for (const cte of ctes) {
          this.#ctes.add(cte);
        }
        const tables = this.#collectSchemableIds(node);
        for (const table of tables) {
          this.#schemableIds.add(table);
        }
        const transformed = super.transformNodeImpl(node);
        for (const table of tables) {
          this.#schemableIds.delete(table);
        }
        for (const cte of ctes) {
          this.#ctes.delete(cte);
        }
        return transformed;
      }
      transformSchemableIdentifier(node) {
        const transformed = super.transformSchemableIdentifier(node);
        if (transformed.schema || !this.#schemableIds.has(node.identifier.name)) {
          return transformed;
        }
        return {
          ...transformed,
          schema: identifier_node_js_1.IdentifierNode.create(this.#schema)
        };
      }
      transformReferences(node) {
        const transformed = super.transformReferences(node);
        if (transformed.table.table.schema) {
          return transformed;
        }
        return {
          ...transformed,
          table: table_node_js_1.TableNode.createWithSchema(this.#schema, transformed.table.table.identifier.name)
        };
      }
      #isRootOperationNode(node) {
        return node.kind in ROOT_OPERATION_NODES2;
      }
      #collectSchemableIds(node) {
        const schemableIds = /* @__PURE__ */ new Set();
        if ("name" in node && node.name && schemable_identifier_node_js_1.SchemableIdentifierNode.is(node.name)) {
          this.#collectSchemableId(node.name, schemableIds);
        }
        if ("from" in node && node.from) {
          for (const from of node.from.froms) {
            this.#collectSchemableIdsFromTableExpr(from, schemableIds);
          }
        }
        if ("into" in node && node.into) {
          this.#collectSchemableIdsFromTableExpr(node.into, schemableIds);
        }
        if ("table" in node && node.table) {
          this.#collectSchemableIdsFromTableExpr(node.table, schemableIds);
        }
        if ("joins" in node && node.joins) {
          for (const join of node.joins) {
            this.#collectSchemableIdsFromTableExpr(join.table, schemableIds);
          }
        }
        return schemableIds;
      }
      #collectCTEs(node) {
        const ctes = /* @__PURE__ */ new Set();
        if ("with" in node && node.with) {
          this.#collectCTEIds(node.with, ctes);
        }
        return ctes;
      }
      #collectSchemableIdsFromTableExpr(node, schemableIds) {
        const table = table_node_js_1.TableNode.is(node) ? node : alias_node_js_1.AliasNode.is(node) && table_node_js_1.TableNode.is(node.node) ? node.node : null;
        if (table) {
          this.#collectSchemableId(table.table, schemableIds);
        }
      }
      #collectSchemableId(node, schemableIds) {
        const id = node.identifier.name;
        if (!this.#schemableIds.has(id) && !this.#ctes.has(id)) {
          schemableIds.add(id);
        }
      }
      #collectCTEIds(node, ctes) {
        for (const expr of node.expressions) {
          const cteId = expr.name.table.table.identifier.name;
          if (!this.#ctes.has(cteId)) {
            ctes.add(cteId);
          }
        }
      }
    };
    exports.WithSchemaTransformer = WithSchemaTransformer2;
  }
});

// node_modules/kysely/dist/cjs/plugin/with-schema/with-schema-plugin.js
var require_with_schema_plugin = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/with-schema/with-schema-plugin.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WithSchemaPlugin = void 0;
    var with_schema_transformer_js_1 = require_with_schema_transformer();
    var WithSchemaPlugin2 = class {
      #transformer;
      constructor(schema) {
        this.#transformer = new with_schema_transformer_js_1.WithSchemaTransformer(schema);
      }
      transformQuery(args) {
        return this.#transformer.transformNode(args.node);
      }
      async transformResult(args) {
        return args.result;
      }
    };
    exports.WithSchemaPlugin = WithSchemaPlugin2;
  }
});

// node_modules/kysely/dist/cjs/query-creator.js
var require_query_creator = __commonJS({
  "node_modules/kysely/dist/cjs/query-creator.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QueryCreator = void 0;
    var select_query_builder_js_1 = require_select_query_builder();
    var insert_query_builder_js_1 = require_insert_query_builder();
    var delete_query_builder_js_1 = require_delete_query_builder();
    var update_query_builder_js_1 = require_update_query_builder();
    var delete_query_node_js_1 = require_delete_query_node();
    var insert_query_node_js_1 = require_insert_query_node();
    var select_query_node_js_1 = require_select_query_node();
    var update_query_node_js_1 = require_update_query_node();
    var table_parser_js_1 = require_table_parser();
    var with_parser_js_1 = require_with_parser();
    var with_node_js_1 = require_with_node();
    var query_id_js_1 = require_query_id();
    var with_schema_plugin_js_1 = require_with_schema_plugin();
    var object_utils_js_1 = require_object_utils();
    var select_parser_js_1 = require_select_parser();
    var QueryCreator2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      selectFrom(from) {
        return (0, select_query_builder_js_1.createSelectQueryBuilder)({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#props.executor,
          queryNode: select_query_node_js_1.SelectQueryNode.createFrom((0, table_parser_js_1.parseTableExpressionOrList)(from), this.#props.withNode)
        });
      }
      selectNoFrom(selection) {
        return (0, select_query_builder_js_1.createSelectQueryBuilder)({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#props.executor,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithSelections(select_query_node_js_1.SelectQueryNode.create(this.#props.withNode), (0, select_parser_js_1.parseSelectArg)(selection))
        });
      }
      /**
       * Creates an insert query.
       *
       * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
       * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
       * the inserted row if the db returned one.
       *
       * See the {@link InsertQueryBuilder.values | values} method for more info and examples. Also see
       * the {@link ReturningInterface.returning | returning} method for a way to return columns
       * on supported databases like PostgreSQL.
       *
       * ### Examples
       *
       * ```ts
       * const result = await db
       *   .insertInto('person')
       *   .values({
       *     first_name: 'Jennifer',
       *     last_name: 'Aniston'
       *   })
       *   .executeTakeFirst()
       *
       * console.log(result.insertId)
       * ```
       *
       * Some databases like PostgreSQL support the `returning` method:
       *
       * ```ts
       * const { id } = await db
       *   .insertInto('person')
       *   .values({
       *     first_name: 'Jennifer',
       *     last_name: 'Aniston'
       *   })
       *   .returning('id')
       *   .executeTakeFirst()
       * ```
       */
      insertInto(table) {
        return new insert_query_builder_js_1.InsertQueryBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#props.executor,
          queryNode: insert_query_node_js_1.InsertQueryNode.create((0, table_parser_js_1.parseTable)(table), this.#props.withNode)
        });
      }
      /**
       * Creates a replace query.
       *
       * A MySQL-only statement similar to {@link InsertQueryBuilder.onDuplicateKeyUpdate}
       * that deletes and inserts values on collision instead of updating existing rows.
       *
       * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
       * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
       * the inserted row if the db returned one.
       *
       * See the {@link InsertQueryBuilder.values | values} method for more info and examples.
       *
       * ### Examples
       *
       * ```ts
       * const result = await db
       *   .replaceInto('person')
       *   .values({
       *     first_name: 'Jennifer',
       *     last_name: 'Aniston'
       *   })
       *   .executeTakeFirst()
       *
       * console.log(result.insertId)
       * ```
       */
      replaceInto(table) {
        return new insert_query_builder_js_1.InsertQueryBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#props.executor,
          queryNode: insert_query_node_js_1.InsertQueryNode.create((0, table_parser_js_1.parseTable)(table), this.#props.withNode, true)
        });
      }
      deleteFrom(tables) {
        return new delete_query_builder_js_1.DeleteQueryBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#props.executor,
          queryNode: delete_query_node_js_1.DeleteQueryNode.create((0, table_parser_js_1.parseTableExpressionOrList)(tables), this.#props.withNode)
        });
      }
      updateTable(table) {
        return new update_query_builder_js_1.UpdateQueryBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#props.executor,
          queryNode: update_query_node_js_1.UpdateQueryNode.create((0, table_parser_js_1.parseTableExpression)(table), this.#props.withNode)
        });
      }
      /**
       * Creates a `with` query (Common Table Expression).
       *
       * ### Examples
       *
       * ```ts
       * await db
       *   .with('jennifers', (db) => db
       *     .selectFrom('person')
       *     .where('first_name', '=', 'Jennifer')
       *     .select(['id', 'age'])
       *   )
       *   .with('adult_jennifers', (db) => db
       *     .selectFrom('jennifers')
       *     .where('age', '>', 18)
       *     .select(['id', 'age'])
       *   )
       *   .selectFrom('adult_jennifers')
       *   .where('age', '<', 60)
       *   .selectAll()
       *   .execute()
       * ```
       *
       * The CTE name can optionally specify column names in addition to
       * a name. In that case Kysely requires the expression to retun
       * rows with the same columns.
       *
       * ```ts
       * await db
       *   .with('jennifers(id, age)', (db) => db
       *     .selectFrom('person')
       *     .where('first_name', '=', 'Jennifer')
       *     // This is ok since we return columns with the same
       *     // names as specified by `jennifers(id, age)`.
       *     .select(['id', 'age'])
       *   )
       *   .selectFrom('jennifers')
       *   .selectAll()
       *   .execute()
       * ```
       *
       * The first argument can also be a callback. The callback is passed
       * a `CTEBuilder` instance that can be used to configure the CTE:
       *
       * ```ts
       * await db
       *   .with(
       *     (cte) => cte('jennifers').materialized(),
       *     (db) => db
       *       .selectFrom('person')
       *       .where('first_name', '=', 'Jennifer')
       *       .select(['id', 'age'])
       *   )
       *   .selectFrom('jennifers')
       *   .selectAll()
       *   .execute()
       * ```
       */
      with(nameOrBuilder, expression) {
        const cte = (0, with_parser_js_1.parseCommonTableExpression)(nameOrBuilder, expression);
        return new QueryCreator2({
          ...this.#props,
          withNode: this.#props.withNode ? with_node_js_1.WithNode.cloneWithExpression(this.#props.withNode, cte) : with_node_js_1.WithNode.create(cte)
        });
      }
      /**
       * Creates a recursive `with` query (Common Table Expression).
       *
       * Note that recursiveness is a property of the whole `with` statement.
       * You cannot have recursive and non-recursive CTEs in a same `with` statement.
       * Therefore the recursiveness is determined by the **first** `with` or
       * `withRecusive` call you make.
       *
       * See the {@link with} method for examples and more documentation.
       */
      withRecursive(nameOrBuilder, expression) {
        const cte = (0, with_parser_js_1.parseCommonTableExpression)(nameOrBuilder, expression);
        return new QueryCreator2({
          ...this.#props,
          withNode: this.#props.withNode ? with_node_js_1.WithNode.cloneWithExpression(this.#props.withNode, cte) : with_node_js_1.WithNode.create(cte, { recursive: true })
        });
      }
      /**
       * Returns a copy of this query creator instance with the given plugin installed.
       */
      withPlugin(plugin) {
        return new QueryCreator2({
          ...this.#props,
          executor: this.#props.executor.withPlugin(plugin)
        });
      }
      /**
       * Returns a copy of this query creator instance without any plugins.
       */
      withoutPlugins() {
        return new QueryCreator2({
          ...this.#props,
          executor: this.#props.executor.withoutPlugins()
        });
      }
      /**
       * Sets the schema to be used for all table references that don't explicitly
       * specify a schema.
       *
       * This only affects the query created through the builder returned from
       * this method and doesn't modify the `db` instance.
       *
       * See [this recipe](https://github.com/koskimas/kysely/tree/master/site/docs/recipes/schemas.md)
       * for a more detailed explanation.
       *
       * ### Examples
       *
       * ```
       * await db
       *   .withSchema('mammals')
       *   .selectFrom('pet')
       *   .selectAll()
       *   .innerJoin('public.person', 'public.person.id', 'pet.owner_id')
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select * from "mammals"."pet"
       * inner join "public"."person"
       * on "public"."person"."id" = "mammals"."pet"."owner_id"
       * ```
       *
       * `withSchema` is smart enough to not add schema for aliases,
       * common table expressions or other places where the schema
       * doesn't belong to:
       *
       * ```
       * await db
       *   .withSchema('mammals')
       *   .selectFrom('pet as p')
       *   .select('p.name')
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select "p"."name" from "mammals"."pet" as "p"
       * ```
       */
      withSchema(schema) {
        return new QueryCreator2({
          ...this.#props,
          executor: this.#props.executor.withPluginAtFront(new with_schema_plugin_js_1.WithSchemaPlugin(schema))
        });
      }
    };
    exports.QueryCreator = QueryCreator2;
  }
});

// node_modules/kysely/dist/cjs/util/deferred.js
var require_deferred = __commonJS({
  "node_modules/kysely/dist/cjs/util/deferred.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Deferred = void 0;
    var Deferred2 = class {
      #promise;
      #resolve;
      #reject;
      constructor() {
        this.#promise = new Promise((resolve, reject) => {
          this.#reject = reject;
          this.#resolve = resolve;
        });
      }
      get promise() {
        return this.#promise;
      }
      resolve = (value) => {
        if (this.#resolve) {
          this.#resolve(value);
        }
      };
      reject = (reason) => {
        if (this.#reject) {
          this.#reject(reason);
        }
      };
    };
    exports.Deferred = Deferred2;
  }
});

// node_modules/kysely/dist/cjs/util/log-once.js
var require_log_once = __commonJS({
  "node_modules/kysely/dist/cjs/util/log-once.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logOnce = void 0;
    var LOGGED_MESSAGES2 = /* @__PURE__ */ new Set();
    function logOnce2(message) {
      if (LOGGED_MESSAGES2.has(message)) {
        return;
      }
      LOGGED_MESSAGES2.add(message);
      console.log(message);
    }
    exports.logOnce = logOnce2;
  }
});

// node_modules/kysely/dist/cjs/query-executor/query-executor-base.js
var require_query_executor_base = __commonJS({
  "node_modules/kysely/dist/cjs/query-executor/query-executor-base.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QueryExecutorBase = void 0;
    var object_utils_js_1 = require_object_utils();
    var deferred_js_1 = require_deferred();
    var log_once_js_1 = require_log_once();
    var NO_PLUGINS2 = (0, object_utils_js_1.freeze)([]);
    var QueryExecutorBase2 = class {
      #plugins;
      constructor(plugins = NO_PLUGINS2) {
        this.#plugins = plugins;
      }
      get plugins() {
        return this.#plugins;
      }
      transformQuery(node, queryId) {
        for (const plugin of this.#plugins) {
          const transformedNode = plugin.transformQuery({ node, queryId });
          if (transformedNode.kind === node.kind) {
            node = transformedNode;
          } else {
            throw new Error([
              `KyselyPlugin.transformQuery must return a node`,
              `of the same kind that was given to it.`,
              `The plugin was given a ${node.kind}`,
              `but it returned a ${transformedNode.kind}`
            ].join(" "));
          }
        }
        return node;
      }
      async executeQuery(compiledQuery, queryId) {
        return await this.provideConnection(async (connection) => {
          const result = await connection.executeQuery(compiledQuery);
          const transformedResult = await this.#transformResult(result, queryId);
          warnOfOutdatedDriverOrPlugins2(result, transformedResult);
          return transformedResult;
        });
      }
      async *stream(compiledQuery, chunkSize, queryId) {
        const connectionDefer = new deferred_js_1.Deferred();
        const connectionReleaseDefer = new deferred_js_1.Deferred();
        this.provideConnection(async (connection2) => {
          connectionDefer.resolve(connection2);
          return await connectionReleaseDefer.promise;
        }).catch((ex) => connectionDefer.reject(ex));
        const connection = await connectionDefer.promise;
        try {
          for await (const result of connection.streamQuery(compiledQuery, chunkSize)) {
            yield await this.#transformResult(result, queryId);
          }
        } finally {
          connectionReleaseDefer.resolve();
        }
      }
      async #transformResult(result, queryId) {
        for (const plugin of this.#plugins) {
          result = await plugin.transformResult({ result, queryId });
        }
        return result;
      }
    };
    exports.QueryExecutorBase = QueryExecutorBase2;
    function warnOfOutdatedDriverOrPlugins2(result, transformedResult) {
      const { numAffectedRows } = result;
      if (numAffectedRows === void 0 && result.numUpdatedOrDeletedRows === void 0 || numAffectedRows !== void 0 && transformedResult.numAffectedRows !== void 0) {
        return;
      }
      (0, log_once_js_1.logOnce)("kysely:warning: outdated driver/plugin detected! QueryResult.numUpdatedOrDeletedRows is deprecated and will be removed in a future release.");
    }
  }
});

// node_modules/kysely/dist/cjs/query-executor/noop-query-executor.js
var require_noop_query_executor = __commonJS({
  "node_modules/kysely/dist/cjs/query-executor/noop-query-executor.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NOOP_QUERY_EXECUTOR = exports.NoopQueryExecutor = void 0;
    var query_executor_base_js_1 = require_query_executor_base();
    var NoopQueryExecutor2 = class extends query_executor_base_js_1.QueryExecutorBase {
      get adapter() {
        throw new Error("this query cannot be compiled to SQL");
      }
      compileQuery() {
        throw new Error("this query cannot be compiled to SQL");
      }
      provideConnection() {
        throw new Error("this query cannot be executed");
      }
      withConnectionProvider() {
        throw new Error("this query cannot have a connection provider");
      }
      withPlugin(plugin) {
        return new NoopQueryExecutor2([...this.plugins, plugin]);
      }
      withPlugins(plugins) {
        return new NoopQueryExecutor2([...this.plugins, ...plugins]);
      }
      withPluginAtFront(plugin) {
        return new NoopQueryExecutor2([plugin, ...this.plugins]);
      }
      withoutPlugins() {
        return new NoopQueryExecutor2([]);
      }
    };
    exports.NoopQueryExecutor = NoopQueryExecutor2;
    exports.NOOP_QUERY_EXECUTOR = new NoopQueryExecutor2();
  }
});

// node_modules/kysely/dist/cjs/parser/parse-utils.js
var require_parse_utils = __commonJS({
  "node_modules/kysely/dist/cjs/parser/parse-utils.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createOverBuilder = exports.createJoinBuilder = exports.createQueryCreator = exports.createSelectQueryBuilder = void 0;
    var join_node_js_1 = require_join_node();
    var over_node_js_1 = require_over_node();
    var select_query_node_js_1 = require_select_query_node();
    var join_builder_js_1 = require_join_builder();
    var over_builder_js_1 = require_over_builder();
    var select_query_builder_js_1 = require_select_query_builder();
    var query_creator_js_1 = require_query_creator();
    var noop_query_executor_js_1 = require_noop_query_executor();
    var query_id_js_1 = require_query_id();
    var table_parser_js_1 = require_table_parser();
    function createSelectQueryBuilder2() {
      return (0, select_query_builder_js_1.createSelectQueryBuilder)({
        queryId: (0, query_id_js_1.createQueryId)(),
        executor: noop_query_executor_js_1.NOOP_QUERY_EXECUTOR,
        queryNode: select_query_node_js_1.SelectQueryNode.createFrom((0, table_parser_js_1.parseTableExpressionOrList)([]))
      });
    }
    exports.createSelectQueryBuilder = createSelectQueryBuilder2;
    function createQueryCreator2() {
      return new query_creator_js_1.QueryCreator({
        executor: noop_query_executor_js_1.NOOP_QUERY_EXECUTOR
      });
    }
    exports.createQueryCreator = createQueryCreator2;
    function createJoinBuilder2(joinType, table) {
      return new join_builder_js_1.JoinBuilder({
        joinNode: join_node_js_1.JoinNode.create(joinType, (0, table_parser_js_1.parseTableExpression)(table))
      });
    }
    exports.createJoinBuilder = createJoinBuilder2;
    function createOverBuilder2() {
      return new over_builder_js_1.OverBuilder({
        overNode: over_node_js_1.OverNode.create()
      });
    }
    exports.createOverBuilder = createOverBuilder2;
  }
});

// node_modules/kysely/dist/cjs/parser/join-parser.js
var require_join_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/join-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseJoin = void 0;
    var join_node_js_1 = require_join_node();
    var table_parser_js_1 = require_table_parser();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var parse_utils_js_1 = require_parse_utils();
    function parseJoin2(joinType, args) {
      if (args.length === 3) {
        return parseSingleOnJoin2(joinType, args[0], args[1], args[2]);
      } else if (args.length === 2) {
        return parseCallbackJoin2(joinType, args[0], args[1]);
      } else {
        throw new Error("not implemented");
      }
    }
    exports.parseJoin = parseJoin2;
    function parseCallbackJoin2(joinType, from, callback) {
      return callback((0, parse_utils_js_1.createJoinBuilder)(joinType, from)).toOperationNode();
    }
    function parseSingleOnJoin2(joinType, from, lhsColumn, rhsColumn) {
      return join_node_js_1.JoinNode.createWithOn(joinType, (0, table_parser_js_1.parseTableExpression)(from), (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhsColumn, "=", rhsColumn));
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/offset-node.js
var require_offset_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/offset-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OffsetNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var value_node_js_1 = require_value_node();
    exports.OffsetNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "OffsetNode";
      },
      create(offset) {
        return (0, object_utils_js_1.freeze)({
          kind: "OffsetNode",
          offset: value_node_js_1.ValueNode.create(offset)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/group-by-item-node.js
var require_group_by_item_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/group-by-item-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GroupByItemNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.GroupByItemNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "GroupByItemNode";
      },
      create(groupBy) {
        return (0, object_utils_js_1.freeze)({
          kind: "GroupByItemNode",
          groupBy
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/group-by-parser.js
var require_group_by_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/group-by-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseGroupBy = void 0;
    var group_by_item_node_js_1 = require_group_by_item_node();
    var expression_builder_js_1 = require_expression_builder();
    var object_utils_js_1 = require_object_utils();
    var reference_parser_js_1 = require_reference_parser();
    function parseGroupBy2(groupBy) {
      groupBy = (0, object_utils_js_1.isFunction)(groupBy) ? groupBy((0, expression_builder_js_1.expressionBuilder)()) : groupBy;
      return (0, reference_parser_js_1.parseReferenceExpressionOrList)(groupBy).map(group_by_item_node_js_1.GroupByItemNode.create);
    }
    exports.parseGroupBy = parseGroupBy2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/set-operation-node.js
var require_set_operation_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/set-operation-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SetOperationNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.SetOperationNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "SetOperationNode";
      },
      create(operator, expression, all) {
        return (0, object_utils_js_1.freeze)({
          kind: "SetOperationNode",
          operator,
          expression,
          all
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/set-operation-parser.js
var require_set_operation_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/set-operation-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseSetOperations = void 0;
    var expression_builder_js_1 = require_expression_builder();
    var set_operation_node_js_1 = require_set_operation_node();
    var object_utils_js_1 = require_object_utils();
    var expression_parser_js_1 = require_expression_parser();
    function parseSetOperations2(operator, expression, all) {
      if ((0, object_utils_js_1.isFunction)(expression)) {
        expression = expression((0, expression_builder_js_1.createExpressionBuilder)());
      }
      if (!(0, object_utils_js_1.isReadonlyArray)(expression)) {
        expression = [expression];
      }
      return expression.map((expr) => set_operation_node_js_1.SetOperationNode.create(operator, (0, expression_parser_js_1.parseExpression)(expr), all));
    }
    exports.parseSetOperations = parseSetOperations2;
  }
});

// node_modules/kysely/dist/cjs/expression/expression-wrapper.js
var require_expression_wrapper = __commonJS({
  "node_modules/kysely/dist/cjs/expression/expression-wrapper.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AndWrapper = exports.OrWrapper = exports.AliasedExpressionWrapper = exports.ExpressionWrapper = void 0;
    var alias_node_js_1 = require_alias_node();
    var and_node_js_1 = require_and_node();
    var identifier_node_js_1 = require_identifier_node();
    var operation_node_source_js_1 = require_operation_node_source();
    var or_node_js_1 = require_or_node();
    var parens_node_js_1 = require_parens_node();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var ExpressionWrapper2 = class {
      #node;
      constructor(node) {
        this.#node = node;
      }
      /** @private */
      get expressionType() {
        return void 0;
      }
      as(alias) {
        return new AliasedExpressionWrapper2(this, alias);
      }
      or(...args) {
        return new OrWrapper2(or_node_js_1.OrNode.create(this.#node, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args)));
      }
      and(...args) {
        return new AndWrapper2(and_node_js_1.AndNode.create(this.#node, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args)));
      }
      /**
       * Change the output type of the expression.
       *
       * This method call doesn't change the SQL in any way. This methods simply
       * returns a copy of this `ExpressionWrapper` with a new output type.
       */
      $castTo() {
        return new ExpressionWrapper2(this.#node);
      }
      toOperationNode() {
        return this.#node;
      }
    };
    exports.ExpressionWrapper = ExpressionWrapper2;
    var AliasedExpressionWrapper2 = class {
      #expr;
      #alias;
      constructor(expr, alias) {
        this.#expr = expr;
        this.#alias = alias;
      }
      /** @private */
      get expression() {
        return this.#expr;
      }
      /** @private */
      get alias() {
        return this.#alias;
      }
      toOperationNode() {
        return alias_node_js_1.AliasNode.create(this.#expr.toOperationNode(), (0, operation_node_source_js_1.isOperationNodeSource)(this.#alias) ? this.#alias.toOperationNode() : identifier_node_js_1.IdentifierNode.create(this.#alias));
      }
    };
    exports.AliasedExpressionWrapper = AliasedExpressionWrapper2;
    var OrWrapper2 = class {
      #node;
      constructor(node) {
        this.#node = node;
      }
      /** @private */
      get expressionType() {
        return void 0;
      }
      as(alias) {
        return new AliasedExpressionWrapper2(this, alias);
      }
      or(...args) {
        return new OrWrapper2(or_node_js_1.OrNode.create(this.#node, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args)));
      }
      /**
       * Change the output type of the expression.
       *
       * This method call doesn't change the SQL in any way. This methods simply
       * returns a copy of this `OrWrapper` with a new output type.
       */
      $castTo() {
        return new OrWrapper2(this.#node);
      }
      toOperationNode() {
        return parens_node_js_1.ParensNode.create(this.#node);
      }
    };
    exports.OrWrapper = OrWrapper2;
    var AndWrapper2 = class {
      #node;
      constructor(node) {
        this.#node = node;
      }
      /** @private */
      get expressionType() {
        return void 0;
      }
      as(alias) {
        return new AliasedExpressionWrapper2(this, alias);
      }
      and(...args) {
        return new AndWrapper2(and_node_js_1.AndNode.create(this.#node, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args)));
      }
      /**
       * Change the output type of the expression.
       *
       * This method call doesn't change the SQL in any way. This methods simply
       * returns a copy of this `AndWrapper` with a new output type.
       */
      $castTo() {
        return new AndWrapper2(this.#node);
      }
      toOperationNode() {
        return parens_node_js_1.ParensNode.create(this.#node);
      }
    };
    exports.AndWrapper = AndWrapper2;
  }
});

// node_modules/kysely/dist/cjs/query-builder/select-query-builder.js
var require_select_query_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/select-query-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createSelectQueryBuilder = void 0;
    var alias_node_js_1 = require_alias_node();
    var select_modifier_node_js_1 = require_select_modifier_node();
    var join_parser_js_1 = require_join_parser();
    var select_parser_js_1 = require_select_parser();
    var reference_parser_js_1 = require_reference_parser();
    var select_query_node_js_1 = require_select_query_node();
    var query_node_js_1 = require_query_node();
    var order_by_parser_js_1 = require_order_by_parser();
    var prevent_await_js_1 = require_prevent_await();
    var limit_node_js_1 = require_limit_node();
    var offset_node_js_1 = require_offset_node();
    var object_utils_js_1 = require_object_utils();
    var group_by_parser_js_1 = require_group_by_parser();
    var no_result_error_js_1 = require_no_result_error();
    var identifier_node_js_1 = require_identifier_node();
    var set_operation_parser_js_1 = require_set_operation_parser();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var expression_wrapper_js_1 = require_expression_wrapper();
    var SelectQueryBuilderImpl2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      get expressionType() {
        return void 0;
      }
      get isSelectQueryBuilder() {
        return true;
      }
      where(...args) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithWhere(this.#props.queryNode, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args))
        });
      }
      whereRef(lhs, op, rhs) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithWhere(this.#props.queryNode, (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhs, op, rhs))
        });
      }
      having(...args) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithHaving(this.#props.queryNode, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args))
        });
      }
      havingRef(lhs, op, rhs) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithHaving(this.#props.queryNode, (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhs, op, rhs))
        });
      }
      select(selection) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithSelections(this.#props.queryNode, (0, select_parser_js_1.parseSelectArg)(selection))
        });
      }
      distinctOn(selection) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithDistinctOn(this.#props.queryNode, (0, reference_parser_js_1.parseReferenceExpressionOrList)(selection))
        });
      }
      modifyFront(modifier) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, select_modifier_node_js_1.SelectModifierNode.createWithExpression(modifier.toOperationNode()))
        });
      }
      modifyEnd(modifier) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, select_modifier_node_js_1.SelectModifierNode.createWithExpression(modifier.toOperationNode()))
        });
      }
      distinct() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, select_modifier_node_js_1.SelectModifierNode.create("Distinct"))
        });
      }
      forUpdate() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, select_modifier_node_js_1.SelectModifierNode.create("ForUpdate"))
        });
      }
      forShare() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, select_modifier_node_js_1.SelectModifierNode.create("ForShare"))
        });
      }
      forKeyShare() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, select_modifier_node_js_1.SelectModifierNode.create("ForKeyShare"))
        });
      }
      forNoKeyUpdate() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, select_modifier_node_js_1.SelectModifierNode.create("ForNoKeyUpdate"))
        });
      }
      skipLocked() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, select_modifier_node_js_1.SelectModifierNode.create("SkipLocked"))
        });
      }
      noWait() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, select_modifier_node_js_1.SelectModifierNode.create("NoWait"))
        });
      }
      selectAll(table) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithSelections(this.#props.queryNode, (0, select_parser_js_1.parseSelectAll)(table))
        });
      }
      innerJoin(...args) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("InnerJoin", args))
        });
      }
      leftJoin(...args) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("LeftJoin", args))
        });
      }
      rightJoin(...args) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("RightJoin", args))
        });
      }
      fullJoin(...args) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("FullJoin", args))
        });
      }
      innerJoinLateral(...args) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("LateralInnerJoin", args))
        });
      }
      leftJoinLateral(...args) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithJoin(this.#props.queryNode, (0, join_parser_js_1.parseJoin)("LateralLeftJoin", args))
        });
      }
      orderBy(...args) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithOrderByItems(this.#props.queryNode, (0, order_by_parser_js_1.parseOrderBy)(args))
        });
      }
      groupBy(groupBy) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithGroupByItems(this.#props.queryNode, (0, group_by_parser_js_1.parseGroupBy)(groupBy))
        });
      }
      limit(limit) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithLimit(this.#props.queryNode, limit_node_js_1.LimitNode.create(limit))
        });
      }
      offset(offset) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithOffset(this.#props.queryNode, offset_node_js_1.OffsetNode.create(offset))
        });
      }
      union(expression) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, (0, set_operation_parser_js_1.parseSetOperations)("union", expression, false))
        });
      }
      unionAll(expression) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, (0, set_operation_parser_js_1.parseSetOperations)("union", expression, true))
        });
      }
      intersect(expression) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, (0, set_operation_parser_js_1.parseSetOperations)("intersect", expression, false))
        });
      }
      intersectAll(expression) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, (0, set_operation_parser_js_1.parseSetOperations)("intersect", expression, true))
        });
      }
      except(expression) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, (0, set_operation_parser_js_1.parseSetOperations)("except", expression, false))
        });
      }
      exceptAll(expression) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, (0, set_operation_parser_js_1.parseSetOperations)("except", expression, true))
        });
      }
      as(alias) {
        return new AliasedSelectQueryBuilderImpl2(this, alias);
      }
      clearSelect() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithoutSelections(this.#props.queryNode)
        });
      }
      clearWhere() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithoutWhere(this.#props.queryNode)
        });
      }
      clearLimit() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithoutLimit(this.#props.queryNode)
        });
      }
      clearOffset() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithoutOffset(this.#props.queryNode)
        });
      }
      clearOrderBy() {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: select_query_node_js_1.SelectQueryNode.cloneWithoutOrderBy(this.#props.queryNode)
        });
      }
      $call(func) {
        return func(this);
      }
      $if(condition, func) {
        if (condition) {
          return func(this);
        }
        return new SelectQueryBuilderImpl2({
          ...this.#props
        });
      }
      $castTo() {
        return new SelectQueryBuilderImpl2(this.#props);
      }
      $narrowType() {
        return new SelectQueryBuilderImpl2(this.#props);
      }
      $assertType() {
        return new SelectQueryBuilderImpl2(this.#props);
      }
      $asTuple() {
        return new expression_wrapper_js_1.ExpressionWrapper(this.toOperationNode());
      }
      withPlugin(plugin) {
        return new SelectQueryBuilderImpl2({
          ...this.#props,
          executor: this.#props.executor.withPlugin(plugin)
        });
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        const compiledQuery = this.compile();
        const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
        return result.rows;
      }
      async executeTakeFirst() {
        const [result] = await this.execute();
        return result;
      }
      async executeTakeFirstOrThrow(errorConstructor = no_result_error_js_1.NoResultError) {
        const result = await this.executeTakeFirst();
        if (result === void 0) {
          const error = (0, no_result_error_js_1.isNoResultErrorConstructor)(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
          throw error;
        }
        return result;
      }
      async *stream(chunkSize = 100) {
        const compiledQuery = this.compile();
        const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
        for await (const item of stream) {
          yield* item.rows;
        }
      }
      async explain(format, options) {
        const builder = new SelectQueryBuilderImpl2({
          ...this.#props,
          queryNode: query_node_js_1.QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
        });
        return await builder.execute();
      }
    };
    (0, prevent_await_js_1.preventAwait)(SelectQueryBuilderImpl2, "don't await SelectQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
    function createSelectQueryBuilder2(props) {
      return new SelectQueryBuilderImpl2(props);
    }
    exports.createSelectQueryBuilder = createSelectQueryBuilder2;
    var AliasedSelectQueryBuilderImpl2 = class {
      #queryBuilder;
      #alias;
      constructor(queryBuilder, alias) {
        this.#queryBuilder = queryBuilder;
        this.#alias = alias;
      }
      get expression() {
        return this.#queryBuilder;
      }
      get alias() {
        return this.#alias;
      }
      get isAliasedSelectQueryBuilder() {
        return true;
      }
      toOperationNode() {
        return alias_node_js_1.AliasNode.create(this.#queryBuilder.toOperationNode(), identifier_node_js_1.IdentifierNode.create(this.#alias));
      }
    };
    (0, prevent_await_js_1.preventAwait)(AliasedSelectQueryBuilderImpl2, "don't await AliasedSelectQueryBuilder instances directly. AliasedSelectQueryBuilder should never be executed directly since it's always a part of another query.");
  }
});

// node_modules/kysely/dist/cjs/operation-node/aggregate-function-node.js
var require_aggregate_function_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/aggregate-function-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AggregateFunctionNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var where_node_js_1 = require_where_node();
    exports.AggregateFunctionNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "AggregateFunctionNode";
      },
      create(aggregateFunction, aggregated = []) {
        return (0, object_utils_js_1.freeze)({
          kind: "AggregateFunctionNode",
          func: aggregateFunction,
          aggregated
        });
      },
      cloneWithDistinct(aggregateFunctionNode) {
        return (0, object_utils_js_1.freeze)({
          ...aggregateFunctionNode,
          distinct: true
        });
      },
      cloneWithFilter(aggregateFunctionNode, filter) {
        return (0, object_utils_js_1.freeze)({
          ...aggregateFunctionNode,
          filter: aggregateFunctionNode.filter ? where_node_js_1.WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "And", filter) : where_node_js_1.WhereNode.create(filter)
        });
      },
      cloneWithOrFilter(aggregateFunctionNode, filter) {
        return (0, object_utils_js_1.freeze)({
          ...aggregateFunctionNode,
          filter: aggregateFunctionNode.filter ? where_node_js_1.WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "Or", filter) : where_node_js_1.WhereNode.create(filter)
        });
      },
      cloneWithOver(aggregateFunctionNode, over) {
        return (0, object_utils_js_1.freeze)({
          ...aggregateFunctionNode,
          over
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/function-node.js
var require_function_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/function-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FunctionNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.FunctionNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "FunctionNode";
      },
      create(func, args) {
        return (0, object_utils_js_1.freeze)({
          kind: "FunctionNode",
          func,
          arguments: args
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/query-builder/aggregate-function-builder.js
var require_aggregate_function_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/aggregate-function-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AliasedAggregateFunctionBuilder = exports.AggregateFunctionBuilder = void 0;
    var object_utils_js_1 = require_object_utils();
    var aggregate_function_node_js_1 = require_aggregate_function_node();
    var alias_node_js_1 = require_alias_node();
    var identifier_node_js_1 = require_identifier_node();
    var prevent_await_js_1 = require_prevent_await();
    var parse_utils_js_1 = require_parse_utils();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var AggregateFunctionBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      /** @private */
      get expressionType() {
        return void 0;
      }
      /**
       * Returns an aliased version of the function.
       *
       * In addition to slapping `as "the_alias"` to the end of the SQL,
       * this method also provides strict typing:
       *
       * ```ts
       * const result = await db
       *   .selectFrom('person')
       *   .select(
       *     (eb) => eb.fn.count<number>('id').as('person_count')
       *   )
       *   .executeTakeFirstOrThrow()
       *
       * // `person_count: number` field exists in the result type.
       * console.log(result.person_count)
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select count("id") as "person_count"
       * from "person"
       * ```
       */
      as(alias) {
        return new AliasedAggregateFunctionBuilder2(this, alias);
      }
      /**
       * Adds a `distinct` clause inside the function.
       *
       * ### Examples
       *
       * ```ts
       * const result = await db
       *   .selectFrom('person')
       *   .select((eb) =>
       *     eb.fn.count<number>('first_name').distinct().as('first_name_count')
       *   )
       *   .executeTakeFirstOrThrow()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select count(distinct "first_name") as "first_name_count"
       * from "person"
       * ```
       */
      distinct() {
        return new AggregateFunctionBuilder2({
          ...this.#props,
          aggregateFunctionNode: aggregate_function_node_js_1.AggregateFunctionNode.cloneWithDistinct(this.#props.aggregateFunctionNode)
        });
      }
      filterWhere(...args) {
        return new AggregateFunctionBuilder2({
          ...this.#props,
          aggregateFunctionNode: aggregate_function_node_js_1.AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args))
        });
      }
      /**
       * Adds a `filter` clause with a nested `where` clause after the function, where
       * both sides of the operator are references to columns.
       *
       * Similar to {@link WhereInterface}'s `whereRef` method.
       *
       * ### Examples
       *
       * Count people with same first and last names versus general public:
       *
       * ```ts
       * const result = await db
       *   .selectFrom('person')
       *   .select((eb) => [
       *     eb.fn
       *       .count<number>('id')
       *       .filterWhereRef('first_name', '=', 'last_name')
       *       .as('repeat_name_count'),
       *     eb.fn.count<number>('id').as('total_count'),
       *   ])
       *   .executeTakeFirstOrThrow()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select
       *   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
       *   count("id") as "total_count"
       * from "person"
       * ```
       */
      filterWhereRef(lhs, op, rhs) {
        return new AggregateFunctionBuilder2({
          ...this.#props,
          aggregateFunctionNode: aggregate_function_node_js_1.AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhs, op, rhs))
        });
      }
      /**
       * Adds an `over` clause (window functions) after the function.
       *
       * ### Examples
       *
       * ```ts
       * const result = await db
       *   .selectFrom('person')
       *   .select(
       *     (eb) => eb.fn.avg<number>('age').over().as('average_age')
       *   )
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select avg("age") over() as "average_age"
       * from "person"
       * ```
       *
       * Also supports passing a callback that returns an over builder,
       * allowing to add partition by and sort by clauses inside over.
       *
       * ```ts
       * const result = await db
       *   .selectFrom('person')
       *   .select(
       *     (eb) => eb.fn.avg<number>('age').over(
       *       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
       *     ).as('average_age')
       *   )
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
       * from "person"
       * ```
       */
      over(over) {
        const builder = (0, parse_utils_js_1.createOverBuilder)();
        return new AggregateFunctionBuilder2({
          ...this.#props,
          aggregateFunctionNode: aggregate_function_node_js_1.AggregateFunctionNode.cloneWithOver(this.#props.aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode())
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.aggregateFunctionNode;
      }
    };
    exports.AggregateFunctionBuilder = AggregateFunctionBuilder2;
    (0, prevent_await_js_1.preventAwait)(AggregateFunctionBuilder2, "don't await AggregateFunctionBuilder instances. They are never executed directly and are always just a part of a query.");
    var AliasedAggregateFunctionBuilder2 = class {
      #aggregateFunctionBuilder;
      #alias;
      constructor(aggregateFunctionBuilder, alias) {
        this.#aggregateFunctionBuilder = aggregateFunctionBuilder;
        this.#alias = alias;
      }
      /** @private */
      get expression() {
        return this.#aggregateFunctionBuilder;
      }
      /** @private */
      get alias() {
        return this.#alias;
      }
      toOperationNode() {
        return alias_node_js_1.AliasNode.create(this.#aggregateFunctionBuilder.toOperationNode(), identifier_node_js_1.IdentifierNode.create(this.#alias));
      }
    };
    exports.AliasedAggregateFunctionBuilder = AliasedAggregateFunctionBuilder2;
  }
});

// node_modules/kysely/dist/cjs/query-builder/function-module.js
var require_function_module = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/function-module.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createFunctionModule = void 0;
    var expression_wrapper_js_1 = require_expression_wrapper();
    var aggregate_function_node_js_1 = require_aggregate_function_node();
    var function_node_js_1 = require_function_node();
    var reference_parser_js_1 = require_reference_parser();
    var select_parser_js_1 = require_select_parser();
    var aggregate_function_builder_js_1 = require_aggregate_function_builder();
    function createFunctionModule2() {
      const fn = (name, args) => {
        return new expression_wrapper_js_1.ExpressionWrapper(function_node_js_1.FunctionNode.create(name, (0, reference_parser_js_1.parseReferenceExpressionOrList)(args)));
      };
      const agg = (name, args) => {
        return new aggregate_function_builder_js_1.AggregateFunctionBuilder({
          aggregateFunctionNode: aggregate_function_node_js_1.AggregateFunctionNode.create(name, args ? (0, reference_parser_js_1.parseReferenceExpressionOrList)(args) : void 0)
        });
      };
      return Object.assign(fn, {
        agg,
        avg(column) {
          return agg("avg", [column]);
        },
        coalesce(value, ...otherValues) {
          return fn("coalesce", [value, ...otherValues]);
        },
        count(column) {
          return agg("count", [column]);
        },
        countAll(table) {
          return new aggregate_function_builder_js_1.AggregateFunctionBuilder({
            aggregateFunctionNode: aggregate_function_node_js_1.AggregateFunctionNode.create("count", (0, select_parser_js_1.parseSelectAll)(table))
          });
        },
        max(column) {
          return agg("max", [column]);
        },
        min(column) {
          return agg("min", [column]);
        },
        sum(column) {
          return agg("sum", [column]);
        },
        any(column) {
          return fn("any", [column]);
        }
      });
    }
    exports.createFunctionModule = createFunctionModule2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/unary-operation-node.js
var require_unary_operation_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/unary-operation-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnaryOperationNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.UnaryOperationNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "UnaryOperationNode";
      },
      create(operator, operand) {
        return (0, object_utils_js_1.freeze)({
          kind: "UnaryOperationNode",
          operator,
          operand
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/unary-operation-parser.js
var require_unary_operation_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/unary-operation-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseUnaryOperation = exports.parseNotExists = exports.parseExists = void 0;
    var operator_node_js_1 = require_operator_node();
    var unary_operation_node_js_1 = require_unary_operation_node();
    var reference_parser_js_1 = require_reference_parser();
    function parseExists(operand) {
      return parseUnaryOperation2("exists", operand);
    }
    exports.parseExists = parseExists;
    function parseNotExists(operand) {
      return parseUnaryOperation2("not exists", operand);
    }
    exports.parseNotExists = parseNotExists;
    function parseUnaryOperation2(operator, operand) {
      return unary_operation_node_js_1.UnaryOperationNode.create(operator_node_js_1.OperatorNode.create(operator), (0, reference_parser_js_1.parseReferenceExpression)(operand));
    }
    exports.parseUnaryOperation = parseUnaryOperation2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/when-node.js
var require_when_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/when-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WhenNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.WhenNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "WhenNode";
      },
      create(condition) {
        return (0, object_utils_js_1.freeze)({
          kind: "WhenNode",
          condition
        });
      },
      cloneWithResult(whenNode, result) {
        return (0, object_utils_js_1.freeze)({
          ...whenNode,
          result
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/case-node.js
var require_case_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/case-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CaseNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var when_node_js_1 = require_when_node();
    exports.CaseNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "CaseNode";
      },
      create(value) {
        return (0, object_utils_js_1.freeze)({
          kind: "CaseNode",
          value
        });
      },
      cloneWithWhen(caseNode, when) {
        return (0, object_utils_js_1.freeze)({
          ...caseNode,
          when: (0, object_utils_js_1.freeze)(caseNode.when ? [...caseNode.when, when] : [when])
        });
      },
      cloneWithThen(caseNode, then) {
        return (0, object_utils_js_1.freeze)({
          ...caseNode,
          when: caseNode.when ? (0, object_utils_js_1.freeze)([
            ...caseNode.when.slice(0, -1),
            when_node_js_1.WhenNode.cloneWithResult(caseNode.when[caseNode.when.length - 1], then)
          ]) : void 0
        });
      },
      cloneWith(caseNode, props) {
        return (0, object_utils_js_1.freeze)({
          ...caseNode,
          ...props
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/query-builder/case-builder.js
var require_case_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/case-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CaseEndBuilder = exports.CaseWhenBuilder = exports.CaseThenBuilder = exports.CaseBuilder = void 0;
    var expression_wrapper_js_1 = require_expression_wrapper();
    var object_utils_js_1 = require_object_utils();
    var case_node_js_1 = require_case_node();
    var when_node_js_1 = require_when_node();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var value_parser_js_1 = require_value_parser();
    var CaseBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      when(...args) {
        return new CaseThenBuilder2({
          ...this.#props,
          node: case_node_js_1.CaseNode.cloneWithWhen(this.#props.node, when_node_js_1.WhenNode.create((0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args)))
        });
      }
    };
    exports.CaseBuilder = CaseBuilder2;
    var CaseThenBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      then(valueExpression) {
        return new CaseWhenBuilder2({
          ...this.#props,
          node: case_node_js_1.CaseNode.cloneWithThen(this.#props.node, (0, value_parser_js_1.isSafeImmediateValue)(valueExpression) ? (0, value_parser_js_1.parseSafeImmediateValue)(valueExpression) : (0, value_parser_js_1.parseValueExpression)(valueExpression))
        });
      }
    };
    exports.CaseThenBuilder = CaseThenBuilder2;
    var CaseWhenBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      when(...args) {
        return new CaseThenBuilder2({
          ...this.#props,
          node: case_node_js_1.CaseNode.cloneWithWhen(this.#props.node, when_node_js_1.WhenNode.create((0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args)))
        });
      }
      else(valueExpression) {
        return new CaseEndBuilder2({
          ...this.#props,
          node: case_node_js_1.CaseNode.cloneWith(this.#props.node, {
            else: (0, value_parser_js_1.isSafeImmediateValue)(valueExpression) ? (0, value_parser_js_1.parseSafeImmediateValue)(valueExpression) : (0, value_parser_js_1.parseValueExpression)(valueExpression)
          })
        });
      }
      end() {
        return new expression_wrapper_js_1.ExpressionWrapper(case_node_js_1.CaseNode.cloneWith(this.#props.node, { isStatement: false }));
      }
      endCase() {
        return new expression_wrapper_js_1.ExpressionWrapper(case_node_js_1.CaseNode.cloneWith(this.#props.node, { isStatement: true }));
      }
    };
    exports.CaseWhenBuilder = CaseWhenBuilder2;
    var CaseEndBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      end() {
        return new expression_wrapper_js_1.ExpressionWrapper(case_node_js_1.CaseNode.cloneWith(this.#props.node, { isStatement: false }));
      }
      endCase() {
        return new expression_wrapper_js_1.ExpressionWrapper(case_node_js_1.CaseNode.cloneWith(this.#props.node, { isStatement: true }));
      }
    };
    exports.CaseEndBuilder = CaseEndBuilder2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/json-path-leg-node.js
var require_json_path_leg_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/json-path-leg-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JSONPathLegNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.JSONPathLegNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "JSONPathLegNode";
      },
      create(type, value) {
        return (0, object_utils_js_1.freeze)({
          kind: "JSONPathLegNode",
          type,
          value
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/query-builder/json-path-builder.js
var require_json_path_builder = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/json-path-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AliasedJSONPathBuilder = exports.TraversedJSONPathBuilder = exports.JSONPathBuilder = void 0;
    var alias_node_js_1 = require_alias_node();
    var identifier_node_js_1 = require_identifier_node();
    var json_operator_chain_node_js_1 = require_json_operator_chain_node();
    var json_path_leg_node_js_1 = require_json_path_leg_node();
    var json_path_node_js_1 = require_json_path_node();
    var json_reference_node_js_1 = require_json_reference_node();
    var operation_node_source_js_1 = require_operation_node_source();
    var value_node_js_1 = require_value_node();
    var JSONPathBuilder2 = class {
      #node;
      constructor(node) {
        this.#node = node;
      }
      /**
       * Access an element of a JSON array in a specific location.
       *
       * Since there's no guarantee an element exists in the given array location, the
       * resulting type is always nullable. If you're sure the element exists, you
       * should use {@link SelectQueryBuilder.$assertType} to narrow the type safely.
       *
       * See also {@link key} to access properties of JSON objects.
       *
       * ### Examples
       *
       * ```ts
       * db.selectFrom('person').select(eb =>
       *   eb.ref('nicknames', '->').at(0).as('primary_nickname')
       * )
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select "nicknames"->0 as "primary_nickname" from "person"
       *```
       *
       * Combined with {@link key}:
       *
       * ```ts
       * db.selectFrom('person').select(eb =>
       *   eb.ref('experience', '->').at(0).key('role').as('first_role')
       * )
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select "experience"->0->'role' as "first_role" from "person"
       * ```
       *
       * You can use `'last'` to access the last element of the array in MySQL:
       *
       * ```ts
       * db.selectFrom('person').select(eb =>
       *   eb.ref('nicknames', '->$').at('last').as('last_nickname')
       * )
       * ```
       *
       * The generated SQL (MySQL):
       *
       * ```sql
       * select `nicknames`->'$[last]' as `last_nickname` from `person`
       * ```
       *
       * Or `'#-1'` in SQLite:
       *
       * ```ts
       * db.selectFrom('person').select(eb =>
       *   eb.ref('nicknames', '->>$').at('#-1').as('last_nickname')
       * )
       * ```
       *
       * The generated SQL (SQLite):
       *
       * ```sql
       * select "nicknames"->>'$[#-1]' as `last_nickname` from `person`
       * ```
       */
      at(index) {
        return this.#createBuilderWithPathLeg("ArrayLocation", index);
      }
      /**
       * Access a property of a JSON object.
       *
       * If a field is optional, the resulting type will be nullable.
       *
       * See also {@link at} to access elements of JSON arrays.
       *
       * ### Examples
       *
       * ```ts
       * db.selectFrom('person').select(eb =>
       *   eb.ref('address', '->').key('city').as('city')
       * )
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select "address"->'city' as "city" from "person"
       * ```
       *
       * Going deeper:
       *
       * ```ts
       * db.selectFrom('person').select(eb =>
       *   eb.ref('profile', '->$').key('website').key('url').as('website_url')
       * )
       * ```
       *
       * The generated SQL (MySQL):
       *
       * ```sql
       * select `profile`->'$.website.url' as `website_url` from `person`
       * ```
       *
       * Combined with {@link at}:
       *
       * ```ts
       * db.selectFrom('person').select(eb =>
       *   eb.ref('profile', '->').key('addresses').at(0).key('city').as('city')
       * )
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select "profile"->'addresses'->0->'city' as "city" from "person"
       * ```
       */
      key(key) {
        return this.#createBuilderWithPathLeg("Member", key);
      }
      #createBuilderWithPathLeg(legType, value) {
        return new TraversedJSONPathBuilder2(json_reference_node_js_1.JSONReferenceNode.cloneWithTraversal(this.#node, json_path_node_js_1.JSONPathNode.is(this.#node.traversal) ? json_path_node_js_1.JSONPathNode.cloneWithLeg(this.#node.traversal, json_path_leg_node_js_1.JSONPathLegNode.create(legType, value)) : json_operator_chain_node_js_1.JSONOperatorChainNode.cloneWithValue(this.#node.traversal, value_node_js_1.ValueNode.createImmediate(value))));
      }
    };
    exports.JSONPathBuilder = JSONPathBuilder2;
    var TraversedJSONPathBuilder2 = class extends JSONPathBuilder2 {
      #node;
      constructor(node) {
        super(node);
        this.#node = node;
      }
      /** @private */
      get expressionType() {
        return void 0;
      }
      as(alias) {
        return new AliasedJSONPathBuilder2(this, alias);
      }
      /**
       * Change the output type of the json path.
       *
       * This method call doesn't change the SQL in any way. This methods simply
       * returns a copy of this `JSONPathBuilder` with a new output type.
       */
      $castTo() {
        return new JSONPathBuilder2(this.#node);
      }
      toOperationNode() {
        return this.#node;
      }
    };
    exports.TraversedJSONPathBuilder = TraversedJSONPathBuilder2;
    var AliasedJSONPathBuilder2 = class {
      #jsonPath;
      #alias;
      constructor(jsonPath, alias) {
        this.#jsonPath = jsonPath;
        this.#alias = alias;
      }
      /** @private */
      get expression() {
        return this.#jsonPath;
      }
      /** @private */
      get alias() {
        return this.#alias;
      }
      toOperationNode() {
        return alias_node_js_1.AliasNode.create(this.#jsonPath.toOperationNode(), (0, operation_node_source_js_1.isOperationNodeSource)(this.#alias) ? this.#alias.toOperationNode() : identifier_node_js_1.IdentifierNode.create(this.#alias));
      }
    };
    exports.AliasedJSONPathBuilder = AliasedJSONPathBuilder2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/tuple-node.js
var require_tuple_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/tuple-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TupleNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.TupleNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "TupleNode";
      },
      create(values) {
        return (0, object_utils_js_1.freeze)({
          kind: "TupleNode",
          values: (0, object_utils_js_1.freeze)(values)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/expression/expression-builder.js
var require_expression_builder = __commonJS({
  "node_modules/kysely/dist/cjs/expression/expression-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.expressionBuilder = exports.createExpressionBuilder = void 0;
    var select_query_builder_js_1 = require_select_query_builder();
    var select_query_node_js_1 = require_select_query_node();
    var table_parser_js_1 = require_table_parser();
    var with_schema_plugin_js_1 = require_with_schema_plugin();
    var query_id_js_1 = require_query_id();
    var function_module_js_1 = require_function_module();
    var reference_parser_js_1 = require_reference_parser();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var parens_node_js_1 = require_parens_node();
    var expression_wrapper_js_1 = require_expression_wrapper();
    var operator_node_js_1 = require_operator_node();
    var unary_operation_parser_js_1 = require_unary_operation_parser();
    var value_parser_js_1 = require_value_parser();
    var noop_query_executor_js_1 = require_noop_query_executor();
    var case_builder_js_1 = require_case_builder();
    var case_node_js_1 = require_case_node();
    var object_utils_js_1 = require_object_utils();
    var json_path_builder_js_1 = require_json_path_builder();
    var binary_operation_node_js_1 = require_binary_operation_node();
    var and_node_js_1 = require_and_node();
    var select_parser_js_1 = require_select_parser();
    var tuple_node_js_1 = require_tuple_node();
    function createExpressionBuilder2(executor = noop_query_executor_js_1.NOOP_QUERY_EXECUTOR) {
      function binary(lhs, op, rhs) {
        return new expression_wrapper_js_1.ExpressionWrapper((0, binary_operation_parser_js_1.parseValueBinaryOperation)(lhs, op, rhs));
      }
      function unary(op, expr) {
        return new expression_wrapper_js_1.ExpressionWrapper((0, unary_operation_parser_js_1.parseUnaryOperation)(op, expr));
      }
      const eb = Object.assign(binary, {
        fn: void 0,
        eb: void 0,
        selectFrom(table) {
          return (0, select_query_builder_js_1.createSelectQueryBuilder)({
            queryId: (0, query_id_js_1.createQueryId)(),
            executor,
            queryNode: select_query_node_js_1.SelectQueryNode.createFrom((0, table_parser_js_1.parseTableExpressionOrList)(table))
          });
        },
        selectNoFrom(selection) {
          return (0, select_query_builder_js_1.createSelectQueryBuilder)({
            queryId: (0, query_id_js_1.createQueryId)(),
            executor,
            queryNode: select_query_node_js_1.SelectQueryNode.cloneWithSelections(select_query_node_js_1.SelectQueryNode.create(), (0, select_parser_js_1.parseSelectArg)(selection))
          });
        },
        case(reference) {
          return new case_builder_js_1.CaseBuilder({
            node: case_node_js_1.CaseNode.create((0, object_utils_js_1.isUndefined)(reference) ? void 0 : (0, reference_parser_js_1.parseReferenceExpression)(reference))
          });
        },
        ref(reference, op) {
          if ((0, object_utils_js_1.isUndefined)(op)) {
            return new expression_wrapper_js_1.ExpressionWrapper((0, reference_parser_js_1.parseStringReference)(reference));
          }
          return new json_path_builder_js_1.JSONPathBuilder((0, reference_parser_js_1.parseJSONReference)(reference, op));
        },
        val(value) {
          return new expression_wrapper_js_1.ExpressionWrapper((0, value_parser_js_1.parseValueExpressionOrList)(value));
        },
        refTuple(...values) {
          return new expression_wrapper_js_1.ExpressionWrapper(tuple_node_js_1.TupleNode.create(values.map(reference_parser_js_1.parseReferenceExpression)));
        },
        tuple(...values) {
          return new expression_wrapper_js_1.ExpressionWrapper(tuple_node_js_1.TupleNode.create(values.map(value_parser_js_1.parseValueExpression)));
        },
        lit(value) {
          return new expression_wrapper_js_1.ExpressionWrapper((0, value_parser_js_1.parseSafeImmediateValue)(value));
        },
        // @deprecated
        cmpr(lhs, op, rhs) {
          return new expression_wrapper_js_1.ExpressionWrapper((0, binary_operation_parser_js_1.parseValueBinaryOperation)(lhs, op, rhs));
        },
        // @deprecated
        bxp(lhs, op, rhs) {
          return new expression_wrapper_js_1.ExpressionWrapper((0, binary_operation_parser_js_1.parseValueBinaryOperation)(lhs, op, rhs));
        },
        unary,
        not(expr) {
          return unary("not", expr);
        },
        exists(expr) {
          return unary("exists", expr);
        },
        neg(expr) {
          return unary("-", expr);
        },
        between(expr, start, end) {
          return new expression_wrapper_js_1.ExpressionWrapper(binary_operation_node_js_1.BinaryOperationNode.create((0, reference_parser_js_1.parseReferenceExpression)(expr), operator_node_js_1.OperatorNode.create("between"), and_node_js_1.AndNode.create((0, value_parser_js_1.parseValueExpression)(start), (0, value_parser_js_1.parseValueExpression)(end))));
        },
        betweenSymmetric(expr, start, end) {
          return new expression_wrapper_js_1.ExpressionWrapper(binary_operation_node_js_1.BinaryOperationNode.create((0, reference_parser_js_1.parseReferenceExpression)(expr), operator_node_js_1.OperatorNode.create("between symmetric"), and_node_js_1.AndNode.create((0, value_parser_js_1.parseValueExpression)(start), (0, value_parser_js_1.parseValueExpression)(end))));
        },
        and(exprs) {
          if ((0, object_utils_js_1.isReadonlyArray)(exprs)) {
            return new expression_wrapper_js_1.ExpressionWrapper((0, binary_operation_parser_js_1.parseFilterList)(exprs, "and"));
          }
          return new expression_wrapper_js_1.ExpressionWrapper((0, binary_operation_parser_js_1.parseFilterObject)(exprs, "and"));
        },
        or(exprs) {
          if ((0, object_utils_js_1.isReadonlyArray)(exprs)) {
            return new expression_wrapper_js_1.ExpressionWrapper((0, binary_operation_parser_js_1.parseFilterList)(exprs, "or"));
          }
          return new expression_wrapper_js_1.ExpressionWrapper((0, binary_operation_parser_js_1.parseFilterObject)(exprs, "or"));
        },
        parens(...args) {
          const node = (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args);
          if (parens_node_js_1.ParensNode.is(node)) {
            return new expression_wrapper_js_1.ExpressionWrapper(node);
          } else {
            return new expression_wrapper_js_1.ExpressionWrapper(parens_node_js_1.ParensNode.create(node));
          }
        },
        withSchema(schema) {
          return createExpressionBuilder2(executor.withPluginAtFront(new with_schema_plugin_js_1.WithSchemaPlugin(schema)));
        }
      });
      eb.fn = (0, function_module_js_1.createFunctionModule)();
      eb.eb = eb;
      return eb;
    }
    exports.createExpressionBuilder = createExpressionBuilder2;
    function expressionBuilder2(_) {
      return createExpressionBuilder2();
    }
    exports.expressionBuilder = expressionBuilder2;
  }
});

// node_modules/kysely/dist/cjs/parser/expression-parser.js
var require_expression_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/expression-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isExpressionOrFactory = exports.parseAliasedExpression = exports.parseExpression = void 0;
    var expression_js_1 = require_expression();
    var operation_node_source_js_1 = require_operation_node_source();
    var expression_builder_js_1 = require_expression_builder();
    var object_utils_js_1 = require_object_utils();
    function parseExpression2(exp) {
      if ((0, operation_node_source_js_1.isOperationNodeSource)(exp)) {
        return exp.toOperationNode();
      } else if ((0, object_utils_js_1.isFunction)(exp)) {
        return exp((0, expression_builder_js_1.expressionBuilder)()).toOperationNode();
      }
      throw new Error(`invalid expression: ${JSON.stringify(exp)}`);
    }
    exports.parseExpression = parseExpression2;
    function parseAliasedExpression2(exp) {
      if ((0, operation_node_source_js_1.isOperationNodeSource)(exp)) {
        return exp.toOperationNode();
      } else if ((0, object_utils_js_1.isFunction)(exp)) {
        return exp((0, expression_builder_js_1.expressionBuilder)()).toOperationNode();
      }
      throw new Error(`invalid aliased expression: ${JSON.stringify(exp)}`);
    }
    exports.parseAliasedExpression = parseAliasedExpression2;
    function isExpressionOrFactory2(obj) {
      return (0, expression_js_1.isExpression)(obj) || (0, expression_js_1.isAliasedExpression)(obj) || (0, object_utils_js_1.isFunction)(obj);
    }
    exports.isExpressionOrFactory = isExpressionOrFactory2;
  }
});

// node_modules/kysely/dist/cjs/parser/table-parser.js
var require_table_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/table-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTable = exports.parseAliasedTable = exports.parseTableExpression = exports.parseTableExpressionOrList = void 0;
    var object_utils_js_1 = require_object_utils();
    var alias_node_js_1 = require_alias_node();
    var table_node_js_1 = require_table_node();
    var expression_parser_js_1 = require_expression_parser();
    var identifier_node_js_1 = require_identifier_node();
    function parseTableExpressionOrList2(table) {
      if ((0, object_utils_js_1.isReadonlyArray)(table)) {
        return table.map((it) => parseTableExpression2(it));
      } else {
        return [parseTableExpression2(table)];
      }
    }
    exports.parseTableExpressionOrList = parseTableExpressionOrList2;
    function parseTableExpression2(table) {
      if ((0, object_utils_js_1.isString)(table)) {
        return parseAliasedTable2(table);
      } else {
        return (0, expression_parser_js_1.parseAliasedExpression)(table);
      }
    }
    exports.parseTableExpression = parseTableExpression2;
    function parseAliasedTable2(from) {
      const ALIAS_SEPARATOR = " as ";
      if (from.includes(ALIAS_SEPARATOR)) {
        const [table, alias] = from.split(ALIAS_SEPARATOR).map(trim4);
        return alias_node_js_1.AliasNode.create(parseTable2(table), identifier_node_js_1.IdentifierNode.create(alias));
      } else {
        return parseTable2(from);
      }
    }
    exports.parseAliasedTable = parseAliasedTable2;
    function parseTable2(from) {
      const SCHEMA_SEPARATOR = ".";
      if (from.includes(SCHEMA_SEPARATOR)) {
        const [schema, table] = from.split(SCHEMA_SEPARATOR).map(trim4);
        return table_node_js_1.TableNode.createWithSchema(schema, table);
      } else {
        return table_node_js_1.TableNode.create(from);
      }
    }
    exports.parseTable = parseTable2;
    function trim4(str) {
      return str.trim();
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/add-column-node.js
var require_add_column_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/add-column-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AddColumnNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.AddColumnNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "AddColumnNode";
      },
      create(column) {
        return (0, object_utils_js_1.freeze)({
          kind: "AddColumnNode",
          column
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/column-definition-node.js
var require_column_definition_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/column-definition-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ColumnDefinitionNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var column_node_js_1 = require_column_node();
    exports.ColumnDefinitionNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ColumnDefinitionNode";
      },
      create(column, dataType) {
        return (0, object_utils_js_1.freeze)({
          kind: "ColumnDefinitionNode",
          column: column_node_js_1.ColumnNode.create(column),
          dataType
        });
      },
      cloneWithFrontModifier(node, modifier) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          frontModifiers: node.frontModifiers ? (0, object_utils_js_1.freeze)([...node.frontModifiers, modifier]) : [modifier]
        });
      },
      cloneWithEndModifier(node, modifier) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          endModifiers: node.endModifiers ? (0, object_utils_js_1.freeze)([...node.endModifiers, modifier]) : [modifier]
        });
      },
      cloneWith(node, props) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          ...props
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/drop-column-node.js
var require_drop_column_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/drop-column-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropColumnNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var column_node_js_1 = require_column_node();
    exports.DropColumnNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DropColumnNode";
      },
      create(column) {
        return (0, object_utils_js_1.freeze)({
          kind: "DropColumnNode",
          column: column_node_js_1.ColumnNode.create(column)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/rename-column-node.js
var require_rename_column_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/rename-column-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RenameColumnNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var column_node_js_1 = require_column_node();
    exports.RenameColumnNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "RenameColumnNode";
      },
      create(column, newColumn) {
        return (0, object_utils_js_1.freeze)({
          kind: "RenameColumnNode",
          column: column_node_js_1.ColumnNode.create(column),
          renameTo: column_node_js_1.ColumnNode.create(newColumn)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/check-constraint-node.js
var require_check_constraint_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/check-constraint-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CheckConstraintNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var identifier_node_js_1 = require_identifier_node();
    exports.CheckConstraintNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "CheckConstraintNode";
      },
      create(expression, constraintName) {
        return (0, object_utils_js_1.freeze)({
          kind: "CheckConstraintNode",
          expression,
          name: constraintName ? identifier_node_js_1.IdentifierNode.create(constraintName) : void 0
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/references-node.js
var require_references_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/references-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReferencesNode = exports.ON_MODIFY_FOREIGN_ACTIONS = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ON_MODIFY_FOREIGN_ACTIONS = [
      "no action",
      "restrict",
      "cascade",
      "set null",
      "set default"
    ];
    exports.ReferencesNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ReferencesNode";
      },
      create(table, columns) {
        return (0, object_utils_js_1.freeze)({
          kind: "ReferencesNode",
          table,
          columns: (0, object_utils_js_1.freeze)([...columns])
        });
      },
      cloneWithOnDelete(references, onDelete) {
        return (0, object_utils_js_1.freeze)({
          ...references,
          onDelete
        });
      },
      cloneWithOnUpdate(references, onUpdate) {
        return (0, object_utils_js_1.freeze)({
          ...references,
          onUpdate
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/default-value-parser.js
var require_default_value_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/default-value-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseDefaultValueExpression = void 0;
    var operation_node_source_js_1 = require_operation_node_source();
    var value_node_js_1 = require_value_node();
    function parseDefaultValueExpression2(value) {
      return (0, operation_node_source_js_1.isOperationNodeSource)(value) ? value.toOperationNode() : value_node_js_1.ValueNode.createImmediate(value);
    }
    exports.parseDefaultValueExpression = parseDefaultValueExpression2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/generated-node.js
var require_generated_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/generated-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GeneratedNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.GeneratedNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "GeneratedNode";
      },
      create(params) {
        return (0, object_utils_js_1.freeze)({
          kind: "GeneratedNode",
          ...params
        });
      },
      createWithExpression(expression) {
        return (0, object_utils_js_1.freeze)({
          kind: "GeneratedNode",
          always: true,
          expression
        });
      },
      cloneWith(node, params) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          ...params
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/default-value-node.js
var require_default_value_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/default-value-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultValueNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.DefaultValueNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DefaultValueNode";
      },
      create(defaultValue) {
        return (0, object_utils_js_1.freeze)({
          kind: "DefaultValueNode",
          defaultValue
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/on-modify-action-parser.js
var require_on_modify_action_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/on-modify-action-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseOnModifyForeignAction = void 0;
    var references_node_js_1 = require_references_node();
    function parseOnModifyForeignAction2(action) {
      if (references_node_js_1.ON_MODIFY_FOREIGN_ACTIONS.includes(action)) {
        return action;
      }
      throw new Error(`invalid OnModifyForeignAction ${action}`);
    }
    exports.parseOnModifyForeignAction = parseOnModifyForeignAction2;
  }
});

// node_modules/kysely/dist/cjs/schema/column-definition-builder.js
var require_column_definition_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/column-definition-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ColumnDefinitionBuilder = void 0;
    var check_constraint_node_js_1 = require_check_constraint_node();
    var references_node_js_1 = require_references_node();
    var select_all_node_js_1 = require_select_all_node();
    var reference_parser_js_1 = require_reference_parser();
    var prevent_await_js_1 = require_prevent_await();
    var column_definition_node_js_1 = require_column_definition_node();
    var default_value_parser_js_1 = require_default_value_parser();
    var generated_node_js_1 = require_generated_node();
    var default_value_node_js_1 = require_default_value_node();
    var on_modify_action_parser_js_1 = require_on_modify_action_parser();
    var ColumnDefinitionBuilder2 = class {
      #node;
      constructor(node) {
        this.#node = node;
      }
      /**
       * Adds `auto_increment` or `autoincrement` to the column definition
       * depending on the dialect.
       *
       * Some dialects like PostgreSQL don't support this. On PostgreSQL
       * you can use the `serial` or `bigserial` data type instead.
       */
      autoIncrement() {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, { autoIncrement: true }));
      }
      /**
       * Makes the column the primary key.
       *
       * If you want to specify a composite primary key use the
       * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
       */
      primaryKey() {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, { primaryKey: true }));
      }
      /**
       * Adds a foreign key constraint for the column.
       *
       * If your database engine doesn't support foreign key constraints in the
       * column definition (like MySQL 5) you need to call the table level
       * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
       *
       * ### Examples
       *
       * ```ts
       * col.references('person.id')
       * ```
       */
      references(ref) {
        const references = (0, reference_parser_js_1.parseStringReference)(ref);
        if (!references.table || select_all_node_js_1.SelectAllNode.is(references.column)) {
          throw new Error(`invalid call references('${ref}'). The reference must have format table.column or schema.table.column`);
        }
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, {
          references: references_node_js_1.ReferencesNode.create(references.table, [
            references.column
          ])
        }));
      }
      /**
       * Adds an `on delete` constraint for the foreign key column.
       *
       * If your database engine doesn't support foreign key constraints in the
       * column definition (like MySQL 5) you need to call the table level
       * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
       *
       * ### Examples
       *
       * ```ts
       * col.references('person.id').onDelete('cascade')
       * ```
       */
      onDelete(onDelete) {
        if (!this.#node.references) {
          throw new Error("on delete constraint can only be added for foreign keys");
        }
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, {
          references: references_node_js_1.ReferencesNode.cloneWithOnDelete(this.#node.references, (0, on_modify_action_parser_js_1.parseOnModifyForeignAction)(onDelete))
        }));
      }
      /**
       * Adds an `on update` constraint for the foreign key column.
       *
       * ### Examples
       *
       * ```ts
       * col.references('person.id').onUpdate('cascade')
       * ```
       */
      onUpdate(onUpdate) {
        if (!this.#node.references) {
          throw new Error("on update constraint can only be added for foreign keys");
        }
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, {
          references: references_node_js_1.ReferencesNode.cloneWithOnUpdate(this.#node.references, (0, on_modify_action_parser_js_1.parseOnModifyForeignAction)(onUpdate))
        }));
      }
      /**
       * Adds a unique constraint for the column.
       */
      unique() {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, { unique: true }));
      }
      /**
       * Adds a `not null` constraint for the column.
       */
      notNull() {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, { notNull: true }));
      }
      /**
       * Adds a `unsigned` modifier for the column.
       *
       * This only works on some dialects like MySQL.
       */
      unsigned() {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, { unsigned: true }));
      }
      /**
       * Adds a default value constraint for the column.
       *
       * ### Examples
       *
       * ```ts
       * db.schema
       *   .createTable('pet')
       *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
       *   .execute()
       * ```
       *
       * Values passed to `defaultTo` are interpreted as value literals by default. You can define
       * an arbitrary SQL expression using the {@link sql} template tag:
       *
       * ```ts
       * import { sql } from 'kysely'
       *
       * db.schema
       *   .createTable('pet')
       *   .addColumn(
       *     'number_of_legs',
       *     'integer',
       *     (col) => col.defaultTo(sql`any SQL here`)
       *   )
       *   .execute()
       * ```
       */
      defaultTo(value) {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, {
          defaultTo: default_value_node_js_1.DefaultValueNode.create((0, default_value_parser_js_1.parseDefaultValueExpression)(value))
        }));
      }
      /**
       * Adds a check constraint for the column.
       *
       * ### Examples
       *
       * ```ts
       * import { sql } from 'kysely'
       *
       * db.schema
       *   .createTable('pet')
       *   .addColumn('number_of_legs', 'integer', (col) =>
       *     col.check(sql`number_of_legs < 5`)
       *   )
       *   .execute()
       * ```
       */
      check(expression) {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, {
          check: check_constraint_node_js_1.CheckConstraintNode.create(expression.toOperationNode())
        }));
      }
      /**
       * Makes the column a generated column using a `generated always as` statement.
       *
       * ### Examples
       *
       * ```ts
       * import { sql } from 'kysely'
       *
       * db.schema
       *   .createTable('person')
       *   .addColumn('full_name', 'varchar(255)',
       *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
       *   )
       *   .execute()
       * ```
       */
      generatedAlwaysAs(expression) {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, {
          generated: generated_node_js_1.GeneratedNode.createWithExpression(expression.toOperationNode())
        }));
      }
      /**
       * Adds the `generated always as identity` specifier on supported dialects.
       */
      generatedAlwaysAsIdentity() {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, {
          generated: generated_node_js_1.GeneratedNode.create({ identity: true, always: true })
        }));
      }
      /**
       * Adds the `generated by default as identity` specifier on supported dialects.
       */
      generatedByDefaultAsIdentity() {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, {
          generated: generated_node_js_1.GeneratedNode.create({ identity: true, byDefault: true })
        }));
      }
      /**
       * Makes a generated column stored instead of virtual. This method can only
       * be used with {@link generatedAlwaysAs}
       *
       * ### Examples
       *
       * ```ts
       * db.schema
       *   .createTable('person')
       *   .addColumn('full_name', 'varchar(255)', (col) => col
       *     .generatedAlwaysAs("concat(first_name, ' ', last_name)")
       *     .stored()
       *   )
       *   .execute()
       * ```
       */
      stored() {
        if (!this.#node.generated) {
          throw new Error("stored() can only be called after generatedAlwaysAs");
        }
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWith(this.#node, {
          generated: generated_node_js_1.GeneratedNode.cloneWith(this.#node.generated, {
            stored: true
          })
        }));
      }
      /**
       * This can be used to add any additional SQL right after the column's data type.
       *
       * ### Examples
       *
       * ```ts
       * db.schema.createTable('person')
       *  .addColumn('id', 'integer', col => col.primaryKey())
       *  .addColumn('first_name', 'varchar(36)', col => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull())
       *  .execute()
       * ```
       *
       * The generated SQL (MySQL):
       *
       * ```sql
       * create table `person` (
       *   `id` integer primary key,
       *   `first_name` varchar(36) collate utf8mb4_general_ci not null
       * )
       * ```
       */
      modifyFront(modifier) {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWithFrontModifier(this.#node, modifier.toOperationNode()));
      }
      /**
       * This can be used to add any additional SQL to the end of the column definition.
       *
       * ### Examples
       *
       * ```ts
       * db.schema.createTable('person')
       *  .addColumn('id', 'integer', col => col.primaryKey())
       *  .addColumn('age', 'integer', col => col.unsigned().notNull().modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`))
       *  .execute()
       * ```
       *
       * The generated SQL (MySQL):
       *
       * ```sql
       * create table `person` (
       *   `id` integer primary key,
       *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
       * )
       * ```
       */
      modifyEnd(modifier) {
        return new ColumnDefinitionBuilder2(column_definition_node_js_1.ColumnDefinitionNode.cloneWithEndModifier(this.#node, modifier.toOperationNode()));
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#node;
      }
    };
    exports.ColumnDefinitionBuilder = ColumnDefinitionBuilder2;
    (0, prevent_await_js_1.preventAwait)(ColumnDefinitionBuilder2, "don't await ColumnDefinitionBuilder instances directly.");
  }
});

// node_modules/kysely/dist/cjs/operation-node/modify-column-node.js
var require_modify_column_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/modify-column-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModifyColumnNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ModifyColumnNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ModifyColumnNode";
      },
      create(column) {
        return (0, object_utils_js_1.freeze)({
          kind: "ModifyColumnNode",
          column
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/data-type-node.js
var require_data_type_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/data-type-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataTypeNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.DataTypeNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DataTypeNode";
      },
      create(dataType) {
        return (0, object_utils_js_1.freeze)({
          kind: "DataTypeNode",
          dataType
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/parser/data-type-parser.js
var require_data_type_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/data-type-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseDataTypeExpression = void 0;
    var data_type_node_js_1 = require_data_type_node();
    var operation_node_source_js_1 = require_operation_node_source();
    function parseDataTypeExpression2(dataType) {
      return (0, operation_node_source_js_1.isOperationNodeSource)(dataType) ? dataType.toOperationNode() : data_type_node_js_1.DataTypeNode.create(dataType);
    }
    exports.parseDataTypeExpression = parseDataTypeExpression2;
  }
});

// node_modules/kysely/dist/cjs/operation-node/foreign-key-constraint-node.js
var require_foreign_key_constraint_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/foreign-key-constraint-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ForeignKeyConstraintNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var identifier_node_js_1 = require_identifier_node();
    var references_node_js_1 = require_references_node();
    exports.ForeignKeyConstraintNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ForeignKeyConstraintNode";
      },
      create(sourceColumns, targetTable, targetColumns, constraintName) {
        return (0, object_utils_js_1.freeze)({
          kind: "ForeignKeyConstraintNode",
          columns: sourceColumns,
          references: references_node_js_1.ReferencesNode.create(targetTable, targetColumns),
          name: constraintName ? identifier_node_js_1.IdentifierNode.create(constraintName) : void 0
        });
      },
      cloneWith(node, props) {
        return (0, object_utils_js_1.freeze)({
          ...node,
          ...props
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/schema/foreign-key-constraint-builder.js
var require_foreign_key_constraint_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/foreign-key-constraint-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ForeignKeyConstraintBuilder = void 0;
    var foreign_key_constraint_node_js_1 = require_foreign_key_constraint_node();
    var on_modify_action_parser_js_1 = require_on_modify_action_parser();
    var prevent_await_js_1 = require_prevent_await();
    var ForeignKeyConstraintBuilder2 = class {
      #node;
      constructor(node) {
        this.#node = node;
      }
      onDelete(onDelete) {
        return new ForeignKeyConstraintBuilder2(foreign_key_constraint_node_js_1.ForeignKeyConstraintNode.cloneWith(this.#node, {
          onDelete: (0, on_modify_action_parser_js_1.parseOnModifyForeignAction)(onDelete)
        }));
      }
      onUpdate(onUpdate) {
        return new ForeignKeyConstraintBuilder2(foreign_key_constraint_node_js_1.ForeignKeyConstraintNode.cloneWith(this.#node, {
          onUpdate: (0, on_modify_action_parser_js_1.parseOnModifyForeignAction)(onUpdate)
        }));
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#node;
      }
    };
    exports.ForeignKeyConstraintBuilder = ForeignKeyConstraintBuilder2;
    (0, prevent_await_js_1.preventAwait)(ForeignKeyConstraintBuilder2, "don't await ForeignKeyConstraintBuilder instances directly.");
  }
});

// node_modules/kysely/dist/cjs/operation-node/add-constraint-node.js
var require_add_constraint_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/add-constraint-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AddConstraintNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.AddConstraintNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "AddConstraintNode";
      },
      create(constraint) {
        return (0, object_utils_js_1.freeze)({
          kind: "AddConstraintNode",
          constraint
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/unique-constraint-node.js
var require_unique_constraint_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/unique-constraint-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UniqueConstraintNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var column_node_js_1 = require_column_node();
    var identifier_node_js_1 = require_identifier_node();
    exports.UniqueConstraintNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "UniqueConstraintNode";
      },
      create(columns, constraintName) {
        return (0, object_utils_js_1.freeze)({
          kind: "UniqueConstraintNode",
          columns: (0, object_utils_js_1.freeze)(columns.map(column_node_js_1.ColumnNode.create)),
          name: constraintName ? identifier_node_js_1.IdentifierNode.create(constraintName) : void 0
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/drop-constraint-node.js
var require_drop_constraint_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/drop-constraint-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropConstraintNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var identifier_node_js_1 = require_identifier_node();
    exports.DropConstraintNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DropConstraintNode";
      },
      create(constraintName) {
        return (0, object_utils_js_1.freeze)({
          kind: "DropConstraintNode",
          constraintName: identifier_node_js_1.IdentifierNode.create(constraintName)
        });
      },
      cloneWith(dropConstraint, props) {
        return (0, object_utils_js_1.freeze)({
          ...dropConstraint,
          ...props
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/alter-column-node.js
var require_alter_column_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/alter-column-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlterColumnNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var column_node_js_1 = require_column_node();
    exports.AlterColumnNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "AlterColumnNode";
      },
      create(column, prop, value) {
        return (0, object_utils_js_1.freeze)({
          kind: "AlterColumnNode",
          column: column_node_js_1.ColumnNode.create(column),
          [prop]: value
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/schema/alter-column-builder.js
var require_alter_column_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/alter-column-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlteredColumnBuilder = exports.AlterColumnBuilder = void 0;
    var alter_column_node_js_1 = require_alter_column_node();
    var data_type_parser_js_1 = require_data_type_parser();
    var default_value_parser_js_1 = require_default_value_parser();
    var AlterColumnBuilder2 = class {
      #column;
      constructor(column) {
        this.#column = column;
      }
      setDataType(dataType) {
        return new AlteredColumnBuilder2(alter_column_node_js_1.AlterColumnNode.create(this.#column, "dataType", (0, data_type_parser_js_1.parseDataTypeExpression)(dataType)));
      }
      setDefault(value) {
        return new AlteredColumnBuilder2(alter_column_node_js_1.AlterColumnNode.create(this.#column, "setDefault", (0, default_value_parser_js_1.parseDefaultValueExpression)(value)));
      }
      dropDefault() {
        return new AlteredColumnBuilder2(alter_column_node_js_1.AlterColumnNode.create(this.#column, "dropDefault", true));
      }
      setNotNull() {
        return new AlteredColumnBuilder2(alter_column_node_js_1.AlterColumnNode.create(this.#column, "setNotNull", true));
      }
      dropNotNull() {
        return new AlteredColumnBuilder2(alter_column_node_js_1.AlterColumnNode.create(this.#column, "dropNotNull", true));
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
    };
    exports.AlterColumnBuilder = AlterColumnBuilder2;
    var AlteredColumnBuilder2 = class {
      #alterColumnNode;
      constructor(alterColumnNode) {
        this.#alterColumnNode = alterColumnNode;
      }
      toOperationNode() {
        return this.#alterColumnNode;
      }
    };
    exports.AlteredColumnBuilder = AlteredColumnBuilder2;
  }
});

// node_modules/kysely/dist/cjs/schema/alter-table-executor.js
var require_alter_table_executor = __commonJS({
  "node_modules/kysely/dist/cjs/schema/alter-table-executor.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlterTableExecutor = void 0;
    var object_utils_js_1 = require_object_utils();
    var prevent_await_js_1 = require_prevent_await();
    var AlterTableExecutor2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.AlterTableExecutor = AlterTableExecutor2;
    (0, prevent_await_js_1.preventAwait)(AlterTableExecutor2, "don't await AlterTableExecutor instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/schema/alter-table-add-foreign-key-constraint-builder.js
var require_alter_table_add_foreign_key_constraint_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/alter-table-add-foreign-key-constraint-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlterTableAddForeignKeyConstraintBuilder = void 0;
    var add_constraint_node_js_1 = require_add_constraint_node();
    var alter_table_node_js_1 = require_alter_table_node();
    var object_utils_js_1 = require_object_utils();
    var prevent_await_js_1 = require_prevent_await();
    var AlterTableAddForeignKeyConstraintBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      onDelete(onDelete) {
        return new AlterTableAddForeignKeyConstraintBuilder2({
          ...this.#props,
          constraintBuilder: this.#props.constraintBuilder.onDelete(onDelete)
        });
      }
      onUpdate(onUpdate) {
        return new AlterTableAddForeignKeyConstraintBuilder2({
          ...this.#props,
          constraintBuilder: this.#props.constraintBuilder.onUpdate(onUpdate)
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
          addConstraint: add_constraint_node_js_1.AddConstraintNode.create(this.#props.constraintBuilder.toOperationNode())
        }), this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.AlterTableAddForeignKeyConstraintBuilder = AlterTableAddForeignKeyConstraintBuilder2;
    (0, prevent_await_js_1.preventAwait)(AlterTableAddForeignKeyConstraintBuilder2, "don't await AlterTableAddForeignKeyConstraintBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/schema/alter-table-drop-constraint-builder.js
var require_alter_table_drop_constraint_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/alter-table-drop-constraint-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlterTableDropConstraintBuilder = void 0;
    var alter_table_node_js_1 = require_alter_table_node();
    var drop_constraint_node_js_1 = require_drop_constraint_node();
    var object_utils_js_1 = require_object_utils();
    var prevent_await_js_1 = require_prevent_await();
    var AlterTableDropConstraintBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      ifExists() {
        return new AlterTableDropConstraintBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
            dropConstraint: drop_constraint_node_js_1.DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
              ifExists: true
            })
          })
        });
      }
      cascade() {
        return new AlterTableDropConstraintBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
            dropConstraint: drop_constraint_node_js_1.DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
              modifier: "cascade"
            })
          })
        });
      }
      restrict() {
        return new AlterTableDropConstraintBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
            dropConstraint: drop_constraint_node_js_1.DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
              modifier: "restrict"
            })
          })
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.AlterTableDropConstraintBuilder = AlterTableDropConstraintBuilder2;
    (0, prevent_await_js_1.preventAwait)(AlterTableDropConstraintBuilder2, "don't await AlterTableDropConstraintBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/operation-node/primary-constraint-node.js
var require_primary_constraint_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/primary-constraint-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrimaryConstraintNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var column_node_js_1 = require_column_node();
    var identifier_node_js_1 = require_identifier_node();
    exports.PrimaryConstraintNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "PrimaryKeyConstraintNode";
      },
      create(columns, constraintName) {
        return (0, object_utils_js_1.freeze)({
          kind: "PrimaryKeyConstraintNode",
          columns: (0, object_utils_js_1.freeze)(columns.map(column_node_js_1.ColumnNode.create)),
          name: constraintName ? identifier_node_js_1.IdentifierNode.create(constraintName) : void 0
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/schema/alter-table-builder.js
var require_alter_table_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/alter-table-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlterTableColumnAlteringBuilder = exports.AlterTableBuilder = void 0;
    var add_column_node_js_1 = require_add_column_node();
    var alter_table_node_js_1 = require_alter_table_node();
    var column_definition_node_js_1 = require_column_definition_node();
    var drop_column_node_js_1 = require_drop_column_node();
    var identifier_node_js_1 = require_identifier_node();
    var rename_column_node_js_1 = require_rename_column_node();
    var object_utils_js_1 = require_object_utils();
    var prevent_await_js_1 = require_prevent_await();
    var column_definition_builder_js_1 = require_column_definition_builder();
    var modify_column_node_js_1 = require_modify_column_node();
    var data_type_parser_js_1 = require_data_type_parser();
    var foreign_key_constraint_builder_js_1 = require_foreign_key_constraint_builder();
    var add_constraint_node_js_1 = require_add_constraint_node();
    var unique_constraint_node_js_1 = require_unique_constraint_node();
    var check_constraint_node_js_1 = require_check_constraint_node();
    var foreign_key_constraint_node_js_1 = require_foreign_key_constraint_node();
    var column_node_js_1 = require_column_node();
    var table_parser_js_1 = require_table_parser();
    var drop_constraint_node_js_1 = require_drop_constraint_node();
    var alter_column_builder_js_1 = require_alter_column_builder();
    var alter_table_executor_js_1 = require_alter_table_executor();
    var alter_table_add_foreign_key_constraint_builder_js_1 = require_alter_table_add_foreign_key_constraint_builder();
    var alter_table_drop_constraint_builder_js_1 = require_alter_table_drop_constraint_builder();
    var primary_constraint_node_js_1 = require_primary_constraint_node();
    var AlterTableBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      renameTo(newTableName) {
        return new alter_table_executor_js_1.AlterTableExecutor({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
            renameTo: (0, table_parser_js_1.parseTable)(newTableName)
          })
        });
      }
      setSchema(newSchema) {
        return new alter_table_executor_js_1.AlterTableExecutor({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
            setSchema: identifier_node_js_1.IdentifierNode.create(newSchema)
          })
        });
      }
      alterColumn(column, alteration) {
        const builder = alteration(new alter_column_builder_js_1.AlterColumnBuilder(column));
        return new AlterTableColumnAlteringBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
        });
      }
      dropColumn(column) {
        return new AlterTableColumnAlteringBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithColumnAlteration(this.#props.node, drop_column_node_js_1.DropColumnNode.create(column))
        });
      }
      renameColumn(column, newColumn) {
        return new AlterTableColumnAlteringBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithColumnAlteration(this.#props.node, rename_column_node_js_1.RenameColumnNode.create(column, newColumn))
        });
      }
      addColumn(columnName, dataType, build = object_utils_js_1.noop) {
        const builder = build(new column_definition_builder_js_1.ColumnDefinitionBuilder(column_definition_node_js_1.ColumnDefinitionNode.create(columnName, (0, data_type_parser_js_1.parseDataTypeExpression)(dataType))));
        return new AlterTableColumnAlteringBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithColumnAlteration(this.#props.node, add_column_node_js_1.AddColumnNode.create(builder.toOperationNode()))
        });
      }
      modifyColumn(columnName, dataType, build = object_utils_js_1.noop) {
        const builder = build(new column_definition_builder_js_1.ColumnDefinitionBuilder(column_definition_node_js_1.ColumnDefinitionNode.create(columnName, (0, data_type_parser_js_1.parseDataTypeExpression)(dataType))));
        return new AlterTableColumnAlteringBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithColumnAlteration(this.#props.node, modify_column_node_js_1.ModifyColumnNode.create(builder.toOperationNode()))
        });
      }
      /**
       * See {@link CreateTableBuilder.addUniqueConstraint}
       */
      addUniqueConstraint(constraintName, columns) {
        return new alter_table_executor_js_1.AlterTableExecutor({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
            addConstraint: add_constraint_node_js_1.AddConstraintNode.create(unique_constraint_node_js_1.UniqueConstraintNode.create(columns, constraintName))
          })
        });
      }
      /**
       * See {@link CreateTableBuilder.addCheckConstraint}
       */
      addCheckConstraint(constraintName, checkExpression) {
        return new alter_table_executor_js_1.AlterTableExecutor({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
            addConstraint: add_constraint_node_js_1.AddConstraintNode.create(check_constraint_node_js_1.CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName))
          })
        });
      }
      /**
       * See {@link CreateTableBuilder.addForeignKeyConstraint}
       *
       * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
       * the constraint builder and doesn't take a callback as the last argument. This
       * is because you can only add one column per `ALTER TABLE` query.
       */
      addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns) {
        return new alter_table_add_foreign_key_constraint_builder_js_1.AlterTableAddForeignKeyConstraintBuilder({
          ...this.#props,
          constraintBuilder: new foreign_key_constraint_builder_js_1.ForeignKeyConstraintBuilder(foreign_key_constraint_node_js_1.ForeignKeyConstraintNode.create(columns.map(column_node_js_1.ColumnNode.create), (0, table_parser_js_1.parseTable)(targetTable), targetColumns.map(column_node_js_1.ColumnNode.create), constraintName))
        });
      }
      /**
       * See {@link CreateTableBuilder.addPrimaryKeyConstraint}
       */
      addPrimaryKeyConstraint(constraintName, columns) {
        return new alter_table_executor_js_1.AlterTableExecutor({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
            addConstraint: add_constraint_node_js_1.AddConstraintNode.create(primary_constraint_node_js_1.PrimaryConstraintNode.create(columns, constraintName))
          })
        });
      }
      dropConstraint(constraintName) {
        return new alter_table_drop_constraint_builder_js_1.AlterTableDropConstraintBuilder({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
            dropConstraint: drop_constraint_node_js_1.DropConstraintNode.create(constraintName)
          })
        });
      }
      /**
       * Calls the given function passing `this` as the only argument.
       *
       * See {@link CreateTableBuilder.$call}
       */
      $call(func) {
        return func(this);
      }
    };
    exports.AlterTableBuilder = AlterTableBuilder2;
    var AlterTableColumnAlteringBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      alterColumn(column, alteration) {
        const builder = alteration(new alter_column_builder_js_1.AlterColumnBuilder(column));
        return new AlterTableColumnAlteringBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
        });
      }
      dropColumn(column) {
        return new AlterTableColumnAlteringBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithColumnAlteration(this.#props.node, drop_column_node_js_1.DropColumnNode.create(column))
        });
      }
      renameColumn(column, newColumn) {
        return new AlterTableColumnAlteringBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithColumnAlteration(this.#props.node, rename_column_node_js_1.RenameColumnNode.create(column, newColumn))
        });
      }
      addColumn(columnName, dataType, build = object_utils_js_1.noop) {
        const builder = build(new column_definition_builder_js_1.ColumnDefinitionBuilder(column_definition_node_js_1.ColumnDefinitionNode.create(columnName, (0, data_type_parser_js_1.parseDataTypeExpression)(dataType))));
        return new AlterTableColumnAlteringBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithColumnAlteration(this.#props.node, add_column_node_js_1.AddColumnNode.create(builder.toOperationNode()))
        });
      }
      modifyColumn(columnName, dataType, build = object_utils_js_1.noop) {
        const builder = build(new column_definition_builder_js_1.ColumnDefinitionBuilder(column_definition_node_js_1.ColumnDefinitionNode.create(columnName, (0, data_type_parser_js_1.parseDataTypeExpression)(dataType))));
        return new AlterTableColumnAlteringBuilder2({
          ...this.#props,
          node: alter_table_node_js_1.AlterTableNode.cloneWithColumnAlteration(this.#props.node, modify_column_node_js_1.ModifyColumnNode.create(builder.toOperationNode()))
        });
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.AlterTableColumnAlteringBuilder = AlterTableColumnAlteringBuilder2;
    (0, prevent_await_js_1.preventAwait)(AlterTableBuilder2, "don't await AlterTableBuilder instances");
    (0, prevent_await_js_1.preventAwait)(alter_column_builder_js_1.AlterColumnBuilder, "don't await AlterColumnBuilder instances");
    (0, prevent_await_js_1.preventAwait)(AlterTableColumnAlteringBuilder2, "don't await AlterTableColumnAlteringBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/plugin/immediate-value/immediate-value-transformer.js
var require_immediate_value_transformer = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/immediate-value/immediate-value-transformer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImmediateValueTransformer = void 0;
    var operation_node_transformer_js_1 = require_operation_node_transformer();
    var ImmediateValueTransformer2 = class extends operation_node_transformer_js_1.OperationNodeTransformer {
      transformValue(node) {
        return {
          ...super.transformValue(node),
          immediate: true
        };
      }
    };
    exports.ImmediateValueTransformer = ImmediateValueTransformer2;
  }
});

// node_modules/kysely/dist/cjs/schema/create-index-builder.js
var require_create_index_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/create-index-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateIndexBuilder = void 0;
    var create_index_node_js_1 = require_create_index_node();
    var raw_node_js_1 = require_raw_node();
    var reference_parser_js_1 = require_reference_parser();
    var table_parser_js_1 = require_table_parser();
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var binary_operation_parser_js_1 = require_binary_operation_parser();
    var query_node_js_1 = require_query_node();
    var immediate_value_transformer_js_1 = require_immediate_value_transformer();
    var CreateIndexBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      /**
       * Adds the "if not exists" modifier.
       *
       * If the index already exists, no error is thrown if this method has been called.
       */
      ifNotExists() {
        return new CreateIndexBuilder2({
          ...this.#props,
          node: create_index_node_js_1.CreateIndexNode.cloneWith(this.#props.node, {
            ifNotExists: true
          })
        });
      }
      /**
       * Makes the index unique.
       */
      unique() {
        return new CreateIndexBuilder2({
          ...this.#props,
          node: create_index_node_js_1.CreateIndexNode.cloneWith(this.#props.node, {
            unique: true
          })
        });
      }
      /**
       * Specifies the table for the index.
       */
      on(table) {
        return new CreateIndexBuilder2({
          ...this.#props,
          node: create_index_node_js_1.CreateIndexNode.cloneWith(this.#props.node, {
            table: (0, table_parser_js_1.parseTable)(table)
          })
        });
      }
      /**
       * Adds a column to the index.
       *
       * Also see {@link columns} for adding multiple columns at once or {@link expression}
       * for specifying an arbitrary expression.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *         .createIndex('person_first_name_and_age_index')
       *         .on('person')
       *         .column('first_name')
       *         .column('age desc')
       *         .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
       * ```
       */
      column(column) {
        return new CreateIndexBuilder2({
          ...this.#props,
          node: create_index_node_js_1.CreateIndexNode.cloneWithColumns(this.#props.node, [
            (0, reference_parser_js_1.parseOrderedColumnName)(column)
          ])
        });
      }
      /**
       * Specifies a list of columns for the index.
       *
       * Also see {@link column} for adding a single column or {@link expression} for
       * specifying an arbitrary expression.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *         .createIndex('person_first_name_and_age_index')
       *         .on('person')
       *         .columns(['first_name', 'age desc'])
       *         .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
       * ```
       */
      columns(columns) {
        return new CreateIndexBuilder2({
          ...this.#props,
          node: create_index_node_js_1.CreateIndexNode.cloneWithColumns(this.#props.node, columns.map(reference_parser_js_1.parseOrderedColumnName))
        });
      }
      /**
       * Specifies an arbitrary expression for the index.
       *
       * ### Examples
       *
       * ```ts
       * import { sql } from 'kysely'
       *
       * await db.schema
       *   .createIndex('person_first_name_index')
       *   .on('person')
       *   .expression(sql`first_name COLLATE "fi_FI"`)
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * create index "person_first_name_index" on "person" (first_name COLLATE "fi_FI")
       * ```
       */
      expression(expression) {
        return new CreateIndexBuilder2({
          ...this.#props,
          node: create_index_node_js_1.CreateIndexNode.cloneWithColumns(this.#props.node, [
            expression.toOperationNode()
          ])
        });
      }
      using(indexType) {
        return new CreateIndexBuilder2({
          ...this.#props,
          node: create_index_node_js_1.CreateIndexNode.cloneWith(this.#props.node, {
            using: raw_node_js_1.RawNode.createWithSql(indexType)
          })
        });
      }
      where(...args) {
        const transformer = new immediate_value_transformer_js_1.ImmediateValueTransformer();
        return new CreateIndexBuilder2({
          ...this.#props,
          node: query_node_js_1.QueryNode.cloneWithWhere(this.#props.node, transformer.transformNode((0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args)))
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.CreateIndexBuilder = CreateIndexBuilder2;
    (0, prevent_await_js_1.preventAwait)(CreateIndexBuilder2, "don't await CreateIndexBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/schema/create-schema-builder.js
var require_create_schema_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/create-schema-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateSchemaBuilder = void 0;
    var create_schema_node_js_1 = require_create_schema_node();
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var CreateSchemaBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      ifNotExists() {
        return new CreateSchemaBuilder2({
          ...this.#props,
          node: create_schema_node_js_1.CreateSchemaNode.cloneWith(this.#props.node, { ifNotExists: true })
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.CreateSchemaBuilder = CreateSchemaBuilder2;
    (0, prevent_await_js_1.preventAwait)(CreateSchemaBuilder2, "don't await CreateSchemaBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/parser/on-commit-action-parse.js
var require_on_commit_action_parse = __commonJS({
  "node_modules/kysely/dist/cjs/parser/on-commit-action-parse.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseOnCommitAction = void 0;
    var create_table_node_js_1 = require_create_table_node();
    function parseOnCommitAction2(action) {
      if (create_table_node_js_1.ON_COMMIT_ACTIONS.includes(action)) {
        return action;
      }
      throw new Error(`invalid OnCommitAction ${action}`);
    }
    exports.parseOnCommitAction = parseOnCommitAction2;
  }
});

// node_modules/kysely/dist/cjs/schema/create-table-builder.js
var require_create_table_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/create-table-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateTableBuilder = void 0;
    var column_definition_node_js_1 = require_column_definition_node();
    var create_table_node_js_1 = require_create_table_node();
    var prevent_await_js_1 = require_prevent_await();
    var column_definition_builder_js_1 = require_column_definition_builder();
    var object_utils_js_1 = require_object_utils();
    var foreign_key_constraint_node_js_1 = require_foreign_key_constraint_node();
    var column_node_js_1 = require_column_node();
    var foreign_key_constraint_builder_js_1 = require_foreign_key_constraint_builder();
    var data_type_parser_js_1 = require_data_type_parser();
    var primary_constraint_node_js_1 = require_primary_constraint_node();
    var unique_constraint_node_js_1 = require_unique_constraint_node();
    var check_constraint_node_js_1 = require_check_constraint_node();
    var table_parser_js_1 = require_table_parser();
    var on_commit_action_parse_js_1 = require_on_commit_action_parse();
    var CreateTableBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      /**
       * Adds the "temporary" modifier.
       *
       * Use this to create a temporary table.
       */
      temporary() {
        return new CreateTableBuilder2({
          ...this.#props,
          node: create_table_node_js_1.CreateTableNode.cloneWith(this.#props.node, {
            temporary: true
          })
        });
      }
      /**
       * Adds an "on commit" statement.
       *
       * This can be used in conjunction with temporary tables on supported databases
       * like PostgreSQL.
       */
      onCommit(onCommit) {
        return new CreateTableBuilder2({
          ...this.#props,
          node: create_table_node_js_1.CreateTableNode.cloneWith(this.#props.node, {
            onCommit: (0, on_commit_action_parse_js_1.parseOnCommitAction)(onCommit)
          })
        });
      }
      /**
       * Adds the "if not exists" modifier.
       *
       * If the table already exists, no error is thrown if this method has been called.
       */
      ifNotExists() {
        return new CreateTableBuilder2({
          ...this.#props,
          node: create_table_node_js_1.CreateTableNode.cloneWith(this.#props.node, {
            ifNotExists: true
          })
        });
      }
      /**
       * Adds a column to the table.
       *
       * ### Examples
       *
       * ```ts
       * import { sql } from 'kysely'
       *
       * await db.schema
       *   .createTable('person')
       *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey()),
       *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
       *   .addColumn('last_name', 'varchar(255)')
       *   .addColumn('bank_balance', 'numeric(8, 2)')
       *   // You can specify any data type using the `sql` tag if the types
       *   // don't include it.
       *   .addColumn('data', sql`any_type_here`)
       *   .addColumn('parent_id', 'integer', (col) =>
       *     col.references('person.id').onDelete('cascade'))
       *   )
       * ```
       *
       * With this method, it's once again good to remember that Kysely just builds the
       * query and doesn't provide the same API for all databses. For example, some
       * databases like older MySQL don't support the `references` statement in the
       * column definition. Instead foreign key constraints need to be defined in the
       * `create table` query. See the next example:
       *
       * ```ts
       *   .addColumn('parent_id', 'integer')
       *   .addForeignKeyConstraint(
       *     'person_parent_id_fk', ['parent_id'], 'person', ['id'],
       *     (cb) => cb.onDelete('cascade')
       *   )
       * ```
       *
       * Another good example is that PostgreSQL doesn't support the `auto_increment`
       * keyword and you need to define an autoincrementing column for example using
       * `serial`:
       *
       * ```ts
       * await db.schema
       *   .createTable('person')
       *   .addColumn('id', 'serial', (col) => col.primaryKey()),
       * ```
       */
      addColumn(columnName, dataType, build = object_utils_js_1.noop) {
        const columnBuilder = build(new column_definition_builder_js_1.ColumnDefinitionBuilder(column_definition_node_js_1.ColumnDefinitionNode.create(columnName, (0, data_type_parser_js_1.parseDataTypeExpression)(dataType))));
        return new CreateTableBuilder2({
          ...this.#props,
          node: create_table_node_js_1.CreateTableNode.cloneWithColumn(this.#props.node, columnBuilder.toOperationNode())
        });
      }
      /**
       * Adds a primary key constraint for one or more columns.
       *
       * The constraint name can be anything you want, but it must be unique
       * across the whole database.
       *
       * ### Examples
       *
       * ```ts
       * addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
       * ```
       */
      addPrimaryKeyConstraint(constraintName, columns) {
        return new CreateTableBuilder2({
          ...this.#props,
          node: create_table_node_js_1.CreateTableNode.cloneWithConstraint(this.#props.node, primary_constraint_node_js_1.PrimaryConstraintNode.create(columns, constraintName))
        });
      }
      /**
       * Adds a unique constraint for one or more columns.
       *
       * The constraint name can be anything you want, but it must be unique
       * across the whole database.
       *
       * ### Examples
       *
       * ```ts
       * addUniqueConstraint('first_name_last_name_unique', ['first_name', 'last_name'])
       * ```
       */
      addUniqueConstraint(constraintName, columns) {
        return new CreateTableBuilder2({
          ...this.#props,
          node: create_table_node_js_1.CreateTableNode.cloneWithConstraint(this.#props.node, unique_constraint_node_js_1.UniqueConstraintNode.create(columns, constraintName))
        });
      }
      /**
       * Adds a check constraint.
       *
       * The constraint name can be anything you want, but it must be unique
       * across the whole database.
       *
       * ### Examples
       *
       * ```ts
       * import { sql } from 'kysely'
       *
       * addCheckConstraint('check_legs', sql`number_of_legs < 5`)
       * ```
       */
      addCheckConstraint(constraintName, checkExpression) {
        return new CreateTableBuilder2({
          ...this.#props,
          node: create_table_node_js_1.CreateTableNode.cloneWithConstraint(this.#props.node, check_constraint_node_js_1.CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName))
        });
      }
      /**
       * Adds a foreign key constraint.
       *
       * The constraint name can be anything you want, but it must be unique
       * across the whole database.
       *
       * ### Examples
       *
       * ```ts
       * addForeignKeyConstraint(
       *   'owner_id_foreign',
       *   ['owner_id'],
       *   'person',
       *   ['id'],
       * )
       * ```
       *
       * Add constraint for multiple columns:
       *
       * ```ts
       * addForeignKeyConstraint(
       *   'owner_id_foreign',
       *   ['owner_id1', 'owner_id2'],
       *   'person',
       *   ['id1', 'id2'],
       *   (cb) => cb.onDelete('cascade')
       * )
       * ```
       */
      addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = object_utils_js_1.noop) {
        const builder = build(new foreign_key_constraint_builder_js_1.ForeignKeyConstraintBuilder(foreign_key_constraint_node_js_1.ForeignKeyConstraintNode.create(columns.map(column_node_js_1.ColumnNode.create), (0, table_parser_js_1.parseTable)(targetTable), targetColumns.map(column_node_js_1.ColumnNode.create), constraintName)));
        return new CreateTableBuilder2({
          ...this.#props,
          node: create_table_node_js_1.CreateTableNode.cloneWithConstraint(this.#props.node, builder.toOperationNode())
        });
      }
      /**
       * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
       *
       * Also see {@link temporary}.
       *
       * ### Examples
       *
       * ```ts
       * db.schema.createTable('person')
       *   .modifyFront(sql`global temporary`)
       *   .addColumn('id', 'integer', col => col.primaryKey())
       *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
       *   .addColumn('last_name', 'varchar(64), col => col.notNull())
       *   .execute()
       * ```
       *
       * The generated SQL (Postgres):
       *
       * ```sql
       * create global temporary table "person" (
       *   "id" integer primary key,
       *   "first_name" varchar(64) not null,
       *   "last_name" varchar(64) not null
       * )
       * ```
       */
      modifyFront(modifier) {
        return new CreateTableBuilder2({
          ...this.#props,
          node: create_table_node_js_1.CreateTableNode.cloneWithFrontModifier(this.#props.node, modifier.toOperationNode())
        });
      }
      /**
       * This can be used to add any additional SQL to the end of the query.
       *
       * Also see {@link onCommit}.
       *
       * ### Examples
       *
       * ```ts
       * db.schema.createTable('person')
       *   .addColumn('id', 'integer', col => col => primaryKey())
       *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
       *   .addColumn('last_name', 'varchar(64), col => col.notNull())
       *   .modifyEnd(sql`collate utf8_unicode_ci`)
       *   .execute()
       * ```
       *
       * The generated SQL (MySQL):
       *
       * ```sql
       * create table `person` (
       *   `id` integer primary key,
       *   `first_name` varchar(64) not null,
       *   `last_name` varchar(64) not null
       * ) collate utf8_unicode_ci
       * ```
       */
      modifyEnd(modifier) {
        return new CreateTableBuilder2({
          ...this.#props,
          node: create_table_node_js_1.CreateTableNode.cloneWithEndModifier(this.#props.node, modifier.toOperationNode())
        });
      }
      /**
       * Calls the given function passing `this` as the only argument.
       *
       * ### Examples
       *
       * ```ts
       * db.schema
       *   .createTable('test')
       *   .$call((builder) => builder.addColumn('id', 'integer'))
       *   .execute()
       * ```
       *
       * ```ts
       * const addDefaultColumns = <T extends string, C extends string = never>(
       *   builder: CreateTableBuilder<T, C>
       * ) => {
       *   return builder
       *     .addColumn('id', 'integer', (col) => col.notNull())
       *     .addColumn('created_at', 'date', (col) =>
       *       col.notNull().defaultTo(sql`now()`)
       *     )
       *     .addColumn('updated_at', 'date', (col) =>
       *       col.notNull().defaultTo(sql`now()`)
       *     )
       * }
       *
       * db.schema
       *   .createTable('test')
       *   .$call(addDefaultColumns)
       *   .execute()
       * ```
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.CreateTableBuilder = CreateTableBuilder2;
    (0, prevent_await_js_1.preventAwait)(CreateTableBuilder2, "don't await CreateTableBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/schema/drop-index-builder.js
var require_drop_index_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/drop-index-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropIndexBuilder = void 0;
    var drop_index_node_js_1 = require_drop_index_node();
    var prevent_await_js_1 = require_prevent_await();
    var table_parser_js_1 = require_table_parser();
    var object_utils_js_1 = require_object_utils();
    var DropIndexBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      /**
       * Specifies the table the index was created for. This is not needed
       * in all dialects.
       */
      on(table) {
        return new DropIndexBuilder2({
          ...this.#props,
          node: drop_index_node_js_1.DropIndexNode.cloneWith(this.#props.node, {
            table: (0, table_parser_js_1.parseTable)(table)
          })
        });
      }
      ifExists() {
        return new DropIndexBuilder2({
          ...this.#props,
          node: drop_index_node_js_1.DropIndexNode.cloneWith(this.#props.node, {
            ifExists: true
          })
        });
      }
      cascade() {
        return new DropIndexBuilder2({
          ...this.#props,
          node: drop_index_node_js_1.DropIndexNode.cloneWith(this.#props.node, {
            cascade: true
          })
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.DropIndexBuilder = DropIndexBuilder2;
    (0, prevent_await_js_1.preventAwait)(DropIndexBuilder2, "don't await DropIndexBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/schema/drop-schema-builder.js
var require_drop_schema_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/drop-schema-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropSchemaBuilder = void 0;
    var drop_schema_node_js_1 = require_drop_schema_node();
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var DropSchemaBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      ifExists() {
        return new DropSchemaBuilder2({
          ...this.#props,
          node: drop_schema_node_js_1.DropSchemaNode.cloneWith(this.#props.node, {
            ifExists: true
          })
        });
      }
      cascade() {
        return new DropSchemaBuilder2({
          ...this.#props,
          node: drop_schema_node_js_1.DropSchemaNode.cloneWith(this.#props.node, {
            cascade: true
          })
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.DropSchemaBuilder = DropSchemaBuilder2;
    (0, prevent_await_js_1.preventAwait)(DropSchemaBuilder2, "don't await DropSchemaBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/schema/drop-table-builder.js
var require_drop_table_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/drop-table-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropTableBuilder = void 0;
    var drop_table_node_js_1 = require_drop_table_node();
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var DropTableBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      ifExists() {
        return new DropTableBuilder2({
          ...this.#props,
          node: drop_table_node_js_1.DropTableNode.cloneWith(this.#props.node, {
            ifExists: true
          })
        });
      }
      cascade() {
        return new DropTableBuilder2({
          ...this.#props,
          node: drop_table_node_js_1.DropTableNode.cloneWith(this.#props.node, {
            cascade: true
          })
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.DropTableBuilder = DropTableBuilder2;
    (0, prevent_await_js_1.preventAwait)(DropTableBuilder2, "don't await DropTableBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/operation-node/create-view-node.js
var require_create_view_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/create-view-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateViewNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var schemable_identifier_node_js_1 = require_schemable_identifier_node();
    exports.CreateViewNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "CreateViewNode";
      },
      create(name) {
        return (0, object_utils_js_1.freeze)({
          kind: "CreateViewNode",
          name: schemable_identifier_node_js_1.SchemableIdentifierNode.create(name)
        });
      },
      cloneWith(createView, params) {
        return (0, object_utils_js_1.freeze)({
          ...createView,
          ...params
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/plugin/immediate-value/immediate-value-plugin.js
var require_immediate_value_plugin = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/immediate-value/immediate-value-plugin.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImmediateValuePlugin = void 0;
    var immediate_value_transformer_js_1 = require_immediate_value_transformer();
    var ImmediateValuePlugin2 = class {
      #transformer = new immediate_value_transformer_js_1.ImmediateValueTransformer();
      transformQuery(args) {
        return this.#transformer.transformNode(args.node);
      }
      transformResult(args) {
        return Promise.resolve(args.result);
      }
    };
    exports.ImmediateValuePlugin = ImmediateValuePlugin2;
  }
});

// node_modules/kysely/dist/cjs/schema/create-view-builder.js
var require_create_view_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/create-view-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateViewBuilder = void 0;
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var create_view_node_js_1 = require_create_view_node();
    var reference_parser_js_1 = require_reference_parser();
    var immediate_value_plugin_js_1 = require_immediate_value_plugin();
    var CreateViewBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      /**
       * Adds the "temporary" modifier.
       *
       * Use this to create a temporary view.
       */
      temporary() {
        return new CreateViewBuilder2({
          ...this.#props,
          node: create_view_node_js_1.CreateViewNode.cloneWith(this.#props.node, {
            temporary: true
          })
        });
      }
      materialized() {
        return new CreateViewBuilder2({
          ...this.#props,
          node: create_view_node_js_1.CreateViewNode.cloneWith(this.#props.node, {
            materialized: true
          })
        });
      }
      /**
       * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
       */
      ifNotExists() {
        return new CreateViewBuilder2({
          ...this.#props,
          node: create_view_node_js_1.CreateViewNode.cloneWith(this.#props.node, {
            ifNotExists: true
          })
        });
      }
      orReplace() {
        return new CreateViewBuilder2({
          ...this.#props,
          node: create_view_node_js_1.CreateViewNode.cloneWith(this.#props.node, {
            orReplace: true
          })
        });
      }
      columns(columns) {
        return new CreateViewBuilder2({
          ...this.#props,
          node: create_view_node_js_1.CreateViewNode.cloneWith(this.#props.node, {
            columns: columns.map(reference_parser_js_1.parseColumnName)
          })
        });
      }
      /**
       * Sets the select query or a `values` statement that creates the view.
       *
       * WARNING!
       * Some dialects don't support parameterized queries in DDL statements and therefore
       * the query or raw {@link sql } expression passed here is interpolated into a single
       * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
       * into the query or raw expression passed to this method!
       */
      as(query) {
        const queryNode = query.withPlugin(new immediate_value_plugin_js_1.ImmediateValuePlugin()).toOperationNode();
        return new CreateViewBuilder2({
          ...this.#props,
          node: create_view_node_js_1.CreateViewNode.cloneWith(this.#props.node, {
            as: queryNode
          })
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.CreateViewBuilder = CreateViewBuilder2;
    (0, prevent_await_js_1.preventAwait)(CreateViewBuilder2, "don't await CreateViewBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/operation-node/drop-view-node.js
var require_drop_view_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/drop-view-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropViewNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var schemable_identifier_node_js_1 = require_schemable_identifier_node();
    exports.DropViewNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DropViewNode";
      },
      create(name) {
        return (0, object_utils_js_1.freeze)({
          kind: "DropViewNode",
          name: schemable_identifier_node_js_1.SchemableIdentifierNode.create(name)
        });
      },
      cloneWith(dropView, params) {
        return (0, object_utils_js_1.freeze)({
          ...dropView,
          ...params
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/schema/drop-view-builder.js
var require_drop_view_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/drop-view-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropViewBuilder = void 0;
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var drop_view_node_js_1 = require_drop_view_node();
    var DropViewBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      materialized() {
        return new DropViewBuilder2({
          ...this.#props,
          node: drop_view_node_js_1.DropViewNode.cloneWith(this.#props.node, {
            materialized: true
          })
        });
      }
      ifExists() {
        return new DropViewBuilder2({
          ...this.#props,
          node: drop_view_node_js_1.DropViewNode.cloneWith(this.#props.node, {
            ifExists: true
          })
        });
      }
      cascade() {
        return new DropViewBuilder2({
          ...this.#props,
          node: drop_view_node_js_1.DropViewNode.cloneWith(this.#props.node, {
            cascade: true
          })
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.DropViewBuilder = DropViewBuilder2;
    (0, prevent_await_js_1.preventAwait)(DropViewBuilder2, "don't await DropViewBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/operation-node/create-type-node.js
var require_create_type_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/create-type-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateTypeNode = void 0;
    var object_utils_js_1 = require_object_utils();
    var value_list_node_js_1 = require_value_list_node();
    var value_node_js_1 = require_value_node();
    exports.CreateTypeNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "CreateTypeNode";
      },
      create(name) {
        return (0, object_utils_js_1.freeze)({
          kind: "CreateTypeNode",
          name
        });
      },
      cloneWithEnum(createType, values) {
        return (0, object_utils_js_1.freeze)({
          ...createType,
          enum: value_list_node_js_1.ValueListNode.create(values.map((value) => value_node_js_1.ValueNode.createImmediate(value)))
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/schema/create-type-builder.js
var require_create_type_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/create-type-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateTypeBuilder = void 0;
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var create_type_node_js_1 = require_create_type_node();
    var CreateTypeBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      /**
       * Creates an anum type.
       *
       * ### Examples
       *
       * ```ts
       * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
       * ```
       */
      asEnum(values) {
        return new CreateTypeBuilder2({
          ...this.#props,
          node: create_type_node_js_1.CreateTypeNode.cloneWithEnum(this.#props.node, values)
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.CreateTypeBuilder = CreateTypeBuilder2;
    (0, prevent_await_js_1.preventAwait)(CreateTypeBuilder2, "don't await CreateTypeBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/operation-node/drop-type-node.js
var require_drop_type_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/drop-type-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropTypeNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.DropTypeNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "DropTypeNode";
      },
      create(name) {
        return (0, object_utils_js_1.freeze)({
          kind: "DropTypeNode",
          name
        });
      },
      cloneWith(dropType, params) {
        return (0, object_utils_js_1.freeze)({
          ...dropType,
          ...params
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/schema/drop-type-builder.js
var require_drop_type_builder = __commonJS({
  "node_modules/kysely/dist/cjs/schema/drop-type-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropTypeBuilder = void 0;
    var drop_type_node_js_1 = require_drop_type_node();
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var DropTypeBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      ifExists() {
        return new DropTypeBuilder2({
          ...this.#props,
          node: drop_type_node_js_1.DropTypeNode.cloneWith(this.#props.node, {
            ifExists: true
          })
        });
      }
      /**
       * Simply calls the provided function passing `this` as the only argument. `$call` returns
       * what the provided function returns.
       */
      $call(func) {
        return func(this);
      }
      toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
      }
      compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
      }
      async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
      }
    };
    exports.DropTypeBuilder = DropTypeBuilder2;
    (0, prevent_await_js_1.preventAwait)(DropTypeBuilder2, "don't await DropTypeBuilder instances directly. To execute the query you need to call `execute`");
  }
});

// node_modules/kysely/dist/cjs/parser/identifier-parser.js
var require_identifier_parser = __commonJS({
  "node_modules/kysely/dist/cjs/parser/identifier-parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseSchemableIdentifier = void 0;
    var schemable_identifier_node_js_1 = require_schemable_identifier_node();
    function parseSchemableIdentifier2(id) {
      const SCHEMA_SEPARATOR = ".";
      if (id.includes(SCHEMA_SEPARATOR)) {
        const parts = id.split(SCHEMA_SEPARATOR).map(trim4);
        if (parts.length === 2) {
          return schemable_identifier_node_js_1.SchemableIdentifierNode.createWithSchema(parts[0], parts[1]);
        } else {
          throw new Error(`invalid schemable identifier ${id}`);
        }
      } else {
        return schemable_identifier_node_js_1.SchemableIdentifierNode.create(id);
      }
    }
    exports.parseSchemableIdentifier = parseSchemableIdentifier2;
    function trim4(str) {
      return str.trim();
    }
  }
});

// node_modules/kysely/dist/cjs/schema/schema.js
var require_schema = __commonJS({
  "node_modules/kysely/dist/cjs/schema/schema.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SchemaModule = void 0;
    var alter_table_node_js_1 = require_alter_table_node();
    var create_index_node_js_1 = require_create_index_node();
    var create_schema_node_js_1 = require_create_schema_node();
    var create_table_node_js_1 = require_create_table_node();
    var drop_index_node_js_1 = require_drop_index_node();
    var drop_schema_node_js_1 = require_drop_schema_node();
    var drop_table_node_js_1 = require_drop_table_node();
    var table_parser_js_1 = require_table_parser();
    var alter_table_builder_js_1 = require_alter_table_builder();
    var create_index_builder_js_1 = require_create_index_builder();
    var create_schema_builder_js_1 = require_create_schema_builder();
    var create_table_builder_js_1 = require_create_table_builder();
    var drop_index_builder_js_1 = require_drop_index_builder();
    var drop_schema_builder_js_1 = require_drop_schema_builder();
    var drop_table_builder_js_1 = require_drop_table_builder();
    var query_id_js_1 = require_query_id();
    var with_schema_plugin_js_1 = require_with_schema_plugin();
    var create_view_builder_js_1 = require_create_view_builder();
    var create_view_node_js_1 = require_create_view_node();
    var drop_view_builder_js_1 = require_drop_view_builder();
    var drop_view_node_js_1 = require_drop_view_node();
    var create_type_builder_js_1 = require_create_type_builder();
    var drop_type_builder_js_1 = require_drop_type_builder();
    var create_type_node_js_1 = require_create_type_node();
    var drop_type_node_js_1 = require_drop_type_node();
    var identifier_parser_js_1 = require_identifier_parser();
    var SchemaModule2 = class {
      #executor;
      constructor(executor) {
        this.#executor = executor;
      }
      /**
       * Create a new table.
       *
       * ### Examples
       *
       * This example creates a new table with columns `id`, `first_name`,
       * `last_name` and `gender`:
       *
       * ```ts
       * await db.schema
       *   .createTable('person')
       *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
       *   .addColumn('first_name', 'varchar', col => col.notNull())
       *   .addColumn('last_name', 'varchar', col => col.notNull())
       *   .addColumn('gender', 'varchar')
       *   .execute()
       * ```
       *
       * This example creates a table with a foreign key. Not all database
       * engines support column-level foreign key constraint definitions.
       * For example if you are using MySQL 5.X see the next example after
       * this one.
       *
       * ```ts
       * await db.schema
       *   .createTable('pet')
       *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
       *   .addColumn('owner_id', 'integer', col => col
       *     .references('person.id')
       *     .onDelete('cascade')
       *   )
       *   .execute()
       * ```
       *
       * This example adds a foreign key constraint for a columns just
       * like the previous example, but using a table-level statement.
       * On MySQL 5.X you need to define foreign key constraints like
       * this:
       *
       * ```ts
       * await db.schema
       *   .createTable('pet')
       *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
       *   .addColumn('owner_id', 'integer')
       *   .addForeignKeyConstraint(
       *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
       *     (constraint) => constraint.onDelete('cascade')
       *   )
       *   .execute()
       * ```
       */
      createTable(table) {
        return new create_table_builder_js_1.CreateTableBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: create_table_node_js_1.CreateTableNode.create((0, table_parser_js_1.parseTable)(table))
        });
      }
      /**
       * Drop a table.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *   .dropTable('person')
       *   .execute()
       * ```
       */
      dropTable(table) {
        return new drop_table_builder_js_1.DropTableBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: drop_table_node_js_1.DropTableNode.create((0, table_parser_js_1.parseTable)(table))
        });
      }
      /**
       * Create a new index.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *   .createIndex('person_full_name_unique_index')
       *   .on('person')
       *   .columns(['first_name', 'last_name'])
       *   .execute()
       * ```
       */
      createIndex(indexName) {
        return new create_index_builder_js_1.CreateIndexBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: create_index_node_js_1.CreateIndexNode.create(indexName)
        });
      }
      /**
       * Drop an index.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *   .dropIndex('person_full_name_unique_index')
       *   .execute()
       * ```
       */
      dropIndex(indexName) {
        return new drop_index_builder_js_1.DropIndexBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: drop_index_node_js_1.DropIndexNode.create(indexName)
        });
      }
      /**
       * Create a new schema.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *   .createSchema('some_schema')
       *   .execute()
       * ```
       */
      createSchema(schema) {
        return new create_schema_builder_js_1.CreateSchemaBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: create_schema_node_js_1.CreateSchemaNode.create(schema)
        });
      }
      /**
       * Drop a schema.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *   .dropSchema('some_schema')
       *   .execute()
       * ```
       */
      dropSchema(schema) {
        return new drop_schema_builder_js_1.DropSchemaBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: drop_schema_node_js_1.DropSchemaNode.create(schema)
        });
      }
      /**
       * Alter a table.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *   .alterTable('person')
       *   .alterColumn('first_name', (ac) => ac.setDataType('text'))
       *   .execute()
       * ```
       */
      alterTable(table) {
        return new alter_table_builder_js_1.AlterTableBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: alter_table_node_js_1.AlterTableNode.create((0, table_parser_js_1.parseTable)(table))
        });
      }
      /**
       * Create a new view.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *   .createView('dogs')
       *   .orReplace()
       *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
       *   .execute()
       * ```
       */
      createView(viewName) {
        return new create_view_builder_js_1.CreateViewBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: create_view_node_js_1.CreateViewNode.create(viewName)
        });
      }
      /**
       * Drop a view.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *   .dropView('dogs')
       *   .ifExists()
       *   .execute()
       * ```
       */
      dropView(viewName) {
        return new drop_view_builder_js_1.DropViewBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: drop_view_node_js_1.DropViewNode.create(viewName)
        });
      }
      /**
       * Create a new type.
       *
       * Only some dialects like PostgreSQL have user-defined types.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *   .createType('species')
       *   .asEnum(['dog', 'cat', 'frog'])
       *   .execute()
       * ```
       */
      createType(typeName) {
        return new create_type_builder_js_1.CreateTypeBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: create_type_node_js_1.CreateTypeNode.create((0, identifier_parser_js_1.parseSchemableIdentifier)(typeName))
        });
      }
      /**
       * Drop a type.
       *
       * Only some dialects like PostgreSQL have user-defined types.
       *
       * ### Examples
       *
       * ```ts
       * await db.schema
       *   .dropType('species')
       *   .ifExists()
       *   .execute()
       * ```
       */
      dropType(typeName) {
        return new drop_type_builder_js_1.DropTypeBuilder({
          queryId: (0, query_id_js_1.createQueryId)(),
          executor: this.#executor,
          node: drop_type_node_js_1.DropTypeNode.create((0, identifier_parser_js_1.parseSchemableIdentifier)(typeName))
        });
      }
      /**
       * Returns a copy of this schema module with the given plugin installed.
       */
      withPlugin(plugin) {
        return new SchemaModule2(this.#executor.withPlugin(plugin));
      }
      /**
       * Returns a copy of this schema module  without any plugins.
       */
      withoutPlugins() {
        return new SchemaModule2(this.#executor.withoutPlugins());
      }
      /**
       * See {@link QueryCreator.withSchema}
       */
      withSchema(schema) {
        return new SchemaModule2(this.#executor.withPluginAtFront(new with_schema_plugin_js_1.WithSchemaPlugin(schema)));
      }
    };
    exports.SchemaModule = SchemaModule2;
  }
});

// node_modules/kysely/dist/cjs/dynamic/dynamic.js
var require_dynamic = __commonJS({
  "node_modules/kysely/dist/cjs/dynamic/dynamic.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DynamicModule = void 0;
    var dynamic_reference_builder_js_1 = require_dynamic_reference_builder();
    var DynamicModule2 = class {
      /**
       * Creates a dynamic reference to a column that is not know at compile time.
       *
       * Kysely is built in a way that by default you can't refer to tables or columns
       * that are not actually visible in the current query and context. This is all
       * done by typescript at compile time, which means that you need to know the
       * columns and tables at compile time. This is not always the case of course.
       *
       * This method is meant to be used in those cases where the column names
       * come from the user input or are not otherwise known at compile time.
       *
       * WARNING! Unlike values, column names are not escaped by the database engine
       * or Kysely and if you pass in unchecked column names using this method, you
       * create an SQL injection vulnerability. Always __always__ validate the user
       * input before passing it to this method.
       *
       * There are couple of examples below for some use cases, but you can pass
       * `ref` to other methods as well. If the types allow you to pass a `ref`
       * value to some place, it should work.
       *
       * ### Examples
       *
       * Filter by a column not know at compile time:
       *
       * ```ts
       * async function someQuery(filterColumn: string, filterValue: string) {
       *   const { ref } = db.dynamic
       *
       *   return await db
       *     .selectFrom('person')
       *     .selectAll()
       *     .where(ref(filterColumn), '=', filterValue)
       *     .execute()
       * }
       *
       * someQuery('first_name', 'Arnold')
       * someQuery('person.last_name', 'Aniston')
       * ```
       *
       * Order by a column not know at compile time:
       *
       * ```ts
       * async function someQuery(orderBy: string) {
       *   const { ref } = db.dynamic
       *
       *   return await db
       *     .selectFrom('person')
       *     .select('person.first_name as fn')
       *     .orderBy(ref(orderBy))
       *     .execute()
       * }
       *
       * someQuery('fn')
       * ```
       *
       * In this example we add selections dynamically:
       *
       * ```ts
       * const { ref } = db.dynamic
       *
       * // Some column name provided by the user. Value not known at compile time.
       * const columnFromUserInput = req.query.select;
       *
       * // A type that lists all possible values `columnFromUserInput` can have.
       * // You can use `keyof Person` if any column of an interface is allowed.
       * type PossibleColumns = 'last_name' | 'first_name' | 'birth_date'
       *
       * const [person] = await db.selectFrom('person')
       *   .select([
       *     ref<PossibleColumns>(columnFromUserInput),
       *     'id'
       *   ])
       *   .execute()
       *
       * // The resulting type contains all `PossibleColumns` as optional fields
       * // because we cannot know which field was actually selected before
       * // running the code.
       * const lastName: string | undefined = person.last_name
       * const firstName: string | undefined = person.first_name
       * const birthDate: string | undefined = person.birth_date
       *
       * // The result type also contains the compile time selection `id`.
       * person.id
       * ```
       */
      ref(reference) {
        return new dynamic_reference_builder_js_1.DynamicReferenceBuilder(reference);
      }
    };
    exports.DynamicModule = DynamicModule2;
  }
});

// node_modules/kysely/dist/cjs/driver/default-connection-provider.js
var require_default_connection_provider = __commonJS({
  "node_modules/kysely/dist/cjs/driver/default-connection-provider.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultConnectionProvider = void 0;
    var DefaultConnectionProvider2 = class {
      #driver;
      constructor(driver) {
        this.#driver = driver;
      }
      async provideConnection(consumer) {
        const connection = await this.#driver.acquireConnection();
        try {
          return await consumer(connection);
        } finally {
          await this.#driver.releaseConnection(connection);
        }
      }
    };
    exports.DefaultConnectionProvider = DefaultConnectionProvider2;
  }
});

// node_modules/kysely/dist/cjs/query-executor/default-query-executor.js
var require_default_query_executor = __commonJS({
  "node_modules/kysely/dist/cjs/query-executor/default-query-executor.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultQueryExecutor = void 0;
    var query_executor_base_js_1 = require_query_executor_base();
    var DefaultQueryExecutor2 = class extends query_executor_base_js_1.QueryExecutorBase {
      #compiler;
      #adapter;
      #connectionProvider;
      constructor(compiler, adapter, connectionProvider, plugins = []) {
        super(plugins);
        this.#compiler = compiler;
        this.#adapter = adapter;
        this.#connectionProvider = connectionProvider;
      }
      get adapter() {
        return this.#adapter;
      }
      compileQuery(node) {
        return this.#compiler.compileQuery(node);
      }
      provideConnection(consumer) {
        return this.#connectionProvider.provideConnection(consumer);
      }
      withPlugins(plugins) {
        return new DefaultQueryExecutor2(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, ...plugins]);
      }
      withPlugin(plugin) {
        return new DefaultQueryExecutor2(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, plugin]);
      }
      withPluginAtFront(plugin) {
        return new DefaultQueryExecutor2(this.#compiler, this.#adapter, this.#connectionProvider, [plugin, ...this.plugins]);
      }
      withConnectionProvider(connectionProvider) {
        return new DefaultQueryExecutor2(this.#compiler, this.#adapter, connectionProvider, [...this.plugins]);
      }
      withoutPlugins() {
        return new DefaultQueryExecutor2(this.#compiler, this.#adapter, this.#connectionProvider, []);
      }
    };
    exports.DefaultQueryExecutor = DefaultQueryExecutor2;
  }
});

// node_modules/kysely/dist/cjs/util/performance-now.js
var require_performance_now = __commonJS({
  "node_modules/kysely/dist/cjs/util/performance-now.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.performanceNow = void 0;
    var object_utils_js_1 = require_object_utils();
    function performanceNow2() {
      if (typeof performance !== "undefined" && (0, object_utils_js_1.isFunction)(performance.now)) {
        return performance.now();
      } else {
        return Date.now();
      }
    }
    exports.performanceNow = performanceNow2;
  }
});

// node_modules/kysely/dist/cjs/driver/runtime-driver.js
var require_runtime_driver = __commonJS({
  "node_modules/kysely/dist/cjs/driver/runtime-driver.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RuntimeDriver = void 0;
    var performance_now_js_1 = require_performance_now();
    var RuntimeDriver2 = class {
      #driver;
      #log;
      #initPromise;
      #initDone;
      #destroyPromise;
      #connections = /* @__PURE__ */ new WeakSet();
      constructor(driver, log) {
        this.#initDone = false;
        this.#driver = driver;
        this.#log = log;
      }
      async init() {
        if (this.#destroyPromise) {
          throw new Error("driver has already been destroyed");
        }
        if (!this.#initPromise) {
          this.#initPromise = this.#driver.init().then(() => {
            this.#initDone = true;
          }).catch((err) => {
            this.#initPromise = void 0;
            return Promise.reject(err);
          });
        }
        await this.#initPromise;
      }
      async acquireConnection() {
        if (this.#destroyPromise) {
          throw new Error("driver has already been destroyed");
        }
        if (!this.#initDone) {
          await this.init();
        }
        const connection = await this.#driver.acquireConnection();
        if (!this.#connections.has(connection)) {
          if (this.#needsLogging()) {
            this.#addLogging(connection);
          }
          this.#connections.add(connection);
        }
        return connection;
      }
      async releaseConnection(connection) {
        await this.#driver.releaseConnection(connection);
      }
      beginTransaction(connection, settings) {
        return this.#driver.beginTransaction(connection, settings);
      }
      commitTransaction(connection) {
        return this.#driver.commitTransaction(connection);
      }
      rollbackTransaction(connection) {
        return this.#driver.rollbackTransaction(connection);
      }
      async destroy() {
        if (!this.#initPromise) {
          return;
        }
        await this.#initPromise;
        if (!this.#destroyPromise) {
          this.#destroyPromise = this.#driver.destroy().catch((err) => {
            this.#destroyPromise = void 0;
            return Promise.reject(err);
          });
        }
        await this.#destroyPromise;
      }
      #needsLogging() {
        return this.#log.isLevelEnabled("query") || this.#log.isLevelEnabled("error");
      }
      // This method monkey patches the database connection's executeQuery method
      // by adding logging code around it. Monkey patching is not pretty, but it's
      // the best option in this case.
      #addLogging(connection) {
        const executeQuery = connection.executeQuery;
        connection.executeQuery = async (compiledQuery) => {
          const startTime = (0, performance_now_js_1.performanceNow)();
          try {
            return await executeQuery.call(connection, compiledQuery);
          } catch (error) {
            await this.#logError(error, compiledQuery, startTime);
            throw error;
          } finally {
            await this.#logQuery(compiledQuery, startTime);
          }
        };
      }
      async #logError(error, compiledQuery, startTime) {
        await this.#log.error(() => ({
          level: "error",
          error,
          query: compiledQuery,
          queryDurationMillis: this.#calculateDurationMillis(startTime)
        }));
      }
      async #logQuery(compiledQuery, startTime) {
        await this.#log.query(() => ({
          level: "query",
          query: compiledQuery,
          queryDurationMillis: this.#calculateDurationMillis(startTime)
        }));
      }
      #calculateDurationMillis(startTime) {
        return (0, performance_now_js_1.performanceNow)() - startTime;
      }
    };
    exports.RuntimeDriver = RuntimeDriver2;
  }
});

// node_modules/kysely/dist/cjs/driver/single-connection-provider.js
var require_single_connection_provider = __commonJS({
  "node_modules/kysely/dist/cjs/driver/single-connection-provider.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SingleConnectionProvider = void 0;
    var SingleConnectionProvider2 = class {
      #connection;
      #runningPromise;
      constructor(connection) {
        this.#connection = connection;
      }
      async provideConnection(consumer) {
        while (this.#runningPromise) {
          await this.#runningPromise;
        }
        const promise = this.#run(consumer);
        this.#runningPromise = promise.then(() => {
          this.#runningPromise = void 0;
        }).catch(() => {
          this.#runningPromise = void 0;
        });
        return promise;
      }
      // Run the runner in an async function to make sure it doesn't
      // throw synchronous errors.
      async #run(runner) {
        return await runner(this.#connection);
      }
    };
    exports.SingleConnectionProvider = SingleConnectionProvider2;
  }
});

// node_modules/kysely/dist/cjs/driver/driver.js
var require_driver = __commonJS({
  "node_modules/kysely/dist/cjs/driver/driver.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TRANSACTION_ISOLATION_LEVELS = void 0;
    exports.TRANSACTION_ISOLATION_LEVELS = [
      "read uncommitted",
      "read committed",
      "repeatable read",
      "serializable"
    ];
  }
});

// node_modules/kysely/dist/cjs/util/log.js
var require_log = __commonJS({
  "node_modules/kysely/dist/cjs/util/log.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Log = exports.LOG_LEVELS = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.LOG_LEVELS = (0, object_utils_js_1.freeze)(["query", "error"]);
    var Log2 = class {
      #levels;
      #logger;
      constructor(config) {
        if ((0, object_utils_js_1.isFunction)(config)) {
          this.#logger = config;
          this.#levels = (0, object_utils_js_1.freeze)({
            query: true,
            error: true
          });
        } else {
          this.#logger = defaultLogger2;
          this.#levels = (0, object_utils_js_1.freeze)({
            query: config.includes("query"),
            error: config.includes("error")
          });
        }
      }
      isLevelEnabled(level) {
        return this.#levels[level];
      }
      async query(getEvent) {
        if (this.#levels.query) {
          await this.#logger(getEvent());
        }
      }
      async error(getEvent) {
        if (this.#levels.error) {
          await this.#logger(getEvent());
        }
      }
    };
    exports.Log = Log2;
    function defaultLogger2(event) {
      if (event.level === "query") {
        console.log(`kysely:query: ${event.query.sql}`);
        console.log(`kysely:query: duration: ${event.queryDurationMillis.toFixed(1)}ms`);
      } else if (event.level === "error") {
        if (event.error instanceof Error) {
          console.error(`kysely:error: ${event.error.stack ?? event.error.message}`);
        } else {
          console.error(`kysely:error: ${event}`);
        }
      }
    }
  }
});

// node_modules/kysely/dist/cjs/util/compilable.js
var require_compilable = __commonJS({
  "node_modules/kysely/dist/cjs/util/compilable.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isCompilable = void 0;
    var object_utils_js_1 = require_object_utils();
    function isCompilable2(value) {
      return (0, object_utils_js_1.isObject)(value) && (0, object_utils_js_1.isFunction)(value.compile);
    }
    exports.isCompilable = isCompilable2;
  }
});

// node_modules/kysely/dist/cjs/kysely.js
var require_kysely = __commonJS({
  "node_modules/kysely/dist/cjs/kysely.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransactionBuilder = exports.ConnectionBuilder = exports.isKyselyProps = exports.Transaction = exports.Kysely = void 0;
    var schema_js_1 = require_schema();
    var dynamic_js_1 = require_dynamic();
    var default_connection_provider_js_1 = require_default_connection_provider();
    var query_creator_js_1 = require_query_creator();
    var default_query_executor_js_1 = require_default_query_executor();
    var object_utils_js_1 = require_object_utils();
    var runtime_driver_js_1 = require_runtime_driver();
    var single_connection_provider_js_1 = require_single_connection_provider();
    var driver_js_1 = require_driver();
    var prevent_await_js_1 = require_prevent_await();
    var function_module_js_1 = require_function_module();
    var log_js_1 = require_log();
    var query_id_js_1 = require_query_id();
    var compilable_js_1 = require_compilable();
    var case_builder_js_1 = require_case_builder();
    var case_node_js_1 = require_case_node();
    var expression_parser_js_1 = require_expression_parser();
    var with_schema_plugin_js_1 = require_with_schema_plugin();
    var Kysely2 = class extends query_creator_js_1.QueryCreator {
      #props;
      constructor(args) {
        let superProps;
        let props;
        if (isKyselyProps2(args)) {
          superProps = { executor: args.executor };
          props = { ...args };
        } else {
          const dialect = args.dialect;
          const driver = dialect.createDriver();
          const compiler = dialect.createQueryCompiler();
          const adapter = dialect.createAdapter();
          const log = new log_js_1.Log(args.log ?? []);
          const runtimeDriver = new runtime_driver_js_1.RuntimeDriver(driver, log);
          const connectionProvider = new default_connection_provider_js_1.DefaultConnectionProvider(runtimeDriver);
          const executor = new default_query_executor_js_1.DefaultQueryExecutor(compiler, adapter, connectionProvider, args.plugins ?? []);
          superProps = { executor };
          props = {
            config: args,
            executor,
            dialect,
            driver: runtimeDriver
          };
        }
        super(superProps);
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      /**
       * Returns the {@link SchemaModule} module for building database schema.
       */
      get schema() {
        return new schema_js_1.SchemaModule(this.#props.executor);
      }
      /**
       * Returns a the {@link DynamicModule} module.
       *
       * The {@link DynamicModule} module can be used to bypass strict typing and
       * passing in dynamic values for the queries.
       */
      get dynamic() {
        return new dynamic_js_1.DynamicModule();
      }
      /**
       * Returns a {@link DatabaseIntrospector | database introspector}.
       */
      get introspection() {
        return this.#props.dialect.createIntrospector(this.withoutPlugins());
      }
      case(value) {
        return new case_builder_js_1.CaseBuilder({
          node: case_node_js_1.CaseNode.create((0, object_utils_js_1.isUndefined)(value) ? void 0 : (0, expression_parser_js_1.parseExpression)(value))
        });
      }
      /**
       * Returns a {@link FunctionModule} that can be used to write type safe function
       * calls.
       *
       * ```ts
       * await db.selectFrom('person')
       *   .innerJoin('pet', 'pet.owner_id', 'person.id')
       *   .select((eb) => [
       *     'person.id',
       *     eb.fn.count('pet.id').as('pet_count')
       *   ])
       *   .groupBy('person.id')
       *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
       *   .execute()
       * ```
       *
       * The generated SQL (PostgreSQL):
       *
       * ```sql
       * select "person"."id", count("pet"."id") as "pet_count"
       * from "person"
       * inner join "pet" on "pet"."owner_id" = "person"."id"
       * group by "person"."id"
       * having count("pet"."id") > $1
       * ```
       */
      get fn() {
        return (0, function_module_js_1.createFunctionModule)();
      }
      /**
       * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
       *
       * The returned {@link TransactionBuilder} can be used to configure the transaction. The
       * {@link TransactionBuilder.execute} method can then be called to run the transaction.
       * {@link TransactionBuilder.execute} takes a function that is run inside the
       * transaction. If the function throws, the transaction is rolled back. Otherwise
       * the transaction is committed.
       *
       * The callback function passed to the {@link TransactionBuilder.execute | execute}
       * method gets the transaction object as its only argument. The transaction is
       * of type {@link Transaction} which inherits {@link Kysely}. Any query
       * started through the transaction object is executed inside the transaction.
       *
       * ### Examples
       *
       * <!-- siteExample("transactions", "Simple transaction", 10) -->
       *
       * This example inserts two rows in a transaction. If an error is thrown inside
       * the callback passed to the `execute` method, the transaction is rolled back.
       * Otherwise it's committed.
       *
       * ```ts
       * const catto = await db.transaction().execute(async (trx) => {
       *   const jennifer = await trx.insertInto('person')
       *     .values({
       *       first_name: 'Jennifer',
       *       last_name: 'Aniston',
       *       age: 40,
       *     })
       *     .returning('id')
       *     .executeTakeFirstOrThrow()
       *
       *   return await trx.insertInto('pet')
       *     .values({
       *       owner_id: jennifer.id,
       *       name: 'Catto',
       *       species: 'cat',
       *       is_favorite: false,
       *     })
       *     .returningAll()
       *     .executeTakeFirst()
       * })
       * ```
       *
       * Setting the isolation level:
       *
       * ```ts
       * await db
       *   .transaction()
       *   .setIsolationLevel('serializable')
       *   .execute(async (trx) => {
       *     await doStuff(trx)
       *   })
       * ```
       */
      transaction() {
        return new TransactionBuilder2({ ...this.#props });
      }
      /**
       * Provides a kysely instance bound to a single database connection.
       *
       * ### Examples
       *
       * ```ts
       * await db
       *   .connection()
       *   .execute(async (db) => {
       *     // `db` is an instance of `Kysely` that's bound to a single
       *     // database connection. All queries executed through `db` use
       *     // the same connection.
       *     await doStuff(db)
       *   })
       * ```
       */
      connection() {
        return new ConnectionBuilder2({ ...this.#props });
      }
      /**
       * Returns a copy of this Kysely instance with the given plugin installed.
       */
      withPlugin(plugin) {
        return new Kysely2({
          ...this.#props,
          executor: this.#props.executor.withPlugin(plugin)
        });
      }
      /**
       * Returns a copy of this Kysely instance without any plugins.
       */
      withoutPlugins() {
        return new Kysely2({
          ...this.#props,
          executor: this.#props.executor.withoutPlugins()
        });
      }
      /**
       * @override
       */
      withSchema(schema) {
        return new Kysely2({
          ...this.#props,
          executor: this.#props.executor.withPluginAtFront(new with_schema_plugin_js_1.WithSchemaPlugin(schema))
        });
      }
      /**
       * Returns a copy of this Kysely instance with tables added to its
       * database type.
       *
       * This method only modifies the types and doesn't affect any of the
       * executed queries in any way.
       *
       * ### Examples
       *
       * The following example adds and uses a temporary table:
       *
       * @example
       * ```ts
       * await db.schema
       *   .createTable('temp_table')
       *   .temporary()
       *   .addColumn('some_column', 'integer')
       *   .execute()
       *
       * const tempDb = db.withTables<{
       *   temp_table: {
       *     some_column: number
       *   }
       * }>()
       *
       * await tempDb
       *   .insertInto('temp_table')
       *   .values({ some_column: 100 })
       *   .execute()
       * ```
       */
      withTables() {
        return new Kysely2({ ...this.#props });
      }
      /**
       * Releases all resources and disconnects from the database.
       *
       * You need to call this when you are done using the `Kysely` instance.
       */
      async destroy() {
        await this.#props.driver.destroy();
      }
      /**
       * Returns true if this `Kysely` instance is a transaction.
       *
       * You can also use `db instanceof Transaction`.
       */
      get isTransaction() {
        return false;
      }
      /**
       * @internal
       * @private
       */
      getExecutor() {
        return this.#props.executor;
      }
      /**
       * Executes a given compiled query or query builder.
       *
       * See {@link https://github.com/koskimas/kysely/blob/master/site/docs/recipes/splitting-build-compile-and-execute-code.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
       */
      executeQuery(query, queryId = (0, query_id_js_1.createQueryId)()) {
        const compiledQuery = (0, compilable_js_1.isCompilable)(query) ? query.compile() : query;
        return this.getExecutor().executeQuery(compiledQuery, queryId);
      }
    };
    exports.Kysely = Kysely2;
    var Transaction2 = class extends Kysely2 {
      #props;
      constructor(props) {
        super(props);
        this.#props = props;
      }
      // The return type is `true` instead of `boolean` to make Kysely<DB>
      // unassignable to Transaction<DB> while allowing assignment the
      // other way around.
      get isTransaction() {
        return true;
      }
      transaction() {
        throw new Error("calling the transaction method for a Transaction is not supported");
      }
      connection() {
        throw new Error("calling the connection method for a Transaction is not supported");
      }
      async destroy() {
        throw new Error("calling the destroy method for a Transaction is not supported");
      }
      withPlugin(plugin) {
        return new Transaction2({
          ...this.#props,
          executor: this.#props.executor.withPlugin(plugin)
        });
      }
      withoutPlugins() {
        return new Transaction2({
          ...this.#props,
          executor: this.#props.executor.withoutPlugins()
        });
      }
      /**
       * @override
       */
      withSchema(schema) {
        return new Transaction2({
          ...this.#props,
          executor: this.#props.executor.withPluginAtFront(new with_schema_plugin_js_1.WithSchemaPlugin(schema))
        });
      }
      withTables() {
        return new Transaction2({ ...this.#props });
      }
    };
    exports.Transaction = Transaction2;
    function isKyselyProps2(obj) {
      return (0, object_utils_js_1.isObject)(obj) && (0, object_utils_js_1.isObject)(obj.config) && (0, object_utils_js_1.isObject)(obj.driver) && (0, object_utils_js_1.isObject)(obj.executor) && (0, object_utils_js_1.isObject)(obj.dialect);
    }
    exports.isKyselyProps = isKyselyProps2;
    var ConnectionBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      async execute(callback) {
        return this.#props.executor.provideConnection(async (connection) => {
          const executor = this.#props.executor.withConnectionProvider(new single_connection_provider_js_1.SingleConnectionProvider(connection));
          const db = new Kysely2({
            ...this.#props,
            executor
          });
          return await callback(db);
        });
      }
    };
    exports.ConnectionBuilder = ConnectionBuilder2;
    (0, prevent_await_js_1.preventAwait)(ConnectionBuilder2, "don't await ConnectionBuilder instances directly. To execute the query you need to call the `execute` method");
    var TransactionBuilder2 = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      setIsolationLevel(isolationLevel) {
        return new TransactionBuilder2({
          ...this.#props,
          isolationLevel
        });
      }
      async execute(callback) {
        const { isolationLevel, ...kyselyProps } = this.#props;
        const settings = { isolationLevel };
        validateTransactionSettings2(settings);
        return this.#props.executor.provideConnection(async (connection) => {
          const executor = this.#props.executor.withConnectionProvider(new single_connection_provider_js_1.SingleConnectionProvider(connection));
          const transaction = new Transaction2({
            ...kyselyProps,
            executor
          });
          try {
            await this.#props.driver.beginTransaction(connection, settings);
            const result = await callback(transaction);
            await this.#props.driver.commitTransaction(connection);
            return result;
          } catch (error) {
            await this.#props.driver.rollbackTransaction(connection);
            throw error;
          }
        });
      }
    };
    exports.TransactionBuilder = TransactionBuilder2;
    (0, prevent_await_js_1.preventAwait)(TransactionBuilder2, "don't await TransactionBuilder instances directly. To execute the transaction you need to call the `execute` method");
    function validateTransactionSettings2(settings) {
      if (settings.isolationLevel && !driver_js_1.TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
        throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
      }
    }
  }
});

// node_modules/kysely/dist/cjs/query-builder/where-interface.js
var require_where_interface = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/where-interface.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/query-builder/returning-interface.js
var require_returning_interface = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/returning-interface.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/query-builder/having-interface.js
var require_having_interface = __commonJS({
  "node_modules/kysely/dist/cjs/query-builder/having-interface.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/raw-builder/raw-builder.js
var require_raw_builder = __commonJS({
  "node_modules/kysely/dist/cjs/raw-builder/raw-builder.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createRawBuilder = void 0;
    var alias_node_js_1 = require_alias_node();
    var prevent_await_js_1 = require_prevent_await();
    var object_utils_js_1 = require_object_utils();
    var noop_query_executor_js_1 = require_noop_query_executor();
    var identifier_node_js_1 = require_identifier_node();
    var operation_node_source_js_1 = require_operation_node_source();
    var RawBuilderImpl = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      get expressionType() {
        return void 0;
      }
      get isRawBuilder() {
        return true;
      }
      as(alias) {
        return new AliasedRawBuilderImpl(this, alias);
      }
      $castTo() {
        return new RawBuilderImpl({ ...this.#props });
      }
      withPlugin(plugin) {
        return new RawBuilderImpl({
          ...this.#props,
          plugins: this.#props.plugins !== void 0 ? (0, object_utils_js_1.freeze)([...this.#props.plugins, plugin]) : (0, object_utils_js_1.freeze)([plugin])
        });
      }
      toOperationNode() {
        return this.#toOperationNode(this.#getExecutor());
      }
      compile(executorProvider) {
        return this.#compile(this.#getExecutor(executorProvider));
      }
      async execute(executorProvider) {
        const executor = this.#getExecutor(executorProvider);
        return executor.executeQuery(this.#compile(executor), this.#props.queryId);
      }
      #getExecutor(executorProvider) {
        const executor = executorProvider !== void 0 ? executorProvider.getExecutor() : noop_query_executor_js_1.NOOP_QUERY_EXECUTOR;
        return this.#props.plugins !== void 0 ? executor.withPlugins(this.#props.plugins) : executor;
      }
      #toOperationNode(executor) {
        return executor.transformQuery(this.#props.rawNode, this.#props.queryId);
      }
      #compile(executor) {
        return executor.compileQuery(this.#toOperationNode(executor), this.#props.queryId);
      }
    };
    function createRawBuilder(props) {
      return new RawBuilderImpl(props);
    }
    exports.createRawBuilder = createRawBuilder;
    (0, prevent_await_js_1.preventAwait)(RawBuilderImpl, "don't await RawBuilder instances directly. To execute the query you need to call `execute`");
    var AliasedRawBuilderImpl = class {
      #rawBuilder;
      #alias;
      constructor(rawBuilder, alias) {
        this.#rawBuilder = rawBuilder;
        this.#alias = alias;
      }
      get expression() {
        return this.#rawBuilder;
      }
      get alias() {
        return this.#alias;
      }
      get rawBuilder() {
        return this.#rawBuilder;
      }
      toOperationNode() {
        return alias_node_js_1.AliasNode.create(this.#rawBuilder.toOperationNode(), (0, operation_node_source_js_1.isOperationNodeSource)(this.#alias) ? this.#alias.toOperationNode() : identifier_node_js_1.IdentifierNode.create(this.#alias));
      }
    };
    (0, prevent_await_js_1.preventAwait)(AliasedRawBuilderImpl, "don't await AliasedRawBuilder instances directly. AliasedRawBuilder should never be executed directly since it's always a part of another query.");
  }
});

// node_modules/kysely/dist/cjs/raw-builder/sql.js
var require_sql = __commonJS({
  "node_modules/kysely/dist/cjs/raw-builder/sql.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sql = void 0;
    var identifier_node_js_1 = require_identifier_node();
    var raw_node_js_1 = require_raw_node();
    var value_node_js_1 = require_value_node();
    var reference_parser_js_1 = require_reference_parser();
    var table_parser_js_1 = require_table_parser();
    var value_parser_js_1 = require_value_parser();
    var query_id_js_1 = require_query_id();
    var raw_builder_js_1 = require_raw_builder();
    exports.sql = Object.assign((sqlFragments, ...parameters) => {
      return (0, raw_builder_js_1.createRawBuilder)({
        queryId: (0, query_id_js_1.createQueryId)(),
        rawNode: raw_node_js_1.RawNode.create(sqlFragments, parameters?.map(value_parser_js_1.parseValueExpression) ?? [])
      });
    }, {
      ref(columnReference) {
        return (0, raw_builder_js_1.createRawBuilder)({
          queryId: (0, query_id_js_1.createQueryId)(),
          rawNode: raw_node_js_1.RawNode.createWithChild((0, reference_parser_js_1.parseStringReference)(columnReference))
        });
      },
      val(value) {
        return (0, raw_builder_js_1.createRawBuilder)({
          queryId: (0, query_id_js_1.createQueryId)(),
          rawNode: raw_node_js_1.RawNode.createWithChild((0, value_parser_js_1.parseValueExpression)(value))
        });
      },
      value(value) {
        return this.val(value);
      },
      table(tableReference) {
        return (0, raw_builder_js_1.createRawBuilder)({
          queryId: (0, query_id_js_1.createQueryId)(),
          rawNode: raw_node_js_1.RawNode.createWithChild((0, table_parser_js_1.parseTable)(tableReference))
        });
      },
      id(...ids) {
        const fragments = new Array(ids.length + 1).fill(".");
        fragments[0] = "";
        fragments[fragments.length - 1] = "";
        return (0, raw_builder_js_1.createRawBuilder)({
          queryId: (0, query_id_js_1.createQueryId)(),
          rawNode: raw_node_js_1.RawNode.create(fragments, ids.map(identifier_node_js_1.IdentifierNode.create))
        });
      },
      lit(value) {
        return (0, raw_builder_js_1.createRawBuilder)({
          queryId: (0, query_id_js_1.createQueryId)(),
          rawNode: raw_node_js_1.RawNode.createWithChild(value_node_js_1.ValueNode.createImmediate(value))
        });
      },
      literal(value) {
        return this.lit(value);
      },
      raw(sql) {
        return (0, raw_builder_js_1.createRawBuilder)({
          queryId: (0, query_id_js_1.createQueryId)(),
          rawNode: raw_node_js_1.RawNode.createWithSql(sql)
        });
      },
      join(array, separator = (0, exports.sql)`, `) {
        const nodes = new Array(2 * array.length - 1);
        const sep = separator.toOperationNode();
        for (let i = 0; i < array.length; ++i) {
          nodes[2 * i] = (0, value_parser_js_1.parseValueExpression)(array[i]);
          if (i !== array.length - 1) {
            nodes[2 * i + 1] = sep;
          }
        }
        return (0, raw_builder_js_1.createRawBuilder)({
          queryId: (0, query_id_js_1.createQueryId)(),
          rawNode: raw_node_js_1.RawNode.createWithChildren(nodes)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/query-executor/query-executor.js
var require_query_executor = __commonJS({
  "node_modules/kysely/dist/cjs/query-executor/query-executor.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/query-executor/query-executor-provider.js
var require_query_executor_provider = __commonJS({
  "node_modules/kysely/dist/cjs/query-executor/query-executor-provider.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/operation-node/operation-node-visitor.js
var require_operation_node_visitor = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/operation-node-visitor.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationNodeVisitor = void 0;
    var object_utils_js_1 = require_object_utils();
    var OperationNodeVisitor = class {
      nodeStack = [];
      get parentNode() {
        return this.nodeStack[this.nodeStack.length - 2];
      }
      #visitors = (0, object_utils_js_1.freeze)({
        AliasNode: this.visitAlias.bind(this),
        ColumnNode: this.visitColumn.bind(this),
        IdentifierNode: this.visitIdentifier.bind(this),
        SchemableIdentifierNode: this.visitSchemableIdentifier.bind(this),
        RawNode: this.visitRaw.bind(this),
        ReferenceNode: this.visitReference.bind(this),
        SelectQueryNode: this.visitSelectQuery.bind(this),
        SelectionNode: this.visitSelection.bind(this),
        TableNode: this.visitTable.bind(this),
        FromNode: this.visitFrom.bind(this),
        SelectAllNode: this.visitSelectAll.bind(this),
        AndNode: this.visitAnd.bind(this),
        OrNode: this.visitOr.bind(this),
        ValueNode: this.visitValue.bind(this),
        ValueListNode: this.visitValueList.bind(this),
        PrimitiveValueListNode: this.visitPrimitiveValueList.bind(this),
        ParensNode: this.visitParens.bind(this),
        JoinNode: this.visitJoin.bind(this),
        OperatorNode: this.visitOperator.bind(this),
        WhereNode: this.visitWhere.bind(this),
        InsertQueryNode: this.visitInsertQuery.bind(this),
        DeleteQueryNode: this.visitDeleteQuery.bind(this),
        ReturningNode: this.visitReturning.bind(this),
        CreateTableNode: this.visitCreateTable.bind(this),
        AddColumnNode: this.visitAddColumn.bind(this),
        ColumnDefinitionNode: this.visitColumnDefinition.bind(this),
        DropTableNode: this.visitDropTable.bind(this),
        DataTypeNode: this.visitDataType.bind(this),
        OrderByNode: this.visitOrderBy.bind(this),
        OrderByItemNode: this.visitOrderByItem.bind(this),
        GroupByNode: this.visitGroupBy.bind(this),
        GroupByItemNode: this.visitGroupByItem.bind(this),
        UpdateQueryNode: this.visitUpdateQuery.bind(this),
        ColumnUpdateNode: this.visitColumnUpdate.bind(this),
        LimitNode: this.visitLimit.bind(this),
        OffsetNode: this.visitOffset.bind(this),
        OnConflictNode: this.visitOnConflict.bind(this),
        OnDuplicateKeyNode: this.visitOnDuplicateKey.bind(this),
        CreateIndexNode: this.visitCreateIndex.bind(this),
        DropIndexNode: this.visitDropIndex.bind(this),
        ListNode: this.visitList.bind(this),
        PrimaryKeyConstraintNode: this.visitPrimaryKeyConstraint.bind(this),
        UniqueConstraintNode: this.visitUniqueConstraint.bind(this),
        ReferencesNode: this.visitReferences.bind(this),
        CheckConstraintNode: this.visitCheckConstraint.bind(this),
        WithNode: this.visitWith.bind(this),
        CommonTableExpressionNode: this.visitCommonTableExpression.bind(this),
        CommonTableExpressionNameNode: this.visitCommonTableExpressionName.bind(this),
        HavingNode: this.visitHaving.bind(this),
        CreateSchemaNode: this.visitCreateSchema.bind(this),
        DropSchemaNode: this.visitDropSchema.bind(this),
        AlterTableNode: this.visitAlterTable.bind(this),
        DropColumnNode: this.visitDropColumn.bind(this),
        RenameColumnNode: this.visitRenameColumn.bind(this),
        AlterColumnNode: this.visitAlterColumn.bind(this),
        ModifyColumnNode: this.visitModifyColumn.bind(this),
        AddConstraintNode: this.visitAddConstraint.bind(this),
        DropConstraintNode: this.visitDropConstraint.bind(this),
        ForeignKeyConstraintNode: this.visitForeignKeyConstraint.bind(this),
        CreateViewNode: this.visitCreateView.bind(this),
        DropViewNode: this.visitDropView.bind(this),
        GeneratedNode: this.visitGenerated.bind(this),
        DefaultValueNode: this.visitDefaultValue.bind(this),
        OnNode: this.visitOn.bind(this),
        ValuesNode: this.visitValues.bind(this),
        SelectModifierNode: this.visitSelectModifier.bind(this),
        CreateTypeNode: this.visitCreateType.bind(this),
        DropTypeNode: this.visitDropType.bind(this),
        ExplainNode: this.visitExplain.bind(this),
        DefaultInsertValueNode: this.visitDefaultInsertValue.bind(this),
        AggregateFunctionNode: this.visitAggregateFunction.bind(this),
        OverNode: this.visitOver.bind(this),
        PartitionByNode: this.visitPartitionBy.bind(this),
        PartitionByItemNode: this.visitPartitionByItem.bind(this),
        SetOperationNode: this.visitSetOperation.bind(this),
        BinaryOperationNode: this.visitBinaryOperation.bind(this),
        UnaryOperationNode: this.visitUnaryOperation.bind(this),
        UsingNode: this.visitUsing.bind(this),
        FunctionNode: this.visitFunction.bind(this),
        CaseNode: this.visitCase.bind(this),
        WhenNode: this.visitWhen.bind(this),
        JSONReferenceNode: this.visitJSONReference.bind(this),
        JSONPathNode: this.visitJSONPath.bind(this),
        JSONPathLegNode: this.visitJSONPathLeg.bind(this),
        JSONOperatorChainNode: this.visitJSONOperatorChain.bind(this),
        TupleNode: this.visitTuple.bind(this)
      });
      visitNode = (node) => {
        this.nodeStack.push(node);
        this.#visitors[node.kind](node);
        this.nodeStack.pop();
      };
    };
    exports.OperationNodeVisitor = OperationNodeVisitor;
  }
});

// node_modules/kysely/dist/cjs/query-compiler/default-query-compiler.js
var require_default_query_compiler = __commonJS({
  "node_modules/kysely/dist/cjs/query-compiler/default-query-compiler.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultQueryCompiler = void 0;
    var insert_query_node_js_1 = require_insert_query_node();
    var operation_node_visitor_js_1 = require_operation_node_visitor();
    var operator_node_js_1 = require_operator_node();
    var parens_node_js_1 = require_parens_node();
    var query_node_js_1 = require_query_node();
    var object_utils_js_1 = require_object_utils();
    var create_view_node_js_1 = require_create_view_node();
    var set_operation_node_js_1 = require_set_operation_node();
    var DefaultQueryCompiler = class extends operation_node_visitor_js_1.OperationNodeVisitor {
      #sql = "";
      #parameters = [];
      get numParameters() {
        return this.#parameters.length;
      }
      compileQuery(node) {
        this.#sql = "";
        this.#parameters = [];
        this.visitNode(node);
        return (0, object_utils_js_1.freeze)({
          query: node,
          sql: this.getSql(),
          parameters: [...this.#parameters]
        });
      }
      getSql() {
        return this.#sql;
      }
      visitSelectQuery(node) {
        const wrapInParens = this.parentNode !== void 0 && !parens_node_js_1.ParensNode.is(this.parentNode) && !insert_query_node_js_1.InsertQueryNode.is(this.parentNode) && !create_view_node_js_1.CreateViewNode.is(this.parentNode) && !set_operation_node_js_1.SetOperationNode.is(this.parentNode);
        if (this.parentNode === void 0 && node.explain) {
          this.visitNode(node.explain);
          this.append(" ");
        }
        if (wrapInParens) {
          this.append("(");
        }
        if (node.with) {
          this.visitNode(node.with);
          this.append(" ");
        }
        this.append("select");
        if (node.distinctOn) {
          this.append(" ");
          this.compileDistinctOn(node.distinctOn);
        }
        if (node.frontModifiers?.length) {
          this.append(" ");
          this.compileList(node.frontModifiers, " ");
        }
        if (node.selections) {
          this.append(" ");
          this.compileList(node.selections);
        }
        if (node.from) {
          this.append(" ");
          this.visitNode(node.from);
        }
        if (node.joins) {
          this.append(" ");
          this.compileList(node.joins, " ");
        }
        if (node.where) {
          this.append(" ");
          this.visitNode(node.where);
        }
        if (node.groupBy) {
          this.append(" ");
          this.visitNode(node.groupBy);
        }
        if (node.having) {
          this.append(" ");
          this.visitNode(node.having);
        }
        if (node.setOperations) {
          this.append(" ");
          this.compileList(node.setOperations, " ");
        }
        if (node.orderBy) {
          this.append(" ");
          this.visitNode(node.orderBy);
        }
        if (node.limit) {
          this.append(" ");
          this.visitNode(node.limit);
        }
        if (node.offset) {
          this.append(" ");
          this.visitNode(node.offset);
        }
        if (node.endModifiers?.length) {
          this.append(" ");
          this.compileList(this.sortSelectModifiers([...node.endModifiers]), " ");
        }
        if (wrapInParens) {
          this.append(")");
        }
      }
      visitFrom(node) {
        this.append("from ");
        this.compileList(node.froms);
      }
      visitSelection(node) {
        this.visitNode(node.selection);
      }
      visitColumn(node) {
        this.visitNode(node.column);
      }
      compileDistinctOn(expressions) {
        this.append("distinct on (");
        this.compileList(expressions);
        this.append(")");
      }
      compileList(nodes, separator = ", ") {
        const lastIndex = nodes.length - 1;
        for (let i = 0; i <= lastIndex; i++) {
          this.visitNode(nodes[i]);
          if (i < lastIndex) {
            this.append(separator);
          }
        }
      }
      visitWhere(node) {
        this.append("where ");
        this.visitNode(node.where);
      }
      visitHaving(node) {
        this.append("having ");
        this.visitNode(node.having);
      }
      visitInsertQuery(node) {
        const isSubQuery = this.nodeStack.find(query_node_js_1.QueryNode.is) !== node;
        if (!isSubQuery && node.explain) {
          this.visitNode(node.explain);
          this.append(" ");
        }
        if (isSubQuery) {
          this.append("(");
        }
        if (node.with) {
          this.visitNode(node.with);
          this.append(" ");
        }
        this.append(node.replace ? "replace" : "insert");
        if (node.ignore) {
          this.append(" ignore");
        }
        this.append(" into ");
        this.visitNode(node.into);
        if (node.columns) {
          this.append(" (");
          this.compileList(node.columns);
          this.append(")");
        }
        if (node.values) {
          this.append(" ");
          this.visitNode(node.values);
        }
        if (node.onConflict) {
          this.append(" ");
          this.visitNode(node.onConflict);
        }
        if (node.onDuplicateKey) {
          this.append(" ");
          this.visitNode(node.onDuplicateKey);
        }
        if (node.returning) {
          this.append(" ");
          this.visitNode(node.returning);
        }
        if (isSubQuery) {
          this.append(")");
        }
      }
      visitValues(node) {
        this.append("values ");
        this.compileList(node.values);
      }
      visitDeleteQuery(node) {
        const isSubQuery = this.nodeStack.find(query_node_js_1.QueryNode.is) !== node;
        if (!isSubQuery && node.explain) {
          this.visitNode(node.explain);
          this.append(" ");
        }
        if (isSubQuery) {
          this.append("(");
        }
        if (node.with) {
          this.visitNode(node.with);
          this.append(" ");
        }
        this.append("delete ");
        this.visitNode(node.from);
        if (node.using) {
          this.append(" ");
          this.visitNode(node.using);
        }
        if (node.joins) {
          this.append(" ");
          this.compileList(node.joins, " ");
        }
        if (node.where) {
          this.append(" ");
          this.visitNode(node.where);
        }
        if (node.orderBy) {
          this.append(" ");
          this.visitNode(node.orderBy);
        }
        if (node.limit) {
          this.append(" ");
          this.visitNode(node.limit);
        }
        if (node.returning) {
          this.append(" ");
          this.visitNode(node.returning);
        }
        if (isSubQuery) {
          this.append(")");
        }
      }
      visitReturning(node) {
        this.append("returning ");
        this.compileList(node.selections);
      }
      visitAlias(node) {
        this.visitNode(node.node);
        this.append(" as ");
        this.visitNode(node.alias);
      }
      visitReference(node) {
        if (node.table) {
          this.visitNode(node.table);
          this.append(".");
        }
        this.visitNode(node.column);
      }
      visitSelectAll(_) {
        this.append("*");
      }
      visitIdentifier(node) {
        this.append(this.getLeftIdentifierWrapper());
        this.compileUnwrappedIdentifier(node);
        this.append(this.getRightIdentifierWrapper());
      }
      compileUnwrappedIdentifier(node) {
        if (!(0, object_utils_js_1.isString)(node.name)) {
          throw new Error("a non-string identifier was passed to compileUnwrappedIdentifier.");
        }
        this.append(this.sanitizeIdentifier(node.name));
      }
      visitAnd(node) {
        this.visitNode(node.left);
        this.append(" and ");
        this.visitNode(node.right);
      }
      visitOr(node) {
        this.visitNode(node.left);
        this.append(" or ");
        this.visitNode(node.right);
      }
      visitValue(node) {
        if (node.immediate) {
          this.appendImmediateValue(node.value);
        } else {
          this.appendValue(node.value);
        }
      }
      visitValueList(node) {
        this.append("(");
        this.compileList(node.values);
        this.append(")");
      }
      visitTuple(node) {
        this.append("(");
        this.compileList(node.values);
        this.append(")");
      }
      visitPrimitiveValueList(node) {
        this.append("(");
        const { values } = node;
        for (let i = 0; i < values.length; ++i) {
          this.appendValue(values[i]);
          if (i !== values.length - 1) {
            this.append(", ");
          }
        }
        this.append(")");
      }
      visitParens(node) {
        this.append("(");
        this.visitNode(node.node);
        this.append(")");
      }
      visitJoin(node) {
        this.append(JOIN_TYPE_SQL[node.joinType]);
        this.append(" ");
        this.visitNode(node.table);
        if (node.on) {
          this.append(" ");
          this.visitNode(node.on);
        }
      }
      visitOn(node) {
        this.append("on ");
        this.visitNode(node.on);
      }
      visitRaw(node) {
        const { sqlFragments, parameters: params } = node;
        for (let i = 0; i < sqlFragments.length; ++i) {
          this.append(sqlFragments[i]);
          if (params.length > i) {
            this.visitNode(params[i]);
          }
        }
      }
      visitOperator(node) {
        this.append(node.operator);
      }
      visitTable(node) {
        this.visitNode(node.table);
      }
      visitSchemableIdentifier(node) {
        if (node.schema) {
          this.visitNode(node.schema);
          this.append(".");
        }
        this.visitNode(node.identifier);
      }
      visitCreateTable(node) {
        this.append("create ");
        if (node.frontModifiers && node.frontModifiers.length > 0) {
          this.compileList(node.frontModifiers, " ");
          this.append(" ");
        }
        if (node.temporary) {
          this.append("temporary ");
        }
        this.append("table ");
        if (node.ifNotExists) {
          this.append("if not exists ");
        }
        this.visitNode(node.table);
        this.append(" (");
        this.compileList([...node.columns, ...node.constraints ?? []]);
        this.append(")");
        if (node.onCommit) {
          this.append(" on commit ");
          this.append(node.onCommit);
        }
        if (node.endModifiers && node.endModifiers.length > 0) {
          this.append(" ");
          this.compileList(node.endModifiers, " ");
        }
      }
      visitColumnDefinition(node) {
        this.visitNode(node.column);
        this.append(" ");
        this.visitNode(node.dataType);
        if (node.unsigned) {
          this.append(" unsigned");
        }
        if (node.frontModifiers && node.frontModifiers.length > 0) {
          this.append(" ");
          this.compileList(node.frontModifiers, " ");
        }
        if (node.generated) {
          this.append(" ");
          this.visitNode(node.generated);
        }
        if (node.defaultTo) {
          this.append(" ");
          this.visitNode(node.defaultTo);
        }
        if (node.notNull) {
          this.append(" not null");
        }
        if (node.unique) {
          this.append(" unique");
        }
        if (node.primaryKey) {
          this.append(" primary key");
        }
        if (node.autoIncrement) {
          this.append(" ");
          this.append(this.getAutoIncrement());
        }
        if (node.references) {
          this.append(" ");
          this.visitNode(node.references);
        }
        if (node.check) {
          this.append(" ");
          this.visitNode(node.check);
        }
        if (node.endModifiers && node.endModifiers.length > 0) {
          this.append(" ");
          this.compileList(node.endModifiers, " ");
        }
      }
      getAutoIncrement() {
        return "auto_increment";
      }
      visitReferences(node) {
        this.append("references ");
        this.visitNode(node.table);
        this.append(" (");
        this.compileList(node.columns);
        this.append(")");
        if (node.onDelete) {
          this.append(" on delete ");
          this.append(node.onDelete);
        }
        if (node.onUpdate) {
          this.append(" on update ");
          this.append(node.onUpdate);
        }
      }
      visitDropTable(node) {
        this.append("drop table ");
        if (node.ifExists) {
          this.append("if exists ");
        }
        this.visitNode(node.table);
        if (node.cascade) {
          this.append(" cascade");
        }
      }
      visitDataType(node) {
        this.append(node.dataType);
      }
      visitOrderBy(node) {
        this.append("order by ");
        this.compileList(node.items);
      }
      visitOrderByItem(node) {
        this.visitNode(node.orderBy);
        if (node.direction) {
          this.append(" ");
          this.visitNode(node.direction);
        }
      }
      visitGroupBy(node) {
        this.append("group by ");
        this.compileList(node.items);
      }
      visitGroupByItem(node) {
        this.visitNode(node.groupBy);
      }
      visitUpdateQuery(node) {
        const isSubQuery = this.nodeStack.find(query_node_js_1.QueryNode.is) !== node;
        if (!isSubQuery && node.explain) {
          this.visitNode(node.explain);
          this.append(" ");
        }
        if (isSubQuery) {
          this.append("(");
        }
        if (node.with) {
          this.visitNode(node.with);
          this.append(" ");
        }
        this.append("update ");
        this.visitNode(node.table);
        this.append(" set ");
        if (node.updates) {
          this.compileList(node.updates);
        }
        if (node.from) {
          this.append(" ");
          this.visitNode(node.from);
        }
        if (node.joins) {
          this.append(" ");
          this.compileList(node.joins, " ");
        }
        if (node.where) {
          this.append(" ");
          this.visitNode(node.where);
        }
        if (node.returning) {
          this.append(" ");
          this.visitNode(node.returning);
        }
        if (isSubQuery) {
          this.append(")");
        }
      }
      visitColumnUpdate(node) {
        this.visitNode(node.column);
        this.append(" = ");
        this.visitNode(node.value);
      }
      visitLimit(node) {
        this.append("limit ");
        this.visitNode(node.limit);
      }
      visitOffset(node) {
        this.append("offset ");
        this.visitNode(node.offset);
      }
      visitOnConflict(node) {
        this.append("on conflict");
        if (node.columns) {
          this.append(" (");
          this.compileList(node.columns);
          this.append(")");
        } else if (node.constraint) {
          this.append(" on constraint ");
          this.visitNode(node.constraint);
        } else if (node.indexExpression) {
          this.append(" (");
          this.visitNode(node.indexExpression);
          this.append(")");
        }
        if (node.indexWhere) {
          this.append(" ");
          this.visitNode(node.indexWhere);
        }
        if (node.doNothing === true) {
          this.append(" do nothing");
        } else if (node.updates) {
          this.append(" do update set ");
          this.compileList(node.updates);
          if (node.updateWhere) {
            this.append(" ");
            this.visitNode(node.updateWhere);
          }
        }
      }
      visitOnDuplicateKey(node) {
        this.append("on duplicate key update ");
        this.compileList(node.updates);
      }
      visitCreateIndex(node) {
        this.append("create ");
        if (node.unique) {
          this.append("unique ");
        }
        this.append("index ");
        if (node.ifNotExists) {
          this.append("if not exists ");
        }
        this.visitNode(node.name);
        if (node.table) {
          this.append(" on ");
          this.visitNode(node.table);
        }
        if (node.using) {
          this.append(" using ");
          this.visitNode(node.using);
        }
        if (node.columns) {
          this.append(" (");
          this.compileList(node.columns);
          this.append(")");
        }
        if (node.where) {
          this.append(" ");
          this.visitNode(node.where);
        }
      }
      visitDropIndex(node) {
        this.append("drop index ");
        if (node.ifExists) {
          this.append("if exists ");
        }
        this.visitNode(node.name);
        if (node.table) {
          this.append(" on ");
          this.visitNode(node.table);
        }
        if (node.cascade) {
          this.append(" cascade");
        }
      }
      visitCreateSchema(node) {
        this.append("create schema ");
        if (node.ifNotExists) {
          this.append("if not exists ");
        }
        this.visitNode(node.schema);
      }
      visitDropSchema(node) {
        this.append("drop schema ");
        if (node.ifExists) {
          this.append("if exists ");
        }
        this.visitNode(node.schema);
        if (node.cascade) {
          this.append(" cascade");
        }
      }
      visitPrimaryKeyConstraint(node) {
        if (node.name) {
          this.append("constraint ");
          this.visitNode(node.name);
          this.append(" ");
        }
        this.append("primary key (");
        this.compileList(node.columns);
        this.append(")");
      }
      visitUniqueConstraint(node) {
        if (node.name) {
          this.append("constraint ");
          this.visitNode(node.name);
          this.append(" ");
        }
        this.append("unique (");
        this.compileList(node.columns);
        this.append(")");
      }
      visitCheckConstraint(node) {
        if (node.name) {
          this.append("constraint ");
          this.visitNode(node.name);
          this.append(" ");
        }
        this.append("check (");
        this.visitNode(node.expression);
        this.append(")");
      }
      visitForeignKeyConstraint(node) {
        if (node.name) {
          this.append("constraint ");
          this.visitNode(node.name);
          this.append(" ");
        }
        this.append("foreign key (");
        this.compileList(node.columns);
        this.append(") ");
        this.visitNode(node.references);
        if (node.onDelete) {
          this.append(" on delete ");
          this.append(node.onDelete);
        }
        if (node.onUpdate) {
          this.append(" on update ");
          this.append(node.onUpdate);
        }
      }
      visitList(node) {
        this.compileList(node.items);
      }
      visitWith(node) {
        this.append("with ");
        if (node.recursive) {
          this.append("recursive ");
        }
        this.compileList(node.expressions);
      }
      visitCommonTableExpression(node) {
        this.visitNode(node.name);
        this.append(" as ");
        if ((0, object_utils_js_1.isBoolean)(node.materialized)) {
          if (!node.materialized) {
            this.append("not ");
          }
          this.append("materialized ");
        }
        this.visitNode(node.expression);
      }
      visitCommonTableExpressionName(node) {
        this.visitNode(node.table);
        if (node.columns) {
          this.append("(");
          this.compileList(node.columns);
          this.append(")");
        }
      }
      visitAlterTable(node) {
        this.append("alter table ");
        this.visitNode(node.table);
        this.append(" ");
        if (node.renameTo) {
          this.append("rename to ");
          this.visitNode(node.renameTo);
        }
        if (node.setSchema) {
          this.append("set schema ");
          this.visitNode(node.setSchema);
        }
        if (node.addConstraint) {
          this.visitNode(node.addConstraint);
        }
        if (node.dropConstraint) {
          this.visitNode(node.dropConstraint);
        }
        if (node.columnAlterations) {
          this.compileList(node.columnAlterations);
        }
      }
      visitAddColumn(node) {
        this.append("add column ");
        this.visitNode(node.column);
      }
      visitRenameColumn(node) {
        this.append("rename column ");
        this.visitNode(node.column);
        this.append(" to ");
        this.visitNode(node.renameTo);
      }
      visitDropColumn(node) {
        this.append("drop column ");
        this.visitNode(node.column);
      }
      visitAlterColumn(node) {
        this.append("alter column ");
        this.visitNode(node.column);
        this.append(" ");
        if (node.dataType) {
          this.append("type ");
          this.visitNode(node.dataType);
          if (node.dataTypeExpression) {
            this.append("using ");
            this.visitNode(node.dataTypeExpression);
          }
        }
        if (node.setDefault) {
          this.append("set default ");
          this.visitNode(node.setDefault);
        }
        if (node.dropDefault) {
          this.append("drop default");
        }
        if (node.setNotNull) {
          this.append("set not null");
        }
        if (node.dropNotNull) {
          this.append("drop not null");
        }
      }
      visitModifyColumn(node) {
        this.append("modify column ");
        this.visitNode(node.column);
      }
      visitAddConstraint(node) {
        this.append("add ");
        this.visitNode(node.constraint);
      }
      visitDropConstraint(node) {
        this.append("drop constraint ");
        if (node.ifExists) {
          this.append("if exists ");
        }
        this.visitNode(node.constraintName);
        if (node.modifier === "cascade") {
          this.append(" cascade");
        } else if (node.modifier === "restrict") {
          this.append(" restrict");
        }
      }
      visitSetOperation(node) {
        this.append(node.operator);
        this.append(" ");
        if (node.all) {
          this.append("all ");
        }
        this.visitNode(node.expression);
      }
      visitCreateView(node) {
        this.append("create ");
        if (node.orReplace) {
          this.append("or replace ");
        }
        if (node.materialized) {
          this.append("materialized ");
        }
        if (node.temporary) {
          this.append("temporary ");
        }
        this.append("view ");
        if (node.ifNotExists) {
          this.append("if not exists ");
        }
        this.visitNode(node.name);
        this.append(" ");
        if (node.columns) {
          this.append("(");
          this.compileList(node.columns);
          this.append(") ");
        }
        if (node.as) {
          this.append("as ");
          this.visitNode(node.as);
        }
      }
      visitDropView(node) {
        this.append("drop ");
        if (node.materialized) {
          this.append("materialized ");
        }
        this.append("view ");
        if (node.ifExists) {
          this.append("if exists ");
        }
        this.visitNode(node.name);
        if (node.cascade) {
          this.append(" cascade");
        }
      }
      visitGenerated(node) {
        this.append("generated ");
        if (node.always) {
          this.append("always ");
        }
        if (node.byDefault) {
          this.append("by default ");
        }
        this.append("as ");
        if (node.identity) {
          this.append("identity");
        }
        if (node.expression) {
          this.append("(");
          this.visitNode(node.expression);
          this.append(")");
        }
        if (node.stored) {
          this.append(" stored");
        }
      }
      visitDefaultValue(node) {
        this.append("default ");
        this.visitNode(node.defaultValue);
      }
      visitSelectModifier(node) {
        if (node.rawModifier) {
          this.visitNode(node.rawModifier);
        } else {
          this.append(SELECT_MODIFIER_SQL[node.modifier]);
        }
      }
      visitCreateType(node) {
        this.append("create type ");
        this.visitNode(node.name);
        if (node.enum) {
          this.append(" as enum ");
          this.visitNode(node.enum);
        }
      }
      visitDropType(node) {
        this.append("drop type ");
        if (node.ifExists) {
          this.append("if exists ");
        }
        this.visitNode(node.name);
      }
      visitExplain(node) {
        this.append("explain");
        if (node.options || node.format) {
          this.append(" ");
          this.append(this.getLeftExplainOptionsWrapper());
          if (node.options) {
            this.visitNode(node.options);
            if (node.format) {
              this.append(this.getExplainOptionsDelimiter());
            }
          }
          if (node.format) {
            this.append("format");
            this.append(this.getExplainOptionAssignment());
            this.append(node.format);
          }
          this.append(this.getRightExplainOptionsWrapper());
        }
      }
      visitDefaultInsertValue(_) {
        this.append("default");
      }
      visitAggregateFunction(node) {
        this.append(node.func);
        this.append("(");
        if (node.distinct) {
          this.append("distinct ");
        }
        this.compileList(node.aggregated);
        this.append(")");
        if (node.filter) {
          this.append(" filter(");
          this.visitNode(node.filter);
          this.append(")");
        }
        if (node.over) {
          this.append(" ");
          this.visitNode(node.over);
        }
      }
      visitOver(node) {
        this.append("over(");
        if (node.partitionBy) {
          this.visitNode(node.partitionBy);
          if (node.orderBy) {
            this.append(" ");
          }
        }
        if (node.orderBy) {
          this.visitNode(node.orderBy);
        }
        this.append(")");
      }
      visitPartitionBy(node) {
        this.append("partition by ");
        this.compileList(node.items);
      }
      visitPartitionByItem(node) {
        this.visitNode(node.partitionBy);
      }
      visitBinaryOperation(node) {
        this.visitNode(node.leftOperand);
        this.append(" ");
        this.visitNode(node.operator);
        this.append(" ");
        this.visitNode(node.rightOperand);
      }
      visitUnaryOperation(node) {
        this.visitNode(node.operator);
        if (!this.isMinusOperator(node.operator)) {
          this.append(" ");
        }
        this.visitNode(node.operand);
      }
      isMinusOperator(node) {
        return operator_node_js_1.OperatorNode.is(node) && node.operator === "-";
      }
      visitUsing(node) {
        this.append("using ");
        this.compileList(node.tables);
      }
      visitFunction(node) {
        this.append(node.func);
        this.append("(");
        this.compileList(node.arguments);
        this.append(")");
      }
      visitCase(node) {
        this.append("case");
        if (node.value) {
          this.append(" ");
          this.visitNode(node.value);
        }
        if (node.when) {
          this.append(" ");
          this.compileList(node.when, " ");
        }
        if (node.else) {
          this.append(" else ");
          this.visitNode(node.else);
        }
        this.append(" end");
        if (node.isStatement) {
          this.append(" case");
        }
      }
      visitWhen(node) {
        this.append("when ");
        this.visitNode(node.condition);
        if (node.result) {
          this.append(" then ");
          this.visitNode(node.result);
        }
      }
      visitJSONReference(node) {
        this.visitNode(node.reference);
        this.visitNode(node.traversal);
      }
      visitJSONPath(node) {
        if (node.inOperator) {
          this.visitNode(node.inOperator);
        }
        this.append("'$");
        for (const pathLeg of node.pathLegs) {
          this.visitNode(pathLeg);
        }
        this.append("'");
      }
      visitJSONPathLeg(node) {
        const isArrayLocation = node.type === "ArrayLocation";
        this.append(isArrayLocation ? "[" : ".");
        this.append(String(node.value));
        if (isArrayLocation) {
          this.append("]");
        }
      }
      visitJSONOperatorChain(node) {
        for (let i = 0, len = node.values.length; i < len; i++) {
          if (i === len - 1) {
            this.visitNode(node.operator);
          } else {
            this.append("->");
          }
          this.visitNode(node.values[i]);
        }
      }
      append(str) {
        this.#sql += str;
      }
      appendValue(parameter) {
        this.addParameter(parameter);
        this.append(this.getCurrentParameterPlaceholder());
      }
      getLeftIdentifierWrapper() {
        return '"';
      }
      getRightIdentifierWrapper() {
        return '"';
      }
      getCurrentParameterPlaceholder() {
        return "$" + this.numParameters;
      }
      getLeftExplainOptionsWrapper() {
        return "(";
      }
      getExplainOptionAssignment() {
        return " ";
      }
      getExplainOptionsDelimiter() {
        return ", ";
      }
      getRightExplainOptionsWrapper() {
        return ")";
      }
      sanitizeIdentifier(identifier) {
        const leftWrap = this.getLeftIdentifierWrapper();
        const rightWrap = this.getRightIdentifierWrapper();
        let sanitized = "";
        for (const c of identifier) {
          sanitized += c;
          if (c === leftWrap) {
            sanitized += leftWrap;
          } else if (c === rightWrap) {
            sanitized += rightWrap;
          }
        }
        return sanitized;
      }
      addParameter(parameter) {
        this.#parameters.push(parameter);
      }
      appendImmediateValue(value) {
        if ((0, object_utils_js_1.isString)(value)) {
          this.append(`'${value}'`);
        } else if ((0, object_utils_js_1.isNumber)(value) || (0, object_utils_js_1.isBoolean)(value)) {
          this.append(value.toString());
        } else if ((0, object_utils_js_1.isNull)(value)) {
          this.append("null");
        } else if ((0, object_utils_js_1.isDate)(value)) {
          this.appendImmediateValue(value.toISOString());
        } else if ((0, object_utils_js_1.isBigInt)(value)) {
          this.appendImmediateValue(value.toString());
        } else {
          throw new Error(`invalid immediate value ${value}`);
        }
      }
      sortSelectModifiers(arr) {
        arr.sort((left, right) => left.modifier && right.modifier ? SELECT_MODIFIER_PRIORITY[left.modifier] - SELECT_MODIFIER_PRIORITY[right.modifier] : 1);
        return (0, object_utils_js_1.freeze)(arr);
      }
    };
    exports.DefaultQueryCompiler = DefaultQueryCompiler;
    var SELECT_MODIFIER_SQL = (0, object_utils_js_1.freeze)({
      ForKeyShare: "for key share",
      ForNoKeyUpdate: "for no key update",
      ForUpdate: "for update",
      ForShare: "for share",
      NoWait: "nowait",
      SkipLocked: "skip locked",
      Distinct: "distinct"
    });
    var SELECT_MODIFIER_PRIORITY = (0, object_utils_js_1.freeze)({
      ForKeyShare: 1,
      ForNoKeyUpdate: 1,
      ForUpdate: 1,
      ForShare: 1,
      NoWait: 2,
      SkipLocked: 2,
      Distinct: 0
    });
    var JOIN_TYPE_SQL = (0, object_utils_js_1.freeze)({
      InnerJoin: "inner join",
      LeftJoin: "left join",
      RightJoin: "right join",
      FullJoin: "full join",
      LateralInnerJoin: "inner join lateral",
      LateralLeftJoin: "left join lateral"
    });
  }
});

// node_modules/kysely/dist/cjs/query-compiler/compiled-query.js
var require_compiled_query = __commonJS({
  "node_modules/kysely/dist/cjs/query-compiler/compiled-query.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompiledQuery = void 0;
    var raw_node_js_1 = require_raw_node();
    var object_utils_js_1 = require_object_utils();
    exports.CompiledQuery = (0, object_utils_js_1.freeze)({
      raw(sql, parameters = []) {
        return (0, object_utils_js_1.freeze)({
          sql,
          query: raw_node_js_1.RawNode.createWithSql(sql),
          parameters: (0, object_utils_js_1.freeze)(parameters)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/driver/database-connection.js
var require_database_connection = __commonJS({
  "node_modules/kysely/dist/cjs/driver/database-connection.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/driver/connection-provider.js
var require_connection_provider = __commonJS({
  "node_modules/kysely/dist/cjs/driver/connection-provider.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/driver/dummy-driver.js
var require_dummy_driver = __commonJS({
  "node_modules/kysely/dist/cjs/driver/dummy-driver.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DummyDriver = void 0;
    var DummyDriver = class {
      async init() {
      }
      async acquireConnection() {
        return new DummyConnection();
      }
      async beginTransaction() {
      }
      async commitTransaction() {
      }
      async rollbackTransaction() {
      }
      async releaseConnection() {
      }
      async destroy() {
      }
    };
    exports.DummyDriver = DummyDriver;
    var DummyConnection = class {
      async executeQuery() {
        return {
          rows: []
        };
      }
      async *streamQuery() {
      }
    };
  }
});

// node_modules/kysely/dist/cjs/dialect/dialect.js
var require_dialect = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/dialect.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/dialect/dialect-adapter.js
var require_dialect_adapter = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/dialect-adapter.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/dialect/dialect-adapter-base.js
var require_dialect_adapter_base = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/dialect-adapter-base.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DialectAdapterBase = void 0;
    var DialectAdapterBase = class {
      get supportsTransactionalDdl() {
        return false;
      }
      get supportsReturning() {
        return false;
      }
    };
    exports.DialectAdapterBase = DialectAdapterBase;
  }
});

// node_modules/kysely/dist/cjs/dialect/database-introspector.js
var require_database_introspector = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/database-introspector.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-driver.js
var require_sqlite_driver = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-driver.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SqliteDriver = void 0;
    var compiled_query_js_1 = require_compiled_query();
    var object_utils_js_1 = require_object_utils();
    var SqliteDriver = class {
      #config;
      #connectionMutex = new ConnectionMutex();
      #db;
      #connection;
      constructor(config) {
        this.#config = (0, object_utils_js_1.freeze)({ ...config });
      }
      async init() {
        this.#db = (0, object_utils_js_1.isFunction)(this.#config.database) ? await this.#config.database() : this.#config.database;
        this.#connection = new SqliteConnection(this.#db);
        if (this.#config.onCreateConnection) {
          await this.#config.onCreateConnection(this.#connection);
        }
      }
      async acquireConnection() {
        await this.#connectionMutex.lock();
        return this.#connection;
      }
      async beginTransaction(connection) {
        await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw("begin"));
      }
      async commitTransaction(connection) {
        await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw("commit"));
      }
      async rollbackTransaction(connection) {
        await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw("rollback"));
      }
      async releaseConnection() {
        this.#connectionMutex.unlock();
      }
      async destroy() {
        this.#db?.close();
      }
    };
    exports.SqliteDriver = SqliteDriver;
    var SqliteConnection = class {
      #db;
      constructor(db) {
        this.#db = db;
      }
      executeQuery(compiledQuery) {
        const { sql, parameters } = compiledQuery;
        const stmt = this.#db.prepare(sql);
        if (stmt.reader) {
          return Promise.resolve({
            rows: stmt.all(parameters)
          });
        } else {
          const { changes, lastInsertRowid } = stmt.run(parameters);
          const numAffectedRows = changes !== void 0 && changes !== null ? BigInt(changes) : void 0;
          return Promise.resolve({
            // TODO: remove.
            numUpdatedOrDeletedRows: numAffectedRows,
            numAffectedRows,
            insertId: lastInsertRowid !== void 0 && lastInsertRowid !== null ? BigInt(lastInsertRowid) : void 0,
            rows: []
          });
        }
      }
      async *streamQuery() {
        throw new Error("Sqlite driver doesn't support streaming");
      }
    };
    var ConnectionMutex = class {
      #promise;
      #resolve;
      async lock() {
        while (this.#promise) {
          await this.#promise;
        }
        this.#promise = new Promise((resolve) => {
          this.#resolve = resolve;
        });
      }
      unlock() {
        const resolve = this.#resolve;
        this.#promise = void 0;
        this.#resolve = void 0;
        resolve?.();
      }
    };
  }
});

// node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-query-compiler.js
var require_sqlite_query_compiler = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-query-compiler.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SqliteQueryCompiler = void 0;
    var default_query_compiler_js_1 = require_default_query_compiler();
    var ID_WRAP_REGEX = /"/g;
    var SqliteQueryCompiler = class extends default_query_compiler_js_1.DefaultQueryCompiler {
      getCurrentParameterPlaceholder() {
        return "?";
      }
      getLeftExplainOptionsWrapper() {
        return "";
      }
      getRightExplainOptionsWrapper() {
        return "";
      }
      getLeftIdentifierWrapper() {
        return '"';
      }
      getRightIdentifierWrapper() {
        return '"';
      }
      getAutoIncrement() {
        return "autoincrement";
      }
      sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX, '""');
      }
      visitDefaultInsertValue(_) {
        this.append("null");
      }
    };
    exports.SqliteQueryCompiler = SqliteQueryCompiler;
  }
});

// node_modules/kysely/dist/cjs/plugin/noop-plugin.js
var require_noop_plugin = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/noop-plugin.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopPlugin = void 0;
    var NoopPlugin = class {
      transformQuery(args) {
        return args.node;
      }
      async transformResult(args) {
        return args.result;
      }
    };
    exports.NoopPlugin = NoopPlugin;
  }
});

// node_modules/kysely/dist/cjs/migration/migrator.js
var require_migrator = __commonJS({
  "node_modules/kysely/dist/cjs/migration/migrator.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Migrator = exports.NO_MIGRATIONS = exports.MIGRATION_LOCK_ID = exports.DEFAULT_MIGRATION_LOCK_TABLE = exports.DEFAULT_MIGRATION_TABLE = void 0;
    var noop_plugin_js_1 = require_noop_plugin();
    var with_schema_plugin_js_1 = require_with_schema_plugin();
    var object_utils_js_1 = require_object_utils();
    exports.DEFAULT_MIGRATION_TABLE = "kysely_migration";
    exports.DEFAULT_MIGRATION_LOCK_TABLE = "kysely_migration_lock";
    exports.MIGRATION_LOCK_ID = "migration_lock";
    exports.NO_MIGRATIONS = (0, object_utils_js_1.freeze)({ __noMigrations__: true });
    var Migrator = class {
      #props;
      constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
      }
      /**
       * Returns a {@link MigrationInfo} object for each migration.
       *
       * The returned array is sorted by migration name.
       */
      async getMigrations() {
        const executedMigrations = await this.#doesTableExists(this.#migrationTable) ? await this.#props.db.withPlugin(this.#schemaPlugin).selectFrom(this.#migrationTable).select(["name", "timestamp"]).execute() : [];
        const migrations = await this.#resolveMigrations();
        return migrations.map(({ name, ...migration }) => {
          const executed = executedMigrations.find((it) => it.name === name);
          return {
            name,
            migration,
            executedAt: executed ? new Date(executed.timestamp) : void 0
          };
        });
      }
      /**
       * Runs all migrations that have not yet been run.
       *
       * This method returns a {@link MigrationResultSet} instance and _never_ throws.
       * {@link MigrationResultSet.error} holds the error if something went wrong.
       * {@link MigrationResultSet.results} contains information about which migrations
       * were executed and which failed. See the examples below.
       *
       * This method goes through all possible migrations provided by the provider and runs the
       * ones whose names come alphabetically after the last migration that has been run. If the
       * list of executed migrations doesn't match the beginning of the list of possible migrations
       * an error is thrown.
       *
       * ### Examples
       *
       * ```ts
       * const db = new Kysely<Database>({
       *   dialect: new PostgresDialect({
       *     host: 'localhost',
       *     database: 'kysely_test',
       *   }),
       * })
       *
       * const migrator = new Migrator({
       *   db,
       *   provider: new FileMigrationProvider(
       *     // Path to the folder that contains all your migrations.
       *     'some/path/to/migrations'
       *   )
       * })
       *
       * const { error, results } = await migrator.migrateToLatest()
       *
       * results?.forEach((it) => {
       *   if (it.status === 'Success') {
       *     console.log(`migration "${it.migrationName}" was executed successfully`)
       *   } else if (it.status === 'Error') {
       *     console.error(`failed to execute migration "${it.migrationName}"`)
       *   }
       * })
       *
       * if (error) {
       *   console.error('failed to run `migrateToLatest`')
       *   console.error(error)
       * }
       * ```
       */
      async migrateToLatest() {
        return this.#migrate(({ migrations }) => migrations.length - 1);
      }
      /**
       * Migrate up/down to a specific migration.
       *
       * This method returns a {@link MigrationResultSet} instance and _never_ throws.
       * {@link MigrationResultSet.error} holds the error if something went wrong.
       * {@link MigrationResultSet.results} contains information about which migrations
       * were executed and which failed.
       *
       * ### Examples
       *
       * ```ts
       * await migrator.migrateTo('some_migration')
       * ```
       *
       * If you specify the name of the first migration, this method migrates
       * down to the first migration, but doesn't run the `down` method of
       * the first migration. In case you want to migrate all the way down,
       * you can use a special constant `NO_MIGRATIONS`:
       *
       * ```ts
       * await migrator.migrateTo(NO_MIGRATIONS)
       * ```
       */
      async migrateTo(targetMigrationName) {
        return this.#migrate(({ migrations }) => {
          if (targetMigrationName === exports.NO_MIGRATIONS) {
            return -1;
          }
          const index = migrations.findIndex((it) => it.name === targetMigrationName);
          if (index === -1) {
            throw new Error(`migration "${targetMigrationName}" doesn't exist`);
          }
          return index;
        });
      }
      /**
       * Migrate one step up.
       *
       * This method returns a {@link MigrationResultSet} instance and _never_ throws.
       * {@link MigrationResultSet.error} holds the error if something went wrong.
       * {@link MigrationResultSet.results} contains information about which migrations
       * were executed and which failed.
       *
       * ### Examples
       *
       * ```ts
       * await migrator.migrateUp()
       * ```
       */
      async migrateUp() {
        return this.#migrate(({ currentIndex, migrations }) => Math.min(currentIndex + 1, migrations.length - 1));
      }
      /**
       * Migrate one step down.
       *
       * This method returns a {@link MigrationResultSet} instance and _never_ throws.
       * {@link MigrationResultSet.error} holds the error if something went wrong.
       * {@link MigrationResultSet.results} contains information about which migrations
       * were executed and which failed.
       *
       * ### Examples
       *
       * ```ts
       * await migrator.migrateDown()
       * ```
       */
      async migrateDown() {
        return this.#migrate(({ currentIndex }) => Math.max(currentIndex - 1, -1));
      }
      async #migrate(getTargetMigrationIndex) {
        try {
          await this.#ensureMigrationTablesExists();
          return await this.#runMigrations(getTargetMigrationIndex);
        } catch (error) {
          if (error instanceof MigrationResultSetError) {
            return error.resultSet;
          }
          return { error };
        }
      }
      get #migrationTableSchema() {
        return this.#props.migrationTableSchema;
      }
      get #migrationTable() {
        return this.#props.migrationTableName ?? exports.DEFAULT_MIGRATION_TABLE;
      }
      get #migrationLockTable() {
        return this.#props.migrationLockTableName ?? exports.DEFAULT_MIGRATION_LOCK_TABLE;
      }
      get #schemaPlugin() {
        if (this.#migrationTableSchema) {
          return new with_schema_plugin_js_1.WithSchemaPlugin(this.#migrationTableSchema);
        }
        return new noop_plugin_js_1.NoopPlugin();
      }
      async #ensureMigrationTablesExists() {
        await this.#ensureMigrationTableSchemaExists();
        await this.#ensureMigrationTableExists();
        await this.#ensureMigrationLockTableExists();
        await this.#ensureLockRowExists();
      }
      async #ensureMigrationTableSchemaExists() {
        if (!this.#migrationTableSchema) {
          return;
        }
        if (!await this.#doesSchemaExists()) {
          try {
            await this.#props.db.schema.createSchema(this.#migrationTableSchema).ifNotExists().execute();
          } catch (error) {
            if (!await this.#doesSchemaExists()) {
              throw error;
            }
          }
        }
      }
      async #ensureMigrationTableExists() {
        if (!await this.#doesTableExists(this.#migrationTable)) {
          try {
            if (this.#migrationTableSchema) {
              await this.#props.db.schema.createSchema(this.#migrationTableSchema).ifNotExists().execute();
            }
            await this.#props.db.schema.withPlugin(this.#schemaPlugin).createTable(this.#migrationTable).ifNotExists().addColumn("name", "varchar(255)", (col) => col.notNull().primaryKey()).addColumn("timestamp", "varchar(255)", (col) => col.notNull()).execute();
          } catch (error) {
            if (!await this.#doesTableExists(this.#migrationTable)) {
              throw error;
            }
          }
        }
      }
      async #ensureMigrationLockTableExists() {
        if (!await this.#doesTableExists(this.#migrationLockTable)) {
          try {
            await this.#props.db.schema.withPlugin(this.#schemaPlugin).createTable(this.#migrationLockTable).ifNotExists().addColumn("id", "varchar(255)", (col) => col.notNull().primaryKey()).addColumn("is_locked", "integer", (col) => col.notNull().defaultTo(0)).execute();
          } catch (error) {
            if (!await this.#doesTableExists(this.#migrationLockTable)) {
              throw error;
            }
          }
        }
      }
      async #ensureLockRowExists() {
        if (!await this.#doesLockRowExists()) {
          try {
            await this.#props.db.withPlugin(this.#schemaPlugin).insertInto(this.#migrationLockTable).values({ id: exports.MIGRATION_LOCK_ID, is_locked: 0 }).execute();
          } catch (error) {
            if (!await this.#doesLockRowExists()) {
              throw error;
            }
          }
        }
      }
      async #doesSchemaExists() {
        const schemas = await this.#props.db.introspection.getSchemas();
        return schemas.some((it) => it.name === this.#migrationTableSchema);
      }
      async #doesTableExists(tableName) {
        const schema = this.#migrationTableSchema;
        const tables = await this.#props.db.introspection.getTables({
          withInternalKyselyTables: true
        });
        return tables.some((it) => it.name === tableName && (!schema || it.schema === schema));
      }
      async #doesLockRowExists() {
        const lockRow = await this.#props.db.withPlugin(this.#schemaPlugin).selectFrom(this.#migrationLockTable).where("id", "=", exports.MIGRATION_LOCK_ID).select("id").executeTakeFirst();
        return !!lockRow;
      }
      async #runMigrations(getTargetMigrationIndex) {
        const adapter = this.#props.db.getExecutor().adapter;
        const lockOptions = (0, object_utils_js_1.freeze)({
          lockTable: this.#props.migrationLockTableName ?? exports.DEFAULT_MIGRATION_LOCK_TABLE,
          lockRowId: exports.MIGRATION_LOCK_ID,
          lockTableSchema: this.#props.migrationTableSchema
        });
        const run = async (db) => {
          try {
            await adapter.acquireMigrationLock(db, lockOptions);
            const state = await this.#getState(db);
            if (state.migrations.length === 0) {
              return { results: [] };
            }
            const targetIndex = getTargetMigrationIndex(state);
            if (targetIndex === void 0) {
              return { results: [] };
            }
            if (targetIndex < state.currentIndex) {
              return await this.#migrateDown(db, state, targetIndex);
            } else if (targetIndex > state.currentIndex) {
              return await this.#migrateUp(db, state, targetIndex);
            }
            return { results: [] };
          } finally {
            await adapter.releaseMigrationLock(db, lockOptions);
          }
        };
        if (adapter.supportsTransactionalDdl) {
          return this.#props.db.transaction().execute(run);
        } else {
          return this.#props.db.connection().execute(run);
        }
      }
      async #getState(db) {
        const migrations = await this.#resolveMigrations();
        const executedMigrations = await this.#getExecutedMigrations(db);
        this.#ensureMigrationsNotCorrupted(migrations, executedMigrations);
        return (0, object_utils_js_1.freeze)({
          migrations,
          currentIndex: migrations.findIndex((it) => it.name === (0, object_utils_js_1.getLast)(executedMigrations))
        });
      }
      async #resolveMigrations() {
        const allMigrations = await this.#props.provider.getMigrations();
        return Object.keys(allMigrations).sort().map((name) => ({
          ...allMigrations[name],
          name
        }));
      }
      async #getExecutedMigrations(db) {
        const executedMigrations = await db.withPlugin(this.#schemaPlugin).selectFrom(this.#migrationTable).select("name").orderBy("name").execute();
        return executedMigrations.map((it) => it.name);
      }
      #ensureMigrationsNotCorrupted(migrations, executedMigrations) {
        for (const executed of executedMigrations) {
          if (!migrations.some((it) => it.name === executed)) {
            throw new Error(`corrupted migrations: previously executed migration ${executed} is missing`);
          }
        }
        for (let i = 0; i < executedMigrations.length; ++i) {
          if (migrations[i].name !== executedMigrations[i]) {
            throw new Error(`corrupted migrations: expected previously executed migration ${executedMigrations[i]} to be at index ${i} but ${migrations[i].name} was found in its place. New migrations must always have a name that comes alphabetically after the last executed migration.`);
          }
        }
      }
      async #migrateDown(db, state, targetIndex) {
        const results = [];
        for (let i = state.currentIndex; i > targetIndex; --i) {
          results.push({
            migrationName: state.migrations[i].name,
            direction: "Down",
            status: "NotExecuted"
          });
        }
        for (let i = 0; i < results.length; ++i) {
          const migration = state.migrations.find((it) => it.name === results[i].migrationName);
          try {
            if (migration.down) {
              await migration.down(db);
              await db.withPlugin(this.#schemaPlugin).deleteFrom(this.#migrationTable).where("name", "=", migration.name).execute();
              results[i] = {
                migrationName: migration.name,
                direction: "Down",
                status: "Success"
              };
            }
          } catch (error) {
            results[i] = {
              migrationName: migration.name,
              direction: "Down",
              status: "Error"
            };
            throw new MigrationResultSetError({
              error,
              results
            });
          }
        }
        return { results };
      }
      async #migrateUp(db, state, targetIndex) {
        const results = [];
        for (let i = state.currentIndex + 1; i <= targetIndex; ++i) {
          results.push({
            migrationName: state.migrations[i].name,
            direction: "Up",
            status: "NotExecuted"
          });
        }
        for (let i = 0; i < results.length; ++i) {
          const migration = state.migrations.find((it) => it.name === results[i].migrationName);
          try {
            await migration.up(db);
            await db.withPlugin(this.#schemaPlugin).insertInto(this.#migrationTable).values({
              name: migration.name,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            }).execute();
            results[i] = {
              migrationName: migration.name,
              direction: "Up",
              status: "Success"
            };
          } catch (error) {
            results[i] = {
              migrationName: migration.name,
              direction: "Up",
              status: "Error"
            };
            throw new MigrationResultSetError({
              error,
              results
            });
          }
        }
        return { results };
      }
    };
    exports.Migrator = Migrator;
    var MigrationResultSetError = class extends Error {
      #resultSet;
      constructor(result) {
        super();
        this.#resultSet = result;
      }
      get resultSet() {
        return this.#resultSet;
      }
    };
  }
});

// node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-introspector.js
var require_sqlite_introspector = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-introspector.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SqliteIntrospector = void 0;
    var migrator_js_1 = require_migrator();
    var sql_js_1 = require_sql();
    var SqliteIntrospector = class {
      #db;
      constructor(db) {
        this.#db = db;
      }
      async getSchemas() {
        return [];
      }
      async getTables(options = { withInternalKyselyTables: false }) {
        let query = this.#db.selectFrom("sqlite_master").where("type", "in", ["table", "view"]).where("name", "not like", "sqlite_%").select("name").orderBy("name").$castTo();
        if (!options.withInternalKyselyTables) {
          query = query.where("name", "!=", migrator_js_1.DEFAULT_MIGRATION_TABLE).where("name", "!=", migrator_js_1.DEFAULT_MIGRATION_LOCK_TABLE);
        }
        const tables = await query.execute();
        return Promise.all(tables.map(({ name }) => this.#getTableMetadata(name)));
      }
      async getMetadata(options) {
        return {
          tables: await this.getTables(options)
        };
      }
      async #getTableMetadata(table) {
        const db = this.#db;
        const tableDefinition = await db.selectFrom("sqlite_master").where("name", "=", table).select(["sql", "type"]).$castTo().executeTakeFirstOrThrow();
        const autoIncrementCol = tableDefinition.sql?.split(/[\(\),]/)?.find((it) => it.toLowerCase().includes("autoincrement"))?.trimStart()?.split(/\s+/)?.[0]?.replace(/["`]/g, "");
        const columns = await db.selectFrom((0, sql_js_1.sql)`pragma_table_info(${table})`.as("table_info")).select(["name", "type", "notnull", "dflt_value"]).orderBy("cid").execute();
        return {
          name: table,
          isView: tableDefinition.type === "view",
          columns: columns.map((col) => ({
            name: col.name,
            dataType: col.type,
            isNullable: !col.notnull,
            isAutoIncrementing: col.name === autoIncrementCol,
            hasDefaultValue: col.dflt_value != null
          }))
        };
      }
    };
    exports.SqliteIntrospector = SqliteIntrospector;
  }
});

// node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-adapter.js
var require_sqlite_adapter = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-adapter.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SqliteAdapter = void 0;
    var SqliteAdapter = class {
      get supportsTransactionalDdl() {
        return false;
      }
      get supportsReturning() {
        return true;
      }
      async acquireMigrationLock(_db, _opt) {
      }
      async releaseMigrationLock(_db, _opt) {
      }
    };
    exports.SqliteAdapter = SqliteAdapter;
  }
});

// node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-dialect.js
var require_sqlite_dialect = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-dialect.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SqliteDialect = void 0;
    var sqlite_driver_js_1 = require_sqlite_driver();
    var sqlite_query_compiler_js_1 = require_sqlite_query_compiler();
    var sqlite_introspector_js_1 = require_sqlite_introspector();
    var sqlite_adapter_js_1 = require_sqlite_adapter();
    var object_utils_js_1 = require_object_utils();
    var SqliteDialect = class {
      #config;
      constructor(config) {
        this.#config = (0, object_utils_js_1.freeze)({ ...config });
      }
      createDriver() {
        return new sqlite_driver_js_1.SqliteDriver(this.#config);
      }
      createQueryCompiler() {
        return new sqlite_query_compiler_js_1.SqliteQueryCompiler();
      }
      createAdapter() {
        return new sqlite_adapter_js_1.SqliteAdapter();
      }
      createIntrospector(db) {
        return new sqlite_introspector_js_1.SqliteIntrospector(db);
      }
    };
    exports.SqliteDialect = SqliteDialect;
  }
});

// node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-dialect-config.js
var require_sqlite_dialect_config = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/sqlite/sqlite-dialect-config.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/dialect/postgres/postgres-query-compiler.js
var require_postgres_query_compiler = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/postgres/postgres-query-compiler.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PostgresQueryCompiler = void 0;
    var default_query_compiler_js_1 = require_default_query_compiler();
    var ID_WRAP_REGEX = /"/g;
    var PostgresQueryCompiler = class extends default_query_compiler_js_1.DefaultQueryCompiler {
      sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX, '""');
      }
    };
    exports.PostgresQueryCompiler = PostgresQueryCompiler;
  }
});

// node_modules/kysely/dist/cjs/dialect/postgres/postgres-introspector.js
var require_postgres_introspector = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/postgres/postgres-introspector.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PostgresIntrospector = void 0;
    var migrator_js_1 = require_migrator();
    var object_utils_js_1 = require_object_utils();
    var sql_js_1 = require_sql();
    var PostgresIntrospector = class {
      #db;
      constructor(db) {
        this.#db = db;
      }
      async getSchemas() {
        let rawSchemas = await this.#db.selectFrom("pg_catalog.pg_namespace").select("nspname").$castTo().execute();
        return rawSchemas.map((it) => ({ name: it.nspname }));
      }
      async getTables(options = { withInternalKyselyTables: false }) {
        let query = this.#db.selectFrom("pg_catalog.pg_attribute as a").innerJoin("pg_catalog.pg_class as c", "a.attrelid", "c.oid").innerJoin("pg_catalog.pg_namespace as ns", "c.relnamespace", "ns.oid").innerJoin("pg_catalog.pg_type as typ", "a.atttypid", "typ.oid").innerJoin("pg_catalog.pg_namespace as dtns", "typ.typnamespace", "dtns.oid").select([
          "a.attname as column",
          "a.attnotnull as not_null",
          "a.atthasdef as has_default",
          "c.relname as table",
          "c.relkind as table_type",
          "ns.nspname as schema",
          "typ.typname as type",
          "dtns.nspname as type_schema",
          // Detect if the column is auto incrementing by finding the sequence
          // that is created for `serial` and `bigserial` columns.
          this.#db.selectFrom("pg_class").select((0, sql_js_1.sql)`true`.as("auto_incrementing")).whereRef("relnamespace", "=", "c.relnamespace").where("relkind", "=", "S").where("relname", "=", (0, sql_js_1.sql)`c.relname || '_' || a.attname || '_seq'`).as("auto_incrementing")
        ]).where((eb) => eb.or([eb("c.relkind", "=", "r"), eb("c.relkind", "=", "v")])).where("ns.nspname", "!~", "^pg_").where("ns.nspname", "!=", "information_schema").where("a.attnum", ">=", 0).where("a.attisdropped", "!=", true).orderBy("ns.nspname").orderBy("c.relname").orderBy("a.attnum").$castTo();
        if (!options.withInternalKyselyTables) {
          query = query.where("c.relname", "!=", migrator_js_1.DEFAULT_MIGRATION_TABLE).where("c.relname", "!=", migrator_js_1.DEFAULT_MIGRATION_LOCK_TABLE);
        }
        const rawColumns = await query.execute();
        return this.#parseTableMetadata(rawColumns);
      }
      async getMetadata(options) {
        return {
          tables: await this.getTables(options)
        };
      }
      #parseTableMetadata(columns) {
        return columns.reduce((tables, it) => {
          let table = tables.find((tbl) => tbl.name === it.table && tbl.schema === it.schema);
          if (!table) {
            table = (0, object_utils_js_1.freeze)({
              name: it.table,
              isView: it.table_type === "v",
              schema: it.schema,
              columns: []
            });
            tables.push(table);
          }
          table.columns.push((0, object_utils_js_1.freeze)({
            name: it.column,
            dataType: it.type,
            dataTypeSchema: it.type_schema,
            isNullable: !it.not_null,
            isAutoIncrementing: !!it.auto_incrementing,
            hasDefaultValue: it.has_default
          }));
          return tables;
        }, []);
      }
    };
    exports.PostgresIntrospector = PostgresIntrospector;
  }
});

// node_modules/kysely/dist/cjs/dialect/postgres/postgres-adapter.js
var require_postgres_adapter = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/postgres/postgres-adapter.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PostgresAdapter = void 0;
    var sql_js_1 = require_sql();
    var dialect_adapter_base_js_1 = require_dialect_adapter_base();
    var LOCK_ID = BigInt("3853314791062309107");
    var PostgresAdapter = class extends dialect_adapter_base_js_1.DialectAdapterBase {
      get supportsTransactionalDdl() {
        return true;
      }
      get supportsReturning() {
        return true;
      }
      async acquireMigrationLock(db, _opt) {
        await (0, sql_js_1.sql)`select pg_advisory_xact_lock(${sql_js_1.sql.lit(LOCK_ID)})`.execute(db);
      }
      async releaseMigrationLock(_db, _opt) {
      }
    };
    exports.PostgresAdapter = PostgresAdapter;
  }
});

// node_modules/kysely/dist/cjs/util/stack-trace-utils.js
var require_stack_trace_utils = __commonJS({
  "node_modules/kysely/dist/cjs/util/stack-trace-utils.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendStackTrace = void 0;
    var object_utils_js_1 = require_object_utils();
    function extendStackTrace(err, stackError) {
      if (isStackHolder(err) && stackError.stack) {
        const stackExtension = stackError.stack.split("\n").slice(1).join("\n");
        err.stack += `
${stackExtension}`;
        return err;
      }
      return err;
    }
    exports.extendStackTrace = extendStackTrace;
    function isStackHolder(obj) {
      return (0, object_utils_js_1.isObject)(obj) && (0, object_utils_js_1.isString)(obj.stack);
    }
  }
});

// node_modules/kysely/dist/cjs/dialect/mysql/mysql-driver.js
var require_mysql_driver = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/mysql/mysql-driver.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MysqlDriver = void 0;
    var compiled_query_js_1 = require_compiled_query();
    var object_utils_js_1 = require_object_utils();
    var stack_trace_utils_js_1 = require_stack_trace_utils();
    var PRIVATE_RELEASE_METHOD = Symbol();
    var MysqlDriver = class {
      #config;
      #connections = /* @__PURE__ */ new WeakMap();
      #pool;
      constructor(configOrPool) {
        this.#config = (0, object_utils_js_1.freeze)({ ...configOrPool });
      }
      async init() {
        this.#pool = (0, object_utils_js_1.isFunction)(this.#config.pool) ? await this.#config.pool() : this.#config.pool;
      }
      async acquireConnection() {
        const rawConnection = await this.#acquireConnection();
        let connection = this.#connections.get(rawConnection);
        if (!connection) {
          connection = new MysqlConnection(rawConnection);
          this.#connections.set(rawConnection, connection);
          if (this.#config?.onCreateConnection) {
            await this.#config.onCreateConnection(connection);
          }
        }
        return connection;
      }
      async #acquireConnection() {
        return new Promise((resolve, reject) => {
          this.#pool.getConnection(async (err, rawConnection) => {
            if (err) {
              reject(err);
            } else {
              resolve(rawConnection);
            }
          });
        });
      }
      async beginTransaction(connection, settings) {
        if (settings.isolationLevel) {
          await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw(`set transaction isolation level ${settings.isolationLevel}`));
        }
        await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw("begin"));
      }
      async commitTransaction(connection) {
        await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw("commit"));
      }
      async rollbackTransaction(connection) {
        await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw("rollback"));
      }
      async releaseConnection(connection) {
        connection[PRIVATE_RELEASE_METHOD]();
      }
      async destroy() {
        return new Promise((resolve, reject) => {
          this.#pool.end((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }
    };
    exports.MysqlDriver = MysqlDriver;
    function isOkPacket(obj) {
      return (0, object_utils_js_1.isObject)(obj) && "insertId" in obj && "affectedRows" in obj;
    }
    var MysqlConnection = class {
      #rawConnection;
      constructor(rawConnection) {
        this.#rawConnection = rawConnection;
      }
      async executeQuery(compiledQuery) {
        try {
          const result = await this.#executeQuery(compiledQuery);
          if (isOkPacket(result)) {
            const { insertId, affectedRows, changedRows } = result;
            const numAffectedRows = affectedRows !== void 0 && affectedRows !== null ? BigInt(affectedRows) : void 0;
            const numChangedRows = changedRows !== void 0 && changedRows !== null ? BigInt(changedRows) : void 0;
            return {
              insertId: insertId !== void 0 && insertId !== null && insertId.toString() !== "0" ? BigInt(insertId) : void 0,
              // TODO: remove.
              numUpdatedOrDeletedRows: numAffectedRows,
              numAffectedRows,
              numChangedRows,
              rows: []
            };
          } else if (Array.isArray(result)) {
            return {
              rows: result
            };
          }
          return {
            rows: []
          };
        } catch (err) {
          throw (0, stack_trace_utils_js_1.extendStackTrace)(err, new Error());
        }
      }
      #executeQuery(compiledQuery) {
        return new Promise((resolve, reject) => {
          this.#rawConnection.query(compiledQuery.sql, compiledQuery.parameters, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
      async *streamQuery(compiledQuery, _chunkSize) {
        const stream = this.#rawConnection.query(compiledQuery.sql, compiledQuery.parameters).stream({
          objectMode: true
        });
        try {
          for await (const row of stream) {
            yield {
              rows: [row]
            };
          }
        } catch (ex) {
          if (ex && typeof ex === "object" && "code" in ex && // @ts-ignore
          ex.code === "ERR_STREAM_PREMATURE_CLOSE") {
            return;
          }
          throw ex;
        }
      }
      [PRIVATE_RELEASE_METHOD]() {
        this.#rawConnection.release();
      }
    };
  }
});

// node_modules/kysely/dist/cjs/dialect/mysql/mysql-query-compiler.js
var require_mysql_query_compiler = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/mysql/mysql-query-compiler.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MysqlQueryCompiler = void 0;
    var default_query_compiler_js_1 = require_default_query_compiler();
    var ID_WRAP_REGEX = /`/g;
    var MysqlQueryCompiler = class extends default_query_compiler_js_1.DefaultQueryCompiler {
      getCurrentParameterPlaceholder() {
        return "?";
      }
      getLeftExplainOptionsWrapper() {
        return "";
      }
      getExplainOptionAssignment() {
        return "=";
      }
      getExplainOptionsDelimiter() {
        return " ";
      }
      getRightExplainOptionsWrapper() {
        return "";
      }
      getLeftIdentifierWrapper() {
        return "`";
      }
      getRightIdentifierWrapper() {
        return "`";
      }
      sanitizeIdentifier(identifier) {
        return identifier.replace(ID_WRAP_REGEX, "``");
      }
    };
    exports.MysqlQueryCompiler = MysqlQueryCompiler;
  }
});

// node_modules/kysely/dist/cjs/dialect/mysql/mysql-introspector.js
var require_mysql_introspector = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/mysql/mysql-introspector.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MysqlIntrospector = void 0;
    var migrator_js_1 = require_migrator();
    var object_utils_js_1 = require_object_utils();
    var sql_js_1 = require_sql();
    var MysqlIntrospector = class {
      #db;
      constructor(db) {
        this.#db = db;
      }
      async getSchemas() {
        let rawSchemas = await this.#db.selectFrom("information_schema.schemata").select("schema_name").$castTo().execute();
        return rawSchemas.map((it) => ({ name: it.SCHEMA_NAME }));
      }
      async getTables(options = { withInternalKyselyTables: false }) {
        let query = this.#db.selectFrom("information_schema.columns as columns").innerJoin("information_schema.tables as tables", (b) => b.onRef("columns.TABLE_CATALOG", "=", "tables.TABLE_CATALOG").onRef("columns.TABLE_SCHEMA", "=", "tables.TABLE_SCHEMA").onRef("columns.TABLE_NAME", "=", "tables.TABLE_NAME")).select([
          "columns.COLUMN_NAME",
          "columns.COLUMN_DEFAULT",
          "columns.TABLE_NAME",
          "columns.TABLE_SCHEMA",
          "tables.TABLE_TYPE",
          "columns.IS_NULLABLE",
          "columns.DATA_TYPE",
          "columns.EXTRA"
        ]).where("columns.TABLE_SCHEMA", "=", (0, sql_js_1.sql)`database()`).orderBy("columns.TABLE_NAME").orderBy("columns.ORDINAL_POSITION").$castTo();
        if (!options.withInternalKyselyTables) {
          query = query.where("columns.TABLE_NAME", "!=", migrator_js_1.DEFAULT_MIGRATION_TABLE).where("columns.TABLE_NAME", "!=", migrator_js_1.DEFAULT_MIGRATION_LOCK_TABLE);
        }
        const rawColumns = await query.execute();
        return this.#parseTableMetadata(rawColumns);
      }
      async getMetadata(options) {
        return {
          tables: await this.getTables(options)
        };
      }
      #parseTableMetadata(columns) {
        return columns.reduce((tables, it) => {
          let table = tables.find((tbl) => tbl.name === it.TABLE_NAME);
          if (!table) {
            table = (0, object_utils_js_1.freeze)({
              name: it.TABLE_NAME,
              isView: it.TABLE_TYPE === "VIEW",
              schema: it.TABLE_SCHEMA,
              columns: []
            });
            tables.push(table);
          }
          table.columns.push((0, object_utils_js_1.freeze)({
            name: it.COLUMN_NAME,
            dataType: it.DATA_TYPE,
            isNullable: it.IS_NULLABLE === "YES",
            isAutoIncrementing: it.EXTRA.toLowerCase().includes("auto_increment"),
            hasDefaultValue: it.COLUMN_DEFAULT !== null
          }));
          return tables;
        }, []);
      }
    };
    exports.MysqlIntrospector = MysqlIntrospector;
  }
});

// node_modules/kysely/dist/cjs/dialect/mysql/mysql-adapter.js
var require_mysql_adapter = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/mysql/mysql-adapter.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MysqlAdapter = void 0;
    var sql_js_1 = require_sql();
    var dialect_adapter_base_js_1 = require_dialect_adapter_base();
    var LOCK_ID = "ea586330-2c93-47c8-908d-981d9d270f9d";
    var LOCK_TIMEOUT_SECONDS = 60 * 60;
    var MysqlAdapter = class extends dialect_adapter_base_js_1.DialectAdapterBase {
      get supportsTransactionalDdl() {
        return false;
      }
      get supportsReturning() {
        return false;
      }
      async acquireMigrationLock(db, _opt) {
        await (0, sql_js_1.sql)`select get_lock(${sql_js_1.sql.lit(LOCK_ID)}, ${sql_js_1.sql.lit(LOCK_TIMEOUT_SECONDS)})`.execute(db);
      }
      async releaseMigrationLock(db, _opt) {
        await (0, sql_js_1.sql)`select release_lock(${sql_js_1.sql.lit(LOCK_ID)})`.execute(db);
      }
    };
    exports.MysqlAdapter = MysqlAdapter;
  }
});

// node_modules/kysely/dist/cjs/dialect/mysql/mysql-dialect.js
var require_mysql_dialect = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/mysql/mysql-dialect.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MysqlDialect = void 0;
    var mysql_driver_js_1 = require_mysql_driver();
    var mysql_query_compiler_js_1 = require_mysql_query_compiler();
    var mysql_introspector_js_1 = require_mysql_introspector();
    var mysql_adapter_js_1 = require_mysql_adapter();
    var MysqlDialect = class {
      #config;
      constructor(config) {
        this.#config = config;
      }
      createDriver() {
        return new mysql_driver_js_1.MysqlDriver(this.#config);
      }
      createQueryCompiler() {
        return new mysql_query_compiler_js_1.MysqlQueryCompiler();
      }
      createAdapter() {
        return new mysql_adapter_js_1.MysqlAdapter();
      }
      createIntrospector(db) {
        return new mysql_introspector_js_1.MysqlIntrospector(db);
      }
    };
    exports.MysqlDialect = MysqlDialect;
  }
});

// node_modules/kysely/dist/cjs/dialect/mysql/mysql-dialect-config.js
var require_mysql_dialect_config = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/mysql/mysql-dialect-config.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/dialect/postgres/postgres-driver.js
var require_postgres_driver = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/postgres/postgres-driver.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PostgresDriver = void 0;
    var compiled_query_js_1 = require_compiled_query();
    var object_utils_js_1 = require_object_utils();
    var stack_trace_utils_js_1 = require_stack_trace_utils();
    var PRIVATE_RELEASE_METHOD = Symbol();
    var PostgresDriver = class {
      #config;
      #connections = /* @__PURE__ */ new WeakMap();
      #pool;
      constructor(config) {
        this.#config = (0, object_utils_js_1.freeze)({ ...config });
      }
      async init() {
        this.#pool = (0, object_utils_js_1.isFunction)(this.#config.pool) ? await this.#config.pool() : this.#config.pool;
      }
      async acquireConnection() {
        const client = await this.#pool.connect();
        let connection = this.#connections.get(client);
        if (!connection) {
          connection = new PostgresConnection(client, {
            cursor: this.#config.cursor ?? null
          });
          this.#connections.set(client, connection);
          if (this.#config?.onCreateConnection) {
            await this.#config.onCreateConnection(connection);
          }
        }
        return connection;
      }
      async beginTransaction(connection, settings) {
        if (settings.isolationLevel) {
          await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw(`start transaction isolation level ${settings.isolationLevel}`));
        } else {
          await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw("begin"));
        }
      }
      async commitTransaction(connection) {
        await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw("commit"));
      }
      async rollbackTransaction(connection) {
        await connection.executeQuery(compiled_query_js_1.CompiledQuery.raw("rollback"));
      }
      async releaseConnection(connection) {
        connection[PRIVATE_RELEASE_METHOD]();
      }
      async destroy() {
        if (this.#pool) {
          const pool = this.#pool;
          this.#pool = void 0;
          await pool.end();
        }
      }
    };
    exports.PostgresDriver = PostgresDriver;
    var PostgresConnection = class {
      #client;
      #options;
      constructor(client, options) {
        this.#client = client;
        this.#options = options;
      }
      async executeQuery(compiledQuery) {
        try {
          const result = await this.#client.query(compiledQuery.sql, [
            ...compiledQuery.parameters
          ]);
          if (result.command === "INSERT" || result.command === "UPDATE" || result.command === "DELETE") {
            const numAffectedRows = BigInt(result.rowCount);
            return {
              // TODO: remove.
              numUpdatedOrDeletedRows: numAffectedRows,
              numAffectedRows,
              rows: result.rows ?? []
            };
          }
          return {
            rows: result.rows ?? []
          };
        } catch (err) {
          throw (0, stack_trace_utils_js_1.extendStackTrace)(err, new Error());
        }
      }
      async *streamQuery(compiledQuery, chunkSize) {
        if (!this.#options.cursor) {
          throw new Error("'cursor' is not present in your postgres dialect config. It's required to make streaming work in postgres.");
        }
        if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
          throw new Error("chunkSize must be a positive integer");
        }
        const cursor = this.#client.query(new this.#options.cursor(compiledQuery.sql, compiledQuery.parameters.slice()));
        try {
          while (true) {
            const rows = await cursor.read(chunkSize);
            if (rows.length === 0) {
              break;
            }
            yield {
              rows
            };
          }
        } finally {
          await cursor.close();
        }
      }
      [PRIVATE_RELEASE_METHOD]() {
        this.#client.release();
      }
    };
  }
});

// node_modules/kysely/dist/cjs/dialect/postgres/postgres-dialect-config.js
var require_postgres_dialect_config = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/postgres/postgres-dialect-config.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/dialect/postgres/postgres-dialect.js
var require_postgres_dialect = __commonJS({
  "node_modules/kysely/dist/cjs/dialect/postgres/postgres-dialect.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PostgresDialect = void 0;
    var postgres_driver_js_1 = require_postgres_driver();
    var postgres_introspector_js_1 = require_postgres_introspector();
    var postgres_query_compiler_js_1 = require_postgres_query_compiler();
    var postgres_adapter_js_1 = require_postgres_adapter();
    var PostgresDialect = class {
      #config;
      constructor(config) {
        this.#config = config;
      }
      createDriver() {
        return new postgres_driver_js_1.PostgresDriver(this.#config);
      }
      createQueryCompiler() {
        return new postgres_query_compiler_js_1.PostgresQueryCompiler();
      }
      createAdapter() {
        return new postgres_adapter_js_1.PostgresAdapter();
      }
      createIntrospector(db) {
        return new postgres_introspector_js_1.PostgresIntrospector(db);
      }
    };
    exports.PostgresDialect = PostgresDialect;
  }
});

// node_modules/kysely/dist/cjs/query-compiler/query-compiler.js
var require_query_compiler = __commonJS({
  "node_modules/kysely/dist/cjs/query-compiler/query-compiler.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/migration/file-migration-provider.js
var require_file_migration_provider = __commonJS({
  "node_modules/kysely/dist/cjs/migration/file-migration-provider.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileMigrationProvider = void 0;
    var object_utils_js_1 = require_object_utils();
    var FileMigrationProvider = class {
      #props;
      constructor(props) {
        this.#props = props;
      }
      async getMigrations() {
        const migrations = {};
        const files = await this.#props.fs.readdir(this.#props.migrationFolder);
        for (const fileName of files) {
          if (fileName.endsWith(".js") || fileName.endsWith(".ts") && !fileName.endsWith(".d.ts") || fileName.endsWith(".mjs") || fileName.endsWith(".mts") && !fileName.endsWith(".d.mts")) {
            const migration = await Promise.resolve(`${/* webpackIgnore: true */
            this.#props.path.join(this.#props.migrationFolder, fileName)}`).then((s) => __require(s));
            const migrationKey = fileName.substring(0, fileName.lastIndexOf("."));
            if (isMigration(migration?.default)) {
              migrations[migrationKey] = migration.default;
            } else if (isMigration(migration)) {
              migrations[migrationKey] = migration;
            }
          }
        }
        return migrations;
      }
    };
    exports.FileMigrationProvider = FileMigrationProvider;
    function isMigration(obj) {
      return (0, object_utils_js_1.isObject)(obj) && (0, object_utils_js_1.isFunction)(obj.up);
    }
  }
});

// node_modules/kysely/dist/cjs/plugin/kysely-plugin.js
var require_kysely_plugin = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/kysely-plugin.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/plugin/camel-case/camel-case-transformer.js
var require_camel_case_transformer = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/camel-case/camel-case-transformer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SnakeCaseTransformer = void 0;
    var operation_node_transformer_js_1 = require_operation_node_transformer();
    var SnakeCaseTransformer = class extends operation_node_transformer_js_1.OperationNodeTransformer {
      #snakeCase;
      constructor(snakeCase) {
        super();
        this.#snakeCase = snakeCase;
      }
      transformIdentifier(node) {
        node = super.transformIdentifier(node);
        return {
          ...node,
          name: this.#snakeCase(node.name)
        };
      }
    };
    exports.SnakeCaseTransformer = SnakeCaseTransformer;
  }
});

// node_modules/kysely/dist/cjs/plugin/camel-case/camel-case.js
var require_camel_case = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/camel-case/camel-case.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCamelCaseMapper = exports.createSnakeCaseMapper = void 0;
    function createSnakeCaseMapper({ upperCase = false, underscoreBeforeDigits = false, underscoreBetweenUppercaseLetters = false } = {}) {
      return memoize((str) => {
        if (str.length === 0) {
          return str;
        }
        const upper = str.toUpperCase();
        const lower = str.toLowerCase();
        let out = lower[0];
        for (let i = 1, l = str.length; i < l; ++i) {
          const char = str[i];
          const prevChar = str[i - 1];
          const upperChar = upper[i];
          const prevUpperChar = upper[i - 1];
          const lowerChar = lower[i];
          const prevLowerChar = lower[i - 1];
          if (underscoreBeforeDigits && isDigit(char) && !isDigit(prevChar)) {
            out += "_" + char;
            continue;
          }
          if (char === upperChar && upperChar !== lowerChar) {
            const prevCharacterIsUppercase = prevChar === prevUpperChar && prevUpperChar !== prevLowerChar;
            if (underscoreBetweenUppercaseLetters || !prevCharacterIsUppercase) {
              out += "_" + lowerChar;
            } else {
              out += lowerChar;
            }
          } else {
            out += char;
          }
        }
        if (upperCase) {
          return out.toUpperCase();
        } else {
          return out;
        }
      });
    }
    exports.createSnakeCaseMapper = createSnakeCaseMapper;
    function createCamelCaseMapper({ upperCase = false } = {}) {
      return memoize((str) => {
        if (str.length === 0) {
          return str;
        }
        if (upperCase && isAllUpperCaseSnakeCase(str)) {
          str = str.toLowerCase();
        }
        let out = str[0];
        for (let i = 1, l = str.length; i < l; ++i) {
          const char = str[i];
          const prevChar = str[i - 1];
          if (char !== "_") {
            if (prevChar === "_") {
              out += char.toUpperCase();
            } else {
              out += char;
            }
          }
        }
        return out;
      });
    }
    exports.createCamelCaseMapper = createCamelCaseMapper;
    function isAllUpperCaseSnakeCase(str) {
      for (let i = 1, l = str.length; i < l; ++i) {
        const char = str[i];
        if (char !== "_" && char !== char.toUpperCase()) {
          return false;
        }
      }
      return true;
    }
    function isDigit(char) {
      return char >= "0" && char <= "9";
    }
    function memoize(func) {
      const cache = /* @__PURE__ */ new Map();
      return (str) => {
        let mapped = cache.get(str);
        if (!mapped) {
          mapped = func(str);
          cache.set(str, mapped);
        }
        return mapped;
      };
    }
  }
});

// node_modules/kysely/dist/cjs/plugin/camel-case/camel-case-plugin.js
var require_camel_case_plugin = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/camel-case/camel-case-plugin.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CamelCasePlugin = void 0;
    var object_utils_js_1 = require_object_utils();
    var camel_case_transformer_js_1 = require_camel_case_transformer();
    var camel_case_js_1 = require_camel_case();
    var CamelCasePlugin = class {
      opt;
      #camelCase;
      #snakeCase;
      #snakeCaseTransformer;
      constructor(opt = {}) {
        this.opt = opt;
        this.#camelCase = (0, camel_case_js_1.createCamelCaseMapper)(opt);
        this.#snakeCase = (0, camel_case_js_1.createSnakeCaseMapper)(opt);
        this.#snakeCaseTransformer = new camel_case_transformer_js_1.SnakeCaseTransformer(this.snakeCase.bind(this));
      }
      transformQuery(args) {
        return this.#snakeCaseTransformer.transformNode(args.node);
      }
      async transformResult(args) {
        if (args.result.rows && Array.isArray(args.result.rows)) {
          return {
            ...args.result,
            rows: args.result.rows.map((row) => this.mapRow(row))
          };
        }
        return args.result;
      }
      mapRow(row) {
        return Object.keys(row).reduce((obj, key) => {
          let value = row[key];
          if (Array.isArray(value)) {
            value = value.map((it) => canMap(it, this.opt) ? this.mapRow(it) : it);
          } else if (canMap(value, this.opt)) {
            value = this.mapRow(value);
          }
          obj[this.camelCase(key)] = value;
          return obj;
        }, {});
      }
      snakeCase(str) {
        return this.#snakeCase(str);
      }
      camelCase(str) {
        return this.#camelCase(str);
      }
    };
    exports.CamelCasePlugin = CamelCasePlugin;
    function canMap(obj, opt) {
      return (0, object_utils_js_1.isPlainObject)(obj) && !opt?.maintainNestedObjectKeys;
    }
  }
});

// node_modules/kysely/dist/cjs/plugin/deduplicate-joins/deduplicate-joins-transformer.js
var require_deduplicate_joins_transformer = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/deduplicate-joins/deduplicate-joins-transformer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeduplicateJoinsTransformer = void 0;
    var operation_node_transformer_js_1 = require_operation_node_transformer();
    var object_utils_js_1 = require_object_utils();
    var DeduplicateJoinsTransformer = class extends operation_node_transformer_js_1.OperationNodeTransformer {
      transformSelectQuery(node) {
        return this.#transformQuery(super.transformSelectQuery(node));
      }
      transformUpdateQuery(node) {
        return this.#transformQuery(super.transformUpdateQuery(node));
      }
      transformDeleteQuery(node) {
        return this.#transformQuery(super.transformDeleteQuery(node));
      }
      #transformQuery(node) {
        if (!node.joins || node.joins.length === 0) {
          return node;
        }
        return (0, object_utils_js_1.freeze)({
          ...node,
          joins: this.#deduplicateJoins(node.joins)
        });
      }
      #deduplicateJoins(joins) {
        const out = [];
        for (let i = 0; i < joins.length; ++i) {
          let foundDuplicate = false;
          for (let j = i + 1; j < joins.length; ++j) {
            if ((0, object_utils_js_1.compare)(joins[i], joins[j])) {
              foundDuplicate = true;
              break;
            }
          }
          if (!foundDuplicate) {
            out.push(joins[i]);
          }
        }
        return (0, object_utils_js_1.freeze)(out);
      }
    };
    exports.DeduplicateJoinsTransformer = DeduplicateJoinsTransformer;
  }
});

// node_modules/kysely/dist/cjs/plugin/deduplicate-joins/deduplicate-joins-plugin.js
var require_deduplicate_joins_plugin = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/deduplicate-joins/deduplicate-joins-plugin.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeduplicateJoinsPlugin = void 0;
    var deduplicate_joins_transformer_js_1 = require_deduplicate_joins_transformer();
    var DeduplicateJoinsPlugin = class {
      #transformer = new deduplicate_joins_transformer_js_1.DeduplicateJoinsTransformer();
      transformQuery(args) {
        return this.#transformer.transformNode(args.node);
      }
      transformResult(args) {
        return Promise.resolve(args.result);
      }
    };
    exports.DeduplicateJoinsPlugin = DeduplicateJoinsPlugin;
  }
});

// node_modules/kysely/dist/cjs/plugin/parse-json-results/parse-json-results-plugin.js
var require_parse_json_results_plugin = __commonJS({
  "node_modules/kysely/dist/cjs/plugin/parse-json-results/parse-json-results-plugin.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParseJSONResultsPlugin = void 0;
    var object_utils_js_1 = require_object_utils();
    var ParseJSONResultsPlugin = class {
      // noop
      transformQuery(args) {
        return args.node;
      }
      async transformResult(args) {
        return {
          ...args.result,
          rows: parseArray(args.result.rows)
        };
      }
    };
    exports.ParseJSONResultsPlugin = ParseJSONResultsPlugin;
    function parseArray(arr) {
      for (let i = 0; i < arr.length; ++i) {
        arr[i] = parse(arr[i]);
      }
      return arr;
    }
    function parse(obj) {
      if ((0, object_utils_js_1.isString)(obj)) {
        return parseString(obj);
      }
      if (Array.isArray(obj)) {
        return parseArray(obj);
      }
      if ((0, object_utils_js_1.isPlainObject)(obj)) {
        return parseObject(obj);
      }
      return obj;
    }
    function parseString(str) {
      if (maybeJson(str)) {
        try {
          return parse(JSON.parse(str));
        } catch (err) {
        }
      }
      return str;
    }
    function maybeJson(value) {
      return value.match(/^[\[\{]/) != null;
    }
    function parseObject(obj) {
      for (const key in obj) {
        obj[key] = parse(obj[key]);
      }
      return obj;
    }
  }
});

// node_modules/kysely/dist/cjs/operation-node/constraint-node.js
var require_constraint_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/constraint-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/operation-node/list-node.js
var require_list_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/list-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListNode = void 0;
    var object_utils_js_1 = require_object_utils();
    exports.ListNode = (0, object_utils_js_1.freeze)({
      is(node) {
        return node.kind === "ListNode";
      },
      create(items) {
        return (0, object_utils_js_1.freeze)({
          kind: "ListNode",
          items: (0, object_utils_js_1.freeze)(items)
        });
      }
    });
  }
});

// node_modules/kysely/dist/cjs/operation-node/operation-node.js
var require_operation_node = __commonJS({
  "node_modules/kysely/dist/cjs/operation-node/operation-node.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/util/column-type.js
var require_column_type = __commonJS({
  "node_modules/kysely/dist/cjs/util/column-type.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/util/explainable.js
var require_explainable = __commonJS({
  "node_modules/kysely/dist/cjs/util/explainable.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/util/streamable.js
var require_streamable = __commonJS({
  "node_modules/kysely/dist/cjs/util/streamable.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/util/infer-result.js
var require_infer_result = __commonJS({
  "node_modules/kysely/dist/cjs/util/infer-result.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/kysely/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/kysely/dist/cjs/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logOnce = exports.expressionBuilder = void 0;
    __exportStar(require_kysely(), exports);
    __exportStar(require_query_creator(), exports);
    __exportStar(require_expression(), exports);
    var expression_builder_js_1 = require_expression_builder();
    Object.defineProperty(exports, "expressionBuilder", { enumerable: true, get: function() {
      return expression_builder_js_1.expressionBuilder;
    } });
    __exportStar(require_expression_wrapper(), exports);
    __exportStar(require_where_interface(), exports);
    __exportStar(require_returning_interface(), exports);
    __exportStar(require_having_interface(), exports);
    __exportStar(require_select_query_builder(), exports);
    __exportStar(require_insert_query_builder(), exports);
    __exportStar(require_update_query_builder(), exports);
    __exportStar(require_delete_query_builder(), exports);
    __exportStar(require_no_result_error(), exports);
    __exportStar(require_join_builder(), exports);
    __exportStar(require_function_module(), exports);
    __exportStar(require_insert_result(), exports);
    __exportStar(require_delete_result(), exports);
    __exportStar(require_update_result(), exports);
    __exportStar(require_on_conflict_builder(), exports);
    __exportStar(require_aggregate_function_builder(), exports);
    __exportStar(require_case_builder(), exports);
    __exportStar(require_json_path_builder(), exports);
    __exportStar(require_raw_builder(), exports);
    __exportStar(require_sql(), exports);
    __exportStar(require_query_executor(), exports);
    __exportStar(require_default_query_executor(), exports);
    __exportStar(require_noop_query_executor(), exports);
    __exportStar(require_query_executor_provider(), exports);
    __exportStar(require_default_query_compiler(), exports);
    __exportStar(require_compiled_query(), exports);
    __exportStar(require_schema(), exports);
    __exportStar(require_create_table_builder(), exports);
    __exportStar(require_create_type_builder(), exports);
    __exportStar(require_drop_table_builder(), exports);
    __exportStar(require_drop_type_builder(), exports);
    __exportStar(require_create_index_builder(), exports);
    __exportStar(require_drop_index_builder(), exports);
    __exportStar(require_create_schema_builder(), exports);
    __exportStar(require_drop_schema_builder(), exports);
    __exportStar(require_column_definition_builder(), exports);
    __exportStar(require_foreign_key_constraint_builder(), exports);
    __exportStar(require_alter_table_builder(), exports);
    __exportStar(require_create_view_builder(), exports);
    __exportStar(require_drop_view_builder(), exports);
    __exportStar(require_alter_column_builder(), exports);
    __exportStar(require_dynamic(), exports);
    __exportStar(require_driver(), exports);
    __exportStar(require_database_connection(), exports);
    __exportStar(require_connection_provider(), exports);
    __exportStar(require_default_connection_provider(), exports);
    __exportStar(require_single_connection_provider(), exports);
    __exportStar(require_dummy_driver(), exports);
    __exportStar(require_dialect(), exports);
    __exportStar(require_dialect_adapter(), exports);
    __exportStar(require_dialect_adapter_base(), exports);
    __exportStar(require_database_introspector(), exports);
    __exportStar(require_sqlite_dialect(), exports);
    __exportStar(require_sqlite_dialect_config(), exports);
    __exportStar(require_sqlite_driver(), exports);
    __exportStar(require_postgres_query_compiler(), exports);
    __exportStar(require_postgres_introspector(), exports);
    __exportStar(require_postgres_adapter(), exports);
    __exportStar(require_mysql_dialect(), exports);
    __exportStar(require_mysql_dialect_config(), exports);
    __exportStar(require_mysql_driver(), exports);
    __exportStar(require_mysql_query_compiler(), exports);
    __exportStar(require_mysql_introspector(), exports);
    __exportStar(require_mysql_adapter(), exports);
    __exportStar(require_postgres_driver(), exports);
    __exportStar(require_postgres_dialect_config(), exports);
    __exportStar(require_postgres_dialect(), exports);
    __exportStar(require_sqlite_query_compiler(), exports);
    __exportStar(require_sqlite_introspector(), exports);
    __exportStar(require_sqlite_adapter(), exports);
    __exportStar(require_default_query_compiler(), exports);
    __exportStar(require_query_compiler(), exports);
    __exportStar(require_migrator(), exports);
    __exportStar(require_file_migration_provider(), exports);
    __exportStar(require_kysely_plugin(), exports);
    __exportStar(require_camel_case_plugin(), exports);
    __exportStar(require_deduplicate_joins_plugin(), exports);
    __exportStar(require_with_schema_plugin(), exports);
    __exportStar(require_parse_json_results_plugin(), exports);
    __exportStar(require_add_column_node(), exports);
    __exportStar(require_add_constraint_node(), exports);
    __exportStar(require_alias_node(), exports);
    __exportStar(require_alter_column_node(), exports);
    __exportStar(require_alter_table_node(), exports);
    __exportStar(require_and_node(), exports);
    __exportStar(require_case_node(), exports);
    __exportStar(require_check_constraint_node(), exports);
    __exportStar(require_column_definition_node(), exports);
    __exportStar(require_column_node(), exports);
    __exportStar(require_column_update_node(), exports);
    __exportStar(require_common_table_expression_node(), exports);
    __exportStar(require_common_table_expression_name_node(), exports);
    __exportStar(require_constraint_node(), exports);
    __exportStar(require_create_index_node(), exports);
    __exportStar(require_create_schema_node(), exports);
    __exportStar(require_create_table_node(), exports);
    __exportStar(require_create_type_node(), exports);
    __exportStar(require_create_view_node(), exports);
    __exportStar(require_data_type_node(), exports);
    __exportStar(require_default_value_node(), exports);
    __exportStar(require_delete_query_node(), exports);
    __exportStar(require_drop_column_node(), exports);
    __exportStar(require_drop_constraint_node(), exports);
    __exportStar(require_drop_index_node(), exports);
    __exportStar(require_drop_schema_node(), exports);
    __exportStar(require_drop_table_node(), exports);
    __exportStar(require_drop_type_node(), exports);
    __exportStar(require_drop_view_node(), exports);
    __exportStar(require_foreign_key_constraint_node(), exports);
    __exportStar(require_from_node(), exports);
    __exportStar(require_generated_node(), exports);
    __exportStar(require_group_by_item_node(), exports);
    __exportStar(require_group_by_node(), exports);
    __exportStar(require_having_node(), exports);
    __exportStar(require_identifier_node(), exports);
    __exportStar(require_insert_query_node(), exports);
    __exportStar(require_join_node(), exports);
    __exportStar(require_limit_node(), exports);
    __exportStar(require_list_node(), exports);
    __exportStar(require_modify_column_node(), exports);
    __exportStar(require_offset_node(), exports);
    __exportStar(require_on_conflict_node(), exports);
    __exportStar(require_on_duplicate_key_node(), exports);
    __exportStar(require_on_node(), exports);
    __exportStar(require_operation_node_source(), exports);
    __exportStar(require_operation_node_transformer(), exports);
    __exportStar(require_operation_node_visitor(), exports);
    __exportStar(require_operation_node(), exports);
    __exportStar(require_operator_node(), exports);
    __exportStar(require_or_node(), exports);
    __exportStar(require_order_by_item_node(), exports);
    __exportStar(require_order_by_node(), exports);
    __exportStar(require_parens_node(), exports);
    __exportStar(require_primary_constraint_node(), exports);
    __exportStar(require_primitive_value_list_node(), exports);
    __exportStar(require_query_node(), exports);
    __exportStar(require_raw_node(), exports);
    __exportStar(require_reference_node(), exports);
    __exportStar(require_references_node(), exports);
    __exportStar(require_rename_column_node(), exports);
    __exportStar(require_returning_node(), exports);
    __exportStar(require_select_all_node(), exports);
    __exportStar(require_select_query_node(), exports);
    __exportStar(require_select_query_node(), exports);
    __exportStar(require_selection_node(), exports);
    __exportStar(require_table_node(), exports);
    __exportStar(require_unique_constraint_node(), exports);
    __exportStar(require_update_query_node(), exports);
    __exportStar(require_value_list_node(), exports);
    __exportStar(require_value_node(), exports);
    __exportStar(require_values_node(), exports);
    __exportStar(require_when_node(), exports);
    __exportStar(require_where_node(), exports);
    __exportStar(require_with_node(), exports);
    __exportStar(require_explain_node(), exports);
    __exportStar(require_default_insert_value_node(), exports);
    __exportStar(require_aggregate_function_node(), exports);
    __exportStar(require_over_node(), exports);
    __exportStar(require_partition_by_node(), exports);
    __exportStar(require_partition_by_item_node(), exports);
    __exportStar(require_set_operation_node(), exports);
    __exportStar(require_binary_operation_node(), exports);
    __exportStar(require_unary_operation_node(), exports);
    __exportStar(require_using_node(), exports);
    __exportStar(require_json_reference_node(), exports);
    __exportStar(require_json_path_leg_node(), exports);
    __exportStar(require_json_path_node(), exports);
    __exportStar(require_json_operator_chain_node(), exports);
    __exportStar(require_tuple_node(), exports);
    __exportStar(require_column_type(), exports);
    __exportStar(require_compilable(), exports);
    __exportStar(require_explainable(), exports);
    __exportStar(require_streamable(), exports);
    __exportStar(require_log(), exports);
    __exportStar(require_infer_result(), exports);
    var log_once_js_1 = require_log_once();
    Object.defineProperty(exports, "logOnce", { enumerable: true, get: function() {
      return log_once_js_1.logOnce;
    } });
  }
});

// node_modules/kysely-d1/dist/index.js
var require_dist = __commonJS({
  "node_modules/kysely-d1/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _D1Dialect_config;
    var _D1Driver_config;
    var _D1Connection_config;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.D1Dialect = void 0;
    var kysely_1 = require_cjs();
    var D1Dialect2 = class {
      constructor(config) {
        _D1Dialect_config.set(this, void 0);
        __classPrivateFieldSet(this, _D1Dialect_config, config, "f");
      }
      createAdapter() {
        return new kysely_1.SqliteAdapter();
      }
      createDriver() {
        return new D1Driver(__classPrivateFieldGet(this, _D1Dialect_config, "f"));
      }
      createQueryCompiler() {
        return new kysely_1.SqliteQueryCompiler();
      }
      createIntrospector(db) {
        return new kysely_1.SqliteIntrospector(db);
      }
    };
    exports.D1Dialect = D1Dialect2;
    _D1Dialect_config = /* @__PURE__ */ new WeakMap();
    var D1Driver = class {
      constructor(config) {
        _D1Driver_config.set(this, void 0);
        __classPrivateFieldSet(this, _D1Driver_config, config, "f");
      }
      async init() {
      }
      async acquireConnection() {
        return new D1Connection(__classPrivateFieldGet(this, _D1Driver_config, "f"));
      }
      async beginTransaction(conn) {
        return await conn.beginTransaction();
      }
      async commitTransaction(conn) {
        return await conn.commitTransaction();
      }
      async rollbackTransaction(conn) {
        return await conn.rollbackTransaction();
      }
      async releaseConnection(_conn) {
      }
      async destroy() {
      }
    };
    _D1Driver_config = /* @__PURE__ */ new WeakMap();
    var D1Connection = class {
      //   #transactionClient?: D1Connection
      constructor(config) {
        _D1Connection_config.set(this, void 0);
        __classPrivateFieldSet(this, _D1Connection_config, config, "f");
      }
      async executeQuery(compiledQuery) {
        const results = await __classPrivateFieldGet(this, _D1Connection_config, "f").database.prepare(compiledQuery.sql).bind(...compiledQuery.parameters).all();
        if (results.error) {
          throw new Error(results.error);
        }
        const numAffectedRows = results.meta.changes > 0 ? BigInt(results.meta.changes) : void 0;
        return {
          insertId: results.meta.last_row_id === void 0 || results.meta.last_row_id === null ? void 0 : BigInt(results.meta.last_row_id),
          rows: results?.results || [],
          numAffectedRows,
          // @ts-ignore deprecated in kysely >= 0.23, keep for backward compatibility.
          numUpdatedOrDeletedRows: numAffectedRows
        };
      }
      async beginTransaction() {
        throw new Error("Transactions are not supported yet.");
      }
      async commitTransaction() {
        throw new Error("Transactions are not supported yet.");
      }
      async rollbackTransaction() {
        throw new Error("Transactions are not supported yet.");
      }
      async *streamQuery(_compiledQuery, _chunkSize) {
        throw new Error("D1 Driver does not support streaming");
      }
    };
    _D1Connection_config = /* @__PURE__ */ new WeakMap();
  }
});

// src/index.ts
init_modules_watch_stub();
var import_fast_xml_parser = __toESM(require_fxp());

// node_modules/kysely/dist/esm/kysely.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/schema/schema.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/alter-table-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/util/object-utils.js
init_modules_watch_stub();
function isUndefined(obj) {
  return typeof obj === "undefined" || obj === void 0;
}
function isString(obj) {
  return typeof obj === "string";
}
function isNumber(obj) {
  return typeof obj === "number";
}
function isBoolean(obj) {
  return typeof obj === "boolean";
}
function isNull(obj) {
  return obj === null;
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}
function freeze(obj) {
  return Object.freeze(obj);
}
function isReadonlyArray(arg) {
  return Array.isArray(arg);
}
function noop(obj) {
  return obj;
}

// node_modules/kysely/dist/esm/operation-node/alter-table-node.js
var AlterTableNode = freeze({
  is(node) {
    return node.kind === "AlterTableNode";
  },
  create(table) {
    return freeze({
      kind: "AlterTableNode",
      table
    });
  },
  cloneWithTableProps(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumnAlteration(node, columnAlteration) {
    return freeze({
      ...node,
      columnAlterations: node.columnAlterations ? [...node.columnAlterations, columnAlteration] : [columnAlteration]
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/create-index-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/identifier-node.js
init_modules_watch_stub();
var IdentifierNode = freeze({
  is(node) {
    return node.kind === "IdentifierNode";
  },
  create(name) {
    return freeze({
      kind: "IdentifierNode",
      name
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/create-index-node.js
var CreateIndexNode = freeze({
  is(node) {
    return node.kind === "CreateIndexNode";
  },
  create(name) {
    return freeze({
      kind: "CreateIndexNode",
      name: IdentifierNode.create(name)
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithColumns(node, columns) {
    return freeze({
      ...node,
      columns: [...node.columns || [], ...columns]
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/create-schema-node.js
init_modules_watch_stub();
var CreateSchemaNode = freeze({
  is(node) {
    return node.kind === "CreateSchemaNode";
  },
  create(schema, params) {
    return freeze({
      kind: "CreateSchemaNode",
      schema: IdentifierNode.create(schema),
      ...params
    });
  },
  cloneWith(createSchema, params) {
    return freeze({
      ...createSchema,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/create-table-node.js
init_modules_watch_stub();
var ON_COMMIT_ACTIONS = ["preserve rows", "delete rows", "drop"];
var CreateTableNode = freeze({
  is(node) {
    return node.kind === "CreateTableNode";
  },
  create(table) {
    return freeze({
      kind: "CreateTableNode",
      table,
      columns: freeze([])
    });
  },
  cloneWithColumn(createTable, column) {
    return freeze({
      ...createTable,
      columns: freeze([...createTable.columns, column])
    });
  },
  cloneWithConstraint(createTable, constraint) {
    return freeze({
      ...createTable,
      constraints: createTable.constraints ? freeze([...createTable.constraints, constraint]) : freeze([constraint])
    });
  },
  cloneWithFrontModifier(createTable, modifier) {
    return freeze({
      ...createTable,
      frontModifiers: createTable.frontModifiers ? freeze([...createTable.frontModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWithEndModifier(createTable, modifier) {
    return freeze({
      ...createTable,
      endModifiers: createTable.endModifiers ? freeze([...createTable.endModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWith(createTable, params) {
    return freeze({
      ...createTable,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-index-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/schemable-identifier-node.js
init_modules_watch_stub();
var SchemableIdentifierNode = freeze({
  is(node) {
    return node.kind === "SchemableIdentifierNode";
  },
  create(identifier) {
    return freeze({
      kind: "SchemableIdentifierNode",
      identifier: IdentifierNode.create(identifier)
    });
  },
  createWithSchema(schema, identifier) {
    return freeze({
      kind: "SchemableIdentifierNode",
      schema: IdentifierNode.create(schema),
      identifier: IdentifierNode.create(identifier)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-index-node.js
var DropIndexNode = freeze({
  is(node) {
    return node.kind === "DropIndexNode";
  },
  create(name, params) {
    return freeze({
      kind: "DropIndexNode",
      name: SchemableIdentifierNode.create(name),
      ...params
    });
  },
  cloneWith(dropIndex, props) {
    return freeze({
      ...dropIndex,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-schema-node.js
init_modules_watch_stub();
var DropSchemaNode = freeze({
  is(node) {
    return node.kind === "DropSchemaNode";
  },
  create(schema, params) {
    return freeze({
      kind: "DropSchemaNode",
      schema: IdentifierNode.create(schema),
      ...params
    });
  },
  cloneWith(dropSchema, params) {
    return freeze({
      ...dropSchema,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-table-node.js
init_modules_watch_stub();
var DropTableNode = freeze({
  is(node) {
    return node.kind === "DropTableNode";
  },
  create(table, params) {
    return freeze({
      kind: "DropTableNode",
      table,
      ...params
    });
  },
  cloneWith(dropIndex, params) {
    return freeze({
      ...dropIndex,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/parser/table-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/alias-node.js
init_modules_watch_stub();
var AliasNode = freeze({
  is(node) {
    return node.kind === "AliasNode";
  },
  create(node, alias) {
    return freeze({
      kind: "AliasNode",
      node,
      alias
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/table-node.js
init_modules_watch_stub();
var TableNode = freeze({
  is(node) {
    return node.kind === "TableNode";
  },
  create(table) {
    return freeze({
      kind: "TableNode",
      table: SchemableIdentifierNode.create(table)
    });
  },
  createWithSchema(schema, table) {
    return freeze({
      kind: "TableNode",
      table: SchemableIdentifierNode.createWithSchema(schema, table)
    });
  }
});

// node_modules/kysely/dist/esm/parser/expression-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/expression/expression.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/operation-node-source.js
init_modules_watch_stub();
function isOperationNodeSource(obj) {
  return isObject(obj) && isFunction(obj.toOperationNode);
}

// node_modules/kysely/dist/esm/expression/expression.js
function isExpression(obj) {
  return isObject(obj) && "expressionType" in obj && isOperationNodeSource(obj);
}
function isAliasedExpression(obj) {
  return isObject(obj) && "expression" in obj && isString(obj.alias) && isOperationNodeSource(obj);
}

// node_modules/kysely/dist/esm/expression/expression-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/query-builder/select-query-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/select-modifier-node.js
init_modules_watch_stub();
var SelectModifierNode = freeze({
  is(node) {
    return node.kind === "SelectModifierNode";
  },
  create(modifier) {
    return freeze({
      kind: "SelectModifierNode",
      modifier
    });
  },
  createWithExpression(modifier) {
    return freeze({
      kind: "SelectModifierNode",
      rawModifier: modifier
    });
  }
});

// node_modules/kysely/dist/esm/parser/join-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/join-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/on-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/and-node.js
init_modules_watch_stub();
var AndNode = freeze({
  is(node) {
    return node.kind === "AndNode";
  },
  create(left, right) {
    return freeze({
      kind: "AndNode",
      left,
      right
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/or-node.js
init_modules_watch_stub();
var OrNode = freeze({
  is(node) {
    return node.kind === "OrNode";
  },
  create(left, right) {
    return freeze({
      kind: "OrNode",
      left,
      right
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/on-node.js
var OnNode = freeze({
  is(node) {
    return node.kind === "OnNode";
  },
  create(filter) {
    return freeze({
      kind: "OnNode",
      on: filter
    });
  },
  cloneWithOperation(onNode, operator, operation) {
    return freeze({
      ...onNode,
      on: operator === "And" ? AndNode.create(onNode.on, operation) : OrNode.create(onNode.on, operation)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/join-node.js
var JoinNode = freeze({
  is(node) {
    return node.kind === "JoinNode";
  },
  create(joinType, table) {
    return freeze({
      kind: "JoinNode",
      joinType,
      table,
      on: void 0
    });
  },
  createWithOn(joinType, table, on) {
    return freeze({
      kind: "JoinNode",
      joinType,
      table,
      on: OnNode.create(on)
    });
  },
  cloneWithOn(joinNode, operation) {
    return freeze({
      ...joinNode,
      on: joinNode.on ? OnNode.cloneWithOperation(joinNode.on, "And", operation) : OnNode.create(operation)
    });
  }
});

// node_modules/kysely/dist/esm/parser/binary-operation-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/binary-operation-node.js
init_modules_watch_stub();
var BinaryOperationNode = freeze({
  is(node) {
    return node.kind === "BinaryOperationNode";
  },
  create(leftOperand, operator, rightOperand) {
    return freeze({
      kind: "BinaryOperationNode",
      leftOperand,
      operator,
      rightOperand
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/operator-node.js
init_modules_watch_stub();
var COMPARISON_OPERATORS = [
  "=",
  "==",
  "!=",
  "<>",
  ">",
  ">=",
  "<",
  "<=",
  "in",
  "not in",
  "is",
  "is not",
  "like",
  "not like",
  "match",
  "ilike",
  "not ilike",
  "@>",
  "<@",
  "&&",
  "?",
  "?&",
  "!<",
  "!>",
  "<=>",
  "!~",
  "~",
  "~*",
  "!~*",
  "@@",
  "@@@",
  "!!",
  "<->",
  "regexp"
];
var ARITHMETIC_OPERATORS = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "^",
  "&",
  "|",
  "#",
  "<<",
  ">>"
];
var JSON_OPERATORS = ["->", "->>"];
var BINARY_OPERATORS = [
  ...COMPARISON_OPERATORS,
  ...ARITHMETIC_OPERATORS,
  "&&",
  "||"
];
var UNARY_FILTER_OPERATORS = ["exists", "not exists"];
var UNARY_OPERATORS = ["not", "-", ...UNARY_FILTER_OPERATORS];
var OPERATORS = [
  ...BINARY_OPERATORS,
  ...JSON_OPERATORS,
  ...UNARY_OPERATORS,
  "between",
  "between symmetric"
];
var OperatorNode = freeze({
  is(node) {
    return node.kind === "OperatorNode";
  },
  create(operator) {
    return freeze({
      kind: "OperatorNode",
      operator
    });
  }
});
function isJSONOperator(op) {
  return isString(op) && JSON_OPERATORS.includes(op);
}

// node_modules/kysely/dist/esm/parser/reference-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/column-node.js
init_modules_watch_stub();
var ColumnNode = freeze({
  is(node) {
    return node.kind === "ColumnNode";
  },
  create(column) {
    return freeze({
      kind: "ColumnNode",
      column: IdentifierNode.create(column)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/reference-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/select-all-node.js
init_modules_watch_stub();
var SelectAllNode = freeze({
  is(node) {
    return node.kind === "SelectAllNode";
  },
  create() {
    return freeze({
      kind: "SelectAllNode"
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/reference-node.js
var ReferenceNode = freeze({
  is(node) {
    return node.kind === "ReferenceNode";
  },
  create(column, table) {
    return freeze({
      kind: "ReferenceNode",
      table,
      column
    });
  },
  createSelectAll(table) {
    return freeze({
      kind: "ReferenceNode",
      table,
      column: SelectAllNode.create()
    });
  }
});

// node_modules/kysely/dist/esm/parser/order-by-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/dynamic/dynamic-reference-builder.js
init_modules_watch_stub();
var DynamicReferenceBuilder = class {
  #dynamicReference;
  get dynamicReference() {
    return this.#dynamicReference;
  }
  /**
   * @private
   *
   * This needs to be here just so that the typings work. Without this
   * the generated .d.ts file contains no reference to the type param R
   * which causes this type to be equal to DynamicReferenceBuilder with
   * any R.
   */
  get refType() {
    return void 0;
  }
  constructor(reference) {
    this.#dynamicReference = reference;
  }
  toOperationNode() {
    return parseSimpleReferenceExpression(this.#dynamicReference);
  }
};
function isDynamicReferenceBuilder(obj) {
  return isObject(obj) && isOperationNodeSource(obj) && isString(obj.dynamicReference);
}

// node_modules/kysely/dist/esm/operation-node/order-by-item-node.js
init_modules_watch_stub();
var OrderByItemNode = freeze({
  is(node) {
    return node.kind === "OrderByItemNode";
  },
  create(orderBy, direction) {
    return freeze({
      kind: "OrderByItemNode",
      orderBy,
      direction
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/raw-node.js
init_modules_watch_stub();
var RawNode = freeze({
  is(node) {
    return node.kind === "RawNode";
  },
  create(sqlFragments, parameters) {
    return freeze({
      kind: "RawNode",
      sqlFragments: freeze(sqlFragments),
      parameters: freeze(parameters)
    });
  },
  createWithSql(sql) {
    return RawNode.create([sql], []);
  },
  createWithChild(child) {
    return RawNode.create(["", ""], [child]);
  },
  createWithChildren(children) {
    return RawNode.create(new Array(children.length + 1).fill(""), children);
  }
});

// node_modules/kysely/dist/esm/parser/order-by-parser.js
function isOrderByDirection(thing) {
  return thing === "asc" || thing === "desc";
}
function parseOrderBy(args) {
  if (args.length === 2) {
    return [parseOrderByItem(args[0], args[1])];
  }
  if (args.length === 1) {
    const [orderBy] = args;
    if (Array.isArray(orderBy)) {
      return orderBy.map((item) => parseOrderByItem(item));
    }
    return [parseOrderByItem(orderBy)];
  }
  throw new Error(`Invalid number of arguments at order by! expected 1-2, received ${args.length}`);
}
function parseOrderByItem(ref, direction) {
  const parsedRef = parseOrderByExpression(ref);
  if (OrderByItemNode.is(parsedRef)) {
    if (direction) {
      throw new Error("Cannot specify direction twice!");
    }
    return parsedRef;
  }
  return OrderByItemNode.create(parsedRef, parseOrderByDirectionExpression(direction));
}
function parseOrderByExpression(expr) {
  if (isExpressionOrFactory(expr)) {
    return parseExpression(expr);
  }
  if (isDynamicReferenceBuilder(expr)) {
    return expr.toOperationNode();
  }
  const [ref, direction] = expr.split(" ");
  if (direction) {
    if (!isOrderByDirection(direction)) {
      throw new Error(`Invalid order by direction: ${direction}`);
    }
    return OrderByItemNode.create(parseStringReference(ref), parseOrderByDirectionExpression(direction));
  }
  return parseStringReference(expr);
}
function parseOrderByDirectionExpression(expr) {
  if (!expr) {
    return void 0;
  }
  if (expr === "asc" || expr === "desc") {
    return RawNode.createWithSql(expr);
  }
  return expr.toOperationNode();
}

// node_modules/kysely/dist/esm/operation-node/json-reference-node.js
init_modules_watch_stub();
var JSONReferenceNode = freeze({
  is(node) {
    return node.kind === "JSONReferenceNode";
  },
  create(reference, traversal) {
    return freeze({
      kind: "JSONReferenceNode",
      reference,
      traversal
    });
  },
  cloneWithTraversal(node, traversal) {
    return freeze({
      ...node,
      traversal
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/json-operator-chain-node.js
init_modules_watch_stub();
var JSONOperatorChainNode = freeze({
  is(node) {
    return node.kind === "JSONOperatorChainNode";
  },
  create(operator) {
    return freeze({
      kind: "JSONOperatorChainNode",
      operator,
      values: freeze([])
    });
  },
  cloneWithValue(node, value) {
    return freeze({
      ...node,
      values: freeze([...node.values, value])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/json-path-node.js
init_modules_watch_stub();
var JSONPathNode = freeze({
  is(node) {
    return node.kind === "JSONPathNode";
  },
  create(inOperator) {
    return freeze({
      kind: "JSONPathNode",
      inOperator,
      pathLegs: freeze([])
    });
  },
  cloneWithLeg(jsonPathNode, pathLeg) {
    return freeze({
      ...jsonPathNode,
      pathLegs: freeze([...jsonPathNode.pathLegs, pathLeg])
    });
  }
});

// node_modules/kysely/dist/esm/parser/reference-parser.js
function parseSimpleReferenceExpression(exp) {
  if (isString(exp)) {
    return parseStringReference(exp);
  }
  return exp.toOperationNode();
}
function parseReferenceExpressionOrList(arg) {
  if (isReadonlyArray(arg)) {
    return arg.map((it) => parseReferenceExpression(it));
  } else {
    return [parseReferenceExpression(arg)];
  }
}
function parseReferenceExpression(exp) {
  if (isExpressionOrFactory(exp)) {
    return parseExpression(exp);
  }
  return parseSimpleReferenceExpression(exp);
}
function parseJSONReference(ref, op) {
  const referenceNode = parseStringReference(ref);
  if (isJSONOperator(op)) {
    return JSONReferenceNode.create(referenceNode, JSONOperatorChainNode.create(OperatorNode.create(op)));
  }
  const opWithoutLastChar = op.slice(0, -1);
  if (isJSONOperator(opWithoutLastChar)) {
    return JSONReferenceNode.create(referenceNode, JSONPathNode.create(OperatorNode.create(opWithoutLastChar)));
  }
  throw new Error(`Invalid JSON operator: ${op}`);
}
function parseStringReference(ref) {
  const COLUMN_SEPARATOR = ".";
  if (!ref.includes(COLUMN_SEPARATOR)) {
    return ReferenceNode.create(ColumnNode.create(ref));
  }
  const parts = ref.split(COLUMN_SEPARATOR).map(trim);
  if (parts.length === 3) {
    return parseStringReferenceWithTableAndSchema(parts);
  }
  if (parts.length === 2) {
    return parseStringReferenceWithTable(parts);
  }
  throw new Error(`invalid column reference ${ref}`);
}
function parseAliasedStringReference(ref) {
  const ALIAS_SEPARATOR = " as ";
  if (ref.includes(ALIAS_SEPARATOR)) {
    const [columnRef, alias] = ref.split(ALIAS_SEPARATOR).map(trim);
    return AliasNode.create(parseStringReference(columnRef), IdentifierNode.create(alias));
  } else {
    return parseStringReference(ref);
  }
}
function parseColumnName(column) {
  return ColumnNode.create(column);
}
function parseOrderedColumnName(column) {
  const ORDER_SEPARATOR = " ";
  if (column.includes(ORDER_SEPARATOR)) {
    const [columnName, order] = column.split(ORDER_SEPARATOR).map(trim);
    if (!isOrderByDirection(order)) {
      throw new Error(`invalid order direction "${order}" next to "${columnName}"`);
    }
    return parseOrderBy([columnName, order])[0];
  } else {
    return parseColumnName(column);
  }
}
function parseStringReferenceWithTableAndSchema(parts) {
  const [schema, table, column] = parts;
  return ReferenceNode.create(ColumnNode.create(column), TableNode.createWithSchema(schema, table));
}
function parseStringReferenceWithTable(parts) {
  const [table, column] = parts;
  return ReferenceNode.create(ColumnNode.create(column), TableNode.create(table));
}
function trim(str) {
  return str.trim();
}

// node_modules/kysely/dist/esm/parser/value-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/primitive-value-list-node.js
init_modules_watch_stub();
var PrimitiveValueListNode = freeze({
  is(node) {
    return node.kind === "PrimitiveValueListNode";
  },
  create(values) {
    return freeze({
      kind: "PrimitiveValueListNode",
      values: freeze([...values])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/value-list-node.js
init_modules_watch_stub();
var ValueListNode = freeze({
  is(node) {
    return node.kind === "ValueListNode";
  },
  create(values) {
    return freeze({
      kind: "ValueListNode",
      values: freeze(values)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/value-node.js
init_modules_watch_stub();
var ValueNode = freeze({
  is(node) {
    return node.kind === "ValueNode";
  },
  create(value) {
    return freeze({
      kind: "ValueNode",
      value
    });
  },
  createImmediate(value) {
    return freeze({
      kind: "ValueNode",
      value,
      immediate: true
    });
  }
});

// node_modules/kysely/dist/esm/parser/value-parser.js
function parseValueExpressionOrList(arg) {
  if (isReadonlyArray(arg)) {
    return parseValueExpressionList(arg);
  }
  return parseValueExpression(arg);
}
function parseValueExpression(exp) {
  if (isExpressionOrFactory(exp)) {
    return parseExpression(exp);
  }
  return ValueNode.create(exp);
}
function isSafeImmediateValue(value) {
  return isNumber(value) || isBoolean(value) || isNull(value);
}
function parseSafeImmediateValue(value) {
  if (!isSafeImmediateValue(value)) {
    throw new Error(`unsafe immediate value ${JSON.stringify(value)}`);
  }
  return ValueNode.createImmediate(value);
}
function parseValueExpressionList(arg) {
  if (arg.some(isExpressionOrFactory)) {
    return ValueListNode.create(arg.map((it) => parseValueExpression(it)));
  }
  return PrimitiveValueListNode.create(arg);
}

// node_modules/kysely/dist/esm/operation-node/parens-node.js
init_modules_watch_stub();
var ParensNode = freeze({
  is(node) {
    return node.kind === "ParensNode";
  },
  create(node) {
    return freeze({
      kind: "ParensNode",
      node
    });
  }
});

// node_modules/kysely/dist/esm/parser/binary-operation-parser.js
function parseValueBinaryOperationOrExpression(args) {
  if (args.length === 3) {
    return parseValueBinaryOperation(args[0], args[1], args[2]);
  } else if (args.length === 1) {
    return parseValueExpression(args[0]);
  }
  throw new Error(`invalid arguments: ${JSON.stringify(args)}`);
}
function parseValueBinaryOperation(left, operator, right) {
  if (isIsOperator(operator) && needsIsOperator(right)) {
    return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), ValueNode.createImmediate(right));
  }
  return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseValueExpressionOrList(right));
}
function parseReferentialBinaryOperation(left, operator, right) {
  return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseReferenceExpression(right));
}
function parseFilterObject(obj, combinator) {
  return parseFilterList(Object.entries(obj).filter(([, v]) => !isUndefined(v)).map(([k, v]) => parseValueBinaryOperation(k, needsIsOperator(v) ? "is" : "=", v)), combinator);
}
function parseFilterList(list, combinator) {
  const combine = combinator === "and" ? AndNode.create : OrNode.create;
  if (list.length === 0) {
    return ValueNode.createImmediate(combinator === "and");
  }
  let node = toOperationNode(list[0]);
  for (let i = 1; i < list.length; ++i) {
    node = combine(node, toOperationNode(list[i]));
  }
  if (list.length > 1) {
    return ParensNode.create(node);
  }
  return node;
}
function isIsOperator(operator) {
  return operator === "is" || operator === "is not";
}
function needsIsOperator(value) {
  return isNull(value) || isBoolean(value);
}
function parseOperator(operator) {
  if (isString(operator) && OPERATORS.includes(operator)) {
    return OperatorNode.create(operator);
  }
  if (isOperationNodeSource(operator)) {
    return operator.toOperationNode();
  }
  throw new Error(`invalid operator ${JSON.stringify(operator)}`);
}
function toOperationNode(nodeOrSource) {
  return isOperationNodeSource(nodeOrSource) ? nodeOrSource.toOperationNode() : nodeOrSource;
}

// node_modules/kysely/dist/esm/parser/parse-utils.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/over-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/order-by-node.js
init_modules_watch_stub();
var OrderByNode = freeze({
  is(node) {
    return node.kind === "OrderByNode";
  },
  create(items) {
    return freeze({
      kind: "OrderByNode",
      items: freeze([...items])
    });
  },
  cloneWithItems(orderBy, items) {
    return freeze({
      ...orderBy,
      items: freeze([...orderBy.items, ...items])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/partition-by-node.js
init_modules_watch_stub();
var PartitionByNode = freeze({
  is(node) {
    return node.kind === "PartitionByNode";
  },
  create(items) {
    return freeze({
      kind: "PartitionByNode",
      items: freeze(items)
    });
  },
  cloneWithItems(partitionBy, items) {
    return freeze({
      ...partitionBy,
      items: freeze([...partitionBy.items, ...items])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/over-node.js
var OverNode = freeze({
  is(node) {
    return node.kind === "OverNode";
  },
  create() {
    return freeze({
      kind: "OverNode"
    });
  },
  cloneWithOrderByItems(overNode, items) {
    return freeze({
      ...overNode,
      orderBy: overNode.orderBy ? OrderByNode.cloneWithItems(overNode.orderBy, items) : OrderByNode.create(items)
    });
  },
  cloneWithPartitionByItems(overNode, items) {
    return freeze({
      ...overNode,
      partitionBy: overNode.partitionBy ? PartitionByNode.cloneWithItems(overNode.partitionBy, items) : PartitionByNode.create(items)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/select-query-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/from-node.js
init_modules_watch_stub();
var FromNode = freeze({
  is(node) {
    return node.kind === "FromNode";
  },
  create(froms) {
    return freeze({
      kind: "FromNode",
      froms: freeze(froms)
    });
  },
  cloneWithFroms(from, froms) {
    return freeze({
      ...from,
      froms: freeze([...from.froms, ...froms])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/group-by-node.js
init_modules_watch_stub();
var GroupByNode = freeze({
  is(node) {
    return node.kind === "GroupByNode";
  },
  create(items) {
    return freeze({
      kind: "GroupByNode",
      items: freeze(items)
    });
  },
  cloneWithItems(groupBy, items) {
    return freeze({
      ...groupBy,
      items: freeze([...groupBy.items, ...items])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/having-node.js
init_modules_watch_stub();
var HavingNode = freeze({
  is(node) {
    return node.kind === "HavingNode";
  },
  create(filter) {
    return freeze({
      kind: "HavingNode",
      having: filter
    });
  },
  cloneWithOperation(havingNode, operator, operation) {
    return freeze({
      ...havingNode,
      having: operator === "And" ? AndNode.create(havingNode.having, operation) : OrNode.create(havingNode.having, operation)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/select-query-node.js
var SelectQueryNode = freeze({
  is(node) {
    return node.kind === "SelectQueryNode";
  },
  create(withNode) {
    return freeze({
      kind: "SelectQueryNode",
      ...withNode && { with: withNode }
    });
  },
  createFrom(fromItems, withNode) {
    return freeze({
      kind: "SelectQueryNode",
      from: FromNode.create(fromItems),
      ...withNode && { with: withNode }
    });
  },
  cloneWithSelections(select, selections) {
    return freeze({
      ...select,
      selections: select.selections ? freeze([...select.selections, ...selections]) : freeze(selections)
    });
  },
  cloneWithDistinctOn(select, expressions) {
    return freeze({
      ...select,
      distinctOn: select.distinctOn ? freeze([...select.distinctOn, ...expressions]) : freeze(expressions)
    });
  },
  cloneWithFrontModifier(select, modifier) {
    return freeze({
      ...select,
      frontModifiers: select.frontModifiers ? freeze([...select.frontModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWithEndModifier(select, modifier) {
    return freeze({
      ...select,
      endModifiers: select.endModifiers ? freeze([...select.endModifiers, modifier]) : freeze([modifier])
    });
  },
  cloneWithOrderByItems(selectNode, items) {
    return freeze({
      ...selectNode,
      orderBy: selectNode.orderBy ? OrderByNode.cloneWithItems(selectNode.orderBy, items) : OrderByNode.create(items)
    });
  },
  cloneWithGroupByItems(selectNode, items) {
    return freeze({
      ...selectNode,
      groupBy: selectNode.groupBy ? GroupByNode.cloneWithItems(selectNode.groupBy, items) : GroupByNode.create(items)
    });
  },
  cloneWithLimit(selectNode, limit) {
    return freeze({
      ...selectNode,
      limit
    });
  },
  cloneWithOffset(selectNode, offset) {
    return freeze({
      ...selectNode,
      offset
    });
  },
  cloneWithHaving(selectNode, operation) {
    return freeze({
      ...selectNode,
      having: selectNode.having ? HavingNode.cloneWithOperation(selectNode.having, "And", operation) : HavingNode.create(operation)
    });
  },
  cloneWithSetOperations(selectNode, setOperations) {
    return freeze({
      ...selectNode,
      setOperations: selectNode.setOperations ? freeze([...selectNode.setOperations, ...setOperations]) : freeze([...setOperations])
    });
  },
  cloneWithoutSelections(select) {
    return freeze({
      ...select,
      selections: []
    });
  },
  cloneWithoutLimit(select) {
    return freeze({
      ...select,
      limit: void 0
    });
  },
  cloneWithoutOffset(select) {
    return freeze({
      ...select,
      offset: void 0
    });
  },
  cloneWithoutOrderBy(select) {
    return freeze({
      ...select,
      orderBy: void 0
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/join-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/util/prevent-await.js
init_modules_watch_stub();
function preventAwait(clazz, message) {
  Object.defineProperties(clazz.prototype, {
    then: {
      enumerable: false,
      value: () => {
        throw new Error(message);
      }
    }
  });
}

// node_modules/kysely/dist/esm/query-builder/join-builder.js
var JoinBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  on(...args) {
    return new JoinBuilder({
      ...this.#props,
      joinNode: JoinNode.cloneWithOn(this.#props.joinNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  /**
   * Just like {@link WhereInterface.whereRef} but adds an item to the join's
   * `on` clause instead.
   *
   * See {@link WhereInterface.whereRef} for documentation and examples.
   */
  onRef(lhs, op, rhs) {
    return new JoinBuilder({
      ...this.#props,
      joinNode: JoinNode.cloneWithOn(this.#props.joinNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  /**
   * Adds `on true`.
   */
  onTrue() {
    return new JoinBuilder({
      ...this.#props,
      joinNode: JoinNode.cloneWithOn(this.#props.joinNode, RawNode.createWithSql("true"))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.joinNode;
  }
};
preventAwait(JoinBuilder, "don't await JoinBuilder instances. They are never executed directly and are always just a part of a query.");

// node_modules/kysely/dist/esm/query-builder/over-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/parser/partition-by-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/partition-by-item-node.js
init_modules_watch_stub();
var PartitionByItemNode = freeze({
  is(node) {
    return node.kind === "PartitionByItemNode";
  },
  create(partitionBy) {
    return freeze({
      kind: "PartitionByItemNode",
      partitionBy
    });
  }
});

// node_modules/kysely/dist/esm/parser/partition-by-parser.js
function parsePartitionBy(partitionBy) {
  return parseReferenceExpressionOrList(partitionBy).map(PartitionByItemNode.create);
}

// node_modules/kysely/dist/esm/query-builder/over-builder.js
var OverBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds an order by clause item inside the over function.
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.avg<number>('age').over(
   *       ob => ob.orderBy('first_name', 'asc').orderBy('last_name', 'asc')
   *     ).as('average_age')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select avg("age") over(order by "first_name" asc, "last_name" asc) as "average_age"
   * from "person"
   * ```
   */
  orderBy(orderBy, direction) {
    return new OverBuilder({
      overNode: OverNode.cloneWithOrderByItems(this.#props.overNode, parseOrderBy([orderBy, direction]))
    });
  }
  partitionBy(partitionBy) {
    return new OverBuilder({
      overNode: OverNode.cloneWithPartitionByItems(this.#props.overNode, parsePartitionBy(partitionBy))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.overNode;
  }
};
preventAwait(OverBuilder, "don't await OverBuilder instances. They are never executed directly and are always just a part of a query.");

// node_modules/kysely/dist/esm/query-creator.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/query-builder/insert-query-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/parser/select-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/selection-node.js
init_modules_watch_stub();
var SelectionNode = freeze({
  is(node) {
    return node.kind === "SelectionNode";
  },
  create(selection) {
    return freeze({
      kind: "SelectionNode",
      selection
    });
  },
  createSelectAll() {
    return freeze({
      kind: "SelectionNode",
      selection: SelectAllNode.create()
    });
  },
  createSelectAllFromTable(table) {
    return freeze({
      kind: "SelectionNode",
      selection: ReferenceNode.createSelectAll(table)
    });
  }
});

// node_modules/kysely/dist/esm/parser/select-parser.js
function parseSelectArg(selection) {
  if (isFunction(selection)) {
    return parseSelectArg(selection(expressionBuilder()));
  } else if (isReadonlyArray(selection)) {
    return selection.map((it) => parseSelectExpression(it));
  } else {
    return [parseSelectExpression(selection)];
  }
}
function parseSelectExpression(selection) {
  if (isString(selection)) {
    return SelectionNode.create(parseAliasedStringReference(selection));
  } else if (isDynamicReferenceBuilder(selection)) {
    return SelectionNode.create(selection.toOperationNode());
  } else {
    return SelectionNode.create(parseAliasedExpression(selection));
  }
}
function parseSelectAll(table) {
  if (!table) {
    return [SelectionNode.createSelectAll()];
  } else if (Array.isArray(table)) {
    return table.map(parseSelectAllArg);
  } else {
    return [parseSelectAllArg(table)];
  }
}
function parseSelectAllArg(table) {
  if (isString(table)) {
    return SelectionNode.createSelectAllFromTable(parseTable(table));
  }
  throw new Error(`invalid value selectAll expression: ${JSON.stringify(table)}`);
}

// node_modules/kysely/dist/esm/parser/insert-values-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/values-node.js
init_modules_watch_stub();
var ValuesNode = freeze({
  is(node) {
    return node.kind === "ValuesNode";
  },
  create(values) {
    return freeze({
      kind: "ValuesNode",
      values: freeze(values)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/default-insert-value-node.js
init_modules_watch_stub();
var DefaultInsertValueNode = freeze({
  is(node) {
    return node.kind === "DefaultInsertValueNode";
  },
  create() {
    return freeze({
      kind: "DefaultInsertValueNode"
    });
  }
});

// node_modules/kysely/dist/esm/parser/insert-values-parser.js
function parseInsertExpression(arg) {
  const objectOrList = isFunction(arg) ? arg(expressionBuilder()) : arg;
  const list = isReadonlyArray(objectOrList) ? objectOrList : freeze([objectOrList]);
  return parseInsertColumnsAndValues(list);
}
function parseInsertColumnsAndValues(rows) {
  const columns = parseColumnNamesAndIndexes(rows);
  return [
    freeze([...columns.keys()].map(ColumnNode.create)),
    ValuesNode.create(rows.map((row) => parseRowValues(row, columns)))
  ];
}
function parseColumnNamesAndIndexes(rows) {
  const columns = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const cols = Object.keys(row);
    for (const col of cols) {
      if (!columns.has(col) && row[col] !== void 0) {
        columns.set(col, columns.size);
      }
    }
  }
  return columns;
}
function parseRowValues(row, columns) {
  const rowColumns = Object.keys(row);
  const rowValues = Array.from({
    length: columns.size
  });
  let hasUndefinedOrComplexColumns = false;
  for (const col of rowColumns) {
    const columnIdx = columns.get(col);
    if (isUndefined(columnIdx)) {
      continue;
    }
    const value = row[col];
    if (isUndefined(value) || isExpressionOrFactory(value)) {
      hasUndefinedOrComplexColumns = true;
    }
    rowValues[columnIdx] = value;
  }
  const hasMissingColumns = rowColumns.length < columns.size;
  if (hasMissingColumns || hasUndefinedOrComplexColumns) {
    const defaultValue = DefaultInsertValueNode.create();
    return ValueListNode.create(rowValues.map((it) => isUndefined(it) ? defaultValue : parseValueExpression(it)));
  }
  return PrimitiveValueListNode.create(rowValues);
}

// node_modules/kysely/dist/esm/operation-node/insert-query-node.js
init_modules_watch_stub();
var InsertQueryNode = freeze({
  is(node) {
    return node.kind === "InsertQueryNode";
  },
  create(into, withNode, replace) {
    return freeze({
      kind: "InsertQueryNode",
      into,
      ...withNode && { with: withNode },
      replace
    });
  },
  cloneWith(insertQuery, props) {
    return freeze({
      ...insertQuery,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/query-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/update-query-node.js
init_modules_watch_stub();
var UpdateQueryNode = freeze({
  is(node) {
    return node.kind === "UpdateQueryNode";
  },
  create(table, withNode) {
    return freeze({
      kind: "UpdateQueryNode",
      table,
      ...withNode && { with: withNode }
    });
  },
  cloneWithFromItems(updateQuery, fromItems) {
    return freeze({
      ...updateQuery,
      from: updateQuery.from ? FromNode.cloneWithFroms(updateQuery.from, fromItems) : FromNode.create(fromItems)
    });
  },
  cloneWithUpdates(updateQuery, updates) {
    return freeze({
      ...updateQuery,
      updates: updateQuery.updates ? freeze([...updateQuery.updates, ...updates]) : updates
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/delete-query-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/using-node.js
init_modules_watch_stub();
var UsingNode = freeze({
  is(node) {
    return node.kind === "UsingNode";
  },
  create(tables) {
    return freeze({
      kind: "UsingNode",
      tables: freeze(tables)
    });
  },
  cloneWithTables(using, tables) {
    return freeze({
      ...using,
      tables: freeze([...using.tables, ...tables])
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/delete-query-node.js
var DeleteQueryNode = freeze({
  is(node) {
    return node.kind === "DeleteQueryNode";
  },
  create(fromItems, withNode) {
    return freeze({
      kind: "DeleteQueryNode",
      from: FromNode.create(fromItems),
      ...withNode && { with: withNode }
    });
  },
  cloneWithOrderByItems(deleteNode, items) {
    return freeze({
      ...deleteNode,
      orderBy: deleteNode.orderBy ? OrderByNode.cloneWithItems(deleteNode.orderBy, items) : OrderByNode.create(items)
    });
  },
  cloneWithLimit(deleteNode, limit) {
    return freeze({
      ...deleteNode,
      limit
    });
  },
  cloneWithUsing(deleteNode, tables) {
    return freeze({
      ...deleteNode,
      using: deleteNode.using !== void 0 ? UsingNode.cloneWithTables(deleteNode.using, tables) : UsingNode.create(tables)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/where-node.js
init_modules_watch_stub();
var WhereNode = freeze({
  is(node) {
    return node.kind === "WhereNode";
  },
  create(filter) {
    return freeze({
      kind: "WhereNode",
      where: filter
    });
  },
  cloneWithOperation(whereNode, operator, operation) {
    return freeze({
      ...whereNode,
      where: operator === "And" ? AndNode.create(whereNode.where, operation) : OrNode.create(whereNode.where, operation)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/returning-node.js
init_modules_watch_stub();
var ReturningNode = freeze({
  is(node) {
    return node.kind === "ReturningNode";
  },
  create(selections) {
    return freeze({
      kind: "ReturningNode",
      selections: freeze(selections)
    });
  },
  cloneWithSelections(returning, selections) {
    return freeze({
      ...returning,
      selections: returning.selections ? freeze([...returning.selections, ...selections]) : freeze(selections)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/explain-node.js
init_modules_watch_stub();
var ExplainNode = freeze({
  is(node) {
    return node.kind === "ExplainNode";
  },
  create(format, options) {
    return freeze({
      kind: "ExplainNode",
      format,
      options
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/query-node.js
var QueryNode = freeze({
  is(node) {
    return SelectQueryNode.is(node) || InsertQueryNode.is(node) || UpdateQueryNode.is(node) || DeleteQueryNode.is(node);
  },
  cloneWithWhere(node, operation) {
    return freeze({
      ...node,
      where: node.where ? WhereNode.cloneWithOperation(node.where, "And", operation) : WhereNode.create(operation)
    });
  },
  cloneWithJoin(node, join) {
    return freeze({
      ...node,
      joins: node.joins ? freeze([...node.joins, join]) : freeze([join])
    });
  },
  cloneWithReturning(node, selections) {
    return freeze({
      ...node,
      returning: node.returning ? ReturningNode.cloneWithSelections(node.returning, selections) : ReturningNode.create(selections)
    });
  },
  cloneWithoutWhere(node) {
    return freeze({
      ...node,
      where: void 0
    });
  },
  cloneWithExplain(node, format, options) {
    return freeze({
      ...node,
      explain: ExplainNode.create(format, options?.toOperationNode())
    });
  }
});

// node_modules/kysely/dist/esm/parser/update-set-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/column-update-node.js
init_modules_watch_stub();
var ColumnUpdateNode = freeze({
  is(node) {
    return node.kind === "ColumnUpdateNode";
  },
  create(column, value) {
    return freeze({
      kind: "ColumnUpdateNode",
      column,
      value
    });
  }
});

// node_modules/kysely/dist/esm/parser/update-set-parser.js
function parseUpdateExpression(update) {
  const updateObj = isFunction(update) ? update(expressionBuilder()) : update;
  return Object.entries(updateObj).filter(([_, value]) => value !== void 0).map(([key, value]) => {
    return ColumnUpdateNode.create(ColumnNode.create(key), parseValueExpression(value));
  });
}

// node_modules/kysely/dist/esm/operation-node/on-duplicate-key-node.js
init_modules_watch_stub();
var OnDuplicateKeyNode = freeze({
  is(node) {
    return node.kind === "OnDuplicateKeyNode";
  },
  create(updates) {
    return freeze({
      kind: "OnDuplicateKeyNode",
      updates
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/insert-result.js
init_modules_watch_stub();
var InsertResult = class {
  /**
   * The auto incrementing primary key
   */
  insertId;
  /**
   * Affected rows count.
   */
  numInsertedOrUpdatedRows;
  constructor(insertId, numInsertedOrUpdatedRows) {
    this.insertId = insertId;
    this.numInsertedOrUpdatedRows = numInsertedOrUpdatedRows;
  }
};

// node_modules/kysely/dist/esm/query-builder/no-result-error.js
init_modules_watch_stub();
var NoResultError = class extends Error {
  /**
   * The operation node tree of the query that was executed.
   */
  node;
  constructor(node) {
    super("no result");
    this.node = node;
  }
};
function isNoResultErrorConstructor(fn) {
  return Object.prototype.hasOwnProperty.call(fn, "prototype");
}

// node_modules/kysely/dist/esm/query-builder/on-conflict-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/on-conflict-node.js
init_modules_watch_stub();
var OnConflictNode = freeze({
  is(node) {
    return node.kind === "OnConflictNode";
  },
  create() {
    return freeze({
      kind: "OnConflictNode"
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  },
  cloneWithIndexWhere(node, operation) {
    return freeze({
      ...node,
      indexWhere: node.indexWhere ? WhereNode.cloneWithOperation(node.indexWhere, "And", operation) : WhereNode.create(operation)
    });
  },
  cloneWithIndexOrWhere(node, operation) {
    return freeze({
      ...node,
      indexWhere: node.indexWhere ? WhereNode.cloneWithOperation(node.indexWhere, "Or", operation) : WhereNode.create(operation)
    });
  },
  cloneWithUpdateWhere(node, operation) {
    return freeze({
      ...node,
      updateWhere: node.updateWhere ? WhereNode.cloneWithOperation(node.updateWhere, "And", operation) : WhereNode.create(operation)
    });
  },
  cloneWithUpdateOrWhere(node, operation) {
    return freeze({
      ...node,
      updateWhere: node.updateWhere ? WhereNode.cloneWithOperation(node.updateWhere, "Or", operation) : WhereNode.create(operation)
    });
  },
  cloneWithoutIndexWhere(node) {
    return freeze({
      ...node,
      indexWhere: void 0
    });
  },
  cloneWithoutUpdateWhere(node) {
    return freeze({
      ...node,
      updateWhere: void 0
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/on-conflict-builder.js
var OnConflictBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Specify a single column as the conflict target.
   *
   * Also see the {@link columns}, {@link constraint} and {@link expression}
   * methods for alternative ways to specify the conflict target.
   */
  column(column) {
    const columnNode = ColumnNode.create(column);
    return new OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        columns: this.#props.onConflictNode.columns ? freeze([...this.#props.onConflictNode.columns, columnNode]) : freeze([columnNode])
      })
    });
  }
  /**
   * Specify a list of columns as the conflict target.
   *
   * Also see the {@link column}, {@link constraint} and {@link expression}
   * methods for alternative ways to specify the conflict target.
   */
  columns(columns) {
    const columnNodes = columns.map(ColumnNode.create);
    return new OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        columns: this.#props.onConflictNode.columns ? freeze([...this.#props.onConflictNode.columns, ...columnNodes]) : freeze(columnNodes)
      })
    });
  }
  /**
   * Specify a specific constraint by name as the conflict target.
   *
   * Also see the {@link column}, {@link columns} and {@link expression}
   * methods for alternative ways to specify the conflict target.
   */
  constraint(constraintName) {
    return new OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        constraint: IdentifierNode.create(constraintName)
      })
    });
  }
  /**
   * Specify an expression as the conflict target.
   *
   * This can be used if the unique index is an expression index.
   *
   * Also see the {@link column}, {@link columns} and {@link constraint}
   * methods for alternative ways to specify the conflict target.
   */
  expression(expression) {
    return new OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        indexExpression: expression.toOperationNode()
      })
    });
  }
  where(...args) {
    return new OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  /**
   * Specify an index predicate for the index target.
   *
   * See {@link WhereInterface.whereRef} for more info.
   */
  whereRef(lhs, op, rhs) {
    return new OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new OnConflictBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithoutIndexWhere(this.#props.onConflictNode)
    });
  }
  /**
   * Adds the "do nothing" conflict action.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .insertInto('person')
   *   .values({ first_name, pic })
   *   .onConflict((oc) => oc
   *     .column('pic')
   *     .doNothing()
   *   )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "pic")
   * values ($1, $2)
   * on conflict ("pic") do nothing
   * ```
   */
  doNothing() {
    return new OnConflictDoNothingBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        doNothing: true
      })
    });
  }
  /**
   * Adds the "do update set" conflict action.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .insertInto('person')
   *   .values({ first_name, pic })
   *   .onConflict((oc) => oc
   *     .column('pic')
   *     .doUpdateSet({ first_name })
   *   )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "pic")
   * values ($1, $2)
   * on conflict ("pic")
   * do update set "first_name" = $3
   * ```
   *
   * In the next example we use the `ref` method to reference
   * columns of the virtual table `excluded` in a type-safe way
   * to create an upsert operation:
   *
   * ```ts
   * db.insertInto('person')
   *   .values(person)
   *   .onConflict((oc) => oc
   *     .column('id')
   *     .doUpdateSet((eb) => ({
   *       first_name: eb.ref('excluded.first_name'),
   *       last_name: eb.ref('excluded.last_name')
   *     }))
   *   )
   * ```
   */
  doUpdateSet(update) {
    return new OnConflictUpdateBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWith(this.#props.onConflictNode, {
        updates: parseUpdateExpression(update)
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
};
preventAwait(OnConflictBuilder, "don't await OnConflictBuilder instances.");
var OnConflictDoNothingBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  toOperationNode() {
    return this.#props.onConflictNode;
  }
};
preventAwait(OnConflictDoNothingBuilder, "don't await OnConflictDoNothingBuilder instances.");
var OnConflictUpdateBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  where(...args) {
    return new OnConflictUpdateBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  /**
   * Specify a where condition for the update operation.
   *
   * See {@link WhereInterface.whereRef} for more info.
   */
  whereRef(lhs, op, rhs) {
    return new OnConflictUpdateBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new OnConflictUpdateBuilder({
      ...this.#props,
      onConflictNode: OnConflictNode.cloneWithoutUpdateWhere(this.#props.onConflictNode)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.onConflictNode;
  }
};
preventAwait(OnConflictUpdateBuilder, "don't await OnConflictUpdateBuilder instances.");

// node_modules/kysely/dist/esm/query-builder/insert-query-builder.js
var InsertQueryBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  values(insert) {
    const [columns, values] = parseInsertExpression(insert);
    return new InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        columns,
        values
      })
    });
  }
  /**
   * Sets the columns to insert.
   *
   * The {@link values} method sets both the columns and the values and this method
   * is not needed. But if you are using the {@link expression} method, you can use
   * this method to set the columns to insert.
   *
   * ### Examples
   *
   * ```ts
   * db.insertInto('person')
   *   .columns(['first_name'])
   *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name")
   * select "pet"."name" from "pet"
   * ```
   */
  columns(columns) {
    return new InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        columns: freeze(columns.map(ColumnNode.create))
      })
    });
  }
  /**
   * Insert an arbitrary expression. For example the result of a select query.
   *
   * ### Examples
   *
   * <!-- siteExample("insert", "Insert subquery", 50) -->
   *
   * You can create an `INSERT INTO SELECT FROM` query using the `expression` method:
   *
   * ```ts
   * const result = await db.insertInto('person')
   *   .columns(['first_name', 'last_name', 'age'])
   *   .expression((eb) => eb
   *     .selectFrom('pet')
   *     .select((eb) => [
   *       'pet.name',
   *       eb.val('Petson').as('last_name'),
   *       eb.val(7).as('age'),
   *     ])
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "person" ("first_name", "last_name", "age")
   * select "pet"."name", $1 as "first_name", $2 as "last_name" from "pet"
   * ```
   */
  expression(expression) {
    return new InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        values: parseExpression(expression)
      })
    });
  }
  /**
   * Changes an `insert into` query to an `insert ignore into` query.
   *
   * If you use the ignore modifier, ignorable errors that occur while executing the
   * insert statement are ignored. For example, without ignore, a row that duplicates
   * an existing unique index or primary key value in the table causes a duplicate-key
   * error and the statement is aborted. With ignore, the row is discarded and no error
   * occurs.
   *
   * This is only supported on some dialects like MySQL. On most dialects you should
   * use the {@link onConflict} method.
   *
   * ### Examples
   *
   * ```ts
   * await db.insertInto('person')
   *   .ignore()
   *   .values(values)
   *   .execute()
   * ```
   */
  ignore() {
    return new InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        ignore: true
      })
    });
  }
  /**
   * Adds an `on conflict` clause to the query.
   *
   * `on conflict` is only supported by some dialects like PostgreSQL and SQLite. On MySQL
   * you can use {@link ignore} and {@link onDuplicateKeyUpdate} to achieve similar results.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *   })
   *   .onConflict((oc) => oc
   *     .column('name')
   *     .doUpdateSet({ species: 'hamster' })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species")
   * values ($1, $2)
   * on conflict ("name")
   * do update set "species" = $3
   * ```
   *
   * You can provide the name of the constraint instead of a column name:
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *   })
   *   .onConflict((oc) => oc
   *     .constraint('pet_name_key')
   *     .doUpdateSet({ species: 'hamster' })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species")
   * values ($1, $2)
   * on conflict on constraint "pet_name_key"
   * do update set "species" = $3
   * ```
   *
   * You can also specify an expression as the conflict target in case
   * the unique index is an expression index:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *   })
   *   .onConflict((oc) => oc
   *     .expression(sql`lower(name)`)
   *     .doUpdateSet({ species: 'hamster' })
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species")
   * values ($1, $2)
   * on conflict (lower(name))
   * do update set "species" = $3
   * ```
   *
   * You can add a filter for the update statement like this:
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *   })
   *   .onConflict((oc) => oc
   *     .column('name')
   *     .doUpdateSet({ species: 'hamster' })
   *     .where('excluded.name', '!=', 'Catto'')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species")
   * values ($1, $2)
   * on conflict ("name")
   * do update set "species" = $3
   * where "excluded"."name" != $4
   * ```
   *
   * You can create an `on conflict do nothing` clauses like this:
   *
   * ```ts
   * await db
   *   .insertInto('pet')
   *   .values({
   *     name: 'Catto',
   *     species: 'cat',
   *   })
   *   .onConflict((oc) => oc
   *     .column('name')
   *     .doNothing()
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * insert into "pet" ("name", "species")
   * values ($1, $2)
   * on conflict ("name") do nothing
   * ```
   *
   * You can refer to the columns of the virtual `excluded` table
   * in a type-safe way using a callback and the `ref` method of
   * `ExpressionBuilder`:
   *
   * ```ts
   * db.insertInto('person')
   *   .values(person)
   *   .onConflict(oc => oc
   *     .column('id')
   *     .doUpdateSet({
   *       first_name: (eb) => eb.ref('excluded.first_name'),
   *       last_name: (eb) => eb.ref('excluded.last_name')
   *     })
   *   )
   * ```
   */
  onConflict(callback) {
    return new InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        onConflict: callback(new OnConflictBuilder({
          onConflictNode: OnConflictNode.create()
        })).toOperationNode()
      })
    });
  }
  /**
   * Adds `on duplicate key update` to the query.
   *
   * If you specify `on duplicate key update`, and a row is inserted that would cause
   * a duplicate value in a unique index or primary key, an update of the old row occurs.
   *
   * This is only implemented by some dialects like MySQL. On most dialects you should
   * use {@link onConflict} instead.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .insertInto('person')
   *   .values(values)
   *   .onDuplicateKeyUpdate({ species: 'hamster' })
   * ```
   */
  onDuplicateKeyUpdate(update) {
    return new InsertQueryBuilder({
      ...this.#props,
      queryNode: InsertQueryNode.cloneWith(this.#props.queryNode, {
        onDuplicateKey: OnDuplicateKeyNode.create(parseUpdateExpression(update))
      })
    });
  }
  returning(selection) {
    return new InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection))
    });
  }
  returningAll() {
    return new InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll())
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * db.updateTable('person')
   *   .set(values)
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * async function insertPerson(values: InsertablePerson, returnLastName: boolean) {
   *   return await db
   *     .insertInto('person')
   *     .values(values)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `insertPerson` function is:
   *
   * ```ts
   * {
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new InsertQueryBuilder({
      ...this.#props
    });
  }
  /**
   * Change the output type of the query.
   *
   * You should only use this method as the last resort if the types
   * don't support your use case.
   */
  $castTo() {
    return new InsertQueryBuilder(this.#props);
  }
  /**
   * Narrows (parts of) the output type of the query.
   *
   * Kysely tries to be as type-safe as possible, but in some cases we have to make
   * compromises for better maintainability and compilation performance. At present,
   * Kysely doesn't narrow the output type of the query based on {@link values} input
   * when using {@link returning} or {@link returningAll}.
   *
   * This utility method is very useful for these situations, as it removes unncessary
   * runtime assertion/guard code. Its input type is limited to the output type
   * of the query, so you can't add a column that doesn't exist, or change a column's
   * type to something that doesn't exist in its union type.
   *
   * ### Examples
   *
   * Turn this code:
   *
   * ```ts
   * const person = await db.insertInto('person')
   *   .values({ ...inputPerson, nullable_column: 'hell yeah!' })
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (nullable_column) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * const person = await db.insertInto('person')
   *   .values({ ...inputPerson, nullable_column: 'hell yeah!' })
   *   .returningAll()
   *   .$narrowType<{ nullable_column: string }>()
   *   .executeTakeFirstOrThrow()
   *
   * functionThatExpectsPersonWithNonNullValue(person)
   * ```
   */
  $narrowType() {
    return new InsertQueryBuilder(this.#props);
  }
  /**
   * Asserts that query's output row type equals the given type `T`.
   *
   * This method can be used to simplify excessively complex types to make typescript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for typescript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help typescript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .with('new_person', (qb) => qb
   *     .insertInto('person')
   *     .values(person)
   *     .returning('id')
   *     .$assertType<{ id: string }>()
   *   )
   *   .with('new_pet', (qb) => qb
   *     .insertInto('pet')
   *     .values((eb) => ({ owner_id: eb.selectFrom('new_person').select('id'), ...pet }))
   *     .returning(['name as pet_name', 'species'])
   *     .$assertType<{ pet_name: string, species: Species }>()
   *   )
   *   .selectFrom(['new_person', 'new_pet'])
   *   .selectAll()
   *   .executeTakeFirstOrThrow()
   * ```
   */
  $assertType() {
    return new InsertQueryBuilder(this.#props);
  }
  /**
   * Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new InsertQueryBuilder({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const query = compiledQuery.query;
    const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
    if (this.#props.executor.adapter.supportsReturning && query.returning) {
      return result.rows;
    }
    return [
      new InsertResult(
        result.insertId,
        // TODO: remove numUpdatedOrDeletedRows.
        result.numAffectedRows ?? result.numUpdatedOrDeletedRows
      )
    ];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new InsertQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
    });
    return await builder.execute();
  }
};
preventAwait(InsertQueryBuilder, "don't await InsertQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");

// node_modules/kysely/dist/esm/query-builder/delete-query-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/query-builder/delete-result.js
init_modules_watch_stub();
var DeleteResult = class {
  numDeletedRows;
  constructor(numDeletedRows) {
    this.numDeletedRows = numDeletedRows;
  }
};

// node_modules/kysely/dist/esm/operation-node/limit-node.js
init_modules_watch_stub();
var LimitNode = freeze({
  is(node) {
    return node.kind === "LimitNode";
  },
  create(limit) {
    return freeze({
      kind: "LimitNode",
      limit: ValueNode.create(limit)
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/delete-query-builder.js
var DeleteQueryBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  where(...args) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode)
    });
  }
  using(tables) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: DeleteQueryNode.cloneWithUsing(this.#props.queryNode, parseTableExpressionOrList(tables))
    });
  }
  innerJoin(...args) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("InnerJoin", args))
    });
  }
  leftJoin(...args) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("LeftJoin", args))
    });
  }
  rightJoin(...args) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("RightJoin", args))
    });
  }
  fullJoin(...args) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("FullJoin", args))
    });
  }
  returning(selection) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection))
    });
  }
  returningAll(table) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll(table))
    });
  }
  /**
   * Adds an `order by` clause to the query.
   *
   * `orderBy` calls are additive. To order by multiple columns, call `orderBy`
   * multiple times.
   *
   * The first argument is the expression to order by and the second is the
   * order (`asc` or `desc`).
   *
   * An `order by` clause in a delete query is only supported by some dialects
   * like MySQL.
   *
   * See {@link SelectQueryBuilder.orderBy} for more examples.
   *
   * ### Examples
   *
   * Delete 5 oldest items in a table:
   *
   * ```ts
   * await db
   *   .deleteFrom('pet')
   *   .orderBy('created_at')
   *   .limit(5)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * delete from `pet`
   * order by `created_at`
   * limit ?
   * ```
   */
  orderBy(orderBy, direction) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: DeleteQueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy([orderBy, direction]))
    });
  }
  /**
   * Adds a limit clause to the query.
   *
   * A limit clause in a delete query is only supported by some dialects
   * like MySQL.
   *
   * ### Examples
   *
   * Delete 5 oldest items in a table:
   *
   * ```ts
   * await db
   *   .deleteFrom('pet')
   *   .orderBy('created_at')
   *   .limit(5)
   *   .execute()
   * ```
   */
  limit(limit) {
    return new DeleteQueryBuilder({
      ...this.#props,
      queryNode: DeleteQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(limit))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * db.deleteFrom('person')
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * async function deletePerson(id: number, returnLastName: boolean) {
   *   return await db
   *     .deleteFrom('person')
   *     .where('id', '=', id)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `deletePerson` function is:
   *
   * ```ts
   * {
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new DeleteQueryBuilder({
      ...this.#props
    });
  }
  /**
   * Change the output type of the query.
   *
   * You should only use this method as the last resort if the types
   * don't support your use case.
   */
  $castTo() {
    return new DeleteQueryBuilder(this.#props);
  }
  /**
   * Narrows (parts of) the output type of the query.
   *
   * Kysely tries to be as type-safe as possible, but in some cases we have to make
   * compromises for better maintainability and compilation performance. At present,
   * Kysely doesn't narrow the output type of the query when using {@link where} and {@link returning} or {@link returningAll}.
   *
   * This utility method is very useful for these situations, as it removes unncessary
   * runtime assertion/guard code. Its input type is limited to the output type
   * of the query, so you can't add a column that doesn't exist, or change a column's
   * type to something that doesn't exist in its union type.
   *
   * ### Examples
   *
   * Turn this code:
   *
   * ```ts
   * const person = await db.deleteFrom('person')
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (person.nullable_column) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * const person = await db.deleteFrom('person')
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .$narrowType<{ nullable_column: string }>()
   *   .executeTakeFirstOrThrow()
   *
   * functionThatExpectsPersonWithNonNullValue(person)
   * ```
   */
  $narrowType() {
    return new DeleteQueryBuilder(this.#props);
  }
  /**
   * Asserts that query's output row type equals the given type `T`.
   *
   * This method can be used to simplify excessively complex types to make typescript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for typescript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help typescript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .with('deleted_person', (qb) => qb
   *     .deleteFrom('person')
   *     .where('id', '=', person.id)
   *     .returning('first_name')
   *     .$assertType<{ first_name: string }>()
   *   )
   *   .with('deleted_pet', (qb) => qb
   *     .deleteFrom('pet')
   *     .where('owner_id', '=', person.id)
   *     .returning(['name as pet_name', 'species'])
   *     .$assertType<{ pet_name: string, species: Species }>()
   *   )
   *   .selectFrom(['deleted_person', 'deleted_pet'])
   *   .selectAll()
   *   .executeTakeFirstOrThrow()
   * ```
   */
  $assertType() {
    return new DeleteQueryBuilder(this.#props);
  }
  /**
   * Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new DeleteQueryBuilder({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const query = compiledQuery.query;
    const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
    if (this.#props.executor.adapter.supportsReturning && query.returning) {
      return result.rows;
    }
    return [
      new DeleteResult(
        // TODO: remove numUpdatedOrDeletedRows.
        result.numAffectedRows ?? result.numUpdatedOrDeletedRows ?? BigInt(0)
      )
    ];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new DeleteQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
    });
    return await builder.execute();
  }
};
preventAwait(DeleteQueryBuilder, "don't await DeleteQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");

// node_modules/kysely/dist/esm/query-builder/update-query-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/query-builder/update-result.js
init_modules_watch_stub();
var UpdateResult = class {
  numUpdatedRows;
  numChangedRows;
  constructor(numUpdatedRows, numChangedRows) {
    this.numUpdatedRows = numUpdatedRows;
    this.numChangedRows = numChangedRows;
  }
};

// node_modules/kysely/dist/esm/query-builder/update-query-builder.js
var UpdateQueryBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  where(...args) {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  clearWhere() {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode)
    });
  }
  from(from) {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: UpdateQueryNode.cloneWithFromItems(this.#props.queryNode, parseTableExpressionOrList(from))
    });
  }
  innerJoin(...args) {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("InnerJoin", args))
    });
  }
  leftJoin(...args) {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("LeftJoin", args))
    });
  }
  rightJoin(...args) {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("RightJoin", args))
    });
  }
  fullJoin(...args) {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("FullJoin", args))
    });
  }
  set(update) {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: UpdateQueryNode.cloneWithUpdates(this.#props.queryNode, parseUpdateExpression(update))
    });
  }
  returning(selection) {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectArg(selection))
    });
  }
  returningAll() {
    return new UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithReturning(this.#props.queryNode, parseSelectAll())
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   *
   * If you want to conditionally call a method on `this`, see
   * the {@link $if} method.
   *
   * ### Examples
   *
   * The next example uses a helper function `log` to log a query:
   *
   * ```ts
   * function log<T extends Compilable>(qb: T): T {
   *   console.log(qb.compile())
   *   return qb
   * }
   *
   * db.updateTable('person')
   *   .set(values)
   *   .$call(log)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  /**
   * Call `func(this)` if `condition` is true.
   *
   * This method is especially handy with optional selects. Any `returning` or `returningAll`
   * method calls add columns as optional fields to the output type when called inside
   * the `func` callback. This is because we can't know if those selections were actually
   * made before running the code.
   *
   * You can also call any other methods inside the callback.
   *
   * ### Examples
   *
   * ```ts
   * async function updatePerson(id: number, updates: UpdateablePerson, returnLastName: boolean) {
   *   return await db
   *     .updateTable('person')
   *     .set(updates)
   *     .where('id', '=', id)
   *     .returning(['id', 'first_name'])
   *     .$if(returnLastName, (qb) => qb.returning('last_name'))
   *     .executeTakeFirstOrThrow()
   * }
   * ```
   *
   * Any selections added inside the `if` callback will be added as optional fields to the
   * output type since we can't know if the selections were actually made before running
   * the code. In the example above the return type of the `updatePerson` function is:
   *
   * ```ts
   * {
   *   id: number
   *   first_name: string
   *   last_name?: string
   * }
   * ```
   */
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new UpdateQueryBuilder({
      ...this.#props
    });
  }
  /**
   * Change the output type of the query.
   *
   * You should only use this method as the last resort if the types
   * don't support your use case.
   */
  $castTo() {
    return new UpdateQueryBuilder(this.#props);
  }
  /**
   * Narrows (parts of) the output type of the query.
   *
   * Kysely tries to be as type-safe as possible, but in some cases we have to make
   * compromises for better maintainability and compilation performance. At present,
   * Kysely doesn't narrow the output type of the query based on {@link set} input
   * when using {@link where} and/or {@link returning} or {@link returningAll}.
   *
   * This utility method is very useful for these situations, as it removes unncessary
   * runtime assertion/guard code. Its input type is limited to the output type
   * of the query, so you can't add a column that doesn't exist, or change a column's
   * type to something that doesn't exist in its union type.
   *
   * ### Examples
   *
   * Turn this code:
   *
   * ```ts
   * const person = await db.updateTable('person')
   *   .set({ deletedAt: now })
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .executeTakeFirstOrThrow()
   *
   * if (person.nullable_column) {
   *   functionThatExpectsPersonWithNonNullValue(person)
   * }
   * ```
   *
   * Into this:
   *
   * ```ts
   * const person = await db.updateTable('person')
   *   .set({ deletedAt: now })
   *   .where('id', '=', id)
   *   .where('nullable_column', 'is not', null)
   *   .returningAll()
   *   .$narrowType<{ deletedAt: Date; nullable_column: string }>()
   *   .executeTakeFirstOrThrow()
   *
   * functionThatExpectsPersonWithNonNullValue(person)
   * ```
   */
  $narrowType() {
    return new UpdateQueryBuilder(this.#props);
  }
  /**
   * Asserts that query's output row type equals the given type `T`.
   *
   * This method can be used to simplify excessively complex types to make typescript happy
   * and much faster.
   *
   * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
   * for typescript and you get errors like this:
   *
   * ```
   * error TS2589: Type instantiation is excessively deep and possibly infinite.
   * ```
   *
   * In these case you can often use this method to help typescript a little bit. When you use this
   * method to assert the output type of a query, Kysely can drop the complex output type that
   * consists of multiple nested helper types and replace it with the simple asserted type.
   *
   * Using this method doesn't reduce type safety at all. You have to pass in a type that is
   * structurally equal to the current type.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .with('updated_person', (qb) => qb
   *     .updateTable('person')
   *     .set(person)
   *     .where('id', '=', person.id)
   *     .returning('first_name')
   *     .$assertType<{ first_name: string }>()
   *   )
   *   .with('updated_pet', (qb) => qb
   *     .updateTable('pet')
   *     .set(pet)
   *     .where('owner_id', '=', person.id)
   *     .returning(['name as pet_name', 'species'])
   *     .$assertType<{ pet_name: string, species: Species }>()
   *   )
   *   .selectFrom(['updated_person', 'updated_pet'])
   *   .selectAll()
   *   .executeTakeFirstOrThrow()
   * ```
   */
  $assertType() {
    return new UpdateQueryBuilder(this.#props);
  }
  /**
   * Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new UpdateQueryBuilder({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  /**
   * Executes the query and returns an array of rows.
   *
   * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
   */
  async execute() {
    const compiledQuery = this.compile();
    const query = compiledQuery.query;
    const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
    if (this.#props.executor.adapter.supportsReturning && query.returning) {
      return result.rows;
    }
    return [
      new UpdateResult(
        // TODO: remove numUpdatedOrDeletedRows.
        // TODO: https://github.com/kysely-org/kysely/pull/431#discussion_r1172330899
        result.numAffectedRows ?? result.numUpdatedOrDeletedRows ?? BigInt(0),
        result.numChangedRows
      )
    ];
  }
  /**
   * Executes the query and returns the first result or undefined if
   * the query returned no result.
   */
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  /**
   * Executes the query and returns the first result or throws if
   * the query returned no result.
   *
   * By default an instance of {@link NoResultError} is thrown, but you can
   * provide a custom error class, or callback as the only argument to throw a different
   * error.
   */
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new UpdateQueryBuilder({
      ...this.#props,
      queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
    });
    return await builder.execute();
  }
};
preventAwait(UpdateQueryBuilder, "don't await UpdateQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");

// node_modules/kysely/dist/esm/parser/with-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/common-table-expression-name-node.js
init_modules_watch_stub();
var CommonTableExpressionNameNode = freeze({
  is(node) {
    return node.kind === "CommonTableExpressionNameNode";
  },
  create(tableName, columnNames) {
    return freeze({
      kind: "CommonTableExpressionNameNode",
      table: TableNode.create(tableName),
      columns: columnNames ? freeze(columnNames.map(ColumnNode.create)) : void 0
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/cte-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/common-table-expression-node.js
init_modules_watch_stub();
var CommonTableExpressionNode = freeze({
  is(node) {
    return node.kind === "CommonTableExpressionNode";
  },
  create(name, expression) {
    return freeze({
      kind: "CommonTableExpressionNode",
      name,
      expression
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/cte-builder.js
var CTEBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Makes the common table expression materialized.
   */
  materialized() {
    return new CTEBuilder({
      ...this.#props,
      node: CommonTableExpressionNode.cloneWith(this.#props.node, {
        materialized: true
      })
    });
  }
  /**
   * Makes the common table expression not materialized.
   */
  notMaterialized() {
    return new CTEBuilder({
      ...this.#props,
      node: CommonTableExpressionNode.cloneWith(this.#props.node, {
        materialized: false
      })
    });
  }
  toOperationNode() {
    return this.#props.node;
  }
};
preventAwait(CTEBuilder, "don't await CTEBuilder instances. They are never executed directly and are always just a part of a query.");

// node_modules/kysely/dist/esm/parser/with-parser.js
function parseCommonTableExpression(nameOrBuilderCallback, expression) {
  const expressionNode = expression(createQueryCreator()).toOperationNode();
  if (isFunction(nameOrBuilderCallback)) {
    return nameOrBuilderCallback(cteBuilderFactory(expressionNode)).toOperationNode();
  }
  return CommonTableExpressionNode.create(parseCommonTableExpressionName(nameOrBuilderCallback), expressionNode);
}
function cteBuilderFactory(expressionNode) {
  return (name) => {
    return new CTEBuilder({
      node: CommonTableExpressionNode.create(parseCommonTableExpressionName(name), expressionNode)
    });
  };
}
function parseCommonTableExpressionName(name) {
  if (name.includes("(")) {
    const parts = name.split(/[\(\)]/);
    const table = parts[0];
    const columns = parts[1].split(",").map((it) => it.trim());
    return CommonTableExpressionNameNode.create(table, columns);
  } else {
    return CommonTableExpressionNameNode.create(name);
  }
}

// node_modules/kysely/dist/esm/operation-node/with-node.js
init_modules_watch_stub();
var WithNode = freeze({
  is(node) {
    return node.kind === "WithNode";
  },
  create(expression, params) {
    return freeze({
      kind: "WithNode",
      expressions: freeze([expression]),
      ...params
    });
  },
  cloneWithExpression(withNode, expression) {
    return freeze({
      ...withNode,
      expressions: freeze([...withNode.expressions, expression])
    });
  }
});

// node_modules/kysely/dist/esm/util/query-id.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/util/random-string.js
init_modules_watch_stub();
var CHARS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];
function randomString(length) {
  let chars = "";
  for (let i = 0; i < length; ++i) {
    chars += randomChar();
  }
  return chars;
}
function randomChar() {
  return CHARS[~~(Math.random() * CHARS.length)];
}

// node_modules/kysely/dist/esm/util/query-id.js
function createQueryId() {
  return new LazyQueryId();
}
var LazyQueryId = class {
  #queryId;
  get queryId() {
    if (this.#queryId === void 0) {
      this.#queryId = randomString(8);
    }
    return this.#queryId;
  }
};

// node_modules/kysely/dist/esm/plugin/with-schema/with-schema-plugin.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/plugin/with-schema/with-schema-transformer.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/operation-node-transformer.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/util/require-all-props.js
init_modules_watch_stub();
function requireAllProps(obj) {
  return obj;
}

// node_modules/kysely/dist/esm/operation-node/operation-node-transformer.js
var OperationNodeTransformer = class {
  nodeStack = [];
  #transformers = freeze({
    AliasNode: this.transformAlias.bind(this),
    ColumnNode: this.transformColumn.bind(this),
    IdentifierNode: this.transformIdentifier.bind(this),
    SchemableIdentifierNode: this.transformSchemableIdentifier.bind(this),
    RawNode: this.transformRaw.bind(this),
    ReferenceNode: this.transformReference.bind(this),
    SelectQueryNode: this.transformSelectQuery.bind(this),
    SelectionNode: this.transformSelection.bind(this),
    TableNode: this.transformTable.bind(this),
    FromNode: this.transformFrom.bind(this),
    SelectAllNode: this.transformSelectAll.bind(this),
    AndNode: this.transformAnd.bind(this),
    OrNode: this.transformOr.bind(this),
    ValueNode: this.transformValue.bind(this),
    ValueListNode: this.transformValueList.bind(this),
    PrimitiveValueListNode: this.transformPrimitiveValueList.bind(this),
    ParensNode: this.transformParens.bind(this),
    JoinNode: this.transformJoin.bind(this),
    OperatorNode: this.transformOperator.bind(this),
    WhereNode: this.transformWhere.bind(this),
    InsertQueryNode: this.transformInsertQuery.bind(this),
    DeleteQueryNode: this.transformDeleteQuery.bind(this),
    ReturningNode: this.transformReturning.bind(this),
    CreateTableNode: this.transformCreateTable.bind(this),
    AddColumnNode: this.transformAddColumn.bind(this),
    ColumnDefinitionNode: this.transformColumnDefinition.bind(this),
    DropTableNode: this.transformDropTable.bind(this),
    DataTypeNode: this.transformDataType.bind(this),
    OrderByNode: this.transformOrderBy.bind(this),
    OrderByItemNode: this.transformOrderByItem.bind(this),
    GroupByNode: this.transformGroupBy.bind(this),
    GroupByItemNode: this.transformGroupByItem.bind(this),
    UpdateQueryNode: this.transformUpdateQuery.bind(this),
    ColumnUpdateNode: this.transformColumnUpdate.bind(this),
    LimitNode: this.transformLimit.bind(this),
    OffsetNode: this.transformOffset.bind(this),
    OnConflictNode: this.transformOnConflict.bind(this),
    OnDuplicateKeyNode: this.transformOnDuplicateKey.bind(this),
    CreateIndexNode: this.transformCreateIndex.bind(this),
    DropIndexNode: this.transformDropIndex.bind(this),
    ListNode: this.transformList.bind(this),
    PrimaryKeyConstraintNode: this.transformPrimaryKeyConstraint.bind(this),
    UniqueConstraintNode: this.transformUniqueConstraint.bind(this),
    ReferencesNode: this.transformReferences.bind(this),
    CheckConstraintNode: this.transformCheckConstraint.bind(this),
    WithNode: this.transformWith.bind(this),
    CommonTableExpressionNode: this.transformCommonTableExpression.bind(this),
    CommonTableExpressionNameNode: this.transformCommonTableExpressionName.bind(this),
    HavingNode: this.transformHaving.bind(this),
    CreateSchemaNode: this.transformCreateSchema.bind(this),
    DropSchemaNode: this.transformDropSchema.bind(this),
    AlterTableNode: this.transformAlterTable.bind(this),
    DropColumnNode: this.transformDropColumn.bind(this),
    RenameColumnNode: this.transformRenameColumn.bind(this),
    AlterColumnNode: this.transformAlterColumn.bind(this),
    ModifyColumnNode: this.transformModifyColumn.bind(this),
    AddConstraintNode: this.transformAddConstraint.bind(this),
    DropConstraintNode: this.transformDropConstraint.bind(this),
    ForeignKeyConstraintNode: this.transformForeignKeyConstraint.bind(this),
    CreateViewNode: this.transformCreateView.bind(this),
    DropViewNode: this.transformDropView.bind(this),
    GeneratedNode: this.transformGenerated.bind(this),
    DefaultValueNode: this.transformDefaultValue.bind(this),
    OnNode: this.transformOn.bind(this),
    ValuesNode: this.transformValues.bind(this),
    SelectModifierNode: this.transformSelectModifier.bind(this),
    CreateTypeNode: this.transformCreateType.bind(this),
    DropTypeNode: this.transformDropType.bind(this),
    ExplainNode: this.transformExplain.bind(this),
    DefaultInsertValueNode: this.transformDefaultInsertValue.bind(this),
    AggregateFunctionNode: this.transformAggregateFunction.bind(this),
    OverNode: this.transformOver.bind(this),
    PartitionByNode: this.transformPartitionBy.bind(this),
    PartitionByItemNode: this.transformPartitionByItem.bind(this),
    SetOperationNode: this.transformSetOperation.bind(this),
    BinaryOperationNode: this.transformBinaryOperation.bind(this),
    UnaryOperationNode: this.transformUnaryOperation.bind(this),
    UsingNode: this.transformUsing.bind(this),
    FunctionNode: this.transformFunction.bind(this),
    CaseNode: this.transformCase.bind(this),
    WhenNode: this.transformWhen.bind(this),
    JSONReferenceNode: this.transformJSONReference.bind(this),
    JSONPathNode: this.transformJSONPath.bind(this),
    JSONPathLegNode: this.transformJSONPathLeg.bind(this),
    JSONOperatorChainNode: this.transformJSONOperatorChain.bind(this),
    TupleNode: this.transformTuple.bind(this)
  });
  transformNode(node) {
    if (!node) {
      return node;
    }
    this.nodeStack.push(node);
    const out = this.transformNodeImpl(node);
    this.nodeStack.pop();
    return freeze(out);
  }
  transformNodeImpl(node) {
    return this.#transformers[node.kind](node);
  }
  transformNodeList(list) {
    if (!list) {
      return list;
    }
    return freeze(list.map((node) => this.transformNode(node)));
  }
  transformSelectQuery(node) {
    return requireAllProps({
      kind: "SelectQueryNode",
      from: this.transformNode(node.from),
      selections: this.transformNodeList(node.selections),
      distinctOn: this.transformNodeList(node.distinctOn),
      joins: this.transformNodeList(node.joins),
      groupBy: this.transformNode(node.groupBy),
      orderBy: this.transformNode(node.orderBy),
      where: this.transformNode(node.where),
      frontModifiers: this.transformNodeList(node.frontModifiers),
      endModifiers: this.transformNodeList(node.endModifiers),
      limit: this.transformNode(node.limit),
      offset: this.transformNode(node.offset),
      with: this.transformNode(node.with),
      having: this.transformNode(node.having),
      explain: this.transformNode(node.explain),
      setOperations: this.transformNodeList(node.setOperations)
    });
  }
  transformSelection(node) {
    return requireAllProps({
      kind: "SelectionNode",
      selection: this.transformNode(node.selection)
    });
  }
  transformColumn(node) {
    return requireAllProps({
      kind: "ColumnNode",
      column: this.transformNode(node.column)
    });
  }
  transformAlias(node) {
    return requireAllProps({
      kind: "AliasNode",
      node: this.transformNode(node.node),
      alias: this.transformNode(node.alias)
    });
  }
  transformTable(node) {
    return requireAllProps({
      kind: "TableNode",
      table: this.transformNode(node.table)
    });
  }
  transformFrom(node) {
    return requireAllProps({
      kind: "FromNode",
      froms: this.transformNodeList(node.froms)
    });
  }
  transformReference(node) {
    return requireAllProps({
      kind: "ReferenceNode",
      column: this.transformNode(node.column),
      table: this.transformNode(node.table)
    });
  }
  transformAnd(node) {
    return requireAllProps({
      kind: "AndNode",
      left: this.transformNode(node.left),
      right: this.transformNode(node.right)
    });
  }
  transformOr(node) {
    return requireAllProps({
      kind: "OrNode",
      left: this.transformNode(node.left),
      right: this.transformNode(node.right)
    });
  }
  transformValueList(node) {
    return requireAllProps({
      kind: "ValueListNode",
      values: this.transformNodeList(node.values)
    });
  }
  transformParens(node) {
    return requireAllProps({
      kind: "ParensNode",
      node: this.transformNode(node.node)
    });
  }
  transformJoin(node) {
    return requireAllProps({
      kind: "JoinNode",
      joinType: node.joinType,
      table: this.transformNode(node.table),
      on: this.transformNode(node.on)
    });
  }
  transformRaw(node) {
    return requireAllProps({
      kind: "RawNode",
      sqlFragments: freeze([...node.sqlFragments]),
      parameters: this.transformNodeList(node.parameters)
    });
  }
  transformWhere(node) {
    return requireAllProps({
      kind: "WhereNode",
      where: this.transformNode(node.where)
    });
  }
  transformInsertQuery(node) {
    return requireAllProps({
      kind: "InsertQueryNode",
      into: this.transformNode(node.into),
      columns: this.transformNodeList(node.columns),
      values: this.transformNode(node.values),
      returning: this.transformNode(node.returning),
      onConflict: this.transformNode(node.onConflict),
      onDuplicateKey: this.transformNode(node.onDuplicateKey),
      with: this.transformNode(node.with),
      ignore: node.ignore,
      replace: node.replace,
      explain: this.transformNode(node.explain)
    });
  }
  transformValues(node) {
    return requireAllProps({
      kind: "ValuesNode",
      values: this.transformNodeList(node.values)
    });
  }
  transformDeleteQuery(node) {
    return requireAllProps({
      kind: "DeleteQueryNode",
      from: this.transformNode(node.from),
      using: this.transformNode(node.using),
      joins: this.transformNodeList(node.joins),
      where: this.transformNode(node.where),
      returning: this.transformNode(node.returning),
      with: this.transformNode(node.with),
      orderBy: this.transformNode(node.orderBy),
      limit: this.transformNode(node.limit),
      explain: this.transformNode(node.explain)
    });
  }
  transformReturning(node) {
    return requireAllProps({
      kind: "ReturningNode",
      selections: this.transformNodeList(node.selections)
    });
  }
  transformCreateTable(node) {
    return requireAllProps({
      kind: "CreateTableNode",
      table: this.transformNode(node.table),
      columns: this.transformNodeList(node.columns),
      constraints: this.transformNodeList(node.constraints),
      temporary: node.temporary,
      ifNotExists: node.ifNotExists,
      onCommit: node.onCommit,
      frontModifiers: this.transformNodeList(node.frontModifiers),
      endModifiers: this.transformNodeList(node.endModifiers)
    });
  }
  transformColumnDefinition(node) {
    return requireAllProps({
      kind: "ColumnDefinitionNode",
      column: this.transformNode(node.column),
      dataType: this.transformNode(node.dataType),
      references: this.transformNode(node.references),
      primaryKey: node.primaryKey,
      autoIncrement: node.autoIncrement,
      unique: node.unique,
      notNull: node.notNull,
      unsigned: node.unsigned,
      defaultTo: this.transformNode(node.defaultTo),
      check: this.transformNode(node.check),
      generated: this.transformNode(node.generated),
      frontModifiers: this.transformNodeList(node.frontModifiers),
      endModifiers: this.transformNodeList(node.endModifiers)
    });
  }
  transformAddColumn(node) {
    return requireAllProps({
      kind: "AddColumnNode",
      column: this.transformNode(node.column)
    });
  }
  transformDropTable(node) {
    return requireAllProps({
      kind: "DropTableNode",
      table: this.transformNode(node.table),
      ifExists: node.ifExists,
      cascade: node.cascade
    });
  }
  transformOrderBy(node) {
    return requireAllProps({
      kind: "OrderByNode",
      items: this.transformNodeList(node.items)
    });
  }
  transformOrderByItem(node) {
    return requireAllProps({
      kind: "OrderByItemNode",
      orderBy: this.transformNode(node.orderBy),
      direction: this.transformNode(node.direction)
    });
  }
  transformGroupBy(node) {
    return requireAllProps({
      kind: "GroupByNode",
      items: this.transformNodeList(node.items)
    });
  }
  transformGroupByItem(node) {
    return requireAllProps({
      kind: "GroupByItemNode",
      groupBy: this.transformNode(node.groupBy)
    });
  }
  transformUpdateQuery(node) {
    return requireAllProps({
      kind: "UpdateQueryNode",
      table: this.transformNode(node.table),
      from: this.transformNode(node.from),
      joins: this.transformNodeList(node.joins),
      where: this.transformNode(node.where),
      updates: this.transformNodeList(node.updates),
      returning: this.transformNode(node.returning),
      with: this.transformNode(node.with),
      explain: this.transformNode(node.explain)
    });
  }
  transformColumnUpdate(node) {
    return requireAllProps({
      kind: "ColumnUpdateNode",
      column: this.transformNode(node.column),
      value: this.transformNode(node.value)
    });
  }
  transformLimit(node) {
    return requireAllProps({
      kind: "LimitNode",
      limit: this.transformNode(node.limit)
    });
  }
  transformOffset(node) {
    return requireAllProps({
      kind: "OffsetNode",
      offset: this.transformNode(node.offset)
    });
  }
  transformOnConflict(node) {
    return requireAllProps({
      kind: "OnConflictNode",
      columns: this.transformNodeList(node.columns),
      constraint: this.transformNode(node.constraint),
      indexExpression: this.transformNode(node.indexExpression),
      indexWhere: this.transformNode(node.indexWhere),
      updates: this.transformNodeList(node.updates),
      updateWhere: this.transformNode(node.updateWhere),
      doNothing: node.doNothing
    });
  }
  transformOnDuplicateKey(node) {
    return requireAllProps({
      kind: "OnDuplicateKeyNode",
      updates: this.transformNodeList(node.updates)
    });
  }
  transformCreateIndex(node) {
    return requireAllProps({
      kind: "CreateIndexNode",
      name: this.transformNode(node.name),
      table: this.transformNode(node.table),
      columns: this.transformNodeList(node.columns),
      unique: node.unique,
      using: this.transformNode(node.using),
      ifNotExists: node.ifNotExists,
      where: this.transformNode(node.where)
    });
  }
  transformList(node) {
    return requireAllProps({
      kind: "ListNode",
      items: this.transformNodeList(node.items)
    });
  }
  transformDropIndex(node) {
    return requireAllProps({
      kind: "DropIndexNode",
      name: this.transformNode(node.name),
      table: this.transformNode(node.table),
      ifExists: node.ifExists,
      cascade: node.cascade
    });
  }
  transformPrimaryKeyConstraint(node) {
    return requireAllProps({
      kind: "PrimaryKeyConstraintNode",
      columns: this.transformNodeList(node.columns),
      name: this.transformNode(node.name)
    });
  }
  transformUniqueConstraint(node) {
    return requireAllProps({
      kind: "UniqueConstraintNode",
      columns: this.transformNodeList(node.columns),
      name: this.transformNode(node.name)
    });
  }
  transformForeignKeyConstraint(node) {
    return requireAllProps({
      kind: "ForeignKeyConstraintNode",
      columns: this.transformNodeList(node.columns),
      references: this.transformNode(node.references),
      name: this.transformNode(node.name),
      onDelete: node.onDelete,
      onUpdate: node.onUpdate
    });
  }
  transformSetOperation(node) {
    return requireAllProps({
      kind: "SetOperationNode",
      operator: node.operator,
      expression: this.transformNode(node.expression),
      all: node.all
    });
  }
  transformReferences(node) {
    return requireAllProps({
      kind: "ReferencesNode",
      table: this.transformNode(node.table),
      columns: this.transformNodeList(node.columns),
      onDelete: node.onDelete,
      onUpdate: node.onUpdate
    });
  }
  transformCheckConstraint(node) {
    return requireAllProps({
      kind: "CheckConstraintNode",
      expression: this.transformNode(node.expression),
      name: this.transformNode(node.name)
    });
  }
  transformWith(node) {
    return requireAllProps({
      kind: "WithNode",
      expressions: this.transformNodeList(node.expressions),
      recursive: node.recursive
    });
  }
  transformCommonTableExpression(node) {
    return requireAllProps({
      kind: "CommonTableExpressionNode",
      name: this.transformNode(node.name),
      materialized: node.materialized,
      expression: this.transformNode(node.expression)
    });
  }
  transformCommonTableExpressionName(node) {
    return requireAllProps({
      kind: "CommonTableExpressionNameNode",
      table: this.transformNode(node.table),
      columns: this.transformNodeList(node.columns)
    });
  }
  transformHaving(node) {
    return requireAllProps({
      kind: "HavingNode",
      having: this.transformNode(node.having)
    });
  }
  transformCreateSchema(node) {
    return requireAllProps({
      kind: "CreateSchemaNode",
      schema: this.transformNode(node.schema),
      ifNotExists: node.ifNotExists
    });
  }
  transformDropSchema(node) {
    return requireAllProps({
      kind: "DropSchemaNode",
      schema: this.transformNode(node.schema),
      ifExists: node.ifExists,
      cascade: node.cascade
    });
  }
  transformAlterTable(node) {
    return requireAllProps({
      kind: "AlterTableNode",
      table: this.transformNode(node.table),
      renameTo: this.transformNode(node.renameTo),
      setSchema: this.transformNode(node.setSchema),
      columnAlterations: this.transformNodeList(node.columnAlterations),
      addConstraint: this.transformNode(node.addConstraint),
      dropConstraint: this.transformNode(node.dropConstraint)
    });
  }
  transformDropColumn(node) {
    return requireAllProps({
      kind: "DropColumnNode",
      column: this.transformNode(node.column)
    });
  }
  transformRenameColumn(node) {
    return requireAllProps({
      kind: "RenameColumnNode",
      column: this.transformNode(node.column),
      renameTo: this.transformNode(node.renameTo)
    });
  }
  transformAlterColumn(node) {
    return requireAllProps({
      kind: "AlterColumnNode",
      column: this.transformNode(node.column),
      dataType: this.transformNode(node.dataType),
      dataTypeExpression: this.transformNode(node.dataTypeExpression),
      setDefault: this.transformNode(node.setDefault),
      dropDefault: node.dropDefault,
      setNotNull: node.setNotNull,
      dropNotNull: node.dropNotNull
    });
  }
  transformModifyColumn(node) {
    return requireAllProps({
      kind: "ModifyColumnNode",
      column: this.transformNode(node.column)
    });
  }
  transformAddConstraint(node) {
    return requireAllProps({
      kind: "AddConstraintNode",
      constraint: this.transformNode(node.constraint)
    });
  }
  transformDropConstraint(node) {
    return requireAllProps({
      kind: "DropConstraintNode",
      constraintName: this.transformNode(node.constraintName),
      ifExists: node.ifExists,
      modifier: node.modifier
    });
  }
  transformCreateView(node) {
    return requireAllProps({
      kind: "CreateViewNode",
      name: this.transformNode(node.name),
      temporary: node.temporary,
      orReplace: node.orReplace,
      ifNotExists: node.ifNotExists,
      materialized: node.materialized,
      columns: this.transformNodeList(node.columns),
      as: this.transformNode(node.as)
    });
  }
  transformDropView(node) {
    return requireAllProps({
      kind: "DropViewNode",
      name: this.transformNode(node.name),
      ifExists: node.ifExists,
      materialized: node.materialized,
      cascade: node.cascade
    });
  }
  transformGenerated(node) {
    return requireAllProps({
      kind: "GeneratedNode",
      byDefault: node.byDefault,
      always: node.always,
      identity: node.identity,
      stored: node.stored,
      expression: this.transformNode(node.expression)
    });
  }
  transformDefaultValue(node) {
    return requireAllProps({
      kind: "DefaultValueNode",
      defaultValue: this.transformNode(node.defaultValue)
    });
  }
  transformOn(node) {
    return requireAllProps({
      kind: "OnNode",
      on: this.transformNode(node.on)
    });
  }
  transformSelectModifier(node) {
    return requireAllProps({
      kind: "SelectModifierNode",
      modifier: node.modifier,
      rawModifier: this.transformNode(node.rawModifier)
    });
  }
  transformCreateType(node) {
    return requireAllProps({
      kind: "CreateTypeNode",
      name: this.transformNode(node.name),
      enum: this.transformNode(node.enum)
    });
  }
  transformDropType(node) {
    return requireAllProps({
      kind: "DropTypeNode",
      name: this.transformNode(node.name),
      ifExists: node.ifExists
    });
  }
  transformExplain(node) {
    return requireAllProps({
      kind: "ExplainNode",
      format: node.format,
      options: this.transformNode(node.options)
    });
  }
  transformSchemableIdentifier(node) {
    return requireAllProps({
      kind: "SchemableIdentifierNode",
      schema: this.transformNode(node.schema),
      identifier: this.transformNode(node.identifier)
    });
  }
  transformAggregateFunction(node) {
    return requireAllProps({
      kind: "AggregateFunctionNode",
      aggregated: this.transformNodeList(node.aggregated),
      distinct: node.distinct,
      filter: this.transformNode(node.filter),
      func: node.func,
      over: this.transformNode(node.over)
    });
  }
  transformOver(node) {
    return requireAllProps({
      kind: "OverNode",
      orderBy: this.transformNode(node.orderBy),
      partitionBy: this.transformNode(node.partitionBy)
    });
  }
  transformPartitionBy(node) {
    return requireAllProps({
      kind: "PartitionByNode",
      items: this.transformNodeList(node.items)
    });
  }
  transformPartitionByItem(node) {
    return requireAllProps({
      kind: "PartitionByItemNode",
      partitionBy: this.transformNode(node.partitionBy)
    });
  }
  transformBinaryOperation(node) {
    return requireAllProps({
      kind: "BinaryOperationNode",
      leftOperand: this.transformNode(node.leftOperand),
      operator: this.transformNode(node.operator),
      rightOperand: this.transformNode(node.rightOperand)
    });
  }
  transformUnaryOperation(node) {
    return requireAllProps({
      kind: "UnaryOperationNode",
      operator: this.transformNode(node.operator),
      operand: this.transformNode(node.operand)
    });
  }
  transformUsing(node) {
    return requireAllProps({
      kind: "UsingNode",
      tables: this.transformNodeList(node.tables)
    });
  }
  transformFunction(node) {
    return requireAllProps({
      kind: "FunctionNode",
      func: node.func,
      arguments: this.transformNodeList(node.arguments)
    });
  }
  transformCase(node) {
    return requireAllProps({
      kind: "CaseNode",
      value: this.transformNode(node.value),
      when: this.transformNodeList(node.when),
      else: this.transformNode(node.else),
      isStatement: node.isStatement
    });
  }
  transformWhen(node) {
    return requireAllProps({
      kind: "WhenNode",
      condition: this.transformNode(node.condition),
      result: this.transformNode(node.result)
    });
  }
  transformJSONReference(node) {
    return requireAllProps({
      kind: "JSONReferenceNode",
      reference: this.transformNode(node.reference),
      traversal: this.transformNode(node.traversal)
    });
  }
  transformJSONPath(node) {
    return requireAllProps({
      kind: "JSONPathNode",
      inOperator: this.transformNode(node.inOperator),
      pathLegs: this.transformNodeList(node.pathLegs)
    });
  }
  transformJSONPathLeg(node) {
    return requireAllProps({
      kind: "JSONPathLegNode",
      type: node.type,
      value: node.value
    });
  }
  transformJSONOperatorChain(node) {
    return requireAllProps({
      kind: "JSONOperatorChainNode",
      operator: this.transformNode(node.operator),
      values: this.transformNodeList(node.values)
    });
  }
  transformTuple(node) {
    return requireAllProps({
      kind: "TupleNode",
      values: this.transformNodeList(node.values)
    });
  }
  transformDataType(node) {
    return node;
  }
  transformSelectAll(node) {
    return node;
  }
  transformIdentifier(node) {
    return node;
  }
  transformValue(node) {
    return node;
  }
  transformPrimitiveValueList(node) {
    return node;
  }
  transformOperator(node) {
    return node;
  }
  transformDefaultInsertValue(node) {
    return node;
  }
};

// node_modules/kysely/dist/esm/plugin/with-schema/with-schema-transformer.js
var ROOT_OPERATION_NODES = freeze({
  AlterTableNode: true,
  CreateIndexNode: true,
  CreateSchemaNode: true,
  CreateTableNode: true,
  CreateTypeNode: true,
  CreateViewNode: true,
  DeleteQueryNode: true,
  DropIndexNode: true,
  DropSchemaNode: true,
  DropTableNode: true,
  DropTypeNode: true,
  DropViewNode: true,
  InsertQueryNode: true,
  RawNode: true,
  SelectQueryNode: true,
  UpdateQueryNode: true
});
var WithSchemaTransformer = class extends OperationNodeTransformer {
  #schema;
  #schemableIds = /* @__PURE__ */ new Set();
  #ctes = /* @__PURE__ */ new Set();
  constructor(schema) {
    super();
    this.#schema = schema;
  }
  transformNodeImpl(node) {
    if (!this.#isRootOperationNode(node)) {
      return super.transformNodeImpl(node);
    }
    const ctes = this.#collectCTEs(node);
    for (const cte of ctes) {
      this.#ctes.add(cte);
    }
    const tables = this.#collectSchemableIds(node);
    for (const table of tables) {
      this.#schemableIds.add(table);
    }
    const transformed = super.transformNodeImpl(node);
    for (const table of tables) {
      this.#schemableIds.delete(table);
    }
    for (const cte of ctes) {
      this.#ctes.delete(cte);
    }
    return transformed;
  }
  transformSchemableIdentifier(node) {
    const transformed = super.transformSchemableIdentifier(node);
    if (transformed.schema || !this.#schemableIds.has(node.identifier.name)) {
      return transformed;
    }
    return {
      ...transformed,
      schema: IdentifierNode.create(this.#schema)
    };
  }
  transformReferences(node) {
    const transformed = super.transformReferences(node);
    if (transformed.table.table.schema) {
      return transformed;
    }
    return {
      ...transformed,
      table: TableNode.createWithSchema(this.#schema, transformed.table.table.identifier.name)
    };
  }
  #isRootOperationNode(node) {
    return node.kind in ROOT_OPERATION_NODES;
  }
  #collectSchemableIds(node) {
    const schemableIds = /* @__PURE__ */ new Set();
    if ("name" in node && node.name && SchemableIdentifierNode.is(node.name)) {
      this.#collectSchemableId(node.name, schemableIds);
    }
    if ("from" in node && node.from) {
      for (const from of node.from.froms) {
        this.#collectSchemableIdsFromTableExpr(from, schemableIds);
      }
    }
    if ("into" in node && node.into) {
      this.#collectSchemableIdsFromTableExpr(node.into, schemableIds);
    }
    if ("table" in node && node.table) {
      this.#collectSchemableIdsFromTableExpr(node.table, schemableIds);
    }
    if ("joins" in node && node.joins) {
      for (const join of node.joins) {
        this.#collectSchemableIdsFromTableExpr(join.table, schemableIds);
      }
    }
    return schemableIds;
  }
  #collectCTEs(node) {
    const ctes = /* @__PURE__ */ new Set();
    if ("with" in node && node.with) {
      this.#collectCTEIds(node.with, ctes);
    }
    return ctes;
  }
  #collectSchemableIdsFromTableExpr(node, schemableIds) {
    const table = TableNode.is(node) ? node : AliasNode.is(node) && TableNode.is(node.node) ? node.node : null;
    if (table) {
      this.#collectSchemableId(table.table, schemableIds);
    }
  }
  #collectSchemableId(node, schemableIds) {
    const id = node.identifier.name;
    if (!this.#schemableIds.has(id) && !this.#ctes.has(id)) {
      schemableIds.add(id);
    }
  }
  #collectCTEIds(node, ctes) {
    for (const expr of node.expressions) {
      const cteId = expr.name.table.table.identifier.name;
      if (!this.#ctes.has(cteId)) {
        ctes.add(cteId);
      }
    }
  }
};

// node_modules/kysely/dist/esm/plugin/with-schema/with-schema-plugin.js
var WithSchemaPlugin = class {
  #transformer;
  constructor(schema) {
    this.#transformer = new WithSchemaTransformer(schema);
  }
  transformQuery(args) {
    return this.#transformer.transformNode(args.node);
  }
  async transformResult(args) {
    return args.result;
  }
};

// node_modules/kysely/dist/esm/query-creator.js
var QueryCreator = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  selectFrom(from) {
    return createSelectQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(from), this.#props.withNode)
    });
  }
  selectNoFrom(selection) {
    return createSelectQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: SelectQueryNode.cloneWithSelections(SelectQueryNode.create(this.#props.withNode), parseSelectArg(selection))
    });
  }
  /**
   * Creates an insert query.
   *
   * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
   * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
   * the inserted row if the db returned one.
   *
   * See the {@link InsertQueryBuilder.values | values} method for more info and examples. Also see
   * the {@link ReturningInterface.returning | returning} method for a way to return columns
   * on supported databases like PostgreSQL.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .insertInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston'
   *   })
   *   .executeTakeFirst()
   *
   * console.log(result.insertId)
   * ```
   *
   * Some databases like PostgreSQL support the `returning` method:
   *
   * ```ts
   * const { id } = await db
   *   .insertInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston'
   *   })
   *   .returning('id')
   *   .executeTakeFirst()
   * ```
   */
  insertInto(table) {
    return new InsertQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: InsertQueryNode.create(parseTable(table), this.#props.withNode)
    });
  }
  /**
   * Creates a replace query.
   *
   * A MySQL-only statement similar to {@link InsertQueryBuilder.onDuplicateKeyUpdate}
   * that deletes and inserts values on collision instead of updating existing rows.
   *
   * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
   * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
   * the inserted row if the db returned one.
   *
   * See the {@link InsertQueryBuilder.values | values} method for more info and examples.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .replaceInto('person')
   *   .values({
   *     first_name: 'Jennifer',
   *     last_name: 'Aniston'
   *   })
   *   .executeTakeFirst()
   *
   * console.log(result.insertId)
   * ```
   */
  replaceInto(table) {
    return new InsertQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: InsertQueryNode.create(parseTable(table), this.#props.withNode, true)
    });
  }
  deleteFrom(tables) {
    return new DeleteQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: DeleteQueryNode.create(parseTableExpressionOrList(tables), this.#props.withNode)
    });
  }
  updateTable(table) {
    return new UpdateQueryBuilder({
      queryId: createQueryId(),
      executor: this.#props.executor,
      queryNode: UpdateQueryNode.create(parseTableExpression(table), this.#props.withNode)
    });
  }
  /**
   * Creates a `with` query (Common Table Expression).
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .with('jennifers', (db) => db
   *     .selectFrom('person')
   *     .where('first_name', '=', 'Jennifer')
   *     .select(['id', 'age'])
   *   )
   *   .with('adult_jennifers', (db) => db
   *     .selectFrom('jennifers')
   *     .where('age', '>', 18)
   *     .select(['id', 'age'])
   *   )
   *   .selectFrom('adult_jennifers')
   *   .where('age', '<', 60)
   *   .selectAll()
   *   .execute()
   * ```
   *
   * The CTE name can optionally specify column names in addition to
   * a name. In that case Kysely requires the expression to retun
   * rows with the same columns.
   *
   * ```ts
   * await db
   *   .with('jennifers(id, age)', (db) => db
   *     .selectFrom('person')
   *     .where('first_name', '=', 'Jennifer')
   *     // This is ok since we return columns with the same
   *     // names as specified by `jennifers(id, age)`.
   *     .select(['id', 'age'])
   *   )
   *   .selectFrom('jennifers')
   *   .selectAll()
   *   .execute()
   * ```
   *
   * The first argument can also be a callback. The callback is passed
   * a `CTEBuilder` instance that can be used to configure the CTE:
   *
   * ```ts
   * await db
   *   .with(
   *     (cte) => cte('jennifers').materialized(),
   *     (db) => db
   *       .selectFrom('person')
   *       .where('first_name', '=', 'Jennifer')
   *       .select(['id', 'age'])
   *   )
   *   .selectFrom('jennifers')
   *   .selectAll()
   *   .execute()
   * ```
   */
  with(nameOrBuilder, expression) {
    const cte = parseCommonTableExpression(nameOrBuilder, expression);
    return new QueryCreator({
      ...this.#props,
      withNode: this.#props.withNode ? WithNode.cloneWithExpression(this.#props.withNode, cte) : WithNode.create(cte)
    });
  }
  /**
   * Creates a recursive `with` query (Common Table Expression).
   *
   * Note that recursiveness is a property of the whole `with` statement.
   * You cannot have recursive and non-recursive CTEs in a same `with` statement.
   * Therefore the recursiveness is determined by the **first** `with` or
   * `withRecusive` call you make.
   *
   * See the {@link with} method for examples and more documentation.
   */
  withRecursive(nameOrBuilder, expression) {
    const cte = parseCommonTableExpression(nameOrBuilder, expression);
    return new QueryCreator({
      ...this.#props,
      withNode: this.#props.withNode ? WithNode.cloneWithExpression(this.#props.withNode, cte) : WithNode.create(cte, { recursive: true })
    });
  }
  /**
   * Returns a copy of this query creator instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new QueryCreator({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this query creator instance without any plugins.
   */
  withoutPlugins() {
    return new QueryCreator({
      ...this.#props,
      executor: this.#props.executor.withoutPlugins()
    });
  }
  /**
   * Sets the schema to be used for all table references that don't explicitly
   * specify a schema.
   *
   * This only affects the query created through the builder returned from
   * this method and doesn't modify the `db` instance.
   *
   * See [this recipe](https://github.com/koskimas/kysely/tree/master/site/docs/recipes/schemas.md)
   * for a more detailed explanation.
   *
   * ### Examples
   *
   * ```
   * await db
   *   .withSchema('mammals')
   *   .selectFrom('pet')
   *   .selectAll()
   *   .innerJoin('public.person', 'public.person.id', 'pet.owner_id')
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select * from "mammals"."pet"
   * inner join "public"."person"
   * on "public"."person"."id" = "mammals"."pet"."owner_id"
   * ```
   *
   * `withSchema` is smart enough to not add schema for aliases,
   * common table expressions or other places where the schema
   * doesn't belong to:
   *
   * ```
   * await db
   *   .withSchema('mammals')
   *   .selectFrom('pet as p')
   *   .select('p.name')
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "p"."name" from "mammals"."pet" as "p"
   * ```
   */
  withSchema(schema) {
    return new QueryCreator({
      ...this.#props,
      executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
};

// node_modules/kysely/dist/esm/query-executor/noop-query-executor.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/query-executor/query-executor-base.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/util/deferred.js
init_modules_watch_stub();
var Deferred = class {
  #promise;
  #resolve;
  #reject;
  constructor() {
    this.#promise = new Promise((resolve, reject) => {
      this.#reject = reject;
      this.#resolve = resolve;
    });
  }
  get promise() {
    return this.#promise;
  }
  resolve = (value) => {
    if (this.#resolve) {
      this.#resolve(value);
    }
  };
  reject = (reason) => {
    if (this.#reject) {
      this.#reject(reason);
    }
  };
};

// node_modules/kysely/dist/esm/util/log-once.js
init_modules_watch_stub();
var LOGGED_MESSAGES = /* @__PURE__ */ new Set();
function logOnce(message) {
  if (LOGGED_MESSAGES.has(message)) {
    return;
  }
  LOGGED_MESSAGES.add(message);
  console.log(message);
}

// node_modules/kysely/dist/esm/query-executor/query-executor-base.js
var NO_PLUGINS = freeze([]);
var QueryExecutorBase = class {
  #plugins;
  constructor(plugins = NO_PLUGINS) {
    this.#plugins = plugins;
  }
  get plugins() {
    return this.#plugins;
  }
  transformQuery(node, queryId) {
    for (const plugin of this.#plugins) {
      const transformedNode = plugin.transformQuery({ node, queryId });
      if (transformedNode.kind === node.kind) {
        node = transformedNode;
      } else {
        throw new Error([
          `KyselyPlugin.transformQuery must return a node`,
          `of the same kind that was given to it.`,
          `The plugin was given a ${node.kind}`,
          `but it returned a ${transformedNode.kind}`
        ].join(" "));
      }
    }
    return node;
  }
  async executeQuery(compiledQuery, queryId) {
    return await this.provideConnection(async (connection) => {
      const result = await connection.executeQuery(compiledQuery);
      const transformedResult = await this.#transformResult(result, queryId);
      warnOfOutdatedDriverOrPlugins(result, transformedResult);
      return transformedResult;
    });
  }
  async *stream(compiledQuery, chunkSize, queryId) {
    const connectionDefer = new Deferred();
    const connectionReleaseDefer = new Deferred();
    this.provideConnection(async (connection2) => {
      connectionDefer.resolve(connection2);
      return await connectionReleaseDefer.promise;
    }).catch((ex) => connectionDefer.reject(ex));
    const connection = await connectionDefer.promise;
    try {
      for await (const result of connection.streamQuery(compiledQuery, chunkSize)) {
        yield await this.#transformResult(result, queryId);
      }
    } finally {
      connectionReleaseDefer.resolve();
    }
  }
  async #transformResult(result, queryId) {
    for (const plugin of this.#plugins) {
      result = await plugin.transformResult({ result, queryId });
    }
    return result;
  }
};
function warnOfOutdatedDriverOrPlugins(result, transformedResult) {
  const { numAffectedRows } = result;
  if (numAffectedRows === void 0 && result.numUpdatedOrDeletedRows === void 0 || numAffectedRows !== void 0 && transformedResult.numAffectedRows !== void 0) {
    return;
  }
  logOnce("kysely:warning: outdated driver/plugin detected! QueryResult.numUpdatedOrDeletedRows is deprecated and will be removed in a future release.");
}

// node_modules/kysely/dist/esm/query-executor/noop-query-executor.js
var NoopQueryExecutor = class extends QueryExecutorBase {
  get adapter() {
    throw new Error("this query cannot be compiled to SQL");
  }
  compileQuery() {
    throw new Error("this query cannot be compiled to SQL");
  }
  provideConnection() {
    throw new Error("this query cannot be executed");
  }
  withConnectionProvider() {
    throw new Error("this query cannot have a connection provider");
  }
  withPlugin(plugin) {
    return new NoopQueryExecutor([...this.plugins, plugin]);
  }
  withPlugins(plugins) {
    return new NoopQueryExecutor([...this.plugins, ...plugins]);
  }
  withPluginAtFront(plugin) {
    return new NoopQueryExecutor([plugin, ...this.plugins]);
  }
  withoutPlugins() {
    return new NoopQueryExecutor([]);
  }
};
var NOOP_QUERY_EXECUTOR = new NoopQueryExecutor();

// node_modules/kysely/dist/esm/parser/parse-utils.js
function createQueryCreator() {
  return new QueryCreator({
    executor: NOOP_QUERY_EXECUTOR
  });
}
function createJoinBuilder(joinType, table) {
  return new JoinBuilder({
    joinNode: JoinNode.create(joinType, parseTableExpression(table))
  });
}
function createOverBuilder() {
  return new OverBuilder({
    overNode: OverNode.create()
  });
}

// node_modules/kysely/dist/esm/parser/join-parser.js
function parseJoin(joinType, args) {
  if (args.length === 3) {
    return parseSingleOnJoin(joinType, args[0], args[1], args[2]);
  } else if (args.length === 2) {
    return parseCallbackJoin(joinType, args[0], args[1]);
  } else {
    throw new Error("not implemented");
  }
}
function parseCallbackJoin(joinType, from, callback) {
  return callback(createJoinBuilder(joinType, from)).toOperationNode();
}
function parseSingleOnJoin(joinType, from, lhsColumn, rhsColumn) {
  return JoinNode.createWithOn(joinType, parseTableExpression(from), parseReferentialBinaryOperation(lhsColumn, "=", rhsColumn));
}

// node_modules/kysely/dist/esm/operation-node/offset-node.js
init_modules_watch_stub();
var OffsetNode = freeze({
  is(node) {
    return node.kind === "OffsetNode";
  },
  create(offset) {
    return freeze({
      kind: "OffsetNode",
      offset: ValueNode.create(offset)
    });
  }
});

// node_modules/kysely/dist/esm/parser/group-by-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/group-by-item-node.js
init_modules_watch_stub();
var GroupByItemNode = freeze({
  is(node) {
    return node.kind === "GroupByItemNode";
  },
  create(groupBy) {
    return freeze({
      kind: "GroupByItemNode",
      groupBy
    });
  }
});

// node_modules/kysely/dist/esm/parser/group-by-parser.js
function parseGroupBy(groupBy) {
  groupBy = isFunction(groupBy) ? groupBy(expressionBuilder()) : groupBy;
  return parseReferenceExpressionOrList(groupBy).map(GroupByItemNode.create);
}

// node_modules/kysely/dist/esm/parser/set-operation-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/set-operation-node.js
init_modules_watch_stub();
var SetOperationNode = freeze({
  is(node) {
    return node.kind === "SetOperationNode";
  },
  create(operator, expression, all) {
    return freeze({
      kind: "SetOperationNode",
      operator,
      expression,
      all
    });
  }
});

// node_modules/kysely/dist/esm/parser/set-operation-parser.js
function parseSetOperations(operator, expression, all) {
  if (isFunction(expression)) {
    expression = expression(createExpressionBuilder());
  }
  if (!isReadonlyArray(expression)) {
    expression = [expression];
  }
  return expression.map((expr) => SetOperationNode.create(operator, parseExpression(expr), all));
}

// node_modules/kysely/dist/esm/expression/expression-wrapper.js
init_modules_watch_stub();
var ExpressionWrapper = class {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedExpressionWrapper(this, alias);
  }
  or(...args) {
    return new OrWrapper(OrNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
  }
  and(...args) {
    return new AndWrapper(AndNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
  }
  /**
   * Change the output type of the expression.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `ExpressionWrapper` with a new output type.
   */
  $castTo() {
    return new ExpressionWrapper(this.#node);
  }
  toOperationNode() {
    return this.#node;
  }
};
var AliasedExpressionWrapper = class {
  #expr;
  #alias;
  constructor(expr, alias) {
    this.#expr = expr;
    this.#alias = alias;
  }
  /** @private */
  get expression() {
    return this.#expr;
  }
  /** @private */
  get alias() {
    return this.#alias;
  }
  toOperationNode() {
    return AliasNode.create(this.#expr.toOperationNode(), isOperationNodeSource(this.#alias) ? this.#alias.toOperationNode() : IdentifierNode.create(this.#alias));
  }
};
var OrWrapper = class {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedExpressionWrapper(this, alias);
  }
  or(...args) {
    return new OrWrapper(OrNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
  }
  /**
   * Change the output type of the expression.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `OrWrapper` with a new output type.
   */
  $castTo() {
    return new OrWrapper(this.#node);
  }
  toOperationNode() {
    return ParensNode.create(this.#node);
  }
};
var AndWrapper = class {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedExpressionWrapper(this, alias);
  }
  and(...args) {
    return new AndWrapper(AndNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
  }
  /**
   * Change the output type of the expression.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `AndWrapper` with a new output type.
   */
  $castTo() {
    return new AndWrapper(this.#node);
  }
  toOperationNode() {
    return ParensNode.create(this.#node);
  }
};

// node_modules/kysely/dist/esm/query-builder/select-query-builder.js
var SelectQueryBuilderImpl = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  get expressionType() {
    return void 0;
  }
  get isSelectQueryBuilder() {
    return true;
  }
  where(...args) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  whereRef(lhs, op, rhs) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  having(...args) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithHaving(this.#props.queryNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  havingRef(lhs, op, rhs) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithHaving(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  select(selection) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSelections(this.#props.queryNode, parseSelectArg(selection))
    });
  }
  distinctOn(selection) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithDistinctOn(this.#props.queryNode, parseReferenceExpressionOrList(selection))
    });
  }
  modifyFront(modifier) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
    });
  }
  modifyEnd(modifier) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
    });
  }
  distinct() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, SelectModifierNode.create("Distinct"))
    });
  }
  forUpdate() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForUpdate"))
    });
  }
  forShare() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForShare"))
    });
  }
  forKeyShare() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForKeyShare"))
    });
  }
  forNoKeyUpdate() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForNoKeyUpdate"))
    });
  }
  skipLocked() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("SkipLocked"))
    });
  }
  noWait() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("NoWait"))
    });
  }
  selectAll(table) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSelections(this.#props.queryNode, parseSelectAll(table))
    });
  }
  innerJoin(...args) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("InnerJoin", args))
    });
  }
  leftJoin(...args) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("LeftJoin", args))
    });
  }
  rightJoin(...args) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("RightJoin", args))
    });
  }
  fullJoin(...args) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("FullJoin", args))
    });
  }
  innerJoinLateral(...args) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("LateralInnerJoin", args))
    });
  }
  leftJoinLateral(...args) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin("LateralLeftJoin", args))
    });
  }
  orderBy(...args) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy(args))
    });
  }
  groupBy(groupBy) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithGroupByItems(this.#props.queryNode, parseGroupBy(groupBy))
    });
  }
  limit(limit) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(limit))
    });
  }
  offset(offset) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithOffset(this.#props.queryNode, OffsetNode.create(offset))
    });
  }
  union(expression) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("union", expression, false))
    });
  }
  unionAll(expression) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("union", expression, true))
    });
  }
  intersect(expression) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("intersect", expression, false))
    });
  }
  intersectAll(expression) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("intersect", expression, true))
    });
  }
  except(expression) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("except", expression, false))
    });
  }
  exceptAll(expression) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("except", expression, true))
    });
  }
  as(alias) {
    return new AliasedSelectQueryBuilderImpl(this, alias);
  }
  clearSelect() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithoutSelections(this.#props.queryNode)
    });
  }
  clearWhere() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode)
    });
  }
  clearLimit() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithoutLimit(this.#props.queryNode)
    });
  }
  clearOffset() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithoutOffset(this.#props.queryNode)
    });
  }
  clearOrderBy() {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: SelectQueryNode.cloneWithoutOrderBy(this.#props.queryNode)
    });
  }
  $call(func) {
    return func(this);
  }
  $if(condition, func) {
    if (condition) {
      return func(this);
    }
    return new SelectQueryBuilderImpl({
      ...this.#props
    });
  }
  $castTo() {
    return new SelectQueryBuilderImpl(this.#props);
  }
  $narrowType() {
    return new SelectQueryBuilderImpl(this.#props);
  }
  $assertType() {
    return new SelectQueryBuilderImpl(this.#props);
  }
  $asTuple() {
    return new ExpressionWrapper(this.toOperationNode());
  }
  withPlugin(plugin) {
    return new SelectQueryBuilderImpl({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    const compiledQuery = this.compile();
    const result = await this.#props.executor.executeQuery(compiledQuery, this.#props.queryId);
    return result.rows;
  }
  async executeTakeFirst() {
    const [result] = await this.execute();
    return result;
  }
  async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
    const result = await this.executeTakeFirst();
    if (result === void 0) {
      const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
      throw error;
    }
    return result;
  }
  async *stream(chunkSize = 100) {
    const compiledQuery = this.compile();
    const stream = this.#props.executor.stream(compiledQuery, chunkSize, this.#props.queryId);
    for await (const item of stream) {
      yield* item.rows;
    }
  }
  async explain(format, options) {
    const builder = new SelectQueryBuilderImpl({
      ...this.#props,
      queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
    });
    return await builder.execute();
  }
};
preventAwait(SelectQueryBuilderImpl, "don't await SelectQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
function createSelectQueryBuilder(props) {
  return new SelectQueryBuilderImpl(props);
}
var AliasedSelectQueryBuilderImpl = class {
  #queryBuilder;
  #alias;
  constructor(queryBuilder, alias) {
    this.#queryBuilder = queryBuilder;
    this.#alias = alias;
  }
  get expression() {
    return this.#queryBuilder;
  }
  get alias() {
    return this.#alias;
  }
  get isAliasedSelectQueryBuilder() {
    return true;
  }
  toOperationNode() {
    return AliasNode.create(this.#queryBuilder.toOperationNode(), IdentifierNode.create(this.#alias));
  }
};
preventAwait(AliasedSelectQueryBuilderImpl, "don't await AliasedSelectQueryBuilder instances directly. AliasedSelectQueryBuilder should never be executed directly since it's always a part of another query.");

// node_modules/kysely/dist/esm/query-builder/function-module.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/aggregate-function-node.js
init_modules_watch_stub();
var AggregateFunctionNode = freeze({
  is(node) {
    return node.kind === "AggregateFunctionNode";
  },
  create(aggregateFunction, aggregated = []) {
    return freeze({
      kind: "AggregateFunctionNode",
      func: aggregateFunction,
      aggregated
    });
  },
  cloneWithDistinct(aggregateFunctionNode) {
    return freeze({
      ...aggregateFunctionNode,
      distinct: true
    });
  },
  cloneWithFilter(aggregateFunctionNode, filter) {
    return freeze({
      ...aggregateFunctionNode,
      filter: aggregateFunctionNode.filter ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "And", filter) : WhereNode.create(filter)
    });
  },
  cloneWithOrFilter(aggregateFunctionNode, filter) {
    return freeze({
      ...aggregateFunctionNode,
      filter: aggregateFunctionNode.filter ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "Or", filter) : WhereNode.create(filter)
    });
  },
  cloneWithOver(aggregateFunctionNode, over) {
    return freeze({
      ...aggregateFunctionNode,
      over
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/function-node.js
init_modules_watch_stub();
var FunctionNode = freeze({
  is(node) {
    return node.kind === "FunctionNode";
  },
  create(func, args) {
    return freeze({
      kind: "FunctionNode",
      func,
      arguments: args
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/aggregate-function-builder.js
init_modules_watch_stub();
var AggregateFunctionBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  /**
   * Returns an aliased version of the function.
   *
   * In addition to slapping `as "the_alias"` to the end of the SQL,
   * this method also provides strict typing:
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.count<number>('id').as('person_count')
   *   )
   *   .executeTakeFirstOrThrow()
   *
   * // `person_count: number` field exists in the result type.
   * console.log(result.person_count)
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select count("id") as "person_count"
   * from "person"
   * ```
   */
  as(alias) {
    return new AliasedAggregateFunctionBuilder(this, alias);
  }
  /**
   * Adds a `distinct` clause inside the function.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select((eb) =>
   *     eb.fn.count<number>('first_name').distinct().as('first_name_count')
   *   )
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select count(distinct "first_name") as "first_name_count"
   * from "person"
   * ```
   */
  distinct() {
    return new AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: AggregateFunctionNode.cloneWithDistinct(this.#props.aggregateFunctionNode)
    });
  }
  filterWhere(...args) {
    return new AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, parseValueBinaryOperationOrExpression(args))
    });
  }
  /**
   * Adds a `filter` clause with a nested `where` clause after the function, where
   * both sides of the operator are references to columns.
   *
   * Similar to {@link WhereInterface}'s `whereRef` method.
   *
   * ### Examples
   *
   * Count people with same first and last names versus general public:
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select((eb) => [
   *     eb.fn
   *       .count<number>('id')
   *       .filterWhereRef('first_name', '=', 'last_name')
   *       .as('repeat_name_count'),
   *     eb.fn.count<number>('id').as('total_count'),
   *   ])
   *   .executeTakeFirstOrThrow()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select
   *   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
   *   count("id") as "total_count"
   * from "person"
   * ```
   */
  filterWhereRef(lhs, op, rhs) {
    return new AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, parseReferentialBinaryOperation(lhs, op, rhs))
    });
  }
  /**
   * Adds an `over` clause (window functions) after the function.
   *
   * ### Examples
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.avg<number>('age').over().as('average_age')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select avg("age") over() as "average_age"
   * from "person"
   * ```
   *
   * Also supports passing a callback that returns an over builder,
   * allowing to add partition by and sort by clauses inside over.
   *
   * ```ts
   * const result = await db
   *   .selectFrom('person')
   *   .select(
   *     (eb) => eb.fn.avg<number>('age').over(
   *       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
   *     ).as('average_age')
   *   )
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
   * from "person"
   * ```
   */
  over(over) {
    const builder = createOverBuilder();
    return new AggregateFunctionBuilder({
      ...this.#props,
      aggregateFunctionNode: AggregateFunctionNode.cloneWithOver(this.#props.aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode())
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.aggregateFunctionNode;
  }
};
preventAwait(AggregateFunctionBuilder, "don't await AggregateFunctionBuilder instances. They are never executed directly and are always just a part of a query.");
var AliasedAggregateFunctionBuilder = class {
  #aggregateFunctionBuilder;
  #alias;
  constructor(aggregateFunctionBuilder, alias) {
    this.#aggregateFunctionBuilder = aggregateFunctionBuilder;
    this.#alias = alias;
  }
  /** @private */
  get expression() {
    return this.#aggregateFunctionBuilder;
  }
  /** @private */
  get alias() {
    return this.#alias;
  }
  toOperationNode() {
    return AliasNode.create(this.#aggregateFunctionBuilder.toOperationNode(), IdentifierNode.create(this.#alias));
  }
};

// node_modules/kysely/dist/esm/query-builder/function-module.js
function createFunctionModule() {
  const fn = (name, args) => {
    return new ExpressionWrapper(FunctionNode.create(name, parseReferenceExpressionOrList(args)));
  };
  const agg = (name, args) => {
    return new AggregateFunctionBuilder({
      aggregateFunctionNode: AggregateFunctionNode.create(name, args ? parseReferenceExpressionOrList(args) : void 0)
    });
  };
  return Object.assign(fn, {
    agg,
    avg(column) {
      return agg("avg", [column]);
    },
    coalesce(value, ...otherValues) {
      return fn("coalesce", [value, ...otherValues]);
    },
    count(column) {
      return agg("count", [column]);
    },
    countAll(table) {
      return new AggregateFunctionBuilder({
        aggregateFunctionNode: AggregateFunctionNode.create("count", parseSelectAll(table))
      });
    },
    max(column) {
      return agg("max", [column]);
    },
    min(column) {
      return agg("min", [column]);
    },
    sum(column) {
      return agg("sum", [column]);
    },
    any(column) {
      return fn("any", [column]);
    }
  });
}

// node_modules/kysely/dist/esm/parser/unary-operation-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/unary-operation-node.js
init_modules_watch_stub();
var UnaryOperationNode = freeze({
  is(node) {
    return node.kind === "UnaryOperationNode";
  },
  create(operator, operand) {
    return freeze({
      kind: "UnaryOperationNode",
      operator,
      operand
    });
  }
});

// node_modules/kysely/dist/esm/parser/unary-operation-parser.js
function parseUnaryOperation(operator, operand) {
  return UnaryOperationNode.create(OperatorNode.create(operator), parseReferenceExpression(operand));
}

// node_modules/kysely/dist/esm/query-builder/case-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/case-node.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/when-node.js
init_modules_watch_stub();
var WhenNode = freeze({
  is(node) {
    return node.kind === "WhenNode";
  },
  create(condition) {
    return freeze({
      kind: "WhenNode",
      condition
    });
  },
  cloneWithResult(whenNode, result) {
    return freeze({
      ...whenNode,
      result
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/case-node.js
var CaseNode = freeze({
  is(node) {
    return node.kind === "CaseNode";
  },
  create(value) {
    return freeze({
      kind: "CaseNode",
      value
    });
  },
  cloneWithWhen(caseNode, when) {
    return freeze({
      ...caseNode,
      when: freeze(caseNode.when ? [...caseNode.when, when] : [when])
    });
  },
  cloneWithThen(caseNode, then) {
    return freeze({
      ...caseNode,
      when: caseNode.when ? freeze([
        ...caseNode.when.slice(0, -1),
        WhenNode.cloneWithResult(caseNode.when[caseNode.when.length - 1], then)
      ]) : void 0
    });
  },
  cloneWith(caseNode, props) {
    return freeze({
      ...caseNode,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/case-builder.js
var CaseBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  when(...args) {
    return new CaseThenBuilder({
      ...this.#props,
      node: CaseNode.cloneWithWhen(this.#props.node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
    });
  }
};
var CaseThenBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  then(valueExpression) {
    return new CaseWhenBuilder({
      ...this.#props,
      node: CaseNode.cloneWithThen(this.#props.node, isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression))
    });
  }
};
var CaseWhenBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  when(...args) {
    return new CaseThenBuilder({
      ...this.#props,
      node: CaseNode.cloneWithWhen(this.#props.node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
    });
  }
  else(valueExpression) {
    return new CaseEndBuilder({
      ...this.#props,
      node: CaseNode.cloneWith(this.#props.node, {
        else: isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression)
      })
    });
  }
  end() {
    return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: false }));
  }
  endCase() {
    return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: true }));
  }
};
var CaseEndBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  end() {
    return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: false }));
  }
  endCase() {
    return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: true }));
  }
};

// node_modules/kysely/dist/esm/query-builder/json-path-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/json-path-leg-node.js
init_modules_watch_stub();
var JSONPathLegNode = freeze({
  is(node) {
    return node.kind === "JSONPathLegNode";
  },
  create(type, value) {
    return freeze({
      kind: "JSONPathLegNode",
      type,
      value
    });
  }
});

// node_modules/kysely/dist/esm/query-builder/json-path-builder.js
var JSONPathBuilder = class {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /**
   * Access an element of a JSON array in a specific location.
   *
   * Since there's no guarantee an element exists in the given array location, the
   * resulting type is always nullable. If you're sure the element exists, you
   * should use {@link SelectQueryBuilder.$assertType} to narrow the type safely.
   *
   * See also {@link key} to access properties of JSON objects.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('nicknames', '->').at(0).as('primary_nickname')
   * )
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "nicknames"->0 as "primary_nickname" from "person"
   *```
   *
   * Combined with {@link key}:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('experience', '->').at(0).key('role').as('first_role')
   * )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "experience"->0->'role' as "first_role" from "person"
   * ```
   *
   * You can use `'last'` to access the last element of the array in MySQL:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('nicknames', '->$').at('last').as('last_nickname')
   * )
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * select `nicknames`->'$[last]' as `last_nickname` from `person`
   * ```
   *
   * Or `'#-1'` in SQLite:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('nicknames', '->>$').at('#-1').as('last_nickname')
   * )
   * ```
   *
   * The generated SQL (SQLite):
   *
   * ```sql
   * select "nicknames"->>'$[#-1]' as `last_nickname` from `person`
   * ```
   */
  at(index) {
    return this.#createBuilderWithPathLeg("ArrayLocation", index);
  }
  /**
   * Access a property of a JSON object.
   *
   * If a field is optional, the resulting type will be nullable.
   *
   * See also {@link at} to access elements of JSON arrays.
   *
   * ### Examples
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('address', '->').key('city').as('city')
   * )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "address"->'city' as "city" from "person"
   * ```
   *
   * Going deeper:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('profile', '->$').key('website').key('url').as('website_url')
   * )
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * select `profile`->'$.website.url' as `website_url` from `person`
   * ```
   *
   * Combined with {@link at}:
   *
   * ```ts
   * db.selectFrom('person').select(eb =>
   *   eb.ref('profile', '->').key('addresses').at(0).key('city').as('city')
   * )
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "profile"->'addresses'->0->'city' as "city" from "person"
   * ```
   */
  key(key) {
    return this.#createBuilderWithPathLeg("Member", key);
  }
  #createBuilderWithPathLeg(legType, value) {
    return new TraversedJSONPathBuilder(JSONReferenceNode.cloneWithTraversal(this.#node, JSONPathNode.is(this.#node.traversal) ? JSONPathNode.cloneWithLeg(this.#node.traversal, JSONPathLegNode.create(legType, value)) : JSONOperatorChainNode.cloneWithValue(this.#node.traversal, ValueNode.createImmediate(value))));
  }
};
var TraversedJSONPathBuilder = class extends JSONPathBuilder {
  #node;
  constructor(node) {
    super(node);
    this.#node = node;
  }
  /** @private */
  get expressionType() {
    return void 0;
  }
  as(alias) {
    return new AliasedJSONPathBuilder(this, alias);
  }
  /**
   * Change the output type of the json path.
   *
   * This method call doesn't change the SQL in any way. This methods simply
   * returns a copy of this `JSONPathBuilder` with a new output type.
   */
  $castTo() {
    return new JSONPathBuilder(this.#node);
  }
  toOperationNode() {
    return this.#node;
  }
};
var AliasedJSONPathBuilder = class {
  #jsonPath;
  #alias;
  constructor(jsonPath, alias) {
    this.#jsonPath = jsonPath;
    this.#alias = alias;
  }
  /** @private */
  get expression() {
    return this.#jsonPath;
  }
  /** @private */
  get alias() {
    return this.#alias;
  }
  toOperationNode() {
    return AliasNode.create(this.#jsonPath.toOperationNode(), isOperationNodeSource(this.#alias) ? this.#alias.toOperationNode() : IdentifierNode.create(this.#alias));
  }
};

// node_modules/kysely/dist/esm/operation-node/tuple-node.js
init_modules_watch_stub();
var TupleNode = freeze({
  is(node) {
    return node.kind === "TupleNode";
  },
  create(values) {
    return freeze({
      kind: "TupleNode",
      values: freeze(values)
    });
  }
});

// node_modules/kysely/dist/esm/expression/expression-builder.js
function createExpressionBuilder(executor = NOOP_QUERY_EXECUTOR) {
  function binary(lhs, op, rhs) {
    return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
  }
  function unary(op, expr) {
    return new ExpressionWrapper(parseUnaryOperation(op, expr));
  }
  const eb = Object.assign(binary, {
    fn: void 0,
    eb: void 0,
    selectFrom(table) {
      return createSelectQueryBuilder({
        queryId: createQueryId(),
        executor,
        queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(table))
      });
    },
    selectNoFrom(selection) {
      return createSelectQueryBuilder({
        queryId: createQueryId(),
        executor,
        queryNode: SelectQueryNode.cloneWithSelections(SelectQueryNode.create(), parseSelectArg(selection))
      });
    },
    case(reference) {
      return new CaseBuilder({
        node: CaseNode.create(isUndefined(reference) ? void 0 : parseReferenceExpression(reference))
      });
    },
    ref(reference, op) {
      if (isUndefined(op)) {
        return new ExpressionWrapper(parseStringReference(reference));
      }
      return new JSONPathBuilder(parseJSONReference(reference, op));
    },
    val(value) {
      return new ExpressionWrapper(parseValueExpressionOrList(value));
    },
    refTuple(...values) {
      return new ExpressionWrapper(TupleNode.create(values.map(parseReferenceExpression)));
    },
    tuple(...values) {
      return new ExpressionWrapper(TupleNode.create(values.map(parseValueExpression)));
    },
    lit(value) {
      return new ExpressionWrapper(parseSafeImmediateValue(value));
    },
    // @deprecated
    cmpr(lhs, op, rhs) {
      return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
    },
    // @deprecated
    bxp(lhs, op, rhs) {
      return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
    },
    unary,
    not(expr) {
      return unary("not", expr);
    },
    exists(expr) {
      return unary("exists", expr);
    },
    neg(expr) {
      return unary("-", expr);
    },
    between(expr, start, end) {
      return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create("between"), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
    },
    betweenSymmetric(expr, start, end) {
      return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create("between symmetric"), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
    },
    and(exprs) {
      if (isReadonlyArray(exprs)) {
        return new ExpressionWrapper(parseFilterList(exprs, "and"));
      }
      return new ExpressionWrapper(parseFilterObject(exprs, "and"));
    },
    or(exprs) {
      if (isReadonlyArray(exprs)) {
        return new ExpressionWrapper(parseFilterList(exprs, "or"));
      }
      return new ExpressionWrapper(parseFilterObject(exprs, "or"));
    },
    parens(...args) {
      const node = parseValueBinaryOperationOrExpression(args);
      if (ParensNode.is(node)) {
        return new ExpressionWrapper(node);
      } else {
        return new ExpressionWrapper(ParensNode.create(node));
      }
    },
    withSchema(schema) {
      return createExpressionBuilder(executor.withPluginAtFront(new WithSchemaPlugin(schema)));
    }
  });
  eb.fn = createFunctionModule();
  eb.eb = eb;
  return eb;
}
function expressionBuilder(_) {
  return createExpressionBuilder();
}

// node_modules/kysely/dist/esm/parser/expression-parser.js
function parseExpression(exp) {
  if (isOperationNodeSource(exp)) {
    return exp.toOperationNode();
  } else if (isFunction(exp)) {
    return exp(expressionBuilder()).toOperationNode();
  }
  throw new Error(`invalid expression: ${JSON.stringify(exp)}`);
}
function parseAliasedExpression(exp) {
  if (isOperationNodeSource(exp)) {
    return exp.toOperationNode();
  } else if (isFunction(exp)) {
    return exp(expressionBuilder()).toOperationNode();
  }
  throw new Error(`invalid aliased expression: ${JSON.stringify(exp)}`);
}
function isExpressionOrFactory(obj) {
  return isExpression(obj) || isAliasedExpression(obj) || isFunction(obj);
}

// node_modules/kysely/dist/esm/parser/table-parser.js
function parseTableExpressionOrList(table) {
  if (isReadonlyArray(table)) {
    return table.map((it) => parseTableExpression(it));
  } else {
    return [parseTableExpression(table)];
  }
}
function parseTableExpression(table) {
  if (isString(table)) {
    return parseAliasedTable(table);
  } else {
    return parseAliasedExpression(table);
  }
}
function parseAliasedTable(from) {
  const ALIAS_SEPARATOR = " as ";
  if (from.includes(ALIAS_SEPARATOR)) {
    const [table, alias] = from.split(ALIAS_SEPARATOR).map(trim2);
    return AliasNode.create(parseTable(table), IdentifierNode.create(alias));
  } else {
    return parseTable(from);
  }
}
function parseTable(from) {
  const SCHEMA_SEPARATOR = ".";
  if (from.includes(SCHEMA_SEPARATOR)) {
    const [schema, table] = from.split(SCHEMA_SEPARATOR).map(trim2);
    return TableNode.createWithSchema(schema, table);
  } else {
    return TableNode.create(from);
  }
}
function trim2(str) {
  return str.trim();
}

// node_modules/kysely/dist/esm/schema/alter-table-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/add-column-node.js
init_modules_watch_stub();
var AddColumnNode = freeze({
  is(node) {
    return node.kind === "AddColumnNode";
  },
  create(column) {
    return freeze({
      kind: "AddColumnNode",
      column
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/column-definition-node.js
init_modules_watch_stub();
var ColumnDefinitionNode = freeze({
  is(node) {
    return node.kind === "ColumnDefinitionNode";
  },
  create(column, dataType) {
    return freeze({
      kind: "ColumnDefinitionNode",
      column: ColumnNode.create(column),
      dataType
    });
  },
  cloneWithFrontModifier(node, modifier) {
    return freeze({
      ...node,
      frontModifiers: node.frontModifiers ? freeze([...node.frontModifiers, modifier]) : [modifier]
    });
  },
  cloneWithEndModifier(node, modifier) {
    return freeze({
      ...node,
      endModifiers: node.endModifiers ? freeze([...node.endModifiers, modifier]) : [modifier]
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-column-node.js
init_modules_watch_stub();
var DropColumnNode = freeze({
  is(node) {
    return node.kind === "DropColumnNode";
  },
  create(column) {
    return freeze({
      kind: "DropColumnNode",
      column: ColumnNode.create(column)
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/rename-column-node.js
init_modules_watch_stub();
var RenameColumnNode = freeze({
  is(node) {
    return node.kind === "RenameColumnNode";
  },
  create(column, newColumn) {
    return freeze({
      kind: "RenameColumnNode",
      column: ColumnNode.create(column),
      renameTo: ColumnNode.create(newColumn)
    });
  }
});

// node_modules/kysely/dist/esm/schema/column-definition-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/check-constraint-node.js
init_modules_watch_stub();
var CheckConstraintNode = freeze({
  is(node) {
    return node.kind === "CheckConstraintNode";
  },
  create(expression, constraintName) {
    return freeze({
      kind: "CheckConstraintNode",
      expression,
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/references-node.js
init_modules_watch_stub();
var ON_MODIFY_FOREIGN_ACTIONS = [
  "no action",
  "restrict",
  "cascade",
  "set null",
  "set default"
];
var ReferencesNode = freeze({
  is(node) {
    return node.kind === "ReferencesNode";
  },
  create(table, columns) {
    return freeze({
      kind: "ReferencesNode",
      table,
      columns: freeze([...columns])
    });
  },
  cloneWithOnDelete(references, onDelete) {
    return freeze({
      ...references,
      onDelete
    });
  },
  cloneWithOnUpdate(references, onUpdate) {
    return freeze({
      ...references,
      onUpdate
    });
  }
});

// node_modules/kysely/dist/esm/parser/default-value-parser.js
init_modules_watch_stub();
function parseDefaultValueExpression(value) {
  return isOperationNodeSource(value) ? value.toOperationNode() : ValueNode.createImmediate(value);
}

// node_modules/kysely/dist/esm/operation-node/generated-node.js
init_modules_watch_stub();
var GeneratedNode = freeze({
  is(node) {
    return node.kind === "GeneratedNode";
  },
  create(params) {
    return freeze({
      kind: "GeneratedNode",
      ...params
    });
  },
  createWithExpression(expression) {
    return freeze({
      kind: "GeneratedNode",
      always: true,
      expression
    });
  },
  cloneWith(node, params) {
    return freeze({
      ...node,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/default-value-node.js
init_modules_watch_stub();
var DefaultValueNode = freeze({
  is(node) {
    return node.kind === "DefaultValueNode";
  },
  create(defaultValue) {
    return freeze({
      kind: "DefaultValueNode",
      defaultValue
    });
  }
});

// node_modules/kysely/dist/esm/parser/on-modify-action-parser.js
init_modules_watch_stub();
function parseOnModifyForeignAction(action) {
  if (ON_MODIFY_FOREIGN_ACTIONS.includes(action)) {
    return action;
  }
  throw new Error(`invalid OnModifyForeignAction ${action}`);
}

// node_modules/kysely/dist/esm/schema/column-definition-builder.js
var ColumnDefinitionBuilder = class {
  #node;
  constructor(node) {
    this.#node = node;
  }
  /**
   * Adds `auto_increment` or `autoincrement` to the column definition
   * depending on the dialect.
   *
   * Some dialects like PostgreSQL don't support this. On PostgreSQL
   * you can use the `serial` or `bigserial` data type instead.
   */
  autoIncrement() {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { autoIncrement: true }));
  }
  /**
   * Makes the column the primary key.
   *
   * If you want to specify a composite primary key use the
   * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
   */
  primaryKey() {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { primaryKey: true }));
  }
  /**
   * Adds a foreign key constraint for the column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * col.references('person.id')
   * ```
   */
  references(ref) {
    const references = parseStringReference(ref);
    if (!references.table || SelectAllNode.is(references.column)) {
      throw new Error(`invalid call references('${ref}'). The reference must have format table.column or schema.table.column`);
    }
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      references: ReferencesNode.create(references.table, [
        references.column
      ])
    }));
  }
  /**
   * Adds an `on delete` constraint for the foreign key column.
   *
   * If your database engine doesn't support foreign key constraints in the
   * column definition (like MySQL 5) you need to call the table level
   * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
   *
   * ### Examples
   *
   * ```ts
   * col.references('person.id').onDelete('cascade')
   * ```
   */
  onDelete(onDelete) {
    if (!this.#node.references) {
      throw new Error("on delete constraint can only be added for foreign keys");
    }
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      references: ReferencesNode.cloneWithOnDelete(this.#node.references, parseOnModifyForeignAction(onDelete))
    }));
  }
  /**
   * Adds an `on update` constraint for the foreign key column.
   *
   * ### Examples
   *
   * ```ts
   * col.references('person.id').onUpdate('cascade')
   * ```
   */
  onUpdate(onUpdate) {
    if (!this.#node.references) {
      throw new Error("on update constraint can only be added for foreign keys");
    }
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      references: ReferencesNode.cloneWithOnUpdate(this.#node.references, parseOnModifyForeignAction(onUpdate))
    }));
  }
  /**
   * Adds a unique constraint for the column.
   */
  unique() {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { unique: true }));
  }
  /**
   * Adds a `not null` constraint for the column.
   */
  notNull() {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { notNull: true }));
  }
  /**
   * Adds a `unsigned` modifier for the column.
   *
   * This only works on some dialects like MySQL.
   */
  unsigned() {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, { unsigned: true }));
  }
  /**
   * Adds a default value constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * db.schema
   *   .createTable('pet')
   *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
   *   .execute()
   * ```
   *
   * Values passed to `defaultTo` are interpreted as value literals by default. You can define
   * an arbitrary SQL expression using the {@link sql} template tag:
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * db.schema
   *   .createTable('pet')
   *   .addColumn(
   *     'number_of_legs',
   *     'integer',
   *     (col) => col.defaultTo(sql`any SQL here`)
   *   )
   *   .execute()
   * ```
   */
  defaultTo(value) {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      defaultTo: DefaultValueNode.create(parseDefaultValueExpression(value))
    }));
  }
  /**
   * Adds a check constraint for the column.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * db.schema
   *   .createTable('pet')
   *   .addColumn('number_of_legs', 'integer', (col) =>
   *     col.check(sql`number_of_legs < 5`)
   *   )
   *   .execute()
   * ```
   */
  check(expression) {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      check: CheckConstraintNode.create(expression.toOperationNode())
    }));
  }
  /**
   * Makes the column a generated column using a `generated always as` statement.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * db.schema
   *   .createTable('person')
   *   .addColumn('full_name', 'varchar(255)',
   *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
   *   )
   *   .execute()
   * ```
   */
  generatedAlwaysAs(expression) {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.createWithExpression(expression.toOperationNode())
    }));
  }
  /**
   * Adds the `generated always as identity` specifier on supported dialects.
   */
  generatedAlwaysAsIdentity() {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.create({ identity: true, always: true })
    }));
  }
  /**
   * Adds the `generated by default as identity` specifier on supported dialects.
   */
  generatedByDefaultAsIdentity() {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.create({ identity: true, byDefault: true })
    }));
  }
  /**
   * Makes a generated column stored instead of virtual. This method can only
   * be used with {@link generatedAlwaysAs}
   *
   * ### Examples
   *
   * ```ts
   * db.schema
   *   .createTable('person')
   *   .addColumn('full_name', 'varchar(255)', (col) => col
   *     .generatedAlwaysAs("concat(first_name, ' ', last_name)")
   *     .stored()
   *   )
   *   .execute()
   * ```
   */
  stored() {
    if (!this.#node.generated) {
      throw new Error("stored() can only be called after generatedAlwaysAs");
    }
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(this.#node, {
      generated: GeneratedNode.cloneWith(this.#node.generated, {
        stored: true
      })
    }));
  }
  /**
   * This can be used to add any additional SQL right after the column's data type.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createTable('person')
   *  .addColumn('id', 'integer', col => col.primaryKey())
   *  .addColumn('first_name', 'varchar(36)', col => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull())
   *  .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `first_name` varchar(36) collate utf8mb4_general_ci not null
   * )
   * ```
   */
  modifyFront(modifier) {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithFrontModifier(this.#node, modifier.toOperationNode()));
  }
  /**
   * This can be used to add any additional SQL to the end of the column definition.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createTable('person')
   *  .addColumn('id', 'integer', col => col.primaryKey())
   *  .addColumn('age', 'integer', col => col.unsigned().notNull().modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`))
   *  .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
   * )
   * ```
   */
  modifyEnd(modifier) {
    return new ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithEndModifier(this.#node, modifier.toOperationNode()));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};
preventAwait(ColumnDefinitionBuilder, "don't await ColumnDefinitionBuilder instances directly.");

// node_modules/kysely/dist/esm/operation-node/modify-column-node.js
init_modules_watch_stub();
var ModifyColumnNode = freeze({
  is(node) {
    return node.kind === "ModifyColumnNode";
  },
  create(column) {
    return freeze({
      kind: "ModifyColumnNode",
      column
    });
  }
});

// node_modules/kysely/dist/esm/parser/data-type-parser.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/data-type-node.js
init_modules_watch_stub();
var DataTypeNode = freeze({
  is(node) {
    return node.kind === "DataTypeNode";
  },
  create(dataType) {
    return freeze({
      kind: "DataTypeNode",
      dataType
    });
  }
});

// node_modules/kysely/dist/esm/parser/data-type-parser.js
function parseDataTypeExpression(dataType) {
  return isOperationNodeSource(dataType) ? dataType.toOperationNode() : DataTypeNode.create(dataType);
}

// node_modules/kysely/dist/esm/schema/foreign-key-constraint-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/foreign-key-constraint-node.js
init_modules_watch_stub();
var ForeignKeyConstraintNode = freeze({
  is(node) {
    return node.kind === "ForeignKeyConstraintNode";
  },
  create(sourceColumns, targetTable, targetColumns, constraintName) {
    return freeze({
      kind: "ForeignKeyConstraintNode",
      columns: sourceColumns,
      references: ReferencesNode.create(targetTable, targetColumns),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  },
  cloneWith(node, props) {
    return freeze({
      ...node,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/schema/foreign-key-constraint-builder.js
var ForeignKeyConstraintBuilder = class {
  #node;
  constructor(node) {
    this.#node = node;
  }
  onDelete(onDelete) {
    return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
      onDelete: parseOnModifyForeignAction(onDelete)
    }));
  }
  onUpdate(onUpdate) {
    return new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(this.#node, {
      onUpdate: parseOnModifyForeignAction(onUpdate)
    }));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#node;
  }
};
preventAwait(ForeignKeyConstraintBuilder, "don't await ForeignKeyConstraintBuilder instances directly.");

// node_modules/kysely/dist/esm/operation-node/add-constraint-node.js
init_modules_watch_stub();
var AddConstraintNode = freeze({
  is(node) {
    return node.kind === "AddConstraintNode";
  },
  create(constraint) {
    return freeze({
      kind: "AddConstraintNode",
      constraint
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/unique-constraint-node.js
init_modules_watch_stub();
var UniqueConstraintNode = freeze({
  is(node) {
    return node.kind === "UniqueConstraintNode";
  },
  create(columns, constraintName) {
    return freeze({
      kind: "UniqueConstraintNode",
      columns: freeze(columns.map(ColumnNode.create)),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  }
});

// node_modules/kysely/dist/esm/operation-node/drop-constraint-node.js
init_modules_watch_stub();
var DropConstraintNode = freeze({
  is(node) {
    return node.kind === "DropConstraintNode";
  },
  create(constraintName) {
    return freeze({
      kind: "DropConstraintNode",
      constraintName: IdentifierNode.create(constraintName)
    });
  },
  cloneWith(dropConstraint, props) {
    return freeze({
      ...dropConstraint,
      ...props
    });
  }
});

// node_modules/kysely/dist/esm/schema/alter-column-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/alter-column-node.js
init_modules_watch_stub();
var AlterColumnNode = freeze({
  is(node) {
    return node.kind === "AlterColumnNode";
  },
  create(column, prop, value) {
    return freeze({
      kind: "AlterColumnNode",
      column: ColumnNode.create(column),
      [prop]: value
    });
  }
});

// node_modules/kysely/dist/esm/schema/alter-column-builder.js
var AlterColumnBuilder = class {
  #column;
  constructor(column) {
    this.#column = column;
  }
  setDataType(dataType) {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "dataType", parseDataTypeExpression(dataType)));
  }
  setDefault(value) {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "setDefault", parseDefaultValueExpression(value)));
  }
  dropDefault() {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "dropDefault", true));
  }
  setNotNull() {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "setNotNull", true));
  }
  dropNotNull() {
    return new AlteredColumnBuilder(AlterColumnNode.create(this.#column, "dropNotNull", true));
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
};
var AlteredColumnBuilder = class {
  #alterColumnNode;
  constructor(alterColumnNode) {
    this.#alterColumnNode = alterColumnNode;
  }
  toOperationNode() {
    return this.#alterColumnNode;
  }
};

// node_modules/kysely/dist/esm/schema/alter-table-executor.js
init_modules_watch_stub();
var AlterTableExecutor = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(AlterTableExecutor, "don't await AlterTableExecutor instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/alter-table-add-foreign-key-constraint-builder.js
init_modules_watch_stub();
var AlterTableAddForeignKeyConstraintBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  onDelete(onDelete) {
    return new AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.onDelete(onDelete)
    });
  }
  onUpdate(onUpdate) {
    return new AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: this.#props.constraintBuilder.onUpdate(onUpdate)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(AlterTableNode.cloneWithTableProps(this.#props.node, {
      addConstraint: AddConstraintNode.create(this.#props.constraintBuilder.toOperationNode())
    }), this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(AlterTableAddForeignKeyConstraintBuilder, "don't await AlterTableAddForeignKeyConstraintBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/alter-table-drop-constraint-builder.js
init_modules_watch_stub();
var AlterTableDropConstraintBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifExists() {
    return new AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
          ifExists: true
        })
      })
    });
  }
  cascade() {
    return new AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
          modifier: "cascade"
        })
      })
    });
  }
  restrict() {
    return new AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.cloneWith(this.#props.node.dropConstraint, {
          modifier: "restrict"
        })
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(AlterTableDropConstraintBuilder, "don't await AlterTableDropConstraintBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/operation-node/primary-constraint-node.js
init_modules_watch_stub();
var PrimaryConstraintNode = freeze({
  is(node) {
    return node.kind === "PrimaryKeyConstraintNode";
  },
  create(columns, constraintName) {
    return freeze({
      kind: "PrimaryKeyConstraintNode",
      columns: freeze(columns.map(ColumnNode.create)),
      name: constraintName ? IdentifierNode.create(constraintName) : void 0
    });
  }
});

// node_modules/kysely/dist/esm/schema/alter-table-builder.js
var AlterTableBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  renameTo(newTableName) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        renameTo: parseTable(newTableName)
      })
    });
  }
  setSchema(newSchema) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        setSchema: IdentifierNode.create(newSchema)
      })
    });
  }
  alterColumn(column, alteration) {
    const builder = alteration(new AlterColumnBuilder(column));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
    });
  }
  dropColumn(column) {
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, DropColumnNode.create(column))
    });
  }
  renameColumn(column, newColumn) {
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, RenameColumnNode.create(column, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  /**
   * See {@link CreateTableBuilder.addUniqueConstraint}
   */
  addUniqueConstraint(constraintName, columns) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addConstraint: AddConstraintNode.create(UniqueConstraintNode.create(columns, constraintName))
      })
    });
  }
  /**
   * See {@link CreateTableBuilder.addCheckConstraint}
   */
  addCheckConstraint(constraintName, checkExpression) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addConstraint: AddConstraintNode.create(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName))
      })
    });
  }
  /**
   * See {@link CreateTableBuilder.addForeignKeyConstraint}
   *
   * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
   * the constraint builder and doesn't take a callback as the last argument. This
   * is because you can only add one column per `ALTER TABLE` query.
   */
  addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns) {
    return new AlterTableAddForeignKeyConstraintBuilder({
      ...this.#props,
      constraintBuilder: new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName))
    });
  }
  /**
   * See {@link CreateTableBuilder.addPrimaryKeyConstraint}
   */
  addPrimaryKeyConstraint(constraintName, columns) {
    return new AlterTableExecutor({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        addConstraint: AddConstraintNode.create(PrimaryConstraintNode.create(columns, constraintName))
      })
    });
  }
  dropConstraint(constraintName) {
    return new AlterTableDropConstraintBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithTableProps(this.#props.node, {
        dropConstraint: DropConstraintNode.create(constraintName)
      })
    });
  }
  /**
   * Calls the given function passing `this` as the only argument.
   *
   * See {@link CreateTableBuilder.$call}
   */
  $call(func) {
    return func(this);
  }
};
var AlterTableColumnAlteringBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  alterColumn(column, alteration) {
    const builder = alteration(new AlterColumnBuilder(column));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, builder.toOperationNode())
    });
  }
  dropColumn(column) {
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, DropColumnNode.create(column))
    });
  }
  renameColumn(column, newColumn) {
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, RenameColumnNode.create(column, newColumn))
    });
  }
  addColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, AddColumnNode.create(builder.toOperationNode()))
    });
  }
  modifyColumn(columnName, dataType, build = noop) {
    const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new AlterTableColumnAlteringBuilder({
      ...this.#props,
      node: AlterTableNode.cloneWithColumnAlteration(this.#props.node, ModifyColumnNode.create(builder.toOperationNode()))
    });
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(AlterTableBuilder, "don't await AlterTableBuilder instances");
preventAwait(AlterColumnBuilder, "don't await AlterColumnBuilder instances");
preventAwait(AlterTableColumnAlteringBuilder, "don't await AlterTableColumnAlteringBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/create-index-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/plugin/immediate-value/immediate-value-transformer.js
init_modules_watch_stub();
var ImmediateValueTransformer = class extends OperationNodeTransformer {
  transformValue(node) {
    return {
      ...super.transformValue(node),
      immediate: true
    };
  }
};

// node_modules/kysely/dist/esm/schema/create-index-builder.js
var CreateIndexBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "if not exists" modifier.
   *
   * If the index already exists, no error is thrown if this method has been called.
   */
  ifNotExists() {
    return new CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        ifNotExists: true
      })
    });
  }
  /**
   * Makes the index unique.
   */
  unique() {
    return new CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        unique: true
      })
    });
  }
  /**
   * Specifies the table for the index.
   */
  on(table) {
    return new CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        table: parseTable(table)
      })
    });
  }
  /**
   * Adds a column to the index.
   *
   * Also see {@link columns} for adding multiple columns at once or {@link expression}
   * for specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *         .createIndex('person_first_name_and_age_index')
   *         .on('person')
   *         .column('first_name')
   *         .column('age desc')
   *         .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
   * ```
   */
  column(column) {
    return new CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWithColumns(this.#props.node, [
        parseOrderedColumnName(column)
      ])
    });
  }
  /**
   * Specifies a list of columns for the index.
   *
   * Also see {@link column} for adding a single column or {@link expression} for
   * specifying an arbitrary expression.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *         .createIndex('person_first_name_and_age_index')
   *         .on('person')
   *         .columns(['first_name', 'age desc'])
   *         .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
   * ```
   */
  columns(columns) {
    return new CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWithColumns(this.#props.node, columns.map(parseOrderedColumnName))
    });
  }
  /**
   * Specifies an arbitrary expression for the index.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createIndex('person_first_name_index')
   *   .on('person')
   *   .expression(sql`first_name COLLATE "fi_FI"`)
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * create index "person_first_name_index" on "person" (first_name COLLATE "fi_FI")
   * ```
   */
  expression(expression) {
    return new CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWithColumns(this.#props.node, [
        expression.toOperationNode()
      ])
    });
  }
  using(indexType) {
    return new CreateIndexBuilder({
      ...this.#props,
      node: CreateIndexNode.cloneWith(this.#props.node, {
        using: RawNode.createWithSql(indexType)
      })
    });
  }
  where(...args) {
    const transformer = new ImmediateValueTransformer();
    return new CreateIndexBuilder({
      ...this.#props,
      node: QueryNode.cloneWithWhere(this.#props.node, transformer.transformNode(parseValueBinaryOperationOrExpression(args)))
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(CreateIndexBuilder, "don't await CreateIndexBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/create-schema-builder.js
init_modules_watch_stub();
var CreateSchemaBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifNotExists() {
    return new CreateSchemaBuilder({
      ...this.#props,
      node: CreateSchemaNode.cloneWith(this.#props.node, { ifNotExists: true })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(CreateSchemaBuilder, "don't await CreateSchemaBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/create-table-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/parser/on-commit-action-parse.js
init_modules_watch_stub();
function parseOnCommitAction(action) {
  if (ON_COMMIT_ACTIONS.includes(action)) {
    return action;
  }
  throw new Error(`invalid OnCommitAction ${action}`);
}

// node_modules/kysely/dist/esm/schema/create-table-builder.js
var CreateTableBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary table.
   */
  temporary() {
    return new CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        temporary: true
      })
    });
  }
  /**
   * Adds an "on commit" statement.
   *
   * This can be used in conjunction with temporary tables on supported databases
   * like PostgreSQL.
   */
  onCommit(onCommit) {
    return new CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        onCommit: parseOnCommitAction(onCommit)
      })
    });
  }
  /**
   * Adds the "if not exists" modifier.
   *
   * If the table already exists, no error is thrown if this method has been called.
   */
  ifNotExists() {
    return new CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWith(this.#props.node, {
        ifNotExists: true
      })
    });
  }
  /**
   * Adds a column to the table.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey()),
   *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
   *   .addColumn('last_name', 'varchar(255)')
   *   .addColumn('bank_balance', 'numeric(8, 2)')
   *   // You can specify any data type using the `sql` tag if the types
   *   // don't include it.
   *   .addColumn('data', sql`any_type_here`)
   *   .addColumn('parent_id', 'integer', (col) =>
   *     col.references('person.id').onDelete('cascade'))
   *   )
   * ```
   *
   * With this method, it's once again good to remember that Kysely just builds the
   * query and doesn't provide the same API for all databses. For example, some
   * databases like older MySQL don't support the `references` statement in the
   * column definition. Instead foreign key constraints need to be defined in the
   * `create table` query. See the next example:
   *
   * ```ts
   *   .addColumn('parent_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'person_parent_id_fk', ['parent_id'], 'person', ['id'],
   *     (cb) => cb.onDelete('cascade')
   *   )
   * ```
   *
   * Another good example is that PostgreSQL doesn't support the `auto_increment`
   * keyword and you need to define an autoincrementing column for example using
   * `serial`:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'serial', (col) => col.primaryKey()),
   * ```
   */
  addColumn(columnName, dataType, build = noop) {
    const columnBuilder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
    return new CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithColumn(this.#props.node, columnBuilder.toOperationNode())
    });
  }
  /**
   * Adds a primary key constraint for one or more columns.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
   * ```
   */
  addPrimaryKeyConstraint(constraintName, columns) {
    return new CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, PrimaryConstraintNode.create(columns, constraintName))
    });
  }
  /**
   * Adds a unique constraint for one or more columns.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * addUniqueConstraint('first_name_last_name_unique', ['first_name', 'last_name'])
   * ```
   */
  addUniqueConstraint(constraintName, columns) {
    return new CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, UniqueConstraintNode.create(columns, constraintName))
    });
  }
  /**
   * Adds a check constraint.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * import { sql } from 'kysely'
   *
   * addCheckConstraint('check_legs', sql`number_of_legs < 5`)
   * ```
   */
  addCheckConstraint(constraintName, checkExpression) {
    return new CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName))
    });
  }
  /**
   * Adds a foreign key constraint.
   *
   * The constraint name can be anything you want, but it must be unique
   * across the whole database.
   *
   * ### Examples
   *
   * ```ts
   * addForeignKeyConstraint(
   *   'owner_id_foreign',
   *   ['owner_id'],
   *   'person',
   *   ['id'],
   * )
   * ```
   *
   * Add constraint for multiple columns:
   *
   * ```ts
   * addForeignKeyConstraint(
   *   'owner_id_foreign',
   *   ['owner_id1', 'owner_id2'],
   *   'person',
   *   ['id1', 'id2'],
   *   (cb) => cb.onDelete('cascade')
   * )
   * ```
   */
  addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
    const builder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
    return new CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithConstraint(this.#props.node, builder.toOperationNode())
    });
  }
  /**
   * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
   *
   * Also see {@link temporary}.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createTable('person')
   *   .modifyFront(sql`global temporary`)
   *   .addColumn('id', 'integer', col => col.primaryKey())
   *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
   *   .addColumn('last_name', 'varchar(64), col => col.notNull())
   *   .execute()
   * ```
   *
   * The generated SQL (Postgres):
   *
   * ```sql
   * create global temporary table "person" (
   *   "id" integer primary key,
   *   "first_name" varchar(64) not null,
   *   "last_name" varchar(64) not null
   * )
   * ```
   */
  modifyFront(modifier) {
    return new CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithFrontModifier(this.#props.node, modifier.toOperationNode())
    });
  }
  /**
   * This can be used to add any additional SQL to the end of the query.
   *
   * Also see {@link onCommit}.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createTable('person')
   *   .addColumn('id', 'integer', col => col => primaryKey())
   *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
   *   .addColumn('last_name', 'varchar(64), col => col.notNull())
   *   .modifyEnd(sql`collate utf8_unicode_ci`)
   *   .execute()
   * ```
   *
   * The generated SQL (MySQL):
   *
   * ```sql
   * create table `person` (
   *   `id` integer primary key,
   *   `first_name` varchar(64) not null,
   *   `last_name` varchar(64) not null
   * ) collate utf8_unicode_ci
   * ```
   */
  modifyEnd(modifier) {
    return new CreateTableBuilder({
      ...this.#props,
      node: CreateTableNode.cloneWithEndModifier(this.#props.node, modifier.toOperationNode())
    });
  }
  /**
   * Calls the given function passing `this` as the only argument.
   *
   * ### Examples
   *
   * ```ts
   * db.schema
   *   .createTable('test')
   *   .$call((builder) => builder.addColumn('id', 'integer'))
   *   .execute()
   * ```
   *
   * ```ts
   * const addDefaultColumns = <T extends string, C extends string = never>(
   *   builder: CreateTableBuilder<T, C>
   * ) => {
   *   return builder
   *     .addColumn('id', 'integer', (col) => col.notNull())
   *     .addColumn('created_at', 'date', (col) =>
   *       col.notNull().defaultTo(sql`now()`)
   *     )
   *     .addColumn('updated_at', 'date', (col) =>
   *       col.notNull().defaultTo(sql`now()`)
   *     )
   * }
   *
   * db.schema
   *   .createTable('test')
   *   .$call(addDefaultColumns)
   *   .execute()
   * ```
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(CreateTableBuilder, "don't await CreateTableBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/drop-index-builder.js
init_modules_watch_stub();
var DropIndexBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Specifies the table the index was created for. This is not needed
   * in all dialects.
   */
  on(table) {
    return new DropIndexBuilder({
      ...this.#props,
      node: DropIndexNode.cloneWith(this.#props.node, {
        table: parseTable(table)
      })
    });
  }
  ifExists() {
    return new DropIndexBuilder({
      ...this.#props,
      node: DropIndexNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new DropIndexBuilder({
      ...this.#props,
      node: DropIndexNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(DropIndexBuilder, "don't await DropIndexBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/drop-schema-builder.js
init_modules_watch_stub();
var DropSchemaBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifExists() {
    return new DropSchemaBuilder({
      ...this.#props,
      node: DropSchemaNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new DropSchemaBuilder({
      ...this.#props,
      node: DropSchemaNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(DropSchemaBuilder, "don't await DropSchemaBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/drop-table-builder.js
init_modules_watch_stub();
var DropTableBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifExists() {
    return new DropTableBuilder({
      ...this.#props,
      node: DropTableNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new DropTableBuilder({
      ...this.#props,
      node: DropTableNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(DropTableBuilder, "don't await DropTableBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/create-view-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/create-view-node.js
init_modules_watch_stub();
var CreateViewNode = freeze({
  is(node) {
    return node.kind === "CreateViewNode";
  },
  create(name) {
    return freeze({
      kind: "CreateViewNode",
      name: SchemableIdentifierNode.create(name)
    });
  },
  cloneWith(createView, params) {
    return freeze({
      ...createView,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/plugin/immediate-value/immediate-value-plugin.js
init_modules_watch_stub();
var ImmediateValuePlugin = class {
  #transformer = new ImmediateValueTransformer();
  transformQuery(args) {
    return this.#transformer.transformNode(args.node);
  }
  transformResult(args) {
    return Promise.resolve(args.result);
  }
};

// node_modules/kysely/dist/esm/schema/create-view-builder.js
var CreateViewBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  /**
   * Adds the "temporary" modifier.
   *
   * Use this to create a temporary view.
   */
  temporary() {
    return new CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        temporary: true
      })
    });
  }
  materialized() {
    return new CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        materialized: true
      })
    });
  }
  /**
   * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
   */
  ifNotExists() {
    return new CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        ifNotExists: true
      })
    });
  }
  orReplace() {
    return new CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        orReplace: true
      })
    });
  }
  columns(columns) {
    return new CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        columns: columns.map(parseColumnName)
      })
    });
  }
  /**
   * Sets the select query or a `values` statement that creates the view.
   *
   * WARNING!
   * Some dialects don't support parameterized queries in DDL statements and therefore
   * the query or raw {@link sql } expression passed here is interpolated into a single
   * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
   * into the query or raw expression passed to this method!
   */
  as(query) {
    const queryNode = query.withPlugin(new ImmediateValuePlugin()).toOperationNode();
    return new CreateViewBuilder({
      ...this.#props,
      node: CreateViewNode.cloneWith(this.#props.node, {
        as: queryNode
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(CreateViewBuilder, "don't await CreateViewBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/drop-view-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/drop-view-node.js
init_modules_watch_stub();
var DropViewNode = freeze({
  is(node) {
    return node.kind === "DropViewNode";
  },
  create(name) {
    return freeze({
      kind: "DropViewNode",
      name: SchemableIdentifierNode.create(name)
    });
  },
  cloneWith(dropView, params) {
    return freeze({
      ...dropView,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/schema/drop-view-builder.js
var DropViewBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  materialized() {
    return new DropViewBuilder({
      ...this.#props,
      node: DropViewNode.cloneWith(this.#props.node, {
        materialized: true
      })
    });
  }
  ifExists() {
    return new DropViewBuilder({
      ...this.#props,
      node: DropViewNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  cascade() {
    return new DropViewBuilder({
      ...this.#props,
      node: DropViewNode.cloneWith(this.#props.node, {
        cascade: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(DropViewBuilder, "don't await DropViewBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/create-type-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/create-type-node.js
init_modules_watch_stub();
var CreateTypeNode = freeze({
  is(node) {
    return node.kind === "CreateTypeNode";
  },
  create(name) {
    return freeze({
      kind: "CreateTypeNode",
      name
    });
  },
  cloneWithEnum(createType, values) {
    return freeze({
      ...createType,
      enum: ValueListNode.create(values.map((value) => ValueNode.createImmediate(value)))
    });
  }
});

// node_modules/kysely/dist/esm/schema/create-type-builder.js
var CreateTypeBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  /**
   * Creates an anum type.
   *
   * ### Examples
   *
   * ```ts
   * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
   * ```
   */
  asEnum(values) {
    return new CreateTypeBuilder({
      ...this.#props,
      node: CreateTypeNode.cloneWithEnum(this.#props.node, values)
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(CreateTypeBuilder, "don't await CreateTypeBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/schema/drop-type-builder.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/operation-node/drop-type-node.js
init_modules_watch_stub();
var DropTypeNode = freeze({
  is(node) {
    return node.kind === "DropTypeNode";
  },
  create(name) {
    return freeze({
      kind: "DropTypeNode",
      name
    });
  },
  cloneWith(dropType, params) {
    return freeze({
      ...dropType,
      ...params
    });
  }
});

// node_modules/kysely/dist/esm/schema/drop-type-builder.js
var DropTypeBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  ifExists() {
    return new DropTypeBuilder({
      ...this.#props,
      node: DropTypeNode.cloneWith(this.#props.node, {
        ifExists: true
      })
    });
  }
  /**
   * Simply calls the provided function passing `this` as the only argument. `$call` returns
   * what the provided function returns.
   */
  $call(func) {
    return func(this);
  }
  toOperationNode() {
    return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
  }
  compile() {
    return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
  }
  async execute() {
    await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
  }
};
preventAwait(DropTypeBuilder, "don't await DropTypeBuilder instances directly. To execute the query you need to call `execute`");

// node_modules/kysely/dist/esm/parser/identifier-parser.js
init_modules_watch_stub();
function parseSchemableIdentifier(id) {
  const SCHEMA_SEPARATOR = ".";
  if (id.includes(SCHEMA_SEPARATOR)) {
    const parts = id.split(SCHEMA_SEPARATOR).map(trim3);
    if (parts.length === 2) {
      return SchemableIdentifierNode.createWithSchema(parts[0], parts[1]);
    } else {
      throw new Error(`invalid schemable identifier ${id}`);
    }
  } else {
    return SchemableIdentifierNode.create(id);
  }
}
function trim3(str) {
  return str.trim();
}

// node_modules/kysely/dist/esm/schema/schema.js
var SchemaModule = class {
  #executor;
  constructor(executor) {
    this.#executor = executor;
  }
  /**
   * Create a new table.
   *
   * ### Examples
   *
   * This example creates a new table with columns `id`, `first_name`,
   * `last_name` and `gender`:
   *
   * ```ts
   * await db.schema
   *   .createTable('person')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('first_name', 'varchar', col => col.notNull())
   *   .addColumn('last_name', 'varchar', col => col.notNull())
   *   .addColumn('gender', 'varchar')
   *   .execute()
   * ```
   *
   * This example creates a table with a foreign key. Not all database
   * engines support column-level foreign key constraint definitions.
   * For example if you are using MySQL 5.X see the next example after
   * this one.
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('owner_id', 'integer', col => col
   *     .references('person.id')
   *     .onDelete('cascade')
   *   )
   *   .execute()
   * ```
   *
   * This example adds a foreign key constraint for a columns just
   * like the previous example, but using a table-level statement.
   * On MySQL 5.X you need to define foreign key constraints like
   * this:
   *
   * ```ts
   * await db.schema
   *   .createTable('pet')
   *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
   *   .addColumn('owner_id', 'integer')
   *   .addForeignKeyConstraint(
   *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
   *     (constraint) => constraint.onDelete('cascade')
   *   )
   *   .execute()
   * ```
   */
  createTable(table) {
    return new CreateTableBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateTableNode.create(parseTable(table))
    });
  }
  /**
   * Drop a table.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropTable('person')
   *   .execute()
   * ```
   */
  dropTable(table) {
    return new DropTableBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropTableNode.create(parseTable(table))
    });
  }
  /**
   * Create a new index.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createIndex('person_full_name_unique_index')
   *   .on('person')
   *   .columns(['first_name', 'last_name'])
   *   .execute()
   * ```
   */
  createIndex(indexName) {
    return new CreateIndexBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateIndexNode.create(indexName)
    });
  }
  /**
   * Drop an index.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropIndex('person_full_name_unique_index')
   *   .execute()
   * ```
   */
  dropIndex(indexName) {
    return new DropIndexBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropIndexNode.create(indexName)
    });
  }
  /**
   * Create a new schema.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createSchema('some_schema')
   *   .execute()
   * ```
   */
  createSchema(schema) {
    return new CreateSchemaBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateSchemaNode.create(schema)
    });
  }
  /**
   * Drop a schema.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropSchema('some_schema')
   *   .execute()
   * ```
   */
  dropSchema(schema) {
    return new DropSchemaBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropSchemaNode.create(schema)
    });
  }
  /**
   * Alter a table.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .alterTable('person')
   *   .alterColumn('first_name', (ac) => ac.setDataType('text'))
   *   .execute()
   * ```
   */
  alterTable(table) {
    return new AlterTableBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: AlterTableNode.create(parseTable(table))
    });
  }
  /**
   * Create a new view.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createView('dogs')
   *   .orReplace()
   *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
   *   .execute()
   * ```
   */
  createView(viewName) {
    return new CreateViewBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateViewNode.create(viewName)
    });
  }
  /**
   * Drop a view.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropView('dogs')
   *   .ifExists()
   *   .execute()
   * ```
   */
  dropView(viewName) {
    return new DropViewBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropViewNode.create(viewName)
    });
  }
  /**
   * Create a new type.
   *
   * Only some dialects like PostgreSQL have user-defined types.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .createType('species')
   *   .asEnum(['dog', 'cat', 'frog'])
   *   .execute()
   * ```
   */
  createType(typeName) {
    return new CreateTypeBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: CreateTypeNode.create(parseSchemableIdentifier(typeName))
    });
  }
  /**
   * Drop a type.
   *
   * Only some dialects like PostgreSQL have user-defined types.
   *
   * ### Examples
   *
   * ```ts
   * await db.schema
   *   .dropType('species')
   *   .ifExists()
   *   .execute()
   * ```
   */
  dropType(typeName) {
    return new DropTypeBuilder({
      queryId: createQueryId(),
      executor: this.#executor,
      node: DropTypeNode.create(parseSchemableIdentifier(typeName))
    });
  }
  /**
   * Returns a copy of this schema module with the given plugin installed.
   */
  withPlugin(plugin) {
    return new SchemaModule(this.#executor.withPlugin(plugin));
  }
  /**
   * Returns a copy of this schema module  without any plugins.
   */
  withoutPlugins() {
    return new SchemaModule(this.#executor.withoutPlugins());
  }
  /**
   * See {@link QueryCreator.withSchema}
   */
  withSchema(schema) {
    return new SchemaModule(this.#executor.withPluginAtFront(new WithSchemaPlugin(schema)));
  }
};

// node_modules/kysely/dist/esm/dynamic/dynamic.js
init_modules_watch_stub();
var DynamicModule = class {
  /**
   * Creates a dynamic reference to a column that is not know at compile time.
   *
   * Kysely is built in a way that by default you can't refer to tables or columns
   * that are not actually visible in the current query and context. This is all
   * done by typescript at compile time, which means that you need to know the
   * columns and tables at compile time. This is not always the case of course.
   *
   * This method is meant to be used in those cases where the column names
   * come from the user input or are not otherwise known at compile time.
   *
   * WARNING! Unlike values, column names are not escaped by the database engine
   * or Kysely and if you pass in unchecked column names using this method, you
   * create an SQL injection vulnerability. Always __always__ validate the user
   * input before passing it to this method.
   *
   * There are couple of examples below for some use cases, but you can pass
   * `ref` to other methods as well. If the types allow you to pass a `ref`
   * value to some place, it should work.
   *
   * ### Examples
   *
   * Filter by a column not know at compile time:
   *
   * ```ts
   * async function someQuery(filterColumn: string, filterValue: string) {
   *   const { ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom('person')
   *     .selectAll()
   *     .where(ref(filterColumn), '=', filterValue)
   *     .execute()
   * }
   *
   * someQuery('first_name', 'Arnold')
   * someQuery('person.last_name', 'Aniston')
   * ```
   *
   * Order by a column not know at compile time:
   *
   * ```ts
   * async function someQuery(orderBy: string) {
   *   const { ref } = db.dynamic
   *
   *   return await db
   *     .selectFrom('person')
   *     .select('person.first_name as fn')
   *     .orderBy(ref(orderBy))
   *     .execute()
   * }
   *
   * someQuery('fn')
   * ```
   *
   * In this example we add selections dynamically:
   *
   * ```ts
   * const { ref } = db.dynamic
   *
   * // Some column name provided by the user. Value not known at compile time.
   * const columnFromUserInput = req.query.select;
   *
   * // A type that lists all possible values `columnFromUserInput` can have.
   * // You can use `keyof Person` if any column of an interface is allowed.
   * type PossibleColumns = 'last_name' | 'first_name' | 'birth_date'
   *
   * const [person] = await db.selectFrom('person')
   *   .select([
   *     ref<PossibleColumns>(columnFromUserInput),
   *     'id'
   *   ])
   *   .execute()
   *
   * // The resulting type contains all `PossibleColumns` as optional fields
   * // because we cannot know which field was actually selected before
   * // running the code.
   * const lastName: string | undefined = person.last_name
   * const firstName: string | undefined = person.first_name
   * const birthDate: string | undefined = person.birth_date
   *
   * // The result type also contains the compile time selection `id`.
   * person.id
   * ```
   */
  ref(reference) {
    return new DynamicReferenceBuilder(reference);
  }
};

// node_modules/kysely/dist/esm/driver/default-connection-provider.js
init_modules_watch_stub();
var DefaultConnectionProvider = class {
  #driver;
  constructor(driver) {
    this.#driver = driver;
  }
  async provideConnection(consumer) {
    const connection = await this.#driver.acquireConnection();
    try {
      return await consumer(connection);
    } finally {
      await this.#driver.releaseConnection(connection);
    }
  }
};

// node_modules/kysely/dist/esm/query-executor/default-query-executor.js
init_modules_watch_stub();
var DefaultQueryExecutor = class extends QueryExecutorBase {
  #compiler;
  #adapter;
  #connectionProvider;
  constructor(compiler, adapter, connectionProvider, plugins = []) {
    super(plugins);
    this.#compiler = compiler;
    this.#adapter = adapter;
    this.#connectionProvider = connectionProvider;
  }
  get adapter() {
    return this.#adapter;
  }
  compileQuery(node) {
    return this.#compiler.compileQuery(node);
  }
  provideConnection(consumer) {
    return this.#connectionProvider.provideConnection(consumer);
  }
  withPlugins(plugins) {
    return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, ...plugins]);
  }
  withPlugin(plugin) {
    return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [...this.plugins, plugin]);
  }
  withPluginAtFront(plugin) {
    return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, [plugin, ...this.plugins]);
  }
  withConnectionProvider(connectionProvider) {
    return new DefaultQueryExecutor(this.#compiler, this.#adapter, connectionProvider, [...this.plugins]);
  }
  withoutPlugins() {
    return new DefaultQueryExecutor(this.#compiler, this.#adapter, this.#connectionProvider, []);
  }
};

// node_modules/kysely/dist/esm/driver/runtime-driver.js
init_modules_watch_stub();

// node_modules/kysely/dist/esm/util/performance-now.js
init_modules_watch_stub();
function performanceNow() {
  if (typeof performance !== "undefined" && isFunction(performance.now)) {
    return performance.now();
  } else {
    return Date.now();
  }
}

// node_modules/kysely/dist/esm/driver/runtime-driver.js
var RuntimeDriver = class {
  #driver;
  #log;
  #initPromise;
  #initDone;
  #destroyPromise;
  #connections = /* @__PURE__ */ new WeakSet();
  constructor(driver, log) {
    this.#initDone = false;
    this.#driver = driver;
    this.#log = log;
  }
  async init() {
    if (this.#destroyPromise) {
      throw new Error("driver has already been destroyed");
    }
    if (!this.#initPromise) {
      this.#initPromise = this.#driver.init().then(() => {
        this.#initDone = true;
      }).catch((err) => {
        this.#initPromise = void 0;
        return Promise.reject(err);
      });
    }
    await this.#initPromise;
  }
  async acquireConnection() {
    if (this.#destroyPromise) {
      throw new Error("driver has already been destroyed");
    }
    if (!this.#initDone) {
      await this.init();
    }
    const connection = await this.#driver.acquireConnection();
    if (!this.#connections.has(connection)) {
      if (this.#needsLogging()) {
        this.#addLogging(connection);
      }
      this.#connections.add(connection);
    }
    return connection;
  }
  async releaseConnection(connection) {
    await this.#driver.releaseConnection(connection);
  }
  beginTransaction(connection, settings) {
    return this.#driver.beginTransaction(connection, settings);
  }
  commitTransaction(connection) {
    return this.#driver.commitTransaction(connection);
  }
  rollbackTransaction(connection) {
    return this.#driver.rollbackTransaction(connection);
  }
  async destroy() {
    if (!this.#initPromise) {
      return;
    }
    await this.#initPromise;
    if (!this.#destroyPromise) {
      this.#destroyPromise = this.#driver.destroy().catch((err) => {
        this.#destroyPromise = void 0;
        return Promise.reject(err);
      });
    }
    await this.#destroyPromise;
  }
  #needsLogging() {
    return this.#log.isLevelEnabled("query") || this.#log.isLevelEnabled("error");
  }
  // This method monkey patches the database connection's executeQuery method
  // by adding logging code around it. Monkey patching is not pretty, but it's
  // the best option in this case.
  #addLogging(connection) {
    const executeQuery = connection.executeQuery;
    connection.executeQuery = async (compiledQuery) => {
      const startTime = performanceNow();
      try {
        return await executeQuery.call(connection, compiledQuery);
      } catch (error) {
        await this.#logError(error, compiledQuery, startTime);
        throw error;
      } finally {
        await this.#logQuery(compiledQuery, startTime);
      }
    };
  }
  async #logError(error, compiledQuery, startTime) {
    await this.#log.error(() => ({
      level: "error",
      error,
      query: compiledQuery,
      queryDurationMillis: this.#calculateDurationMillis(startTime)
    }));
  }
  async #logQuery(compiledQuery, startTime) {
    await this.#log.query(() => ({
      level: "query",
      query: compiledQuery,
      queryDurationMillis: this.#calculateDurationMillis(startTime)
    }));
  }
  #calculateDurationMillis(startTime) {
    return performanceNow() - startTime;
  }
};

// node_modules/kysely/dist/esm/driver/single-connection-provider.js
init_modules_watch_stub();
var SingleConnectionProvider = class {
  #connection;
  #runningPromise;
  constructor(connection) {
    this.#connection = connection;
  }
  async provideConnection(consumer) {
    while (this.#runningPromise) {
      await this.#runningPromise;
    }
    const promise = this.#run(consumer);
    this.#runningPromise = promise.then(() => {
      this.#runningPromise = void 0;
    }).catch(() => {
      this.#runningPromise = void 0;
    });
    return promise;
  }
  // Run the runner in an async function to make sure it doesn't
  // throw synchronous errors.
  async #run(runner) {
    return await runner(this.#connection);
  }
};

// node_modules/kysely/dist/esm/driver/driver.js
init_modules_watch_stub();
var TRANSACTION_ISOLATION_LEVELS = [
  "read uncommitted",
  "read committed",
  "repeatable read",
  "serializable"
];

// node_modules/kysely/dist/esm/util/log.js
init_modules_watch_stub();
var LOG_LEVELS = freeze(["query", "error"]);
var Log = class {
  #levels;
  #logger;
  constructor(config) {
    if (isFunction(config)) {
      this.#logger = config;
      this.#levels = freeze({
        query: true,
        error: true
      });
    } else {
      this.#logger = defaultLogger;
      this.#levels = freeze({
        query: config.includes("query"),
        error: config.includes("error")
      });
    }
  }
  isLevelEnabled(level) {
    return this.#levels[level];
  }
  async query(getEvent) {
    if (this.#levels.query) {
      await this.#logger(getEvent());
    }
  }
  async error(getEvent) {
    if (this.#levels.error) {
      await this.#logger(getEvent());
    }
  }
};
function defaultLogger(event) {
  if (event.level === "query") {
    console.log(`kysely:query: ${event.query.sql}`);
    console.log(`kysely:query: duration: ${event.queryDurationMillis.toFixed(1)}ms`);
  } else if (event.level === "error") {
    if (event.error instanceof Error) {
      console.error(`kysely:error: ${event.error.stack ?? event.error.message}`);
    } else {
      console.error(`kysely:error: ${event}`);
    }
  }
}

// node_modules/kysely/dist/esm/util/compilable.js
init_modules_watch_stub();
function isCompilable(value) {
  return isObject(value) && isFunction(value.compile);
}

// node_modules/kysely/dist/esm/kysely.js
var Kysely = class extends QueryCreator {
  #props;
  constructor(args) {
    let superProps;
    let props;
    if (isKyselyProps(args)) {
      superProps = { executor: args.executor };
      props = { ...args };
    } else {
      const dialect = args.dialect;
      const driver = dialect.createDriver();
      const compiler = dialect.createQueryCompiler();
      const adapter = dialect.createAdapter();
      const log = new Log(args.log ?? []);
      const runtimeDriver = new RuntimeDriver(driver, log);
      const connectionProvider = new DefaultConnectionProvider(runtimeDriver);
      const executor = new DefaultQueryExecutor(compiler, adapter, connectionProvider, args.plugins ?? []);
      superProps = { executor };
      props = {
        config: args,
        executor,
        dialect,
        driver: runtimeDriver
      };
    }
    super(superProps);
    this.#props = freeze(props);
  }
  /**
   * Returns the {@link SchemaModule} module for building database schema.
   */
  get schema() {
    return new SchemaModule(this.#props.executor);
  }
  /**
   * Returns a the {@link DynamicModule} module.
   *
   * The {@link DynamicModule} module can be used to bypass strict typing and
   * passing in dynamic values for the queries.
   */
  get dynamic() {
    return new DynamicModule();
  }
  /**
   * Returns a {@link DatabaseIntrospector | database introspector}.
   */
  get introspection() {
    return this.#props.dialect.createIntrospector(this.withoutPlugins());
  }
  case(value) {
    return new CaseBuilder({
      node: CaseNode.create(isUndefined(value) ? void 0 : parseExpression(value))
    });
  }
  /**
   * Returns a {@link FunctionModule} that can be used to write type safe function
   * calls.
   *
   * ```ts
   * await db.selectFrom('person')
   *   .innerJoin('pet', 'pet.owner_id', 'person.id')
   *   .select((eb) => [
   *     'person.id',
   *     eb.fn.count('pet.id').as('pet_count')
   *   ])
   *   .groupBy('person.id')
   *   .having((eb) => eb.fn.count('pet.id'), '>', 10)
   *   .execute()
   * ```
   *
   * The generated SQL (PostgreSQL):
   *
   * ```sql
   * select "person"."id", count("pet"."id") as "pet_count"
   * from "person"
   * inner join "pet" on "pet"."owner_id" = "person"."id"
   * group by "person"."id"
   * having count("pet"."id") > $1
   * ```
   */
  get fn() {
    return createFunctionModule();
  }
  /**
   * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
   *
   * The returned {@link TransactionBuilder} can be used to configure the transaction. The
   * {@link TransactionBuilder.execute} method can then be called to run the transaction.
   * {@link TransactionBuilder.execute} takes a function that is run inside the
   * transaction. If the function throws, the transaction is rolled back. Otherwise
   * the transaction is committed.
   *
   * The callback function passed to the {@link TransactionBuilder.execute | execute}
   * method gets the transaction object as its only argument. The transaction is
   * of type {@link Transaction} which inherits {@link Kysely}. Any query
   * started through the transaction object is executed inside the transaction.
   *
   * ### Examples
   *
   * <!-- siteExample("transactions", "Simple transaction", 10) -->
   *
   * This example inserts two rows in a transaction. If an error is thrown inside
   * the callback passed to the `execute` method, the transaction is rolled back.
   * Otherwise it's committed.
   *
   * ```ts
   * const catto = await db.transaction().execute(async (trx) => {
   *   const jennifer = await trx.insertInto('person')
   *     .values({
   *       first_name: 'Jennifer',
   *       last_name: 'Aniston',
   *       age: 40,
   *     })
   *     .returning('id')
   *     .executeTakeFirstOrThrow()
   *
   *   return await trx.insertInto('pet')
   *     .values({
   *       owner_id: jennifer.id,
   *       name: 'Catto',
   *       species: 'cat',
   *       is_favorite: false,
   *     })
   *     .returningAll()
   *     .executeTakeFirst()
   * })
   * ```
   *
   * Setting the isolation level:
   *
   * ```ts
   * await db
   *   .transaction()
   *   .setIsolationLevel('serializable')
   *   .execute(async (trx) => {
   *     await doStuff(trx)
   *   })
   * ```
   */
  transaction() {
    return new TransactionBuilder({ ...this.#props });
  }
  /**
   * Provides a kysely instance bound to a single database connection.
   *
   * ### Examples
   *
   * ```ts
   * await db
   *   .connection()
   *   .execute(async (db) => {
   *     // `db` is an instance of `Kysely` that's bound to a single
   *     // database connection. All queries executed through `db` use
   *     // the same connection.
   *     await doStuff(db)
   *   })
   * ```
   */
  connection() {
    return new ConnectionBuilder({ ...this.#props });
  }
  /**
   * Returns a copy of this Kysely instance with the given plugin installed.
   */
  withPlugin(plugin) {
    return new Kysely({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  /**
   * Returns a copy of this Kysely instance without any plugins.
   */
  withoutPlugins() {
    return new Kysely({
      ...this.#props,
      executor: this.#props.executor.withoutPlugins()
    });
  }
  /**
   * @override
   */
  withSchema(schema) {
    return new Kysely({
      ...this.#props,
      executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  /**
   * Returns a copy of this Kysely instance with tables added to its
   * database type.
   *
   * This method only modifies the types and doesn't affect any of the
   * executed queries in any way.
   *
   * ### Examples
   *
   * The following example adds and uses a temporary table:
   *
   * @example
   * ```ts
   * await db.schema
   *   .createTable('temp_table')
   *   .temporary()
   *   .addColumn('some_column', 'integer')
   *   .execute()
   *
   * const tempDb = db.withTables<{
   *   temp_table: {
   *     some_column: number
   *   }
   * }>()
   *
   * await tempDb
   *   .insertInto('temp_table')
   *   .values({ some_column: 100 })
   *   .execute()
   * ```
   */
  withTables() {
    return new Kysely({ ...this.#props });
  }
  /**
   * Releases all resources and disconnects from the database.
   *
   * You need to call this when you are done using the `Kysely` instance.
   */
  async destroy() {
    await this.#props.driver.destroy();
  }
  /**
   * Returns true if this `Kysely` instance is a transaction.
   *
   * You can also use `db instanceof Transaction`.
   */
  get isTransaction() {
    return false;
  }
  /**
   * @internal
   * @private
   */
  getExecutor() {
    return this.#props.executor;
  }
  /**
   * Executes a given compiled query or query builder.
   *
   * See {@link https://github.com/koskimas/kysely/blob/master/site/docs/recipes/splitting-build-compile-and-execute-code.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
   */
  executeQuery(query, queryId = createQueryId()) {
    const compiledQuery = isCompilable(query) ? query.compile() : query;
    return this.getExecutor().executeQuery(compiledQuery, queryId);
  }
};
var Transaction = class extends Kysely {
  #props;
  constructor(props) {
    super(props);
    this.#props = props;
  }
  // The return type is `true` instead of `boolean` to make Kysely<DB>
  // unassignable to Transaction<DB> while allowing assignment the
  // other way around.
  get isTransaction() {
    return true;
  }
  transaction() {
    throw new Error("calling the transaction method for a Transaction is not supported");
  }
  connection() {
    throw new Error("calling the connection method for a Transaction is not supported");
  }
  async destroy() {
    throw new Error("calling the destroy method for a Transaction is not supported");
  }
  withPlugin(plugin) {
    return new Transaction({
      ...this.#props,
      executor: this.#props.executor.withPlugin(plugin)
    });
  }
  withoutPlugins() {
    return new Transaction({
      ...this.#props,
      executor: this.#props.executor.withoutPlugins()
    });
  }
  /**
   * @override
   */
  withSchema(schema) {
    return new Transaction({
      ...this.#props,
      executor: this.#props.executor.withPluginAtFront(new WithSchemaPlugin(schema))
    });
  }
  withTables() {
    return new Transaction({ ...this.#props });
  }
};
function isKyselyProps(obj) {
  return isObject(obj) && isObject(obj.config) && isObject(obj.driver) && isObject(obj.executor) && isObject(obj.dialect);
}
var ConnectionBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  async execute(callback) {
    return this.#props.executor.provideConnection(async (connection) => {
      const executor = this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const db = new Kysely({
        ...this.#props,
        executor
      });
      return await callback(db);
    });
  }
};
preventAwait(ConnectionBuilder, "don't await ConnectionBuilder instances directly. To execute the query you need to call the `execute` method");
var TransactionBuilder = class {
  #props;
  constructor(props) {
    this.#props = freeze(props);
  }
  setIsolationLevel(isolationLevel) {
    return new TransactionBuilder({
      ...this.#props,
      isolationLevel
    });
  }
  async execute(callback) {
    const { isolationLevel, ...kyselyProps } = this.#props;
    const settings = { isolationLevel };
    validateTransactionSettings(settings);
    return this.#props.executor.provideConnection(async (connection) => {
      const executor = this.#props.executor.withConnectionProvider(new SingleConnectionProvider(connection));
      const transaction = new Transaction({
        ...kyselyProps,
        executor
      });
      try {
        await this.#props.driver.beginTransaction(connection, settings);
        const result = await callback(transaction);
        await this.#props.driver.commitTransaction(connection);
        return result;
      } catch (error) {
        await this.#props.driver.rollbackTransaction(connection);
        throw error;
      }
    });
  }
};
preventAwait(TransactionBuilder, "don't await TransactionBuilder instances directly. To execute the transaction you need to call the `execute` method");
function validateTransactionSettings(settings) {
  if (settings.isolationLevel && !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
    throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
  }
}

// src/index.ts
var import_kysely_d1 = __toESM(require_dist());
var alwaysArray = ["ul", "ul.li"];
var src_default = {
  async fetch(request, env, ctx) {
    const response = await (await fetch("https://ossan.fm/feed.xml")).text();
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: "__",
      textNodeName: "$text",
      isArray: (name, jpath, isLeafNode, isAttribute) => {
        return alwaysArray.indexOf(jpath) !== -1 ? true : false;
      }
    };
    const parser = new import_fast_xml_parser.XMLParser(options);
    const feedObj = parser.parse(response);
    const db = new Kysely({ dialect: new import_kysely_d1.D1Dialect({ database: env.DB }) });
    for (const elm of feedObj.rss.channel.item) {
      const descObj = parser.parse(elm.description);
      const pubDate = new Date(elm.pubDate);
      const selectResult = await db.selectFrom("episodes").select(({ fn, val: val2, ref }) => [
        fn.count("episodes.title").as("title_count")
      ]).where("title", "=", elm.title).where("pubDate", "=", pubDate.toISOString()).executeTakeFirstOrThrow();
      if (parseInt(selectResult.title_count) > 0) {
        continue;
      }
      const insertResult = await db.insertInto("episodes").values({
        title: elm.title,
        link: elm.link,
        pubDate: pubDate.toISOString()
      }).returning(["id"]).executeTakeFirstOrThrow();
      for (const ulElm of descObj.ul) {
        for (const liElm of ulElm.li) {
          if (liElm.a) {
            if (liElm.a.$text === void 0) {
              console.log("========================== TODO: \u3053\u308C\u3092\u6368\u3066\u3066\u308B " + elm.title + " " + JSON.stringify(liElm));
              continue;
            }
            await db.insertInto("shownotes").values({
              episodeId: insertResult.id,
              title: liElm.a.$text,
              link: liElm.a.__href
            }).executeTakeFirstOrThrow();
          } else {
            if (typeof liElm === "object") {
              console.log("========================== TODO: \u3053\u308C\u3092\u6368\u3066\u3066\u308B " + elm.title + " " + JSON.stringify(liElm));
              continue;
            }
          }
        }
      }
    }
    return new Response("OK");
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
