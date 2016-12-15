'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @module NDEMap
 * @description `NDEMap` is multidimensional Map that emulates multiple dimensions by
 * joining / splitting keys by a given separator. It uses a flat `Map` to store
 * it's values.
 *
 * The differences towards `NDMap` (true multidimensional Map) are:
 * - Keys are stringified with a separator. This means, you can use only strings
 *   for the keys, and you need to reserve a certain char (default: ':') as a
 *   separator.
 * - The order in which items are returned by `Iterator`s is strictly the order
 *   in which items were inserted, regardless of the dimensions.
 * @author Arne Seib <iunknown@seiberspace.de>
 * @copyright Arne Seib 2016
 * @license MIT - see ./LICENSE
 */

/**
 * `_mapResultKey` returns the key from a map entry. The result (string) is split
 * into an array of keys.
 * @private
 * @param  {Array} value Array: `[0]` = key, `[1]` = value
 * @return {Array}       Keys from `value[0]`.
 */
function _mapResultKey(value) {
  return this._keysFromKey(value[0]);
}

/**
 * `_mapResultValue` returns the value from a map entry.
 * @private
 * @param  {Array} value Array: `[0]` = key, `[1]` = value
 * @return {Any}         `value[1]` (value)
 */
function _mapResultValue(value) {
  return value[1];
}

/**
 * `_mapResultEntry` returns the full map entry. The resulting keys (strings) are split
 * into arrays of keys.
 * @private
 * @param  {Array} value Array: `[0]` = key, `[1]` = value
 * @return {Array}       `value` itself with mapped keys (keys/value).
 */
function _mapResultEntry(value) {
  return [this._keysFromKey(value[0]), value[1]];
}

/**
 * @class `NDEMapIterator` is an `Iterator` for `NDEMap`.
 * It iterates through all entries of `map`, has a `next()`-function and implents
 * an `@@iterator`-generator.
 * @property {Function} next `Iterator`'s `next()`.
 * @property {Generator} @@iterator The generator-function.
 * @private
 */

var NDEMapIterator =
/**
 * Constructor for `NDEMapIterator`.
 * @param  {NDEMap}   map        The `NDEMap`-object this is for.
 * @param  {Function} mapResult  Function mapping the result from the `entries()`-iterator
 *                               do the desired value (key, value, or both).
 */
function NDEMapIterator(map, mapResult) {
  _classCallCheck(this, NDEMapIterator);

  var it = map._root.entries();

  this.next = function () {
    // get next value from current iterator
    var res = it.next();
    if (!res.done) {
      res.value = mapResult(res.value);
    }
    return res;
  };

  this[Symbol.iterator] = function () {
    return this;
  };
};

/**
 * @class `NDEMap` is a multi-dimensional map.
 *
 */


var NDEMap = function () {
  /**
   * Constructor for NDEMap.
   * @param  {Number} dimensions The number of dimensions for this instance.
   * @param  {String} separator The separator to use.
   */
  function NDEMap(dimensions) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ':';

    _classCallCheck(this, NDEMap);

    this._separator = separator;
    this._dimensions = parseInt(dimensions, 10);
    if (!this._dimensions || this._dimensions < 1) {
      throw new Error('new NDEMap: Dimensions must be > 0');
    }
    this._root = new Map();

    this[Symbol.iterator] = function () {
      return this.entries();
    };
  }

  /**
   * `_keyFromKeys` joins an array of keys into a string using a separator.
   * @private
   * @param  {Array} keys Array with keys to join.
   * @return {String}     String-value of the joined keys.
   */


  _createClass(NDEMap, [{
    key: '_keyFromKeys',
    value: function _keyFromKeys(keys) {
      return keys.join(this._separator);
    }

    /**
     * `_keysFromKey` splits a string into an array of keys using a separator.
     * @private
     * @param  {String} key String value to split.
     * @return {Array}      Keys-array.
     */

  }, {
    key: '_keysFromKey',
    value: function _keysFromKey(key) {
      return key.split(this._separator);
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
        throw new Error('Number of keys given does not match dimensions. Have ' + this._dimensions + ' dimensions, and ' + keys.length + ' keys');
      }
      return this._root.delete(this._keyFromKeys(keys));
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

      if (keys.length !== this._dimensions) {
        throw new Error('Number of keys given does not match dimensions. Have ' + this._dimensions + ' dimensions, and ' + keys.length + ' keys');
      }
      return this._root.get(this._keyFromKeys(keys));
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

      if (keys.length !== this._dimensions) {
        throw new Error('Number of keys given does not match dimensions. Have ' + this._dimensions + ' dimensions, and ' + keys.length + ' keys');
      }
      return this._root.has(this._keyFromKeys(keys));
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
        throw new Error('Number of keys given does not match dimensions. Have ' + this._dimensions + ' dimensions, and ' + args.length + ' keys');
      }
      return this._root.set(this._keyFromKeys(args), value);
    }

    /**
     * Returns an iterator that iterates over all data-entries. The key-entry will
     * be an array of keys the size of this instances dimensions.
     * @return {Iterator} Iterator for entries.
     */

  }, {
    key: 'entries',
    value: function entries() {
      return new NDEMapIterator(this, _mapResultEntry.bind(this));
    }

    /**
     * Returns an iterator that iterates over all data-keys. Each key will
     * be an array of keys the size of this instances dimensions.
     * @return {Iterator} Iterator for keys.
     */

  }, {
    key: 'keys',
    value: function keys() {
      return new NDEMapIterator(this, _mapResultKey.bind(this));
    }

    /**
     * Returns an iterator that iterates over all data-values.
     * @return {Iterator} Iterator for values.
     */

  }, {
    key: 'values',
    value: function values() {
      return new NDEMapIterator(this, _mapResultValue.bind(this));
    }

    /**
     * `this._root.forEach(...)`
     */
    //----------------------------------------------------------------------------

  }, {
    key: 'forEach',
    value: function forEach(callback, thisArg) {
      var _this = this;

      return this._root.forEach(function (val, key) {
        callback.call(thisArg, val, _this._keysFromKey(key), _this);
      }, thisArg);
    }
  }, {
    key: 'size',
    get: function get() {
      return this._root.size;
    }
  }]);

  return NDEMap;
}();

module.exports = NDEMap;