import Alphabet from './alphabet.ts';
import divide from './divide.ts';
import { PlaceValues } from './types.ts';

export default class Converter {
    #from: Alphabet;
    #to: Alphabet;

    public constructor(from: string | Alphabet, to: string | Alphabet) {
        this.#from = from instanceof Alphabet ? from : new Alphabet(from);
        this.#to = to instanceof Alphabet ? to : new Alphabet(to);
    }

    public convert(number: string): string {
        let value = this.#from.decode(number);
        const result: PlaceValues = [];
        while (value.length > 1 || value[value.length - 1] > this.#to.radix) {
            let remainder: number;
            [value, remainder] = divide(this.#from.radix, value, this.#to.radix);
            result.unshift(remainder);
        }

        if (value[value.length - 1]) {
            result.unshift(value[value.length - 1]);
        }

        while (result.length > 1 && !result[0]) {
            result.shift();
        }

        return this.#to.encode(result);
    }
}
