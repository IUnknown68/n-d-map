## n-d-map

### About

n-d-map provides two very implementations of a `Map` with multiple dimensions. Their
interfaces follow closely the standard-`Map`.

The difference is in methods where you have to provide a key. Instead of one key
for a `Map`, you provide multiple keys (one per dimension) for a `NDMap`:

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

The code uses generators, so make sure you supply whatever runtime might be required.

### Usage

Both implementations are to be used just like a normal `Map`, with the follwing
differences:

- Constructor: The constructor does **not** support (yet) an `iteratable`-argument.
  The one and only argument is the number of dimensions this instance should have.
- Every function taking a key argument in `Map` (`delete`,`get`,`has`,`set`) takes
  multiple key arguments in a `NDMap`. The function will check if all keys are present,
  and throw if this is not the case.

### Implementations

There are two implementations available: `NDMap`, a true multidimensional map,
and `NDEMap`, that uses just one flat map, and tampers with the keys to do so.

In most cases you should be fine with either of them. There are, however, reasons to
choose the one over the other:

- You want to use anything as a key, not just strings:
  Use `NDMap`.
- You can't decide on a separator:
  Use `NDMap`.
- You need to preserve the order in which the iterators return values. A `Map`'s
  iterators return elements in the order as they were inserted. This order may
  be different in a `NDMap`, due to the simplicity of the implementation. So in
  this case better use a `NDEMap`.

`NDMap` is implemented as a `Map` (of `Map`s (...)). This means, everything that is
valid about keys in a `Map` is as well valid for an `NDMap` (type of key, equality).
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

For the full documentation checkout the [docs](doc).
