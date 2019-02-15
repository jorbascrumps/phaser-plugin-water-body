import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import {
    uglify,
} from 'rollup-plugin-uglify';

export default {
    input: 'source/index.js',
    output: [
        {
            file: 'dist.js',
            format: 'cjs',
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
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        uglify(),
    ],
};
