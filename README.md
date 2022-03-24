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
const { Alphabet, Converter } = require('@ssttevee/baseconv');

const base2 = '01';
const base36 = '0123456789abcdefghijklmnopqrstuvwxyz';

const custom2 = '_.';

assertEquals(new Converter(base2, base36).convert('1111011'), "3f");
assertEquals(new Converter(base2, custom2).convert('1111011'), "...._..");
```

### Common bases

Bases 2, 8, 10, 16, 36 and 62 are packaged for convenience.

```js
const { Converter } = require('@ssttevee/baseconv');
const { base10, base16 } = require('@ssttevee/baseconv/common');

assertEquals(new Converter(base10, base16).convert('123'), "7b");
```

## Unicode

UTF-8 characters work as expected. Theoretically, all unicode characters can be used in a single character set for an ungodly base [144,697](https://www.unicode.org/versions/Unicode14.0.0/#:~:text=Unicode%2014.0%20adds%20838%20characters%2C%20for%20a%20total%20of%20144%2C697%20characters.) radix.
