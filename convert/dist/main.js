/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/request-promise-native/lib/rp.js":
/*!*******************************************************!*\
  !*** ./node_modules/request-promise-native/lib/rp.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nvar configure = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'request-promise-core/configure/request2'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),\n    stealthyRequire = __webpack_require__(/*! stealthy-require */ \"./node_modules/stealthy-require/lib/index.js\");\n\n// Load Request freshly - so that users can require an unaltered request instance!\nvar request = stealthyRequire(__webpack_require__.c, function () {\n    return __webpack_require__(/*! request */ \"./node_modules/request/index.js\");\n},\nfunction () {\n    __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'tough-cookie'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n}, module);\n\n\nconfigure({\n    request: request,\n    PromiseImpl: Promise,\n    expose: [\n        'then',\n        'catch',\n        'promise'\n    ]\n});\n\n\nmodule.exports = request;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/request-promise-native/lib/rp.js?");

/***/ }),

/***/ "./node_modules/request/index.js":
/*!***************************************!*\
  !*** ./node_modules/request/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright 2010-2012 Mikeal Rogers\n//\n//    Licensed under the Apache License, Version 2.0 (the \"License\");\n//    you may not use this file except in compliance with the License.\n//    You may obtain a copy of the License at\n//\n//        http://www.apache.org/licenses/LICENSE-2.0\n//\n//    Unless required by applicable law or agreed to in writing, software\n//    distributed under the License is distributed on an \"AS IS\" BASIS,\n//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n//    See the License for the specific language governing permissions and\n//    limitations under the License.\n\n\n\nvar extend = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'extend'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))\nvar cookies = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './lib/cookies'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))\nvar helpers = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './lib/helpers'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))\n\nvar paramsHaveRequestBody = helpers.paramsHaveRequestBody\n\n// organize params for patch, post, put, head, del\nfunction initParams (uri, options, callback) {\n  if (typeof options === 'function') {\n    callback = options\n  }\n\n  var params = {}\n  if (typeof options === 'object') {\n    extend(params, options, {uri: uri})\n  } else if (typeof uri === 'string') {\n    extend(params, {uri: uri})\n  } else {\n    extend(params, uri)\n  }\n\n  params.callback = callback || params.callback\n  return params\n}\n\nfunction request (uri, options, callback) {\n  if (typeof uri === 'undefined') {\n    throw new Error('undefined is not a valid uri or options object.')\n  }\n\n  var params = initParams(uri, options, callback)\n\n  if (params.method === 'HEAD' && paramsHaveRequestBody(params)) {\n    throw new Error('HTTP HEAD requests MUST NOT include a request body.')\n  }\n\n  return new request.Request(params)\n}\n\nfunction verbFunc (verb) {\n  var method = verb.toUpperCase()\n  return function (uri, options, callback) {\n    var params = initParams(uri, options, callback)\n    params.method = method\n    return request(params, params.callback)\n  }\n}\n\n// define like this to please codeintel/intellisense IDEs\nrequest.get = verbFunc('get')\nrequest.head = verbFunc('head')\nrequest.options = verbFunc('options')\nrequest.post = verbFunc('post')\nrequest.put = verbFunc('put')\nrequest.patch = verbFunc('patch')\nrequest.del = verbFunc('delete')\nrequest['delete'] = verbFunc('delete')\n\nrequest.jar = function (store) {\n  return cookies.jar(store)\n}\n\nrequest.cookie = function (str) {\n  return cookies.parse(str)\n}\n\nfunction wrapRequestMethod (method, options, requester, verb) {\n  return function (uri, opts, callback) {\n    var params = initParams(uri, opts, callback)\n\n    var target = {}\n    extend(true, target, options, params)\n\n    target.pool = params.pool || options.pool\n\n    if (verb) {\n      target.method = verb.toUpperCase()\n    }\n\n    if (typeof requester === 'function') {\n      method = requester\n    }\n\n    return method(target, target.callback)\n  }\n}\n\nrequest.defaults = function (options, requester) {\n  var self = this\n\n  options = options || {}\n\n  if (typeof options === 'function') {\n    requester = options\n    options = {}\n  }\n\n  var defaults = wrapRequestMethod(self, options, requester)\n\n  var verbs = ['get', 'head', 'post', 'put', 'patch', 'del', 'delete']\n  verbs.forEach(function (verb) {\n    defaults[verb] = wrapRequestMethod(self[verb], options, requester, verb)\n  })\n\n  defaults.cookie = wrapRequestMethod(self.cookie, options, requester)\n  defaults.jar = self.jar\n  defaults.defaults = self.defaults\n  return defaults\n}\n\nrequest.forever = function (agentOptions, optionsArg) {\n  var options = {}\n  if (optionsArg) {\n    extend(options, optionsArg)\n  }\n  if (agentOptions) {\n    options.agentOptions = agentOptions\n  }\n\n  options.forever = true\n  return request.defaults(options)\n}\n\n// Exports\n\nmodule.exports = request\nrequest.Request = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './request'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))\nrequest.initParams = initParams\n\n// Backwards compatibility for request.debug\nObject.defineProperty(request, 'debug', {\n  enumerable: true,\n  get: function () {\n    return request.Request.debug\n  },\n  set: function (debug) {\n    request.Request.debug = debug\n  }\n})\n\n\n//# sourceURL=webpack:///./node_modules/request/index.js?");

/***/ }),

