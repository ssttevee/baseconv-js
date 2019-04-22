"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DuplicateCharacterError extends Error {
    constructor(index, char) {
        super(`duplicate character "${String.fromCharCode(char)}" found at index ${index}`);
    }
}
exports.DuplicateCharacterError = DuplicateCharacterError;
class UnexpectedCharacterError extends Error {
    constructor(index, char) {
        super(`unexpected character "${String.fromCharCode(char)}" found at index ${index}`);
    }
}
exports.UnexpectedCharacterError = UnexpectedCharacterError;
function strToChars(str) {
    return str.split('').map((c) => c.charCodeAt(0));
}
const zero = BigInt(0);
class Base {
    constructor(charset) {
        this._charmap = new Map();
        this._charset = charset;
        for (const [index, char] of strToChars(charset).entries()) {
            if (this._charmap.has(char)) {
                throw new DuplicateCharacterError(index, char);
            }
            this._charmap.set(char, BigInt(index));
        }
        this._radix = BigInt(charset.length);
    }
    get charset() {
        return this._charset;
    }
    get radix() {
        return this._charset.length;
    }
    parse(number) {
        let sum = zero;
        for (const [i, c] of strToChars(number).reverse().entries()) {
            const value = this._charmap.get(c);
            if (typeof value === 'undefined') {
                throw new UnexpectedCharacterError(i, c);
            }
            sum += value * (this._radix ** BigInt(i));
        }
        return sum;
    }
    encode(value) {
        let numbers = [];
        while (value > zero) {
            const rem = value % this._radix;
            value = (value - rem) / this._radix;
            numbers.push(this._charset[Number(rem)]);
        }
        return numbers.reverse().join('');
    }
}
exports.Base = Base;
