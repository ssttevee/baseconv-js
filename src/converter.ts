import Alphabet from './alphabet.ts';

export default class Converter {
    #from: Alphabet;
    #to: Alphabet;

    public constructor(from: string | Alphabet, to: string | Alphabet) {
        this.#from = from instanceof Alphabet ? from : new Alphabet(from);
        this.#to = to instanceof Alphabet ? to : new Alphabet(to);
    }

    public convert(number: string): string {
        return this.#to.from(this.#from.radix, this.#from.decode(number));
    }
}
