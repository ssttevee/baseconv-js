export class DuplicateCharacterError extends Error {
    constructor(index: number, char: number) {
        super(`duplicate character "${String.fromCharCode(char)}" found at index ${index}`);
    }
}

export class UnexpectedCharacterError extends Error {
    constructor(index: number, char: number) {
        super(`unexpected character "${String.fromCharCode(char)}" found at index ${index}`);
    }
}

function strToChars(str: string): number[] {
    return str.split('').map((c) => c.charCodeAt(0));
}

const zero = BigInt(0);

export class Base {
    private _charmap = new Map<number, bigint>();
    private _charset: string;
    private _radix: bigint;

    constructor(charset: string) {
        this._charset = charset;

        for (const [index, char] of strToChars(charset).entries()) {
            if (this._charmap.has(char)) {
                throw new DuplicateCharacterError(index, char);
            }

            this._charmap.set(char, BigInt(index));
        }

        this._radix = BigInt(charset.length);
    }

    get charset(): string {
        return this._charset;
    }

    get radix(): number {
        return this._charset.length;
    }

    parse(number: string): bigint {
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

    encode(value: bigint): string {
        let numbers: string[] = [];
        while (value > zero) {
            const rem = value % this._radix;
            value = (value - rem) / this._radix;

            numbers.push(this._charset[Number(rem)]);
        }

        return numbers.reverse().join('');
    }
}
