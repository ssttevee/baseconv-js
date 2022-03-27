import divide from './divide.ts';
import { PlaceValues } from './types.ts';

export default function convert(fromRadix: number, toRadix: number, values: PlaceValues): number[] {
    let value = Array.from(values);

    const result: number[] = [];
    while (value.length > 1 || value[value.length - 1] > toRadix) {
        let remainder: number;
        [value, remainder] = divide(fromRadix, value, toRadix);
        result.unshift(remainder);
    }

    if (value[value.length - 1]) {
        result.unshift(value[value.length - 1]);
    }

    while (result.length > 1 && !result[0]) {
        result.shift();
    }

    return result;
}