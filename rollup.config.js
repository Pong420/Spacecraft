import buble from "rollup-plugin-buble";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import scss from 'rollup-plugin-scss';
import commonjs from 'rollup-plugin-commonjs';

var createEntry = (folder) => {
    return {
        input: './src/' + folder + '/index.js',
        output: {
            file: './assets/' + folder + '/bundle.js',
            format: 'iife',
            sourcemap: false,
        },
        useStrict: false,
        plugins: [
            scss({
                output: './assets/' + folder + '/bundle.css'
            }),
            resolve({
                jsnext: true,
                main: true
            }),
            commonjs({
                include: 'node_modules/**/**'
            }),
            buble({
                jsx: "h",
            }),
            uglify()
        ]

    }
}

export default [
    createEntry("View"),
    createEntry("Controller")
];