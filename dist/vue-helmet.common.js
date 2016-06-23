/**
 * vue-helmet v1.1.1
 * https://github.com/miaolz123/vue-helmet
 * MIT License
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-runtime/core-js/object/keys"), require("babel-runtime/helpers/typeof"));
	else if(typeof define === 'function' && define.amd)
		define(["babel-runtime/core-js/object/keys", "babel-runtime/helpers/typeof"], factory);
	else if(typeof exports === 'object')
		exports["VueHelmet"] = factory(require("babel-runtime/core-js/object/keys"), require("babel-runtime/helpers/typeof"));
	else
		root["VueHelmet"] = factory(root["babel-runtime/core-js/object/keys"], root["babel-runtime/helpers/typeof"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _typeof2 = __webpack_require__(2);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isArrayLike = function isArrayLike(obj) {
	  var jtype = function jtype(obj) {
	    var class2type = {};
	    var toString = class2type.toString;
	    if (obj == null) {
	      return obj + '';
	    }
	    return (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj);
	  };
	  var isWindow = function isWindow(obj) {
	    return obj != null && obj === obj.window;
	  };
	  var length = !!obj && 'length' in obj && obj.length;
	  var type = jtype(obj);
	  if (type === 'function' || isWindow(obj)) {
	    return false;
	  }
	  return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
	};

	var range = function range(obj, callback) {
	  var length = 0;
	  var i = 0;
	  if (isArrayLike(obj)) {
	    length = obj.length;
	    for (; i < length; i++) {
	      if (callback.call(obj[i], i, obj[i]) === false) {
	        break;
	      }
	    }
	  } else {
	    for (i in obj) {
	      if (callback.call(obj[i], i, obj[i]) === false) {
	        break;
	      }
	    }
	  }
	  return obj;
	};

	var updateHtmlAttributes = function updateHtmlAttributes(attributes) {
	  var htmlTags = document.getElementsByTagName('html');
	  if (htmlTags.length > 0) {
	    range(attributes, function (k, v) {
	      htmlTags[0].setAttribute(k, v);
	    });
	  }
	};

	var updateBase = function updateBase(attributes) {
	  var headElement = document.head || document.querySelector('head');
	  var oldBases = headElement.getElementsByTagName('base');
	  var newBase = document.createElement('base');
	  range(oldBases, function () {
	    headElement.removeChild(oldBases[0]);
	  });
	  range(attributes, function (k, v) {
	    newBase.setAttribute(k, v);
	  });
	  headElement.appendChild(newBase);
	};

	var updateMeta = function updateMeta(attributes) {
	  var headElement = document.head || document.querySelector('head');
	  var oldMetas = headElement.getElementsByTagName('meta');
	  var attributeKeys = (0, _keys2.default)(attributes);
	  var i = 0;
	  range(oldMetas, function () {
	    if (attributeKeys.indexOf(oldMetas[i].name) > -1) {
	      headElement.removeChild(oldMetas[i]);
	    } else i++;
	  });
	  range(attributes, function (k, v) {
	    var newElement = document.createElement('meta');
	    newElement.setAttribute('name', k);
	    newElement.setAttribute('content', v);
	    headElement.appendChild(newElement);
	  });
	};

	var updateLink = function updateLink(links) {
	  var headElement = document.head || document.querySelector('head');
	  var oldLinks = headElement.getElementsByTagName('link');
	  range(links, function (i, link) {
	    var newElement = document.createElement('link');
	    range(link, function (k, v) {
	      newElement.setAttribute(k, v);
	    });
	    range(oldLinks, function (index) {
	      if (oldLinks[index].isEqualNode(newElement)) {
	        headElement.removeChild(oldLinks[index]);
	      }
	    });
	    headElement.appendChild(newElement);
	  });
	};

	var updateScript = function updateScript(scripts) {
	  var headElement = document.head || document.querySelector('head');
	  var oldScripts = headElement.getElementsByTagName('script');
	  range(scripts, function (i, script) {
	    var newElement = document.createElement('script');
	    range(script, function (k, v) {
	      newElement.setAttribute(k, v);
	    });
	    range(oldScripts, function (index) {
	      if (oldScripts[index].isEqualNode(newElement)) {
	        headElement.removeChild(oldScripts[index]);
	      }
	    });
	    headElement.appendChild(newElement);
	  });
	};

	exports.default = {
	  props: {
	    htmlAttributes: {
	      type: Object
	    },
	    title: {
	      type: String
	    },
	    base: {
	      type: Object
	    },
	    meta: {
	      type: Object
	    },
	    links: {
	      type: Array
	    },
	    scripts: {
	      type: Array
	    }
	  },
	  data: {
	    head: ''
	  },
	  init: function init() {
	    var headElement = document.head || document.querySelector('head');
	    this.head = headElement.outerHTML;
	  },
	  ready: function ready() {
	    if (this.htmlAttributes) updateHtmlAttributes(this.htmlAttributes);
	    if (this.title) document.title = this.title;
	    if (this.base) updateBase(this.base);
	    if (this.meta) updateMeta(this.meta);
	    if (this.links) updateLink(this.links);
	    if (this.scripts) updateScript(this.scripts);
	  },
	  destroyed: function destroyed() {
	    var headElement = document.head || document.querySelector('head');
	    headElement.outerHTML = this.head;
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;