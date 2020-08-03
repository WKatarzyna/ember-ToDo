(window["webpackJsonp_ember_auto_import_"] = window["webpackJsonp_ember_auto_import_"] || []).push([[5],{

/***/ "./node_modules/@firebase/functions/dist/index.cjs.js":
/*!************************************************************!*\
  !*** ./node_modules/@firebase/functions/dist/index.cjs.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _interopDefault(ex) {\n  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;\n}\n\nvar firebase = _interopDefault(__webpack_require__(/*! @firebase/app */ \"./node_modules/@firebase/app/dist/index.cjs.js\"));\n\nvar tslib = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n\nvar component = __webpack_require__(/*! @firebase/component */ \"./node_modules/@firebase/component/dist/index.cjs.js\");\n/**\r\n * @license\r\n * Copyright 2017 Google Inc.\r\n *\r\n * Licensed under the Apache License, Version 2.0 (the \"License\");\r\n * you may not use this file except in compliance with the License.\r\n * You may obtain a copy of the License at\r\n *\r\n *   http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing, software\r\n * distributed under the License is distributed on an \"AS IS\" BASIS,\r\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r\n * See the License for the specific language governing permissions and\r\n * limitations under the License.\r\n */\n\n/**\r\n * Standard error codes for different ways a request can fail, as defined by:\r\n * https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto\r\n *\r\n * This map is used primarily to convert from a backend error code string to\r\n * a client SDK error code string, and make sure it's in the supported set.\r\n */\n\n\nvar errorCodeMap = {\n  OK: 'ok',\n  CANCELLED: 'cancelled',\n  UNKNOWN: 'unknown',\n  INVALID_ARGUMENT: 'invalid-argument',\n  DEADLINE_EXCEEDED: 'deadline-exceeded',\n  NOT_FOUND: 'not-found',\n  ALREADY_EXISTS: 'already-exists',\n  PERMISSION_DENIED: 'permission-denied',\n  UNAUTHENTICATED: 'unauthenticated',\n  RESOURCE_EXHAUSTED: 'resource-exhausted',\n  FAILED_PRECONDITION: 'failed-precondition',\n  ABORTED: 'aborted',\n  OUT_OF_RANGE: 'out-of-range',\n  UNIMPLEMENTED: 'unimplemented',\n  INTERNAL: 'internal',\n  UNAVAILABLE: 'unavailable',\n  DATA_LOSS: 'data-loss'\n};\n/**\r\n * An explicit error that can be thrown from a handler to send an error to the\r\n * client that called the function.\r\n */\n\nvar HttpsErrorImpl =\n/** @class */\nfunction (_super) {\n  tslib.__extends(HttpsErrorImpl, _super);\n\n  function HttpsErrorImpl(code, message, details) {\n    var _this = _super.call(this, message) || this; // This is a workaround for a bug in TypeScript when extending Error:\n    // tslint:disable-next-line\n    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work\n\n\n    Object.setPrototypeOf(_this, HttpsErrorImpl.prototype);\n    _this.code = code;\n    _this.details = details;\n    return _this;\n  }\n\n  return HttpsErrorImpl;\n}(Error);\n/**\r\n * Takes an HTTP status code and returns the corresponding ErrorCode.\r\n * This is the standard HTTP status code -> error mapping defined in:\r\n * https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto\r\n *\r\n * @param status An HTTP status code.\r\n * @return The corresponding ErrorCode, or ErrorCode.UNKNOWN if none.\r\n */\n\n\nfunction codeForHTTPStatus(status) {\n  // Make sure any successful status is OK.\n  if (status >= 200 && status < 300) {\n    return 'ok';\n  }\n\n  switch (status) {\n    case 0:\n      // This can happen if the server returns 500.\n      return 'internal';\n\n    case 400:\n      return 'invalid-argument';\n\n    case 401:\n      return 'unauthenticated';\n\n    case 403:\n      return 'permission-denied';\n\n    case 404:\n      return 'not-found';\n\n    case 409:\n      return 'aborted';\n\n    case 429:\n      return 'resource-exhausted';\n\n    case 499:\n      return 'cancelled';\n\n    case 500:\n      return 'internal';\n\n    case 501:\n      return 'unimplemented';\n\n    case 503:\n      return 'unavailable';\n\n    case 504:\n      return 'deadline-exceeded';\n  }\n\n  return 'unknown';\n}\n/**\r\n * Takes an HTTP response and returns the corresponding Error, if any.\r\n */\n\n\nfunction _errorForResponse(status, bodyJSON, serializer) {\n  var code = codeForHTTPStatus(status); // Start with reasonable defaults from the status code.\n\n  var description = code;\n  var details = undefined; // Then look through the body for explicit details.\n\n  try {\n    var errorJSON = bodyJSON && bodyJSON.error;\n\n    if (errorJSON) {\n      var status_1 = errorJSON.status;\n\n      if (typeof status_1 === 'string') {\n        if (!errorCodeMap[status_1]) {\n          // They must've included an unknown error code in the body.\n          return new HttpsErrorImpl('internal', 'internal');\n        }\n\n        code = errorCodeMap[status_1]; // TODO(klimt): Add better default descriptions for error enums.\n        // The default description needs to be updated for the new code.\n\n        description = status_1;\n      }\n\n      var message = errorJSON.message;\n\n      if (typeof message === 'string') {\n        description = message;\n      }\n\n      details = errorJSON.details;\n\n      if (details !== undefined) {\n        details = serializer.decode(details);\n      }\n    }\n  } catch (e) {// If we couldn't parse explicit error data, that's fine.\n  }\n\n  if (code === 'ok') {\n    // Technically, there's an edge case where a developer could explicitly\n    // return an error code of OK, and we will treat it as success, but that\n    // seems reasonable.\n    return null;\n  }\n\n  return new HttpsErrorImpl(code, description, details);\n}\n/**\r\n * Helper class to get metadata that should be included with a function call.\r\n */\n\n\nvar ContextProvider =\n/** @class */\nfunction () {\n  function ContextProvider(authProvider, messagingProvider) {\n    var _this = this;\n\n    this.auth = null;\n    this.messaging = null;\n    this.auth = authProvider.getImmediate({\n      optional: true\n    });\n    this.messaging = messagingProvider.getImmediate({\n      optional: true\n    });\n\n    if (!this.auth) {\n      authProvider.get().then(function (auth) {\n        return _this.auth = auth;\n      }, function () {\n        /* get() never rejects */\n      });\n    }\n\n    if (!this.messaging) {\n      messagingProvider.get().then(function (messaging) {\n        return _this.messaging = messaging;\n      }, function () {\n        /* get() never rejects */\n      });\n    }\n  }\n\n  ContextProvider.prototype.getAuthToken = function () {\n    return tslib.__awaiter(this, void 0, void 0, function () {\n      var token, e_1;\n      return tslib.__generator(this, function (_a) {\n        switch (_a.label) {\n          case 0:\n            if (!this.auth) {\n              return [2\n              /*return*/\n              , undefined];\n            }\n\n            _a.label = 1;\n\n          case 1:\n            _a.trys.push([1, 3,, 4]);\n\n            return [4\n            /*yield*/\n            , this.auth.getToken()];\n\n          case 2:\n            token = _a.sent();\n\n            if (!token) {\n              return [2\n              /*return*/\n              , undefined];\n            }\n\n            return [2\n            /*return*/\n            , token.accessToken];\n\n          case 3:\n            e_1 = _a.sent(); // If there's any error when trying to get the auth token, leave it off.\n\n            return [2\n            /*return*/\n            , undefined];\n\n          case 4:\n            return [2\n            /*return*/\n            ];\n        }\n      });\n    });\n  };\n\n  ContextProvider.prototype.getInstanceIdToken = function () {\n    return tslib.__awaiter(this, void 0, void 0, function () {\n      return tslib.__generator(this, function (_a) {\n        if (!this.messaging || !('Notification' in self) || Notification.permission !== 'granted') {\n          return [2\n          /*return*/\n          , undefined];\n        }\n\n        try {\n          return [2\n          /*return*/\n          , this.messaging.getToken()];\n        } catch (e) {\n          // We don't warn on this, because it usually means messaging isn't set up.\n          // console.warn('Failed to retrieve instance id token.', e);\n          // If there's any error when trying to get the token, leave it off.\n          return [2\n          /*return*/\n          , undefined];\n        }\n\n        return [2\n        /*return*/\n        ];\n      });\n    });\n  };\n\n  ContextProvider.prototype.getContext = function () {\n    return tslib.__awaiter(this, void 0, void 0, function () {\n      var authToken, instanceIdToken;\n      return tslib.__generator(this, function (_a) {\n        switch (_a.label) {\n          case 0:\n            return [4\n            /*yield*/\n            , this.getAuthToken()];\n\n          case 1:\n            authToken = _a.sent();\n            return [4\n            /*yield*/\n            , this.getInstanceIdToken()];\n\n          case 2:\n            instanceIdToken = _a.sent();\n            return [2\n            /*return*/\n            , {\n              authToken: authToken,\n              instanceIdToken: instanceIdToken\n            }];\n        }\n      });\n    });\n  };\n\n  return ContextProvider;\n}();\n/**\r\n * @license\r\n * Copyright 2017 Google Inc.\r\n *\r\n * Licensed under the Apache License, Version 2.0 (the \"License\");\r\n * you may not use this file except in compliance with the License.\r\n * You may obtain a copy of the License at\r\n *\r\n *   http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing, software\r\n * distributed under the License is distributed on an \"AS IS\" BASIS,\r\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r\n * See the License for the specific language governing permissions and\r\n * limitations under the License.\r\n */\n\n\nvar LONG_TYPE = 'type.googleapis.com/google.protobuf.Int64Value';\nvar UNSIGNED_LONG_TYPE = 'type.googleapis.com/google.protobuf.UInt64Value';\n\nfunction mapValues( // { [k: string]: unknown } is no longer a wildcard assignment target after typescript 3.5\n// eslint-disable-next-line @typescript-eslint/no-explicit-any\no, f) {\n  var result = {};\n\n  for (var key in o) {\n    if (o.hasOwnProperty(key)) {\n      result[key] = f(o[key]);\n    }\n  }\n\n  return result;\n}\n\nvar Serializer =\n/** @class */\nfunction () {\n  function Serializer() {} // Takes data and encodes it in a JSON-friendly way, such that types such as\n  // Date are preserved.\n\n\n  Serializer.prototype.encode = function (data) {\n    var _this = this;\n\n    if (data == null) {\n      return null;\n    }\n\n    if (data instanceof Number) {\n      data = data.valueOf();\n    }\n\n    if (typeof data === 'number' && isFinite(data)) {\n      // Any number in JS is safe to put directly in JSON and parse as a double\n      // without any loss of precision.\n      return data;\n    }\n\n    if (data === true || data === false) {\n      return data;\n    }\n\n    if (Object.prototype.toString.call(data) === '[object String]') {\n      return data;\n    }\n\n    if (Array.isArray(data)) {\n      return data.map(function (x) {\n        return _this.encode(x);\n      });\n    }\n\n    if (typeof data === 'function' || typeof data === 'object') {\n      return mapValues(data, function (x) {\n        return _this.encode(x);\n      });\n    } // If we got this far, the data is not encodable.\n\n\n    throw new Error('Data cannot be encoded in JSON: ' + data);\n  }; // Takes data that's been encoded in a JSON-friendly form and returns a form\n  // with richer datatypes, such as Dates, etc.\n\n\n  Serializer.prototype.decode = function (json) {\n    var _this = this;\n\n    if (json == null) {\n      return json;\n    }\n\n    if (json['@type']) {\n      switch (json['@type']) {\n        case LONG_TYPE: // Fall through and handle this the same as unsigned.\n\n        case UNSIGNED_LONG_TYPE:\n          {\n            // Technically, this could work return a valid number for malformed\n            // data if there was a number followed by garbage. But it's just not\n            // worth all the extra code to detect that case.\n            var value = Number(json['value']);\n\n            if (isNaN(value)) {\n              throw new Error('Data cannot be decoded from JSON: ' + json);\n            }\n\n            return value;\n          }\n\n        default:\n          {\n            throw new Error('Data cannot be decoded from JSON: ' + json);\n          }\n      }\n    }\n\n    if (Array.isArray(json)) {\n      return json.map(function (x) {\n        return _this.decode(x);\n      });\n    }\n\n    if (typeof json === 'function' || typeof json === 'object') {\n      return mapValues(json, function (x) {\n        return _this.decode(x);\n      });\n    } // Anything else is safe to return.\n\n\n    return json;\n  };\n\n  return Serializer;\n}();\n/**\r\n * @license\r\n * Copyright 2017 Google Inc.\r\n *\r\n * Licensed under the Apache License, Version 2.0 (the \"License\");\r\n * you may not use this file except in compliance with the License.\r\n * You may obtain a copy of the License at\r\n *\r\n *   http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing, software\r\n * distributed under the License is distributed on an \"AS IS\" BASIS,\r\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r\n * See the License for the specific language governing permissions and\r\n * limitations under the License.\r\n */\n\n/**\r\n * Returns a Promise that will be rejected after the given duration.\r\n * The error will be of type HttpsErrorImpl.\r\n *\r\n * @param millis Number of milliseconds to wait before rejecting.\r\n */\n\n\nfunction failAfter(millis) {\n  return new Promise(function (_, reject) {\n    setTimeout(function () {\n      reject(new HttpsErrorImpl('deadline-exceeded', 'deadline-exceeded'));\n    }, millis);\n  });\n}\n/**\r\n * The main class for the Firebase Functions SDK.\r\n */\n\n\nvar Service =\n/** @class */\nfunction () {\n  /**\r\n   * Creates a new Functions service for the given app and (optional) region.\r\n   * @param app_ The FirebaseApp to use.\r\n   * @param region_ The region to call functions in.\r\n   */\n  function Service(app_, authProvider, messagingProvider, region_) {\n    var _this = this;\n\n    if (region_ === void 0) {\n      region_ = 'us-central1';\n    }\n\n    this.app_ = app_;\n    this.region_ = region_;\n    this.serializer = new Serializer();\n    this.emulatorOrigin = null;\n    this.INTERNAL = {\n      delete: function () {\n        return _this.deleteService();\n      }\n    };\n    this.contextProvider = new ContextProvider(authProvider, messagingProvider); // Cancels all ongoing requests when resolved.\n\n    this.cancelAllRequests = new Promise(function (resolve) {\n      _this.deleteService = function () {\n        return resolve();\n      };\n    });\n  }\n\n  Object.defineProperty(Service.prototype, \"app\", {\n    get: function () {\n      return this.app_;\n    },\n    enumerable: true,\n    configurable: true\n  });\n  /**\r\n   * Returns the URL for a callable with the given name.\r\n   * @param name The name of the callable.\r\n   */\n\n  Service.prototype._url = function (name) {\n    var projectId = this.app_.options.projectId;\n    var region = this.region_;\n\n    if (this.emulatorOrigin !== null) {\n      var origin_1 = this.emulatorOrigin;\n      return origin_1 + \"/\" + projectId + \"/\" + region + \"/\" + name;\n    }\n\n    return \"https://\" + region + \"-\" + projectId + \".cloudfunctions.net/\" + name;\n  };\n  /**\r\n   * Changes this instance to point to a Cloud Functions emulator running\r\n   * locally. See https://firebase.google.com/docs/functions/local-emulator\r\n   *\r\n   * @param origin The origin of the local emulator, such as\r\n   * \"http://localhost:5005\".\r\n   */\n\n\n  Service.prototype.useFunctionsEmulator = function (origin) {\n    this.emulatorOrigin = origin;\n  };\n  /**\r\n   * Returns a reference to the callable https trigger with the given name.\r\n   * @param name The name of the trigger.\r\n   */\n\n\n  Service.prototype.httpsCallable = function (name, options) {\n    var _this = this;\n\n    return function (data) {\n      return _this.call(name, data, options || {});\n    };\n  };\n  /**\r\n   * Does an HTTP POST and returns the completed response.\r\n   * @param url The url to post to.\r\n   * @param body The JSON body of the post.\r\n   * @param headers The HTTP headers to include in the request.\r\n   * @return A Promise that will succeed when the request finishes.\r\n   */\n\n\n  Service.prototype.postJSON = function (url, body, headers) {\n    return tslib.__awaiter(this, void 0, void 0, function () {\n      var response, e_1, json, e_2;\n      return tslib.__generator(this, function (_a) {\n        switch (_a.label) {\n          case 0:\n            headers.append('Content-Type', 'application/json');\n            _a.label = 1;\n\n          case 1:\n            _a.trys.push([1, 3,, 4]);\n\n            return [4\n            /*yield*/\n            , fetch(url, {\n              method: 'POST',\n              body: JSON.stringify(body),\n              headers: headers\n            })];\n\n          case 2:\n            response = _a.sent();\n            return [3\n            /*break*/\n            , 4];\n\n          case 3:\n            e_1 = _a.sent(); // This could be an unhandled error on the backend, or it could be a\n            // network error. There's no way to know, since an unhandled error on the\n            // backend will fail to set the proper CORS header, and thus will be\n            // treated as a network error by fetch.\n\n            return [2\n            /*return*/\n            , {\n              status: 0,\n              json: null\n            }];\n\n          case 4:\n            json = null;\n            _a.label = 5;\n\n          case 5:\n            _a.trys.push([5, 7,, 8]);\n\n            return [4\n            /*yield*/\n            , response.json()];\n\n          case 6:\n            json = _a.sent();\n            return [3\n            /*break*/\n            , 8];\n\n          case 7:\n            e_2 = _a.sent();\n            return [3\n            /*break*/\n            , 8];\n\n          case 8:\n            return [2\n            /*return*/\n            , {\n              status: response.status,\n              json: json\n            }];\n        }\n      });\n    });\n  };\n  /**\r\n   * Calls a callable function asynchronously and returns the result.\r\n   * @param name The name of the callable trigger.\r\n   * @param data The data to pass as params to the function.s\r\n   */\n\n\n  Service.prototype.call = function (name, data, options) {\n    return tslib.__awaiter(this, void 0, void 0, function () {\n      var url, body, headers, context, timeout, response, error, responseData, decodedData;\n      return tslib.__generator(this, function (_a) {\n        switch (_a.label) {\n          case 0:\n            url = this._url(name); // Encode any special types, such as dates, in the input data.\n\n            data = this.serializer.encode(data);\n            body = {\n              data: data\n            };\n            headers = new Headers();\n            return [4\n            /*yield*/\n            , this.contextProvider.getContext()];\n\n          case 1:\n            context = _a.sent();\n\n            if (context.authToken) {\n              headers.append('Authorization', 'Bearer ' + context.authToken);\n            }\n\n            if (context.instanceIdToken) {\n              headers.append('Firebase-Instance-ID-Token', context.instanceIdToken);\n            }\n\n            timeout = options.timeout || 70000;\n            return [4\n            /*yield*/\n            , Promise.race([this.postJSON(url, body, headers), failAfter(timeout), this.cancelAllRequests])];\n\n          case 2:\n            response = _a.sent(); // If service was deleted, interrupted response throws an error.\n\n            if (!response) {\n              throw new HttpsErrorImpl('cancelled', 'Firebase Functions instance was deleted.');\n            }\n\n            error = _errorForResponse(response.status, response.json, this.serializer);\n\n            if (error) {\n              throw error;\n            }\n\n            if (!response.json) {\n              throw new HttpsErrorImpl('internal', 'Response is not valid JSON object.');\n            }\n\n            responseData = response.json.data; // TODO(klimt): For right now, allow \"result\" instead of \"data\", for\n            // backwards compatibility.\n\n            if (typeof responseData === 'undefined') {\n              responseData = response.json.result;\n            }\n\n            if (typeof responseData === 'undefined') {\n              // Consider the response malformed.\n              throw new HttpsErrorImpl('internal', 'Response is missing data field.');\n            }\n\n            decodedData = this.serializer.decode(responseData);\n            return [2\n            /*return*/\n            , {\n              data: decodedData\n            }];\n        }\n      });\n    });\n  };\n\n  return Service;\n}();\n/**\r\n * @license\r\n * Copyright 2019 Google Inc.\r\n *\r\n * Licensed under the Apache License, Version 2.0 (the \"License\");\r\n * you may not use this file except in compliance with the License.\r\n * You may obtain a copy of the License at\r\n *\r\n *   http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing, software\r\n * distributed under the License is distributed on an \"AS IS\" BASIS,\r\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r\n * See the License for the specific language governing permissions and\r\n * limitations under the License.\r\n */\n\n/**\r\n * Type constant for Firebase Functions.\r\n */\n\n\nvar FUNCTIONS_TYPE = 'functions';\n\nfunction factory(container, region) {\n  // Dependencies\n  var app = container.getProvider('app').getImmediate();\n  var authProvider = container.getProvider('auth-internal');\n  var messagingProvider = container.getProvider('messaging'); // eslint-disable-next-line @typescript-eslint/no-explicit-any\n\n  return new Service(app, authProvider, messagingProvider, region);\n}\n\nfunction registerFunctions(instance) {\n  var namespaceExports = {\n    // no-inline\n    Functions: Service\n  };\n  instance.INTERNAL.registerComponent(new component.Component(FUNCTIONS_TYPE, factory, \"PUBLIC\"\n  /* PUBLIC */\n  ).setServiceProps(namespaceExports).setMultipleInstances(true));\n}\n\nvar name = \"@firebase/functions\";\nvar version = \"0.4.42\";\n/**\r\n * @license\r\n * Copyright 2017 Google Inc.\r\n *\r\n * Licensed under the Apache License, Version 2.0 (the \"License\");\r\n * you may not use this file except in compliance with the License.\r\n * You may obtain a copy of the License at\r\n *\r\n *   http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing, software\r\n * distributed under the License is distributed on an \"AS IS\" BASIS,\r\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r\n * See the License for the specific language governing permissions and\r\n * limitations under the License.\r\n */\n\nregisterFunctions(firebase);\nfirebase.registerVersion(name, version);\n\n//# sourceURL=webpack://__ember_auto_import__/./node_modules/@firebase/functions/dist/index.cjs.js?");

/***/ }),

/***/ "./node_modules/firebase/functions/dist/index.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/firebase/functions/dist/index.esm.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/functions */ \"./node_modules/@firebase/functions/dist/index.cjs.js\");\n/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_firebase_functions__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack://__ember_auto_import__/./node_modules/firebase/functions/dist/index.esm.js?");

/***/ })

}]);