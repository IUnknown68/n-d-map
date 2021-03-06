/**
 * @module NDMap
 * @description `NDMap` is a "true" multidimensional Map. True means, it is actually
 * a Map of Maps of Maps etc. Means, it does not use a flat Map internally, and
 * does not perform any keymapping, as `NDEMap` does.
 * In many cases you will be happy with the emulation `NDEMap` gives, you. However,
 * there are a couple of differences, and there might be cases where you prefer
 * a true multidimensional Map.
 *
 * The differences are:
 * - Keys are not stringified. You can use (just like in a normal `Map`) anything
 *   you like. When you use strings, you don't have to worry about separators.
 *   This means also, that the equality-rules of `Map` apply.
 * - The order in which items are returned by `Iterator`s is **not** the order
 *   items were inserted in. Per level the order is preserved, but over all not.
 *   So whe the order matters you should use `NDEMap` instead.
 * @author Arne Seib <iunknown@seiberspace.de>
 * @copyright Arne Seib 2016
 * @license MIT - see ./LICENSE
 */

/**
 * Makes sure a `Map` exists for `key` in `map`. Creates one if none found.
 * @private
 * @param  {Map} map The map to check for `key`.
 * @param  {any} key The key to assert.
 * @return {Map}     The `Map` for that key.
 */
function _assertBranch(map, key) {
  let entry = map.get(key);
  if (!entry) {
    map.set(key, entry = new Map());
  }
  return entry;
}

/**
 * Returns the number of data-elements stored in `map` or its descendants.
 * Recursive function. When called with a `depth` of 1, it returns the size of `map`.
 * Otherwise it iterates the entries and calls `_getSize()` on it with `depth` decremented
 * by 1.
 * @private
 * @param  {Map} map The map iterate.
 * @param  {Number} depth Maximal depth to iterate. When `map` is a root-map, then
 *                        this is initially the number of dimensions.
 * @return {Number}       Total number of data-entries.
 */
function _getSize(map, depth) {
  --depth;
  if (depth < 1) {
    return map.size;
  }
  let size = 0;
  for (let submap of map.values()) {
    size += _getSize(submap, depth);
  }
  return size;
}

/**
 * `_mapResultKey` returns the key from a map entry
 * @private
 * @param  {Array} value Array: `[0]` = key, `[1]` = value
 * @param  {Array} keys  Array, length is number of dimensions, contains the keys
 * for this path.
 * @return {Array}         Array with keys.
 */
const _mapResultKey = (value, keys) => keys;

/**
 * `_mapResultValue` returns the value from a map entry.
 * @private
 * @param  {Array} value Array: `[0]` = key, `[1]` = value
 * @return {Any}         `value[1]` (value)
 */
const _mapResultValue = (value) => value[1];

/**
 * `_mapResultEntry` returns the full map entry.
 * @private
 * @param  {Array} value Array: `[0]` = key, `[1]` = value
 * @param  {Array} keys  Array, length is number of dimensions, contains the keys
 * for this path.
 * @return {Array}         Array with entries.
 */
const _mapResultEntry = (value, keys) => [keys, value[1]];

/**
 * @class `NDMapIterator` is an `Iterator` for `NDMap`.
 * It iterates through all entries of `map` at a depth
 * of `map._dimensions`, has a `next()`-function and implents an `@@iterator`-generator.
 * @property {Function} next `Iterator`'s `next()`.
 * @property {Generator} @@iterator The generator-function.
 * @private
 */
class NDMapIterator {
  /**
   * Constructor for `NDMapIterator`.
   * @param  {NDMap}    map        The `NDMap`-object this is for.
   * @param  {Function} mapResult  Function mapping the result from the `entries()`-iterator
   *                               do the desired value (key, value, or both).
   */
  constructor(map, mapResult) {
    const iterators = [map._root.entries()];
    const keys = [];
    let depth = 0;

    this.next = () => {
      // get next value from current iterator
      const res = iterators[depth].next();
      if (res.done) {
        // done here, ascend if possible
        // remove iterator for this level
        iterators[depth] = null;
        keys[depth] = null;
        if (depth) {
          // can ascend, do it
          --depth;
          return this.next();
        }
        // done on root level: all done
        return { done: true };
      }
      keys[depth] = res.value[0];
      if (depth === map._dimensions - 1) {
        // bottom: return actual result
        res.value = mapResult(res.value, [].concat(keys));
        return res;
      }
      // not bottom: descend and update iterators
      ++depth;
      iterators[depth] = res.value[1].entries();
      return this.next();
    };

    this[Symbol.iterator] = function () {
      return this;
    };
  }
}

