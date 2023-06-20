# baseconv-js

A library for converting numbers between arbitrary bases with arbitrary character sets.

## Installation

### Deno

```ts
import { Alphabet, Converter } from 'https://raw.githubusercontent.com/ssttevee/baseconv-js/master/mod.ts';
```

### NodeJS

```sh
npm install @ssttevee/baseconv
```

## Usage

```js
import createConvertFunc from '@ssttevee/baseconv';
import { Converter } from '@ssttevee/baseconv';

const base2 = '01';
const base10 = '0123456789';

// once

assertEquals(Converter.convert(base2, base10, '1010110'), '86');

// or instanced

const base36 = '0123456789abcdefghijklmnopqrstuvwxyz';

assertEquals(new Converter(base36, base2).convert('3f'), '1111011');

// or curried

const custom2 = '_.';

const convert = Converter.create(base2, custom2); // createConvertFunc(base2, custom2)
assertEquals(convert('1111011'), '...._..');
```

### Common bases

Bases 2, 8, 10, 16, 36 and 62 are packaged for convenience.

```js
import { Converter } from '@ssttevee/baseconv';
import { base10, base16 } from '@ssttevee/baseconv/common';

assertEquals(new Converter(base10, base16).convert('123'), '7b');
```

## Unicode

UTF-8 characters work as expected. Theoretically, all unicode characters can be used in a single character set for an ungodly base [149,186](https://www.unicode.org/versions/Unicode15.0.0/#:~:text=Unicode%2015.0%20adds%204%2C489%20characters%2C%20for%20a%20total%20of%20149%2C186%20characters.) radix.
