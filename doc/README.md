<a name="module_NDEMap"></a>

## NDEMap
`NDEMap` is multidimensional Map that emulates multiple dimensions by
joining / splitting keys by a given separator. It uses a flat `Map` to store
it's values.

The differences towards `NDMap` (true multidimensional Map) are:
- Keys are stringified with a separator. This means, you can use only strings
  for the keys, and you need to reserve a certain char (default: ':') as a
  separator.
- The order in which items are returned by `Iterator`s is strictly the order
  in which items were inserted, regardless of the dimensions.

**Author:** Arne Seib <arne28@seiberspace.de>  
**License**: MIT - see ./LICENSE  
**Copyright**: Arne Seib 2016  

* [NDEMap](#module_NDEMap)
    * [~NDEMap](#module_NDEMap..NDEMap)
        * [new NDEMap(dimensions, separator)](#new_module_NDEMap..NDEMap_new)
        * [.size](#module_NDEMap..NDEMap+size) ⇒ <code>Number</code>
        * [.clear()](#module_NDEMap..NDEMap+clear)
        * [.delete(...keys)](#module_NDEMap..NDEMap+delete) ⇒ <code>Boolean</code>
        * [.get(...keys)](#module_NDEMap..NDEMap+get) ⇒ <code>Object</code>
        * [.has(...keys)](#module_NDEMap..NDEMap+has) ⇒ <code>Boolean</code>
        * [.set(...args)](#module_NDEMap..NDEMap+set)
        * [.entries()](#module_NDEMap..NDEMap+entries) ⇒ <code>Iterator</code>
        * [.keys()](#module_NDEMap..NDEMap+keys) ⇒ <code>Iterator</code>
        * [.values()](#module_NDEMap..NDEMap+values) ⇒ <code>Iterator</code>
        * [.forEach()](#module_NDEMap..NDEMap+forEach)

<a name="module_NDEMap..NDEMap"></a>

### NDEMap~NDEMap
`NDEMap` is a multi-dimensional map.

**Kind**: inner class of <code>[NDEMap](#module_NDEMap)</code>  

* [~NDEMap](#module_NDEMap..NDEMap)
    * [new NDEMap(dimensions, separator)](#new_module_NDEMap..NDEMap_new)
    * [.size](#module_NDEMap..NDEMap+size) ⇒ <code>Number</code>
    * [.clear()](#module_NDEMap..NDEMap+clear)
    * [.delete(...keys)](#module_NDEMap..NDEMap+delete) ⇒ <code>Boolean</code>
    * [.get(...keys)](#module_NDEMap..NDEMap+get) ⇒ <code>Object</code>
    * [.has(...keys)](#module_NDEMap..NDEMap+has) ⇒ <code>Boolean</code>
    * [.set(...args)](#module_NDEMap..NDEMap+set)
    * [.entries()](#module_NDEMap..NDEMap+entries) ⇒ <code>Iterator</code>
    * [.keys()](#module_NDEMap..NDEMap+keys) ⇒ <code>Iterator</code>
    * [.values()](#module_NDEMap..NDEMap+values) ⇒ <code>Iterator</code>
    * [.forEach()](#module_NDEMap..NDEMap+forEach)

<a name="new_module_NDEMap..NDEMap_new"></a>

#### new NDEMap(dimensions, separator)
Constructor for NDEMap.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dimensions | <code>Number</code> |  | The number of dimensions for this instance. |
| separator | <code>String</code> | <code>:</code> | The separator to use. |

<a name="module_NDEMap..NDEMap+size"></a>

#### ndeMap.size ⇒ <code>Number</code>
Getter for size. Returns the overall number of data-items stored. Use wiseley,
this will iterate recursiveley through all descendants!

**Kind**: instance property of <code>[NDEMap](#module_NDEMap..NDEMap)</code>  
**Returns**: <code>Number</code> - Total number of data-items stored.  
<a name="module_NDEMap..NDEMap+clear"></a>

#### ndeMap.clear()
Removes all items.

**Kind**: instance method of <code>[NDEMap](#module_NDEMap..NDEMap)</code>  
<a name="module_NDEMap..NDEMap+delete"></a>

#### ndeMap.delete(...keys) ⇒ <code>Boolean</code>
Removes the item specified by `keys`.

**Kind**: instance method of <code>[NDEMap](#module_NDEMap..NDEMap)</code>  
**Returns**: <code>Boolean</code> - True if the item was found (and removed).  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Any</code> | Full path (all dimensions) to the item to remove. |

<a name="module_NDEMap..NDEMap+get"></a>

#### ndeMap.get(...keys) ⇒ <code>Object</code>
Returns the item specified by `keys`.

**Kind**: instance method of <code>[NDEMap](#module_NDEMap..NDEMap)</code>  
**Returns**: <code>Object</code> - Whatever is stored here. Can be a `Map` or a value.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Any</code> | Full or partial path to the item. |

<a name="module_NDEMap..NDEMap+has"></a>

#### ndeMap.has(...keys) ⇒ <code>Boolean</code>
Checks if the item specified by `keys` exists.

**Kind**: instance method of <code>[NDEMap](#module_NDEMap..NDEMap)</code>  
**Returns**: <code>Boolean</code> - True if the item exists.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Any</code> | Full or partial path to the item. |

<a name="module_NDEMap..NDEMap+set"></a>

#### ndeMap.set(...args)
Sets a data-item.

**Kind**: instance method of <code>[NDEMap](#module_NDEMap..NDEMap)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Any</code> | The last entry must be the value to set.                    The rest is the full path to the item.                    If the path does not exist, it is created. |

<a name="module_NDEMap..NDEMap+entries"></a>

#### ndeMap.entries() ⇒ <code>Iterator</code>
Returns an iterator that iterates over all data-entries. The key-entry will
be an array of keys the size of this instances dimensions.

**Kind**: instance method of <code>[NDEMap](#module_NDEMap..NDEMap)</code>  
**Returns**: <code>Iterator</code> - Iterator for entries.  
<a name="module_NDEMap..NDEMap+keys"></a>

#### ndeMap.keys() ⇒ <code>Iterator</code>
Returns an iterator that iterates over all data-keys. Each key will
be an array of keys the size of this instances dimensions.

**Kind**: instance method of <code>[NDEMap](#module_NDEMap..NDEMap)</code>  
**Returns**: <code>Iterator</code> - Iterator for keys.  
<a name="module_NDEMap..NDEMap+values"></a>

#### ndeMap.values() ⇒ <code>Iterator</code>
Returns an iterator that iterates over all data-values.

**Kind**: instance method of <code>[NDEMap](#module_NDEMap..NDEMap)</code>  
**Returns**: <code>Iterator</code> - Iterator for values.  
<a name="module_NDEMap..NDEMap+forEach"></a>

#### ndeMap.forEach()
`this._root.forEach(...)`

**Kind**: instance method of <code>[NDEMap](#module_NDEMap..NDEMap)</code>  
<a name="module_NDMap"></a>

## NDMap
`NDMap` is a "true" multidimensional Map. True means, it is actually
a Map of Maps of Maps etc. Means, it does not use a flat Map internally, and
does not perform any keymapping, as `NDEMap` does.
In many cases you will be happy with the emulation `NDEMap` gives, you. However,
there are a couple of differences, and there might be cases where you prefer
a true multidimensional Map.

The differences are:
- Keys are not stringified. You can use (just like in a normal `Map`) anything
  you like. When you use strings, you don't have to worry about separators.
  This means also, that the equality-rules of `Map` apply.
- The order in which items are returned by `Iterator`s is **not** the order
  items were inserted in. Per level the order is preserved, but over all not.
  So whe the order matters you should use `NDEMap` instead.

**Author:** Arne Seib <arne28@seiberspace.de>  
**License**: MIT - see ./LICENSE  
**Copyright**: Arne Seib 2016  

* [NDMap](#module_NDMap)
    * [~NDMap](#module_NDMap..NDMap)
        * [new NDMap(dimensions)](#new_module_NDMap..NDMap_new)
        * [.size](#module_NDMap..NDMap+size) ⇒ <code>Number</code>
        * [.clear()](#module_NDMap..NDMap+clear)
        * [.delete(...keys)](#module_NDMap..NDMap+delete) ⇒ <code>Boolean</code>
        * [.get(...keys)](#module_NDMap..NDMap+get) ⇒ <code>Object</code>
        * [.has(...keys)](#module_NDMap..NDMap+has) ⇒ <code>Boolean</code>
        * [.set(...args)](#module_NDMap..NDMap+set)
        * [.entries()](#module_NDMap..NDMap+entries) ⇒ <code>Iterator</code>
        * [.keys()](#module_NDMap..NDMap+keys) ⇒ <code>Iterator</code>
        * [.values()](#module_NDMap..NDMap+values) ⇒ <code>Iterator</code>
        * [.forEach()](#module_NDMap..NDMap+forEach)

<a name="module_NDMap..NDMap"></a>

### NDMap~NDMap
`NDMap` is a multi-dimensional map.

**Kind**: inner class of <code>[NDMap](#module_NDMap)</code>  

* [~NDMap](#module_NDMap..NDMap)
    * [new NDMap(dimensions)](#new_module_NDMap..NDMap_new)
    * [.size](#module_NDMap..NDMap+size) ⇒ <code>Number</code>
    * [.clear()](#module_NDMap..NDMap+clear)
    * [.delete(...keys)](#module_NDMap..NDMap+delete) ⇒ <code>Boolean</code>
    * [.get(...keys)](#module_NDMap..NDMap+get) ⇒ <code>Object</code>
    * [.has(...keys)](#module_NDMap..NDMap+has) ⇒ <code>Boolean</code>
    * [.set(...args)](#module_NDMap..NDMap+set)
    * [.entries()](#module_NDMap..NDMap+entries) ⇒ <code>Iterator</code>
    * [.keys()](#module_NDMap..NDMap+keys) ⇒ <code>Iterator</code>
    * [.values()](#module_NDMap..NDMap+values) ⇒ <code>Iterator</code>
    * [.forEach()](#module_NDMap..NDMap+forEach)

<a name="new_module_NDMap..NDMap_new"></a>

#### new NDMap(dimensions)
Constructor for `NDMap`.


| Param | Type | Description |
| --- | --- | --- |
| dimensions | <code>Number</code> | The number of dimensions for this instance. |

<a name="module_NDMap..NDMap+size"></a>

#### ndMap.size ⇒ <code>Number</code>
Getter for size. Returns the overall number of data-items stored. Use wiseley,
this will iterate recursiveley through all descendants!

**Kind**: instance property of <code>[NDMap](#module_NDMap..NDMap)</code>  
**Returns**: <code>Number</code> - Total number of data-items stored.  
<a name="module_NDMap..NDMap+clear"></a>

#### ndMap.clear()
Removes all items.

**Kind**: instance method of <code>[NDMap](#module_NDMap..NDMap)</code>  
<a name="module_NDMap..NDMap+delete"></a>

#### ndMap.delete(...keys) ⇒ <code>Boolean</code>
Removes the item specified by `keys`.

**Kind**: instance method of <code>[NDMap](#module_NDMap..NDMap)</code>  
**Returns**: <code>Boolean</code> - True if the item was found (and removed).  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Any</code> | Full path (all dimensions) to the item to remove. |

<a name="module_NDMap..NDMap+get"></a>

#### ndMap.get(...keys) ⇒ <code>Object</code>
Returns the item specified by `keys`.

**Kind**: instance method of <code>[NDMap](#module_NDMap..NDMap)</code>  
**Returns**: <code>Object</code> - Whatever is stored here. Can be a `Map` or a value.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Any</code> | Full or partial path to the item. |

<a name="module_NDMap..NDMap+has"></a>

#### ndMap.has(...keys) ⇒ <code>Boolean</code>
Checks if the item specified by `keys` exists.

**Kind**: instance method of <code>[NDMap](#module_NDMap..NDMap)</code>  
**Returns**: <code>Boolean</code> - True if the item exists.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>Any</code> | Full or partial path to the item. |

<a name="module_NDMap..NDMap+set"></a>

#### ndMap.set(...args)
Sets a data-item.

**Kind**: instance method of <code>[NDMap](#module_NDMap..NDMap)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Any</code> | The last entry must be the value to set.                    The rest is the full path to the item.                    If the path does not exist, it is created. |

<a name="module_NDMap..NDMap+entries"></a>

#### ndMap.entries() ⇒ <code>Iterator</code>
Returns an iterator that iterates over all data-entries. The key-entry will
be an array of keys the size of this instances dimensions.

**Kind**: instance method of <code>[NDMap](#module_NDMap..NDMap)</code>  
**Returns**: <code>Iterator</code> - Iterator for entries.  
<a name="module_NDMap..NDMap+keys"></a>

#### ndMap.keys() ⇒ <code>Iterator</code>
Returns an iterator that iterates over all data-keys. Each key will
be an array of keys the size of this instances dimensions.

**Kind**: instance method of <code>[NDMap](#module_NDMap..NDMap)</code>  
**Returns**: <code>Iterator</code> - Iterator for keys.  
<a name="module_NDMap..NDMap+values"></a>

#### ndMap.values() ⇒ <code>Iterator</code>
Returns an iterator that iterates over all data-values.

**Kind**: instance method of <code>[NDMap](#module_NDMap..NDMap)</code>  
**Returns**: <code>Iterator</code> - Iterator for values.  
<a name="module_NDMap..NDMap+forEach"></a>

#### ndMap.forEach()
`this._root.forEach(...)`

**Kind**: instance method of <code>[NDMap](#module_NDMap..NDMap)</code>  