/***/ "./node_modules/stealthy-require/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/stealthy-require/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isNative = /\\.node$/;\n\nfunction forEach(obj, callback) {\n    for ( var key in obj ) {\n        if (!Object.prototype.hasOwnProperty.call(obj, key)) {\n            continue;\n        }\n        callback(key);\n    }\n}\n\nfunction assign(target, source) {\n    forEach(source, function (key) {\n        target[key] = source[key];\n    });\n    return target;\n}\n\nfunction clearCache(requireCache) {\n    forEach(requireCache, function (resolvedPath) {\n        if (!isNative.test(resolvedPath)) {\n            delete requireCache[resolvedPath];\n        }\n    });\n}\n\nmodule.exports = function (requireCache, callback, callbackForModulesToKeep, module) {\n\n    var originalCache = assign({}, requireCache);\n    clearCache(requireCache);\n\n    if (callbackForModulesToKeep) {\n\n        var originalModuleChildren = module.children ? module.children.slice() : false; // Creates a shallow copy of module.children\n\n        callbackForModulesToKeep();\n\n        // Lists the cache entries made by callbackForModulesToKeep()\n        var modulesToKeep = [];\n        forEach(requireCache, function (key) {\n            modulesToKeep.push(key);\n        });\n\n        // Discards the modules required in callbackForModulesToKeep()\n        clearCache(requireCache);\n\n        if (module.children) { // Only true for node.js\n            module.children = originalModuleChildren; // Removes last references to modules required in callbackForModulesToKeep() -> No memory leak\n        }\n\n        // Takes the cache entries of the original cache in case the modules where required before\n        for ( var i = 0; i < modulesToKeep.length; i+=1 ) {\n            if (originalCache[modulesToKeep[i]]) {\n                requireCache[modulesToKeep[i]] = originalCache[modulesToKeep[i]];\n            }\n        }\n\n    }\n\n    var freshModule = callback();\n\n    var stealthCache = callbackForModulesToKeep ? assign({}, requireCache) : false;\n\n    clearCache(requireCache);\n\n    if (callbackForModulesToKeep) {\n        // In case modules to keep were required inside the stealthy require for the first time, copy them to the restored cache\n        for ( var k = 0; k < modulesToKeep.length; k+=1 ) {\n            if (stealthCache[modulesToKeep[k]]) {\n                requireCache[modulesToKeep[k]] = stealthCache[modulesToKeep[k]];\n            }\n        }\n    }\n\n    assign(requireCache, originalCache);\n\n    return freshModule;\n\n};\n\n\n//# sourceURL=webpack:///./node_modules/stealthy-require/lib/index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar request = __importStar(__webpack_require__(/*! request-promise-native */ \"./node_modules/request-promise-native/lib/rp.js\"));\nvar main = function () {\n    return __awaiter(this, void 0, void 0, function () {\n        var url, baseUrl, queryString, options, result, e_1;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    _a.trys.push([0, 2, , 3]);\n                    url = 'https://raw.githubusercontent.com/yousan/swagger-yaml-to-html/master/petstore.yaml';\n                    baseUrl = 'https://www.random.org/integers';\n                    queryString = '?num=100&min=1&max=100&col=5&base=10&format=html&rnd=new';\n                    options = {\n                        // uri: baseUrl + queryString,\n                        uri: url,\n                    };\n                    return [4 /*yield*/, request.get(options)];\n                case 1:\n                    result = _a.sent();\n                    return [3 /*break*/, 3];\n                case 2:\n                    e_1 = _a.sent();\n                    return [3 /*break*/, 3];\n                case 3: return [2 /*return*/];\n            }\n        });\n    });\n};\nmain();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });