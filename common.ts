import { Base } from './index';

export const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const base2 = new Base(charset.slice(0, 2));
export const base8 = new Base(charset.slice(0, 8));
export const base10 = new Base(charset.slice(0, 10));
export const base16 = new Base(charset.slice(0, 16));
export const base36 = new Base(charset.slice(0, 36));
export const base62 = new Base(charset);
