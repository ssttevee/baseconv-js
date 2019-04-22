"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
exports.charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
exports.base2 = new index_1.Base(exports.charset.slice(0, 2));
exports.base8 = new index_1.Base(exports.charset.slice(0, 8));
exports.base10 = new index_1.Base(exports.charset.slice(0, 10));
exports.base16 = new index_1.Base(exports.charset.slice(0, 16));
exports.base36 = new index_1.Base(exports.charset.slice(0, 36));
exports.base62 = new index_1.Base(exports.charset);