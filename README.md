## n-d-map

### About

n-d-map provides two very implementations of a `Map` with multiple dimensions:
`NDMap` and  `NDEMap`. Their interfaces follow closely the standard-`Map`.

The difference is in methods where you have to provide a key. Instead of one key
for a `Map`, you provide multiple keys (one per dimension) for a `NDMap` (and
`NDEMap` of course):

```javascript
// map with one dimension:
const m = new Map();
m.set(key, value);
const value = m.get(key);

// map with two dimensions:
const m = new NDMap(2);
m.set(key1, key2, value);
const value = m.get(key1, key2);
```

### Installation

```
npm install n-d-map
```

The code obviously uses `Map` and generators, so the js-environment needs to support
ES6. Thus the minimal supported node.js-version is 6.8.1.

### Usage

Both implementations are to be used just like a normal `Map`, with the follwing
differences:

- Constructor: The constructor does **not** support (yet) an `iteratable`-argument.
  The one and only argument is the number of dimensions this instance should have.
- Every function taking a key argument in `Map` (`delete`,`get`,`has`,`set`) takes
  multiple key arguments in a `ND(E)Map`. The function will check if all keys are present,
  and throw if this is not the case.

```javascript
const NDMap = require('n-d-map/lib/NDMap');
// or
const NDMap = require('n-d-map').NDMap;
// or
import {NDMap} from 'n-d-map';
// etc
// or equally for NDEMap

// create a map with two dimensions
const m = new NDMap(2);

// set a value (e.g. a CMS-page via language and ID)
m.set('en', 'index', page);

// get a value
const page = m.get('en', 'index');

// iterate over all entries
for (let entry of m) { ... }

// or just keys
for (let entry of m.keys()) { ... }

```

### Implementations

Basically ND-maps are trees with a fixed depth. So you could as well use a tree.
Just that with a fixed depth, the implementation can be greatly simplified, and
that's what n-d-map does.

There are two implementations available: `NDMap`, a true multidimensional map,
and `NDEMap`, that uses just one flat map, and tampers with the keys to do so.

In most cases you should be fine with either of them. There are, however, reasons to
choose one over the other.

You should use `NDMap` when

- you want to use anything as a key, not just strings
- you can't decide on a separator
- you think you need to mess with the branches (and not just the leaves), like
  you need to know the number of entries per dimension or so. In this case
  `NDMap._getEntry(keys)` will be your friend.

You should use `NDEMap` when

- order matters.  
  Iterators of a `Map` return elements in the order as they were inserted. This order may
  be different in a `NDMap`, due to the simplicity of the implementation. `NDMap` iterates
  strictly depth-first, and does keep track of the insertion order across dimensions.  
  However, within a dimension the order is preserved.
- you have a **huge** map, and you frequently need to know the
  overall size. `NDMap` determines the size when you ask for it (via `Map.size`)
  by adding the sizes of all leaf-maps. Means, it iterates through all branches.
  This can take some time.

`NDMap` is implemented as a `Map` (of `Map`s (of `Map`s (...))). This means, everything that is
valid about keys in a `Map` is as well valid for an `NDMap` (types, equality).
But this goes for the price of messing up the order.

`NDEMap` is implemented by simply mapping arrays of keys to strings:
```javascript
// separator
const sep = '/';
const keys = ['a','b','c'];

// keys to key
const key = keys.join(sep);
// key is "a/b/c"
```
This preserves the order of insertion, but your keys have to be strings without
the seprator char.

So the bottom line is: In the most common usecase (string keys) you would most likely
use `NDEMap`, since it preserves the insertion order, is quick with `Map.size` and
is implemented in a much simpler way.

For the full documentation checkout the [docs](doc).
