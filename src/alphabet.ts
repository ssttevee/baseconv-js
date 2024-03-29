import convert from './convert';
import type { PlaceValues } from './types';

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

export default class Alphabet {
    readonly #map = new Map<number, number>();

    public readonly chars: string;
    public readonly radix: number;

    public constructor(chars: string) {
        this.chars = chars;
        this.radix = chars.length;
        for (const [index, char] of Array.from(chars, (c) => c.charCodeAt(0)).entries()) {
            if (this.#map.has(char)) {
                throw new DuplicateCharacterError(index, char);
            }

            this.#map.set(char, index);
        }
    }

    public decode(number: string): number[] {
        return Array.from(
            number,
            (char) => this.valueOf(char.charCodeAt(0))
        );
    }

    public encode(values: PlaceValues): string {
        return Array.from(
            values,
            (value) => this.chars[value]
        ).join('');
    }

    public to(radix: number, number: string): number[] {
        return convert(this.radix, radix, this.decode(number));
    }

    public from(radix: number, values: PlaceValues): string {
        return this.encode(convert(radix, this.radix, values));
    }

    public valueOf(char: string | number): number {
        const code = this.#charToCode(char);
        if (!this.has(code)) {
            throw new UnexpectedCharacterError(0, code);
        }

        return this.#map.get(code)!;
    }

    public has(char: string | number): boolean {
        return this.#map.has(this.#charToCode(char));
    }

    #charToCode(char: string | number): number {
        return typeof char === "number" ? char : char.charCodeAt(0);
    }
}
