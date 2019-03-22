import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-babel-minify';

export default {
    input: 'source/index.js',
    output: [
        {
            file: 'dist.js',
            format: 'cjs',
        },
        {
            file: 'docs/phaser-plugin-water-body.js',
            format: 'iife',
            name: 'WaterBodyPlugin',
        },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs(),
        minify({
            comments: false,
        }),
    ],
};
