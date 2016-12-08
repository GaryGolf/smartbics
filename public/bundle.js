/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var login_1 = __webpack_require__(3);
	var game_1 = __webpack_require__(7);
	var leaderboard_1 = __webpack_require__(10);
	var localstore_1 = __webpack_require__(12);
	var App = (function (_super) {
	    __extends(App, _super);
	    function App(props) {
	        _super.call(this, props);
	        this.message = 'hello';
	        this.stage = 0;
	    }
	    App.prototype.componentWillMount = function () {
	        // console.log('will')
	        // localStorage.clear()
	    };
	    App.prototype.getUsers = function (users) {
	        this.users = users;
	        this.stage = 1;
	        this.forceUpdate();
	    };
	    App.prototype.getResult = function (status) {
	        console.log('get results');
	        switch (status) {
	            // draw
	            case 0:
	                // switch users
	                this.users = [this.users[1], this.users[0]];
	                this.stage = 2;
	                this.message = 'draw';
	                // show 'draw' message for a while 
	                this.forceUpdate();
	                break;
	            case 1:
	            case 2:
	                // someone wins
	                var winner = this.users[status - 1];
	                var looser = (status - 1 == 0) ? this.users[1] : this.users[0];
	                this.message = winner + ' wins!';
	                // save stats
	                localstore_1.updateRecords(winner, looser);
	                this.stage = 2;
	                this.forceUpdate();
	                break;
	            case 3:
	                this.users = [this.users[1], this.users[0]];
	                this.stage = 1;
	                this.forceUpdate();
	                break;
	            default:
	        }
	    };
	    App.prototype.render = function () {
	        switch (this.stage) {
	            case 0:
	                return React.createElement(login_1.default, {users: localstore_1.getNames(), callback: this.getUsers.bind(this)});
	            case 1:
	                return React.createElement(game_1.default, {turns: [], users: this.users, callback: this.getResult.bind(this)});
	            case 2:
	                var leaderboard = localstore_1.getLeaderboardRecords();
	                return React.createElement(leaderboard_1.default, {message: this.message, callback: this.getResult.bind(this), leaderboard: leaderboard});
	            default:
	                return null;
	        }
	    };
	    return App;
	}(React.Component));
	ReactDOM.render(React.createElement(App, null), document.getElementById('layout'));
	// ReactDOM.render(<Game turns={[]} users={['vanya','tanya']}/>,document.getElementById('layout'))
	// ReactDOM.render(<Game turns={[2,3,5,7,8]} users={['vanya','tanya']}/>,document.getElementById('layout'))
	// ReactDOM.render(<Login users={['computer','beavis','butthead']}/>,document.getElementById('layout'))


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __assign = (this && this.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	var React = __webpack_require__(1);
	var login_style_1 = __webpack_require__(4);
	var Login = (function (_super) {
	    __extends(Login, _super);
	    function Login(props) {
	        _super.call(this, props);
	    }
	    Login.prototype.componentDidMount = function () {
	        this.input1.focus();
	        this.input2.disabled = true;
	    };
	    Login.prototype.input1Handler = function (event) {
	        var i1 = this.input1;
	        var i2 = this.input2;
	        switch (event.key) {
	            case 'Enter':
	                // user1 name should not be empty
	                if (i1.value == '')
	                    break;
	                if (i2.value != '' && i1.value != i2.value)
	                    return this.bingo();
	                i2.disabled = false;
	                // maybe user1 wants to play with computer?
	                i2.value = 'computer';
	                // maybe not
	                i2.setSelectionRange(0, 100);
	                i2.focus();
	            case 'Backspace':
	                break;
	            default:
	                this.userAutocomplete(1);
	        }
	    };
	    Login.prototype.input2Handler = function (event) {
	        var i1 = this.input1;
	        var i2 = this.input2;
	        switch (event.key) {
	            case 'Enter':
	                // user1 name should not be empty
	                if (i1.value == '' || i2.value == '' || i1.value == i2.value)
	                    break;
	                i2.setSelectionRange(0, 0);
	                i2.blur();
	                this.bingo();
	            case 'Backspace':
	                break;
	            default:
	                this.userAutocomplete(2);
	        }
	    };
	    Login.prototype.userAutocomplete = function (inputNum) {
	        var input = (inputNum == 1) ? this.input1 : this.input2;
	        var length = input.value.length;
	        if (length < 2)
	            return;
	        for (var i = 0; i < this.props.users.length; i++)
	            if (this.props.users[i].indexOf(input.value) == 0) {
	                input.value = this.props.users[i];
	                input.setSelectionRange(length, input.value.length);
	                return;
	            }
	    };
	    Login.prototype.bingo = function () {
	        this.props.callback([this.input1.value, this.input2.value]);
	        // console.log(`user1 ${this.input1.value} user2 ${this.input2.value}`)
	    };
	    Login.prototype.render = function () {
	        var _this = this;
	        var in1 = { onKeyUp: this.input1Handler.bind(this) };
	        var in2 = { onKeyUp: this.input2Handler.bind(this) };
	        return (React.createElement("div", {className: login_style_1.jss.login}, 
	            React.createElement("h3", {className: login_style_1.jss.title}, "крестики - нолики"), 
	            React.createElement("input", __assign({ref: function (el) { return _this.input1 = el; }, className: login_style_1.jss.input, type: "text", placeholder: "User 1"}, in1)), 
	            React.createElement("input", __assign({ref: function (el) { return _this.input2 = el; }, className: login_style_1.jss.input, type: "text", placeholder: "User 2"}, in2)), 
	            React.createElement("style", null, login_style_1.Style.getStyles())));
	    };
	    return Login;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Login;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FreeStyle = __webpack_require__(5);
	exports.Style = FreeStyle.create();
	exports.jss = {
	    input: exports.Style.registerStyle({
	        padding: '4px 12px 4px 12px',
	        border: '2px solid gray',
	        borderRadius: '6px',
	        boxSizing: 'border-box',
	        float: 'none',
	        transitionDuration: '0.5s',
	        margin: '7px',
	        width: '250px',
	        '&:focus': {
	            outline: 'none',
	            boxShadow: '3px 3px 6px #222328',
	            borderColor: 'silver'
	        }
	    }),
	    login: exports.Style.registerStyle({
	        // position: 'relative',
	        // display: 'table-cell',
	        // verticalAlign: 'middle',
	        margin: 'auto',
	        marginTop: '10%',
	        border: '2px dashed #677380',
	        padding: '0px 20px 20px 20px',
	        width: '310px'
	    }),
	    title: exports.Style.registerStyle({
	        color: '#A7A3AA',
	        cursor: 'default',
	        userSelect: 'none',
	        MozUserSelect: 'none',
	        WebkitUserSelect: 'none',
	        msUserSelect: 'none',
	        '&:hover': {
	            textShadow: '2px 2px 4px #222328'
	        }
	    }),
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Increment through IDs for FreeStyle, which can't generate hashed IDs.
	 */
	var instanceId = 0;
	/**
	 * The unique id is used to get a unique hash on styles (no merging).
	 */
	var uniqueId = 0;
	/**
	 * Tag styles with this string to get unique hash outputs.
	 */
	exports.IS_UNIQUE = '__DO_NOT_DEDUPE_STYLE__';
	/**
	 * CSS properties that are valid unit-less numbers.
	 */
	var CSS_NUMBER = {
	    'box-flex': true,
	    'box-flex-group': true,
	    'column-count': true,
	    'flex': true,
	    'flex-grow': true,
	    'flex-positive': true,
	    'flex-shrink': true,
	    'flex-negative': true,
	    'font-weight': true,
	    'line-clamp': true,
	    'line-height': true,
	    'opacity': true,
	    'order': true,
	    'orphans': true,
	    'tab-size': true,
	    'widows': true,
	    'z-index': true,
	    'zoom': true,
	    // SVG properties.
	    'fill-opacity': true,
	    'stroke-dashoffset': true,
	    'stroke-opacity': true,
	    'stroke-width': true
	};
	// Add vendor prefixes to all unit-less properties.
	for (var _i = 0, _a = ['-webkit-', '-ms-', '-moz-', '-o-']; _i < _a.length; _i++) {
	    var prefix = _a[_i];
	    for (var _b = 0, _c = Object.keys(CSS_NUMBER); _b < _c.length; _b++) {
	        var property = _c[_b];
	        CSS_NUMBER[prefix + property] = true;
	    }
	}
	/**
	 * Transform a JavaScript property into a CSS property.
	 */
	function hyphenate(propertyName) {
	    return propertyName
	        .replace(/([A-Z])/g, '-$1')
	        .replace(/^ms-/, '-ms-') // Internet Explorer vendor prefix.
	        .toLowerCase();
	}
	/**
	 * Check if a property name should pop to the top level of CSS.
	 */
	function isAtRule(propertyName) {
	    return propertyName.charAt(0) === '@';
	}
	/**
	 * Check if a value is a nested style definition.
	 */
	function isNestedStyle(value) {
	    return value != null && typeof value === 'object' && !Array.isArray(value);
	}
	/**
	 * Generate a hash value from a string.
	 */
	function stringHash(str) {
	    var value = 5381;
	    var i = str.length;
	    while (i) {
	        value = (value * 33) ^ str.charCodeAt(--i);
	    }
	    return (value >>> 0).toString(36);
	}
	exports.stringHash = stringHash;
	/**
	 * Transform a style string to a CSS string.
	 */
	function styleToString(name, value) {
	    if (typeof value === 'number' && value !== 0 && !CSS_NUMBER[name]) {
	        value += 'px';
	    }
	    return name + ":" + String(value).replace(/([\{\}\[\]])/g, '\\$1');
	}
	/**
	 * Sort an array of tuples by first value.
	 */
	function sortTuples(value) {
	    return value.sort(function (a, b) { return a[0] > b[0] ? 1 : -1; });
	}
	/**
	 * Categorize user styles.
	 */
	function parseUserStyles(styles, hasNestedStyles) {
	    var properties = [];
	    var nestedStyles = [];
	    var isUnique = false;
	    // Sort keys before adding to styles.
	    for (var _i = 0, _a = Object.keys(styles); _i < _a.length; _i++) {
	        var key = _a[_i];
	        var value = styles[key];
	        if (key === exports.IS_UNIQUE) {
	            isUnique = !!value;
	        }
	        else if (isNestedStyle(value)) {
	            nestedStyles.push([key.trim(), value]);
	        }
	        else {
	            properties.push([hyphenate(key.trim()), value]);
	        }
	    }
	    return {
	        properties: sortTuples(properties),
	        nestedStyles: hasNestedStyles ? nestedStyles : sortTuples(nestedStyles),
	        isUnique: isUnique
	    };
	}
	/**
	 * Stringify an array of property tuples.
	 */
	function stringifyProperties(properties) {
	    var result = [];
	    var _loop_1 = function(name_1, value) {
	        if (value != null) {
	            if (Array.isArray(value)) {
	                result.push(value.filter(function (x) { return x != null; }).map(function (x) { return styleToString(name_1, x); }).join(';'));
	            }
	            else {
	                result.push(styleToString(name_1, value));
	            }
	        }
	    };
	    for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
	        var _a = properties_1[_i], name_1 = _a[0], value = _a[1];
	        _loop_1(name_1, value);
	    }
	    return result.join(';');
	}
	/**
	 * Interpolate CSS selectors.
	 */
	function interpolate(selector, parent) {
	    if (selector.indexOf('&') > -1) {
	        return selector.replace(/&/g, parent);
	    }
	    return parent + " " + selector;
	}
	/**
	 * Register all styles, but collect for post-selector correction using the hash.
	 */
	function collectHashedStyles(container, userStyles, isStyle, displayName) {
	    var styles = [];
	    function stylize(cache, userStyles, selector) {
	        var _a = parseUserStyles(userStyles, isStyle), properties = _a.properties, nestedStyles = _a.nestedStyles, isUnique = _a.isUnique;
	        var styleString = stringifyProperties(properties);
	        var pid = styleString;
	        // Only create style instances when styles exists.
	        if (styleString) {
	            var style = new Style(styleString, cache.hash, isUnique ? "u" + (++uniqueId).toString(36) : undefined);
	            cache.add(style);
	            styles.push([cache, selector, style]);
	        }
	        for (var _i = 0, nestedStyles_1 = nestedStyles; _i < nestedStyles_1.length; _i++) {
	            var _b = nestedStyles_1[_i], name_2 = _b[0], value = _b[1];
	            pid += name_2;
	            if (isAtRule(name_2)) {
	                var rule = cache.add(new Rule(name_2, undefined, cache.hash));
	                pid += stylize(rule, value, selector);
	            }
	            else {
	                pid += stylize(cache, value, isStyle ? interpolate(name_2, selector) : name_2);
	            }
	        }
	        return pid;
	    }
	    // Create a temporary cache to handle changes/mutations before re-assigning later.
	    var cache = new Cache(container.hash);
	    var pid = stylize(cache, userStyles, '&');
	    var hash = "f" + cache.hash(pid);
	    var id = displayName ? displayName + "_" + hash : hash;
	    for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
	        var _a = styles_1[_i], cache_1 = _a[0], selector = _a[1], style = _a[2];
	        var key = isStyle ? interpolate(selector, "." + id) : selector;
	        cache_1.get(style).add(new Selector(key, style.hash, undefined, pid));
	    }
	    container.merge(cache);
	    return { pid: pid, id: id };
	}
	/**
	 * Recursively register styles on a container instance.
	 */
	function registerUserStyles(container, styles, displayName) {
	    return collectHashedStyles(container, styles, true, displayName).id;
	}
	/**
	 * Create user rule. Simplified collection of styles, since it doesn't need a unique id hash.
	 */
	function registerUserRule(container, selector, styles) {
	    var _a = parseUserStyles(styles, false), properties = _a.properties, nestedStyles = _a.nestedStyles, isUnique = _a.isUnique;
	    // Throw when using properties and nested styles together in rule.
	    if (properties.length && nestedStyles.length) {
	        throw new TypeError("Registering a CSS rule can not use properties with nested styles");
	    }
	    var styleString = stringifyProperties(properties);
	    var rule = new Rule(selector, styleString, container.hash, isUnique ? "u" + (++uniqueId).toString(36) : undefined);
	    for (var _i = 0, nestedStyles_2 = nestedStyles; _i < nestedStyles_2.length; _i++) {
	        var _b = nestedStyles_2[_i], name_3 = _b[0], value = _b[1];
	        registerUserRule(rule, name_3, value);
	    }
	    container.add(rule);
	}
	/**
	 * Parse and register keyframes on the current instance.
	 */
	function registerUserHashedRule(container, prefix, styles, displayName) {
	    var bucket = new Cache(container.hash);
	    var _a = collectHashedStyles(bucket, styles, false, displayName), pid = _a.pid, id = _a.id;
	    var atRule = new Rule(prefix + " " + id, undefined, container.hash, undefined, pid);
	    atRule.merge(bucket);
	    container.add(atRule);
	    return id;
	}
	/**
	 * Get the styles string for a container class.
	 */
	function getStyles(container) {
	    return container.values().map(function (style) { return style.getStyles(); }).join('');
	}
	/**
	 * Implement a cache/event emitter.
	 */
	var Cache = (function () {
	    function Cache(hash) {
	        this.hash = hash;
	        this.changeId = 0;
	        this._children = {};
	        this._keys = [];
	        this._counts = {};
	    }
	    Cache.prototype.values = function () {
	        var _this = this;
	        return this._keys.map(function (x) { return _this._children[x]; });
	    };
	    Cache.prototype.add = function (style) {
	        var count = this._counts[style.id] || 0;
	        var item = this._children[style.id] || style.clone();
	        this._counts[style.id] = count + 1;
	        if (count === 0) {
	            this._keys.push(item.id);
	            this._children[item.id] = item;
	            this.changeId++;
	        }
	        else {
	            // Check if contents are different.
	            if (item.getIdentifier() !== style.getIdentifier()) {
	                throw new TypeError("Hash collision: " + style.getStyles() + " === " + item.getStyles());
	            }
	            this._keys.splice(this._keys.indexOf(style.id), 1);
	            this._keys.push(style.id);
	            if (item instanceof Cache && style instanceof Cache) {
	                var prevChangeId = item.changeId;
	                item.merge(style);
	                if (item.changeId !== prevChangeId) {
	                    this.changeId++;
	                }
	            }
	        }
	        return item;
	    };
	    Cache.prototype.remove = function (style) {
	        var count = this._counts[style.id];
	        if (count > 0) {
	            this._counts[style.id] = count - 1;
	            var item = this._children[style.id];
	            if (count === 1) {
	                delete this._counts[style.id];
	                delete this._children[style.id];
	                this._keys.splice(this._keys.indexOf(style.id), 1);
	                this.changeId++;
	            }
	            else if (item instanceof Cache && style instanceof Cache) {
	                var prevChangeId = item.changeId;
	                item.unmerge(style);
	                if (item.changeId !== prevChangeId) {
	                    this.changeId++;
	                }
	            }
	        }
	    };
	    Cache.prototype.get = function (container) {
	        return this._children[container.id];
	    };
	    Cache.prototype.merge = function (cache) {
	        for (var _i = 0, _a = cache.values(); _i < _a.length; _i++) {
	            var value = _a[_i];
	            this.add(value);
	        }
	        return this;
	    };
	    Cache.prototype.unmerge = function (cache) {
	        for (var _i = 0, _a = cache.values(); _i < _a.length; _i++) {
	            var value = _a[_i];
	            this.remove(value);
	        }
	        return this;
	    };
	    Cache.prototype.clone = function () {
	        return new Cache(this.hash).merge(this);
	    };
	    return Cache;
	}());
	exports.Cache = Cache;
	/**
	 * Selector is a dumb class made to represent nested CSS selectors.
	 */
	var Selector = (function () {
	    function Selector(selector, hash, id, pid) {
	        if (id === void 0) { id = "s" + hash(selector); }
	        if (pid === void 0) { pid = ''; }
	        this.selector = selector;
	        this.hash = hash;
	        this.id = id;
	        this.pid = pid;
	    }
	    Selector.prototype.getStyles = function () {
	        return this.selector;
	    };
	    Selector.prototype.getIdentifier = function () {
	        return this.pid + "." + this.selector;
	    };
	    Selector.prototype.clone = function () {
	        return new Selector(this.selector, this.hash, this.id, this.pid);
	    };
	    return Selector;
	}());
	exports.Selector = Selector;
	/**
	 * The style container registers a style string with selectors.
	 */
	var Style = (function (_super) {
	    __extends(Style, _super);
	    function Style(style, hash, id) {
	        if (id === void 0) { id = "c" + hash(style); }
	        _super.call(this, hash);
	        this.style = style;
	        this.hash = hash;
	        this.id = id;
	    }
	    Style.prototype.getStyles = function () {
	        return this.values().map(function (x) { return x.selector; }).join(',') + "{" + this.style + "}";
	    };
	    Style.prototype.getIdentifier = function () {
	        return this.style;
	    };
	    Style.prototype.clone = function () {
	        return new Style(this.style, this.hash, this.id).merge(this);
	    };
	    return Style;
	}(Cache));
	exports.Style = Style;
	/**
	 * Implement rule logic for style output.
	 */
	var Rule = (function (_super) {
	    __extends(Rule, _super);
	    function Rule(rule, style, hash, id, pid) {
	        if (style === void 0) { style = ''; }
	        if (id === void 0) { id = "a" + hash(rule + "." + style); }
	        if (pid === void 0) { pid = ''; }
	        _super.call(this, hash);
	        this.rule = rule;
	        this.style = style;
	        this.hash = hash;
	        this.id = id;
	        this.pid = pid;
	    }
	    Rule.prototype.getStyles = function () {
	        return this.rule + "{" + this.style + getStyles(this) + "}";
	    };
	    Rule.prototype.getIdentifier = function () {
	        return this.pid + "." + this.rule + "." + this.style;
	    };
	    Rule.prototype.clone = function () {
	        return new Rule(this.rule, this.style, this.hash, this.id, this.pid).merge(this);
	    };
	    return Rule;
	}(Cache));
	exports.Rule = Rule;
	/**
	 * The FreeStyle class implements the API for everything else.
	 */
	var FreeStyle = (function (_super) {
	    __extends(FreeStyle, _super);
	    function FreeStyle(hash, debug, id) {
	        if (id === void 0) { id = "f" + (++instanceId).toString(36); }
	        _super.call(this, hash);
	        this.hash = hash;
	        this.debug = debug;
	        this.id = id;
	    }
	    FreeStyle.prototype.registerStyle = function (styles, displayName) {
	        return registerUserStyles(this, styles, this.debug ? displayName : undefined);
	    };
	    FreeStyle.prototype.registerKeyframes = function (keyframes, displayName) {
	        return registerUserHashedRule(this, '@keyframes', keyframes, this.debug ? displayName : undefined);
	    };
	    FreeStyle.prototype.registerRule = function (rule, styles) {
	        return registerUserRule(this, rule, styles);
	    };
	    FreeStyle.prototype.getStyles = function () {
	        return getStyles(this);
	    };
	    FreeStyle.prototype.getIdentifier = function () {
	        return this.id;
	    };
	    FreeStyle.prototype.clone = function () {
	        return new FreeStyle(this.hash, this.debug, this.id).merge(this);
	    };
	    return FreeStyle;
	}(Cache));
	exports.FreeStyle = FreeStyle;
	/**
	 * Exports a simple function to create a new instance.
	 */
	function create(hash, debug) {
	    if (hash === void 0) { hash = stringHash; }
	    if (debug === void 0) { debug = process.env.NODE_ENV !== 'production'; }
	    return new FreeStyle(hash, debug);
	}
	exports.create = create;
	//# sourceMappingURL=free-style.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var game_style_1 = __webpack_require__(8);
	var robot_1 = __webpack_require__(9);
	var Game = (function (_super) {
	    __extends(Game, _super);
	    function Game(props) {
	        _super.call(this, props);
	        this.cells = new Array(9);
	        this.turns = [];
	        this.playMode = false;
	        // [this.user1,this.user2] =this.props.users
	    }
	    Game.prototype.componentDidMount = function () {
	        console.log('yo');
	        this.user1.classList.add(game_style_1.jss.underline);
	        if (this.props.turns.length > 0)
	            this.play();
	    };
	    Game.prototype.play = function () {
	        var _this = this;
	        this.playMode = true;
	        var i = 0;
	        var int = setInterval(function () {
	            if (_this.props.turns.length > i) {
	                _this.makeTurn(_this.props.turns[i++]);
	            }
	            else {
	                clearInterval(int);
	            }
	        }, 1500);
	    };
	    Game.prototype.makeTurn = function (sector) {
	        // empty sector?
	        if (this.turns.indexOf(sector) >= 0)
	            return;
	        // save turn
	        this.turns.push(sector);
	        // odd - tic, even - tac
	        var className = (this.turns.length % 2) ? 'fa fa-times fa-3x' : 'fa fa-circle fa-3x';
	        this.cells[sector].children.item(0).className = className;
	        // does somebody win ?
	        if (robot_1.win(this.turns)) {
	            var user = (this.turns.length % 2) ? 0 : 1;
	            console.log('the winner is ' + this.props.users[user]);
	            this.props.callback(user + 1);
	            // this.playMode = true
	            return;
	        }
	        if (robot_1.isGameEnded(this.turns))
	            this.props.callback(0); // draw
	        this.user1.classList.toggle(game_style_1.jss.underline);
	        this.user2.classList.toggle(game_style_1.jss.underline);
	    };
	    // user click handler
	    Game.prototype.turn = function (sector) {
	        if (this.playMode)
	            return;
	        this.makeTurn(sector);
	    };
	    Game.prototype.render = function () {
	        return (React.createElement("div", {className: game_style_1.jss.game}, 
	            React.createElement("table", null, this.drawBoard()), 
	            React.createElement("table", null, this.drawUsers()), 
	            React.createElement("style", null, game_style_1.Style.getStyles())));
	    };
	    Game.prototype.drawBoard = function () {
	        var _this = this;
	        return (React.createElement("tbody", null, 
	            React.createElement("tr", null, 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.cells[0] = d; }, className: game_style_1.jss.cell, onClick: this.turn.bind(this, 0)}, 
	                        React.createElement("i", null)
	                    )
	                ), 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.cells[1] = d; }, className: game_style_1.jss.cell, onClick: this.turn.bind(this, 1)}, 
	                        React.createElement("i", null)
	                    )
	                ), 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.cells[2] = d; }, className: game_style_1.jss.cell, onClick: this.turn.bind(this, 2)}, 
	                        React.createElement("i", null)
	                    )
	                )), 
	            React.createElement("tr", null, 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.cells[3] = d; }, className: game_style_1.jss.cell, onClick: this.turn.bind(this, 3)}, 
	                        React.createElement("i", null)
	                    )
	                ), 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.cells[4] = d; }, className: game_style_1.jss.cell, onClick: this.turn.bind(this, 4)}, 
	                        React.createElement("i", null)
	                    )
	                ), 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.cells[5] = d; }, className: game_style_1.jss.cell, onClick: this.turn.bind(this, 5)}, 
	                        React.createElement("i", null)
	                    )
	                )), 
	            React.createElement("tr", null, 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.cells[6] = d; }, className: game_style_1.jss.cell, onClick: this.turn.bind(this, 6)}, 
	                        React.createElement("i", null)
	                    )
	                ), 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.cells[7] = d; }, className: game_style_1.jss.cell, onClick: this.turn.bind(this, 7)}, 
	                        React.createElement("i", null)
	                    )
	                ), 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.cells[8] = d; }, className: game_style_1.jss.cell, onClick: this.turn.bind(this, 8)}, 
	                        React.createElement("i", null)
	                    )
	                ))));
	    };
	    Game.prototype.drawUsers = function () {
	        var _this = this;
	        return (React.createElement("tbody", null, 
	            React.createElement("tr", null, 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.user1 = d; }, className: game_style_1.jss.user}, 
	                        React.createElement("i", {className: "fa fa-times"}), 
	                        " ", 
	                        this.props.users[0])
	                ), 
	                React.createElement("td", null, 
	                    React.createElement("div", {ref: function (d) { return _this.user2 = d; }, className: game_style_1.jss.user}, 
	                        React.createElement("i", {className: "fa fa-circle"}), 
	                        " ", 
	                        this.props.users[1])
	                ))
	        ));
	    };
	    return Game;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Game;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FreeStyle = __webpack_require__(5);
	exports.Style = FreeStyle.create();
	var width = 360;
	exports.jss = {
	    game: exports.Style.registerStyle({
	        position: 'absolute',
	        margin: 'auto',
	        marginTop: '10%',
	    }),
	    cell: exports.Style.registerStyle({
	        // width: '120px',
	        // heisght: '120px',
	        display: 'table-cell',
	        width: width / 3,
	        height: width / 3,
	        verticalAlign: 'middle',
	        textAlign: 'center',
	        background: 'rgba(255,255,255,.5)',
	        border: '1px solid gray',
	        cursor: 'default',
	    }),
	    user: exports.Style.registerStyle({
	        width: width / 2,
	        color: 'white',
	        padding: '15px',
	        display: 'table-cell',
	        verticalAlign: 'middle',
	        textAlign: 'center',
	        fontSize: '2rem'
	    }),
	    underline: exports.Style.registerStyle({
	        textDecoration: 'underline'
	    }),
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	// returns true if player, who has made last turn wins
	function win(turns) {
	    var cases = [
	        [0, 1, 2], [3, 4, 5], [6, 7, 8],
	        [0, 3, 6], [1, 4, 7], [2, 5, 8],
	        [0, 4, 8], [2, 4, 6]
	    ];
	    // filter last user turns
	    //the turns of the user , who made his turn last
	    var fturns = turns.filter(function (val, idx) { return (turns.length % 2 + idx % 2 == 1); }).sort();
	    if (fturns.length < 3)
	        return false;
	    return inspectAllCases(cases, createArrayOfTripples(fturns));
	}
	exports.win = win;
	function isGameEnded(turns) {
	    console.log('ended?' + turns.length);
	    if (turns.length == 9)
	        return true;
	    return false;
	}
	exports.isGameEnded = isGameEnded;
	//modify  array from [1,2,3,4] => [[1,2,3],[1,2,4],[1,3,4],[2,3,4]]
	function createArrayOfTripples(arr) {
	    var tripples = [];
	    for (var i = 0; i < arr.length - 2; i++)
	        for (var j = 1; j < arr.length - 1; j++)
	            for (var k = 2; k < arr.length; k++)
	                tripples.push([arr[i], arr[j], arr[k]]);
	    return tripples;
	}
	function compareArray(arr1, arr2) {
	    if (arr1.length != arr2.length)
	        return false;
	    for (var i = 0; i < arr1.length; i++)
	        if (arr1[i] !== arr2[i])
	            return false;
	    return true;
	}
	function inspectAllCases(cases, test) {
	    for (var i = 0; i < cases.length; i++)
	        for (var j = 0; j < test.length; j++)
	            if (compareArray(cases[i], test[j]))
	                return true;
	    return false;
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var leaderboard_style_1 = __webpack_require__(11);
	var Leaderboard = (function (_super) {
	    __extends(Leaderboard, _super);
	    function Leaderboard(props) {
	        _super.call(this, props);
	    }
	    // hContinue(event: MouseEvent){
	    // }
	    Leaderboard.prototype.render = function () {
	        return (React.createElement("div", {className: leaderboard_style_1.jss.container}, 
	            React.createElement("h1", null, this.props.message), 
	            React.createElement("div", {className: leaderboard_style_1.jss.leaderboard}, this.leaderboard()), 
	            React.createElement("button", {onClick: this.props.callback.bind(this, 3)}, "Continue"), 
	            React.createElement("style", null, leaderboard_style_1.Style.getStyles())));
	    };
	    Leaderboard.prototype.leaderboard = function () {
	        var records = this.props.leaderboard.map(function (val, idx) {
	            return (React.createElement("tr", {key: idx}, 
	                React.createElement("td", null, val.name), 
	                React.createElement("td", null, val.w), 
	                React.createElement("td", null, val.l)));
	        });
	        return (React.createElement("table", {className: leaderboard_style_1.jss.table}, 
	            React.createElement("tbody", null, 
	                React.createElement("tr", {className: leaderboard_style_1.jss.tableheader}, 
	                    React.createElement("td", null, "name"), 
	                    React.createElement("td", null, "w"), 
	                    React.createElement("td", null, "l")), 
	                records)
	        ));
	    };
	    return Leaderboard;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Leaderboard;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FreeStyle = __webpack_require__(5);
	exports.Style = FreeStyle.create();
	exports.jss = {
	    container: exports.Style.registerStyle({
	        color: 'silver'
	    }),
	    leaderboard: exports.Style.registerStyle({
	        margin: ' 30px auto',
	        height: '450px',
	        overflow: 'auto',
	        width: '360px',
	        background: 'rgba(100,100,100,.05)'
	    }),
	    table: exports.Style.registerStyle({
	        width: '100%',
	    }),
	    tableheader: exports.Style.registerStyle({
	        fontWeight: 'bold',
	        borderBottom: '1px solid silver',
	        padding: '5px'
	    })
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	function getNames() {
	    var records = getLeaderboardRecords();
	    return records.map(function (val) { return val.name; });
	}
	exports.getNames = getNames;
	function getRecord(name) {
	    var records = getLeaderboardRecords();
	    records.forEach(function (val) {
	        if (val.name == name)
	            return val;
	    });
	    return null;
	}
	exports.getRecord = getRecord;
	function updateRecords(winner, looser) {
	    var winnerUpdated = false;
	    var looserUpdated = false;
	    var records = getLeaderboardRecords();
	    // increase win and loose counters, then sort by win counter
	    var newRecords = records.map(function (val) {
	        if (val.name == winner) {
	            winnerUpdated = true;
	            val.w++;
	            console.log(winner + ' updated');
	            return val;
	        }
	        else if (val.name == looser) {
	            looserUpdated = true;
	            val.l++;
	            console.log(looser + ' updated');
	            return val;
	        }
	        else
	            return val;
	    }).sort(function (a, b) { return b.w - a.w; });
	    //in case player are new insert them to  store
	    if (!winnerUpdated)
	        newRecords.push({ name: winner, w: 1, l: 0 });
	    if (!looserUpdated)
	        newRecords.push({ name: looser, w: 0, l: 1 });
	    localStorage.setItem('leaderboard', JSON.stringify(newRecords));
	}
	exports.updateRecords = updateRecords;
	function getLeaderboardRecords() {
	    var records = [];
	    var store = localStorage['leaderboard'];
	    if (!store)
	        return [];
	    try {
	        records = JSON.parse(store) || [];
	    }
	    catch (e) {
	        console.error(e);
	    }
	    return records;
	}
	exports.getLeaderboardRecords = getLeaderboardRecords;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map