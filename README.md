# baseconv-js

A library for converting numbers between arbitrary bases with arbitrary character sets using V8's relatively new [bigint primitive](https://v8.dev/blog/bigint).

## Installation

```sh
npm install --save ssttevee/baseconv-js
```

## Usage

```js
const { Base } = require('baseconv');

const base2 = new Base('01');
const base36 = new Base('0123456789abcdefghijklmnopqrstuvwxyz');

const custom2 = new Base('_.');

const a = base2.parse('1111011'); // 123n
const b = base36.encode(a); // "3f"
const c = custom2.encode(a) // "...._.."
```

## Common bases

Bases 2, 8, 10, 16, 36 and 62 are packaged for convenience.

```js
const { base10, base16 } = require('baseconv/common');

console.log(base16.encode(base10.parse('123'))); // "7b"
```
