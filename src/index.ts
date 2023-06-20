import { default as Converter } from './converter';

export const createConvertFunc = Converter.create;

export { default as Alphabet, DuplicateCharacterError, UnexpectedCharacterError } from './alphabet';
export { default as convert } from './convert';
export { default as divide } from './divide';
export { Converter, createConvertFunc as default }
export type * from './types';
