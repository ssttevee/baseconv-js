import { PlaceValues } from './types.ts';

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

    public decode(number: string): PlaceValues {
        return Array.from(
            number,
            (char, index) => {
                const code = char.charCodeAt(0);
                if (!this.#map.has(code)) {
                    throw new UnexpectedCharacterError(index, code);
                }

                return this.#map.get(code)!;
            }
        );
    }

    public encode(values: PlaceValues): string {
        return Array.from(
            values,
            (value) => this.chars[value]
        ).join('');
    }
}
