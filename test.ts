import { Converter } from './build/index.mjs';
import { assertEquals } from "https://deno.land/std@0.132.0/testing/asserts.ts";

import { chars } from './build/common.mjs';

function testConversion(from: string, to: string, fromNumber: string, toNumber: string) {
    assertEquals(new Converter(from, to).convert(fromNumber), toNumber);
    assertEquals(new Converter(to, from).convert(toNumber), fromNumber);
}

Deno.test('dec <-> oct', () => {
    testConversion(chars.slice(0, 8), chars.slice(0, 10), '235', '157');
});

Deno.test('31 <-> 42', () => {
    testConversion(chars.slice(0, 31), chars.slice(0, 42), '30569568', 'f2SC0kA');
});

Deno.test('big number', () => {
    testConversion(chars.slice(0, 10), chars.slice(0, 16), '302393898639033864', '43251a60ea00608');
});

Deno.test('unicode charsets', () => {
    testConversion(
        '〇一二三四五六七',
        'あかさたなはまやらわ',
        '二三五',
        'かはや',
    );
});
