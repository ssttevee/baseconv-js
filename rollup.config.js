import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

const fixCJSDefaultExport = {
    renderChunk(code, chunk) {
        if (!chunk.fileName.endsWith(".cjs")) {
            return null;
        }

        return code
            .replace(/exports\.default = ([^\n]+);/g, "module.exports = Object.assign($1, exports);")
            .replace(/exports\.([^\s]+) = ([^\n]+);/g, "module.exports.$1 = $2;");
    }
};

export default [
    {
        input: {
            index: "src/index.ts",
            common: "src/common.ts",
        },
        output: [
            {
                dir: "build",
                entryFileNames: "[name].mjs",
                chunkFileNames: "[name]-[hash].mjs",
                format: "esm",
            },
            {
                dir: "build",
                entryFileNames: "[name].min.mjs",
                chunkFileNames: "[name]-[hash].min.mjs",
                format: "esm",
                plugins: [
                    terser(),
                ],
            },
            {
                dir: "build",
                entryFileNames: "[name].cjs",
                chunkFileNames: "[name]-[hash].cjs",
                format: "cjs",
                exports: "named",
                plugins: [
                    fixCJSDefaultExport,
                ],
            },
            {
                dir: "build",
                entryFileNames: "[name].min.cjs",
                chunkFileNames: "[name]-[hash].min.cjs",
                format: "cjs",
                exports: "named",
                plugins: [
                    fixCJSDefaultExport,
                    terser(),
                ],
            },
        ],
        plugins: [
            typescript(),
        ],
    },
    {
        input: {
            index: "src/index.ts",
            common: "src/common.ts",
        },
        output: {
            dir: "build",
        },
        external: [
            "dprint-node",
        ],
        plugins: [
            typescript(),
            dts(),
        ]
    }
];
