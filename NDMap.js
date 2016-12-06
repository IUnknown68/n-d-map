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
  let entry = map.get(key);
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
  let size = 0;
  for (let submap of map.values()) {
    size += getSize(submap, depth);
  }
  return size;
}

/**
 * @class NDMap is a multi-dimensional map.
 *
 */
class NDMap {
  /**
   * Constructor for NDMap.
   * @param  {Number} dimensions The number of dimensions for this instance.
   */
  constructor(dimensions) {
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
  _getEntry(keys) {
    if (keys.length > this._dimensions) {
      throw new Error(`NDMap.has: More than ${this._dimensions} keys given`);
    }
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
    return getSize(this._root, this._dimensions);
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
      throw new Error(`NDMap.delete: Need full path (${this._dimensions} dimensions)`);
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
    return this._getEntry(keys);
  }

  /**
   * Checks if the item specified by `keys` exists.
   * @param  {Any} keys Full or partial path to the item.
   * @return {Boolean}  True if the item exists.
   */
  has(...keys) {
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
      throw new Error(`NDMap.set: Need full path (${this._dimensions} dimensions)`);
    }

    const last = args.pop();

    let map = this._root;
    for (let n = 0; n < args.length; n++) {
      map = assertDimension(map, args[n]);
    }
    map.set(last, value);
  }

  /**
   * `this._root.entries(...)`
   */
  entries() {
    return this._root.entries();
  }

  /**
   * `this._root.keys(...)`
   */
  keys() {
    return this._root.keys();
  }

  /**
   * `this._root.values(...)`
   */
  values() {
    return this._root.values();
  }

  /**
   * `this._root.forEach(...)`
   */
  //----------------------------------------------------------------------------
  forEach(callback, thisArg) {
    return this._root.entries(callback, thisArg);
  }

}

module.exports = NDMap;