/**
 * @class `NDMap` is a multi-dimensional map.
 *
 */
class NDMap {
  /**
   * Constructor for `NDMap`.
   * @param  {Number} dimensions The number of dimensions for this instance.
   */
  constructor(dimensions) {
    this._dimensions = parseInt(dimensions, 10);
    if (!this._dimensions || this._dimensions < 1) {
      throw new Error('new NDMap: Dimensions must be > 0');
    }
    this._root = new Map();

    this[Symbol.iterator] = function () {
      return this.entries();
    };
  }

  /**
   * Returns the item at the path specified by `keys`. `_getEntry` does not perform
   * any checks on `keys`, so the behaviour us undefined for a number of keys
   * > `this._dimensions`.
   * @private
   * @param  {Array} keys Array with keys. Must be <= `this._dimensions`.
   * @return {Object}     Whatever is stored here. Can be a `Map` or a value, or
   *                      `undefined` if the entry was not found.
   */
  _getEntry(keys) {
    let entry = this._root;
    for (let n = 0; entry && (n < keys.length); n++) {
      entry = entry.get(keys[n]);
    }
    return entry;
  }

  /**
   * Getter for size. Returns the overall number of data-items stored. Use wiseley,
   * this will iterate recursiveley through all descendants!
   * @return {Number} Total number of data-items stored.
   */
  get size() {
    return _getSize(this._root, this._dimensions);
  }

  /**
   * Removes all items.
   */
  clear() {
    this._root.clear();
  }

  /**
   * Removes the item specified by `keys`.
   * @param  {Any} keys Full path (all dimensions) to the item to remove.
   * @return {Boolean}  True if the item was found (and removed).
   */
  delete(...keys) {
    if (keys.length !== this._dimensions) {
      throw new Error(`Number of keys given does not match dimensions. Have ${this._dimensions} dimensions, and ${keys.length} keys`);
    }
    const last = keys.pop();
    const entry = this._getEntry(keys);
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
  get(...keys) {
    if (keys.length !== this._dimensions) {
      throw new Error(`Number of keys given does not match dimensions. Have ${this._dimensions} dimensions, and ${keys.length} keys`);
    }
    return this._getEntry(keys);
  }

  /**
   * Checks if the item specified by `keys` exists.
   * @param  {Any} keys Full or partial path to the item.
   * @return {Boolean}  True if the item exists.
   */
  has(...keys) {
    if (keys.length !== this._dimensions) {
      throw new Error(`Number of keys given does not match dimensions. Have ${this._dimensions} dimensions, and ${keys.length} keys`);
    }
    const last = keys.pop();
    const entry = this._getEntry(keys);
    return (entry && entry.has(last)) || false;
  }

  /**
   * Sets a data-item.
   * @param  {Any} args The last entry must be the value to set.
   *                    The rest is the full path to the item.
   *                    If the path does not exist, it is created.
   */
  set(...args) {
    const value = args.pop();
    if (args.length !== this._dimensions) {
      throw new Error(`Number of keys given does not match dimensions. Have ${this._dimensions} dimensions, and ${args.length} keys`);
    }

    const last = args.pop();

    let map = this._root;
    for (let n = 0; n < args.length; n++) {
      map = _assertBranch(map, args[n]);
    }
    map.set(last, value);
  }

  /**
   * Returns an iterator that iterates over all data-entries. The key-entry will
   * be an array of keys the size of this instances dimensions.
   * @return {Iterator} Iterator for entries.
   */
  entries() {
    return new NDMapIterator(this, _mapResultEntry);
  }

  /**
   * Returns an iterator that iterates over all data-keys. Each key will
   * be an array of keys the size of this instances dimensions.
   * @return {Iterator} Iterator for keys.
   */
  keys() {
    return new NDMapIterator(this, _mapResultKey);
  }

  /**
   * Returns an iterator that iterates over all data-values.
   * @return {Iterator} Iterator for values.
   */
  values() {
    return new NDMapIterator(this, _mapResultValue);
  }

  /**
   * `this._root.forEach(...)`
   */
  //----------------------------------------------------------------------------
  forEach(callback, thisArg) {
    for (let entry of this.entries()) {
      callback.call(thisArg, entry[1], entry[0], this);
    }
  }

}

module.exports = NDMap;
