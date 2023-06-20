import Alphabet from './alphabet';

export default class Converter {
    #from: Alphabet;
    #to: Alphabet;

    public static create(from: string | Alphabet, to: string | Alphabet): (number: string) => string {
        const c = new Converter(from, to);
        return c.convert.bind(c);
    }

    public static convert(from: string | Alphabet, to: string | Alphabet, number: string): string {
        return new Converter(from, to).convert(number);
    }

    public constructor(from: string | Alphabet, to: string | Alphabet) {
        this.#from = from instanceof Alphabet ? from : new Alphabet(from);
        this.#to = to instanceof Alphabet ? to : new Alphabet(to);
    }

    public convert(number: string): string {
        return this.#to.from(this.#from.radix, this.#from.decode(number));
    }
}
