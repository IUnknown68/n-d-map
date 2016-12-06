'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file  NDMap.js
 * @author Arne Seib <arne28@seiberspace.de>
 * @copyright Arne Seib 2016
 * @license MIT - see ./LICENSE
 */

/**
 * Makes sure a `Map` exists for `key` in `map`. Creates one if none found.
 * @param  {Map} map The map to check for `key`.
 * @param  {any} key The key to assert.
 * @return {Map}     The `Map` for that key.
 */
function assertDimension(map, key) {
  var entry = map.get(key);
  if (!entry) {
    map.set(key, entry = new Map());
  }
  return entry;
}

/**
 * Returns the number of data-elements stored in `map` or its descendants.
 * Recursive function. When called with a `depth` of 1, it returns the size of `map`.
 * Otherwise it iterates the entries and calls `getSize()` on it with `depth` decremented
 * by 1.
 * @param  {Map} map The map iterate.
 * @param  {Number} depth Maximal depth to iterate. When `map` is a root-map, then
 *                        this is initially the number of dimensions.
 * @return {Number}       Total number of data-entries.
 */
function getSize(map, depth) {
  --depth;
  if (depth < 1) {
    return map.size;
  }
  var size = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = map.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var submap = _step.value;

      size += getSize(submap, depth);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return size;
}

/**
 * @class NDMap is a multi-dimensional map.
 *
 */

var NDMap = function () {
  /**
   * Constructor for NDMap.
   * @param  {Number} dimensions The number of dimensions for this instance.
   */
  function NDMap(dimensions) {
    _classCallCheck(this, NDMap);

    this._dimensions = parseInt(dimensions, 10);
    if (!this._dimensions || this._dimensions < 1) {
      throw new Error('new NDMap: Dimensions must be > 0');
    }
    this._root = new Map();
  }

  /**
   * Returns the item at the path specified by `keys`.
   * @param  {Array} keys Array with keys. Must be <= `this._dimensions`.
   * @return {Object}     Whatever is stored here. Can be a `Map` or a value.
   */


  _createClass(NDMap, [{
    key: '_getEntry',
    value: function _getEntry(keys) {
      if (keys.length > this._dimensions) {
        throw new Error('NDMap.has: More than ' + this._dimensions + ' keys given');
      }
      var entry = this._root;
      for (var n = 0; entry && n < keys.length; n++) {
        entry = entry.get(keys[n]);
      }
      return entry;
    }

    /**
     * Getter for size. Returns the overall number of data-items stored. Use wiseley,
     * this will iterate recursiveley through all descendants!
     * @return {Number} Total number of data-items stored.
     */

  }, {
    key: 'clear',


    /**
     * Removes all items.
     */
    value: function clear() {
      this._root.clear();
    }

    /**
     * Removes the item specified by `keys`.
     * @param  {Any} keys Full path (all dimensions) to the item to remove.
     * @return {Boolean}  True if the item was found (and removed).
     */

  }, {
    key: 'delete',
    value: function _delete() {
      for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      if (keys.length !== this._dimensions) {
        throw new Error('NDMap.delete: Need full path (' + this._dimensions + ' dimensions)');
      }
      var last = keys.pop();
      var entry = this._getEntry(keys);
      if (entry) {
        return entry.delete(last);
      }
      return false;
    }

    /**
     * Returns the item specified by `keys`.
     * @param  {Any} keys Full or partial path to the item.
     * @return {Object}   Whatever is stored here. Can be a `Map` or a value.
     */

  }, {
    key: 'get',
    value: function get() {
      for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      return this._getEntry(keys);
    }

    /**
     * Checks if the item specified by `keys` exists.
     * @param  {Any} keys Full or partial path to the item.
     * @return {Boolean}  True if the item exists.
     */

  }, {
    key: 'has',
    value: function has() {
      for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        keys[_key3] = arguments[_key3];
      }

      var last = keys.pop();
      var entry = this._getEntry(keys);
      return entry && entry.has(last) || false;
    }

    /**
     * Sets a data-item.
     * @param  {Any} args The last entry must be the value to set.
     *                    The rest is the full path to the item.
     *                    If the path does not exist, it is created.
     */

  }, {
    key: 'set',
    value: function set() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var value = args.pop();
      if (args.length !== this._dimensions) {
        throw new Error('NDMap.set: Need full path (' + this._dimensions + ' dimensions)');
      }

      var last = args.pop();

      var map = this._root;
      for (var n = 0; n < args.length; n++) {
        map = assertDimension(map, args[n]);
      }
      map.set(last, value);
    }

    /**
     * `this._root.entries(...)`
     */

  }, {
    key: 'entries',
    value: function entries() {
      return this._root.entries();
    }

    /**
     * `this._root.keys(...)`
     */

  }, {
    key: 'keys',
    value: function keys() {
      return this._root.keys();
    }

    /**
     * `this._root.values(...)`
     */

  }, {
    key: 'values',
    value: function values() {
      return this._root.values();
    }

    /**
     * `this._root.forEach(...)`
     */
    //----------------------------------------------------------------------------

  }, {
    key: 'forEach',
    value: function forEach(callback, thisArg) {
      return this._root.entries(callback, thisArg);
    }
  }, {
    key: 'size',
    get: function get() {
      return getSize(this._root, this._dimensions);
    }
  }]);

  return NDMap;
}();

module.exports = NDMap;