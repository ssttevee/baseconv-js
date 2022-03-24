import { Alphabet } from './mod';

export const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const base2 = new Alphabet(chars.slice(0, 2));
export const base8 = new Alphabet(chars.slice(0, 8));
export const base10 = new Alphabet(chars.slice(0, 10));
export const base16 = new Alphabet(chars.slice(0, 16));
export const base36 = new Alphabet(chars.slice(0, 36));
export const base62 = new Alphabet(chars);

export { base2 as bin, base8 as oct, base10 as dec, base16 as hex };
