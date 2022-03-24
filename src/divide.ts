import { PlaceValues } from './types.ts';

export default function divide(radix: number, dividend: PlaceValues, divisor: number): [quotient: PlaceValues, remainder: number] {
    // manually divide place values with an arbitary radix
    const quotient: PlaceValues = [];
    let remainder: number = 0;
    for (let value of dividend) {
        value += remainder * radix;
        
        const q = Math.floor(value / divisor);
        remainder = value - (q * divisor);
        quotient.push(q);
    }

    // remove leading zeros
    while (quotient.length > 1 && !quotient[0]) {
        quotient.shift();
    }

    // leave a zero to represent the "zero" value
    if (!quotient.length) {
        quotient.push(0);
    }

    return [quotient, remainder];
}
