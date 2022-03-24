export type PlaceValues = number[];

export class DuplicateCharacterError extends Error {
    constructor(index: number, char: number);
}

export class UnexpectedCharacterError extends Error {
    constructor(index: number, char: number);
}

export default class Alphabet {
    readonly chars: number;
    readonly radix: number;

    constructor(chars: string);
    decode(number: string): PlaceValues;
    encode(values: PlaceValues): string;
}

export class Converter {
    constructor(from: string | Alphabet, to: string | Alphabet);
    convert(number: string): string;
}

export function divide(radix: number, dividend: PlaceValues, divisor: number): [quotient: PlaceValues, remainder: number];
