## Classes

<dl>
<dt><a href="#NDMap">NDMap</a></dt>
<dd><p>NDMap is a multi-dimensional map.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#assertDimension">assertDimension(map, key)</a> ⇒ <code>Map</code></dt>
<dd><p>Makes sure a <code>Map</code> exists for <code>key</code> in <code>map</code>. Creates one if none found.</p>
</dd>
<dt><a href="#getSize">getSize(map, depth)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the number of data-elements stored in <code>map</code> or its descendants.
Recursive function. When called with a <code>depth</code> of 1, it returns the size of <code>map</code>.
Otherwise it iterates the entries and calls <code>getSize()</code> on it with <code>depth</code> decremented
by 1.</p>
</dd>
</dl>

<a name="NDMap"></a>

## NDMap
NDMap is a multi-dimensional map.

**Kind**: global class  

* [NDMap](#NDMap)
    * [new NDMap(dimensions)](#new_NDMap_new)
    * [.size](#NDMap+size) ⇒ <code>Number</code>
    * [._getEntry(keys)](#NDMap+_getEntry) ⇒ <code>Object</code>
    * [.clear()](#NDMap+clear)
    * [.delete(...keys)](#NDMap+delete) ⇒ <code>Boolean</code>
    * [.get(...keys)](#NDMap+get) ⇒ <code>Object</code>
    * [.has(...keys)](#NDMap+has) ⇒ <code>Boolean</code>
    * [.set(...args)](#NDMap+set)
    * [.entries()](#NDMap+entries)
    * [.keys()](#NDMap+keys)
    * [.values()](#NDMap+values)
    * [.forEach()](#NDMap+forEach)

<a name="new_NDMap_new"></a>

### new NDMap(dimensions)
Constructor for NDMap.


| Param | Type | Description |
| --- | --- | --- |
| dimensions | <code>Number</code> | The number of dimensions for this instance. |

<a name="NDMap+size"></a>

### ndMap.size ⇒ <code>Number</code>
Getter for size. Returns the overall number of data-items stored. Use wiseley,
this will iterate recursiveley through all descendants!

**Kind**: instance property of <code>[NDMap](#NDMap)</code>  
**Returns**: <code>Number</code> - Total number of data-items stored.  
<a name="NDMap+_getEntry"></a>

### ndMap._getEntry(keys) ⇒ <code>Object</code>
Returns the item at the path specified by `keys`.

**Kind**: instance method of <code>[NDMap](#NDMap)</code>  
**Returns**: <code>Object</code> - Whatever is stored here. Can be a `Map` or a value.  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>Array</code> | Array with keys. Must be <= `this._dimensions`. |

<a name="NDMap+clear"></a>

### ndMap.clear()
Removes all items.

**Kind**: instance method of <code>[NDMap](#NDMap)</code>  
<a name="NDMap+delete"></a>

### ndMap.delete(...keys) ⇒ <code>Boolean</code>
Removes the item specified by `keys`.

**Kind**: instance method of <code>[NDMap](#NDMap)</code>  
**Returns**: <code>Boolean</code> - True if the item was found (and removed).  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Any</code> | Full path (all dimensions) to the item to remove. |

<a name="NDMap+get"></a>

### ndMap.get(...keys) ⇒ <code>Object</code>
Returns the item specified by `keys`.

**Kind**: instance method of <code>[NDMap](#NDMap)</code>  
**Returns**: <code>Object</code> - Whatever is stored here. Can be a `Map` or a value.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Any</code> | Full or partial path to the item. |

<a name="NDMap+has"></a>

### ndMap.has(...keys) ⇒ <code>Boolean</code>
Checks if the item specified by `keys` exists.

**Kind**: instance method of <code>[NDMap](#NDMap)</code>  
**Returns**: <code>Boolean</code> - True if the item exists.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Any</code> | Full or partial path to the item. |

<a name="NDMap+set"></a>

### ndMap.set(...args)
Sets a data-item.

**Kind**: instance method of <code>[NDMap](#NDMap)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Any</code> | The last entry must be the value to set.                    The rest is the full path to the item.                    If the path does not exist, it is created. |

<a name="NDMap+entries"></a>

### ndMap.entries()
`this._root.entries(...)`

**Kind**: instance method of <code>[NDMap](#NDMap)</code>  
<a name="NDMap+keys"></a>

### ndMap.keys()
`this._root.keys(...)`

**Kind**: instance method of <code>[NDMap](#NDMap)</code>  
<a name="NDMap+values"></a>

### ndMap.values()
`this._root.values(...)`

**Kind**: instance method of <code>[NDMap](#NDMap)</code>  
<a name="NDMap+forEach"></a>

### ndMap.forEach()
`this._root.forEach(...)`

**Kind**: instance method of <code>[NDMap](#NDMap)</code>  
<a name="assertDimension"></a>

## assertDimension(map, key) ⇒ <code>Map</code>
Makes sure a `Map` exists for `key` in `map`. Creates one if none found.

**Kind**: global function  
**Returns**: <code>Map</code> - The `Map` for that key.  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Map</code> | The map to check for `key`. |
| key | <code>any</code> | The key to assert. |

<a name="getSize"></a>

## getSize(map, depth) ⇒ <code>Number</code>
Returns the number of data-elements stored in `map` or its descendants.
Recursive function. When called with a `depth` of 1, it returns the size of `map`.
Otherwise it iterates the entries and calls `getSize()` on it with `depth` decremented
by 1.

**Kind**: global function  
**Returns**: <code>Number</code> - Total number of data-entries.  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Map</code> | The map iterate. |
| depth | <code>Number</code> | Maximal depth to iterate. When `map` is a root-map, then                        this is initially the number of dimensions. |

